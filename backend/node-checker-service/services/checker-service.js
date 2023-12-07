import axios from "axios";
// import config from "./config/config.js";
import UserAgent from 'user-agents';



export class CheckerService {
    constructor() { }

    async checkStarkNet() { }

    async checkZkEVM() { }

    async checkZkSync(address) {
        const url = `https://nftcopilot.com/p-api/zk-rank/check/${address}`;
        const UA = new UserAgent();

        try {
            const response = await axios.get(url, {
                headers: {
                    "User-Agent": UA.random().toString(),
                }
            });
            return { status: response.status, data: response.data };
        } catch (error) {
            console.log(`[CheckerService.checkZkSync] - error: ${error.message}`);
            throw new Error("Error while fetching zkSync data");
        }
    }
};
