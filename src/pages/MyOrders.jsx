import { useState, useEffect } from "react";
import { getUserOrders } from "../back/order";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        const res = await getUserOrders();
        // Handle different response structures
        const orders = res?.data || res || [];
        setMyOrders(orders);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        setMyOrders([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
      case "DELIVERED":
      case "DONE":
        return "bg-green-100 text-green-800 border-green-300";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-300";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    // Handle different timestamp formats
    let date;
    if (typeof timestamp === "object" && timestamp.seconds) {
      // Firebase timestamp format
      date = new Date(parseInt(timestamp.seconds) * 1000);
    } else if (typeof timestamp === "string" || typeof timestamp === "number") {
      // Unix timestamp or ISO string
      date = new Date(timestamp);
    } else {
      return "N/A";
    }

    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getTotalItems = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const getUniqueProducts = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-xl text-gray-600">Loading orders...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-600 mt-1">
            Here you can find the history of all your orders.
          </p>
        </div>

        {myOrders && myOrders.length > 0 ? (
          <div className="space-y-6">
            {myOrders.map((order) => (
              <div
                key={order.order_id || order.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <div
                  className={`p-4 border-b-2 flex justify-between items-center ${getStatusStyle(
                    order.status
                  )}`}
                >
                  <div>
                    <h2 className="text-xl font-bold">
                      Order #{order.order_id || order.id || "N/A"}
                    </h2>
                    <p className="text-sm font-medium">
                      Date: {formatDate(order.createdAt || order.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold uppercase">Status</p>
                    <p className="text-lg font-bold">
                      {order.status || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700">
              No Orders Found
            </h2>
            <p className="mt-2 text-gray-500">
              You haven't placed any orders yet. Start shopping to see your
              orders here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
