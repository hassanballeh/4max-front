import { useState, useEffect } from "react";
import {
  Eye,
  Loader2,
  Package,
  User,
  Calendar,
  DollarSign,
  Filter,
  X,
  Trash2,
  Plus,
  Save,
  Edit3,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  getAllOrders,
  deleteOrder,
  createOrderByAdmin,
  updateStatus, // Add this import
} from "../../../../back/order"; // Adjust path as needed

// Status options for filtering and updating
const statusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "CANCELLED", label: "Cancelled" },
];

// Custom styles for react-select
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    padding: "0.125rem",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "none",
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    "&:hover": {
      borderColor: "#9ca3af",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3b82f6"
      : state.isFocused
      ? "#eff6ff"
      : "white",
    color: state.isSelected ? "white" : "#374151",
    "&:hover": {
      backgroundColor: state.isSelected ? "#3b82f6" : "#eff6ff",
    },
  }),
};

const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Form data for creating new order
  const [formData, setFormData] = useState({
    user_id: "",
    email: "",
    address: "",
    items: [],
  });

  const [currentItem, setCurrentItem] = useState({
    product_id: 0,
    product_variant_id: 0,
    quantity: 0,
  });

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, []);

  // Filter orders when filter criteria change
  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();

      // Ensure each order has proper structure with items array
      const ordersWithDefaults = data.map((order) => ({
        ...order,
        items: order.items || [], // Ensure items is always an array
        status: order.status || "PENDING",
        createdAt: order.createdAt || Date.now().toString(),
      }));

      // Sort orders by creation date (newest first)
      const sortedOrders = ordersWithDefaults.sort((a, b) => {
        const timestampA = parseInt(a.createdAt);
        const timestampB = parseInt(b.createdAt);
        return timestampB - timestampA;
      });
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
      alert("Failed to load orders: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(
        (order) => order.status === statusFilter.value
      );
    }

    setFilteredOrders(filtered);
  };

  const removeOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(orderId);
        setOrders(orders.filter((o) => o.order_id !== orderId));
        setFilteredOrders(filteredOrders.filter((o) => o.order_id !== orderId));
        alert("Order deleted successfully");
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Failed to delete order: " + error.message);
      }
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(orderId);
      await updateStatus(orderId, newStatus);

      // Update the order in state
      const updatedOrders = orders.map((order) =>
        order.order_id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      setEditingStatus(null);
      alert("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status: " + error.message);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  // FIXED: Added safety check for undefined/null items
  const getTotalItems = (items) => {
    if (!items || !Array.isArray(items)) {
      return 0;
    }
    return items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const clearFilters = () => {
    setStatusFilter(null);
  };

  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter((o) => o.status === "PENDING").length,
      confirmed: orders.filter((o) => o.status === "CONFIRMED").length,
      cancelled: orders.filter((o) => o.status === "CANCELLED").length,
    };
    return stats;
  };

  const resetForm = () => {
    setFormData({
      user_id: "",
      email: "",
      address: "",
      items: [],
    });
    setCurrentItem({
      product_id: 0,
      product_variant_id: 0,
      quantity: 0,
    });
  };

  const handleCreateOrder = () => {
    setShowCreateForm(true);
    resetForm();
  };

  const addItemToOrder = () => {
    // Validate all required fields
    if (
      !currentItem.product_id ||
      !currentItem.product_variant_id ||
      !currentItem.quantity
    ) {
      alert("Please fill in Product ID, Variant ID, and Quantity");
      return;
    }

    // Validate positive numbers
    if (
      parseInt(currentItem.product_id) <= 0 ||
      parseInt(currentItem.product_variant_id) <= 0 ||
      parseInt(currentItem.quantity) <= 0
    ) {
      alert("Product ID, Variant ID, and Quantity must be positive numbers");
      return;
    }

    // Check for duplicate items (same product and variant)
    const isDuplicate = formData.items.some(
      (item) =>
        item.product_id === parseInt(currentItem.product_id) &&
        item.product_variant_id === parseInt(currentItem.product_variant_id)
    );

    if (isDuplicate) {
      alert(
        "This product variant is already in the order. Please remove it first or use a different variant."
      );
      return;
    }

    const item = {
      quantity: parseInt(currentItem.quantity),
      product_id: parseInt(currentItem.product_id),
      product_variant_id: parseInt(currentItem.product_variant_id),
    };

    setFormData({
      ...formData,
      items: [...formData.items, item],
    });

    setCurrentItem({
      product_id: 0,
      product_variant_id: 0,
      quantity: 0,
    });

    alert("Item added to order successfully!");
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const saveOrder = async () => {
    if (
      formData.user_id &&
      formData.email &&
      formData.address &&
      formData.items.length > 0
    ) {
      try {
        setCreating(true);
        const response = await createOrderByAdmin(formData);

        // Check if the API response indicates success
        if (response.success === true) {
          // Order created successfully
          const orderWithDefaults = {
            ...response,
            items: formData.items || [], // Use form data items since API might not return them
            status: response.status || "PENDING",
            createdAt: response.createdAt || Date.now().toString(),
            user_id: formData.user_id,
            email: formData.email,
            address: formData.address,
          };

          setOrders([orderWithDefaults, ...orders]);
          setShowCreateForm(false);
          resetForm();
          alert("Order created successfully");

          // Optionally reload orders to get fresh data
          await loadOrders();
        } else {
          // Order creation failed - show the error message from API
          alert(response.message || "Failed to create order");
        }
      } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to create order: " + error.message);
      } finally {
        setCreating(false);
      }
    } else {
      // Validation error for missing required fields
      let missingFields = [];
      if (!formData.user_id) missingFields.push("User ID");
      if (!formData.email) missingFields.push("Email");
      if (!formData.address) missingFields.push("Address");
      if (formData.items.length === 0) missingFields.push("At least one item");

      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="animate-spin" size={24} />
          <span>Loading orders...</span>
        </div>
      </div>
    );
  }

  const stats = getOrderStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Orders Management
              </h1>
              <p className="text-gray-600 mt-2">
                View and manage customer orders
              </p>
            </div>
            <button
              onClick={handleCreateOrder}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus size={20} />
              Create Order
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {stats.confirmed}
              </div>
              <div className="text-sm text-gray-600">Confirmed</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-red-600">
                {stats.cancelled}
              </div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </div>
          </div>

          {/* Filters - Only Status Filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-500" />
                <span className="font-medium text-gray-700">Filters:</span>
              </div>

              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="w-full md:w-64">
                  <Select
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={statusOptions}
                    styles={customSelectStyles}
                    placeholder="Filter by status"
                    isClearable
                  />
                </div>
              </div>

              {statusFilter && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={16} />
                  Clear
                </button>
              )}
            </div>

            <div className="mt-2 text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          </div>
        </div>

        {/* Create Order Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Order
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  resetForm();
                }}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User ID
                </label>
                <input
                  type="text"
                  value={formData.user_id}
                  onChange={(e) =>
                    setFormData({ ...formData, user_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter user ID"
                  disabled={creating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email"
                  disabled={creating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
                  disabled={creating}
                />
              </div>
            </div>

            {/* Add Item Section */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add Items to Order
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product ID
                  </label>
                  <input
                    type="number"
                    value={currentItem.product_id}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        product_id: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Product ID"
                    disabled={creating}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variant ID
                  </label>
                  <input
                    type="number"
                    value={currentItem.product_variant_id}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        product_variant_id: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Variant ID"
                    disabled={creating}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={currentItem.quantity}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        quantity: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    disabled={creating}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={addItemToOrder}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                    disabled={creating}
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>

            {/* Current Items */}
            {formData.items.length > 0 && (
              <div className="mt-8 border-t pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {formData.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex-1">
                        <span className="font-medium">
                          Product: {item.product_id}
                        </span>
                        <span className="mx-2">|</span>
                        <span className="text-gray-600">
                          Variant: {item.product_variant_id}
                        </span>
                        <span className="mx-2">|</span>
                        <span className="text-gray-600">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        disabled={creating}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={saveOrder}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                disabled={creating}
              >
                {creating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Create Order
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Orders List */}
        {!showCreateForm && filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Package size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {orders.length === 0
                ? "No orders yet"
                : "No orders match your filters"}
            </h3>
            <p className="text-gray-500 mb-6">
              {orders.length === 0
                ? "Orders will appear here once customers start placing them"
                : "Try adjusting your filters to see more results"}
            </p>
            {statusFilter && (
              <button
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          !showCreateForm && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.order_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Package className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                #{order.order_id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="h-5 w-5 text-gray-400 mr-2" />
                            <div className="text-sm text-gray-900">
                              {order.user_id || "Guest"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingStatus === order.order_id ? (
                            <div className="flex items-center gap-2">
                              <Select
                                value={statusOptions.find(
                                  (opt) => opt.value === order.status
                                )}
                                onChange={(selectedOption) =>
                                  handleUpdateStatus(
                                    order.order_id,
                                    selectedOption.value
                                  )
                                }
                                options={statusOptions}
                                styles={{
                                  ...customSelectStyles,
                                  control: (provided, state) => ({
                                    ...provided,
                                    minWidth: "140px",
                                    fontSize: "14px",
                                  }),
                                }}
                                isDisabled={updatingStatus === order.order_id}
                              />
                              {updatingStatus === order.order_id && (
                                <Loader2 className="animate-spin h-4 w-4 text-blue-600" />
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                              <button
                                onClick={() => setEditingStatus(order.order_id)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
                                title="Edit status"
                              >
                                <Edit3 size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {/* FIXED: Added safety check for getTotalItems call */}
                            {getTotalItems(order.items || [])} items
                          </div>
                          <div className="text-xs text-gray-500">
                            {(order.items || []).length} product
                            {(order.items || []).length !== 1 ? "s" : ""}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <div className="text-sm text-gray-900">
                              {formatDate(order.createdAt)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => removeOrder(order.order_id)}
                            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:text-gray-400 disabled:hover:bg-transparent cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
