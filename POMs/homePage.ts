import { expect, Locator, Page } from "playwright/test";

export class HomePage {
    readonly page: Page;
    homeLink: Locator;
    welcomeAdminLink: Locator;
    logoutLink: Locator;
    loginLink: Locator;
    addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.getByRole('link', { name: 'Home (current)' });
        this.welcomeAdminLink = page.getByRole('link', { name: 'Welcome admin' });
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
        this.loginLink = page.getByRole('link', { name: 'Log in' });
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

    public async addItemToCart(category: 'Phones' | 'Laptops' | 'Monitors', itemName: string) {
        await this.homeLink.click();
        const categoryLink = this.page.getByRole('link', { name: category });
        await categoryLink.click();
        const item = this.page.getByRole('link', { name: itemName });
        await item.click();
        await this.addToCartButton.click();
    }

    public async assertItemAddedToCart(expectedMessage: string) {
        const dialog = await this.page.waitForEvent('dialog');
        expect(dialog.message()).toContain(expectedMessage);
        await dialog.accept();
    }
}

export default HomePage;
