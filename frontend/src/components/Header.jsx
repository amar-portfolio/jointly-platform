'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [selectedStation, setSelectedStation] = useState('Bhayander West');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo & Station Selector */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            Jointly
          </Link>
          <select 
            value={selectedStation} 
            onChange={(e) => setSelectedStation(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Bhayander West">Bhayander West</option>
            <option value="Borivali">Borivali</option>
            <option value="Andheri">Andheri</option>
          </select>
        </div>

        {/* Center / Right: Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-600 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link href="/services" className="hover:text-indigo-600 transition">Services</Link>
          <Link href="/about" className="hover:text-indigo-600 transition">About Us</Link>
          <Link href="/contact" className="hover:text-indigo-600 transition">Contact Us</Link>
          <Link href="/bookings" className="hover:text-indigo-600 transition">My Bookings</Link>
        </nav>

        {/* Far Right Actions: Cart & Auth */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600">
            🛒
            <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Login / Profile Button */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-800">My Account</span>
            </div>
          ) : (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
            >
              Login / Sign In
            </button>
          )}
        </div>

      </div>

      {/* Lazy Login Modal (OTP Popup) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Login with OTP</h3>
            <input 
              type="text" 
              placeholder="Enter Phone Number" 
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => { setIsLoggedIn(true); setIsModalOpen(false); }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}