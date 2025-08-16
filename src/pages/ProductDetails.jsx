import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const product = {
    name: "Black Hoodie",
    rating: 4.5,
    price: 100,
    discount: 33,
    colors: ['#000000', '#FF0000', '#00FF00'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: "instagramPhoto/photo_2_2025-07-30_16-40-44.jpg"
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 100) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-25">
      <div className="flex flex-col md:flex-row gap-8">
        <div
          className="md:w-1/2 bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
          onClick={() => setIsImageOpen(true)}
        >
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {isImageOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-zoom-out"
            onClick={() => setIsImageOpen(false)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full rounded-lg"
            />
          </div>
        )}
        
        <div className="md:w-1/2 mt-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-5">{product.name}</h1>
          
          <div className="mt-4">
            <p className="text-2xl font-semibold">${product.price}</p>
            <p className="text-lg text-green-600">Save {product.discount}%</p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="flex gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-900 border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="flex gap-2 mt-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setActiveColor(index)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    activeColor === index ? 'border-black' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="flex items-center mt-2 pb-8">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-300 bg-white">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
            <button className="mt-8 w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
