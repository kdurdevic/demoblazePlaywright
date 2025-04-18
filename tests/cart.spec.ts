import { test } from '@playwright/test';
import HomePage from '../POMs/homePage';
import CartPage from '../POMs/cartPage';
import { city, country, creditCard, month, name, year } from '../utils/order_information';

let homePage: HomePage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
});

test('Add item to cart', async () => {
    // given
    await homePage.assertUserIsLoggedIn();

    // when
    await homePage.addItemToCart('Phones', 'Samsung galaxy s6');
    await homePage.assertItemAddedToCart('Product added');

    // then 
    await cartPage.openCart();
    await cartPage.assertCartIsOpened();
});

test('Delete item from cart', async () => {
    // given
    await homePage.assertUserIsLoggedIn();
    await homePage.addItemToCart('Laptops', 'Sony vaio i5');
    await homePage.assertItemAddedToCart('Product added');

    // when
    await cartPage.openCart();
    await cartPage.assertCartIsOpened();

    // then 
    await cartPage.deleteItem('Sony vaio i5');
    await cartPage.assertItemIsDeletedFromCart('Sony vaio i5');
});

test('Order items', async () => {
    // given
    await homePage.assertUserIsLoggedIn();
    await cartPage.openCart();
    await cartPage.assertCartIsOpened();

    // when
    await cartPage.openOrderModal();
    await cartPage.fulfillOrderInformation(name, country, city, creditCard, month, year);
    await cartPage.submitOrder();

    // then 
    await cartPage.assertPurchaseIsSuccessful();
    await cartPage.closeSuccessModal();
});