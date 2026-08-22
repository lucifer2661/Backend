require("dotenv").config()

const app = require("./src/app")




const connecttoDb = require("./src/Config/database")



connecttoDb()


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})