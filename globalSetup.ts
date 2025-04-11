import path from 'path';
import { chromium } from '@playwright/test';
import LoginPage from './POMs/login';

const authFileDir = path.join(__dirname, 'playwright/.auth');
const authFile = path.join(authFileDir, 'user.json');

async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    // given
    await page.goto('https://www.demoblaze.com/index.html');
    await loginPage.assertLoginModalHasOpened();

    // when
    await loginPage.loginWithValidCredentials();
    await loginPage.assertLoginIsSuccessful();

    // then
    await context.storageState({ path: authFile });
    await browser.close();

}

export default globalSetup;
