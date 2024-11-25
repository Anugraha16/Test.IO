import React from 'react';

const MCQQuestionForm = ({ question, onQuestionChange, onOptionChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
          value={question.question}
          onChange={(e) => onQuestionChange(question.id, 'question', e.target.value)}
          placeholder="Enter your question..."
        />
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        {question.options.map((option, index) => (
          <div key={option.id} className="flex items-center gap-4">
            <input
              type="radio"
              checked={option.isCorrect}
              onChange={() => onOptionChange(question.id, option.id, 'isCorrect', true)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <input
              type="text"
              value={option.text}
              onChange={(e) => onOptionChange(question.id, option.id, 'text', e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCQQuestionForm;
