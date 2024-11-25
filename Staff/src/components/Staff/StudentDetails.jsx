import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StudentDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com',
      password: 'password123',
      monthlyData: [
        { month: 'Jan', avgScore: 85, participation: 100 },
        { month: 'Feb', avgScore: 88, participation: 95 },
        { month: 'Mar', avgScore: 82, participation: 90 },
        { month: 'Apr', avgScore: 90, participation: 92 },
        { month: 'May', avgScore: 92, participation: 94 },
        { month: 'Jun', avgScore: 86, participation: 96 }
      ],
      tests: [
        { name: 'Mathematics', score: 95, date: '2024-03-01', duration: '2 hours' },
        { name: 'Physics', score: 88, date: '2024-03-05', duration: '1.5 hours' },
        { name: 'Chemistry', score: 92, date: '2024-03-10', duration: '2 hours' },
        { name: 'Biology', score: 94, date: '2024-03-15', duration: '1.5 hours' }
      ]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    password: '',
    monthlyData: [],
    tests: []
  });

  const calculateAverageScore = (tests) => {
    if (!tests.length) return 0;
    return (tests.reduce((sum, test) => sum + test.score, 0) / tests.length).toFixed(1);
  };

  const calculateImprovement = (monthlyData) => {
    if (monthlyData.length < 2) return 0;
    const firstScore = monthlyData[0].avgScore;
    const lastScore = monthlyData[monthlyData.length - 1].avgScore;
    return ((lastScore - firstScore) / firstScore * 100).toFixed(1);
  };

  const calculateParticipationRate = (monthlyData) => {
    if (!monthlyData.length) return 0;
    return (monthlyData.reduce((sum, month) => sum + month.participation, 0) / monthlyData.length).toFixed(1);
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.password) {
      const studentData = {
        id: students.length + 1,
        ...newStudent,
        monthlyData: [],
        tests: []
      };
      setStudents([...students, studentData]);
      setNewStudent({
        name: '',
        email: '',
        password: '',
        monthlyData: [],
        tests: []
      });
      setShowAddForm(false);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Student Details</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add Student</span>
          </button>
        </div>
      </header>

      {showAddForm && (
        <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Student</h2>
            <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={newStudent.password}
              onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
            />
          </div>
          <button
            onClick={handleAddStudent}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Student
          </button>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tests Taken</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.tests.length}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{calculateAverageScore(student.tests)}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewDetails(student)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-8">Track student performance and participation trends</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Average Test Scores</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedStudent.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis domain={[0, 100]} stroke="#666" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="avgScore" 
                        stroke="#4F46E5" 
                        strokeWidth={2}
                        dot={{ fill: '#4F46E5' }}
                        name="Average Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Student Participation</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedStudent.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis domain={[0, 100]} stroke="#666" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="participation" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        dot={{ fill: '#10B981' }}
                        name="Participation"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <p className="text-sm text-indigo-600 mb-1">Average Score</p>
                  <p className="text-3xl font-bold text-indigo-700">
                    {calculateAverageScore(selectedStudent.tests)}%
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-sm text-green-600 mb-1">Participation Rate</p>
                  <p className="text-3xl font-bold text-green-700">
                    {calculateParticipationRate(selectedStudent.monthlyData)}%
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-sm text-purple-600 mb-1">Improvement</p>
                  <p className="text-3xl font-bold text-purple-700">
                    +{calculateImprovement(selectedStudent.monthlyData)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Test History</h3>
              <div className="grid gap-4">
                {selectedStudent.tests.map((test, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-indigo-600">{test.name}</h4>
                      <span className="text-sm text-gray-500">{test.date}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Score:</span>
                        <span className="ml-2 font-medium">{test.score}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <span className="ml-2 font-medium">{test.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;