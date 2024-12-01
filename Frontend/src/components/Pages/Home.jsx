import React from "react";

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Welcome to Our Test Portal
      </h1>
      <p className="text-lg text-gray-700 mb-4 text-center">
        A platform designed to help you achieve your academic goals through
        innovative assessments and personalized feedback.
      </p>
      <div className="text-center">
        <p className="mb-4">
          At our Test Portal, we focus on providing:
          <ul className="list-disc list-inside text-left mx-auto mt-2">
            <li>Real-time performance tracking for every test</li>
            <li>Personalized study plans tailored to your learning pace</li>
            <li>Comprehensive assessments that cover a wide range of topics</li>
          </ul>
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Start Now
        </button>
      </div>
    </div>
  );
}

export default Home;
