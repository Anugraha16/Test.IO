import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  staff:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },] // Reference to the Staff model
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
