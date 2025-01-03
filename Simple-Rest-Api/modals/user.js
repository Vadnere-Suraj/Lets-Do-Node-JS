const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true

    },

    jobtitle: {
        type: String,
        required: true,

    },

    gender: {
        type: String,
        required: true
    },


}, {
    timestamps: true,
});

//Model creation

const User = mongoose.model("user", userSchema)


module.exports = User;