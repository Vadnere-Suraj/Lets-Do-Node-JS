const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views/"))


const httpServer = http.createServer(app);
const io = new Server(httpServer)

io.on("connection", (socket=> {
    socket.on("user-message", (message) => {
        io.emit("server-message", message); 
    })
}))

app.get("/", (req, res) => {
    res.render("index");
})

httpServer.listen(8000, () => console.log("Server Started"))