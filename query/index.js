const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.get('/posts', (req, res) => {
    res.send(posts);
});

const handleEvents = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };

        posts;
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;


        const post = posts[postId];

        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }

};


app.post('/events', (req, res) => {
    const { type, data } = req.body;

    const handleEvent(type, data);

    res.send({ status: "OK" });

});

app.listen(4002, (req, res) => {
    console.log('listening on http://localhost:4002');

    await axios.get('http://localhost:4005/events');
    for (const event of res.data) {
        console.log('processing event: ', event.type);
        handleEvents(event.type, event.data);
    }


});


