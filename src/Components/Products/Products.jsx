import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getAllProducts } from "../../back/products";
<<<<<<< HEAD
import { toggleFavoriteProduct } from "../../back/auth";
=======
>>>>>>> 35b288d893791333dc1a07037d2a2e39f9eabe0d

const Products = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        // Transform the API data to match the expected format
        // console.log("e" + res);
        const transformedProducts = response.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.variants[0]?.price || 0,
          imageUrl: product.variants[0]?.images[0]?.base64Data?.startsWith(
            "data:"
          )
            ? product.variants[0]?.images[0]?.base64Data
            : `data:image/jpeg;base64,${product.variants[0]?.images[0]?.base64Data}` ||
              "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg",
          season: product.season.toLowerCase(),
          description: product.description,
          variants: product.variants,
        }));
        setProducts(transformedProducts);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const showMoreProducts = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.season === filter);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl text-gray-600">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <section
        id="products"
        className="text-3xl text-[#484848] font-bold mb-6 text-center"
      >
        Products
      </section>

      <div className="flex flex-wrap justify-center gap-10 sm:gap-4 mb-10">
        {["all", "summer", "winter", "spring", "autumn"].map((season) => (
          <button
            key={season}
            onClick={() => {
              setFilter(season);
              setVisibleCount(8);
            }}
            className={`capitalize px-5 py-2 rounded border transition 
              ${
                filter === season
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
          >
            {season === "all" ? "All" : season}
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
                <p className="text-gray-500 text-sm mb-4">
                  ${product.price.toFixed(2)}
                </p>

                <Link
                  to={`/product-details/${product.id}`}
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
