import mongoose from "mongoose";

const staffSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Instructor' },
  assignedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  assignedStudents: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  testAnalytics: [
    {
      testId: { type: Schema.Types.ObjectId, ref: 'Test' },
      averageScore: { type: Number },
      passRate: { type: Number },
    },
  ],
});

module.exports = mongoose.model('Staff', staffSchema);
