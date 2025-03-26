import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminView() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="mb-4">You don't have permission to access this page.</p>
        <Link 
          to="/" 
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'products' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'orders' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'users' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Product Management</h2>
              <Link
                to="/products/create"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Create New Product
              </Link>
            </div>
            {/* Aquí iría el listado de productos con opciones de edición/eliminación */}
            <p className="text-gray-500">Product list will be displayed here</p>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">All Orders</h2>
            {/* Aquí iría el listado completo de órdenes */}
            <p className="text-gray-500">Order list will be displayed here</p>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            {/* Aquí iría el listado de usuarios */}
            <p className="text-gray-500">User list will be displayed here</p>
          </div>
        )}
      </div>
    </div>
  );
}