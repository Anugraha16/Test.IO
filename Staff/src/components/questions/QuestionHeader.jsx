import React from 'react';
import { Code, ListChecks } from 'lucide-react';

const QuestionHeader = ({ question, onQuestionChange }) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        {question.type === 'mcq' ? (
          <ListChecks className="h-6 w-6 text-indigo-600" />
        ) : (
          <Code className="h-6 w-6 text-indigo-600" />
        )}
        <h2 className="text-xl font-semibold">
          {question.type === 'mcq' ? 'MCQ Question' : 'Coding Question'}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={question.title}
            onChange={(e) => onQuestionChange(question.id, 'title', e.target.value)}
            placeholder="Enter question title..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={question.difficulty}
            onChange={(e) => onQuestionChange(question.id, 'difficulty', e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default QuestionHeader;
