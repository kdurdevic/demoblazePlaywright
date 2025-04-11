import { test } from '@playwright/test';
import HomePage from '../POMs/homePage';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePage = new HomePage(page);
});

test('logout User', async () => {
    //given
    await homePage.assertUserIsLoggedIn();

    //when
    await homePage.logoutUser();

    //then 
    await homePage.assertUserIsLoggedOut();
});