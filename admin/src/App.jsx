import React, { useState } from 'react';
import { Layout } from 'lucide-react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import OrganizationForm from './components/OrganizationForm';

function App() {
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const handleAddOrganization = (data) => {
    const newOrg = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    setOrganizations([...organizations, newOrg]);
  };

  const handleAddUser = (data) => {
    const newUser = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <OrganizationForm onSubmit={handleAddOrganization} />
            <UserForm onSubmit={handleAddUser} organizations={organizations} />
          </div>
          <div className="lg:col-span-2">
            <UserList 
              users={users} 
              organizations={organizations}
              onDelete={handleDeleteUser} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;