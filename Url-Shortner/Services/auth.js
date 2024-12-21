
const jwt = require('jsonwebtoken')
const secretkey = '$suraj$0207#'

function setUser(user) {
    

    return jwt.sign({
        _id : user._id,
        name : user.name,
        email : user.email,
        role : user.role
    }, secretkey)
}


function getUser(token) {
    if (!token) {
        return null
    }

    return jwt.verify(token, secretkey)
}


module.exports = {setUser, getUser}