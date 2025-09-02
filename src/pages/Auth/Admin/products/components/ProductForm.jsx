import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import VariantForm from "./VariantForm";
import VariantList from "./VariantList";

const ProductForm = ({ product, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    season: "",
    variants: [],
  });

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {product ? "Edit Product" : "Create New Product"}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Season"
          value={formData.season}
          onChange={(e) => setFormData({ ...formData, season: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          rows="3"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 rounded md:col-span-2"
        />
      </div>

      {/* Variants */}
      <VariantForm formData={formData} setFormData={setFormData} />
      <VariantList formData={formData} setFormData={setFormData} />

      {/* Save */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onSave(formData)}
          disabled={
            !formData.name ||
            !formData.description ||
            !formData.season ||
            formData.variants.length === 0
          }
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <Save size={20} /> {product ? "Update Product" : "Save Product"}
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
