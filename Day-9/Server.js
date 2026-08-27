require('dotenv').config()

const app = require("./Src/app")

const ConnecttoDb= require("./Src/Config/Database")

ConnecttoDb()


app.listen(3000,()=>{
    console.log("Server is running");
})
