import React from 'react';
import { Users, BarChart2, FileQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';

const StaffHome = () => {
  const cards = [
    {
      title: 'Student Details',
      description: 'View and manage student information',
      icon: Users,
      path: "/StudentDetails",
      color: 'bg-blue-500'
    },
    {
      title: 'Performance Analytics',
      description: 'Track student test performance',
      icon: BarChart2,
      path: "/Performance",
      color: 'bg-green-500'
    },
    {
      title: 'Questions Management',
      description: 'Create and manage test questions',
      icon: FileQuestion,
      path: '/Questions',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Staff Portal</h1>
        <p className="text-lg text-gray-600">Manage students, track performance, and create assessments</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map(({ title, description, icon: Icon, path, color }) => (
          <Link
            key={path}
            to={path}
            className="transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`${color} p-6`}>
                <Icon className="w-12 h-12 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600 mb-2">Total Students</p>
            <p className="text-3xl font-bold text-gray-900">156</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600 mb-2">Average Score</p>
            <p className="text-3xl font-bold text-gray-900">85%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600 mb-2">Active Tests</p>
            <p className="text-3xl font-bold text-gray-900">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffHome;
