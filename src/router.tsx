import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layouts/AppLayout';
import ProductView from './views/ProductView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import OrderView from './views/OrderView';
import ProfileView from './views/ProfileView';
import AdminView from './views/AdminView.tsx';
import ProductDetailView from './views/ProductDetailView';
import CreateProductView from './views/CreateProductView';
import ProtectedRoute from './components/common/ProtectedRoute';
import OrderDetailView from './views/OrderDetailView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<ProductView />} />
          <Route path="/products" element={<ProductView />} />
          <Route path="/products/:id" element={<ProductDetailView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/orders" element={<OrderView />} />
            <Route path="/orders/:id" element={<OrderDetailView />} />
            <Route path="/profile" element={<ProfileView />} />
            
            {/* Admin only routes */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminView />} />
              <Route path="/products/create" element={<CreateProductView />} />
              <Route path="/products/edit/:id" element={<CreateProductView />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}