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

r.get('/zksync', (req, res) => {
    console.log(req.body)
    const address = req.body.address;
    let status, data
    try {
        ({status, data} = checkerService.checkZkSync(address));
    console.log('here0');
    } catch(e) {
        console.log(`error checkerRoute - /zksync - ${e}`);
    }
    console.log('here1');
    if (status != 200) {
        res.status(500);
    }
    res.json(data);
    console.log('here2');
});

export default r;