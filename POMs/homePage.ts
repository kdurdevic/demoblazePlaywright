import { expect, Locator, Page } from "playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

export class HomePage {
    readonly page: Page;
    welcomeAdminLink: Locator;
    logoutLink: Locator;
    loginLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeAdminLink = page.getByRole('link', { name: 'Welcome admin' });
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
        this.loginLink = page.getByRole('link', { name: 'Log in' });
    }

    public async assertUserIsLoggedIn() {
        await expect(this.welcomeAdminLink).toBeVisible();
    }

    public async logoutUser() {
        await this.logoutLink.click();
    }

    public async assertUserIsLoggedOut() {
        await expect(this.loginLink).toBeVisible();
    }

}

export default HomePage;