import { By, WebDriver, WebElement } from "selenium-webdriver";
import { createHash } from 'crypto';
import { ReadData, WriteData } from "../DataStorage";
import { SendMessage } from "./SendMessage";
import { SendMail } from "./SendMail";

export const CheckIfMsgSend = async (element: WebElement, driver: WebDriver): Promise<boolean> => {
    const titleElement = await element.findElement(By.css('section > section > div > a'));
    const descriptionElement = await element.findElement(By.css('section > div > p'));

    const titleText = formatTitle(await titleElement.getAttribute("textContent"));
    const descriptionText = await descriptionElement.getAttribute("textContent");
    const hash = createHash(process.env.HASH_ALGO).update(descriptionText).digest('hex');

    const data = await ReadData();
    if (Object.keys(data).indexOf(hash) !== -1) return false;
    const house = {title: titleText, description: descriptionText};
    await WriteData({[hash]: house, ...data
    });
    await SendMessage(titleElement, driver);
    await SendMail(house).then(() => console.log("mail send!"));

    return true;
}


function formatTitle(title: string): string {
    const newTitle = title.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    return newTitle.substring(1, newTitle.length - 1);
}
