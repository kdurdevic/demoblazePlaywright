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


    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.getByRole('link', { name: 'Home (current)' });
        this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
        this.phoneItem = page.getByRole('cell', { name: 'Sony vaio i5' });
        this.laptopItem = page.getByRole('cell', { name: 'Apple monitor' });
        this.monitorItem = page.getByRole('cell', { name: 'Samsung galaxy s6' });
        this.deleteLink = page.getByRole('row', { name: 'Sony vaio i5 790 Delete' }).getByRole('link');
    }

    public async openCart(){
        await this.cartLink.click();
    }

    public async assertCartIsOpened() {
        await expect(this.page).toHaveURL('https://www.demoblaze.com/cart.html');
    }

    public async assertItemsAreInCart(){
        await expect(this.phoneItem).toBeVisible();
        await expect(this.laptopItem).toBeVisible();
        await expect(this.monitorItem).toBeVisible();
    }

    public async deleteLaptopItem(){
        await this.deleteLink.click();
    }

    public async assertLaptopIsDeletedFromCart(){
        await expect(this.laptopItem).toHaveCount(0);
    }


}

export default CartPage;