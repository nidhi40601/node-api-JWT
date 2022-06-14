const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const posts = [
    {
        username: 'nidhi',
        title: 'post 1'
    },
    {
        username: 'jim',
        title: 'post 2'
    }
]

router.post('/login', (req,res) => {
    const username = req.body.username;
    const user = { name: username };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    res.send({
        token: token
    });
});

router.get('/get', authenticateToken, (req,res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken (req,res,next) {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(" ")[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = router;
