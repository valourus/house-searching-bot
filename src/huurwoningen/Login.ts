import { By, WebDriver } from "selenium-webdriver";

export const Login = async (driver: WebDriver): Promise<void> => {
    await driver.get('https://www.huurwoningen.nl/inloggen/');
    await driver.findElement(By.css('#login_email')).sendKeys(process.env.HUURWONINGEN_USERNAME);
    await driver.findElement(By.css('#login_password')).sendKeys(process.env.HUURWONINGEN_PASSWORD);
    await driver.findElement(By.css('button.btn:nth-child(1)')).click();
};
