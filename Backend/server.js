import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import connectDB from "./database/db.js";

dotenv.config();
const PORT = process.env.PORT;

const app=express();
app.use(express.json())
app.use(cookieParser());



app.get("/",(req,res)=>{
    res.send('Hello Users!');
})

app.use("/auth",authRoute);


app.listen(PORT,()=>{
    connectDB();
    console.log(`SERVER  IS RUNNING ON PORT ${PORT}`);
})