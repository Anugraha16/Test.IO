import React, { useState, useEffect } from "react";
import { Play, ChevronDown } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { draculaInit } from "@uiw/codemirror-theme-dracula";

const languageExtensions = {
  javascript: [javascript({ jsx: true })],
  python: [python()],
  java: [java()],
  cpp: [cpp()],
};

const CodeEditor = ({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  onOutputChange,
}) => {
  const [publicTestCases, setPublicTestCases] = useState([]);
  const [privateTestCases, setPrivateTestCases] = useState([]);
  const [output, setOutput] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [privateTestResults, setPrivateTestResults] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/assesments/6749c73c11ba5a506329d650")
      .then((response) => response.json())
      .then((fetchedData) => {
        const publicTests =
          fetchedData.questions[0].programmingDetails.publicTestCases;
        const privateTests =
          fetchedData.questions[0].programmingDetails.privateTestCases || [];
        setPublicTestCases(publicTests);
        setPrivateTestCases(privateTests);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const compareOutputs = (expected, actual) => {
    try {
      const cleanExpected = JSON.parse(expected.replace(/'/g, '"'));
      const cleanActual = JSON.parse(actual.replace(/'/g, '"'));
      return JSON.stringify(cleanExpected) === JSON.stringify(cleanActual);
    } catch (error) {
      return expected.trim() === actual.trim();
    }
  };

  const handleRun = async () => {
    const allTestCases = [...publicTestCases, ...privateTestCases];
    const requestBody = {
      language: language,
      code: code,
      test_cases: allTestCases.map((testCase) => {
        try {
          const formattedInput = JSON.parse(testCase.input);
          return { input: formattedInput.join(" ") };
        } catch (error) {
          return { input: testCase.input };
        }
      }),
    };

    try {
      const response = await fetch(
        "https://t4qjaku634.execute-api.ap-south-1.amazonaws.com/production/compiler",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const rawOutput = responseData.body || "No output from backend";

        try {
          const outputArray = JSON.parse(rawOutput);
          const results = outputArray.map((item) => item.output);

          // Split results into public and private test results
          const publicResults = results.slice(0, publicTestCases.length);
          const privateResults = results.slice(publicTestCases.length);

          // Process public test cases
          const publicTestResults = publicResults.map((result, index) => ({
            output: result,
            expected: publicTestCases[index].output,
            passed: compareOutputs(publicTestCases[index].output, result),
          }));

          // Process private test cases
          const privateTestResults = privateResults.map((result, index) => ({
            output: result,
            expected: privateTestCases[index].output,
            passed: compareOutputs(privateTestCases[index].output, result),
          }));

          const publicPassedCount = publicTestResults.filter(
            (result) => result.passed
          ).length;
          const privatePassedCount = privateTestResults.filter(
            (result) => result.passed
          ).length;

          setOutput(results);
          setTestResults({
            results: publicTestResults,
            passedCount: publicPassedCount,
            totalCount: publicTestResults.length,
          });
          setPrivateTestResults({
            results: privateTestResults,
            passedCount: privatePassedCount,
            totalCount: privateTestResults.length,
          });
          onOutputChange(results);
        } catch (error) {
          console.error("Error parsing output:", error);
          setOutput([rawOutput]);
          onOutputChange([rawOutput]);
        }
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-900 text-white">
      {/* Header Section */}
      <div className="flex items-center justify-between p-3 border-b border-gray-600">
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-gray-700 text-sm text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <button
          onClick={handleRun}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-sm text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          <Play className="w-4 h-4" />
          Run Code
        </button>
      </div>

      <div className="flex-1 h-full w-full overflow-hidden">
        <CodeMirror
          value={code}
          height="100%"
          width="100%" // Ensures CodeMirror takes the full width
          theme={draculaInit({
            settings: {
              caret: "#1118270",
              fontFamily: "JetBrains Mono, monospace",
              background: "#111827",
              selection: "#111827",
            },
          })}
          extensions={
            languageExtensions[language] || languageExtensions["javascript"]
          }
          onChange={onCodeChange}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            searchKeymap: true,
          }}
        />
      </div>

      {/* Test Cases Section */}
      <div className="bg-gray-800 p-4 mt-4 overflow-auto max-h-80">
        {/* Public Test Cases */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            Public Test Cases
          </h3>
          <div className="space-y-4 text-sm text-gray-300">
            {publicTestCases.length === 0 ? (
              <p>Loading public test cases...</p>
            ) : (
              publicTestCases.map((testCase, idx) => (
                <div
                  key={idx}
                  className="border border-gray-700 rounded-lg p-4"
                >
                  <div className="font-semibold text-white">
                    Test Case {idx + 1}
                    {testResults && (
                      <span
                        className={`ml-2 ${
                          testResults.results[idx].passed
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        [{testResults.results[idx].passed ? "Passed" : "Failed"}
                        ]
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <strong>Input:</strong>
                    <pre className="bg-gray-900 p-2 rounded-md mt-1">
                      {testCase.input}
                    </pre>
                  </div>
                  <div className="mt-2">
                    <strong>Expected Output:</strong>
                    <pre className="bg-gray-900 p-2 rounded-md mt-1">
                      {testCase.output}
                    </pre>
                  </div>
                  {testResults && testResults.results[idx] && (
                    <div className="mt-2">
                      <strong>Your Output:</strong>
                      <pre
                        className={`p-2 rounded-md mt-1 ${
                          testResults.results[idx].passed
                            ? "bg-green-900"
                            : "bg-red-900"
                        }`}
                      >
                        {testResults.results[idx].output}
                      </pre>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Private Test Cases Summary */}
        {privateTestCases.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              Private Test Cases
            </h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">
                {privateTestResults
                  ? `${privateTestResults.passedCount} out of ${privateTestResults.totalCount} private test cases passed`
                  : "Run your code to see private test results"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
