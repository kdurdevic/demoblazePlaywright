import { expect, Locator, Page } from "playwright/test";

export class LoginPage {
    readonly page: Page;
    loginLink: Locator;
    loginModal: Locator;
    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    welcomeAdminLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.loginModal = page.getByRole('heading', { name: 'Log in' });
        this.usernameField = page.locator('#loginusername');
        this.passwordField = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.welcomeAdminLink = page.getByRole('link', { name: 'Welcome admin' });
    }

    async assertLoginModalHasOpened() {
        await this.loginLink.click();
        await expect(this.loginModal).toBeVisible();
    }

    async loginWithValidCredentials() {
        await this.usernameField.fill(process.env.VALID_USERNAME || '');
        await this.passwordField.fill(process.env.VALID_PASSWORD || '');
        await this.loginButton.click()
    }

    async assertLoginIsSuccessful() {
        await expect(this.welcomeAdminLink).toBeVisible();
    }

    async loginWithNonExistingUser() {
        await this.usernameField.fill(process.env.INVALID_USERNAME || '');
        await this.passwordField.fill(process.env.INVALID_PASSWORD || '');
        await this.loginButton.click()
    }

    async assertDialogForNonExistingUserIsShown(expectedMessage: string) {
        const dialog = await this.page.waitForEvent('dialog');
        expect(dialog.message()).toContain(expectedMessage);
        await dialog.accept();
    }

    async loginWithWrongPassword() {
        await this.usernameField.fill(process.env.VALID_USERNAME || '');
        await this.passwordField.fill(process.env.INVALID_PASSWORD || '');
        await this.loginButton.click()
    }

    async assertDialogForWrongPasswordIsShown(expectedMessage: string) {
        const dialog = await this.page.waitForEvent('dialog');
        expect(dialog.message()).toContain(expectedMessage);
        await dialog.accept();
    }
}

export default LoginPage;