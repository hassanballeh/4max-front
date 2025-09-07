import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { getProductById } from "../back/products"; // Assuming you have this function
import { useCart } from "../context/CartContext"; // Import the cart context
import { useAuth } from "../context/AuthContext";
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getCartItem } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { token } = useAuth();

  const colorOptions = [
    { value: "Red", label: "Red", color: "#ef4444" },
    { value: "Blue", label: "Blue", color: "#3b82f6" },
    { value: "Green", label: "Green", color: "#10b981" },
    { value: "Yellow", label: "Yellow", color: "#eab308" },
    { value: "Orange", label: "Orange", color: "#f97316" },
    { value: "Purple", label: "Purple", color: "#8b5cf6" },
    { value: "Pink", label: "Pink", color: "#ec4899" },
    { value: "Black", label: "Black", color: "#000000" },
    { value: "White", label: "White", color: "#ffffff" },
    { value: "Gray", label: "Gray", color: "#6b7280" },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);

        // Set default selections: first size and first color
        if (productData.variants && productData.variants.length > 0) {
          const uniqueSizes = getUniqueValues(productData.variants, "size");
          const firstSize = uniqueSizes[0];

          if (firstSize) {
            const variantsWithFirstSize = productData.variants.filter(
              (v) => v.size === firstSize
            );
            const uniqueColorsForFirstSize = getUniqueValues(
              variantsWithFirstSize,
              "color"
            );
            const firstColor = uniqueColorsForFirstSize[0];

            setSelectedSize(firstSize);
            setSelectedColor(firstColor);

            // Find the variant that matches first size and first color
            const defaultVariant = productData.variants.find(
              (v) => v.size === firstSize && v.color === firstColor
            );

            setSelectedVariant(defaultVariant || productData.variants[0]);
          }
        }
      } catch (err) {
        setError("Failed to fetch product details");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 100) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);

    // Get available colors for this size
    const variantsWithSize = product.variants.filter((v) => v.size === size);
    const availableColors = getUniqueValues(variantsWithSize, "color");

    // Set first available color as default
    const firstAvailableColor = availableColors[0];
    setSelectedColor(firstAvailableColor);

    // Find and set the variant
    const variant = variantsWithSize.find(
      (v) => v.color === firstAvailableColor
    );
    setSelectedVariant(variant);
    setSelectedImageIndex(0); // Reset to first image
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);

    // Find the variant that matches selected size and color
    const variant = product.variants.find(
      (v) => v.size === selectedSize && v.color === color
    );

    setSelectedVariant(variant);
    setSelectedImageIndex(0); // Reset to first image
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || selectedVariant.stock <= 0) {
      return;
    }

    setAddingToCart(true);

    try {
      // Prepare product info for cart
      const productInfo = {
        productId: product.id,
        productName: product.name,
        size: selectedVariant.size,
        color: selectedVariant.color,
        price: selectedVariant.price,
        image:
          selectedVariant.images && selectedVariant.images.length > 0
            ? selectedVariant.images[0].base64Data
            : null,
        stock: selectedVariant.stock,
      };

      // Add to cart using context
      addToCart(selectedVariant.id, quantity, productInfo);

      // Show success feedback
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  const formatImageUrl = (base64Data) => {
    if (!base64Data) return "instagramPhoto/photo_2_2025-07-30_16-40-44.jpg";
    return base64Data.startsWith("data:")
      ? base64Data
      : `data:image/jpeg;base64,${base64Data}`;
  };

  const getCurrentImage = () => {
    if (!selectedVariant?.images || selectedVariant.images.length === 0) {
      return "instagramPhoto/photo_2_2025-07-30_16-40-44.jpg";
    }
    return formatImageUrl(
      selectedVariant.images[selectedImageIndex]?.base64Data
    );
  };

  const getUniqueValues = (variants, key) => {
    if (!variants) return [];
    const values = variants.map((variant) => variant[key]);
    return [...new Set(values)];
  };

  const getColorInfo = (colorName) => {
    return (
      colorOptions.find(
        (option) => option.value.toLowerCase() === colorName.toLowerCase()
      ) || { value: colorName, label: colorName, color: "#6b7280" }
    );
  };

  const getAvailableColorsForSize = (size) => {
    if (!product?.variants || !size) return [];
    const variantsWithSize = product.variants.filter((v) => v.size === size);
    return getUniqueValues(variantsWithSize, "color");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-25">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl text-gray-600">
            Loading product details...
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-25">
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <div className="text-xl text-red-600 mb-4">
            {error || "Product not found"}
          </div>
          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const uniqueSizes = getUniqueValues(product.variants, "size");
  const availableColorsForSelectedSize =
    getAvailableColorsForSize(selectedSize);
  const isVariantInCart = selectedVariant
    ? isInCart(selectedVariant.id)
    : false;
  const cartItem = selectedVariant ? getCartItem(selectedVariant.id) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-25">
      {/* Breadcrumb */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/products")}
          className="text-gray-600 hover:text-black transition-colors"
        >
          Products
        </button>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="md:w-1/2">
          <div
            className="bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in mb-4"
            onClick={() => setIsImageOpen(true)}
          >
            <img
              src={getCurrentImage()}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Image Thumbnails */}
          {selectedVariant?.images && selectedVariant.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {selectedVariant.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition ${
                    selectedImageIndex === index
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={formatImageUrl(image.base64Data)}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Image Modal */}
        {isImageOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-zoom-out"
            onClick={() => setIsImageOpen(false)}
          >
            <img
              src={getCurrentImage()}
              alt={product.name}
              className="max-w-full max-h-full rounded-lg"
            />
          </div>
        )}

        {/* Product Info Section */}
        <div className="md:w-1/2 mt-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-5">
            {product.name}
          </h1>

          {/* Description */}
          {product.description && (
            <p className="text-gray-600 mb-4">{product.description}</p>
          )}

          {/* Season */}
          <div className="mb-4">
            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm capitalize">
              {product.season?.toLowerCase()}
            </span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <p className="text-2xl font-semibold">
              ${selectedVariant?.price?.toFixed(2) || 0}
            </p>
          </div>

          {/* Size Selection */}
          {uniqueSizes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="flex gap-2 mt-2">
                {uniqueSizes.map((size) => {
                  const isSelected = selectedSize === size;
                  const hasStock = product.variants.some(
                    (v) => v.size === size && v.stock > 0
                  );

                  return (
                    <button
                      key={size}
                      onClick={() => hasStock && handleSizeChange(size)}
                      disabled={!hasStock}
                      className={`px-4 py-2 border rounded-md transition cursor-pointer ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : hasStock
                          ? "bg-white text-gray-900 border-gray-300 hover:border-gray-400"
                          : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {selectedSize && availableColorsForSelectedSize.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="flex gap-3 mt-2">
                {availableColorsForSelectedSize.map((color) => {
                  const colorInfo = getColorInfo(color);
                  const isSelected = selectedColor === color;
                  const hasStock = product.variants.some(
                    (v) =>
                      v.size === selectedSize &&
                      v.color === color &&
                      v.stock > 0
                  );

                  return (
                    <button
                      key={color}
                      onClick={() => hasStock && handleColorChange(color)}
                      disabled={!hasStock}
                      className={`relative w-10 h-10 rounded-full border-2 transition cursor-pointer ${
                        isSelected
                          ? "border-black shadow-lg"
                          : hasStock
                          ? "border-gray-300 hover:border-gray-400"
                          : "border-gray-200 cursor-not-allowed opacity-50"
                      }`}
                      title={colorInfo.label}
                      style={{
                        backgroundColor: colorInfo.color,
                        ...(colorInfo.value === "White" && {
                          border: "2px solid #e5e7eb",
                        }),
                      }}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 rounded-full border-2 border-black opacity-50"></div>
                      )}
                      {!hasStock && (
                        <div className="absolute inset-0 rounded-full bg-gray-400 opacity-30"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="flex items-center mt-2 pb-8">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-300 bg-white min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                disabled={quantity >= 100}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          {token ? (
            <button
              onClick={handleAddToCart}
              disabled={
                !selectedVariant?.stock ||
                selectedVariant.stock === 0 ||
                addingToCart
              }
              className={`mt-8 w-full py-3 px-4 rounded-md font-medium transition-colors cursor-pointer ${
                addedToCart
                  ? "bg-green-600 text-white"
                  : selectedVariant?.stock > 0
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {addingToCart
                ? "Adding..."
                : addedToCart
                ? "Added to Cart ✓"
                : selectedVariant?.stock > 0
                ? "Add To Cart"
                : "Out of Stock"}
            </button>
          ) : (
            <h1>
              Long in Now To Add Product To Your Cart{"  "}
              <button
                onClick={() => navigate("/login")}
                className=" cursor-pointer text-blue-600"
              >
                Login
              </button>
            </h1>
          )}

          <button
            onClick={() => navigate("/products")}
            className="mt-4 text-gray-600 hover:text-black transition-colors underline cursor-pointer"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
