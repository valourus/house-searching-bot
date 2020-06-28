import { Builder, WebDriver } from 'selenium-webdriver';
import { Login } from "./huurwoningen/Login";
import { FindHouses } from "./huurwoningen/FindHouses";

export const HouseSearchingBot = async () => {
    let driver: WebDriver = await new Builder().forBrowser('firefox').build();
    console.log('starting searching');
    try {
        await Login(driver);
        await driver.sleep(1000);
        await FindHouses(driver, {place: process.env.PLACE, maxPrice: Number(process.env.MAX_PRICE)});
    } finally {
        await driver.quit();
    }
};
