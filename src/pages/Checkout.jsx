import { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../back/order";

const Checkout = () => {
  const [formData, setFormData] = useState({
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const { getAllItems } = useCart();
  const data = getAllItems().items;

  let items = [];
  data.map((item) =>
    items.push({
      product_id: item.productId,
      product_variant_id: item.variantId,
      quantity: item.quantity,
    })
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setOrderStatus(null);
    setErrorMessage("");

    try {
      const res = await createOrder({
        items: items,
        address: formData.address,
      });
      console.log(res);
      setOrderStatus("success");
    } catch (error) {
      console.log(error);
      setOrderStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Success state
  if (orderStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto mt-25 px-4 py-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl text-[#484848] font-bold mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your order. We'll send you a confirmation email
            shortly.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>📧 Don't forget to check your spam folder</strong> for the
              order confirmation email in case it doesn't appear in your inbox.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-25 px-4 py-8">
      <h1 className="text-3xl text-[#484848] font-bold mb-6 text-center">
        Delivery Details
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Street Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
            disabled={isLoading}
          />
        </div>

        {orderStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-800">
              <strong>Error:</strong> {errorMessage}
            </p>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Checking out...
              </>
            ) : (
              "Continue to Payment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
