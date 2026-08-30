const mongoose=require("mongoose");


const UserSchema = new mongoose.Schema({

username:{
    type:String,
    unique:[true,"User name already exists"],
    required:[true,"User name is required"],
},
email:{
    type:String,
     unique:[true,"email already exists"],
    required:[true,"email is required"],
},
password:{
    type:String,
    required:[true,"Password is required"]
},

bio:String,
profile_image:{
    type:String,
    default:"https://ik.imagekit.io/n2oi3x3mj0/Default_pfp.jpg_utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
}

})

const UserModel = mongoose.model("Users",UserSchema)

module.exports=UserModel
