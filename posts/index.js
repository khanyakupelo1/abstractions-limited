const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');

    const { content } = req.body;

    // setting a property called id
    // then assign an object to id property
    posts[id] = {
        id, content
    };

    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('listening on 4000');
});