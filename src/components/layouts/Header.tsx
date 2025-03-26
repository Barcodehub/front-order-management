import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              Order<span className="text-indigo-600">Pro</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products" 
              className="text-gray-500 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Products
            </Link>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="text-gray-500 hover:text-gray-900 transition-colors duration-200 font-medium"
                  >
                    Admin
                  </Link>
                )}
                <Link 
                  to="/orders" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200 font-medium"
                >
                  My Orders
                </Link>
                <button 
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}