import { useState } from 'react';
import ProductDashboard from './ProductDashboard';
import OrderAdmin from './OrderAdmin';
import UsersDashboard from './UsersDashboard';
const ProductsPage = () => (
  <div className="p-6">
				<ProductDashboard />
  </div>
);

const OrdersPage = () => (
  <div className="p-6">
				<OrderAdmin />
  </div>
);

const UsersPage = () => (
  <div className="p-6">
				<UsersDashboard />
  </div>
);

const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState('products');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '📋' },
    { id: 'users', label: 'Users', icon: '👥' }
  ];

  const renderContent = () => {
    switch(activeItem) {
      case 'products':
        return <ProductsPage />;
      case 'orders':
        return <OrdersPage />;
      case 'users':
        return <UsersPage />;
      default:
        return <ProductsPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <div className={`bg-gray-900 text-white p-4 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>4MAX</h1>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>


        <nav className="flex-1">
          <h2 className={`text-gray-400 text-xs uppercase mb-2 ${isCollapsed ? 'hidden' : 'block'}`}>Dashboard</h2>
          <ul className="space-y-1">
            {menuItems.map(item => (
              <li key={item.id}>
                <button 
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeItem === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  <span className={isCollapsed ? 'hidden' : 'block'}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`pt-4 border-t border-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">AD</span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;