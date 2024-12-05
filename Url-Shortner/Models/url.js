const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    redirectURl  : {
        type: String,
        required: true,
        unique: true
    },

    shortID : {
        type: String,
        required: true
    },

    visitHistory : [{
        timeS : {
            type : Number
        }
    }],
}, {timestamps:  true});


const URL = mongoose.model('urls', urlSchema);

module.exports = URL;