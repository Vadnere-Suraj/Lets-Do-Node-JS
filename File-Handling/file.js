const fs = require("fs");

//It is a sync funtion
// fs.writeFileSync("./test.txt", "Trying to Understand how it works")


//Its a async function
// fs.writeFile("./test.txt", "Its executed by a asynchronous", (err) => {})



// Its a async function
// fs.readFile("./test.txt", "utf-8", (err, result) => {
//     if (err) {
//         console.log("Error : ",err)
//     } else {
//         console.log(result)
//     }
// })

const result = fs.readFileSync("./test.txt","utf-8")
console.log(result);

// fs.appendFileSync("./test.txt", `\n ${Date.now()} Data is being appended`)


// fs.cpSync("./test.txt", "./copy.txt")

// fs.unlinkSync("./copy.txt")


console.log(fs.statSync("./test.txt").isFile())

// fs.mkdirSync("./testfolder/a", {recursive: true})