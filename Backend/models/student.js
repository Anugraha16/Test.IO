import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collegeName: { type: String},
  name: { type: String },
  dob: { type: Date},
  gender: { type: String, enum: ['male', 'female', 'other',''], default:'' },
  phoneNo: { type: String},
  course: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
  }],
}, { timestamps: true });

const Student= mongoose.model('Student', studentSchema);

export default Student;