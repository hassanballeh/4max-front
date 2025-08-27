import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Loader2,
  Package,
  DollarSign,
  Archive,
  Palette,
} from "lucide-react";
import { getProductById, deleteProduct } from "../../../../back/products";

const ProductViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.error("Error loading product:", error);
      alert("Failed to load product: " + error.message);
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      try {
        setDeleting(true);
        await deleteProduct(id);
        alert("Product deleted successfully");
        navigate("/admin/products");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product: " + error.message);
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleBack = () => {
    navigate("/admin/products");
  };

  const getTotalStock = (variants) => {
    return variants.reduce((total, variant) => total + variant.stock, 0);
  };

  const getAveragePrice = (variants) => {
    if (variants.length === 0) return 0;
    const total = variants.reduce((sum, variant) => sum + variant.price, 0);
    return (total / variants.length).toFixed(2);
  };

  const getUniqueColors = (variants) => {
    const colors = variants.map((v) => v.color);
    return [...new Set(colors)];
  };

  const getUniqueSizes = (variants) => {
    const sizes = variants.map((v) => v.size);
    return [...new Set(sizes)];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="animate-spin" size={24} />
          <span>Loading product...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-4 text-gray-400" size={48} />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Product not found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-gray-600 mt-1">Product Details</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Edit size={16} />
              Edit Product
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              {deleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Delete Product
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Season</h3>
                <p className="text-gray-600">{product.season}</p>
              </div>
            </div>
            <div className="space-y-4">
              {/* Quick Stats */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="text-blue-600" size={20} />
                  <span className="font-medium text-blue-900">
                    Total Variants
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {product.variants.length}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Archive className="text-green-600" size={20} />
                  <span className="font-medium text-green-900">
                    Total Stock
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {getTotalStock(product.variants)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="text-purple-600" size={20} />
                  <span className="font-medium text-purple-900">
                    Avg. Price
                  </span>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  ${getAveragePrice(product.variants)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Product Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Palette size={16} />
                Available Colors
              </h3>
              <div className="flex gap-2 flex-wrap">
                {getUniqueColors(product.variants).map((color, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                Available Sizes
              </h3>
              <div className="flex gap-2 flex-wrap">
                {getUniqueSizes(product.variants).map((size, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Variants Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Product Variants
          </h2>
          <div className="grid gap-6">
            {product.variants.map((variant, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Price
                    </h3>
                    <p className="text-xl font-bold text-gray-900">
                      ${variant.price}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Stock
                    </h3>
                    <p className="text-xl font-bold text-gray-900">
                      {variant.stock}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        variant.stock > 10
                          ? "bg-green-100 text-green-800"
                          : variant.stock > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {variant.stock > 10
                        ? "In Stock"
                        : variant.stock > 0
                        ? "Low Stock"
                        : "Out of Stock"}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Color
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {variant.color}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Size
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {variant.size}
                    </p>
                  </div>
                </div>

                {/* Images */}
                {variant.images && variant.images.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                      Images ({variant.images.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                      {variant.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="aspect-square">
                          <img
                            src={
                              typeof image.base64Data === "string" &&
                              image.base64Data.startsWith("data:")
                                ? image.base64Data
                                : `data:image/jpeg;base64,${image.base64Data}`
                            }
                            alt={`${variant.color} ${variant.size} - Image ${
                              imgIndex + 1
                            }`}
                            className="w-full h-full object-cover rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No images message */}
                {(!variant.images || variant.images.length === 0) && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Package className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-gray-500">
                      No images available for this variant
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage;
