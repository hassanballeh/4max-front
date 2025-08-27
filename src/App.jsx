import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import ConfirmationCode from "./pages/Auth/ConfirmationCode/ConfirmationCode";
import AdminLogin from "./pages/Auth/Admin/AdminLogin";
import Products from "./Components/Products/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import FavouriteList from "./pages/FavouriteList";
import Checkout from "./pages/Checkout";
import AdminPage from "./pages/Auth/Admin/AdminPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminProductsPage from "./pages/Auth/Admin/products/AdminProductsPage";
import ProductViewPage from "./pages/Auth/Admin/products/ProductViewPage";
import ProductEditPage from "./pages/Auth/Admin/products/ProductEditPage";
import AdminDashboard from "./pages/Auth/Admin/AdminDashboard";
import OrderAdmin from "./pages/Auth/Admin/OrderAdmin";
import UsersDashboard from "./pages/Auth/Admin/UsersDashboard";

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const AdminLayout = ({ children }) => <>{children}</>;

// Route Guard for authenticated users (redirect to home if has token)
const AuthGuard = ({ children }) => {
  const { token } = useAuth();
  return token ? <Navigate to="/" replace /> : children;
};

// Route Guard for protected routes (redirect to login if no token)
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

// Route Guard for admin authentication (redirect to admin page if has admin token)
const AdminAuthGuard = ({ children }) => {
  const { adminToken } = useAuth();
  return adminToken ? <Navigate to="/admin" replace /> : children;
};

// Route Guard for admin protected routes (redirect to home if no admin token)
const AdminProtectedRoute = ({ children }) => {
  const { adminToken } = useAuth();
  return adminToken ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/products"
            element={
              <MainLayout>
                <Products />
              </MainLayout>
            }
          />
          <Route
            path="/product-details/:id"
            element={
              <MainLayout>
                <ProductDetails />
              </MainLayout>
            }
          />

          <Route
            path="/cart"
            element={
              <MainLayout>
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              </MainLayout>
            }
          />
          <Route
            path="/checkout"
            element={
              <MainLayout>
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              </MainLayout>
            }
          />
          <Route
            path="/favouriteList"
            element={
              <MainLayout>
                <ProtectedRoute>
                  <FavouriteList />
                </ProtectedRoute>
              </MainLayout>
            }
          />

          <Route
            path="/login"
            element={
              <MainLayout>
                <AuthGuard>
                  <Login />
                </AuthGuard>
              </MainLayout>
            }
          />
          <Route
            path="/register"
            element={
              <MainLayout>
                <AuthGuard>
                  <Register />
                </AuthGuard>
              </MainLayout>
            }
          />
          <Route
            path="/confirmationCode"
            element={
              <MainLayout>
                <AuthGuard>
                  <ConfirmationCode />
                </AuthGuard>
              </MainLayout>
            }
          />

          {/* Admin routes */}
          <Route
            path="/adminLogin"
            element={
              <AdminLayout>
                <AdminAuthGuard>
                  <AdminLogin />
                </AdminAuthGuard>
              </AdminLayout>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              </AdminLayout>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminProtectedRoute>
                <OrderAdmin />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute>
                <UsersDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminProtectedRoute>
                <AdminProductsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/products/:id"
            element={
              <AdminProtectedRoute>
                <ProductViewPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <AdminProtectedRoute>
                <ProductEditPage />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
