import { By, until, WebDriver, WebElement } from "selenium-webdriver";

export const SendMessage = async (link: WebElement, driver: WebDriver): Promise<void> => {
    if (process.env.SEND_MESSAGE !== 'true') return;
    const title = await link.findElement(By.css('h2'));
    await title.click();
    console.log('click');
    await driver.wait(until.elementLocated(By.css('#send-message-button')));
    await driver.findElement(By.css('#send-message-button')).click();

    await driver.wait(until.elementLocated(By.css('#listing_reaction_message_message')));
    const messageBox = await driver.findElement(By.css('#listing_reaction_message_message'));
    const text = ( await messageBox.getAttribute("value") ).split('\n')[1];
    const message = process.env.MESSAGE.replace('{{housename}}', text);
    await driver.executeScript("document.getElementById('listing_reaction_message_message').value = '" + message + "';");
    await driver.findElement(By.css('button.btn:nth-child(1)')).click();
    await driver.sleep(1000);
}
