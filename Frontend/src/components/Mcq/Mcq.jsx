import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Trophy } from 'lucide-react';

const Mcq = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch('http://localhost:5000/assesments/674a9c9ae1f44ae8c98d4c42');
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        setQuizData(data);
        setTimeRemaining(data.duration * 60);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  useEffect(() => {
    if (!timeRemaining || isSubmitted || !quizData) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsSubmitted(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isSubmitted, quizData]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionId
    }));
  };

  const calculateScore = () => {
    if (!quizData) return 0;
    let totalScore = 0;
    quizData.questions.forEach((question, index) => {
      const selectedOption = question.options.find(opt => opt.id === selectedAnswers[index]);
      if (selectedOption?.isCorrect) {
        totalScore += question.marks;
      }
    });
    return totalScore;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">No quiz data available</div>
      </div>
    );
  }

  if (isSubmitted) {
    const maxScore = quizData.questions.reduce((acc, q) => acc + q.marks, 0);
    const percentage = (score / maxScore) * 100;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {score} / {maxScore}
          </div>
          <p className="text-gray-600">You scored {percentage.toFixed(1)}%</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Python Quiz</h1>
        <div className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded-full">
          <Clock className="w-5 h-5" />
          <span className="font-medium">{formatTime(timeRemaining)}</span>
        </div>
      </header>

      <div className="flex flex-1 p-6 gap-6">
        <aside className="w-64 bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Questions</h2>
          <div className="grid grid-cols-4 gap-2">
            {quizData.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                  ${currentQuestionIndex === index ? 'bg-blue-600 text-white' : selectedAnswers[index] ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Question {currentQuestionIndex + 1}</h2>
            <p className="whitespace-pre-wrap">{currentQuestion.questionText}</p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <label
                key={option.id}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors
                  ${selectedAnswers[currentQuestionIndex] === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option.id}
                    checked={selectedAnswers[currentQuestionIndex] === option.id}
                    onChange={() => handleAnswerSelect(currentQuestionIndex, option.id)}
                    className="mr-3"
                  />
                  <span>{option.optionText}</span>
                </div>
              </label>
            ))}
          </div>
        </main>
      </div>

      <footer className="bg-white py-4 px-6 flex justify-between items-center border-t">
        <button
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Quiz
        </button>

        <button
          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
          disabled={currentQuestionIndex === quizData.questions.length - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Next <ChevronRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
};

export default Mcq;
