/**
 * Capturing a course screenshot from inside an exercise test.
 *
 * The shape of a shot - a name, the thing to highlight, what must be visible
 * first, what to mask - follows Abhner Ramos Barbosa's /screenshot-docs skill
 * (abhnerramos/liferay-learn pull request 191), as does the capture profile
 * and the finishing script this writes a sidecar for. A course image and a
 * documentation image are the same picture taken for a different article, so
 * they should not be captured two different ways.
 *
 * WHERE THE IMAGES GO. Into the lesson's own images folder inside a
 * liferay-learn clone, named for its position in the article: 01.png, 02.png.
 * The clone is named by LIFERAY_LEARN_DIR in .env.local, which stays out of
 * Git. Without it the images are written beside the tests instead, so a run
 * on a machine that has no liferay-learn still works and simply leaves them
 * somewhere obvious.
 *
 * WHY A SIDECAR. The highlight box is drawn after the capture, not in the
 * browser, so the raw image stays clean and the box can be moved or redrawn
 * without taking the picture again. This records the box; the finishing
 * script draws it.
 */
import {Locator, Page} from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * The published width the style guide asks for, captured at twice that so the
 * image survives being shown on a dense display.
 */
export const CAPTURE = {
	colorScheme: 'light' as const,
	deviceScaleFactor: 2,
	locale: 'en-US',
	viewport: {height: 800, width: 1280},
};

//
// Candidates for replicating a lesson's own screenshot, taken only when
// REPLICATE_DIR is set.
//
// A lesson image shows one moment - often the open menu before the click the
// step ends with, not the screen after it - and one frame, cropped and zoomed
// by whoever took it. Rather than guess the moment, every action in a step
// that has an image records the full screen before and after itself, and
// replicate.py afterwards picks the moment and redraws the lesson's highlight
// frames on the whole screen. With REPLICATE_DIR unset, none of this runs.
//
//
// Read at each call rather than once, so the self-test can turn it on for one
// case without a second configuration.
//
const replicateDir = () => process.env.REPLICATE_DIR;

type Armed = {
	folder: string;
	names: string[];

	/** Replays the press that opened the step's last menu. */
	reopen?: () => Promise<unknown>;

	seq: number;

	/** The labels of the fields the step filled, chose, ticked, or attached to. */
	touched: string[];
};

const armed = new WeakMap<Page, Armed>();

/** Start recording candidates for the images this step's lesson shows. */
export async function armCapture(page: Page, names: string[]) {
	const root = replicateDir();

	if (!root || !names.length) {
		return;
	}

	const folder = path.join(root, names[0].replace(/\.png$/, ''));

	fs.mkdirSync(folder, {recursive: true});

	fs.writeFileSync(
		path.join(folder, 'images.json'),
		JSON.stringify({names}, null, 1)
	);

	armed.set(page, {folder, names, seq: 0, touched: []});

	await candidate(page, 'start of step');
}

/**
 * One candidate: the whole screen, as it is now.
 *
 * `shot` is the page to photograph when it is not the one the step armed: a
 * second browser the step opens for a side trip. The 404 page a reader visits
 * in a new window was never recorded, because only the first page was.
 */
