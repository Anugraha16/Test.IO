import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  name: { type: String, default:'' },
  dob: { type: Date, default:Date },
  gender: { type: String, enum: ['male', 'female', 'other', ''], required:false },
  phoneNo: { type: String, default:'' },
}, {
  timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
