import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../api/productsApi';
import { Order } from '../types';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function OrderDetailView() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!id || !user) return;
        const token = localStorage.getItem('token');
        if (!token) return;

        const data = await getOrderById(id, token);
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch order');
        navigate('/orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user, navigate]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!order) return <div className="p-4 text-red-500">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Order #{order._id.slice(0, 8).toUpperCase()}
            </h1>
            <span className={`px-3 py-1 text-sm rounded-full ${
              order.status === 'completed' ? 'bg-green-100 text-green-800' :
              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Order Details</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
                <p><span className="font-medium">Total:</span> ${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Customer</h2>
              <div className="space-y-2">
                <p>{order.user.name}</p>
                <p>{order.user.email}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Items</h2>
            <div className="border rounded-md divide-y">
              {order.items.map((item, index) => (
                <div key={index} className="p-4 flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">{item.product.description}</p>
                  </div>
                  <div className="text-right">
                    <p>${item.price.toFixed(2)} × {item.quantity}</p>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <Link
              to="/orders"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back to Orders
            </Link>
            
            {user?.role === 'admin' && (
              <div className="space-x-2">
                {order.status === 'pending' && (
                  <>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Mark as Completed
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                      Cancel Order
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}