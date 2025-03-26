import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminView() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Access Denied</h2>
        <p className="text-gray-600 mb-6">You don't have administrator privileges to access this page.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your store's products, orders, and users</p>
      </div>
      
      <div className="flex space-x-1 border-b border-gray-200 mb-8">
        <button
          className={`py-3 px-6 font-medium text-sm rounded-t-lg transition-colors duration-200 ${activeTab === 'products' 
            ? 'bg-white text-indigo-600 border-t border-l border-r border-gray-200' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm rounded-t-lg transition-colors duration-200 ${activeTab === 'orders' 
            ? 'bg-white text-indigo-600 border-t border-l border-r border-gray-200' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm rounded-t-lg transition-colors duration-200 ${activeTab === 'users' 
            ? 'bg-white text-indigo-600 border-t border-l border-r border-gray-200' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {activeTab === 'products' && (
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
              </div>
              <Link
                to="/products/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 sm:mt-0"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Product
              </Link>
            </div>
            {/* Product list would go here */}
            <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-500">Product management table will be displayed here</p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
              <p className="text-sm text-gray-500 mt-1">View and process customer orders</p>
            </div>
            {/* Order list would go here */}
            <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-500">Order management table will be displayed here</p>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
              <p className="text-sm text-gray-500 mt-1">Manage system users and permissions</p>
            </div>
            {/* User list would go here */}
            <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-500">User management table will be displayed here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}