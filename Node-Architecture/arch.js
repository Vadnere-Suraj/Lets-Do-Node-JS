
const os = require("os");
const fs = require("fs");


// A sync function is a Blocking Opeartion in Node JS architecture
// const result = fs.readFileSync("./test.txt","utf-8")
// console.log(result);


//   A async function is a non blocking Operation in Node JS architecture
fs.readFile("./test.txt", "utf-8", (error, result) => {
    if(error){
        console.log("Error : ",error)
    }
    else{
        console.log(result)
    }
})

console.log(os.cpus().length);