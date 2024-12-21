const { getUser } = require("../service/auth");


function checkAuth(cookiename){
    return (req, res, next) => {
        const cookieValue = req.cookies[cookiename];

        if(!cookieValue){
            return next()
        }

        try {
            const payload = getUser(cookieValue)
            req.user = payload
        } catch (error) {
            
        }

        return next()
    }
}

module.exports = {
    checkAuth
}