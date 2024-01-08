import db from "../models/index.js";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";

const {UserModel}= db

export const register=async(req,res)=>{
    const {username, email, password}=req.body
    try {
        const existingEmail= await UserModel.findOne({where:{email}})
        if(existingEmail){
            return res.status(404).json("email already exist")
        }
        const hashedPass= await bcrypt.hash(password,9)
        const newUser=await UserModel.create({
            username,email,password:hashedPass
        })
        const token= jwt.sign(
            {
                userId:newUser.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        )
        res.status(200).json({newUser, token})

    } catch (error) {
        console.log(error.message)
        res.status(404).json(error.message)
    }
}

export const login = async(req,res)=>{
    const {email,password}= req.body

    try {
        if(!email || !password){
            return res.status(404).json("email and password are required")
        }
        const existingUser= await UserModel.findOne({where:{email}})
        if(!existingUser){
            res.status(400).json("email or password incorrect")
        }
        const isPassword =await bcrypt.compare(password, existingUser.password)
        if(!isPassword){
            return res.status(400).json("Email or password incorrect")
        }
        const token=jwt.sign(
            {
                userId:existingUser.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        )
        await existingUser.update({token})

        res.cookie("access_token",token,{
            httpOnly:true,
            secure:"true",
            sameSite:"None"
        }).status(200).json({message:"Login successfully",existingUser})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message:error.message });
    }
}