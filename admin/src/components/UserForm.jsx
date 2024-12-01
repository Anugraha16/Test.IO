import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus } from 'lucide-react';
import { ROLES } from '../types';

export default function UserForm() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ROLES.STUDENT,
    collegeName: ''
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [colleges, setColleges] = useState([]); // State to store colleges

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/adminAccess/get-org'); // Corrected the URL
        setColleges(response.data); // Set colleges list from the API
      } catch (error) {
        console.error('Error fetching colleges:', error);
        alert('Error fetching colleges');
      }
    };
  
    fetchColleges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/auth/signup', formData);
      alert('User added successfully');
      // Reset form data
      setFormData({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ROLES.STUDENT,
        collegeName: ''
      });
      setPasswordMatch(true);
    } catch (error) {
      console.error(error);
      alert('Error adding user');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setPasswordMatch(newPassword === formData.confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setFormData({ ...formData, confirmPassword: newConfirmPassword });
    setPasswordMatch(newConfirmPassword === formData.password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
      </div>

      <div className="space-y-4">
        {/* User Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User Name
          </label>
          <input
            type="text"
            required
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="JohnDoe123"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="john@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={formData.password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
          {formData.confirmPassword && (
            <p
              className={`mt-1 text-sm font-medium ${
                passwordMatch ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {passwordMatch ? 'Passwords match' : 'Passwords do not match'}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={ROLES.STUDENT}>Student</option>
            <option value={ROLES.STAFF}>Staff</option>
          </select>
        </div>

        {/* College Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            College
          </label>
          <select
            value={formData.collegeName}
            onChange={(e) =>
              setFormData({ ...formData, collegeName: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select College</option>
            {Array.isArray(colleges) && colleges.length > 0 ? (
              colleges.map((college) => (
                <option key={college.id} value={college.name}>
                  {college.name}
                </option>
              ))
            ) : (
              <option disabled>No colleges available</option>
            )}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Add User
        </button>
      </div>
    </form>
  );
}
