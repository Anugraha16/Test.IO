import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Performance = () => {
  const performanceData = [
    { month: 'Jan', avgScore: 85, participation: 95 },
    { month: 'Feb', avgScore: 88, participation: 92 },
    { month: 'Mar', avgScore: 82, participation: 88 },
    { month: 'Apr', avgScore: 89, participation: 90 },
    { month: 'May', avgScore: 90, participation: 94 },
    { month: 'Jun', avgScore: 85, participation: 91 },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Analytics</h1>
        <p className="text-gray-600">Track student performance and participation trends</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Average Test Scores</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgScore" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Participation</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="participation" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-indigo-600 font-semibold">Average Score</p>
            <p className="text-3xl font-bold text-indigo-900">86.5%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-600 font-semibold">Participation Rate</p>
            <p className="text-3xl font-bold text-green-900">91.6%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-purple-600 font-semibold">Improvement</p>
            <p className="text-3xl font-bold text-purple-900">+5.8%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
