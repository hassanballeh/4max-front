import { Link } from "react-router";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  // Use cart.items directly instead of storing in local state
  const cartItems = cart.items;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 12;
  const total = subtotal;

  const removeItem = (variantId) => {
    removeFromCart(variantId);
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 mt-25">
        <h1 className="text-3xl text-[#484848] font-bold mb-6 text-center">
          Your Cart
        </h1>

        <div className="text-center py-12">
          <div className="mb-6">
            <svg
              className="mx-auto h-24 w-24 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet. Start
            shopping to fill it up!
          </p>

          <Link
            to="/products"
            className="inline-block bg-black text-white py-3 px-8 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-25">
      <h1 className="text-3xl text-[#484848] font-bold mb-6 text-center">
        Your Cart ({cartItems.length}{" "}
        {cartItems.length === 1 ? "item" : "items"})
      </h1>

      <div className="space-y-6 mb-8">
        {cartItems.map((item) => (
          <div
            key={item.variantId}
            className="border-b pb-4 flex items-center justify-between"
          >
            <div className="flex-1 pr-4">
              <h2 className="text-xl font-semibold mb-2">
                {item.productName || item.name}
              </h2>
              <div className="text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Size:</span> {item.size}
                </p>
                <p>
                  <span className="font-medium">Color:</span> {item.color}
                </p>
                <p>
                  <span className="font-medium">Price:</span> ${item.price}
                </p>
                <p>
                  <span className="font-medium">Quantity:</span> {item.quantity}
                </p>
                <p>
                  <span className="font-medium">Subtotal:</span> $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.variantId)}
                className="mt-2 text-red-500 hover:text-red-700 text-sm cursor-pointer transition-colors"
              >
                Remove
              </button>
            </div>
            <img
              src={item.image || item.imageUrl}
              alt={item.productName || item.name}
              className="w-40 h-40 rounded object-cover"
              onError={(e) => {
                e.target.src = "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg";
              }}
            />
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span>
              Subtotal ({cart.totalItems}{" "}
              {cart.totalItems === 1 ? "item" : "items"})
            </span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t pt-3 mb-10">
          <div className="flex justify-between font-bold text-lg">
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
