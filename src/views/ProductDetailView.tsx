import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, createOrder } from '../api/productsApi';
import { Product } from '../types';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function ProductDetailView() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleOrder = async () => {
    if (!product || !user) return;
    
    try {
      setIsOrdering(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      const orderData = {
        items: [{
          productId: product._id,
          quantity: quantity
        }]
      };

      await createOrder(orderData, token);
      setOrderSuccess(true);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
    } finally {
      setIsOrdering(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <div className="p-4 text-red-500">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {orderSuccess && (
        <div className="mb-4 bg-green-100 border-l-4 border-green-500 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">Order placed successfully! Redirecting to your orders...</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/3 bg-gray-200 flex items-center justify-center p-8">
            <span className="text-gray-500 text-lg">Product Image</span>
          </div>
          <div className="p-8 md:w-2/3">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <span className={`px-3 py-1 text-sm rounded-full ${
                product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <p className="mt-2 text-gray-600">{product.description}</p>
            
            <div className="mt-6">
              <span className="text-3xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </span>
              {product.stock > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  {product.stock} available
                </span>
              )}
            </div>
            
            <div className="mt-8 flex flex-col space-y-4">
              {user?.role === 'client' && product.stock > 0 && (
                <>
                  <div className="flex items-center">
                    <label htmlFor="quantity" className="mr-2 font-medium">Quantity:</label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value >= 1 && value <= product.stock) {
                          setQuantity(value);
                        }
                      }}
                      className="w-20 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      Max: {product.stock}
                    </span>
                  </div>
                  <button
                    onClick={handleOrder}
                    disabled={isOrdering}
                    className={`px-4 py-2 rounded-md text-white font-medium ${
                      isOrdering 
                        ? 'bg-indigo-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } transition-colors`}
                  >
                    {isOrdering ? 'Processing...' : 'Order Now'}
                  </button>
                </>
              )}
              
              {user?.role === 'admin' && (
                <div className="flex space-x-2">
                  <Link
                    to={`/products/edit/${product._id}`}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Edit Product
                  </Link>
                </div>
              )}
              
              <Link
                to="/products"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-center"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}