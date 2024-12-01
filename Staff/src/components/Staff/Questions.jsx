import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import MCQQuestionForm from '../questions/MCQQuestionForm';
import CodingQuestionForm from '../questions/CodingQuestionForm';

const Questions = () => {
  const [assessment, setAssessment] = useState({
    testId: '',
    questions: [],
    duration: 60,
    allowedStudents: [],
    startDate: new Date(),
    endDate: new Date(),
    startTime: '',
    endTime: ''
  });

  const addQuestion = (type) => {
    const newQuestion = {
      type,
      marks: 0,
      questionText: '', // For MCQ and coding questions
      ...(type === 'mcq'
        ? { options: [] } // For MCQ type
        : {
            programmingDetails: {
              title: '',
              description: '',
              constraints: '',
              example: '',
              expectedOutput: '',
              publicTestCases: [{ input: '', output: '' }],
              privateTestCases: [{ input: '', output: '' }]
            }
          })
    };
    setAssessment((prev) => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion]
    }));
  };

  const updateQuestion = (index, updatedQuestion) => {
    const newQuestions = [...(assessment.questions || [])];
    newQuestions[index] = updatedQuestion;
    setAssessment((prev) => ({ ...prev, questions: newQuestions }));
  };

  const removeQuestion = (index) => {
    const newQuestions = [...(assessment.questions || [])];
    newQuestions.splice(index, 1);
    setAssessment((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate questions
    const invalidQuestion = assessment.questions.find((q) => {
      return q.type === 'mcq' && (!q.questionText || !q.questionText.trim());
    });

    if (invalidQuestion) {
      alert('Please fill in the question text for all questions.');
      return;
    }

    // Ensure coding questions have all programming details filled
    const codingInvalid = assessment.questions.find(
      (q) =>
        q.type === 'coding' &&
        (!q.programmingDetails.title ||
          !q.programmingDetails.description ||
          !q.programmingDetails.constraints ||
          !q.programmingDetails.example ||
          !q.programmingDetails.expectedOutput)
    );

    if (codingInvalid) {
      alert('Please fill in all the programming details for coding questions.');
      return;
    }

    const data = {
      testId: assessment.testId || '',
      testType: assessment.testType,
      duration: assessment.duration,
      startDate: assessment.startDate.toISOString(),
      endDate: assessment.endDate.toISOString(),
      startTime: assessment.startTime,
      endTime: assessment.endTime,
      questions: assessment.questions
    };

    if (!data.testId || data.questions.length === 0) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/assesments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to create assessment');
      }

      const result = await response.json();
      console.log('Assessment created successfully:', result);
    } catch (error) {
      console.error('Error creating assessment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Assessment</h2>
          <div className="space-x-2">
            <button
              type="button"
              onClick={() => addQuestion('mcq')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <PlusCircle className="w-5 h-5 inline mr-2" />
              Add MCQ
            </button>
            <button
              type="button"
              onClick={() => addQuestion('coding')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              <PlusCircle className="w-5 h-5 inline mr-2" />
              Add Coding Question
            </button>
          </div>
        </div>

        {/* Form for Test Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Test ID</label>
            <input
              type="text"
              value={assessment.testId || ''}
              onChange={(e) => setAssessment((prev) => ({ ...prev, testId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Enter unique test ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              value={assessment.duration || ''}
              onChange={(e) => setAssessment((prev) => ({ ...prev, duration: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              min="1"
            />
          </div>
        </div>

        {/* Form for Start and End Dates and Times */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={assessment.startDate.toISOString().split('T')[0] || ''}
              onChange={(e) => setAssessment((prev) => ({ ...prev, startDate: new Date(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={assessment.endDate.toISOString().split('T')[0] || ''}
              onChange={(e) => setAssessment((prev) => ({ ...prev, endDate: new Date(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              value={assessment.startTime || ''}
              onChange={(e) => setAssessment((prev) => ({ ...prev, startTime: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <input
              type="time"
              value={assessment.endTime || ''}
              onChange={(e) => setAssessment((prev) => ({ ...prev, endTime: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {assessment.questions?.map((question, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  Question {index + 1} ({question.type.toUpperCase()})
                </h3>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MinusCircle className="w-5 h-5" />
                </button>
              </div>

              {question.type === 'mcq' ? (
                <MCQQuestionForm question={question} index={index} onChange={updateQuestion} />
              ) : (
                <CodingQuestionForm question={question} index={index} onChange={updateQuestion} />
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
      >
        Submit Assessment
      </button>
    </form>
  );
};

export default Questions;
