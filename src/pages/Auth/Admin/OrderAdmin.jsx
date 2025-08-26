import { useState } from 'react';

const Modal = ({ children, title }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-16 z-50 overflow-auto">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      {children}
    </div>
  </div>
);

const OrderAdmin = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      user_id: 101,
      status: "Processing",
      created_at: "2023-10-27T10:00:00Z",
      items: [
        { product_id: 1, product_variant_id: 102, quantity: 1 },
        { product_id: 2, product_variant_id: 201, quantity: 2 },
      ]
    },
    {
      id: 2,
      user_id: 102,
      status: "Shipped",
      created_at: "2023-10-26T15:30:00Z",
      items: [
        { product_id: 1, product_variant_id: 101, quantity: 5 },
      ]
    },
  ]);

  const [addingOrder, setAddingOrder] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({ user_id: '', status: 'Processing', items: [{ product_id: '', product_variant_id: '', quantity: 1 }] });

  

  const handleAddOrder = () => {
    setNewOrder({ user_id: '', status: 'Processing', items: [{ product_id: '', product_variant_id: '', quantity: 1 }] });
    setAddingOrder(true);
  };

  const startEditOrder = (order) => {
    // Deep copy to prevent direct state mutation
    setEditingOrder(JSON.parse(JSON.stringify(order)));
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to delete Order #${orderId}?`)) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };
  
  const saveNewOrder = () => {
    if (!newOrder.user_id) {
        alert("User ID is required.");
        return;
    }
    const finalNewOrder = {
        ...newOrder,
        id: new Date().getTime(), // Generate a unique ID
        created_at: new Date().toISOString()
    };
    setOrders([...orders, finalNewOrder]);
    setAddingOrder(false);
  };
  
  const saveOrderEdit = () => {
    setOrders(orders.map(order => order.id === editingOrder.id ? editingOrder : order));
    setEditingOrder(null);
  };

  const cancelAction = () => {
    setAddingOrder(false);
    setEditingOrder(null);
  };



  const handleOrderChange = (e, orderData, setOrderData) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleItemChange = (index, e, orderData, setOrderData) => {
    const { name, value } = e.target;
    const updatedItems = [...orderData.items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setOrderData({ ...orderData, items: updatedItems });
  };

  const addItem = (orderData, setOrderData) => {
    const newItems = [...orderData.items, { product_id: '', product_variant_id: '', quantity: 1 }];
    setOrderData({ ...orderData, items: newItems });
  };

  const removeItem = (index, orderData, setOrderData) => {
    if (orderData.items.length <= 1) {
        alert("An order must have at least one item.");
        return;
    }
    const newItems = orderData.items.filter((_, i) => i !== index);
    setOrderData({ ...orderData, items: newItems });
  };

  const getStatusColor = (status) => {
    // ... (same as before)
    switch (status) {
        case 'Processing': return 'bg-blue-100 text-blue-800';
        case 'Shipped': return 'bg-yellow-100 text-yellow-800';
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
  };


  const renderOrderForm = (orderData, setOrderData, onSave, title) => (
    <Modal title={title}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">User ID</label>
              <input type="number" name="user_id" value={orderData.user_id} onChange={(e) => handleOrderChange(e, orderData, setOrderData)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={orderData.status} onChange={(e) => handleOrderChange(e, orderData, setOrderData)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
        </div>
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Items</h3>
          {orderData.items.map((item, index) => (
             <div key={index} className="grid grid-cols-12 gap-2 items-center mb-2">
                <div className="col-span-4">
                    <label className="text-xs text-gray-600">Product ID</label>
                    <input type="number" name="product_id" value={item.product_id} onChange={(e) => handleItemChange(index, e, orderData, setOrderData)} className="w-full border border-gray-300 rounded-md p-1.5"/>
                </div>
                 <div className="col-span-4">
                    <label className="text-xs text-gray-600">Variant ID</label>
                    <input type="number" name="product_variant_id" value={item.product_variant_id} onChange={(e) => handleItemChange(index, e, orderData, setOrderData)} className="w-full border border-gray-300 rounded-md p-1.5"/>
                </div>
                 <div className="col-span-3">
                    <label className="text-xs text-gray-600">Quantity</label>
                    <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e, orderData, setOrderData)} className="w-full border border-gray-300 rounded-md p-1.5"/>
                </div>
                <div className="col-span-1 pt-4">
                   <button onClick={() => removeItem(index, orderData, setOrderData)} className="text-red-500 hover:text-red-700">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                   </button>
                </div>
            </div>
          ))}
          <button onClick={() => addItem(orderData, setOrderData)} className="mt-2 text-sm text-blue-600 hover:text-blue-800">+ Add Item</button>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={cancelAction} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
       {addingOrder && renderOrderForm(newOrder, setNewOrder, saveNewOrder, "Add New Order")}
       {editingOrder && renderOrderForm(editingOrder, setEditingOrder, saveOrderEdit, `Edit Order #${editingOrder.id}`)}
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
          <button onClick={handleAddOrder} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Order
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <button onClick={() => startEditOrder(order)} className="text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
                    </button>
                    <button onClick={() => handleDeleteOrder(order.id)} className="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                <div className="text-gray-600 mt-2">
                  <p><span className="font-medium text-gray-700">User ID:</span> {order.user_id}</p>
                  <p><span className="font-medium text-gray-700">Created At:</span> {new Date(order.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div className="p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                      <tr>
                        <th scope="col" className="px-4 py-3">Product ID</th>
                        <th scope="col" className="px-4 py-3">Variant ID</th>
                        <th scope="col" className="px-4 py-3 text-right">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index} className="bg-white border-b last:border-b-0">
                          <td className="px-4 py-3 font-medium text-gray-900">{item.product_id}</td>
                          <td className="px-4 py-3">{item.product_variant_id}</td>
                          <td className="px-4 py-3 text-right">{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderAdmin;