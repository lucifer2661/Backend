const express = require("express");
const postRouter = express.Router();
const { createPost } = require("../Controllers/Post.controllers");
const multer = require("multer");
const upload=multer({storage:multer.memoryStorage()})


/**
 * post /api/posts
 * 
 * -req.body ={caption,img-file
 *}protected route
 */


 postRouter.post("/", upload.single("img"), createPost);

 module.exports=postRouter