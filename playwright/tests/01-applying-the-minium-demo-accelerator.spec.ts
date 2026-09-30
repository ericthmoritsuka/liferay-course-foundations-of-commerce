/**
 * Applying the Minium Demo Accelerator
 *
 * Generated from courses/latest/en/foundations-of-liferay-commerce/04-determining-a-commerce-implementation-strategy/00-determining-a-commerce-implementation-strategy.md.
 * Edit the lesson and regenerate; edits here are overwritten.
 *
 * A pass means nothing blocked a reader. It does not mean the
 * exercise built the right thing - nothing records what it should
 * build.
 */
import {test} from '@playwright/test';

import {addComponent, attach, checkEach, choose, chooseAccount, chooseExperience, closeModal, download, enableSomeOptions, expectRow, expectShown, fill, fillEach, fragmentOption, goHome, noConfirmationLeft, openFromPageTree, openMenu, openSitePage, openPageEditor, openPageSettings, press, pressKeys, pressOneOf, reload, reorderMenu, search, selectInEditor, toggle, transfer, verifyHead, visit, visitAsGuest, visitInNewBrowser, waitForReindex} from '../helpers/liferay';
import {CAPTURE, armCapture, capture} from '../helpers/screenshot';
import {signIn} from '../helpers/sign-in';

//
// The style guide's display width, captured at twice it.
//
test.use(CAPTURE);

test('Applying the Minium Demo Accelerator', async ({page}) => {
	await signIn(page, 'admin');

	// Step 1. Access your Liferay DXP instance by going to [localhost:8080](http://localhost:8080/) in your browser.
	// Not performed: the sign-in before the steps does this.
	await test.step.skip('Step 1. Access your Liferay DXP instance by going to [localhost:8080](http://localhost:8080/) in your browser. - not performed: the sign-in before the steps does this', async () => {});

	// Step 2. Sign in using these credentials:
	// Not performed: the sign-in before the steps does this.
	await test.step.skip('Step 2. Sign in using these credentials: - not performed: the sign-in before the steps does this', async () => {});

	// Step 3. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Control Panel* tab, and click *Sites*.
	await test.step('Step 3. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Control Panel* tab, and click *Sites*.', async () => {
		await openMenu(page, 'Global Menu', 'Control Panel', 'Sites');
	});

	// Step 4. Click *New*.
	await test.step('Step 4. Click *New*.', async () => {
		await press(page, 'New');
		await noConfirmationLeft(page);
	});

	// Step 5. Select the *Minium Demo* listing.
	await test.step('Step 5. Select the *Minium Demo* listing.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/04-determining-a-commerce-implementation-strategy/00-determining-a-commerce-implementation-strategy/images/01.png']);
		await press(page, 'Minium Demo');
		await noConfirmationLeft(page);

		await capture(page, {name: 'foundations-of-liferay-commerce/04-determining-a-commerce-implementation-strategy/00-determining-a-commerce-implementation-strategy/images/01.png'});
	});

	// Step 6. For name, enter `Minium`.
	await test.step('Step 6. For name, enter `Minium`.', async () => {
		await fill(page, 'name', 'Minium');
	});

	// Step 7. Click *Add* (![](../../images/icon-add.png)).
	await test.step('Step 7. Click *Add* (![](../../images/icon-add.png)).', async () => {
		await press(page, 'Add', undefined, 'add');
		await noConfirmationLeft(page);
	});

	// Step 8. After a few minutes, a success message will indicate that the site was created successfully.
	// Not performed: no control or value named in this step.

	// Screenshot skipped: the step it belongs to was not performed.
	await test.step.skip('Step 8. After a few minutes, a success message will indicate that the site was created successfully. - not performed: no control or value named in this step', async () => {});

	// Step 9. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), and select *Minium*.
	await test.step('Step 9. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), and select *Minium*.', async () => {
		await openMenu(page, 'Global Menu', null, 'Minium');
	});

});
