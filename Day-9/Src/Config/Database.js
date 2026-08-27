const mongoose = require("mongoose")



function ConnecttoDb(){
mongoose.connect(process.env.MONGO_URI)

.then(()=>{
  console.log("connected to DB")

})



}
module.exports=ConnecttoDb