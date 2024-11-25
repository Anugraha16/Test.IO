import React from 'react';

const CodingQuestionForm = ({
  question,
  onQuestionChange,
  onTestCaseChange,
  onAddTestCase,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
          value={question.description}
          onChange={(e) => onQuestionChange(question.id, 'description', e.target.value)}
          placeholder="Enter problem description..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Constraints</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          rows={2}
          value={question.constraints}
          onChange={(e) => onQuestionChange(question.id, 'constraints', e.target.value)}
          placeholder="Enter constraints..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Example</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            rows={2}
            value={question.example}
            onChange={(e) => onQuestionChange(question.id, 'example', e.target.value)}
            placeholder="Enter example..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expected Output</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            rows={2}
            value={question.expectedOutput}
            onChange={(e) => onQuestionChange(question.id, 'expectedOutput', e.target.value)}
            placeholder="Enter expected output..."
          />
        </div>
      </div>

      {['public', 'private'].map((testCaseType) => (
        <div key={testCaseType} className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              {testCaseType.charAt(0).toUpperCase() + testCaseType.slice(1)} Test Cases
            </label>
            <button
              onClick={() => onAddTestCase(question.id, testCaseType)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              + Add Test Case
            </button>
          </div>
          {question[`${testCaseType}TestCases`].map((testCase, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={testCase.input}
                onChange={(e) =>
                  onTestCaseChange(question.id, testCaseType, index, 'input', e.target.value)
                }
                placeholder="Input"
                className="p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                value={testCase.output}
                onChange={(e) =>
                  onTestCaseChange(question.id, testCaseType, index, 'output', e.target.value)
                }
                placeholder="Output"
                className="p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CodingQuestionForm;
