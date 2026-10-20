import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-black text-white font-bold text-xl px-2 py-1 rounded">JT</div>
              <span className="text-2xl font-bold text-black tracking-tight">Jointly</span>
            </Link>
            <p className="text-gray-500 text-sm font-medium mb-6">
              Premium home services at society group rates. Save more when you book together!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
              <li><Link href="/about" className="hover:text-black transition">About us</Link></li>
              <li><Link href="/contact" className="hover:text-black transition">Contact us</Link></li>
              <li><Link href="/terms" className="hover:text-black transition">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-black transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Customer Links */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">For Customers</h3>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
              <li><Link href="/services/ac" className="hover:text-black transition">AC Repair</Link></li>
              <li><Link href="/services/cleaning" className="hover:text-black transition">Home Cleaning</Link></li>
              <li><Link href="/group-deals" className="hover:text-black transition">Live Group Deals</Link></li>
              <li><Link href="/cart" className="hover:text-black transition">Your Cart</Link></li>
            </ul>
          </div>

          {/* Partner / Vendor Links (Itun vendor login karel) */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4">For Partners</h3>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
              <li>
                <Link href="/vendor/register" className="text-indigo-600 hover:text-indigo-800 transition font-bold">
                  Register as a Professional
                </Link>
              </li>
              <li>
                <Link href="/vendor/login" className="hover:text-black transition">
                  Partner Login
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            © 2026 Jointly Platform. All rights reserved.
          </p>
          <div className="flex gap-4 text-2xl">
            <span className="cursor-pointer grayscale hover:grayscale-0 transition">📱</span>
            <span className="cursor-pointer grayscale hover:grayscale-0 transition">💼</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}