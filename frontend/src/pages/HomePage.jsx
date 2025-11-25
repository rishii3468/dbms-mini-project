import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const AgriConnect = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  console.log("Email from location state:", user?.username);

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center">
              <div className="text-green-600 text-xl font-bold flex items-center">
                <span className="mr-2">🌱</span> AgriMitra
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/marketplace" className="text-gray-700 hover:text-green-600 transition-colors">Marketplace</Link>
              <Link to="/equipment" className="text-gray-700 hover:text-green-600 transition-colors">Equipment</Link>
              <Link to="/community-notes" className="text-gray-700 hover:text-green-600 transition-colors">Community</Link>
              <Link to="/knowledge" className="text-gray-700 hover:text-green-600 transition-colors">Knowledge</Link>
              <Link to="/contract-farming" className="text-gray-700 hover:text-green-600 transition-colors">Contract Farming</Link>
              <Link to="/contact-us" className="text-gray-700 hover:text-green-600 transition-colors">Contact Us</Link>
              <Link to="/about-us" className="text-gray-700 hover:text-green-600 transition-colors">About Us</Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">

              {user ? (
                <div className="flex items-center space-x-4">
                  {/* Profile Icon + Hover Username */}
                  <div className="relative group">
                    <div className="w-9 h-9 flex items-center justify-center bg-green-600 text-white rounded-full font-semibold uppercase cursor-pointer">
                      {user?.username?.charAt(0)}
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {user?.username}
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.reload();
                    }}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                  >
                    Logout
                  </button>
                </div>


              ) : (
                <>
                  <Link to="/login">
                    <button className="text-gray-700 hover:text-green-600 hidden sm:block transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 hidden sm:block transition-colors">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}

              {/* Hamburger */}
              <button
                className="md:hidden text-gray-700 p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/marketplace" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors">Marketplace</Link>
              <Link to="/equipment" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors">Equipment</Link>
              <Link to="/community-notes" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors">Community</Link>
              <Link to="/knowledge" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors">Knowledge</Link>
              <Link to="/contact-us" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors">Contact Us</Link>
              <Link to="/about-us" className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors">About Us</Link>
              <div className="pt-4 border-t border-gray-200 mt-4">

                <Link to="/login">
                  <button className="w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors mb-2">Login</button>
                </Link>
                <Link to="/register">
                  <button className="w-full bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors mb-3">Sign Up</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-700 to-green-600"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed"
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center min-h-[500px] md:min-h-[600px] lg:min-h-screen">
          <div className="text-white max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Fair Trade,<br />
              <span className="text-yellow-400">Smart Farming</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              Connecting farmers and buyers for transparent pricing, shared resources, and sustainable agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to='/marketplace'>
                <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-green-600 transition-all duration-300 font-semibold">
                  Explore Marketplace
                </button>
              </Link>
              <Link to='/commodity-prices'>
                <button className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-all duration-300 font-semibold">
                  Real Time Market Price
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">How AgriMitra Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Simple, transparent and farmer-friendly platform designed for the modern agriculture ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            <Link to="/marketplace">
              <div className="text-center bg-white p-6 md:p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sell Produce</h3>
                <p className="text-gray-600 text-sm">
                  List your crops directly to buyers at fair market prices.
                </p>
              </div>
            </Link>
            <Link to="/commodity-prices">
              <div className="text-center bg-white p-6 md:p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 11V7a4 4 0 00-8 0v4m16 0v-4a4 4 0 00-8 0v4m5 9H7a2 2 0 01-2-2v-5a5 5 0 0110 0v5a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Time Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Get up-to-date market insights and crop analytics.
                </p>
              </div>
            </Link>
            <Link to="/equipment">
              <div className="text-center bg-white p-6 md:p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10l1 4H6l1-4z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rent Equipment</h3>
                <p className="text-gray-600 text-sm">
                  Access modern farming equipment when you need it.
                </p>
              </div>
            </Link>

            <Link to="/contract-farming">
              <div className="text-center bg-white p-6 md:p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6l4 2M5 13a7 7 0 0114 0v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Contract Farming
                </h3>
                <p className="text-gray-600 text-sm">
                  Partner with farmers for efficient crop production.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>


      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="sm:col-span-2 lg:col-span-1">
              <div className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🌱</span> AgriMitra
              </div>
              <p className="text-gray-300 text-sm mb-4 max-w-xs">
                Empowering farmers through technology and fair trade practices.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/equipment" className="hover:text-white transition-colors">Equipment</Link></li>
                <li><Link to="/community-notes" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link to="/knowledge" className="hover:text-white transition-colors">Knowledge Hub</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link to="/about-us" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact-us"><p className="hover:text-white transition-colors">Contact Us</p></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 AgriMitra. Built for farmers
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgriConnect;
