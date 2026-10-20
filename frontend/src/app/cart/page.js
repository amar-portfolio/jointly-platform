'use client';
import { useState } from 'react';
import Link from 'next/link';
// Modal import kela aahe (path neat bagh)
import LoginModal from '../../components/LoginModal'; 

export default function CartPage() {
  // 1. DUMMY STATE: Cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Foam-jet AC Service",
      type: "Group Buy",
      price: 399,
      originalPrice: 799,
      society: "Lodha Amara, Thane"
    }
  ]);

  // 2. DUMMY STATE: User logged in ahe ki nahi
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 3. NEW STATE: Modal open/close handle karnyasaathi
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Calculations for billing
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const savings = cartItems.reduce((acc, item) => acc + (item.originalPrice - item.price), 0);
  const platformFee = 49;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        
        /* ================= EMPTY CART STATE ================= */
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm max-w-2xl mx-auto">
          <span className="text-6xl mb-4 block opacity-50">🛒</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 font-medium">Looks like you haven't added any home services yet.</p>
          
          {/* Login / Sign up buttons if user is not logged in */}
          {!isLoggedIn && (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => setIsLoginModalOpen(true)} // Click event add kela
                className="bg-black text-white px-8 py-3.5 rounded-lg font-bold hover:bg-gray-800 transition"
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsLoginModalOpen(true)} // Click event add kela
                className="border-2 border-gray-300 text-gray-900 px-8 py-3.5 rounded-lg font-bold hover:border-black transition"
              >
                Sign Up
              </button>
            </div>
          )}
          
          <div className="mt-8">
            <Link href="/" className="text-indigo-600 font-semibold hover:underline">
              Explore Services
            </Link>
          </div>
        </div>

      ) : (

        /* ================= FILLED CART STATE ================= */
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {item.type}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">📍 {item.society}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-black text-black">₹{item.price}</div>
                  <div className="text-sm text-gray-400 line-through">₹{item.originalPrice}</div>
                  <button 
                    onClick={() => setCartItems([])} 
                    className="text-red-500 text-sm font-semibold hover:underline mt-1 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Checkout */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Summary</h2>
              
              <div className="space-y-3 text-sm font-medium text-gray-600 mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span className="text-gray-900">₹{subtotal + savings}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Group Buy Discount</span>
                  <span>- ₹{savings}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fee</span>
                  <span className="text-gray-900">₹{platformFee}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-black text-gray-900 mb-6">
                <span>Total to Pay</span>
                <span>₹{subtotal + platformFee}</span>
              </div>

              {/* Conditional Checkout Buttons */}
              {isLoggedIn ? (
                <button className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition shadow-md">
                  Proceed to Checkout
                </button>
              ) : (
                <div className="space-y-3">
                  <button 
                    onClick={() => setIsLoginModalOpen(true)} // Click event add kela
                    className="w-full bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition"
                  >
                    Login to Checkout
                  </button>
                  <button 
                    onClick={() => setIsLoginModalOpen(true)} // Click event add kela
                    className="w-full border-2 border-gray-300 text-gray-900 py-3.5 rounded-lg font-bold hover:border-black transition"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Login Modal render kela */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      
    </div>
  );
}