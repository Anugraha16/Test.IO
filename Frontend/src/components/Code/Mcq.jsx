import React, { useState, useEffect } from "react";

const Mcq = () => {
  const [selectedOption, setSelectedOption] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

  const MCQQuestions = [
    {
      id: 1,
      question: "What is the output of the following code?",
      code: "console.log(2 + 3);",
      options: ["2", "3", "5", "7"],
      correctAnswer: "5",
    },
    {
      id: 2,
      question: "Which of the following is a falsy value in JavaScript?",
      options: ["0", "''", "false", "All of the above"],
      correctAnswer: "All of the above",
    },
  ];

  // Timer functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const handleMCQOptionChange = (questionId, option) => {
    setSelectedOption((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNavigation = (direction) => {
    if (
      direction === "next" &&
      currentQuestionIndex < MCQQuestions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === "prev" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Assessment Portal</h1>
        <div className="text-lg font-medium">
          Time Remaining: {formatTime(timeRemaining)}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Questions</h2>
          <div className="grid grid-cols-4 gap-1">
            {MCQQuestions.map((_, index) => (
              <button
                key={index}
                className={`h-8 w-8 rounded-full border ${
                  currentQuestionIndex === index
                    ? "bg-blue-600 text-white"
                    : selectedOption[MCQQuestions[index].id]
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </aside>

        {/* Question Panel */}
        <main className="flex-grow p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              {currentQuestionIndex + 1}.{" "}
              {MCQQuestions[currentQuestionIndex].question}
            </h2>
            {MCQQuestions[currentQuestionIndex].code && (
              <div className="bg-gray-100 p-4 rounded mb-4">
                <pre className="font-mono text-sm">
                  {MCQQuestions[currentQuestionIndex].code}
                </pre>
              </div>
            )}
          </div>

          {/* Options Section */}
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            <h3 className="text-lg font-semibold mb-4">Select an Answer:</h3>
            <div className="space-y-4">
              {MCQQuestions[currentQuestionIndex].options.map(
                (option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${MCQQuestions[currentQuestionIndex].id}`}
                      value={option}
                      checked={
                        selectedOption[
                          MCQQuestions[currentQuestionIndex].id
                        ] === option
                      }
                      onChange={() =>
                        handleMCQOptionChange(
                          MCQQuestions[currentQuestionIndex].id,
                          option
                        )
                      }
                      className="mr-2"
                    />
                    <label className="text-gray-700">{option}</label>
                  </div>
                )
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Footer Navigation */}
      <footer className="bg-white py-4 px-6 flex justify-between items-center shadow">
        <button
          onClick={() => handleNavigation("prev")}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded bg-gray-300 ${
            currentQuestionIndex !== 0
              ? "hover:bg-blue-500 hover:text-white"
              : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => handleNavigation("next")}
          disabled={currentQuestionIndex === MCQQuestions.length - 1}
          className={`px-4 py-2 rounded bg-gray-300 ${
            currentQuestionIndex !== MCQQuestions.length - 1
              ? "hover:bg-blue-500 hover:text-white"
              : ""
          }`}
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default Mcq;
