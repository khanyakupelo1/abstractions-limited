const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[req.params.id] = comments;

    try {
        axios.post('http://localhost:8080/events/', {
            type: 'commentCreated',
            data: { id: commentId, content, postId: req.params.id }
        });
        res.status(201).send(comments);

    } catch (error) {
        console.log(error.message);
        res.send("error"); // Coerces error to 404
    }


});

app.listen(4001, () => {
    console.log('listening on 4001');
});