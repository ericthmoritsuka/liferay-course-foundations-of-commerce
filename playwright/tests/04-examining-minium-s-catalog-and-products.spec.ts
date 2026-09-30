/**
 * Examining Minium's Catalog and Products
 *
 * Generated from courses/latest/en/foundations-of-liferay-commerce/07-managing-products/00-managing-products.md.
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

test('Examining Minium\'s Catalog and Products', async ({page}) => {
	await signIn(page, 'chris');

	// Step 1. Sign in using these credentials:
	// Not performed: the sign-in before the steps does this.
	await test.step.skip('Step 1. Sign in using these credentials: - not performed: the sign-in before the steps does this', async () => {});

	// Step 2. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Commerce* tab, and click *Catalogs*.
	await test.step('Step 2. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Commerce* tab, and click *Catalogs*.', async () => {
		await openMenu(page, 'Global Menu', 'Commerce', 'Catalogs');
	});

	// Step 3. Select the *Minium* catalog and review its configurations.
	await test.step('Step 3. Select the *Minium* catalog and review its configurations.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/07-managing-products/00-managing-products/images/04.png']);
		await press(page, 'Minium');
		await noConfirmationLeft(page);

		await capture(page, {name: 'foundations-of-liferay-commerce/07-managing-products/00-managing-products/images/04.png'});
	});

	// Step 4. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Commerce* tab, and click *Products*.
	await test.step('Step 4. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Commerce* tab, and click *Products*.', async () => {
		await openMenu(page, 'Global Menu', 'Commerce', 'Products');
	});

	// Step 5. Select the *Brake Fluid* product.
	await test.step('Step 5. Select the *Brake Fluid* product.', async () => {
		await press(page, 'Brake Fluid');
		await noConfirmationLeft(page);
	});

	// Step 6. Explore the available product configurations, examining the specifications and categorization defined on the *Details* tab.
	// Not performed: no control or value named in this step.

	// Screenshot skipped: the step it belongs to was not performed.
	await test.step.skip('Step 6. Explore the available product configurations, examining the specifications and categorization defined on the *Details* tab. - not performed: no control or value named in this step', async () => {});

	// Step 7. Select the *Options* tab and examine the configured package quantities.
	await test.step('Step 7. Select the *Options* tab and examine the configured package quantities.', async () => {
		await press(page, 'Options');
		await noConfirmationLeft(page);
	});

	// Step 8. Select the *SKUs* tab and examine the three listed SKUs.
	await test.step('Step 8. Select the *SKUs* tab and examine the three listed SKUs.', async () => {
		await press(page, 'SKUs');
		await noConfirmationLeft(page);
	});

	// Step 9. Navigate to the Brake Fluid product page ([http://localhost:8080/web/minium/p/brake-fluid](http://localhost:8080/web/minium/p/brake-fluid)) and observe its customer-facing display.
	await test.step('Step 9. Navigate to the Brake Fluid product page ([http://localhost:8080/web/minium/p/brake-fluid](http://localhost:8080/web/minium/p/brake-fluid)) and observe its customer-facing display.', async () => {
		test.info().annotations.push({type: 'not-performed', description: 'it is a check of what the screen shows, which is not automated yet'});
		await armCapture(page, ['foundations-of-liferay-commerce/07-managing-products/00-managing-products/images/06.png']);
		await visit(page, '/web/minium/p/brake-fluid');
		// Not performed: it is a check of what the screen shows, which is not automated yet.

		await capture(page, {name: 'foundations-of-liferay-commerce/07-managing-products/00-managing-products/images/06.png'});
	});

});
