/**
 * Exploring Inventory Sources
 *
 * Generated from courses/latest/en/foundations-of-liferay-commerce/09-managing-inventory/00-managing-inventory.md.
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

test('Exploring Inventory Sources', async ({page}) => {
	await signIn(page, 'roberto');

	// Step 1. Sign in using these credentials:
	// Not performed: the sign-in before the steps does this.
	await test.step.skip('Step 1. Sign in using these credentials: - not performed: the sign-in before the steps does this', async () => {});

	// Step 2. Access the Minium site at [http://localhost:8080/web/minium](http://localhost:8080/web/minium).
	await test.step('Step 2. Access the Minium site at [http://localhost:8080/web/minium](http://localhost:8080/web/minium).', async () => {
		await visit(page, '/web/minium');
	});

	// Step 3. Click *Brake Rotors* on the Dashboard.
	await test.step('Step 3. Click *Brake Rotors* on the Dashboard.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/09-managing-inventory/00-managing-inventory/images/01.png']);
		await press(page, 'Brake Rotors');
		await noConfirmationLeft(page);

		await capture(page, {name: 'foundations-of-liferay-commerce/09-managing-inventory/00-managing-inventory/images/01.png'});
	});

	// Step 4. Observe the number of in-stock brake rotors available for Leo Auto.
	// Not performed: it is a check of what the screen shows, which is not automated yet.

	// Screenshot skipped: the step it belongs to was not performed.
	await test.step.skip('Step 4. Observe the number of in-stock brake rotors available for Leo Auto. - not performed: it is a check of what the screen shows, which is not automated yet', async () => {});

	// Step 5. Sign in using these credentials:
	await test.step('Step 5. Sign in using these credentials:', async () => {
		await signIn(page, 'mike');
	});

	// Step 6. Navigate to the dashboard page and select *Brake Rotors*.
	await test.step('Step 6. Navigate to the dashboard page and select *Brake Rotors*.', async () => {
		await openSitePage(page, 'dashboard');
		await press(page, 'Brake Rotors');
		await noConfirmationLeft(page);
	});

	// Step 7. Observe the number of in-stock brake rotors for S Auto Service.
	// Not performed: it is a check of what the screen shows, which is not automated yet.

	// Screenshot skipped: the step it belongs to was not performed.
	await test.step.skip('Step 7. Observe the number of in-stock brake rotors for S Auto Service. - not performed: it is a check of what the screen shows, which is not automated yet', async () => {});

	// Step 8. Sign in using these credentials:
	await test.step('Step 8. Sign in using these credentials:', async () => {
		await signIn(page, 'chris');
	});

	// Step 9. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Commerce* tab, and click *Warehouses*.
	await test.step('Step 9. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Commerce* tab, and click *Warehouses*.', async () => {
		await openMenu(page, 'Global Menu', 'Commerce', 'Warehouses');
	});

	// Step 10. Select each warehouse and review its *Eligibility* tab to observe its configurations.
	// Not performed: it repeats for every item the page lists, which is not automated yet.

	// Screenshot skipped: the step it belongs to was not performed.
	await test.step.skip('Step 10. Select each warehouse and review its *Eligibility* tab to observe its configurations. - not performed: it repeats for every item the page lists, which is not automated yet', async () => {});

});
