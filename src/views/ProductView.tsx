import { useEffect, useState } from 'react';
import { getProducts } from '../api/productsApi';
import { Product } from '../types';
import ProductList from '../components/Product/ProductList';

export default function ProductView() {
  const [products, setProducts] = useState<Product[]>([]);

  const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

useEffect(() => {
  let mounted = true;
  
  const fetchProducts = async () => {
    if (mounted) setLoading(true);
    
    try {
      const data = await getProducts();
      if (mounted) setProducts(data);
    } catch (err) {
      if (mounted) setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      if (mounted) setLoading(false);
    }
  };

  fetchProducts();
  
  return () => {
    mounted = false;
  };
}, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mt-2"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Product Catalog</h1>
        <p className="mt-2 text-lg text-gray-600">Browse our complete product selection</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Available Products</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {products.length} items
            </span>
          </div>
        </div>
        
        <ProductList products={products} />
      </div>
    </div>
  );
}