import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fakeProducts = [
          {
            id: 1,
            name: "Classic White T-Shirt",
            description: "Soft cotton T-shirt",
            price: 24.99,
            sizes: ["S", "M", "L", "XL"],
            colors: ["White", "Black"],
            imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg"
          },
          {
            id: 2,
            name: "Blue Denim Jacket",
            description: "Stylish denim jacket",
            price: 59.99,
            sizes: ["M", "L"],
            colors: ["Blue"],
            imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg"
          },
          {
            id: 3,
            name: "Black Hoodie",
            description: "Warm and comfy hoodie",
            price: 39.99,
            sizes: ["S", "M", "L"],
            colors: ["Black", "Gray"],
            imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg"
          },
          {
            id: 4,
            name: "Red Flannel Shirt",
            description: "Cozy flannel for cooler weather",
            price: 34.99,
            sizes: ["M", "L", "XL"],
            colors: ["Red", "Black"],
            imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg"
          },
          {
            id: 5,
            name: "Beige Chinos",
            description: "Casual beige chinos for everyday wear",
            price: 45.00,
            sizes: ["30", "32", "34", "36"],
            colors: ["Beige"],
            imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg"
          },
          {
            id: 6,
            name: "Green Polo Shirt",
            description: "Classic fit polo shirt",
            price: 29.99,
            sizes: ["S", "M", "L"],
            colors: ["Green", "White"],
            imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg"
          },
          {
            id: 7,
            name: "Leather Jacket",
            description: "Premium black leather jacket",
            price: 120.00,
            sizes: ["M", "L", "XL"],
            colors: ["Black"],
            imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg"
          },
          {
            id: 8,
            name: "Navy Blue Shorts",
            description: "Comfortable summer shorts",
            price: 22.50,
            sizes: ["S", "M", "L", "XL"],
            colors: ["Navy"],
            imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg"
          }
        ];
      
        setProducts(fakeProducts);
      }, []);      

    return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-[#484848] font-bold mb-6 text-center">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>

              <div className="mt-2">
                <p className="text-sm font-medium">Sizes: 
                  <span className="ml-1 text-gray-700">{product.sizes.join(', ')}</span>
                </p>
                <p className="text-sm font-medium pb-5">Colors: 
                  <span className="ml-1 text-gray-700">{product.colors.join(', ')}</span>
                </p>
              </div>

              <Link to={'/product-details'} className="w-full bg-[#484848] text-white px-20 py-2 rounded-xl hover:bg-[gray] transition">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;