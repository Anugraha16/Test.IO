import React, { useState, useEffect } from "react";
import ProblemDescription from "./ProblemDescription";
import CodeEditor from "./CodeEditor";
import Output from "./Output";

const languages = {
  javascript: {
    template: `/**
 * @param {string} s
 * @return {number}
 */
function longestValidParentheses(s) {
    // Write your solution here
}`,
  },
  python: {
    template: `class Solution:
    def longestValidParentheses(self, s: str) -> int:
        # Write your solution here
        pass`,
  },
  java: {
    template: `class Solution {
    public int longestValidParentheses(String s) {
        // Write your solution here
    }
}`,
  },
  cpp: {
    template: `class Solution {
public:
    int longestValidParentheses(string s) {
        // Write your solution here
    }
};`,
  },
};

const CodeTest = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [testCaseResult, setTestCaseResult] = useState(null);
  const [output, setOutput] = useState("");

  // Get query params from URL (question and expected output)
  const urlParams = new URLSearchParams(window.location.search);
  const question = urlParams.get('question');
  const expectedOutput = urlParams.get('expectedOutput');

  useEffect(() => {
    setCode(languages[language].template);
  }, [language]);

  const runTestCase = () => {
    try {
      if (language === "javascript") {
        const result = eval(`
          ${code}
          longestValidParentheses(")()())");
        `);
        setTestCaseResult(result === 4 ? "Passed" : "Failed");
        setOutput(result.toString());
      } else {
        setOutput("Code execution requires a backend service");
        setTestCaseResult("Backend Required");
      }
    } catch (error) {
      setTestCaseResult("Failed");
      setOutput(error.toString());
    }
  };

  // Problem data
  const id = "problem-32"; // Example ID
  const type = "Dynamic Programming"; // Example problem type
  const difficulty = "Medium"; // Example difficulty level
  const title = "32. Longest Valid Parentheses";
  const description = question || "Provide a valid problem description here";
  const examples = [
    {
      input: 's = "(()"',
      output: "2",
      explanation: 'The longest valid parentheses substring is "()".',
    },
    {
      input: 's = ")()())"',
      output: "4",
      explanation: 'The longest valid parentheses substring is "()()".',
    },
  ];
  const constraints = [
    "0 ≤ s.length ≤ 3 * 104",
    "s[i] is '(', or ')'.",
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel: Problem Description */}
      <div className="w-2/5 border-r border-gray-200">
        <ProblemDescription 
          id={id}
          type={type}
          difficulty={difficulty}
          title={title}
          description={description}
          examples={examples}
          constraints={constraints}
        />
      </div>

      {/* Right Panel: Code Editor and Output */}
      <div className="w-3/5 flex flex-col">
        <div className="flex-1">
          <CodeEditor
            code={code}
            language={language}
            onCodeChange={setCode}
            onLanguageChange={setLanguage}
            onRun={runTestCase}
            onOutputChange={setOutput} // Pass the setOutput function to CodeEditor
          />
        </div>
        <Output
          expectedOutput={expectedOutput || "4"}
          actualOutput={output}
          testCaseResult={testCaseResult}
        />
      </div>
    </div>
  );
};

export default CodeTest;