export async function candidate(
	page: Page,
	tag: string,
	{extra = {}, fullPage = false, shot = page}: {extra?: object; fullPage?: boolean; shot?: Page} = {}
) {
	const state = armed.get(page);

	if (!replicateDir() || !state) {
		return;
	}

	state.seq += 1;

	//
	// Settled first. An action returns before what it opened has finished
	// drawing, and a candidate taken at once showed the Index Actions list
	// without its Reindex buttons - the right screen, not yet the lesson's.
	//
	await shot
		.waitForLoadState('networkidle', {timeout: 3000})
		.catch(() => undefined);

	await shot.waitForTimeout(400);

	const slug = tag
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
		.slice(0, 50);

	const file = path.join(
		state.folder,
		`${String(state.seq).padStart(2, '0')}-${slug}.png`
	);

	await shot.screenshot({fullPage, path: file}).catch(() => undefined);

	//
	// The boxes of what is on the screen, beside the picture: dialogs, side
	// panels, menus, cards, tables, forms. A published image is usually one of
	// these with a margin of what is around it, and an element keeps its own
	// layout at any window width - where a page laid out for a narrower
	// window cannot be cropped to look like one. replicate.py matches the
	// published image against these and crops along the element's edges.
	//
	const elements = await shot
		.evaluate(() => {
			const selectors = [
				'[role="dialog"]', '.modal-content', '[role="menu"]',
				'.dropdown-menu.show', '[role="tabpanel"]', '[role="listbox"]',
				'.sheet', '.card', '.panel', '.sidebar', '.sidenav-menu',
				'.lfr-product-menu-panel', '.control-menu', '.portlet', 'table',
				'form', 'header', 'nav', 'main', '#main-content', 'section',
			];

			const seen = new Set<Element>();
			const found: Array<{box: number[]; selector: string; text: string}> = [];

			for (const selector of selectors) {
				for (const node of document.querySelectorAll(selector)) {
					if (seen.has(node)) {
						continue;
					}

					seen.add(node);

					const box = node.getBoundingClientRect();

					if ((box.width * box.height < 4000) || (box.bottom <= 0) ||
						(box.top >= innerHeight) || (box.right <= 0) ||
						(box.left >= innerWidth)) {

						continue;
					}

					const style = getComputedStyle(node);

					if ((style.visibility === 'hidden') || (Number(style.opacity) === 0)) {
						continue;
					}

					found.push({
						box: [box.x, box.y, box.width, box.height].map(Math.round),
						selector,
						text: ((node as HTMLElement).innerText || '').trim().slice(0, 60),
					});
				}
			}

			//
			// And the small things a highlight frame surrounds - a list row, a
			// table row, a button, a field - so a frame is redrawn on the
			// element under it. Mapped point for point, the frame around the
			// All Search Indexes row stopped short of its Reindex button,
			// which a wider window had moved further right.
			//
			//
			// With its name, so the replica can frame the control an action
			// was about when the published frame cannot be mapped onto the
			// new screen.
			//
			const targets: Array<{box: number[]; tag: string; text: string}> = [];

			for (const node of document.querySelectorAll(
				'.list-group-item, li, tr, button, a, .form-group, label, input, select, textarea, [role="menuitem"], [role="tab"], [role="option"]'
			)) {
				const box = node.getBoundingClientRect();

				if ((box.width < 12) || (box.height < 10) || (box.bottom <= 0) ||
					(box.top >= innerHeight) || (box.right <= 0) || (box.left >= innerWidth)) {

					continue;
				}

				targets.push({
					box: [box.x, box.y, box.width, box.height].map(Math.round),
					tag: node.tagName.toLowerCase(),
					text: (node.getAttribute('aria-label') || (node as HTMLElement).innerText ||
						(node as HTMLInputElement).value || '').trim().replace(/\s+/g, ' ').slice(0, 80),
				});
			}

			return {
				elements: found,
				scale: devicePixelRatio,
				targets,
				viewport: [innerWidth, innerHeight],
			};
		})
		.catch(() => null);

	if (elements) {
		fs.writeFileSync(`${file}.json`, JSON.stringify({...elements, ...extra, fullPage, tag}, null, 1));
	}
}

/** Whether this page is recording candidates for a lesson image right now. */
export function replicating(page: Page) {
	return Boolean(replicateDir()) && armed.has(page);
}

/** Note a field the step set, so the end of the step can frame it. */
export function noteTouched(page: Page, label: string) {
	const state = armed.get(page);

	if (state && !state.touched.includes(label)) {
		state.touched.push(label);
	}
}

/** Note the press that opened a menu, so the end of the step can reopen it. */
export function noteMenuOpener(page: Page, reopen: () => Promise<unknown>) {
	const state = armed.get(page);

	if (state) {
		state.reopen = reopen;
	}
}

/** How many menus are open on the page. */
export async function openMenus(page: Page) {
	return page
		.locator('[role="menu"]:visible, .dropdown-menu.show:visible')
		.count()
		.catch(() => 0);
}

/**
 * The candidates at the end of a step: the screen as it is, and two the
 * published images kept asking for.
 *
 * FIELDS IN VIEW. A form step's image frames the fields the step filled,
 * from the first to the last, with the page scrolled so they sit clear of
 * the top bar. The screen at the end of the step is scrolled to the last
 * field typed into, so the Open Graph replica began at Image Alt Description
 * and its frame ran into the top bar. This scrolls the filled fields into the
 * middle of the screen and records their boxes, which the replicator frames.
 *
 * MENU REOPENED. An author often reopens the step's menu to show what was
 * chosen: the Filter menu with Author ticked. No step does that, so no
 * candidate showed it. This replays the press that opened the step's last
 * menu, records the screen, and closes the menu again.
 */
