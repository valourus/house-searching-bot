import { HouseSearchingBot } from "./HouseSearchingBot";
import { config } from 'dotenv';

config();
async function main(): Promise<void> {
    await HouseSearchingBot();
}

setInterval(()=> main(), (1000 * 60) * Number(process.env.CHECK_INTERVAL_IN_MIN));
main();
