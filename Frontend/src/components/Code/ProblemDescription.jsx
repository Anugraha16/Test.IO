import React, { useState, useEffect } from 'react';

const ProblemDescription = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the data from the API
    fetch('http://localhost:5000/assesments/6749c73c11ba5a506329d650')
      .then(response => response.json())
      .then(fetchedData => {
        console.log(fetchedData);  // Log the entire fetched data
        setData(fetchedData);      // Store the data in state
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Check if data is loaded before rendering
  if (!data) {
    return <div>Loading...</div>;
  }

  // Access individual fields in the JSON data
  const {
    testId, questions
  } = data;

  const programmingDetails = questions && questions[0] ? questions[0].programmingDetails : {};
  const {
    title, description, constraints, example, expectedOutput, publicTestCases
  } = programmingDetails;

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">{title}</h2>

        <div className="space-y-6">
          {/* Problem Information */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600">
              <h3 className="font-semibold text-lg">Problem Information</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Test ID:</span> {testId}
            </p>
          </section>

          {/* Description */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600">
              <h3 className="font-semibold text-lg">Description</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </section>

          {/* Constraints */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-amber-600">
              <h3 className="font-semibold text-lg">Constraints</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{constraints}</p>
          </section>

          {/* Example */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <h3 className="font-semibold text-lg">Example</h3>
            </div>
            <div className="space-y-2 font-mono text-sm">
              <p><span className="text-purple-600 font-semibold"></span> {example}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;