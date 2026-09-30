/**
 * Examining Storefront Experiences
 *
 * Generated from courses/latest/en/foundations-of-liferay-commerce/11-building-the-storefront/00-building-the-storefront.md.
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

test('Examining Storefront Experiences', async ({page}) => {
	await signIn(page, 'mike');

	// Step 1. Access the Minium site at [http://localhost:8080/web/minium](http://localhost:8080/web/minium).
	await test.step('Step 1. Access the Minium site at [http://localhost:8080/web/minium](http://localhost:8080/web/minium).', async () => {
		await visit(page, '/web/minium');
	});

	// Step 2. Sign in using these credentials:
	// Not performed: the sign-in before the steps does this.
	await test.step.skip('Step 2. Sign in using these credentials: - not performed: the sign-in before the steps does this', async () => {});

	// Step 3. Navigate to the *Catalog* page.
	await test.step('Step 3. Navigate to the *Catalog* page.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/11-building-the-storefront/00-building-the-storefront/images/03.png']);
		await openSitePage(page, 'Catalog');

		await capture(page, {name: 'foundations-of-liferay-commerce/11-building-the-storefront/00-building-the-storefront/images/03.png'});
	});

	// Step 4. Using the search bar above the search facets, search for `master cylinder`.
	await test.step('Step 4. Using the search bar above the search facets, search for `master cylinder`.', async () => {
		await search(page, 'master cylinder');
	});

	// Step 5. Select the compare box for each of the three returned products.
	await test.step('Step 5. Select the compare box for each of the three returned products.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/11-building-the-storefront/00-building-the-storefront/images/04.png']);
		await checkEach(page, 'Compare', 3);

		await capture(page, {name: 'foundations-of-liferay-commerce/11-building-the-storefront/00-building-the-storefront/images/04.png'});
	});

	// Step 6. Click *Compare,*then select *Add to Cart*for one of the master cylinders.
	await test.step('Step 6. Click *Compare,*then select *Add to Cart*for one of the master cylinders.', async () => {
		await press(page, 'Compare');
		await pressOneOf(page, 'Add to Cart', 'master cylinders');
		await noConfirmationLeft(page);
	});

	// Step 7. Navigate to the *Pending Orders* page.
	await test.step('Step 7. Navigate to the *Pending Orders* page.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/11-building-the-storefront/00-building-the-storefront/images/05.png']);
		await openSitePage(page, 'Pending Orders');

		await capture(page, {name: 'foundations-of-liferay-commerce/11-building-the-storefront/00-building-the-storefront/images/05.png'});
	});

	// Step 8. Click *View* for the order you created, then click *Checkout*.
	await test.step('Step 8. Click *View* for the order you created, then click *Checkout*.', async () => {
		await press(page, 'View', 'order you created');
		await press(page, 'Checkout');
		await noConfirmationLeft(page);
	});

	// Step 9. Select *S Auto Service* from the Shipping Address drop-down menu.
	await test.step('Step 9. Select *S Auto Service* from the Shipping Address drop-down menu.', async () => {
		await choose(page, 'Shipping Address', 'S Auto Service');
	});

	// Step 10. Ensure *Use shipping address as billing address* is selected and click *Continue*.
	await test.step('Step 10. Ensure *Use shipping address as billing address* is selected and click *Continue*.', async () => {
		test.info().annotations.push({type: 'not-performed', description: 'checking what the step says to notice or verify'});
		await press(page, 'Continue');
		// Not performed: checking what the step says to notice or verify.
	});

	// Step 11. Select *Expedited Delivery* and click *Continue*.
	await test.step('Step 11. Select *Expedited Delivery* and click *Continue*.', async () => {
		await press(page, 'Expedited Delivery');
		await press(page, 'Continue');
	});

	// Step 12. Review the order on the *Order Summary step,* then click *Continue* to place your order.
	await test.step('Step 12. Review the order on the *Order Summary step,* then click *Continue* to place your order.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/11-building-the-storefront/00-building-the-storefront/images/06.png']);
		await press(page, 'Continue');
		await noConfirmationLeft(page);

		await capture(page, {name: 'foundations-of-liferay-commerce/11-building-the-storefront/00-building-the-storefront/images/06.png'});
	});

	// Step 13. Click the *Go to Order Details* button to see the submitted order.
	await test.step('Step 13. Click the *Go to Order Details* button to see the submitted order.', async () => {
		await press(page, 'Go to Order Details');
		await noConfirmationLeft(page);
	});

});
