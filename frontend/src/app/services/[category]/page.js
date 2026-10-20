import Link from 'next/link';

// Function la 'async' thevla aahe
export default async function ServicePage({ params }) {
  
  // 'params' la await karun data ghetla
  const resolvedParams = await params;
  const categoryName = resolvedParams.category;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-8">
      
      {/* Left Column: Service Details & List */}
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 capitalize">
          {categoryName.replace('-', ' ')} Services
        </h1>
        <p className="text-gray-500 mb-8 font-medium">⭐ 4.8 (10K+ bookings in your area)</p>

        {/* Skeleton Service Item 1 */}
        <div className="border border-gray-200 rounded-xl p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-xl font-bold text-gray-900">Service Title (e.g. Foam-jet AC Service)</h3>
            <p className="text-sm text-gray-500 mt-1">⏱️ 45 mins | Includes deep cleaning</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-2xl font-black text-black">₹499</span>
              <span className="text-sm text-gray-400 line-through">₹799</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <button className="border-2 border-black text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition text-sm">
              Book Individual
            </button>
            <button className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition text-sm shadow-md">
              🤝 Start Group Buy (₹399)
            </button>
          </div>
        </div>

        {/* Skeleton Service Item 2 */}
        <div className="border border-gray-200 rounded-xl p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-xl font-bold text-gray-900">Service Title 2 (e.g. AC Gas Refill)</h3>
            <p className="text-sm text-gray-500 mt-1">⏱️ 1 hr | Upto 30 days warranty</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-2xl font-black text-black">₹2499</span>
              <span className="text-sm text-gray-400 line-through">₹2999</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <button className="border-2 border-black text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition text-sm">
              Book Individual
            </button>
            <button className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition text-sm shadow-md">
              🤝 Start Group Buy (₹1999)
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Cart / Summary Sidebar */}
      <div className="w-full md:w-[400px]">
        <div className="border border-gray-200 rounded-xl p-6 sticky top-28 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Cart</h2>
          
          <div className="text-center py-10">
            <span className="text-5xl block mb-4 opacity-50">🛒</span>
            <p className="text-gray-500 font-medium">No items in your cart</p>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-4">
            <h3 className="font-bold text-gray-900 mb-3">Jointly Promise</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              <li className="flex items-center gap-2">✔️ Verified Professionals</li>
              <li className="flex items-center gap-2">✔️ Hassle Free Booking</li>
              <li className="flex items-center gap-2">✔️ Transparent Pricing</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}