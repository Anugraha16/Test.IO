import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import MCQQuestionForm from '../questions/MCQQuestionForm';
import CodingQuestionForm from '../questions/CodingQuestionForm';
import QuestionHeader from '../questions/QuestionHeader';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedType, setSelectedType] = useState('mcq');

  const createNewQuestion = (type) => {
    const newId = questions.length ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    
    if (type === 'mcq') {
      return {
        id: newId,
        type: 'mcq',
        title: '',
        difficulty: 'medium',
        question: '',
        options: [
          { id: '1', text: '', isCorrect: false },
          { id: '2', text: '', isCorrect: false },
          { id: '3', text: '', isCorrect: false },
          { id: '4', text: '', isCorrect: false }
        ]
      };
    }

    return {
      id: newId,
      type: 'coding',
      title: '',
      difficulty: 'medium',
      description: '',
      constraints: '',
      example: '',
      expectedOutput: '',
      publicTestCases: [{ input: '', output: '' }],
      privateTestCases: [{ input: '', output: '' }]
    };
  };

  const addNewQuestion = () => {
    setQuestions([...questions, createNewQuestion(selectedType)]);
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const handleMCQOptionChange = (questionId, optionId, field, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.type === 'mcq') {
        return {
          ...q,
          options: q.options.map(opt => 
            opt.id === optionId ? { ...opt, [field]: value } : field === 'isCorrect' ? { ...opt, isCorrect: false } : opt
          )
        };
      }
      return q;
    }));
  };

  const handleTestCaseChange = (questionId, type, index, field, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.type === 'coding') {
        const testCasesField = `${type}TestCases`;
        const testCases = [...q[testCasesField]];
        testCases[index] = { ...testCases[index], [field]: value };
        return { ...q, [testCasesField]: testCases };
      }
      return q;
    }));
  };

  const addTestCase = (questionId, type) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.type === 'coding') {
        const testCasesField = `${type}TestCases`;
        return {
          ...q,
          [testCasesField]: [...q[testCasesField], { input: '', output: '' }]
        };
      }
      return q;
    }));
  };

  const handleSendQuestion = (question) => {
    console.log('Sending question:', JSON.stringify(question, null, 2)); // Pretty print JSON
    // Add your API call here
  };

  const handleClearQuestions = () => {
    if (questions.length === 0) {
      return;
    }
    
    if (window.confirm('Are you sure you want to clear all questions? This action cannot be undone.')) {
      setQuestions([]);
    }
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Questions Management</h1>
            <p className="text-gray-600">Create and manage MCQ and coding questions</p>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="mcq">MCQ Question</option>
              <option value="coding">Coding Question</option>
            </select>
            <button 
              onClick={addNewQuestion}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
              <span>Add Question</span>
            </button>
            <button 
              onClick={handleClearQuestions}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              disabled={questions.length === 0}
            >
              <Trash2 className="h-5 w-5" />
              <span>Clear All</span>
            </button>
          </div>
        </div>
      </header>

      <div className="space-y-8">
        {questions.map((question) => (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => handleDeleteQuestion(question.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
              title="Delete question"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            
            <QuestionHeader
              question={question}
              onQuestionChange={handleQuestionChange}
            />

            {question.type === 'mcq' ? (
              <MCQQuestionForm
                question={question}
                onQuestionChange={handleQuestionChange}
                onOptionChange={handleMCQOptionChange}
              />
            ) : (
              <CodingQuestionForm
                question={question}
                onQuestionChange={handleQuestionChange}
                onTestCaseChange={handleTestCaseChange}
                onAddTestCase={addTestCase}
              />
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Preview
              </button>
              <button 
                onClick={() => handleSendQuestion(question)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Send
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
