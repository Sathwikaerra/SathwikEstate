import User from "../models/user.model.js";
import  bcrypt from 'bcrypt'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashpassword=bcrypt.hashSync(password,10);

    const newUser=new User({username,email,password:hashpassword});
    try {
        await newUser.save();
   res.status(201).json("user created successfully")
    } catch (error) {
        next(error);
        
    }
   
}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        const validuser=await User.findOne({email})
        if(!validuser) return next(errorHandler(404,"User not found"))

        const validpassword=  bcrypt.compareSync(password,validuser.password);

        if(!validpassword)return next(errorHandler(401,"Invalid Credentials"));

        const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET)

        const {password:pass,...rest}=validuser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)








        
    } catch (error) {
        next(error)
    }



}


export const google=async(req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass,...rest}=user._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
                
            
        }
        else{
            // google nundi password theskole .. kani schema lo  required ani petnam andke random passwrd generst chesi tharvatha update chskoachu
            const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);//slice -8 antee last characters tostrinng ante numbers 0-9 lettres a-Z

            const hashpassword=bcrypt.hashSync(generatedPassword,10);

            const newuser=new User({
                username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
                email:req.body.email,
                password:hashpassword,
                avatar:req.body.photo
            })

            await newuser.save()
            const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET);

            const {password:pass,...rest}=newuser._doc;

            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
        }
        
    } catch (error) {
        next(error)
    }
}