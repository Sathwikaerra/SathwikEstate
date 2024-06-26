import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userrouter from './routes/user.route.js';
import authrouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listingRoute.js'
import path from 'path'
dotenv.config();


const app=express();
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO).then(()=>console.log("DB connected successfully")).catch((err)=>{
    console.log("error in DB connection ")
})

const __dirname=path.resolve();



app.listen(3000,()=>{
    console.log("server running on port-3000")
});

app.use('/api/user',userrouter)
app.use('/api/auth',authrouter)
app.use('/api/listing',listingRouter)

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{

    res.sendFile(path.join(__dirname,'client','dist','index.html'));

})

app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    const message=err.message || 'Internal Server Error';
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message,
    });
})
