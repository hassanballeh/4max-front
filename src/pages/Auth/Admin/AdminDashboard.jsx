import { useNavigate } from "react-router-dom";
import { Package, ShoppingCart, Users, LogOut } from "lucide-react";
import { logout } from "../../../back/auth";
import { useAuth } from "../../../context/AuthContext";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout: logoutAdmin } = useAuth();
  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
      navigate("/adminLogin");
      logoutAdmin();
      console.log("Logging out...");
      // For example: localStorage.removeItem('authToken');
      // navigate('/login');
    }
  };

  const menuItems = [
    {
      title: "Products",
      description: "Manage your product catalog",
      icon: Package,
      route: "/admin/products",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Orders",
      description: "View and manage orders",
      icon: ShoppingCart,
      route: "/admin/orders",
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Admin Panel
          </h2>
          <p className="text-gray-600">Choose a section to manage</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(item.route)}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-center">
                <div
                  className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors`}
                >
                  <item.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
