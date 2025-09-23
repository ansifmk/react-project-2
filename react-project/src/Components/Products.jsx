import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Authcontext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesFilter = true;

    if (filter.startsWith("category:")) {
      const category = filter.split(":")[1];
      matchesFilter = product.category === category;
    } else if (filter.startsWith("price:")) {
      const [min, max] = filter.split(":")[1].split("-").map(Number);
      if (max) {
        matchesFilter = product.price >= min && product.price <= max;
      } else {
        matchesFilter = product.price >= min;
      }
    }

    return matchesSearch && matchesFilter;
  });

  // Handlers
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const toggleWishlist = async (productId, e) => {
    e.stopPropagation();
    if (!user) return toast.info("Please login to add items to wishlist");

    try {
      const isInWishlist = user.wishlist?.some((item) => item.id === productId);
      let updatedWishlist;
      let productName;

      if (isInWishlist) {
        const removedProduct = user.wishlist.find((item) => item.id === productId);
        productName = removedProduct?.name || "Product";
        updatedWishlist = user.wishlist.filter((item) => item.id !== productId);
      } else {
        const productToAdd = products.find((product) => product.id === productId);
        productName = productToAdd?.name || "Product";
        updatedWishlist = [...(user.wishlist || []), productToAdd];
      }

      // Only update wishlist in backend
      await axios.patch(`http://localhost:3001/users/${user.id}`, {
        wishlist: updatedWishlist,
      });

      const updatedUser = { ...user, wishlist: updatedWishlist };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast[isInWishlist ? "warning" : "success"](
        isInWishlist
          ? `${productName} removed from wishlist`
          : `${productName} added to wishlist`
      );
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error("Failed to update wishlist. Please try again.");
    }
  };

  const addToCart = async (product, e) => {
    e.stopPropagation();
    if (!user) return toast.info("Please login to add items to cart");
    if (product.count === 0) return toast.warning("This product is out of stock");

    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));

    try {
      // Update cart only
      const existingCartItem = user.cart?.find((item) => item.id === product.id);
      const updatedCart = existingCartItem
        ? user.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          )
        : [...(user.cart || []), { ...product, quantity: 1 }];

      // Update products count locally
      const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, count: Math.max(0, p.count - 1) } : p
      );

      // Only send cart to backend, leave orders untouched
      await axios.patch(`http://localhost:3001/users/${user.id}`, {
        cart: updatedCart,
      });

      await axios.patch(`http://localhost:3001/products/${product.id}`, {
        count: Math.max(0, product.count - 1),
      });

      const updatedUser = { ...user, cart: updatedCart };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setProducts(updatedProducts);

      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hero */}
      <section
        className="bg-white py-16 shadow-sm relative"
        style={{
          backgroundImage: "url('/hero_endframe__xdzisdq1ppem_xlarge_2x.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px",
        }}
      >
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center py-8">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              All Products
            </h1>
            <p className="text-lg text-gray-600">
              Explore our complete range of Apple products
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {filteredProducts.length} products available
            </p>

            <div className="w-full max-w-2xl mx-auto mt-8">
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full px-4 py-3 bg-white rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex justify-center mt-6">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Products</option>
                <optgroup label="Category">
                  <option value="category:Smartphone">iPhone</option>
                  <option value="category:Laptop">MacBook</option>
                  <option value="category:Headphones">AirPods Max</option>
                  <option value="category:Smartwatch">Apple Watch</option>
                  <option value="category:Earbuds">AirPods</option>
                </optgroup>
                <optgroup label="Price Range">
                  <option value="price:0-50000">₹0 - ₹50,000</option>
                  <option value="price:50001-100000">₹50,001 - ₹1,00,000</option>
                  <option value="price:100001-150000">₹1,00,001 - ₹1,50,000</option>
                  <option value="price:150001-200000">₹1,50,001+</option>
                </optgroup>
                <option value="">Clear All Filters</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found.</p>
              {filter || searchTerm ? (
                <button
                  onClick={() => {
                    setFilter("");
                    setSearchTerm("");
                  }}
                  className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  Clear Filters
                </button>
              ) : null}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const isInWishlist = user?.wishlist?.some(
                  (item) => item.id === product.id
                );
                const isInCart = user?.cart?.some(
                  (item) => item.id === product.id
                );

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col relative"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white shadow z-10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${
                          isInWishlist
                            ? "text-red-500 fill-current"
                            : "text-gray-400"
                        }`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={product.images?.[0] || "/placeholder-image.jpg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) =>
                            (e.target.src = "/placeholder-image.jpg")
                          }
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              {product.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {product.count > 0
                                ? `${product.count} in stock`
                                : "Out of stock"}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            ₹{product.price.toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isInCart) {
                              navigate("/cart");
                            } else {
                              addToCart(product, e);
                            }
                          }}
                          disabled={
                            product.count === 0 ||
                            !product.isActive ||
                            addingToCart[product.id]
                          }
                          className={`w-full py-2.5 px-4 rounded-full text-sm font-medium transition-colors ${
                            product.count === 0 || !product.isActive
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : isInCart
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-black text-white hover:bg-gray-800"
                          }`}
                        >
                          {addingToCart[product.id]
                            ? "Adding..."
                            : isInCart
                            ? "Go to Cart"
                            : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
