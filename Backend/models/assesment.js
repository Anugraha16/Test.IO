import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
  {
    testId: { type: String, required: true, unique: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    }, // Reference to Staff model
    testType: { type: String, enum: ["mcq", "programming"], required: true }, // Type of test
    questions: [
      {
        type: {
          type: String,
          enum: ["mcq", "coding"],
          required: true,
        }, // Question type
        marks: { type: Number, required: true }, // Marks for the question
        questionText: { type: String, required: true }, // Common question field
        // MCQ-specific fields
        options: [
          {
            id: { type: String },
            optionText: { type: String },
            isCorrect: { type: Boolean },
          },
        ],
        // Coding-specific fields
        programmingDetails: {
          title: { type: String }, 
          description: { type: String }, // Detailed description of the problem
          constraints: { type: String }, // Constraints or rules for the solution
          example: { type: String }, // Example of input/output
          expectedOutput: { type: String }, // Expected output
          publicTestCases: [
            {
              input: { type: String, required: true }, // Test case input
              output: { type: String, required: true }, // Expected output
            },
          ],
          privateTestCases: [
            {
              input: { type: String, required: true }, // Test case input
              output: { type: String, required: true }, // Expected output
            },
          ],
        },
      },
    ],
  allowedStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", 
    },
  ],
  duration: { type: Number, required: true }, 
},
{ timestamps: true }
);


const Assessment=mongoose.model("Assessment",assessmentSchema);

export default Assessment;
