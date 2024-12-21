const jwt = require('jsonwebtoken')
const secretkey = "$piderMan!@#"


function setUser(user){
    const payload = {
        _id: user._id,
        fullname : user.fullname,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    }

    const token = jwt.sign(payload, secretkey)

    return token
}


function getUser(token){
    const payload = jwt.verify(token, secretkey)
    return payload
}

module.exports = {
    setUser,
    getUser
}