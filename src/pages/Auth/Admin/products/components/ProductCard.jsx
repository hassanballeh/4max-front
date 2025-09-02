import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { getTotalStock, getVariantCount } from "../utils/productHelpers";

const ProductCard = ({ product, onView, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold text-gray-900 truncate">
        {product.name}
      </h3>
      <div className="flex gap-1 ml-2">
        <button
          onClick={onView}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={onEdit}
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>

    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
      {product.description}
    </p>
    <div className="text-sm text-gray-500 mb-4">
      <span className="font-medium">Season:</span> {product.season}
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
);

export default ProductCard;
