import { test } from '@playwright/test';
import { LoginPage } from '../POMs/login';
import dotenv from 'dotenv';

dotenv.config();

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // given
    await loginPage.assertLoginModalHasOpened();

    //when
    await loginPage.loginWithValidCredentials();

    //then
    await loginPage.assertLoginIsSuccessful();
});
