/**
 * Adjusting Roles through Account Self-Service
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

test('Adjusting Roles through Account Self-Service', async ({page}) => {
	await signIn(page, 'brenda');

	// Step 1. Sign in using these credentials:
	// Not performed: the sign-in before the steps does this.
	await test.step.skip('Step 1. Sign in using these credentials: - not performed: the sign-in before the steps does this', async () => {});

	// Step 2. Access the Minium site at [http://localhost:8080/web/minium](http://localhost:8080/web/minium).
	await test.step('Step 2. Access the Minium site at [http://localhost:8080/web/minium](http://localhost:8080/web/minium).', async () => {
		await visit(page, '/web/minium');
	});

	// Step 3. Navigate to the Account Management page.
	await test.step('Step 3. Navigate to the Account Management page.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/06-managing-commerce-users/00-managing-commerce-users/images/05.png']);
		await openSitePage(page, 'Account Management');

		await capture(page, {name: 'foundations-of-liferay-commerce/06-managing-commerce-users/00-managing-commerce-users/images/05.png'});
	});

	// Step 4. Click *S Auto Service*.
	await test.step('Step 4. Click *S Auto Service*.', async () => {
		await press(page, 'S Auto Service');
		await noConfirmationLeft(page);
	});

	// Step 5. Click *Users*.
	await test.step('Step 5. Click *Users*.', async () => {
		await press(page, 'Users');
		await noConfirmationLeft(page);
	});

	// Step 6. Click *Actions* (![](../../images/icon-actions.png)) for Mike Smith and select *Assign Roles*.
	await test.step('Step 6. Click *Actions* (![](../../images/icon-actions.png)) for Mike Smith and select *Assign Roles*.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/06-managing-commerce-users/00-managing-commerce-users/images/06.png']);
		await press(page, 'Actions', 'Mike Smith', 'actions');
		await press(page, 'Assign Roles');
		await noConfirmationLeft(page);

		await capture(page, {name: 'foundations-of-liferay-commerce/06-managing-commerce-users/00-managing-commerce-users/images/06.png'});
	});

	// Step 7. Select the *Order Manager* and *Account Administrator* roles.
	await test.step('Step 7. Select the *Order Manager* and *Account Administrator* roles.', async () => {
		await press(page, 'Order Manager');
		await press(page, 'Account Administrator');
		await noConfirmationLeft(page);
	});

	// Step 8. Click *Done*.
	await test.step('Step 8. Click *Done*.', async () => {
		await press(page, 'Done');
		await noConfirmationLeft(page);
	});

});
