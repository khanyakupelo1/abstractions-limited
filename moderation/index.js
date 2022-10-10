const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

axios.post('/events', (req, res) => {

}).catch((err) => { console.log(err); });

app.listen(4003, () => {
    console.log('listening on http://localhost:4003');
});