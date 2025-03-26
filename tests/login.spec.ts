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

    await loginPage.assertLoginModalHasOpened();
    await loginPage.loginWithValidCredentials();
    await loginPage.assertLoginIsSuccessful();
});
