import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { getProductById } from "../back/products"; // Assuming you have this function

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        // Set the first variant as default
        if (productData.variants && productData.variants.length > 0) {
          setSelectedVariant(productData.variants[0]);
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

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedImageIndex(0); // Reset to first image when variant changes
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

  const getUniqueValues = (key) => {
    if (!product?.variants) return [];
    const values = product.variants.map((variant) => variant[key]);
    return [...new Set(values)];
  };

  const getVariantsByAttribute = (attribute, value) => {
    if (!product?.variants) return [];
    return product.variants.filter((variant) => variant[attribute] === value);
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

  const uniqueSizes = getUniqueValues("size");
  const uniqueColors = getUniqueValues("color");

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
                  const variantsWithSize = getVariantsByAttribute("size", size);
                  const isSelected = selectedVariant?.size === size;
                  const hasStock = variantsWithSize.some((v) => v.stock > 0);

                  return (
                    <button
                      key={size}
                      onClick={() => {
                        if (hasStock) {
                          const variant =
                            variantsWithSize.find((v) =>
                              selectedVariant?.color
                                ? v.color === selectedVariant.color
                                : true
                            ) || variantsWithSize[0];
                          handleVariantChange(variant);
                        }
                      }}
                      disabled={!hasStock}
                      className={`px-4 py-2 border rounded-md transition ${
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
          {uniqueColors.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="flex gap-2 mt-2">
                {uniqueColors.map((color) => {
                  const variantsWithColor = getVariantsByAttribute(
                    "color",
                    color
                  );
                  const isSelected = selectedVariant?.color === color;
                  const hasStock = variantsWithColor.some((v) => v.stock > 0);

                  return (
                    <button
                      key={color}
                      onClick={() => {
                        if (hasStock) {
                          const variant =
                            variantsWithColor.find((v) =>
                              selectedVariant?.size
                                ? v.size === selectedVariant.size
                                : true
                            ) || variantsWithColor[0];
                          handleVariantChange(variant);
                        }
                      }}
                      disabled={!hasStock}
                      className={`px-3 py-1 border rounded-md transition ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : hasStock
                          ? "bg-white text-gray-900 border-gray-300 hover:border-gray-400"
                          : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      }`}
                      title={color}
                    >
                      {color}
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
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 transition"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-300 bg-white min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 transition"
                disabled={quantity >= 100}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className={`mt-8 w-full py-3 px-4 rounded-md font-medium transition-colors ${
              selectedVariant?.stock > 0
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedVariant?.stock || selectedVariant.stock === 0}
          >
            {selectedVariant?.stock > 0 ? "Add To Cart" : "Out of Stock"}
          </button>

          {/* Back to Products */}
          <button
            onClick={() => navigate("/products")}
            className="mt-4 text-gray-600 hover:text-black transition-colors underline"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
