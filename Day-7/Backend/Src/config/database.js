const mongoose = require("mongoose");


function Connecttodb(){

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to DB")
});



}

module.exports=Connecttodb
