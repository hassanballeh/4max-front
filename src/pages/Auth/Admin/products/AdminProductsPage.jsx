import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, X, Save, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
} from "../../../../back/products";
import {
  processFilesToBase64,
  ensureBase64Images,
  validateImage,
} from "./utils/imageUtils"; // Adjust the path as needed

const AdminProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    season: "",
    variants: [],
  });

  const [currentVariant, setCurrentVariant] = useState({
    price: "",
    stock: "",
    color: "",
    size: "",
    base64Images: [],
  });

  const [editingVariantIndex, setEditingVariantIndex] = useState(null);

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      alert("Failed to load products: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      season: "",
      variants: [],
    });
    setCurrentVariant({
      price: "",
      stock: "",
      color: "",
      size: "",
      base64Images: [],
    });
    setEditingVariantIndex(null);
  };

  const handleCreateProduct = () => {
    setShowCreateForm(true);
    resetForm();
  };

  const handleViewProduct = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  const handleEditProduct = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((p) => p.id !== productId));
        alert("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product: " + error.message);
      }
    }
  };

  const addVariantToProduct = () => {
    if (
      currentVariant.price &&
      currentVariant.stock &&
      currentVariant.color &&
      currentVariant.size
    ) {
      const variant = {
        ...currentVariant,
        price: parseFloat(currentVariant.price),
        stock: parseInt(currentVariant.stock),
      };

      if (editingVariantIndex !== null) {
        // Update existing variant
        const updatedVariants = [...formData.variants];
        updatedVariants[editingVariantIndex] = variant;
        setFormData({
          ...formData,
          variants: updatedVariants,
        });
        setEditingVariantIndex(null);
      } else {
        // Add new variant
        setFormData({
          ...formData,
          variants: [...formData.variants, variant],
        });
      }

      setCurrentVariant({
        price: "",
        stock: "",
        color: "",
        size: "",
        base64Images: [],
      });
    }
  };

  const editVariant = (index) => {
    const variant = formData.variants[index];
    setCurrentVariant({
      price: variant.price.toString(),
      stock: variant.stock.toString(),
      color: variant.color,
      size: variant.size,
      base64Images: [...variant.base64Images],
    });
    setEditingVariantIndex(index);
  };

  const cancelVariantEdit = () => {
    setCurrentVariant({
      price: "",
      stock: "",
      color: "",
      size: "",
      base64Images: [],
    });
    setEditingVariantIndex(null);
  };

  const removeVariant = (index) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    });
  };

  // Updated handleImageUpload using the utility functions
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setImageProcessing(true);

      // Process images with validation and convert to base64
      const base64Images = await processFilesToBase64(files, {
        allowedTypes: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/webp",
        ],
        maxSize: 5 * 1024 * 1024, // 5MB
      });

      setCurrentVariant({
        ...currentVariant,
        base64Images: [...currentVariant.base64Images, ...base64Images],
      });

      // Clear the file input
      e.target.value = "";
    } catch (error) {
      console.error("Error processing images:", error);
      alert(`Error processing images: ${error.message}`);
    } finally {
      setImageProcessing(false);
    }
  };

  const removeImage = (index) => {
    setCurrentVariant({
      ...currentVariant,
      base64Images: currentVariant.base64Images.filter((_, i) => i !== index),
    });
  };
  console.log(formData.name);
  console.log(formData.description);
  console.log(formData.season);
  console.log(formData.variants.length);
  // Updated saveProduct function using the utility
  const saveProduct = async () => {
    if (
      formData.name &&
      formData.description &&
      formData.season &&
      formData.variants.length > 0
    ) {
      try {
        setCreating(true);
        console.log("ews");

        // Ensure all images are properly converted to base64
        const processedVariants = await ensureBase64Images(formData.variants);

        const productData = {
          ...formData,
          variants: processedVariants,
        };

        console.log("Product data being sent to API:", productData);

        const newProduct = await createProduct(productData);
        setProducts([...products, newProduct]);
        setShowCreateForm(false);
        resetForm();
        alert("Product created successfully");
      } catch (error) {
        console.error("Error creating product:", error);
        alert("Failed to create product: " + error.message);
      } finally {
        setCreating(false);
      }
    }
  };

  const getTotalStock = (variants) => {
    return variants.reduce((total, variant) => total + variant.stock, 0);
  };

  const getVariantCount = (variants) => {
    return variants.length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="animate-spin" size={24} />
          <span>Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Products Management
            </h1>
            <p className="text-gray-600 mt-2">Manage your product catalog</p>
          </div>
          <button
            onClick={handleCreateProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus size={20} />
            Create Product
          </button>
        </div>

        {/* Products Grid */}
        {!showCreateForm && (
          <div>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Plus size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Get started by creating your first product
                </p>
                <button
                  onClick={handleCreateProduct}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
                >
                  <Plus size={20} />
                  Create Your First Product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => handleViewProduct(product.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="View Product"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditProduct(product.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="text-sm text-gray-500 mb-4">
                      <span className="font-medium">Season:</span>{" "}
                      {product.season}
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {getVariantCount(product.variants)} variants
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {getTotalStock(product.variants)} in stock
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create Product Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Product
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

            {/* Basic Product Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter product name"
                  disabled={creating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Season
                </label>
                <input
                  type="text"
                  value={formData.season}
                  onChange={(e) =>
                    setFormData({ ...formData, season: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Summer 2024"
                  disabled={creating}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter product description"
                  disabled={creating}
                />
              </div>
            </div>

            {/* Add/Edit Variant Section */}
            <div className="border-t pt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingVariantIndex !== null
                    ? "Edit Product Variant"
                    : "Add Product Variant"}
                </h3>
                {editingVariantIndex !== null && (
                  <button
                    onClick={cancelVariantEdit}
                    className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={creating}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={currentVariant.price}
                    onChange={(e) =>
                      setCurrentVariant({
                        ...currentVariant,
                        price: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    disabled={creating}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={currentVariant.stock}
                    onChange={(e) =>
                      setCurrentVariant({
                        ...currentVariant,
                        stock: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    disabled={creating}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <input
                    type="text"
                    value={currentVariant.color}
                    onChange={(e) =>
                      setCurrentVariant({
                        ...currentVariant,
                        color: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Red"
                    disabled={creating}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <input
                    type="text"
                    value={currentVariant.size}
                    onChange={(e) =>
                      setCurrentVariant({
                        ...currentVariant,
                        size: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., M, L, XL"
                    disabled={creating}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={creating || imageProcessing}
                />

                {imageProcessing && (
                  <div className="flex items-center gap-2 mt-2 text-blue-600">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="text-sm">Processing images...</span>
                  </div>
                )}

                {currentVariant.base64Images.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {currentVariant.base64Images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Variant ${index + 1}`}
                          className="w-16 h-16 object-cover rounded border"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          disabled={creating || imageProcessing}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={addVariantToProduct}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                disabled={creating || imageProcessing}
              >
                {editingVariantIndex !== null
                  ? "Update Variant"
                  : "Add Variant"}
              </button>
            </div>

            {/* Current Variants */}
            {formData.variants.length > 0 && (
              <div className="mt-8 border-t pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Variants
                </h3>
                <div className="space-y-3">
                  {formData.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex-1">
                        <span className="font-medium">${variant.price}</span>
                        <span className="mx-2">|</span>
                        <span className="text-gray-600">
                          Stock: {variant.stock}
                        </span>
                        <span className="mx-2">|</span>
                        <span className="text-gray-600">
                          {variant.color} - {variant.size}
                        </span>
                        <span className="mx-2">|</span>
                        <span className="text-sm text-gray-500">
                          {variant.base64Images.length} images
                        </span>
                        {editingVariantIndex === index && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Editing
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => editVariant(index)}
                          disabled={
                            (editingVariantIndex !== null &&
                              editingVariantIndex !== index) ||
                            creating ||
                            imageProcessing
                          }
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => removeVariant(index)}
                          disabled={
                            editingVariantIndex === index ||
                            creating ||
                            imageProcessing
                          }
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => saveProduct()}
                className="bg-blue-600 hover:bg-blue-700  text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
              >
                {creating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save Product
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductsPage;
