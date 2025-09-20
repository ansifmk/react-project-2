import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [addingToCart, setAddingToCart] = useState({}); // Track which products are being added to cart
  const navigate = useNavigate();

  // Fetch current user (you'll need to implement authentication context or get current user ID)
  useEffect(() => {
    // In a real app, you would get the current user from your authentication context
    // For this example, I'll assume we're using the first user as the current user
    // You should replace this with your actual authentication logic
    axios
      .get("http://localhost:3001/users/186f") // Replace with current user ID
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

  // fetch products with axios
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

  const toggleWishlist = async (productId, e) => {
    e.stopPropagation();
    
    if (!user) {
      // Redirect to login or show message
      alert("Please login to add items to wishlist");
      return;
    }

    try {
      const isInWishlist = user.wishlist.some(item => item.id === productId);
      let updatedWishlist;
      
      if (isInWishlist) {
        // Remove from wishlist
        updatedWishlist = user.wishlist.filter(item => item.id !== productId);
      } else {
        // Add to wishlist
        const productToAdd = products.find(product => product.id === productId);
        updatedWishlist = [...user.wishlist, productToAdd];
      }
      
      // Update user in the database
      const updatedUser = { ...user, wishlist: updatedWishlist };
      await axios.put(`http://localhost:3001/users/${user.id}`, updatedUser);
      
      // Update local state
      setUser(updatedUser);
    } catch (err) {
      console.error("Error updating wishlist:", err);
      alert("Failed to update wishlist. Please try again.");
    }
  };

  const addToCart = async (product, e) => {
    e.stopPropagation();
    
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    // Check if product is in stock
    if (product.count === 0) {
      alert("This product is out of stock");
      return;
    }

    setAddingToCart(prev => ({ ...prev, [product.id]: true }));

    try {
      // Check if product already exists in cart
      const existingCartItem = user.cart.find(item => item.id === product.id);
      let updatedCart;
      
      if (existingCartItem) {
        // If product exists, increase quantity (you might want to add a quantity field)
        updatedCart = user.cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      } else {
        // Add new product to cart with quantity
        updatedCart = [...user.cart, { ...product, quantity: 1 }];
      }
      
      // Decrease product count in database
      const updatedProducts = products.map(p => 
        p.id === product.id 
          ? { ...p, count: Math.max(0, p.count - 1) } 
          : p
      );
      
      // Update user's cart
      const updatedUser = { ...user, cart: updatedCart };
      
      // Update both user and products in the database
      await Promise.all([
        axios.put(`http://localhost:3001/users/${user.id}`, updatedUser),
        axios.put(`http://localhost:3001/products/${product.id}`, {
          ...product,
          count: Math.max(0, product.count - 1)
        })
      ]);
      
      // Update local state
      setUser(updatedUser);
      setProducts(updatedProducts);
      
      // Show success message
      alert(`${product.name} added to cart!`);
      
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
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
      {/* Header with background image */}
      <section
        className="bg-white py-16 shadow-sm relative"
        style={{
          backgroundImage: "url('/hero_endframe__xdzisdq1ppem_xlarge_2x.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "300px",
        }}
      >
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              All Products
            </h1>
            <p className="text-lg text-gray-600">
              Explore our complete range of Apple products
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {products.length} products available
            </p>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const isInWishlist = user?.wishlist?.some(item => item.id === product.id);
                const isInCart = user?.cart?.some(item => item.id === product.id);
                
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full relative"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {/* Luxury wishlist button */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors z-10 shadow-lg"
                      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${isInWishlist ? "text-rose-500 fill-current" : "text-gray-400"}`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        {isInWishlist && (
                          <path 
                            fill="currentColor" 
                            d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z" 
                            className="text-white"
                          />
                        )}
                      </svg>
                    </button>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={
                            product.images && product.images[0]
                              ? product.images[0]
                              : "/placeholder-image.jpg"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "/placeholder-image.jpg";
                          }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
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
                            if (isInCart) {
                              navigate("/cart");
                            } else {
                              addToCart(product, e);
                            }
                          }}
                          disabled={product.count === 0 || !product.isActive || addingToCart[product.id]}
                          className={`w-full py-2.5 px-4 rounded-full text-sm font-medium transition-colors flex items-center justify-center ${
                            product.count === 0 || !product.isActive
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : isInCart
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-black text-white hover:bg-gray-800"
                          }`}
                        >
                          {addingToCart[product.id] ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Adding...
                            </>
                          ) : isInCart ? (
                            "Go to Cart"
                          ) : product.count === 0 ? (
                            "Out of Stock"
                          ) : (
                            "Add to Cart"
                          )}
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