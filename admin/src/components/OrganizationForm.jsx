import React, { useState } from 'react';
import { Building } from 'lucide-react';
import axios from 'axios';

export default function OrganizationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // API request to add the organization
      const response = await axios.post('http://localhost:5000/adminAccess/create-org', formData);
      
      // Once the form is submitted, trigger any additional actions or callbacks (e.g., notifying the parent component)
      if (onSubmit) {
        onSubmit(response.data);  // Optionally, pass back the response to the parent component
      }
      
      // Reset form data after submission
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      // Handle error (you can show a message or log it for debugging)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Building className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Add Organization</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Acme Inc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Brief description of the organization"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Add Organization
        </button>
      </div>
    </form>
  );
}
