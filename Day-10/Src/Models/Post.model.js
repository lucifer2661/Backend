const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
},
    imgUrl: {
        type: String,
        required: [true, "Image is required"]
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "User ID is required"]
    }
}, { timestamps: true });


const PostModel = mongoose.model("Posts", PostSchema);

module.exports = PostModel;