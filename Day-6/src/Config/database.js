
const mongoose = require("mongoose");

function connecttoDb(){
mongoose.connect(process.env.Mongo_URI)
.then(()=>{
    console.log("server connected to Database");

})


}


module.exports= connecttoDb;