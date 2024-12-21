const {getUser} = require('../Services/auth')


function checkForAuthentication(req, res, next){
    const id = req.cookies?.uid

    if(!id) return next()

    
    const user = getUser(id)
    req.user = user 
    return next()
}


function restrictTo(roles = []){
    return function (req, res, next){
        if (!req.user ) {
            return res.redirect('/login')
        }

        if (!roles.includes(req.user.role)) {
            return res.end('Unauthorized')
        }

        return next()
    }
}





module.exports = {
    checkForAuthentication,
    restrictTo
}