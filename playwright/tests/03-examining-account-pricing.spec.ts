/**
 * Examining Account Pricing
 *
 * Generated from courses/latest/en/foundations-of-liferay-commerce/06-managing-commerce-users/00-managing-commerce-users.md.
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

test('Examining Account Pricing', async ({page}) => {
	await signIn(page, 'gloria');

	// Step 1. Sign in using these credentials:
	// Not performed: the sign-in before the steps does this.
	await test.step.skip('Step 1. Sign in using these credentials: - not performed: the sign-in before the steps does this', async () => {});

	// Step 2. Access the Minium site at [http://localhost:8080/web/minium](http://localhost:8080/web/minium).
	await test.step('Step 2. Access the Minium site at [http://localhost:8080/web/minium](http://localhost:8080/web/minium).', async () => {
		await visit(page, '/web/minium');
	});

	// Step 3. Identify the CC West account icon at the top right of your screen.
	// Not performed: no control or value named in this step.

	// Screenshot skipped: the step it belongs to was not performed.
	await test.step.skip('Step 3. Identify the CC West account icon at the top right of your screen. - not performed: no control or value named in this step', async () => {});

	// Step 4. Click the *account selector* and then click *Back* (![](../../images/icon-angle-left.png)) to view Gloria's assigned accounts.
	await test.step('Step 4. Click the *account selector* and then click *Back* (![](../../images/icon-angle-left.png)) to view Gloria\'s assigned accounts.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/06-managing-commerce-users/00-managing-commerce-users/images/08.png']);
		await press(page, 'account selector');
		await press(page, 'Back', undefined, 'angle-left');
		await noConfirmationLeft(page);

		await capture(page, {name: 'foundations-of-liferay-commerce/06-managing-commerce-users/00-managing-commerce-users/images/08.png'});
	});

	// Step 5. Select the *Connelly Repair* account.
	await test.step('Step 5. Select the *Connelly Repair* account.', async () => {
		await press(page, 'Connelly Repair');
		await noConfirmationLeft(page);
	});

	// Step 6. Click *Add to Cart* for Brake Pads and open the cart in the upper right.
	await test.step('Step 6. Click *Add to Cart* for Brake Pads and open the cart in the upper right.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/06-managing-commerce-users/00-managing-commerce-users/images/09.png']);
		await press(page, 'Add to Cart', 'Brake Pads');
		await noConfirmationLeft(page);

		await capture(page, {name: 'foundations-of-liferay-commerce/06-managing-commerce-users/00-managing-commerce-users/images/09.png'});
	});

	// Step 7. Click the *account selector* and switch to the *S Auto Service* account.
	await test.step('Step 7. Click the *account selector* and switch to the *S Auto Service* account.', async () => {
		await press(page, 'account selector');
		await press(page, 'S Auto Service');
		await noConfirmationLeft(page);
	});

	// Step 8. Identify the price of brake pads and examine the modified cost available for the Gold account group.
	// Not performed: no control or value named in this step.
	await test.step.skip('Step 8. Identify the price of brake pads and examine the modified cost available for the Gold account group. - not performed: no control or value named in this step', async () => {});

});
