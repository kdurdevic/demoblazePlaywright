import { test } from '@playwright/test';
import dotenv from 'dotenv';
import { HomePage } from '../POMs/homePage';
import path from 'path';

dotenv.config();

test.use({ storageState: path.resolve(__dirname, '../playwright/.auth/user.json') });

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('logout User', async ({ page }) => {
    const homePage = new HomePage(page);

    //given
    await homePage.assertUserIsLoggedIn();

    //when
    await homePage.logoutUser();

    //then 
    await homePage.assertUserIsLoggedOut();

});