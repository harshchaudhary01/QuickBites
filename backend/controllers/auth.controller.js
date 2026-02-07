import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/token.js";

export const signUp = async (req, res) =>{
    try {
        const {fullName, email, password, mobile, role} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exist."}); // we use "400", bcoz it's the fault of client side user.
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 characters long."});
        }
        if(mobile.length < 10){
            return res.status(400).json({message: "Mobile number must be 10 digits long."});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            mobile,
            role
        })

        // now, user is created, the first thing we have to do after this, is to generate the token 

        const token = await generateToken(user._id);
        res.cookie("token", token, {
            secure: false, // in the dev phase, we use "false" because we only uses "http" & secure means "https"...
            sameSite: "strict", // whenever, we put secure = false, we also put sameSite = "strict"
            maxAge: 7*24*60*60*1000, // we give the value in millisecond not like "7d"
            httpOnly: true,
        })

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json(`SignUp Error: ${error}`);
    }
}


export const signIn = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User doesn't exist."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Incorrect Password!"});
        }

        const token = await generateToken(user._id);
        res.cookie("token", token, {
            secure: false, // in the dev phase, we use "false" because we only uses "http" & secure means "https"...
            sameSite: "strict", // whenever, we put secure = false, we also put sameSite = "strict"
            maxAge: 7*24*60*60*1000, // we give the value in millisecond not like "7d"
            httpOnly: true,
        })

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json(`Sign In Error: ${error}`);
    }
}

export const signOut = async (req, res) =>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message: `Logout Successfully!`});
    } catch (error) {
        res.status(500).json({message: `sign Out Error: ${error}`});
    }
}