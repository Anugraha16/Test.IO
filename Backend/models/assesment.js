import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  testId: { type: String, required: true, unique: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true }, // Reference to Staff model
  testType: { type: String, enum: ['mcq', 'programming'], required: true }, // Type of test
  questions: [
    {
      questionText: { type: String, required: true }, // Common question field
      marks: { type: Number, required: true },
      options: [
        {
          optionText: { type: String },
          isCorrect: { type: Boolean },
        },
      ], // Options for MCQ questions
      programmingDetails: {
        title: { type: String, required: true }, // Title of the programming problem
        description: { type: String, required: true }, // Detailed description of the problem
        testCases: [
          {
            input: { type: String, required: true }, // Test case input
            output: { type: String, required: true }, // Expected output
          },
        ], // Test cases for the programming question
        constraints: { type: String }, // Constraints or rules for the solution
      }, // Programming-specific question fields
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Assessment', assessmentSchema);
