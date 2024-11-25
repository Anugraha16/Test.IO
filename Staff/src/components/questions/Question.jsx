// Define the possible question types
export const QuestionType = {
  MCQ: 'mcq',
  CODING: 'coding',
};

// Define a test case object structure
export const TestCase = {
  input: '',
  output: '',
};

// Define an MCQ option structure
export const MCQOption = {
  id: '',
  text: '',
  isCorrect: false,
};

// Base question structure with common properties
export const BaseQuestion = {
  id: 0,
  type: '',
  title: '',
  difficulty: 'medium', // Can be 'easy', 'medium', or 'hard'
};

// Define an MCQ question structure, extending from BaseQuestion
export const MCQQuestion = {
  ...BaseQuestion,
  type: QuestionType.MCQ,
  question: '',
  options: [MCQOption],
};

// Define a coding question structure, extending from BaseQuestion
export const CodingQuestion = {
  ...BaseQuestion,
  type: QuestionType.CODING,
  description: '',
  constraints: '',
  example: '',
  expectedOutput: '',
  publicTestCases: [TestCase],
  privateTestCases: [TestCase],
};

// Combined question type that can be either MCQ or Coding
export const Question = { MCQQuestion, CodingQuestion };
