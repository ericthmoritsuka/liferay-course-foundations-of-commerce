/**
 * Setting Up the Workspace
 *
 * Generated from courses/latest/en/foundations-of-liferay-commerce/02-course-environment-setup/00-course-environment-setup.md.
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

test('Setting Up the Workspace', async ({page}) => {
	await signIn(page, 'admin');

	// Step 1. Open your terminal and run this command according to your operating system:
	// Not performed: this step is done at a terminal, not in a browser.

	// Screenshot skipped: the step it belongs to was not performed.
	await test.step.skip('Step 1. Open your terminal and run this command according to your operating system: - not performed: this step is done at a terminal, not in a browser', async () => {});

	// Step 2. Once the "Liferay bundle initialized" message displays, verify the `liferay-course-foundations-of-commerce/` folder was created.
	// Not performed: it is a check of what the screen shows, which is not automated yet.
	await test.step.skip('Step 2. Once the "Liferay bundle initialized" message displays, verify the `liferay-course-foundations-of-commerce/` folder was created. - not performed: it is a check of what the screen shows, which is not automated yet', async () => {});

	// Step 3. Go to the workspace's root folder in your terminal:
	// Not performed: this step is done at a terminal, not in a browser.
	await test.step.skip('Step 3. Go to the workspace\'s root folder in your terminal: - not performed: this step is done at a terminal, not in a browser', async () => {});

	// Step 4. Run this command to start the Liferay server:
	// Not performed: this step is done at a terminal, not in a browser.
	await test.step.skip('Step 4. Run this command to start the Liferay server: - not performed: this step is done at a terminal, not in a browser', async () => {});

	// Step 5. Verify the "Tomcat started" message appears.
	// Not performed: it is a check of what the screen shows, which is not automated yet.

	// Screenshot skipped: the step it belongs to was not performed.
	await test.step.skip('Step 5. Verify the "Tomcat started" message appears. - not performed: it is a check of what the screen shows, which is not automated yet', async () => {});

	// Step 6. Access your Liferay DXP instance by going to [localhost:8080](http://localhost:8080/) in your browser.
	// Not performed: the sign-in before the steps does this.
	await test.step.skip('Step 6. Access your Liferay DXP instance by going to [localhost:8080](http://localhost:8080/) in your browser. - not performed: the sign-in before the steps does this', async () => {});

	// Step 7. Sign in using these credentials:
	// Not performed: the sign-in before the steps does this.
	await test.step.skip('Step 7. Sign in using these credentials: - not performed: the sign-in before the steps does this', async () => {});

});
