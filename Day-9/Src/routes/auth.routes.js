const express= require ('express')
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User.model")
const crypto =require('crypto')

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


    const hash = crypto.createHash("md5").update(password).digest("hex")

  const User=await  UserModel.create({


        email,password:hash,name
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
authRoutes.post("/protected", (req, res) => {
    console.log(req.cookies);

    res.json({
        message: "Protected route reached",
        cookies: req.cookies
    });
});
/**
 * this function is called controller 
 */
authRoutes.post("/login",async(req,res)=>{
const{email,password}=req.body

const user=await UserModel.findOne({email})

if(!user){
    return res.status(404).json({
        message:"user not found with this email address"
    })
}
const isPassword=user.password==crypto.createHash("md5").update(password).digest("hex")

if(!isPassword){
    return res.status(401).json({
        message:"Invalid password"
    })
}

const Token =jwt.sign({
    id:user._id,

},process.env.JWT_SECRET);

res.cookie("JWT_TOKEN",Token)
res.status(200).json({
    message:"user logged in",
    user,
    Token
})


})

authRoutes.get("/get-me", async (req, res) => {
    try {
        console.log(req.cookies);

        const token = req.cookies.jwt_token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found. Please login first."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log(decoded);

        const user = await UserModel
            .findById(decoded.id)
            .select("-password");

        res.status(200).json({
            message: "User fetched successfully",
            user
        });

    } catch (error) {
        console.log(error);

        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
});









module.exports=authRoutes