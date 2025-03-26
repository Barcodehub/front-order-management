import { Product, ProductFormData, Order, CreateOrderData, RegisterFormData, AuthResponse, User } from '../types';
import api from './axios-config';
import { isAxiosError } from './axios-config';

// Auth functions
export async function loginUser(credentials: { email: string; password: string }): Promise<{ token: string; user: User }> {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
    throw new Error('Login failed');
  }
}

export async function registerUser(userData: RegisterFormData): Promise<AuthResponse> {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
    throw new Error('Registration failed');
  }
}

// Product functions
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to fetch products');
    }
    throw new Error('Failed to fetch products');
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await api.get(`/products/${id}`);
    if (!response.data) {
      throw new Error('Product not found');
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Product not found');
    }
    throw new Error('Failed to fetch product');
  }
}

export async function createProduct(productData: ProductFormData, token: string): Promise<Product> {
  try {
    const response = await api.post('/products', productData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to create product');
    }
    throw new Error('Failed to create product');
  }
}

export async function updateProduct(id: string, productData: Partial<ProductFormData>, token: string): Promise<Product> {
  try {
    const response = await api.put(`/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to update product');
    }
    throw new Error('Failed to update product');
  }
}

export async function deleteProduct(id: string, token: string): Promise<void> {
  try {
    await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to delete product');
    }
    throw new Error('Failed to delete product');
  }
}

// Order functions
export async function createOrder(orderData: CreateOrderData, token: string): Promise<Order> {
  try {
    const response = await api.post('/orders', orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to create order');
    }
    throw new Error('Failed to create order');
  }
}

export async function getOrders(token: string): Promise<Order[]> {
  try {
    const response = await api.get('/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to fetch orders');
    }
    throw new Error('Failed to fetch orders');
  }
}

export async function getOrderById(id: string, token: string): Promise<Order> {
  try {
    const response = await api.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to fetch order');
    }
    throw new Error('Failed to fetch order');
  }
}