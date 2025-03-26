// User types
export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'client';
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface LoginFormData {
    email: string;
    password: string;
  }
  
  export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'client';
  }
  
  // Product types
  export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    stock: number;
  }
  
  // Order types
  export interface OrderItem {
    product: Product;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    _id: string;
    user: User;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateOrderData {
    items: {
      productId: string;
      quantity: number;
    }[];
  }