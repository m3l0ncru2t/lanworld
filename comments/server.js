const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

let comments = [];

app.use(cors());
app.use(bodyParser.json());

app.post('/comments', (req, res) => {
    const { username, text } = req.body;
    const comment = { id: comments.length + 1, username, text };
    comments.push(comment);
    res.status(201).json(comment);
});

app.get('/comments', (req, res) => {
    res.status(200).json(comments);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
