import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';


const MacProducts = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  

  const categories = ['All', 'MacBook Air', 'MacBook Pro', 'iMac', 'Mac mini', 'Mac Studio', 'Mac Pro'];

  const macProducts = [
    {
      id: 1,
      name: 'MacBook Air 13"',
      category: 'MacBook Air',
      price: 114900,
      originalPrice: 129900,
      chip: 'Apple M3 chip',
      display: '13.6-inch Liquid Retina',
      memory: '8GB unified memory',
      storage: '256GB SSD',
      colors: ['Space Grey', 'Silver', 'Starlight', 'Midnight'],
      image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-13-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=MTY1ODUzODIzNg',
      features: ['All-day battery life', 'Silent fanless design', 'MagSafe charging']
    },
    {
      id: 2,
      name: 'MacBook Air 15"',
      category: 'MacBook Air',
      price: 134900,
      originalPrice: 149900,
      chip: 'Apple M3 chip',
      display: '15.3-inch Liquid Retina',
      memory: '8GB unified memory',
      storage: '256GB SSD',
      colors: ['Space Grey', 'Silver', 'Starlight', 'Midnight'],
      image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-15-midnight-select-20230606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=MTY4NzU0NDI4Mw',
      features: ['15.3-inch display', 'All-day battery', 'Silent fanless design']
    },
    {
      id: 3,
      name: 'MacBook Pro 14"',
      category: 'MacBook Pro',
      price: 199900,
      originalPrice: 219900,
      chip: 'Apple M4 Pro chip',
      display: '14.2-inch Liquid Retina XDR',
      memory: '18GB unified memory',
      storage: '512GB SSD',
      colors: ['Space Black', 'Silver'],
      image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=MTY5NzEyMDQ4MQ',
      features: ['Liquid Retina XDR display', 'ProRes video recording', 'Advanced connectivity']
    },
    {
      id: 4,
      name: 'MacBook Pro 16"',
      category: 'MacBook Pro',
      price: 249900,
      originalPrice: 279900,
      chip: 'Apple M4 Pro chip',
      display: '16.2-inch Liquid Retina XDR',
      memory: '18GB unified memory',
      storage: '512GB SSD',
      colors: ['Space Black', 'Silver'],
      image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp16-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=MTY5NzEyMDQ4Mg',
      features: ['Largest Retina display', 'Longest battery life', 'Most ports']
    },
    {
      id: 5,
      name: 'iMac 24"',
      category: 'iMac',
      price: 134900,
      originalPrice: 149900,
      chip: 'Apple M3 chip',
      display: '24-inch 4.5K Retina',
      memory: '8GB unified memory',
      storage: '256GB SSD',
      colors: ['Blue', 'Green', 'Pink', 'Silver', 'Yellow', 'Orange', 'Purple'],
      image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=90&.v=MTYxNzIzMDQzNA',
      features: ['4.5K Retina display', 'Vibrant colors', 'All-in-one design']
    },
    {
      id: 6,
      name: 'Mac mini',
      category: 'Mac mini',
      price: 59900,
      originalPrice: 69900,
      chip: 'Apple M2 chip',
      display: 'Connect your own',
      memory: '8GB unified memory',
      storage: '256GB SSD',
      colors: ['Space Grey'],
      image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-mini-hero-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=MTY3MzQ3MzIzMw',
      features: ['Compact design', 'Versatile connectivity', 'Pro performance']
    },
    {
      id: 7,
      name: 'Mac Studio',
      category: 'Mac Studio',
      price: 199900,
      originalPrice: 219900,
      chip: 'Apple M2 Max',
      display: 'Connect your own',
      memory: '32GB unified memory',
      storage: '512GB SSD',
      colors: ['Silver'],
      image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-studio-select-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=MTY4NTEyMDYzMw',
      features: ['Pro performance', 'Advanced connectivity', 'Quiet operation']
    },
    {
      id: 8,
      name: 'Mac Pro',
      category: 'Mac Pro',
      price: 699900,
      originalPrice: 799900,
      chip: 'Apple M2 Ultra',
      display: 'Connect your own',
      memory: '64GB unified memory',
      storage: '1TB SSD',
      colors: ['Silver'],
      image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-pro-hero-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=MTY4NTEyMDYzNA',
      features: ['Ultimate performance', 'PCIe expansion', 'Pro workflows']
    }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? macProducts 
    : macProducts.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    // Add to cart logic here
    console.log('Added to cart:', product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 mb-6">Mac</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            If you can dream it, Mac can do it.
          </p>
          <div className="relative">
            <video
              className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src=".\public\x4fa4f3ce9_large.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 h-80">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.chip}</p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-lg text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Specs */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Display:</span>
                      <span className="text-gray-900 font-medium">{product.display}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Memory:</span>
                      <span className="text-gray-900 font-medium">{product.memory}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Storage:</span>
                      <span className="text-gray-900 font-medium">{product.storage}</span>
                    </div>
                  </div>

                  {/* Colors */}
                  {product.colors.length > 1 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Available colors:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.slice(0, 4).map((color, index) => (
                          <div
                            key={index}
                            className={`w-6 h-6 rounded-full border-2 border-gray-300 ${
                              color === 'Space Grey' || color === 'Space Black' ? 'bg-gray-800' :
                              color === 'Silver' ? 'bg-gray-300' :
                              color === 'Gold' ? 'bg-yellow-400' :
                              color === 'Starlight' ? 'bg-yellow-100' :
                              color === 'Midnight' ? 'bg-blue-900' :
                              color === 'Blue' ? 'bg-blue-500' :
                              color === 'Green' ? 'bg-green-500' :
                              color === 'Pink' ? 'bg-pink-400' :
                              color === 'Yellow' ? 'bg-yellow-400' :
                              color === 'Orange' ? 'bg-orange-500' :
                              color === 'Purple' ? 'bg-purple-500' : 'bg-gray-400'
                            }`}
                            title={color}
                          />
                        ))}
                        {product.colors.length > 4 && (
                          <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Key Features */}
                  <div className="mb-6">
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full font-semibold transition-colors shadow-md hover:shadow-lg"
                    >
                      Add to Cart
                    </button>
                    <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-4 rounded-full font-semibold transition-all">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-8">
            Compare Mac models
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Find the Mac that's perfect for the way you work, play, and create.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
            Compare all Mac models
          </button>
        </div>
      </section>

      {/* Why Mac Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 text-center mb-16">
            Why Mac
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy to use</h3>
              <p className="text-gray-600">Mac is designed to be simple and intuitive. Everything you need is right where you expect it to be.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Works with all your devices</h3>
              <p className="text-gray-600">Mac works seamlessly with your iPhone, iPad, Apple Watch, and other Apple devices.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Powerful and efficient</h3>
              <p className="text-gray-600">Apple silicon delivers incredible performance while maintaining all-day battery life.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MacProducts;