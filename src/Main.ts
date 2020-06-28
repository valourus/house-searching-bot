import { HouseSearchingBot } from "./HouseSearchingBot";
import { config } from 'dotenv';

config();

async function main(): Promise<void> {
    await HouseSearchingBot();
}

main();
