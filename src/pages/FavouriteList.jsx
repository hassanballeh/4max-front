import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getAllProducts } from "../back/products";
import { toggleFavoriteProduct, getUserInfo } from "../back/auth";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const ITEMS_PER_LOAD = 1;
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [visibleCount, setVisibleCount] = useState(
    localStorage.getItem("visibleCountF") != null
      ? localStorage.getItem("visibleCountF") + ITEMS_PER_LOAD
      : 6
  );
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();

        if (token) {
          const userInfo = await getUserInfo();
          if (userInfo?.data?.toggleFavoriteProduct) {
            setFavorites(userInfo.data.toggleFavoriteProduct);
          }
        }

        const transformedProducts = response.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.variants[0]?.price || 0,
          imageUrl: product.variants[0]?.images[0]?.base64Data?.startsWith(
            "data:"
          )
            ? product.variants[0]?.images[0]?.base64Data
            : product.variants[0]?.images[0]?.base64Data
            ? `data:image/jpeg;base64,${product.variants[0]?.images[0]?.base64Data}`
            : "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg",
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
  }, [token]);

  const toggleFavorite = async (id) => {
    try {
      const productIdStr = id.toString();
      setFavorites((prev) =>
        prev.includes(productIdStr)
          ? prev.filter((favId) => favId !== productIdStr)
          : [...prev, productIdStr]
      );

      await toggleFavoriteProduct(id);
    } catch (error) {
      const productIdStr = id.toString();
      setFavorites((prev) =>
        prev.includes(productIdStr)
          ? prev.filter((favId) => favId !== productIdStr)
          : [...prev, productIdStr]
      );
      console.error("Failed to toggle favorite:", error);
      alert("Failed to update favorite. Please try again.");
    }
  };

  const showMoreProducts = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      localStorage.setItem("visibleCountF", visibleCount);
      setLoadingMore(false);
    }, 300);
  };

  let favoritesLis = products.filter((product) =>
    favorites.includes(product.id.toString())
  );
  console.log(favoritesLis);
  const visibleProducts = favoritesLis.slice(0, visibleCount);

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
        Your Favorite Products
      </section>

      {/* No favorites state */}
      {favoritesLis.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-24 h-24 mb-6 text-gray-300">
            <AiOutlineHeart className="w-full h-full" />
          </div>
          <h2 className="text-2xl text-gray-600 mb-4">No Favorites Yet</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            You haven't added any products to your favorites yet. Start
            exploring our collection and save the items you love!
          </p>
          <Link
            to="/products"
            className="bg-[#484848] text-white px-8 py-3 rounded-xl hover:bg-gray-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {visibleProducts.map((product) => {
              const isFavorite = favorites.includes(product.id.toString());
              if (!isFavorite) return;
              return (
                <div
                  key={product.id}
                  className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "bannerPhoto/photo_1_2025-07-16_23-09-20.jpg";
                    }}
                  />

                  {token && (
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-52 right-3 text-2xl text-red-500 hover:scale-110 transition-transform cursor-pointer"
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>
                  )}

                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-1">
                      {product.name}
                    </h2>
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

          {visibleCount < favoritesLis.length && (
            <div className="text-center mt-10">
              <button
                onClick={showMoreProducts}
                disabled={loadingMore}
                className={`px-6 py-2 rounded-xl transition cursor-pointer ${
                  loadingMore
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#484848] text-white hover:bg-gray-700"
                }`}
              >
                {loadingMore ? "Loading..." : "Show More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
