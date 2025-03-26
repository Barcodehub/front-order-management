import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ErrorMessage from '../components/common/ErrorMessage';

export default function ProfileView() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return <ErrorMessage message="User not authenticated" />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
      {error && <ErrorMessage message={error} />}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1 p-2 bg-gray-50 rounded-md">{user.name}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 p-2 bg-gray-50 rounded-md">{user.email}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <div className="mt-1 p-2 bg-gray-50 rounded-md capitalize">{user.role}</div>
        </div>
        
        <div className="pt-4">
          <button
            onClick={logout}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}