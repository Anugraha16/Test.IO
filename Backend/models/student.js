import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], default:'' },
  phoneNo: { type: String, required: true },
  course: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
    required: true,
  }],
  organization:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', // Reference to the Course model
    required: true,
  }
}, { timestamps: true });

const Student= mongoose.model('Student', studentSchema);

export default Student;
