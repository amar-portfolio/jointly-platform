import Link from 'next/link';

export default function HomePage() {
  // Main Categories List
  const categories = [
    { name: "AC & Appliance Repair", icon: "❄️", link: "/services/ac" },
    { name: "Cleaning & Pest Control", icon: "🧹", link: "/services/cleaning" },
    { name: "Electrician, Plumber", icon: "🔧", link: "/services/handyman" },
    { name: "Painting & Decor", icon: "🎨", link: "/services/painting" },
    { name: "Men's Salon & Massage", icon: "💇‍♂️", link: "/services/mens-salon" },
    { name: "Women's Salon & Spa", icon: "💆‍♀️", link: "/services/womens-salon" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      
      {/* 1. Hero Banner (Group Buying Highlight) */}
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between mb-12 shadow-2xl">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Premium Home Services, <br />
            <span className="text-indigo-400">At Society Group Rates!</span>
          </h1>
          <p className="text-lg mb-8 text-gray-300">
            Join active bookings in your building or start a new group buy to save up to 40% on top-rated professionals.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-md">
            Find Your Society
          </button>
        </div>
        <div className="hidden md:flex md:w-1/3 justify-end text-8xl">
          🏢🤝
        </div>
      </div>

      {/* 2. Core Service Categories Grid */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Home services at your doorstep</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <Link 
              href={cat.link} 
              key={index} 
              className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-black transition cursor-pointer group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
              <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Live Society Group Buys (Our USP) */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">🔥 Live Group Deals Near You</h2>
          <Link href="/group-deals" className="text-indigo-600 font-semibold hover:underline">See all</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Deal Card 1 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded">2/5 Joined</span>
              <span className="text-red-500 text-xs font-semibold flex items-center gap-1">
                ⏱️ Ends in 2 hrs
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">Foam-jet AC Service</h3>
            <p className="text-sm text-gray-500 mb-4 font-medium">📍 Lodha Amara, Thane</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-black text-black">₹499</span>
                <span className="text-sm text-gray-400 line-through ml-2">₹799</span>
              </div>
              <button className="bg-black text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
                Join Deal
              </button>
            </div>
          </div>

          {/* Deal Card 2 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded">4/5 Joined</span>
              <span className="text-red-500 text-xs font-semibold flex items-center gap-1">
                ⏱️ Ends in 30 mins
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">Intense Bathroom Cleaning</h3>
            <p className="text-sm text-gray-500 mb-4 font-medium">📍 Hiranandani Estate, Powai</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-black text-black">₹799</span>
                <span className="text-sm text-gray-400 line-through ml-2">₹1299</span>
              </div>
              <button className="bg-black text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
                Join Deal
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}