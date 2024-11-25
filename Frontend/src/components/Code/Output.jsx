import React from "react";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const Output = ({ expectedOutput, actualOutput, testCaseResult }) => {
  const getStatusIcon = () => {
    switch (testCaseResult) {
      case 'Passed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'Failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (testCaseResult) {
      case 'Passed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Expected Output</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <pre className="font-mono text-sm whitespace-pre-wrap break-words text-gray-700">
              {expectedOutput}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-700">Your Output</h3>
            {testCaseResult && (
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor()}`}>
                {getStatusIcon()}
                <span className="text-sm font-medium">{testCaseResult}</span>
              </div>
            )}
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <pre className="font-mono text-sm whitespace-pre-wrap break-words text-gray-700">
              {actualOutput || 'No output yet'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Output;
