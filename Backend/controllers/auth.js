import bcrypt from "bcryptjs";

import User from "../models/user.js";
import generatetoken from "../utils/token.js";


export const signup=async(req,res)=>{
    try{
    const {userName,email,password,confirmPassword,role} = req.body;
    if(password!=confirmPassword){
        return res.status(400).json({error:'password mismatched'});
    }

    //Check user data 
    const user=await User.findOne({userName});
    if(user){
        return res.status(400).json({error:'User already exist'});
    }

    //Hash password
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);


    let profilepic=''
    //Avatar generator
    profilepic=`https://api.dicebear.com/9.x/initials/svg?seed=${userName}`;
    

    const newUser=new User({
        userName,
        email,
        hashPassword,
        role,
        profile:profilepic,
    });
    generatetoken(newUser._id,res);  //generate jwt token
    await newUser.save();
    res.status(200).json({message:'User created successfully'});
}
catch(error){
 res.status(500).json({error:error.message});
}}


//login routes
export const login=async(req,res)=>{
    try{
        const {userName,password}=req.body;
        const user=await User.findOne({userName});
        const verifyPassword=await bcrypt.compare(password, user?.password || "");
        
        if(!user || !verifyPassword){
            return res.status(400).json({error:"Invalid username or password"});
        }
        generatetoken(user._id,res);
        res.status(200).json({message:"Login successfull"});
    }   

    catch(error){
        console.log("Error in login",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}



//logout route
export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logout successfull"});
    }
    catch(error){
        console.log("Error in login",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}