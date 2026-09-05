const PostModel = require("../Models/Post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPost(req, res) {
    console.log(req.body, req.file);

const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    let decoded=null;
try{  
    decoded = jwt.verify(token, process.env.JWT_SECRET);
}

catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
   
    console.log(decoded);



    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer)),
        fileName: req.file.originalname,
        folder: "/Insta-clone"
    });

   const post = await PostModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    userId: decoded.id
});

return res.status(201).json({
    message: "Post created successfully",
    data: post
});

  
}

module.exports = {
    createPost
};