export async function endOfStepCandidates(page: Page, tag: string) {
	const state = armed.get(page);

	if (!replicateDir() || !state) {
		return;
	}

	await candidate(page, tag);

	if (state.touched.length) {
		const boxes = await page
			.evaluate((labels) => {
				const norm = (text: string | null) => (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
				const groups: Element[] = [];

				for (const label of labels) {
					const want = norm(label);
					const node = Array.from(document.querySelectorAll('label, legend, .control-label')).find((one) => {
						const text = norm(one.textContent);

						return (text === want) || text.startsWith(want);
					});
					const group = node && (node.closest('.form-group, fieldset') || node.parentElement);

					if (group && !groups.includes(group)) {
						groups.push(group);
					}
				}

				if (!groups.length) {
					return [];
				}

				const union = () => {
					const rects = groups.map((one) => one.getBoundingClientRect());

					return {bottom: Math.max(...rects.map((one) => one.bottom)), top: Math.min(...rects.map((one) => one.top))};
				};

				groups.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
				groups[0].scrollIntoView({block: 'start'});

				//
				// Then back down, so the fields sit in the middle of the screen,
				// or just below the top bar when they fill more than it. The top
				// bar is the fixed element at the top of the window.
				//
				let scroller: Element | null = groups[0].parentElement;

				while (scroller && !((scroller.scrollHeight > scroller.clientHeight) &&
					/(auto|scroll)/.test(getComputedStyle(scroller).overflowY))) {

					scroller = scroller.parentElement;
				}

				const bar = Array.from(document.querySelectorAll('body *')).filter((one) => {
					const style = getComputedStyle(one);
					const rect = one.getBoundingClientRect();

					return ((style.position === 'fixed') || (style.position === 'sticky')) &&
						(rect.top <= 0) && (rect.height < innerHeight / 3) && (rect.width > innerWidth / 2);
				}).reduce((most, one) => Math.max(most, one.getBoundingClientRect().bottom), 0);

				const {bottom, top} = union();
				const wanted = Math.max(bar + 24, (innerHeight - (bottom - top)) / 2);

				(scroller || document.scrollingElement || document.documentElement).scrollBy(0, top - wanted);

				return groups.map((one) => {
					const box = one.getBoundingClientRect();

					return [box.x, box.y, box.width, box.height].map(Math.round);
				});
			}, state.touched)
			.catch(() => []);

		if (boxes.length) {
			await candidate(page, 'end of step fields in view', {extra: {touched: boxes}});
		}
	}

	if (state.reopen) {
		const before = await openMenus(page);

		try {
			await state.reopen();

			if ((await openMenus(page)) > before) {
				//
				// Scrolled until the whole menu shows. The Filter menu opened
				// below the bottom of the screen, with only its first two
				// lines in the candidate. A floating menu hangs off the body,
				// outside the pane that scrolls, so the pane is found from the
				// opener just above the menu, and the menu is reopened after
				// the scroll so it opens in its new place.
				//
				const moved = await page
					.locator('[role="menu"]:visible, .dropdown-menu.show:visible')
					.last()
					.evaluate((menu) => {
						const box = menu.getBoundingClientRect();

						if (box.bottom <= innerHeight - 16) {
							return false;
						}

						let scroller = document.elementFromPoint(Math.max(0, box.left + 8), Math.max(0, box.top - 12));

						while (scroller && !((scroller.scrollHeight > scroller.clientHeight + 4) &&
							/(auto|scroll)/.test(getComputedStyle(scroller).overflowY))) {

							scroller = scroller.parentElement;
						}

						const target = scroller || document.scrollingElement || document.documentElement;
						const before = target.scrollTop;

						target.scrollBy(0, Math.min(box.bottom - innerHeight + 24, box.top - 120));

						return target.scrollTop !== before;
					})
					.catch(() => false);

				if (moved) {
					await page.keyboard.press('Escape').catch(() => undefined);
					await page.waitForTimeout(300);

					if ((await openMenus(page)) <= before) {
						await state.reopen();
					}
				}

				await page.waitForTimeout(300);

				await candidate(page, 'end of step menu reopened');
			}
		}
		catch {
			//
			// The menu's opener is gone: the step left the screen it was on.
			// There is nothing to reopen, and the step itself passed.
			//
		}

		await page.keyboard.press('Escape').catch(() => undefined);

		if ((await openMenus(page)) > before) {
			await state.reopen().catch(() => undefined);
		}
	}
}

/**
 * Note that the step downloads a file.
 *
 * A lesson image after a download step shows the file itself: the Content
 * Dashboard's spreadsheet, open in a desktop app. A browser run cannot draw
 * that, so the replicator says so instead of offering the page as a match,
 * and keeps the page's replica beside it for reference.
 */
export function noteDownload(page: Page, label: string) {
	const state = armed.get(page);

	if (!replicateDir() || !state) {
		return;
	}

	const listing = path.join(state.folder, 'images.json');
	const manifest = JSON.parse(fs.readFileSync(listing, 'utf8'));

	fs.writeFileSync(listing, JSON.stringify({...manifest, download: label}, null, 1));
}

/**
 * Say that this step's lesson images cannot be replicated, and why.
 *
 * A lesson image of the browser's developer tools shows something no page
 * script can draw. Without this the replicator matched it against the page
 * and framed the footer, or reported it as not found, which reads as a
 * failure to look into rather than a known limit.
 */
export function unreplicable(page: Page, reason: string) {
	const state = armed.get(page);

	if (!replicateDir() || !state) {
		return;
	}

	const listing = path.join(state.folder, 'images.json');
	const manifest = JSON.parse(fs.readFileSync(listing, 'utf8'));

	fs.writeFileSync(listing, JSON.stringify({...manifest, unreplicable: reason}, null, 1));
}

export type Shot = {
	/** Capture this element alone rather than the whole screen. */
	frame?: Locator;

	/** The thing the image is about. Its box is recorded for the highlight. */
	highlight?: Locator;

	/** Regions to hide before capturing: reference codes, ids, addresses. */
	mask?: Locator[];

	/** The article-relative path, for example `05-site-building/.../images/02.png`. */
	name: string;

	/** Must be visible before the shutter. A shot of a half-drawn screen is worse than none. */
	shows?: Locator[];
};

export async function capture(page: Page, shot: Shot) {
	const root = process.env.LIFERAY_LEARN_DIR;

	const base = root
		? path.resolve(root, 'courses/latest/en')
		: path.resolve(process.cwd(), 'screenshots');

	const target = path.resolve(base, shot.name);

	//
	// Contained. path.join resolves "..", and the generator builds this name
	// with os.path.relpath, which emits "../.." for any lesson that is not
	// under courses/latest/en - so a scenario exported from a docs article or
	// with an absolute path would send every capture in the run outside the
	// tree, overwriting whatever it landed on.
	//
	if (target !== base && !target.startsWith(base + path.sep)) {
		throw new Error(
			`the screenshot name "${shot.name}" resolves outside ${base}`
		);
	}

	//
	// These overwrite published course images by design: that is how a run
	// leaves a reviewable diff. It also means a careless run replaces them
	// with whatever is on screen, so writing a NEW file - which no article
	// references - is refused unless asked for. A capture that invents a path
	// is a mistake, not a new screenshot.
	//
	if (root && !fs.existsSync(target) && !process.env.ALLOW_NEW_IMAGES) {
		throw new Error(
			`${shot.name} does not exist in liferay-learn, so no article ` +
				`references it. Set ALLOW_NEW_IMAGES=1 to add it.`
		);
	}

	fs.mkdirSync(path.dirname(target), {recursive: true});

	//
	// Waited for, not assumed. A capture taken while a panel is still
	// arriving shows a reader something no reader sees, and it looks like a
	// successful shot.
	//
	for (const locator of shot.shows || []) {
		await locator.first().waitFor({state: 'visible', timeout: 15000});
	}

	//
	// Waited for before measuring. boundingBox() answers null for an element
	// that is present but not yet laid out, and a null box means no sidecar,
	// which means the finishing script silently draws no highlight - a
	// missing box looks exactly like a shot that never wanted one.
	//
	let box = null;

	if (shot.highlight) {
		const target = shot.highlight.first();

		await target.waitFor({state: 'visible', timeout: 10000}).catch(
			() => undefined);

		await target.scrollIntoViewIfNeeded().catch(() => undefined);

		box = await target.boundingBox().catch(() => null);

		if (!box) {
			throw new Error(
				`the highlight for ${shot.name} could not be measured, so the ` +
					`image would be published without the box it needs`);
		}
	}

	await (shot.frame ? shot.frame.first() : page).screenshot({
		mask: shot.mask,
		path: target,
	});

	await endOfStepCandidates(page, `end of step ${path.basename(shot.name)}`);

	armed.delete(page);

	//
	// The box in CSS pixels beside the image, for the finishing script. Its
	// own comment explains why it is drawn there and not here.
	//
	if (box) {
		fs.writeFileSync(
			`${target}.box.json`,
			JSON.stringify(
				{
					height: Math.round(box.height),
					width: Math.round(box.width),
					x: Math.round(box.x),
					y: Math.round(box.y),
				},
				null,
				1
			)
		);
	}
}
