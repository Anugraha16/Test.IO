import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  phoneNo: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);
