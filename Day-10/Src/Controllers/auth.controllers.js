const UserModel = require("../Models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { email, username, password, bio, profile_image } = req.body;

    const IsUserAlreadyExists = await UserModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (IsUserAlreadyExists) {
        return res.status(409).json({
            message:
                "User already exists" +
                (IsUserAlreadyExists.email == email
                    ? " Email already exists"
                    : " Username already exists")
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        username,
        email,
        password: hash,
        bio,
        profile_image
    });

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_image: user.profile_image
        }
    });
};


const loginUser = async (req, res) => {

    const { username, email, password } = req.body;

    const user = await UserModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    });

    if (!user) {
        return res.status(409).json({
            message: "User not found"
        });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "password invalid"
        });
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User loggedIn successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image: user.profile_image
        }
    });
};


module.exports = {
    registerUser,
    loginUser
};