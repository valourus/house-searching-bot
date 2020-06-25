import { Builder, By, Key, until } from 'selenium-webdriver';

export const HouseSearchingBot = async () => {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        const lol ='';
        await driver.get('http://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        await driver.quit();
    }
};
