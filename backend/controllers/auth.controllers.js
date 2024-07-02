import User from "../models/user.model";
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export const signup = async(req, res) => {
    try {
        const {username, fullName, email, password} = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid Email format."})
        }

        const existingUser = await User.findOne({username});
        if (existingUser){
            return res.status(400).json({error: "Username is already taken."})
        }

        const existingEmail = await User.findOne({email});
        if (existingEmail){
            return res.status(400).json({error: "Email is already taken."})
        }
        
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // new user
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        } else {
            res.status(400).json({error: "Invalid user data."})
        }

    } catch (error) {
        console.log("error in signup controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const login = async(req, res) => {
    res.json({
        data: "you hit the point of login"
    })
}

export const logout = async(req, res) => {
    res.json({
        data: "you hit the point of logout"
    })
}