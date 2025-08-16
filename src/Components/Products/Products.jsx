import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const mockProducts = [
      { id: 1, name: "Classic White T-Shirt", price: 24.99, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "summer" },
      { id: 2, name: "Blue Denim Jacket", price: 59.99, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "winter" },
      { id: 3, name: "Black Hoodie", price: 39.99, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "winter" },
      { id: 4, name: "Red Flannel Shirt", price: 34.99, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "autumn" },
      { id: 5, name: "Beige Chinos", price: 45.00, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "spring" },
      { id: 6, name: "Green Polo Shirt", price: 29.99, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "summer" },
      { id: 7, name: "Leather Jacket", price: 120.00, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "autumn" },
      { id: 8, name: "Navy Blue Shorts", price: 22.50, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "summer" },
      { id: 9, name: "Classic White T-Shirt", price: 24.99, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "summer" },
      { id: 10, name: "Blue Denim Jacket", price: 59.99, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "winter" },
      { id: 11, name: "Beige Chinos", price: 45.00, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "spring" },
      { id: 12, name: "Green Polo Shirt", price: 29.99, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "summer" },
      { id: 13, name: "Leather Jacket", price: 120.00, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "autumn" },
      { id: 14, name: "Navy Blue Shorts", price: 22.50, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "summer" },
      { id: 15, name: "Classic White T-Shirt", price: 24.99, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "summer" },
      { id: 16, name: "Blue Denim Jacket", price: 59.99, imageUrl: "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg", season: "winter" }
    ];
    setProducts(mockProducts);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  const showMoreProducts = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const filteredProducts =
    filter === 'all'
      ? products
      : products.filter((product) => product.season === filter);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <section id="products" className="text-3xl text-[#484848] font-bold mb-6 text-center">Products</section>

      <div className="flex flex-wrap justify-center gap-10 sm:gap-4 mb-10">
        {['all', 'summer', 'winter', 'spring', 'autumn'].map((season) => (
          <button
            key={season}
            onClick={() => {
              setFilter(season);
              setVisibleCount(8);
            }}
            className={`capitalize px-5 py-2 rounded border transition 
              ${
                filter === season
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
          >
            {season === 'all' ? 'All' : season}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {visibleProducts.map((product) => {
          const isFavorite = favorites.includes(product.id);

          return (
            <div
              key={product.id}
              className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-52 right-3 text-2xl text-red-500 hover:scale-110 transition-transform"
              >
                {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                <p className="text-gray-500 text-sm mb-4">${product.price.toFixed(2)}</p>

                <Link
                  to="/product-details"
                  className="block w-full text-center bg-[#484848] text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-10">
          <button
            onClick={showMoreProducts}
            className="bg-[#484848] text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
