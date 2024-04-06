import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userrouter from './routes/user.route.js';
dotenv.config();

const app=express();

mongoose.connect(process.env.MONGO).then(()=>console.log("DB connected successfully")).catch((err)=>{
    console.log("error in DB connection ")
})

app.listen(3000,()=>{
    console.log("server running on port-3000")
});

app.use('/api/user',userrouter)

