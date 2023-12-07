import express from 'express';
import { CheckerService } from '../services/checker-service.js';

const r = express.Router();

const checkerService = new CheckerService([]);

r.get('/starknet', (req, res) => {
    res.send("starknet checker");
});

r.get('/zkevm', (req, res) => {
    res.send("zkevm checker");
});

r.get('/zksync', async (req, res) => {
    const address = req.body.address;

    try {
        const resp = await checkerService.checkZkSync(address);
        if (resp.status != 200) {
            res.status(500).json({ "error": "could not retrieve zkSync data" });
        } else {
            res.status(200).json(resp.data);
        }
    } catch (error) {
        console.log(`[checkerRoutes - /zksync] - error: ${error.message}`);
        res.status(500).json({ "error": "could not retrieve zkSync data" });
    }
});

export default r;
