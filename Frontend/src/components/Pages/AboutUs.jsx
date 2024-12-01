import React from "react";

function AboutUs() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        About Us
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        We are dedicated to empowering learners with the tools they need to
        excel academically and professionally.
      </p>
      <div className="text-center">
        <p className="mb-4">
          Our mission is simple: To create an environment where learning is
          enjoyable and success is within your reach.
        </p>
        <p className="mb-4">
          We believe in:
          <ul className="list-disc list-inside text-left mx-auto mt-2">
            <li>Making learning accessible for everyone</li>
            <li>Supporting students at every step of their journey</li>
            <li>Promoting long-term academic success through our tools and resources</li>
          </ul>
        </p>
        <p className="mb-6">
          Whether you're preparing for a major exam or looking to improve your
          skills, we are here to guide you to success!
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
