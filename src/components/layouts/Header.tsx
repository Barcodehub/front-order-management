import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Order Management
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/products" className="text-gray-700 hover:text-indigo-600">
            Products
          </Link>
          
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-gray-700 hover:text-indigo-600">
                  Admin
                </Link>
              )}
              <Link to="/orders" className="text-gray-700 hover:text-indigo-600">
                My Orders
              </Link>
              <button 
                onClick={logout}
                className="text-gray-700 hover:text-indigo-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-indigo-600">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}