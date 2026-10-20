'use client';
import { useState } from 'react';

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl animate-fade-in-up relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            {step === 'phone' ? 'Login or Sign up' : 'Enter OTP'}
          </h2>
          <p className="text-gray-500 mb-8 font-medium">
            {step === 'phone' 
              ? 'Get access to your group buys and bookings.' 
              : `We've sent an OTP to +91 ${phone}`}
          </p>

          {step === 'phone' ? (
            <div>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:border-black transition overflow-hidden mb-6">
                <span className="px-4 py-3 bg-gray-50 text-gray-700 font-bold border-r border-gray-300">
                  +91
                </span>
                <input 
                  type="tel" 
                  maxLength="10"
                  placeholder="Enter mobile number" 
                  className="w-full px-4 py-3 outline-none text-gray-900 font-medium tracking-wide"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setStep('otp')}
                className="w-full bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition"
              >
                Continue
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between gap-3 mb-6">
                {[1, 2, 3, 4].map((digit) => (
                  <input 
                    key={digit}
                    type="text" 
                    maxLength="1"
                    className="w-14 h-14 border border-gray-300 rounded-lg text-center text-2xl font-bold focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                  />
                ))}
              </div>
              <button 
                onClick={() => {
                  alert('Successfully Logged In!');
                  onClose();
                  setStep('phone');
                }}
                className="w-full bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition mb-4"
              >
                Verify & Login
              </button>
              <button 
                onClick={() => setStep('phone')}
                className="w-full text-indigo-600 font-semibold text-sm hover:underline"
              >
                Edit Mobile Number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}