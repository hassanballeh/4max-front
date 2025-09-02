import React from "react";
import { Trash2 } from "lucide-react";

const VariantList = ({ formData, setFormData }) => {
  const removeVariant = (i) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, idx) => idx !== i),
    });
  };

  return (
    formData.variants.length > 0 && (
      <div className="mt-6 border-t pt-6">
        <h3 className="font-semibold mb-3">Product Variants</h3>
        {formData.variants.map((v, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-50 p-3 rounded mb-2"
          >
            <div>
              ${v.price} | Stock: {v.stock} | {v.color}-{v.size} |{" "}
              {v.base64Images.length} images
            </div>
            <button
              onClick={() => removeVariant(i)}
              className="text-red-600 p-2 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    )
  );
};

export default VariantList;
