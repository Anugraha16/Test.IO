import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';

const CodingQuestionForm = ({ question, index, onChange }) => {
  const addTestCase = (type) => {
    const newTestCase = {
      input: '',
      output: ''
    };
    
    const field = `${type}TestCases`;
    const currentTestCases = question.programmingDetails?.[field] || [];
    
    onChange(index, {
      ...question,
      programmingDetails: {
        ...question.programmingDetails,
        [field]: [...currentTestCases, newTestCase]
      }
    });
  };

  const updateTestCase = (type, testCaseIndex, field, value) => {
    const arrayField = `${type}TestCases`;
    const currentTestCases = [...(question.programmingDetails?.[arrayField] || [])];
    currentTestCases[testCaseIndex] = { ...currentTestCases[testCaseIndex], [field]: value };
    
    onChange(index, {
      ...question,
      programmingDetails: {
        ...question.programmingDetails,
        [arrayField]: currentTestCases
      }
    });
  };

  const removeTestCase = (type, testCaseIndex) => {
    const arrayField = `${type}TestCases`;
    const currentTestCases = [...(question.programmingDetails?.[arrayField] || [])];
    currentTestCases.splice(testCaseIndex, 1);
    
    onChange(index, {
      ...question,
      programmingDetails: {
        ...question.programmingDetails,
        [arrayField]: currentTestCases
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={question.programmingDetails?.title || ''}
            onChange={(e) => onChange(index, {
              ...question,
              programmingDetails: {
                ...question.programmingDetails,
                title: e.target.value
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter question title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Marks</label>
          <input
            type="number"
            value={question.marks}
            onChange={(e) => onChange(index, { ...question, marks: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            min="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={question.programmingDetails?.description || ''}
          onChange={(e) => onChange(index, {
            ...question,
            programmingDetails: {
              ...question.programmingDetails,
              description: e.target.value
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={4}
          placeholder="Enter detailed problem description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Constraints</label>
        <textarea
          value={question.programmingDetails?.constraints || ''}
          onChange={(e) => onChange(index, {
            ...question,
            programmingDetails: {
              ...question.programmingDetails,
              constraints: e.target.value
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={2}
          placeholder="Enter constraints"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Example</label>
        <textarea
          value={question.programmingDetails?.example || ''}
          onChange={(e) => onChange(index, {
            ...question,
            programmingDetails: {
              ...question.programmingDetails,
              example: e.target.value
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={2}
          placeholder="Enter example"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Expected Output</label>
        <textarea
          value={question.programmingDetails?.expectedOutput || ''}
          onChange={(e) => onChange(index, {
            ...question,
            programmingDetails: {
              ...question.programmingDetails,
              expectedOutput: e.target.value
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={2}
          placeholder="Enter expected output"
        />
      </div>

      {/* Public Test Cases */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">Public Test Cases</label>
          <button
            type="button"
            onClick={() => addTestCase('public')}
            className="text-blue-500 hover:text-blue-700"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
        
        {question.programmingDetails?.publicTestCases?.map((testCase, testCaseIndex) => (
          <div key={testCaseIndex} className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={testCase.input}
              onChange={(e) => updateTestCase('public', testCaseIndex, 'input', e.target.value)}
              className="rounded-md border-gray-300 shadow-sm"
              placeholder="Input"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={testCase.output}
                onChange={(e) => updateTestCase('public', testCaseIndex, 'output', e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm"
                placeholder="Output"
              />
              <button
                type="button"
                onClick={() => removeTestCase('public', testCaseIndex)}
                className="text-red-500 hover:text-red-700"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Private Test Cases */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">Private Test Cases</label>
          <button
            type="button"
            onClick={() => addTestCase('private')}
            className="text-blue-500 hover:text-blue-700"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
        
        {question.programmingDetails?.privateTestCases?.map((testCase, testCaseIndex) => (
          <div key={testCaseIndex} className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={testCase.input}
              onChange={(e) => updateTestCase('private', testCaseIndex, 'input', e.target.value)}
              className="rounded-md border-gray-300 shadow-sm"
              placeholder="Input"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={testCase.output}
                onChange={(e) => updateTestCase('private', testCaseIndex, 'output', e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm"
                placeholder="Output"
              />
              <button
                type="button"
                onClick={() => removeTestCase('private', testCaseIndex)}
                className="text-red-500 hover:text-red-700"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingQuestionForm;
