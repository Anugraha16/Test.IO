import mongoose from 'mongoose';


const studentSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  tests: [
    {
      testId: { type: Schema.Types.ObjectId, ref: 'Test' },
      score: { type: Number },
      dateTaken: { type: Date, default: Date.now },
    },
  ],
  progress: [
    {
      courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
      completedTests: { type: Number, default: 0 },
      totalTests: { type: Number },
      averageScore: { type: Number },
    },
  ],
});


const student=mongoose.model("student",studentSchema);

export default student;
