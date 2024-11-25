import React, { useState } from 'react';
import { Users, GraduationCap, Briefcase, Building } from 'lucide-react';
import { ROLES } from '../types';

export default function UserList({ users, organizations, onDelete }) {
  const [selectedOrg, setSelectedOrg] = useState('');

  const staffUsers = users.filter(user => user.role === ROLES.STAFF);
  const studentUsers = users.filter(user => {
    if (user.role !== ROLES.STUDENT) return false;
    if (!selectedOrg) return true;
    return user.organizationId === selectedOrg;
  });

  const UserCard = ({ user }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          <div className="flex items-center gap-1 mt-2">
            {user.role === ROLES.STAFF ? (
              <Briefcase className="h-4 w-4 text-blue-600" />
            ) : (
              <>
                <GraduationCap className="h-4 w-4 text-green-600" />
                {user.organizationId && (
                  <span className="text-sm text-gray-500">
                    ({organizations.find(org => org.id === user.organizationId)?.name})
                  </span>
                )}
              </>
            )}
            <span className="text-sm capitalize text-gray-600">{user.role}</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(user.id)}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">User List</h2>
        </div>
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-gray-500" />
          <select
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Organizations</option>
            {organizations.map(org => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-700">Staff ({staffUsers.length})</h3>
          </div>
          <div className="space-y-3">
            {staffUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
            {staffUsers.length === 0 && (
              <p className="text-sm text-gray-500">No staff members yet</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-green-600" />
            <h3 className="font-medium text-gray-700">Students ({studentUsers.length})</h3>
          </div>
          <div className="space-y-3">
            {studentUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
            {studentUsers.length === 0 && (
              <p className="text-sm text-gray-500">No students yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}