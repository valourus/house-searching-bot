import { Builder, WebDriver } from 'selenium-webdriver';
import { Login } from "./huurwoningen/Login";
import { FindHouses } from "./huurwoningen/FindHouses";
import * as firefox from "selenium-webdriver/firefox";

export const HouseSearchingBot = async () => {
    const options = new firefox.Options({})
        .headless()
        .windowSize({ width:1920, height: 1080 });
    let driver: WebDriver = await new Builder().setFirefoxOptions(options).forBrowser('firefox').build();
    console.log('starting searching')
    try {
        await Login(driver);
        await driver.sleep(1000);
        await FindHouses(driver, {
            place: process.env.PLACE,
            minPrice: Number(process.env.MIN_PRICE),
            maxPrice: Number(process.env.MAX_PRICE)
        });
    } finally {
        await driver.quit();
    }
};
