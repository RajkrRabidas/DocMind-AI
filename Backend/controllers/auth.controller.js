const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const regiserUser = async (req, res) => {
    const {name, email, password, avatar} = req.body;

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(400).json({ message: "User already exists" });
    }
    
    const user = await userModel.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        avatar
    })

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(201).json({ message: "User registered successfully", user });

}



module.exports = {
    regiserUser,
}