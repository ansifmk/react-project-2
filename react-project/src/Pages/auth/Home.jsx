import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Authcontext";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const categories = [
    { id: 1, name: "Mac", image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-mac-nav-202503?wid=400&hei=260&fmt=png-alpha&.v=M1Q3OGxnb1lBaHhqNjZ2OVRXZmx4VEpBUDFBeEhMZS9GUnNSYXdEd0hscisrUlZaSVRoWVYzU0Qra0FoTmUwNng2bitObzZwQzk4cEorV1dZdzhIazVVcFlOTkdoMWg4ZkdDS1ovMUlzcW8" },
    { id: 2, name: "iPhone", image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-iphone-nav-202509?wid=1200&hei=780&fmt=png-alpha&.v=dW5XbHI1eDVpd01qWUU4bFRtWGZXM1doT212VzJoWjBSKzRpbmNETHN1QnRHU3BERzdnOWdiQkwvWTZGajY2b1M0TjRWdzF2UjRGVEY0c3dBQVZ6VFN0TmdKaCs3NTJMbFVuOGp2LzI5RGc" },
    { id: 3, name: "ipad", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-ipad-nav-202405?wid=400&hei=260&fmt=png-alpha&.v=dW5XbHI1eDVpd01qWUU4bFRtWGZXNGFLQTJVNnlNQmQrVmRBYnZYei9jckUzelNmMnRxajE0NHhmMWtLazl6eG53M0FRZHBXNTh1U1lFVEtSR2YzTm5qbE56RWRpRFNIRXZvbkd2S0l5dTg" },
    { id: 4, name: "Apple Watch", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-watch-nav-202509_GEO_IN?wid=400&hei=260&fmt=png-alpha&.v=S0tSVzBtSkRkSFFhMm1zS1NmeWtkK0gvNGFhODF5SWpidW9tVnFmL2IrcnZGQmhUaHlPN016cFdzNFJtZThkQ2M5THdmR1U4Nmp4b2NFbEg2N21UQzYzZVFZZGtHNUI4c1NvME1xTTYxSzZ1ZUVMek0rc2U0U3QwOE5USS9PYTQ" },
    { id: 5, name: "Airpods", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-airpods-nav-202509?wid=400&hei=260&fmt=png-alpha&.v=Q0Z1bWFqMUpRRnp3T0Y0VWJpdk1yMDhFUStvWHB3SDlDa3VrdUZORWRqeld1aTN5QlRYNG5PRjJxc2d1RklXbVM0TjRWdzF2UjRGVEY0c3dBQVZ6VGZUMjJQZFhhT2thWmkxZjhra3FyZEk" },
    { id: 6, name: "AirTag", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=Q0Z1bWFqMUpRRnp3T0Y0VWJpdk1ydzduWDk4YUM5R1JVL2gwcEZnWWNaRFd1aTN5QlRYNG5PRjJxc2d1RklXbVM0TjRWdzF2UjRGVEY0c3dBQVZ6VFltc1ByWXViNGVYdEdGdkhJbjJoMGs" },
    { id: 7, name: "Case", image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF64_FV401?wid=1420&hei=930&fmt=png-alpha&.v=dVVFczVidTNRR2Vhc0VpQzdRRGpJVUJTMHZrdGM3YVhOamhhQWtVbXVxSEhxZjQyanFrTDN5a241WlpqRHdlVGRncGJrUThpR0RVMzM4ZTVuRkExUUE" },
  ];

  const products = [
    { 
      id: 1, 
      name: "Apple Watch Series 11", 
      price: 29999, 
      image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/watch-card-40-s11-202509_GEO_IN?wid=680&hei=528&fmt=jpeg&qlt=90&.v=RGt6QnVpU0piVDZnRHZnWmNNbHB2NVZ0NEt5THRtSGFqY0t3ckRnOWhiKzJjSW42RjNkUmxsaVhqRzVyUDdYaTE1UUxLT2t0cW42N3FvQzVqaGhrVVdKOHR0K1huZGxiVGxWdmdkNTVhcE4rYWpGdS9XeFgvbS9ITnNYOEhYaG4"
    },
    { 
      id: 2, 
      name: "MacBook Air", 
      price: 89999, 
      image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-card-40-macbook-air-202503?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=dzRRdVl2UHpmd3BrL2dpaGRDY2RKN3dnWXpNRUFSbE1veTFaYXZqWDhWZ2w2T29GWFRmcGlRaHRKa2ZZeG54SDRHeXB5TnVsU3R6Qjd0Y2JzbURyWE56dkQ1M2pkMXloY0FLTkxsc2xNQXArYWpGdS9XeFgvbS9ITnNYOEhYaG4"
    },
    { 
      id: 3, 
      name: "iphone 17 pro & iphone 17 pro Max", 
      price: 45999, 
      image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-card-40-17pro-202509?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=WVVFRzUzVk1oblJhbW9PbGNSU25jaUtlSkZ1cHdCU1J4ZWZjamdoYzhpRkMxQXc4S3pBZE5lUDJlTzVYSUYydFMwV0hhcmdVdXZzZ1NwTlFUaEgwTDc0akx0V0lSSVRoL2tPb3ZabW5DM0k"
    },
    { 
      id: 4, 
      name: "Airpods Max", 
      price: 134999, 
      image: "https://www.apple.com/v/airpods-max/j/images/overview/bento/midnight/bento_1_airpod_max_midnight__4jy1tkqh9qay_medium_2x.jpg"
    },
    { 
      id: 5, 
      name: "iPad Pro", 
      price: 94999, 
      image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-card-40-pro-202405?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=aDFmUE8yL0ZIcG1CVlF3ejZoSTBUbTF4V1ZRMnQ3VUZxOW9XbE84blhkazJzUm9kdjFCbFNETWhUL0NFUjdrYUVnTTR0dy9GMG1wdkgrK3EyQ1ZzOVk5emI2RVlYSVRkMzZLOS9VQVhQeWM"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
     <section className="relative bg-black">
        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src=".\public\large_2x.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h1 className="text-5xl font-light text-gray-900 mb-4">
              Essentials for the way you live
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Welcome back, {user?.name || "Guest"}! Discover the latest Apple innovations.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate("/products")}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                <span className="text-sm font-medium text-gray-900 text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full"
                onClick={() => navigate("/products")}
              >
                <div className="p-4 flex-1 flex flex-col">
                  <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-lg font-semibold text-gray-900">₹{product.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic here
                      }}
                      className="w-full bg-black text-white py-2.5 px-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 Apple Store., Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;