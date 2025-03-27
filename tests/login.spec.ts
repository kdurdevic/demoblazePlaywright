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

test('Login with nonexisting user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // given
    await loginPage.assertLoginModalHasOpened();

    // when
    await loginPage.loginWithNonExistingUser();

    // then
    await loginPage.assertDialogForNonExistingUserIsShown('User does not exist.');
});

test('Login with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // given
    await loginPage.assertLoginModalHasOpened();

    // when
    await loginPage.loginWithWrongPassword();

    // then
    await loginPage.assertDialogForNonExistingUserIsShown('Wrong password.');
});

