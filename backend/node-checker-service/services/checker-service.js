import axios from "axios";
// import config from "./config/config.js";
import UserAgent from 'user-agents';



export class CheckerService {
    constructor(
        apiKeysMap
        ) {
            this.API_KEYS = apiKeysMap;
    }

    async checkStarkNet() {
        
    }

    async checkZkEVM() {

    }

    async checkZkSync(address) {
        const url = `https://nftcopilot.com/p-api/zk-rank/check/${address}`;
        const UA = new UserAgent();

        //try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": UA.random().toString(),
            }
        });
    //} catch(e) {
   //     console.log(`error in service ${e}`);
   // }

        return {response.status, response.data}
    }
};