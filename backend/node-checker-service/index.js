import express from 'express';
import bodyParser from 'body-parser';
import { SERVER_PORT } from './config.js';
import checkerRoutes from './routes/checker.js'

const port = SERVER_PORT;
const app = express();



app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use(bodyParser.json());
app.use('/check', checkerRoutes);

app.listen(port, () => {
    console.log(`started server at http://localhost:${port}`);
});
