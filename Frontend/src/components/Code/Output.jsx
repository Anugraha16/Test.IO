import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const Output = ({ output }) => {
  const [apiData, setApiData] = useState(null);
  const [testResults, setTestResults] = useState(null);

  useEffect(() => {
    // Fetch the data from the API
    fetch("http://localhost:5000/assesments/6749c73c11ba5a506329d650")
      .then((response) => response.json())
      .then((fetchedData) => {
        setApiData(fetchedData);
        // Extract expected output and test cases
        const expectedOutput =
          fetchedData?.questions?.[0]?.programmingDetails?.expectedOutput || "";
        const publicTestCases =
          fetchedData?.questions?.[0]?.programmingDetails?.publicTestCases || [];
        const privateTestCases =
          fetchedData?.questions?.[0]?.programmingDetails?.privateTestCases || [];

        // Function to parse the string and return an array
        const parseOutput = (output) => {
          try {
            return JSON.parse(output); // Try to parse the string as JSON (i.e., array or object)
          } catch (e) {
            return output; // If parsing fails, return the original string
          }
        };

        // Function to check if output matches expected output
        const checkTestCases = (testCases, expectedOutput) => {
          let passed = 0;
          let failed = 0;
          const expectedParsed = parseOutput(expectedOutput);

          testCases.forEach((testCase) => {
            const actualParsed = parseOutput(testCase.output);

            // Compare arrays or objects by value
            if (JSON.stringify(actualParsed) === JSON.stringify(expectedParsed)) {
              passed += 1;
            } else {
              failed += 1;
            }
          });
          return { passed, failed };
        };

        // Check public and private test cases
        const publicResults = checkTestCases(publicTestCases, expectedOutput);
        const privateResults = checkTestCases(privateTestCases, expectedOutput);

        // Calculate total passed and failed
        const totalPassed = publicResults.passed + privateResults.passed;
        const totalFailed = publicResults.failed + privateResults.failed;

        setTestResults({
          publicResults,
          privateResults,
          totalPassed,
          totalFailed,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to handle the status icon
  const getStatusIcon = (result) => {
    switch (result) {
      case "Passed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "Failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  // Function to handle the status color
  const getStatusColor = (result) => {
    switch (result) {
      case "Passed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const publicTestCases =
    apiData?.questions?.[0]?.programmingDetails?.publicTestCases || [];
  const privateTestCases =
    apiData?.questions?.[0]?.programmingDetails?.privateTestCases || [];

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      {/* Display Public Test Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {publicTestCases.length > 0 ? (
          publicTestCases.map((testCase, index) => {
            const testResult = testCase.output ===
            apiData?.questions?.[0]?.programmingDetails?.expectedOutput
              ? "Passed"
              : "Failed";
            return (
              <div className="bg-white rounded-lg shadow-sm p-4" key={index}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Public Test Case {index + 1}
                  </h3>
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                      testResult
                    )}`}
                  >
                    {getStatusIcon(testResult)}
                    <span className="text-sm font-medium">{testResult}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {/* Input Field */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">Input:</h4>
                    <p className="bg-gray-50 p-2 rounded-md text-sm text-gray-700 border">
                      {JSON.stringify(testCase.input)}
                    </p>
                  </div>
                  {/* Expected Output Field */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">
                      Expected Output:
                    </h4>
                    <p className="bg-gray-50 p-2 rounded-md text-sm text-gray-700 border">
                      {apiData?.questions?.[0]?.programmingDetails?.expectedOutput}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center text-gray-500">
            No public test cases available.
          </div>
        )}
      </div>

      {/* Display Private Test Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {privateTestCases.length > 0 ? (
          privateTestCases.map((testCase, index) => {
            const testResult = testCase.output ===
            apiData?.questions?.[0]?.programmingDetails?.expectedOutput
              ? "Passed"
              : "Failed";
            return (
              <div className="bg-white rounded-lg shadow-sm p-4" key={index}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Private Test Case {index + 1}
                  </h3>
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                      testResult
                    )}`}
                  >
                    {getStatusIcon(testResult)}
                    <span className="text-sm font-medium">{testResult}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {/* Input Field */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">Input:</h4>
                    <p className="bg-gray-50 p-2 rounded-md text-sm text-gray-700 border">
                      {JSON.stringify(testCase.input)}
                    </p>
                  </div>
                  {/* Expected Output Field */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600">
                      Expected Output:
                    </h4>
                    <p className="bg-gray-50 p-2 rounded-md text-sm text-gray-700 border">
                      {apiData?.questions?.[0]?.programmingDetails?.expectedOutput}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center text-gray-500">
            No private test cases available.
          </div>
        )}
      </div>

      {/* Display Results Summary */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700">Test Results</h3>
        {testResults ? (
          <div className="text-sm text-gray-700">
            <p>
              <strong>Public Test Cases:</strong> Passed: {testResults.publicResults.passed}, Failed:{" "}
              {testResults.publicResults.failed}
            </p>
            <p>
              <strong>Private Test Cases:</strong> Passed: {testResults.privateResults.passed}, Failed:{" "}
              {testResults.privateResults.failed}
            </p>
            <p>
              <strong>Total:</strong> Passed: {testResults.totalPassed}, Failed: {testResults.totalFailed}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No test results available.</p>
        )}
      </div>
    </div>
  );
};

export default Output;
