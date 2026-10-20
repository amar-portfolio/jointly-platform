'use client';
import Link from 'next/link';
import { useState } from 'react';
import LoginModal from './LoginModal';

export default function Header() {
  // Modal state
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-6">
          
          {/* 1. Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-black text-white font-bold text-xl px-2 py-1 rounded">JT</div>
              <span className="text-2xl font-bold text-black tracking-tight hidden lg:block">
                Jointly
              </span>
            </Link>
          </div>

          {/* 2. Navigation Links */}
          <nav className="hidden xl:flex items-center gap-8 text-gray-700 font-medium text-base">
            <Link href="/" className="hover:text-black transition">Home page</Link>
            <Link href="/about" className="hover:text-black transition">About us</Link>
            <Link href="/contact" className="hover:text-black transition">Contact us</Link>
          </nav>

          {/* 3. Search Bars */}
          <div className="flex-1 flex items-center gap-4 max-w-3xl ml-auto mr-auto">
            <div className="hidden md:flex flex-1 items-center border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus-within:border-black transition cursor-text">
              <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input type="text" placeholder="Building name or pincode" className="w-full text-sm outline-none bg-transparent text-gray-900 placeholder-gray-500"/>
              <svg className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>

            <div className="flex-[1.5] flex items-center border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus-within:border-black transition cursor-text">
              <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search for services" className="w-full text-sm outline-none bg-transparent text-gray-900 placeholder-gray-500"/>
            </div>
          </div>

          {/* 4. Actions (Cart & Login) */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <Link href="/cart" className="text-black hover:text-gray-600 transition flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </Link>
            
            {/* Button click zalyavar Modal open hoil */}
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="text-black hover:text-gray-600 transition flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Modal Component Mount */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>
  );
}