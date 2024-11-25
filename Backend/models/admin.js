import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  name: { type: String, deafult:'' },
  dob: { type: Date, default:Date },
  gender: { type: String, enum: ['male', 'female', 'other', ''], required:false },
  phoneNo: { type: String, deafult:'' },
}, {
  timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
