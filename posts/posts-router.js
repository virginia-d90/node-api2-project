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
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json("There was an error while saving tht post to the database")
            })
    }
})

//client makes a POST request to /api/posts/:id/comments

router.post("/:id/comments", (req, res) => {
    const newComment = req.body;
    const { id } = req.params;

    if(!newComment.text){
        res.status(400).json({errorMessage: "Please provide text for the comment"})
    }

    Posts.insertComment({...newComment, post_id: id})
        .then(cmt => {
            console.log(cmt)
            res.status(201).json(cmt)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "There was an error while saving the comment to the database."})
        })
})

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
router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if(post){
                res.status(200).json(post)
            } else {
                res.status(404).json({message:"The post with the specidied ID does not exist"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "The post information could not be retrieved."})
        })
})


//when the client makes a GET request to /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
    if(!req.params.id){
        res.status(404).json({message: "The post with the spcified ID does not exist."})
    }

    Posts.findPostComments(req.params.id)
        .then(cmts => {
            res.status(200).json(cmts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "The comments information could not be retrieved."})
        })
})


//when the client makes a DELETE request to /api/posts/:id
router.delete("/:id", (req,res) => {
    Posts.remove(req.params.id)
        .then(post => {
            if(post > 0){
                res.status(200).json({message: "The message has been deleted"})
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "The post could not be removed"})
        })
})
//when the client makes a PUT request to /api/posts/:id
module.exports = router