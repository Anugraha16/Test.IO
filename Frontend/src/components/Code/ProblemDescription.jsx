import React from 'react';
import { BookOpen, Code2, AlertCircle } from 'lucide-react';

const ProblemDescription = ({ title, description, examples, constraints, id, type, difficulty }) => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">{title}</h2>

        <div className="space-y-6">
          {/* Problem Information */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Problem Information</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">ID:</span> {id}
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Type:</span> {type}
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Difficulty:</span> {difficulty}
            </p>
          </section>

          {/* Description */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Description</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </section>

          {/* Examples */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <Code2 className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Examples</h3>
            </div>
            <div className="space-y-4">
              {examples.map((example, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="font-medium text-gray-700">Example {index + 1}:</p>
                  <div className="space-y-1 font-mono text-sm">
                    <p><span className="text-purple-600 font-semibold">Input:</span> {example.input}</p>
                    <p><span className="text-green-600 font-semibold">Output:</span> {example.output}</p>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    <span className="font-semibold">Explanation:</span> {example.explanation}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Constraints */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Constraints</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {constraints.map((constraint, index) => (
                <li key={index} className="text-sm">{constraint}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
