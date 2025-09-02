import { X } from "lucide-react";

const ProductModal = ({ product, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        <p>{product.description}</p>
        <p className="text-sm text-gray-500">Season: {product.season}</p>
        <div className="mt-4 space-y-3">
          {product.variants.map((v, i) => (
            <div key={i} className="border p-3 rounded">
              <p>
                ${v.price} | Stock: {v.stock} | {v.color}-{v.size}
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {v.base64Images.map((img, j) => (
                  <img
                    key={j}
                    src={img}
                    alt="variant"
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProductModal;
