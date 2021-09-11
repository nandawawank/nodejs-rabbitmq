const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const messageBrokerRouter = require('../src/api/router');

app.use('/', messageBrokerRouter);

app.get('/', (req, res) => {
    res.send('Hello this resful is running for dessy-pon');
});

app.listen(port, () => {
    console.log('rest api has been running in port : ' + port);
})