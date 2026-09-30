/**
 * Sign in as one of the course's users.
 *
 * Exercises are performed by different people on purpose - the site is built
 * by Walter Douglas, objects by Ian Miller, content by Christian Carter - and
 * a test that signs in as an administrator throughout proves the exercise
 * works for somebody the reader is not. Permissions are part of what a course
 * teaches, so they are part of what a test has to exercise.
 */
import {Page, expect, test} from '@playwright/test';

import * as fs from 'fs';
import * as path from 'path';

type Account = {email: string; password?: string};

/**
 * The course's users, by the key a generated test signs in with.
 *
 * Each course has its own: Clarity courses sign in as
 * admin@clarityvisionsolutions.com, Foundations of Liferay Commerce as
 * admin@minium.demo and a buyer from each of three companies. A table held
 * here served Clarity alone, and every Commerce test signed in as the Clarity
 * administrator and was refused. The generator writes tests/users.json from
 * the users block of the course's descriptor; COURSE_USERS names another file
 * (the self-test's). The passwords are the ones the lessons print, so there
 * is no secret in it.
 */
function usersFile(): string {
	return process.env.COURSE_USERS || path.join(__dirname, '..', 'tests', 'users.json');
}

export function courseUsers(): Record<string, Account> {
	const file = usersFile();

	if (!fs.existsSync(file)) {
		throw new Error(
			`${file} is missing: regenerate this course's tests ` +
				`(generate-course-tests.sh), which writes the users its lessons sign in as`
		);
	}

	return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

/**
 * The account a test signs in as. A name the course's users do not list is
 * refused by name, never replaced with the administrator: running the rest of
 * the exercise as somebody else is how a test passes for the wrong reader.
 */
function accountFor(who: string): Account {
	const account = courseUsers()[who];

	if (!account) {
		throw new Error(
			`the lesson signs in as "${who}", who is not in ${usersFile()}; ` +
				`add them to the users block of the course's descriptor and regenerate`
		);
	}

	return account;
}

/**
 * The page the course's exercises start from.
 *
 * Signing in lands wherever the instance sends you, which is not this
 * course's site - and the Site Menu lists the applications of the site the
 * browser is in, so a step saying "open the Site Menu and click Pages" finds
 * a menu belonging to somewhere else. Standing where the reader stands is
 * part of signing in as the reader.
 */
const HOME = process.env.COURSE_HOME || '/web/clarity/home';

/**
 * What a signed-in page has and a guest's does not: a personal menu.
 */
const SIGNED_IN =
	'[data-qa-id="userMenu"], [aria-label*="user" i][aria-haspopup], ' +
	'.user-avatar, [data-qa-id="globalMenu"]';

/**
 * Where a user's session is kept for the rest of the run.
 *
 * Every test starts in a fresh browser with no cookies, so every exercise
 * went through the sign-in form again, as the same user, even when nothing
 * had changed. The first sign-in as a user now saves that user's cookies, and
 * a later sign-in as the same user - the next exercise, or a switch back -
 * restores them instead of typing the form again. Kept in the run's output
 * folder, which Playwright empties when a run starts, so a session never
 * outlives the database restore that made it meaningless.
 */
function sessionFile(who: string): string {
	return path.join(
		test.info().project.outputDir,
		'.sessions',
		`${who.replace(/[^\w.@-]/g, '_')}.json`
	);
}

/**
 * Where the reader is once signed in.
 *
 * Liferay returns a reader who signs in on a site page to that page. So a
 * sign-in in the middle of an exercise, on a site other than COURSE_HOME's,
 * lands back where the reader was: Exploring Inventory Sources switches to
 * Mike on Commerce's Minium storefront, and the test landed on COURSE_HOME,
 * the guest site (Minium does not exist until the second exercise builds
 * it), and looked there for the dashboard. At the start of a test, or from
 * COURSE_HOME's own site, it is COURSE_HOME, as it always was.
 */
function landing(page: Page): string {
	if (!page.url().startsWith('http')) {
		return HOME;
	}

	const here = new URL(page.url());

	const site = /^\/web\/[^/]+/.exec(here.pathname);
	const home = /^\/web\/[^/]+/.exec(HOME);

	return site && home && (site[0] !== home[0]) ? here.pathname + here.search : HOME;
}

export async function signIn(page: Page, who: string) {
	const account = accountFor(who);

	const saved = sessionFile(who);

	const destination = landing(page);

	if (fs.existsSync(saved) && (await resumeSession(page, saved, destination))) {
		await expectHome(page, destination);

		return;
	}

	await signInWithForm(page, account);

	fs.mkdirSync(path.dirname(saved), {recursive: true});

	await page.context().storageState({path: saved});

	await page.goto(destination);

	await page
		.waitForLoadState('networkidle', {timeout: 4000})
		.catch(() => undefined);

	await expectHome(page, destination);
}

/**
 * The saved session, restored, or false when the server no longer honours it
 * (it timed out between two exercises), so the form is used instead.
 */
async function resumeSession(page: Page, saved: string, destination: string): Promise<boolean> {
	const state = JSON.parse(fs.readFileSync(saved, 'utf-8'));

	await page.context().clearCookies();

	await page.context().addCookies(state.cookies || []);

	await page.goto(destination);

	await page
		.waitForLoadState('networkidle', {timeout: 4000})
		.catch(() => undefined);

	return page
		.locator(SIGNED_IN)
		.first()
		.waitFor({state: 'visible', timeout: 10000})
		.then(
			() => true,
			() => false
		);
}

async function signInWithForm(page: Page, account: Account) {
	const emailAddress = account.email;

	const password = account.password || process.env.CLARITY_PASSWORD || 'learn';

	//
	// Signed out first. "Sign in as Clarity Admin" halfway through an
	// exercise found the reader already signed in, and the sign-in page
	// redirects a signed-in visitor away without a form, so there was
	// nothing to type into. The cookies are cleared rather than the session
	// logged out: logging out ends the session another user's saved cookies
	// belong to, and switching back to them would need the form again.
	//
	await page.context().clearCookies();

	await page.goto('/c/portal/login');

	await page.getByLabel(/email|username/i).first().fill(emailAddress);

	await page.getByLabel(/password/i).first().fill(password);

	//
	// Scoped to the sign-in form. An unscoped "submit" matched the search
	// box's button, which submits an empty search and leaves the reader
	// signed out while the step reports success.
	//
	await page
		.getByLabel(/password/i)
		.first()
		.locator('xpath=ancestor::form//button[@type="submit"]')
		.first()
		.click();

	await page
		.waitForLoadState('networkidle', {timeout: 4000})
		.catch(() => undefined);

	//
	// A wrong password returns the sign-in page with an error rather than an
	// exception, so the test has to look.
	//
	await expect(
		page.locator('text=/authentication failed|please enter a valid/i'),
		`signing in as ${emailAddress} was rejected`
	).toHaveCount(0);

	//
	// And proof that it worked, not just absence of a known error string.
	// The check above depends on Liferay's English wording; a localised
	// instance, or a rejection phrased any other way, would leave the browser
	// signed out as a guest while every later step blamed a missing control.
	// A signed-in session has a personal menu; a guest does not.
	//
	await expect(
		page.locator(SIGNED_IN).first(),
		`signing in as ${emailAddress} appeared to work but the session is ` +
			`not signed in`
	).toBeVisible({timeout: 15000});
}

async function expectHome(page: Page, destination: string) {
	//
	// That the page the reader lands on is really there.
	//
	// Liferay renders its 404 inside the Guest site rather than failing, and
	// the Guest site here is named after the same company - so a wrong
	// COURSE_HOME looks like a working instance whose every menu is missing
	// applications. One wrong character in a path was measured turning into
	// 21 separate "the Site Menu offers no application named X" failures, and
	// nothing in a run of 67 said the word 404 once.
	//
	await expect(
		page.locator('text=/^\\s*404\\s*$/').first(),
		destination === HOME
			? `COURSE_HOME (${HOME}) is not a page on this instance, so the ` +
				`exercise would run against Liferay's 404 page in the Guest site`
			: `${destination}, where the reader signed in, is Liferay's 404 page`
	).toHaveCount(0);
}
