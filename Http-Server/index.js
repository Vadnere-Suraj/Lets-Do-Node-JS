const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`Welcome Mr. ${req.query.name} , you are ${req.query.age} year old`)
})

app.get('/about', (req, res) => {
    res.send("Welcome to the About Page")
})


app.get('/contact', (req, res) => {
    res.send("Welcome to the Contact Page")
})


app.get('/search', (req, res) => {
    res.send("Welcome to the Search Page")
})
// const fs = require('fs');
// const url = require('url');

// function handler(req, res) {
//     if (req.url === "/favicon.ico") {
//         return res.end()
//     }
//     const urlForm = url.parse(req.url, true);
//     const log = `Request Received on ${Date.now()} method : ${req.method}, to vist ${req.url} \n`
    
//     fs.appendFile("data.txt", log, (err, data) => {
//         if (err) {
//             console.log("Error : ",err);
            
//         } else {
//             // console.log(req);
//             console.log(urlForm.pathname)

//             switch(urlForm.pathname){
//                 case "/" : res.end("Its the Home Page")
//                 break;

//                 case "/about" : {
//                     const name = urlForm.query.name;
//                     res.end(`Hey there I am ${name} a Web Development Enthusiast just completed my diploma with a second rank`) }
//                 break;

//                 case "/contact" :   res.end("You can contact me from here \n Email :suraj@gmail.com \n Mobile : +91 9111111111")
//                 break;

//                 default :   res.end("Nothing else here this side")
//             }
//         }
//     })
// }
const server = http.createServer(app)
    

  
    

server.listen(8000, () => console.log("Server Started"))

