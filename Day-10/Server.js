require('dotenv').config()
const app = require('./Src/app')



const connectToDatabase= require("./Src/Config/Database")

connectToDatabase();


app.listen(3000,(req,res)=>{
    console.log("Server is running");
})