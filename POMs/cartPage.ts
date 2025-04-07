import { expect, Locator, Page } from "playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

export class CartPage {
    readonly page: Page;
    homeLink: Locator;
    cartLink: Locator;
    phoneItem: Locator;
    laptopItem: Locator;
    monitorItem: Locator;
    deleteLink: Locator;
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
        this.homeLink = page.getByRole('link', { name: 'Home (current)' });
        this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
        this.phoneItem = page.getByRole('cell', { name: 'Sony vaio i5' });
        this.laptopItem = page.locator('tr', { hasText: 'Apple monitor' });
        this.monitorItem = page.getByRole('cell', { name: 'Samsung galaxy s6' });
        this.deleteLink = this.laptopItem.getByRole('link', { name: 'Delete' });
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

    public async openCart() {
        await this.cartLink.click();
    }

    public async assertCartIsOpened() {
        await expect(this.page).toHaveURL('https://www.demoblaze.com/cart.html');
    }

    public async assertItemsAreInCart() {
        await expect(this.phoneItem).toBeVisible();
        await expect(this.laptopItem).toBeVisible();
        await expect(this.monitorItem).toBeVisible();
    }

    public async deleteLaptopItem() {
        await this.deleteLink.click();
    }

    public async assertLaptopIsDeletedFromCart() {
        await expect(this.laptopItem).toHaveCount(0);
    }

    public async openOrderModal() {
        await this.placeOrderButton.click();
    }

    public async fulfillOrderInformation(name: string, country: string, city: string, creditCard: string, month: string, year: string) {
        await this.nameField.fill(name);
        await this.countryField.fill(country);
        await this.cityField.fill(city);
        await this.creditCardField.fill(creditCard);
        await this.monthField.fill(month);
        await this.yearField.fill(year);
    }

    public async submitOrder() {
        await this.purchaseButton.click();
    }

    public async assertPurchaseIsSuccessful() {
        await expect(this.successMessage).toHaveText("Thank you for your purchase!");
    }

    public async closeSuccessModal() {
        await this.okButton.click();
    }
}

export default CartPage;
