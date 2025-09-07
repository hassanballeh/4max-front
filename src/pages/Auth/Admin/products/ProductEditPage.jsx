import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import Select from "react-select";
import { getProductById, updateProduct } from "../../../../back/products";
import { processFilesToBase64, ensureBase64Images } from "./utils/imageUtils"; // Adjust the path as needed

// Options for react-select
const seasonOptions = [
  { value: "SUMMER", label: "Summer" },
  { value: "WINTER", label: "Winter" },
  { value: "AUTUMN", label: "Autumn" },
  { value: "SPRING", label: "Spring" },
];

const colorOptions = [
  { value: "Red", label: "Red" },
  { value: "Blue", label: "Blue" },
  { value: "Green", label: "Green" },
  { value: "Yellow", label: "Yellow" },
  { value: "Orange", label: "Orange" },
  { value: "Purple", label: "Purple" },
  { value: "Pink", label: "Pink" },
  { value: "Black", label: "Black" },
  { value: "White", label: "White" },
  { value: "Gray", label: "Gray" },
];

const sizeOptions = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
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

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
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
    images: [],
  });

  const [editingVariantIndex, setEditingVariantIndex] = useState(null);
  const [showVariantForm, setShowVariantForm] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);
  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setFormData({
        id: data.id,
        name: data.name,
        description: data.description,
        season: data.season,
        variants: [...data.variants],
      });
    } catch (error) {
      console.error("Error loading product:", error);
      alert("Failed to load product: " + error.message);
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  const resetVariantForm = () => {
    setCurrentVariant({
      price: "",
      stock: "",
      color: "",
      size: "",
      images: [],
    });
    setEditingVariantIndex(null);
  };

  const handleSave = async () => {
    if (
      formData.name &&
      formData.description &&
      formData.season &&
      formData.variants.length > 0
    ) {
      try {
        setSaving(true);
        await updateProduct(formData, id);
        alert("Product updated successfully");
        navigate(`/admin/products/${id}`);
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product: " + error.message);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleBack = () => {
    if (
      window.confirm(
        "Are you sure you want to leave? Unsaved changes will be lost."
      )
    ) {
      navigate(`/admin/products/${id}`);
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
      } else {
        // Add new variant
        setFormData({
          ...formData,
          variants: [...formData.variants, variant],
        });
      }

      resetVariantForm();
      setShowVariantForm(false);
    }
  };

  const editVariant = (index) => {
    const variant = formData.variants[index];
    setCurrentVariant({
      price: variant.price.toString(),
      stock: variant.stock.toString(),
      color: variant.color,
      size: variant.size,
      images: [...(variant.images || [])],
    });
    setEditingVariantIndex(index);
    setShowVariantForm(true);
  };

  const removeVariant = (index) => {
    if (window.confirm("Are you sure you want to remove this variant?")) {
      setFormData({
        ...formData,
        variants: formData.variants.filter((_, i) => i !== index),
      });
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setImageProcessing(true);

      // Process images with validation and convert to base64
      const images = await processFilesToBase64(files, {
        allowedTypes: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/webp",
        ],
        maxSize: 5 * 1024 * 1024,
        // 5MB
      });

      setCurrentVariant({
        ...currentVariant,
        images: [...currentVariant.images, ...images],
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
      images: currentVariant.images.filter((_, i) => i !== index),
    });
  };

  // Helper functions to get selected option objects
  const getSelectedSeasonOption = () => {
    return (
      seasonOptions.find((option) => option.value === formData.season) || null
    );
  };

  const getSelectedColorOption = () => {
    return (
      colorOptions.find((option) => option.value === currentVariant.color) ||
      null
    );
  };

  const getSelectedSizeOption = () => {
    return (
      sizeOptions.find((option) => option.value === currentVariant.size) || null
    );
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
              <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
              <p className="text-gray-600 mt-1">{formData.name}</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={
              !formData.name ||
              !formData.description ||
              !formData.season ||
              formData.variants.length === 0 ||
              saving
            }
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* Basic Product Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Product Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product name"
                disabled={saving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Season
              </label>
              <Select
                value={getSelectedSeasonOption()}
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    season: selectedOption ? selectedOption.value : "",
                  })
                }
                options={seasonOptions}
                styles={customSelectStyles}
                placeholder="Select season"
                isDisabled={saving}
                isClearable
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Enter product description"
                disabled={saving}
              />
            </div>
          </div>
        </div>

        {/* Variants Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Product Variants
            </h2>
            <button
              onClick={() => {
                resetVariantForm();
                setShowVariantForm(true);
              }}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus size={16} />
              Add Variant
            </button>
          </div>

          {/* Existing Variants */}
          {formData.variants.length > 0 ? (
            <div className="space-y-4 mb-6">
              {formData.variants.map((variant, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Price:</span>
                        <p className="font-medium">${variant.price}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Stock:</span>
                        <p className="font-medium">{variant.stock}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Color:</span>
                        <p className="font-medium">{variant.color}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Size:</span>
                        <p className="font-medium">{variant.size}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">
                        Images: {variant.images?.length || 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => editVariant(index)}
                      disabled={saving}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors disabled:text-gray-400 cursor-pointer"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => removeVariant(index)}
                      disabled={saving}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:text-gray-400 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
              <p className="text-gray-500">
                No variants added yet. Add your first variant to get started.
              </p>
            </div>
          )}

          {/* Variant Form */}
          {showVariantForm && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingVariantIndex !== null
                    ? "Edit Variant"
                    : "Add New Variant"}
                </h3>
                <button
                  onClick={() => {
                    resetVariantForm();
                    setShowVariantForm(false);
                  }}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    disabled={saving}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    disabled={saving}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <Select
                    value={getSelectedColorOption()}
                    onChange={(selectedOption) =>
                      setCurrentVariant({
                        ...currentVariant,
                        color: selectedOption ? selectedOption.value : "",
                      })
                    }
                    options={colorOptions}
                    styles={customSelectStyles}
                    placeholder="Select color"
                    isDisabled={saving}
                    isClearable
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <Select
                    value={getSelectedSizeOption()}
                    onChange={(selectedOption) =>
                      setCurrentVariant({
                        ...currentVariant,
                        size: selectedOption ? selectedOption.value : "",
                      })
                    }
                    options={sizeOptions}
                    styles={customSelectStyles}
                    placeholder="Select size"
                    isDisabled={saving}
                    isClearable
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
                {imageProcessing && (
                  <div className="flex items-center gap-2 mt-2 text-blue-600">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="text-sm">Processing images...</span>
                  </div>
                )}
                {currentVariant.images.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {currentVariant.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.base64Data}
                          alt={`Variant ${index + 1}`}
                          className="w-16 h-16 object-cover rounded border"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          disabled={saving}
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
                disabled={
                  !currentVariant.price ||
                  !currentVariant.stock ||
                  !currentVariant.color ||
                  !currentVariant.size ||
                  saving
                }
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                {editingVariantIndex !== null
                  ? "Update Variant"
                  : "Add Variant"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;
