import mongoose from "mongoose";

const courseSchema = new Schema({
  courseName: { type: String, required: true },
  description: { type: String },
  instructor: { type: Schema.Types.ObjectId, ref: 'Staff' },
  enrolledStudents: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  tests: [
    {
      testId: { type: Schema.Types.ObjectId, ref: 'Test' },
      testType: { type: String, enum: ['MCQ', 'Programming'], required: true },
    },
  ],
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);
