import { expect, Locator, Page } from "playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

export class HomePage {
    readonly page: Page;
    homeLink: Locator;
    welcomeAdminLink: Locator;
    logoutLink: Locator;
    loginLink: Locator;
    phoneItem: Locator;
    laptopsFilter: Locator;
    laptopItem: Locator;
    monitorsFilter: Locator;
    monitorItem: Locator;
    addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.getByRole('link', { name: 'Home (current)' });
        this.welcomeAdminLink = page.getByRole('link', { name: 'Welcome admin' });
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.phoneItem = page.getByRole('link', { name: 'Samsung galaxy s6' });
        this.laptopsFilter = page.getByRole('link', { name: 'Laptops' });
        this.laptopItem = page.getByRole('link', { name: 'Sony vaio i5' });
        this.monitorsFilter = page.getByRole('link', { name: 'Monitors' });
        this.monitorItem = page.getByRole('link', { name: 'Apple monitor' });
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
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

    public async addPhoneItemToCart() {
        await this.phoneItem.click();
        await this.addToCartButton.click();
    }

    public async assertPhoneItemAddedToCart(expectedMessage: string) {
        const dialog = await this.page.waitForEvent('dialog');
        expect(dialog.message()).toContain(expectedMessage);
        await dialog.accept();
    }

    public async addLaptopItemToCart() {
        await this.homeLink.click();
        await this.laptopsFilter.click();
        await this.laptopItem.click();
        await this.addToCartButton.click();
    }

    public async assertLaptopItemAddedToCart(expectedMessage: string) {
        const dialog = await this.page.waitForEvent('dialog');
        expect(dialog.message()).toContain(expectedMessage);
        await dialog.accept();
    }

    public async addMonitorItemToCart() {
        await this.homeLink.click();
        await this.monitorsFilter.click();
        await this.monitorItem.click();
        await this.addToCartButton.click();
    }

    public async assertMonitorItemAddedToCart(expectedMessage: string) {
        const dialog = await this.page.waitForEvent('dialog');
        expect(dialog.message()).toContain(expectedMessage);
        await dialog.accept();
    }

}

export default HomePage;