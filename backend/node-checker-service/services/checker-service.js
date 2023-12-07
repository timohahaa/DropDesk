import axios from "axios";
import { response } from "express";
// import config from "./config/config.js";
import UserAgent from 'user-agents';



export class CheckerService {
    constructor() {
        this.userAgentGenerator = new UserAgent();
    }

    async checkStarkNet() { }

    async checkZkEVM() { }

    async checkZkSync(address) {
        const url = `https://nftcopilot.com/p-api/zk-rank/check/${address}`;

        try {
            const response = await axios.request({
                url: url,
                method: "get",
                headers: {
                    "User-Agent": this.userAgentGenerator.random().toString(),
                }
            });
            return { status: response.status, data: response.data };
        } catch (error) {
            console.log(`[CheckerService.checkZkSync] - error: ${error.message}`);
            throw new Error("Error while fetching zkSync data");
        }
    }

    async checkLayerZero(address) {
        const url = "https://nftcopilot.com/p-api/layer-zero-rank/check"

        try {
            const response = await axios.request({
                url: url,
                method: "post",
                headers: {
                    "User-Agent": this.userAgentGenerator.random().toString(),
                    "Referer": "https://nftcopilot.com/layer-zero-rank-check?utm_source=zksync-rank-checker",
                },
                data: {
                    address: address,
                    c: "check",
                },
            });
            return { status: response.status, data: response.data };
        } catch (error) {
            console.log(`[CheckerService.checkLayerZero] - error: ${error}`);
            console.log(response);
            throw new Error("Error while fetching LayerZero data");
        }
    }
};
