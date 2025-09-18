import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Authcontext";

const Apple = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Hero Video Section - iPhone */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="relative h-screen flex items-center justify-center">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://www.youtube.com/embed/_-AS5DtDeqs?start=75&autoplay=1&mute=1&loop=1&playlist=_-AS5DtDeqs"
              type="video/mp4"
            />
          </video>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-semibold mb-4">iPhone 17 Pro</h1>
            <p className="text-xl md:text-2xl mb-8">Hello, Apple Intelligence.</p>
            <div className="space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
                Learn more
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full font-medium transition-colors">
                Buy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* iPhone 16 Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold text-black mb-4">iPhone 17</h2>
          <p className="text-xl text-gray-600 mb-8">Built for Apple Intelligence.</p>
          <div className="space-x-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium">
              Learn more
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full font-medium">
              Buy
            </button>
          </div>
          <div className="h-96 bg-gradient-to-b from-blue-50 to-white rounded-3xl flex items-center justify-center overflow-hidden">
            <video
              className="max-h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://www.apple.com/105/media/us/iphone-16/2024/34cd2148-2841-4724-8b05-0156cd6ddc42/anim/hero/large_2x.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>

      {/* Apple Watch Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold mb-4">Apple Watch Series 10</h2>
          <p className="text-xl text-gray-300 mb-8">Thinstant classic.</p>
          <div className="space-x-4 mb-12">
            <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100">
              Learn more
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-full font-medium">
              Buy
            </button>
          </div>
          <div className="h-96 flex items-center justify-center">
            <video
              className="max-h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://www.apple.com/105/media/us/apple-watch-series-10/2024/1c8a5dd6-2310-4b65-bb44-cb7c33ab7e24/anim/hero/large_2x.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>

      {/* MacBook Air Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold text-black mb-4">MacBook Air</h2>
          <p className="text-xl text-gray-600 mb-8">Designed to go places.</p>
          <div className="space-x-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium">
              Learn more
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full font-medium">
              Buy
            </button>
          </div>
          <div className="h-96 flex items-center justify-center">
            <video
              className="max-h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://www.apple.com/105/media/us/macbook-air/2024/d9d26e24-de2e-4e38-8429-7c8b5dd6e0ca/anim/hero/large_2x.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>

      {/* Two Column Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* iPad Section */}
            <div className="bg-gray-50 rounded-3xl p-8 text-center">
              <h3 className="text-3xl md:text-4xl font-semibold text-black mb-4">iPad</h3>
              <p className="text-lg text-gray-600 mb-6">Lovable. Drawable. Magical.</p>
              <div className="space-x-4 mb-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium">
                  Learn more
                </button>
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full font-medium">
                  Buy
                </button>
              </div>
              <div className="h-64 overflow-hidden rounded-2xl">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="https://www.apple.com/105/media/us/ipad/2024/8d4e0e90-8fa6-411a-aa19-fcb70aca0012/anim/hero/large_2x.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>

            {/* AirPods Section */}
            <div className="bg-black rounded-3xl p-8 text-center text-white">
              <h3 className="text-3xl md:text-4xl font-semibold mb-4">AirPods 4</h3>
              <p className="text-lg text-gray-300 mb-6">Iconic. Now supersonic.</p>
              <div className="space-x-4 mb-8">
                <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100">
                  Learn more
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-full font-medium">
                  Buy
                </button>
              </div>
              <div className="h-64 overflow-hidden rounded-2xl">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="https://www.apple.com/105/media/us/airpods-4/2024/526e213f-2d24-49a7-9c89-e1dd01b1bf17/anim/hero/large_2x.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Four Column Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Apple TV+ */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-center text-white">
              <div className="h-8 mb-4 flex justify-center">
                <svg className="h-full text-white" viewBox="0 0 100 20" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
              <p className="text-sm mb-4">Get 3 months of Apple TV+ free when you buy an Apple device.</p>
              <button className="text-white hover:underline font-medium mb-4">Try it free</button>
              <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold">TV+</span>
              </div>
            </div>

            {/* Apple Card */}
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl p-6 text-center text-white">
              <h4 className="text-lg font-semibold mb-2">Apple Card</h4>
              <p className="text-sm text-gray-300 mb-4">Get up to 3% Daily Cash back with every purchase.</p>
              <button className="text-white hover:underline font-medium mb-4">Learn more</button>
              <div className="h-32 flex items-center justify-center">
                <div className="w-20 h-12 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-lg shadow-lg transform rotate-12"></div>
              </div>
            </div>

            {/* Apple Music */}
            <div className="bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 rounded-3xl p-6 text-center text-white">
              <h4 className="text-lg font-semibold mb-2">Apple Music</h4>
              <p className="text-sm mb-4">Over 100 million songs. Try it free.</p>
              <button className="text-white hover:underline font-medium mb-4">Try it free</button>
              <div className="h-32 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-white bg-opacity-20 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>

            {/* Apple Arcade */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-center text-white">
              <h4 className="text-lg font-semibold mb-2">Apple Arcade</h4>
              <p className="text-sm mb-4">Over 200 games. No ads. No in-app purchases.</p>
              <button className="text-white hover:underline font-medium mb-4">Try it free</button>
              <div className="h-32 flex items-center justify-center">
                <div className="relative">
                  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-30 rounded-full"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            
            <div>
              <h5 className="font-semibold text-black mb-4">Shop and Learn</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black">Mac</a></li>
                <li><a href="#" className="hover:text-black">iPad</a></li>
                <li><a href="#" className="hover:text-black">iPhone</a></li>
                <li><a href="#" className="hover:text-black">Watch</a></li>
                <li><a href="#" className="hover:text-black">AirPods</a></li>
                <li><a href="#" className="hover:text-black">TV & Home</a></li>
                <li><a href="#" className="hover:text-black">Accessories</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-black mb-4">Apple Wallet</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black">Wallet</a></li>
                <li><a href="#" className="hover:text-black">Apple Card</a></li>
                <li><a href="#" className="hover:text-black">Apple Pay</a></li>
                <li><a href="#" className="hover:text-black">Apple Cash</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-black mb-4">Account</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black">Manage Your Apple ID</a></li>
                <li><a href="#" className="hover:text-black">Apple Store Account</a></li>
                <li><a href="#" className="hover:text-black">iCloud.com</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-black mb-4">Entertainment</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black">Apple One</a></li>
                <li><a href="#" className="hover:text-black">Apple TV+</a></li>
                <li><a href="#" className="hover:text-black">Apple Music</a></li>
                <li><a href="#" className="hover:text-black">Apple Arcade</a></li>
                <li><a href="#" className="hover:text-black">Apple Fitness+</a></li>
                <li><a href="#" className="hover:text-black">Apple News+</a></li>
                <li><a href="#" className="hover:text-black">Apple Podcasts</a></li>
                <li><a href="#" className="hover:text-black">Apple Books</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-black mb-4">Apple Store</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black">Find a Store</a></li>
                <li><a href="#" className="hover:text-black">Genius Bar</a></li>
                <li><a href="#" className="hover:text-black">Today at Apple</a></li>
                <li><a href="#" className="hover:text-black">Apple Camp</a></li>
                <li><a href="#" className="hover:text-black">Apple Store App</a></li>
                <li><a href="#" className="hover:text-black">Certified Refurbished</a></li>
                <li><a href="#" className="hover:text-black">Apple Trade In</a></li>
                <li><a href="#" className="hover:text-black">Financing</a></li>
                <li><a href="#" className="hover:text-black">Carrier Deals at Apple</a></li>
                <li><a href="#" className="hover:text-black">Order Status</a></li>
                <li><a href="#" className="hover:text-black">Shopping Help</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 mb-4 md:mb-0">
                Copyright © 2025 Apple Inc. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-gray-600">
                <a href="#" className="hover:text-black">Privacy Policy</a>
                <a href="#" className="hover:text-black">Terms of Use</a>
                <a href="#" className="hover:text-black">Sales and Refunds</a>
                <a href="#" className="hover:text-black">Legal</a>
                <a href="#" className="hover:text-black">Site Map</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Apple;