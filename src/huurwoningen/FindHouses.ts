import { By, until, WebDriver } from "selenium-webdriver";
import { CheckIfMsgSend } from "./CheckIfMsgSend";

export interface SearchParams {
    maxPrice: number;
    place: string;
}

export const FindHouses = async (driver: WebDriver, {maxPrice, place}: SearchParams): Promise<void> => {
    await goToOverviewPage(driver, maxPrice, place)
    const elements = await driver.findElements(By.css('.listing'));

    for (let element of elements) {
        const label = await element.findElement(By.css('.label--yellow')).catch(() => {});
        if (label === undefined) continue;
        const isMsgSend = await CheckIfMsgSend(element, driver);
        if (isMsgSend) break
    }
    await driver.sleep(1000);
};

async function goToOverviewPage(driver: WebDriver, maxPrice: number, place: string): Promise<void> {
    await driver.get(`https://www.huurwoningen.nl/appartement/huren/${place}/?min_price=&max_price=${maxPrice}&size=&number_of_bedrooms=&since=`);
    await driver.wait(until.elementIsVisible(driver.findElement(By.css('#listings'))));
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
    await driver.sleep(1000);
    await driver.executeScript('window.scrollTo(0, document.body.scrollTop);');
    await driver.findElement(By.css('.modal-header__close')).then(e => e.click()).catch(e => {
    });
}
