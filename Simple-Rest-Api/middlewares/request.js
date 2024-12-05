const fs = require('fs')


function reqLog(filename) {
    return (req, res, next) => {
           fs.appendFile(filename, `\n First Middleware ${Date.now()} : ${req.method} : ${req.url}`, (err, data) => {
             if (err) {
                     console.log("Error : ", err);
                 } else {
                    console.log("First middleware called");
                    next();
                 }
             })
         }
}


module.exports = reqLog;