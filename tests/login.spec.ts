import { test } from '@playwright/test';
import { LoginPage } from '../POMs/login';

test.use({ storageState: { cookies: [], origins: [] } });

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
});

test('Successful login', async () => {
    // given
    await loginPage.assertLoginModalHasOpened();

    //when
    await loginPage.loginWithValidCredentials();

    //then
    await loginPage.assertLoginIsSuccessful();
});

test('Login with nonexisting user', async () => {
    // given
    await loginPage.assertLoginModalHasOpened();

    // when
    await loginPage.loginWithNonExistingUser();

    // then
    await loginPage.assertDialogForNonExistingUserIsShown('User does not exist.');
});

test('Login with wrong password', async () => {
    // given
    await loginPage.assertLoginModalHasOpened();

    // when
    await loginPage.loginWithWrongPassword();

    // then
    await loginPage.assertDialogForNonExistingUserIsShown('Wrong password.');
});

