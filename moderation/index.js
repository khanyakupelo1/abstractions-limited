const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


// This is a listener
app.post('/events', (req, res) => {
    res.send({});
});

app.listen(4003, () => {
    console.log('listening on http://localhost:4003');
});