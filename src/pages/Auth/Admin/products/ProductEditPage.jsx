import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { getProductById, updateProduct } from "../../../../back/products";

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    season: "",
    variants: [],
  });
  console.log(formData);
  const [currentVariant, setCurrentVariant] = useState({
    id: "",
    price: "",
    stock: "",
    color: "",
    size: "",
    base64Images: [],
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
      id: "",
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
      id: variant.id,
      price: variant.price.toString(),
      stock: variant.stock.toString(),
      color: variant.color,
      size: variant.size,
      images: [...variant.images],
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64Images) => {
      setCurrentVariant({
        ...currentVariant,
        images: [...currentVariant.images, ...base64Images],
      });
    });
  };

  const removeImage = (index) => {
    setCurrentVariant({
      ...currentVariant,
      images: currentVariant.images.filter((_, i) => i !== index),
    });
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
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product name"
                disabled={saving}
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
                disabled={saving}
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
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
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
                        Images: {variant.base64Images?.length || 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => editVariant(index)}
                      disabled={saving}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors disabled:text-gray-400"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => removeVariant(index)}
                      disabled={saving}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:text-gray-400"
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
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    disabled={saving}
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
                    disabled={saving}
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
                    disabled={saving}
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
                  disabled={saving}
                />
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
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
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
