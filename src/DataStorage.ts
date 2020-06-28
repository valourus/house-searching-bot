import { House } from "./House";
import * as fs from 'fs';
import { promisify } from "util";

interface StoredData {
    [key: string]: House
}

export const ReadData = async (): Promise<StoredData> => {
    const dataBuffer = await fs.readFileSync('data.json');
    const data = dataBuffer.toString();
    return JSON.parse(data);
}

export const WriteData = async (data: StoredData) => {
    const newData = JSON.stringify(data);
    await fs.writeFileSync('data.json', newData);
}
