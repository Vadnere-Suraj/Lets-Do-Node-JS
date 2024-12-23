const os = require("os")
const cluster = require('cluster');
const express = require('express');


const cpus = os.cpus().length


if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
} else {

    const app = express()


    app.get("/", (req, res) => {
        res.json({
            message: `Processs runing ${process.pid}`
        })
    })

    app.listen("8000", () => console.log("Server started"))

}

