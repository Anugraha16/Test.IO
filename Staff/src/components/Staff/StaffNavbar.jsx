import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, BarChart2, FileQuestion } from 'lucide-react';

const StaffNavbar = () => {
  const navItems = [
    { path: '/Home', icon: Home, label: 'Home' },
    { path: '/StudentDetails', icon: Users, label: 'Student Details' },
    { path: '/performance', icon: BarChart2, label: 'Performance' },
    { path: '/questions', icon: FileQuestion, label: 'Questions' }
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-indigo-600">Staff Portal</h1>
            <div className="hidden md:flex space-x-4">
              {navItems.map(({ path, icon: Icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default StaffNavbar;
