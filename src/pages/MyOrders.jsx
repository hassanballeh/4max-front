import { useState, useEffect } from "react";
import { getUserOrders } from "../back/order";
import { getVariantById } from "../back/products";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [variantDetails, setVariantDetails] = useState({});

  const colorOptions = [
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "Green", label: "Green" },
    { value: "Yellow", label: "Yellow" },
    { value: "Orange", label: "Orange" },
    { value: "Purple", label: "Purple" },
    { value: "Pink", label: "Pink" },
    { value: "Black", label: "Black" },
    { value: "White", label: "White" },
    { value: "Gray", label: "Gray" },
  ];

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        const res = await getUserOrders();
        const orders = res?.data || res || [];
        setMyOrders(orders);

        // Fetch variant details for all items in all orders
        const variantPromises = [];
        const variantIds = new Set();

        orders.forEach((order) => {
          if (order.items && Array.isArray(order.items)) {
            order.items.forEach((item) => {
              if (
                item.product_variant_id &&
                !variantIds.has(item.product_variant_id)
              ) {
                variantIds.add(item.product_variant_id);
                variantPromises.push(
                  getVariantById(item.product_variant_id)
                    .then((variant) => ({
                      id: item.product_variant_id,
                      data: variant,
                    }))
                    .catch((error) => {
                      console.error(
                        `Error fetching variant ${item.product_variant_id}:`,
                        error
                      );
                      return { id: item.product_variant_id, data: null };
                    })
                );
              }
            });
          }
        });
        if (variantPromises.length > 0) {
          const variantResults = await Promise.all(variantPromises);
          const variantMap = {};
          variantResults.forEach((result) => {
            variantMap[result.id] = result.data;
          });
          setVariantDetails(variantMap);
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
        setMyOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  const getColorStyle = (colorName) => {
    const colorMap = {
      Red: "#EF4444",
      Blue: "#3B82F6",
      Green: "#10B981",
      Yellow: "#F59E0B",
      Orange: "#F97316",
      Purple: "#8B5CF6",
      Pink: "#EC4899",
      Black: "#1F2937",
      White: "#F9FAFB",
      Gray: "#6B7280",
    };

    const color = colorMap[colorName] || "#6B7280";
    const borderColor = colorName === "White" ? "#D1D5DB" : color;

    return {
      backgroundColor: color,
      borderColor: borderColor,
    };
  };

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

    let date;
    if (typeof timestamp === "object" && timestamp.seconds) {
      date = new Date(parseInt(timestamp.seconds) * 1000);
    } else if (typeof timestamp === "string" || typeof timestamp === "number") {
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

  const getOrderTotal = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((total, item) => {
      const variant = variantDetails[item.variantId];
      const price = variant?.price || 0;
      const quantity = item.quantity || 0;
      return total + price * quantity;
    }, 0);
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
                {/* Order Header */}
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
                    <p className="text-sm font-medium">
                      Items: {getTotalItems(order.items)} | Total: $
                      {getOrderTotal(order.items).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold uppercase">Status</p>
                    <p className="text-lg font-bold">
                      {order.status || "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                {order.items && order.items.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                      Order Items
                    </h3>
                    <div className="space-y-4">
                      {order.items.map((item, index) => {
                        const variant = variantDetails[item.product_variant_id];
                        const firstImage = variant?.images?.[0];

                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                          >
                            {/* Product Image */}
                            <div className="flex-shrink-0">
                              {firstImage?.base64Data ? (
                                <img
                                  src={`${firstImage.base64Data}`}
                                  alt="Product"
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                              ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                  <svg
                                    className="w-8 h-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>

                            {/* Product Details */}
                            <div className="flex-grow">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-800">
                                    Variant ID: {item.variantId}
                                  </p>
                                  <div className="flex items-center space-x-3 mt-1">
                                    {variant?.color && (
                                      <div className="flex items-center space-x-1">
                                        <span className="text-sm text-gray-600">
                                          Color:
                                        </span>
                                        <div
                                          className="w-5 h-5 rounded-full border-2"
                                          style={getColorStyle(variant.color)}
                                          title={variant.color}
                                        ></div>
                                        <span className="text-sm text-gray-600">
                                          {variant.color}
                                        </span>
                                      </div>
                                    )}
                                    {variant?.size && (
                                      <div className="flex items-center space-x-1">
                                        <span className="text-sm text-gray-600">
                                          Size:
                                        </span>
                                        <span className="text-sm font-medium">
                                          {variant.size}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-600">
                                    Qty: {item.quantity || 1}
                                  </p>
                                  {variant?.price && (
                                    <p className="font-semibold text-gray-800">
                                      ${variant.price.toFixed(2)} each
                                    </p>
                                  )}
                                  {variant?.price && item.quantity && (
                                    <p className="text-sm text-gray-600">
                                      Subtotal: $
                                      {(variant.price * item.quantity).toFixed(
                                        2
                                      )}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
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
