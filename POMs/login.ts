import { expect, Locator, Page } from "playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

export class LoginPage{
    readonly page: Page;
    loginLink: Locator;
    loginModal: Locator;
    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    welcomeAdminLink: Locator;


    constructor(page: Page){
        this.page = page;
        this.loginLink = page.getByRole('link', {name: 'Log in'});
        this.loginModal = page.getByRole('heading', { name: 'Log in' });
        this.usernameField = page.locator('#loginusername');
        this.passwordField = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.welcomeAdminLink = page.getByRole('link', {name: 'Welcome admin'});
    }

    public async assertLoginModalHasOpened(){
        await this.loginLink.click();
        await expect(this.loginModal).toBeVisible();
    }

    public async loginWithValidCredentials() {
        await this.usernameField.fill(process.env.VALID_USERNAME || '');
        await this.passwordField.fill(process.env.VALID_PASSWORD || '');
        await this.loginButton.click()
    }

    public async assertLoginIsSuccessful(){
        await expect(this.welcomeAdminLink).toBeVisible();
    }

}

export default LoginPage;