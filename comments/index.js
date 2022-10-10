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

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostId[req.params.id] = comments;
    // This sends or dispatches an event 
    await axios.post("http://localhost:4005/events", {
        type: 'CommentCreated',
        data: {
            id: commentId, content, postId: req.params.id
            , status: 'pending'
        },
    }).catch((err) => {
        console.log(err.message);
    });


});
/**
 * If someone/server (e.g. event bus) sends a post 
 * event on port 4001 then this listens to that.*/
app.post('/events', function (req, res) {
    console.log('Received Event ', req.body.type);
    res.send({});

}
);

app.listen(4001, () => {
    console.log('listening on 4001');
});