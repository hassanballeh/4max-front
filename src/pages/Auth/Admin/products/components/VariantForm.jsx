import React, { useState } from "react";

const VariantForm = ({ formData, setFormData }) => {
  const [variant, setVariant] = useState({
    price: "",
    stock: "",
    color: "",
    size: "",
    base64Images: [],
  });

  const addVariant = () => {
    if (!variant.price || !variant.stock) return;
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { ...variant, price: +variant.price, stock: +variant.stock },
      ],
    });
    setVariant({ price: "", stock: "", color: "", size: "", base64Images: [] });
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(
      (f) =>
        new Promise((res) => {
          const reader = new FileReader();
          reader.onload = (ev) => res(ev.target.result);
          reader.readAsDataURL(f);
        })
    );
    Promise.all(readers).then((imgs) =>
      setVariant({
        ...variant,
        base64Images: [...variant.base64Images, ...imgs],
      })
    );
  };

  return (
    <div className="border-t pt-6">
      <h3 className="font-semibold mb-3">Add Variant</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="number"
          placeholder="Price"
          value={variant.price}
          onChange={(e) => setVariant({ ...variant, price: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={variant.stock}
          onChange={(e) => setVariant({ ...variant, stock: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Color"
          value={variant.color}
          onChange={(e) => setVariant({ ...variant, color: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Size"
          value={variant.size}
          onChange={(e) => setVariant({ ...variant, size: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <input type="file" multiple accept="image/*" onChange={handleUpload} />
      <div className="flex gap-2 mt-2 flex-wrap">
        {variant.base64Images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="preview"
            className="w-16 h-16 object-cover rounded border"
          />
        ))}
      </div>

      <button
        onClick={addVariant}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Variant
      </button>
    </div>
  );
};

export default VariantForm;
