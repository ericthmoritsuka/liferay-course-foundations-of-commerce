/**
 * Exploring Order Placement Capabilities
 *
 * Generated from courses/latest/en/foundations-of-liferay-commerce/10-managing-orders/00-managing-orders.md.
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

test('Exploring Order Placement Capabilities', async ({page}) => {
	await signIn(page, 'mike');

	// Step 1. Sign in using these credentials:
	// Not performed: the sign-in before the steps does this.
	await test.step.skip('Step 1. Sign in using these credentials: - not performed: the sign-in before the steps does this', async () => {});

	// Step 2. Navigate to the *Catalog* page ([http://localhost:8080/web/minium/catalog](http://localhost:8080/web/minium/catalog)) and add several products to the cart.
	await test.step('Step 2. Navigate to the *Catalog* page ([http://localhost:8080/web/minium/catalog](http://localhost:8080/web/minium/catalog)) and add several products to the cart.', async () => {
		test.info().annotations.push({type: 'not-performed', description: 'no control or value named in this step'});
		await armCapture(page, ['foundations-of-liferay-commerce/10-managing-orders/00-managing-orders/images/03.png']);
		await visit(page, '/web/minium/catalog');
		// Not performed: no control or value named in this step.

		await capture(page, {name: 'foundations-of-liferay-commerce/10-managing-orders/00-managing-orders/images/03.png'});
	});

	// Step 3. Sign in using these credentials:
	await test.step('Step 3. Sign in using these credentials:', async () => {
		await signIn(page, 'brenda');
	});

	// Step 4. Navigate to the *Dashboard* page ([http://localhost:8080/web/minium/dashboard](http://localhost:8080/web/minium/dashboard)) and observe the in-progress cart.
	await test.step('Step 4. Navigate to the *Dashboard* page ([http://localhost:8080/web/minium/dashboard](http://localhost:8080/web/minium/dashboard)) and observe the in-progress cart.', async () => {
		test.info().annotations.push({type: 'not-performed', description: 'it is a check of what the screen shows, which is not automated yet'});
		await armCapture(page, ['foundations-of-liferay-commerce/10-managing-orders/00-managing-orders/images/04.png']);
		await visit(page, '/web/minium/dashboard');
		// Not performed: it is a check of what the screen shows, which is not automated yet.

		await capture(page, {name: 'foundations-of-liferay-commerce/10-managing-orders/00-managing-orders/images/04.png'});
	});

	// Step 5. Click the *Account Selector* and select *Create New Order*.
	await test.step('Step 5. Click the *Account Selector* and select *Create New Order*.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/10-managing-orders/00-managing-orders/images/05.png']);
		await press(page, 'Account Selector');
		await press(page, 'Create New Order');
		await noConfirmationLeft(page);

		await capture(page, {name: 'foundations-of-liferay-commerce/10-managing-orders/00-managing-orders/images/05.png'});
	});

	// Step 6. Enter the following information and click *Save*.
	await test.step('Step 6. Enter the following information and click *Save*.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/10-managing-orders/00-managing-orders/images/06.png']);
		await choose(page, 'Name', 'Expedited Oil Pump Order');
		await choose(page, 'Billing Address', 'S Auto Service');
		await choose(page, 'Shipping Address', 'S Auto Service');
		await press(page, 'Save');
		await noConfirmationLeft(page);

		await capture(page, {name: 'foundations-of-liferay-commerce/10-managing-orders/00-managing-orders/images/06.png'});
	});

	// Step 7. Navigate to the catalog page, find the oil pump product, and click *Add to Cart*.
	await test.step('Step 7. Navigate to the catalog page, find the oil pump product, and click *Add to Cart*.', async () => {
		await openSitePage(page, 'catalog');
		await search(page, 'oil pump');
		await press(page, 'Add to Cart', 'oil pump');
		await noConfirmationLeft(page);
	});

	// Step 8. Click the *Mini Cart* icon (![](../../images/icon-mini-cart.png)) and click *Submit*.
	await test.step('Step 8. Click the *Mini Cart* icon (![](../../images/icon-mini-cart.png)) and click *Submit*.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/10-managing-orders/00-managing-orders/images/07.png']);
		await press(page, 'Mini Cart');
		await press(page, 'Submit');

		await capture(page, {name: 'foundations-of-liferay-commerce/10-managing-orders/00-managing-orders/images/07.png'});
	});

	// Step 9. Click *Continue*, select *Expedited Delivery*, and click *Continue* again.
	await test.step('Step 9. Click *Continue*, select *Expedited Delivery*, and click *Continue* again.', async () => {
		await press(page, 'Continue');
		await press(page, 'Expedited Delivery');
		await press(page, 'Continue');
	});

	// Step 10. Review the order on the *Order Summary* page and click *Continue* to place the order.
	await test.step('Step 10. Review the order on the *Order Summary* page and click *Continue* to place the order.', async () => {
		await press(page, 'Continue');
		await noConfirmationLeft(page);
	});

});
