import { useState } from 'react';
import { Link } from 'react-router';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 20,
      size: "M",
      color: "Red",
      imageUrl: "bannerPhoto/photo_2_2025-07-30_22-00-59.jpg"
    },
    {
      id: 2,
      name: "Product 2",
      price: 300,
      size: "S",
      color: "Blue",
      imageUrl: "bannerPhoto/photo_2_2025-07-30_22-00-59.jpg"
    },
    {
      id: 3,
      name: "Product 3",
      price: 100,
      size: "L",
      color: "Red",
      imageUrl: "bannerPhoto/photo_2_2025-07-30_22-00-59.jpg"
    },
    {
      id: 4,
      name: "Product 4",
      price: 300,
      size: "S",
      color: "Blue",
      imageUrl: "bannerPhoto/photo_2_2025-07-30_22-00-59.jpg"
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = subtotal * 0.33;
  const deliveryFee = 158;
  const total = subtotal - discount + deliveryFee;

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-25">
      <h1 className="text-3xl text-[#484848] font-bold mb-6 text-center">Your Cart</h1>

      <div className="space-y-6 mb-8">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border-b pb-4 flex items-center justify-between"
          >
            <div className="flex-1 pr-4">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <div className="text-gray-600 space-y-1">
                <p><span className="font-medium">Size:</span> {item.size}</p>
                <p><span className="font-medium">Color:</span> {item.color}</p>
                <p><span className="font-medium">Price:</span> ${item.price}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="mt-2 text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-40 h-40 rounded object-cover"
            />
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount (33%)</span>
            <span className="text-green-600">-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t pt-3 mb-10">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Link
          to="/checkout"
          className="w-full block bg-black text-white py-3 px-6 rounded-lg font-medium text-center hover:bg-gray-800 transition-colors"
        >
          Go To Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
