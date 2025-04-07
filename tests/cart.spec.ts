import { test } from '@playwright/test';
import dotenv from 'dotenv';
import { HomePage } from '../POMs/homePage';
import { CartPage } from '../POMs/cartPage';
import path from 'path';
import { city, country, creditCard, month, name, year } from '../utils/order_information';

dotenv.config();

test.use({ storageState: path.resolve(__dirname, '../playwright/.auth/user.json') });

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe.serial('add, delete, order', () => {
    test('Add items to cart ', async ({ page }) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        //given
        await homePage.assertUserIsLoggedIn();

        //when
        await homePage.addPhoneItemToCart();
        await homePage.assertPhoneItemAddedToCart('Product added');
        await homePage.addMonitorItemToCart();
        await homePage.assertMonitorItemAddedToCart('Product added');
        await homePage.addLaptopItemToCart();
        await homePage.assertLaptopItemAddedToCart('Product added');

        //then 
        await cartPage.openCart();
        await cartPage.assertCartIsOpened();
        await cartPage.assertItemsAreInCart();
    });

    test('Delete item from cart', async ({ page }) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        //given
        await homePage.assertUserIsLoggedIn();

        //when
        await cartPage.openCart();
        await cartPage.assertCartIsOpened();

        //then 
        await cartPage.deleteLaptopItem();
        await cartPage.assertLaptopIsDeletedFromCart();
    });

    test('Order items', async ({ page }) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        //given
        await homePage.assertUserIsLoggedIn();
        await cartPage.openCart();
        await cartPage.assertCartIsOpened();

        //when
        await cartPage.openOrderModal();
        await cartPage.fulfillOrderInformation(name, country, city, creditCard, month, year);
        await cartPage.submitOrder();

        //then 
        await cartPage.assertPurchaseIsSuccessful();
        await cartPage.closeSuccessModal();
    });
});