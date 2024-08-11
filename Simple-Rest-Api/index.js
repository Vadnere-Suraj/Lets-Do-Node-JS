const express = require('express');
let users = require('./MOCK_DATA.json')
const fs = require('fs');

const app = express();

app.use(express.urlencoded({extended: false}))

app.use((req,res,next) => {
    fs.appendFile("./log.txt", `\n First Middleware ${Date.now()} : ${req.method} : ${req.url}`, (err, data) => {
        if (err) {
            console.log("Error : ", err);
        } else {
            console.log("First middleware called");
            next();
        }
    })
})

app.use((req,res,next) => {
    console.log(`Second middleware called by ${req.userName}`);
    next();
})

const PORT = 8000;

app.get('/', (req, res) => {
    res.send(`Welcome Mr you landed at correct location...`)
})

app.get('/users', (req,res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
}
);

app.get('/api/users',(req,res) => {
    return res.json(users)
});

app.post('/api/users',(req,res) => {
    const bod = req.body;
   users.push({...bod, id: users.length + 1});

   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
    if (err) {
       return res.json({status: "Failed"})
        
    } else {
        return res.json({status: "Success"})
    }
   })
    
})

app.route('/api/users/:id').get((req,res) => {
    const id = Number(req.params.id)
    const user = users.find((use) => use.id === id)

    return res.json(user);
}).patch((req,res) => {
    const id = Number(req.params.id);
    const bod = req.body;

   const userIndex = users.findIndex((use) => use.id === id)

   users[userIndex] = {...bod, id: id}

   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
    if (err) {
       return res.json({status: "Failed"})
        
    } else {
        return res.json({status: "Success"})
    }
   })
}).delete((req,res) => {
    const id = Number(req.params.id);

   users = users.filter(user => user.id !== id)

    
   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
    if (err) {
       return res.json({status: "Failed"})
        
    } else {
        return res.json({status: "Success"})
    }
   })

   
})






app.listen(PORT, () => console.log(`Server Started at port no : ${PORT}`));