import Link from 'next/link';

export default function VendorLogin() {
  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="bg-black text-white font-bold text-xl px-2 py-1 rounded">JT</div>
            <span className="text-2xl font-bold text-black tracking-tight">Jointly</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900">Partner Portal</h2>
          <p className="text-gray-500 font-medium text-sm mt-2">
            Login to manage your bookings and group buys.
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email or Mobile Number
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black outline-none transition"
              placeholder="partner@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm font-semibold text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="button"
            className="w-full bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-md"
          >
            Login to Dashboard
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600 font-medium">
            Want to join as a professional?{' '}
            <Link href="/vendor/register" className="text-black font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}