import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState(0);

  const product = {
    name: "Product 1",
    rating: 4.5,
    price: 100,
    discount: 33,
    colors: ['#000000', '#FF0000', '#00FF00'],
    sizes: ['S', 'M', 'L', 'XL'],
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 100) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src="instagramPhoto/photo_3_2025-07-30_16-40-44.jpg"
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((rating) => (
                <StarIcon
                  key={rating}
                  className={`h-5 w-5 ${
                    rating <= Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating.toFixed(1)})
            </span>
          </div>
          
          <div className="mt-4">
            <p className="text-3xl font-semibold text-gray-900">${product.price}</p>
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
          
          <Link to='/cart' className="mt-8 w-full bg-black text-white py-3 px-60 rounded-md font-medium hover:bg-gray-800 transition-colors">
            Add To Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;