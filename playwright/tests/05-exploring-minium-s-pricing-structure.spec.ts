/**
 * Exploring Minium's Pricing Structure
 *
 * Generated from courses/latest/en/foundations-of-liferay-commerce/08-managing-prices/00-managing-prices.md.
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

test('Exploring Minium\'s Pricing Structure', async ({page}) => {
	await signIn(page, 'chris');

	// Step 1. Sign in using these credentials:
	// Not performed: the sign-in before the steps does this.
	await test.step.skip('Step 1. Sign in using these credentials: - not performed: the sign-in before the steps does this', async () => {});

	// Step 2. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Commerce* tab, and click *Price Lists*.
	await test.step('Step 2. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Commerce* tab, and click *Price Lists*.', async () => {
		await openMenu(page, 'Global Menu', 'Commerce', 'Price Lists');
	});

	// Step 3. Select *Minium Base Price List* and navigate to the *Entries* tab.
	await test.step('Step 3. Select *Minium Base Price List* and navigate to the *Entries* tab.', async () => {
		await press(page, 'Minium Base Price List');
		await press(page, 'Entries');
		await noConfirmationLeft(page);
	});

	// Step 4. Within Entries, search for `muffler`**and observe the price.
	// Not performed: it is a check of what the screen shows, which is not automated yet.

	// Screenshot skipped: the step it belongs to was not performed.
	await test.step.skip('Step 4. Within Entries, search for `muffler`**and observe the price. - not performed: it is a check of what the screen shows, which is not automated yet', async () => {});

	// Step 5. Click *Back* (![Back](../../images/icon-angle-left.png)), then click *Gold Accounts Pricing* and navigate to the*Entries* tab.
	await test.step('Step 5. Click *Back* (![Back](../../images/icon-angle-left.png)), then click *Gold Accounts Pricing* and navigate to the*Entries* tab.', async () => {
		await press(page, 'Back', undefined, 'angle-left');
		await press(page, 'Gold Accounts Pricing');
		await press(page, 'Entries');
		await noConfirmationLeft(page);
	});

	// Step 6. Search for `muffler`**again and observe the price list price. Gold customers see this price instead of the default.
	// Not performed: it is a check of what the screen shows, which is not automated yet.
	await test.step.skip('Step 6. Search for `muffler`**again and observe the price list price. Gold customers see this price instead of the default. - not performed: it is a check of what the screen shows, which is not automated yet', async () => {});

	// Step 7. Navigate to Minium's *Catalog* page ([http://localhost:8080/web/minium/catalog](http://localhost:8080/web/minium/catalog)) and use the account selector to choose *Connolly Repair*.
	await test.step('Step 7. Navigate to Minium\'s *Catalog* page ([http://localhost:8080/web/minium/catalog](http://localhost:8080/web/minium/catalog)) and use the account selector to choose *Connolly Repair*.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/08-managing-prices/00-managing-prices/images/04.png']);
		await visit(page, '/web/minium/catalog');
		await chooseAccount(page, 'Connolly Repair');

		await capture(page, {name: 'foundations-of-liferay-commerce/08-managing-prices/00-managing-prices/images/04.png'});
	});

	// Step 8. Search for `muffler`. Since Connolly is not a Gold account, you should see the base price.
	await test.step('Step 8. Search for `muffler`. Since Connolly is not a Gold account, you should see the base price.', async () => {
		await search(page, 'muffler');
	});

	// Step 9. Use the account selector to choose *S Auto Service*. You should see the reduced Gold customer pricing.
	await test.step('Step 9. Use the account selector to choose *S Auto Service*. You should see the reduced Gold customer pricing.', async () => {
		test.info().annotations.push({type: 'not-performed', description: 'it is a check of what the screen shows, which is not automated yet'});
		await armCapture(page, ['foundations-of-liferay-commerce/08-managing-prices/00-managing-prices/images/05.png']);
		await chooseAccount(page, 'S Auto Service');
		// Not performed: it is a check of what the screen shows, which is not automated yet.

		await capture(page, {name: 'foundations-of-liferay-commerce/08-managing-prices/00-managing-prices/images/05.png'});
	});

	// Step 10. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Commerce* tab, and click *Discounts*.
	await test.step('Step 10. Open the *Global Menu* (![](../../images/icon-applications-menu.png)), go to the *Commerce* tab, and click *Discounts*.', async () => {
		await openMenu(page, 'Global Menu', 'Commerce', 'Discounts');
	});

	// Step 11. Click the *Summer Savings* discount.
	await test.step('Step 11. Click the *Summer Savings* discount.', async () => {
		await press(page, 'Summer Savings');
		await noConfirmationLeft(page);
	});

	// Step 12. Explore its configurations (e.g., Type, Apply To, Amount, Categories).
	// Not performed: the step does not name a field and a value plainly enough.

	// Screenshot skipped: the step it belongs to was not performed.
	await test.step.skip('Step 12. Explore its configurations (e.g., Type, Apply To, Amount, Categories). - not performed: the step does not name a field and a value plainly enough', async () => {});

	// Step 13. Navigate back to the catalog page and select *Brake System* in the *Category* facet.
	await test.step('Step 13. Navigate back to the catalog page and select *Brake System* in the *Category* facet.', async () => {
		await armCapture(page, ['foundations-of-liferay-commerce/08-managing-prices/00-managing-prices/images/07.png']);
		await visit(page, '/web/minium/catalog');
		await toggle(page, 'Brake System', true);

		await capture(page, {name: 'foundations-of-liferay-commerce/08-managing-prices/00-managing-prices/images/07.png'});
	});

});
