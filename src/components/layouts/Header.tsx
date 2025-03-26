import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Íconos para el menú

export default function Header() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar menú

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              Order<span className="text-indigo-600">Pro</span>
            </span>
          </Link>

          {/* Botón Hamburguesa */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Menú de escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks user={user} logout={logout} />
          </nav>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-2">
            <NavLinks user={user} logout={logout} />
          </div>
        )}
      </div>
    </header>
  );
}

function NavLinks({ user, logout }) {
  return (
    <>
      <Link to="/products" className="text-gray-500 hover:text-gray-900 font-medium">
        Products
      </Link>

      {user ? (
        <>
          {user.role === 'admin' && (
            <Link to="/admin" className="text-gray-500 hover:text-gray-900 font-medium">
              Admin
            </Link>
          )}
          <Link to="/orders" className="text-gray-500 hover:text-gray-900 font-medium">
            My Orders
          </Link>
          <button onClick={logout} className="text-gray-500 hover:text-gray-900 font-medium">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-gray-500 hover:text-gray-900 font-medium">
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
    </>
  );
}
