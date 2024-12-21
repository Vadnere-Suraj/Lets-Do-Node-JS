const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { setUser } = require('../service/auth');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true  
    },

    email: {
        type: String,
        required: true ,
        unique: true ,
    },

    salt: {
        type: String,
    },

    password: {
        type: String,
        required: true ,
        unique: true ,
    },

    profileImageUrl: {
        type: String,
        default: "/images/default.png"

    },

    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
   
}, { timestamps : true })


userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return
    }
    const salt = randomBytes(16).toString()

    const hash = createHmac('sha256', salt)
               .update(user.password)
               .digest('hex');

    this.salt = salt
    this.password = hash

    next()

})

userSchema.static("checkPassword", async function (email, password) {
    const user = await this.findOne({email})

    if (!user) {
        throw new Error("USer Not found")
    }

    const salt = user.salt
    const hashpassword = user.password
    
    const hash = createHmac('sha256', salt)
               .update(password)
               .digest('hex');

    if (hashpassword !== hash) {
        throw new Error("Incorreact Password")
    }

    const token = setUser(user)
    return token
})
const user = mongoose.model('users', userSchema);

module.exports = user