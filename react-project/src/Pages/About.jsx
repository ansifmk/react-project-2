import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-16">
      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          About Apple Store
        </h1>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          At Apple Store, we combine innovation, design, and technology to create 
          products that are both functional and beautiful. Our mission is to make 
          technology intuitive, accessible, and enjoyable for everyone.
        </p>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed">
          We aim to provide an effortless shopping experience with the latest Apple 
          devices and accessories. Customer satisfaction, premium quality, and 
          simplicity are at the core of everything we do.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">Why Shop With Us?</h2>
        <p className="text-gray-700 leading-relaxed">
          Every product is handpicked to ensure top quality, backed by excellent 
          customer support. Whether you're exploring the latest iPhone, Mac, or 
          Apple Watch, our goal is to make your experience seamless and enjoyable.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">Our Values</h2>
        <p className="text-gray-700 leading-relaxed">
          Innovation: We always strive to offer the newest technologies with 
          cutting-edge design.<br />
          Customer Focus: Every decision we make prioritizes the customer experience.<br />
          Integrity: We ensure honesty, transparency, and reliability in all our dealings.<br />
          Sustainability: We are committed to eco-friendly practices and reducing our carbon footprint.<br />
          Excellence: Delivering premium-quality products and exceptional service is our standard.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">Our Commitment</h2>
        <p className="text-gray-700 leading-relaxed">
          We are dedicated to continuously improving the shopping experience for our 
          customers. From product selection to post-purchase support, we ensure that 
          every interaction with Apple Store is smooth, informative, and satisfying.
        </p>
      </div>
    </div>
  );
};

export default About;
