import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/Authcontext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        setError("Product not found.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Add to Cart
  const addToCart = async () => {
    if (!user) return toast.info("Please login to add items to cart");
    if (!product) return;
    if (product.count === 0) return toast.warning("This product is out of stock");

    try {
      const existingCartItem = user.cart?.find((item) => item.id === product.id);
      const updatedCart = existingCartItem
        ? user.cart.map((item) =>
            item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
          )
        : [...(user.cart || []), { ...product, quantity: 1 }];

      const updatedUser = { ...user, cart: updatedCart };

      await Promise.all([
        axios.put(`http://localhost:3001/users/${user.id}`, updatedUser),
        axios.put(`http://localhost:3001/products/${product.id}`, {
          ...product,
          count: Math.max(0, product.count - 1),
        }),
      ]);

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart. Please try again.");
    }
  };

  // Toggle Wishlist
  const toggleWishlist = async () => {
    if (!user) return toast.info("Please login to use wishlist");
    if (!product) return;

    const isInWishlist = user.wishlist?.some((item) => item.id === product.id);
    const updatedWishlist = isInWishlist
      ? user.wishlist.filter((item) => item.id !== product.id)
      : [...(user.wishlist || []), product];

    const updatedUser = { ...user, wishlist: updatedWishlist };

    try {
      await axios.put(`http://localhost:3001/users/${user.id}`, updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast[isInWishlist ? "warning" : "success"](
        isInWishlist
          ? `${product.name} removed from wishlist`
          : `${product.name} added to wishlist`
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update wishlist. Please try again.");
    }
  };

  // Render rating stars
  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-6 h-6 ${i <= roundedRating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      );
    }
    return stars;
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return null;

  const isInWishlist = user?.wishlist?.some((item) => item.id === product.id);
  const isInCart = user?.cart?.some((item) => item.id === product.id);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="rounded-lg max-h-96 object-contain"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-2">
            ₹{product.price ? product.price.toLocaleString() : "N/A"}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {product.count > 0 ? `${product.count} in stock` : "Out of stock"}
          </p>

          <div className="flex items-center mb-4">{renderStars(product.rating || 0)}</div>

          <div className="flex space-x-4">
            {isInCart ? (
              <button
                onClick={() => navigate("/cart")}
                className="px-6 py-3 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700"
              >
                Go to Cart
              </button>
            ) : (
              <button
                onClick={addToCart}
                disabled={product.count === 0}
                className={`px-6 py-3 rounded-lg font-medium ${
                  product.count === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {product.count === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            )}

            <button
              onClick={toggleWishlist}
              className={`px-6 py-3 rounded-lg font-medium ${
                isInWishlist
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist ♡"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
