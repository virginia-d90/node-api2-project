const express = require("express");

const Posts = require("../data/db.js")

const router = express.Router();

//client makes a POST request to /api/posts
router.post("/", (req, res) => {
    const newPost = req.body

    if(!newPost.title || !newPost.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    } else {
        Posts.insert(newPost)
            .then(post => {
                res.status(201).json("Created")
            })
            .catch(err => {
                res.status(500).json("There was an error while saving tht post to the database")
            })
    }
})

//client makes a POST request to /api/posts/:id/comments
//when the client makes a GET request to /api/posts
router.get("/", (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            // console.log(posts)
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "the posts information could not be received"})
        })
})

//when the client makes a GET request to /api/posts/id
//when the client makes a GET request to /api/posts/:id/comments
//when the client makes a DELETE request to /api/posts/:id
//when the client makes a PUT request to /api/posts/:id
module.exports = router