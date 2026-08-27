const express= require ('express')
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User.model")

/**
 * express.router is used for getting creating apio on a secondary folder 
 */





const authRoutes=express.Router()

authRoutes.post("/register",async(req,res)=>{
    const {email,name,password}= req.body

    const isUserAlreadyexists= await UserModel.findOne({email})

    if(isUserAlreadyexists){
        return res.status(409).json({

            message:"user Already exists"
        })
    }

  const User=await  UserModel.create({


        email,password,name
    })

    const Token= jwt.sign(
        {
            id:User._id,
            email:User.email,
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token",Token)
res.status(201).json({
message:"user registered",
User,
Token,

})
     

})


module.exports=authRoutes