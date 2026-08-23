require('dotenv').config()

const app= require("./Src/app")
const Connecttodb= require("./Src/config/database")




Connecttodb()



app.listen(3000,()=>{

    console.log("server is running");
})