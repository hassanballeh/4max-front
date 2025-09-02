import { useState } from 'react';


const initialOrderData = [
  {
    status: "Done",
    created_at: "2023-10-27T10:00:00Z",
    items: [
      { product_name: "Summer T-Shirt (Red, L)", quantity: 1, price: "$32.99" },
      { product_name: "Winter Dress (Black, S)", quantity: 2, price: "$59.99" },
    ],
    total: "$152.97"
  },
  {
    status: "Pending",
    created_at: "2023-10-29T11:20:00Z",
    items: [
      { product_name: "Summer T-Shirt (Blue, M)", quantity: 3, price: "$29.99" },
    ],
    total: "$89.97"
  },
  {
    status: "Cancelled",
    created_at: "2023-10-28T09:00:00Z",
    items: [
      { product_name: "Winter Dress (Navy, M)", quantity: 1, price: "$62.99" },
    ],
    total: "$62.99"
  }
];

const createInitialOrders = () => {
  return initialOrderData.map((order, index) => ({
    ...order,

    id: Date.now() + index, 
  }));
};


const MyOrders = () => {

  const [myOrders, SetMyOrders] = useState(createInitialOrders());

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-600 mt-1">Here you can find the history of all your orders.</p>
        </div>

        {myOrders.length > 0 ? (
            <div className="space-y-6">
            {myOrders.map(order => (
                <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <div className={`p-4 border-b-2 flex justify-between items-center ${getStatusStyle(order.status)}`}>
                    <div>
                        <h2 className="text-xl font-bold">Order #{order.id}</h2>
                        <p className="text-sm font-medium">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                         <p className="text-sm font-semibold uppercase">Status</p>
                         <p className="text-lg font-bold">{order.status}</p>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
                    <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                        <tr>
                            <th scope="col" className="px-4 py-3">Product</th>
                            <th scope="col" className="px-4 py-3 text-center">Quantity</th>
                            <th scope="col" className="px-4 py-3 text-right">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.items.map((item, index) => (
                            <tr key={index} className="bg-white border-b last:border-b-0">
                            <td className="px-4 py-3 font-medium text-gray-900">{item.product_name}</td>
                            <td className="px-4 py-3 text-center">{item.quantity}</td>
                            <td className="px-4 py-3 text-right">{item.price}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                            <tr className="font-semibold text-gray-900">
                                <th scope="row" colSpan="2" className="px-4 py-3 text-base text-right">Total</th>
                                <td className="px-4 py-3 text-base">{order.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                    </div>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="text-center bg-white p-12 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">No Orders Found</h2>
                <p className="mt-2 text-gray-500">You haven't placed any orders yet. Start shopping to see your orders here!</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;