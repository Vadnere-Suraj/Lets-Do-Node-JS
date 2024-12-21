const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content : {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ("users")
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ("blogs")
    }
}, {timestamps: true})

const Comment = mongoose.model("comments", commentSchema)

module.exports = Comment