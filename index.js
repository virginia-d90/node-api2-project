const express = require("express");

const postsRouter = require("./posts/posts-router.js");

const server = express();
server.use(express.json());

server.use("/api/posts", postsRouter);




const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})