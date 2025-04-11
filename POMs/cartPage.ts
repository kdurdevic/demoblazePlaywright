import { expect, Locator, Page } from "playwright/test";

export class CartPage {
    readonly page: Page;
    cartLink: Locator;
    placeOrderButton: Locator;
    nameField: Locator;
    countryField: Locator;
    cityField: Locator;
    creditCardField: Locator;
    monthField: Locator;
    yearField: Locator;
    purchaseButton: Locator;
    okButton: Locator;
    successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
        this.nameField = page.getByRole('textbox', { name: 'Total: Name:' });
        this.countryField = page.getByRole('textbox', { name: 'Country:' });
        this.cityField = page.getByRole('textbox', { name: 'City:' });
        this.creditCardField = page.getByRole('textbox', { name: 'Credit card:' });
        this.monthField = page.getByRole('textbox', { name: 'Month:' });
        this.yearField = page.getByRole('textbox', { name: 'Year:' });
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
        this.okButton = page.getByRole('button', { name: 'OK' });
        this.successMessage = page.getByRole('heading', { name: 'Thank you for your purchase!' });
    }

    async openCart() {
        await this.cartLink.click();
    }

    async assertCartIsOpened() {
        await expect(this.page).toHaveURL('https://www.demoblaze.com/cart.html');
    }

    async assertItemIsInCart(itemName: string) {
        const itemLocator = this.page.locator('td', { hasText: itemName });
        await expect(itemLocator).toBeVisible();
    }

    async deleteItem(itemName: string) {
        const deleteLink = this.page.locator(`tr:has-text("${itemName}") >> text=Delete`);
        await deleteLink.click();
    }

    async assertItemIsDeletedFromCart(itemName: string) {
        const itemLocator = this.page.locator('td', { hasText: itemName });
        await expect(itemLocator).toHaveCount(0);
    }

    async openOrderModal() {
        await this.placeOrderButton.click();
    }

    async fulfillOrderInformation(name: string, country: string, city: string, creditCard: string, month: string, year: string) {
        await this.nameField.fill(name);
        await this.countryField.fill(country);
        await this.cityField.fill(city);
        await this.creditCardField.fill(creditCard);
        await this.monthField.fill(month);
        await this.yearField.fill(year);
    }

    async submitOrder() {
        await this.purchaseButton.click();
    }

    async assertPurchaseIsSuccessful() {
        await expect(this.successMessage).toHaveText("Thank you for your purchase!");
    }

    async closeSuccessModal() {
        await this.okButton.click();
    }

}

export default CartPage;