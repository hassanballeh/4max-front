import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const Products = [
      { id: 1, name: "Classic White T-Shirt", price: 24.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" },
      { id: 2, name: "Blue Denim Jacket", price: 59.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" },
      { id: 3, name: "Black Hoodie", price: 39.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" },
      { id: 4, name: "Red Flannel Shirt", price: 34.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" },
      { id: 5, name: "Beige Chinos", price: 45.00, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg" },
      { id: 6, name: "Green Polo Shirt", price: 29.99, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg" },
      { id: 7, name: "Leather Jacket", price: 120.00, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg" },
      { id: 8, name: "Navy Blue Shorts", price: 22.50, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg" },
      { id: 9, name: "Classic White T-Shirt", price: 24.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" },
      { id: 10, name: "Blue Denim Jacket", price: 59.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" },
      { id: 11, name: "Black Hoodie", price: 39.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" },
      { id: 12, name: "Red Flannel Shirt", price: 34.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" },
      { id: 13, name: "Classic White T-Shirt", price: 24.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" },
      { id: 14, name: "Blue Denim Jacket", price: 59.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" },
      { id: 15, name: "Black Hoodie", price: 39.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" },
      { id: 16, name: "Red Flannel Shirt", price: 34.99, imageUrl: "bannerPhoto/photo_2_2025-07-16_23-09-20.jpg" }
    ];

    setProducts(Products);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const showMoreProducts = () => {
    setVisibleCount(prev => prev + 8);
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section id="products" className="text-3xl text-[#484848] font-bold mb-6 text-center">Products</section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map(product => {
          const isFavorite = favorites.includes(product.id);

          return (
            <div key={product.id} className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              {/* Heart Button */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-52 right-3 text-2xl text-red-500 hover:scale-110 transition-transform"
              >
                {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>

              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-500 text-sm pb-8">${product.price.toFixed(2)}</p>

                <Link to={'/product-details'} className="w-full bg-[#484848] text-white px-20 py-2 rounded-xl hover:bg-[gray] transition">
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* More Button */}
      {visibleCount < products.length && (
        <div className="text-center mt-8">
          <button
            onClick={showMoreProducts}
            className="bg-[#484848] text-white px-6 py-2 rounded-xl hover:bg-[gray] transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
