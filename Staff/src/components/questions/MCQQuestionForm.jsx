import React from 'react';
import { MinusCircle, PlusCircle } from 'lucide-react';

const MCQQuestionForm = ({ question, index, onChange }) => {
  const addOption = () => {
    const newOption = {
      id: Date.now().toString(),
      optionText: '',
      isCorrect: false
    };
    onChange(index, {
      ...question,
      options: [...(question.options || []), newOption]
    });
  };

  const removeOption = (optionIndex) => {
    const newOptions = [...(question.options || [])];
    newOptions.splice(optionIndex, 1);
    onChange(index, { ...question, options: newOptions });
  };

  const updateOption = (optionIndex, field, value) => {
    const newOptions = [...(question.options || [])];
    newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: value };
    onChange(index, { ...question, options: newOptions });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question Text</label>
          <input
            type="text"
            value={question.questionText}
            onChange={(e) => onChange(index, { ...question, questionText: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter question text"
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

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">Options</label>
          <button
            type="button"
            onClick={addOption}
            className="text-blue-500 hover:text-blue-700"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
        
        {question.options?.map((option, optionIndex) => (
          <div key={option.id} className="flex items-center gap-2">
            <input
              type="text"
              value={option.optionText}
              onChange={(e) => updateOption(optionIndex, 'optionText', e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm"
              placeholder={`Option ${optionIndex + 1}`}
            />
            <input
              type="checkbox"
              checked={option.isCorrect}
              onChange={(e) => updateOption(optionIndex, 'isCorrect', e.target.checked)}
              className="rounded border-gray-300"
            />
            <button
              type="button"
              onClick={() => removeOption(optionIndex)}
              className="text-red-500 hover:text-red-700"
            >
              <MinusCircle className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCQQuestionForm;
