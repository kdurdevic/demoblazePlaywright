import { test } from '@playwright/test';
import dotenv from 'dotenv';
import { HomePage } from '../POMs/homePage';
import { CartPage } from '../POMs/cartPage';
import path from 'path';

dotenv.config();

test.use({ storageState: path.resolve(__dirname, '../playwright/.auth/user.json') });

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Adding items to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    //given
    await homePage.assertUserIsLoggedIn();

    //when
    await homePage.addPhoneItemToCart();
    await homePage.assertPhoneItemAddedToCart('Product added');
    await homePage.addMonitorItemToCart();
    await homePage.assertMonitorItemAddedToCart('Product added');

    //then 
    await cartPage.openCart();
    await cartPage.assertCartIsOpened();
    await cartPage.assertItemsAreInCart();

});

test('Add and delete item from cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    //given
    await homePage.assertUserIsLoggedIn();  
    await homePage.addLaptopItemToCart();
    await homePage.assertLaptopItemAddedToCart('Product added'); 

    //when
    await cartPage.openCart();
    await cartPage.assertCartIsOpened(); 
    await cartPage.deleteLaptopItem();

    //then 
    await cartPage.assertLaptopIsDeletedFromCart();

});