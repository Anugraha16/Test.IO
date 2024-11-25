import React, { useState } from "react";
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

const CodeEditor = ({ code, language, onCodeChange, onLanguageChange, onOutputChange }) => {
  const handleRun = async () => {
    const requestBody = JSON.stringify({ language, code });

    try {
      const response = await fetch(
        "https://0w2omuvw4d.execute-api.ap-south-1.amazonaws.com/production/Compiler",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        
        // Assuming the response has a `body` field that contains the output
        const output = responseData.body || "No output from backend";
        onOutputChange(output);  // Send the output to parent component
      } else {
        const errorMsg = `Error: ${response.status} - ${response.statusText}`;
        onOutputChange(errorMsg); // Send error message to parent component
      }
    } catch (error) {
      const errorMsg = `Error: ${error.message}`;
      onOutputChange(errorMsg); // Send error message to parent component
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#282a36]">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="appearance-none bg-gray-700 text-white px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={handleRun}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          <Play className="w-4 h-4" />
          Run Code
        </button>
      </div>

      {/* Code Editor Section */}
      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={code}
          height="100%"
          theme={draculaInit({
            settings: {
              caret: "#fff",
              fontFamily: "JetBrains Mono, monospace",
            },
          })}
          extensions={languageExtensions[language] || [javascript()]}
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
    </div>
  );
};

export default CodeEditor;
