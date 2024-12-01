import React from "react";

function Blog() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Blog
      </h1>
      <p className="text-lg text-gray-700 mb-4 text-center">
        Dive into our blog for tips, resources, and success stories that will
        inspire your academic journey.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">
            Maximizing Your Study Efficiency
          </h2>
          <p className="text-gray-700">
            Discover strategies that can help you study smarter, not harder, and
            improve retention and performance on exams.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">
            Achieving Success in Every Test
          </h2>
          <p className="text-gray-700">
            Learn how to stay calm, manage test anxiety, and make the most of
            every assessment to achieve your highest scores.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">
            Building a Personalized Study Plan
          </h2>
          <p className="text-gray-700">
            A customized study plan is key to success. Learn how to design one
            that fits your goals, schedule, and study habits.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">
            Top 10 Resources for Academic Success
          </h2>
          <p className="text-gray-700">
            We’ve curated the best online resources to help you improve your
            knowledge, skills, and test-taking abilities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blog;
