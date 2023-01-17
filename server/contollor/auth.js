import User from "../modual/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// REGESTER USER
export const regester = async(req,res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const hassPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hassPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewProfile:Math.floor(Math.random() * 10000),
            impressions:Math.floor(Math.random() * 10000),
        })

        const sevUser = await newUser.save();
        res.status(201).json(sevUser);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


// LOGGING IN
export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({emaill:email});
        if(!user) return res.status(400).json({mes:"Invalid credentials"});

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch) return res.status(400).json({mes:"Invalid credentials"});

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({token,user})

    } catch (error) {
        res.status(500).json({error: error.message}) 
    }
}