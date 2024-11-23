import mongoose, { Schema } from "mongoose";

const userSchema= new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Staff', 'Admin'], required: true },
    profile:{type:String,default:""}
}, {
    timestamps: true
  });

const user=mongoose.model("user",userSchema);


export default user;