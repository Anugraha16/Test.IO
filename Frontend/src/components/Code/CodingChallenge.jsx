import React, { useState, useEffect } from "react";
import { Play, ChevronDown, Loader2 } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { dracula } from "@uiw/codemirror-theme-dracula";

const COMPILER_API = "https://t4qjaku634.execute-api.ap-south-1.amazonaws.com/production/compiler";
const ASSESSMENT_API = "http://localhost:5000/assesments/6749c73c11ba5a506329d650";

const languageExtensions = {
  javascript: javascript({ jsx: true }),
  python: python(),
  java: java(),
  cpp: cpp()
};

const languages = {
  javascript: {
    template: `function solution() {
    // Write your solution here
}`
  },
  python: {
    template: `def solution():
    # Write your solution here`
  },
  java: {
    template: `public class Solution {
    public static void main(String[] args) {
        // Write your solution here
    }
}`
  },
  cpp: {
    template: `int solution() {
    // Write your solution here
    return 0;
}`
  }
};

const TestResults = ({ results, passedCount, totalCount, privateResults }) => (
  <div className="space-y-4 bg-gray-800 p-4 rounded-md shadow-lg">
    <h3 className="text-xl text-green-500 font-semibold">Test Results</h3>
    <ul className="space-y-2">
      {results.map((result, index) => (
        <li
          key={index}
          className={`p-3 rounded-md ${
            result.passed ? "bg-green-600/20" : "bg-red-600/20"
          } border ${result.passed ? "border-green-600" : "border-red-600"}`}
        >
          <div className="flex justify-between items-center">
            <strong>Test Case {index + 1}:</strong>
            <span className={result.passed ? "text-green-400" : "text-red-400"}>
              {result.passed ? "Passed" : "Failed"}
            </span>
          </div>
          {!result.passed && (
            <div className="mt-2 text-sm">
              <div className="text-gray-400">Expected: {result.expected}</div>
              <div className="text-gray-400">Got: {result.output}</div>
            </div>
          )}
        </li>
      ))}
    </ul>
    <p className="text-gray-400">
      Public Tests: {passedCount}/{totalCount} Passed
    </p>
    {privateResults && (
      <p className="text-gray-400 mt-2">
        Private Tests: {privateResults.passedCount}/{privateResults.totalCount} Passed
      </p>
    )}
  </div>
);

const CodingChallenge = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(languages.javascript.template);
  const [language, setLanguage] = useState("javascript");
  const [publicTestCases, setPublicTestCases] = useState([]);
  const [privateTestCases, setPrivateTestCases] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [privateTestResults, setPrivateTestResults] = useState(null);
  const [isCodeLoading, setIsCodeLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ASSESSMENT_API);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        const publicTests = fetchedData.questions[0].programmingDetails.publicTestCases;
        const privateTests = fetchedData.questions[0].programmingDetails.privateTestCases || [];
        setPublicTestCases(publicTests);
        setPrivateTestCases(privateTests);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const compareOutputs = (expected, actual) => {
    try {
      const cleanExpected = JSON.parse(expected.replace(/'/g, '"'));
      const cleanActual = JSON.parse(actual.replace(/'/g, '"'));
      return JSON.stringify(cleanExpected) === JSON.stringify(cleanActual);
    } catch {
      return expected.trim() === actual.trim();
    }
  };

  const handleRun = async () => {
    setIsCodeLoading(true);
    setTestResults(null);
    setPrivateTestResults(null);

    const allTestCases = [...publicTestCases, ...privateTestCases];
    const requestBody = {
      language,
      code,
      test_cases: allTestCases.map((testCase) => ({
        input: Array.isArray(testCase.input) 
          ? testCase.input.join(" ")
          : testCase.input
      }))
    };

    try {
      const response = await fetch(COMPILER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      const results = JSON.parse(responseData.body || "[]");

      if (!Array.isArray(results)) {
        throw new Error("Invalid response format");
      }

      const outputs = results.map(item => item.output);
      const publicResults = outputs.slice(0, publicTestCases.length);
      const privateResults = outputs.slice(publicTestCases.length);

      setTestResults({
        results: publicResults.map((result, index) => ({
          output: result,
          expected: publicTestCases[index].output,
          passed: compareOutputs(publicTestCases[index].output, result)
        })),
        passedCount: publicResults.filter((result, index) => 
          compareOutputs(publicTestCases[index].output, result)
        ).length,
        totalCount: publicTestCases.length
      });

      setPrivateTestResults({
        results: privateResults.map((result, index) => ({
          output: result,
          expected: privateTestCases[index].output,
          passed: compareOutputs(privateTestCases[index].output, result)
        })),
        passedCount: privateResults.filter((result, index) => 
          compareOutputs(privateTestCases[index].output, result)
        ).length,
        totalCount: privateTestCases.length
      });
    } catch (error) {
      setError(`Error executing code: ${error.message}`);
    } finally {
      setIsCodeLoading(false);
    }
  };

  const onLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(languages[newLanguage].template);
    setTestResults(null);
    setPrivateTestResults(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
        No problem data available.
      </div>
    );
  }

  const { testId, questions } = data;
  const { title, description, constraints, example } = questions[0]?.programmingDetails || {};

  return (
    <div className="flex h-screen">
      {/* Left Panel - Problem Description */}
      <div className="w-1/2 overflow-y-auto bg-gray-100 p-8">
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">{title}</h2>
          <section className="space-y-3">
            <p className="text-gray-700"><strong>Test ID:</strong> {testId}</p>
          </section>
          <section className="space-y-3">
            <h3 className="font-semibold text-lg text-blue-600">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
          </section>
          <section className="space-y-3">
            <h3 className="font-semibold text-lg text-amber-600">Constraints</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{constraints}</p>
          </section>
          <section className="space-y-3">
            <h3 className="font-semibold text-lg text-emerald-600">Example</h3>
            <pre className="font-mono text-sm text-purple-600 bg-gray-50 p-4 rounded-md overflow-x-auto">
              {example}
            </pre>
          </section>
        </div>
      </div>

      {/* Right Panel - Code Editor and Test Results */}
      <div className="w-1/2 flex flex-col h-full bg-gray-900 text-white">
        {/* Top Section - Code Editor Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-gray-700 text-sm text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
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
            disabled={isCodeLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-sm text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            {isCodeLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Code
              </>
            )}
          </button>
        </div>

        {/* Middle Section - Code Editor */}
        <div className="flex-1 overflow-hidden border-b border-gray-600">
          <CodeMirror
            value={code}
            height="100%"
            theme={dracula}
            extensions={[languageExtensions[language]]}
            onChange={setCode}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              highlightSpecialChars: true,
              history: true,
              foldGutter: true,
              drawSelection: true,
              dropCursor: true,
              allowMultipleSelections: true,
              indentOnInput: true,
              syntaxHighlighting: true,
              bracketMatching: true,
              closeBrackets: true,
              autocompletion: true,
              rectangularSelection: true,
              crosshairCursor: true,
              highlightActiveLine: true,
              highlightSelectionMatches: true,
              closeBracketsKeymap: true,
              defaultKeymap: true,
              searchKeymap: true,
              historyKeymap: true,
              foldKeymap: true,
              completionKeymap: true,
              lintKeymap: true
            }}
          />
        </div>

        {/* Bottom Section - Test Results */}
        <div className="h-1/2 overflow-y-auto p-4">
          {testResults && (
            <TestResults
              results={testResults.results}
              passedCount={testResults.passedCount}
              totalCount={testResults.totalCount}
              privateResults={privateTestResults}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;