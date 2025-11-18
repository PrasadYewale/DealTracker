import React, { useState } from "react";
import { Search, TrendingDown, Bell, Star, ShoppingCart, Zap, Target, Clock, Award, ChevronRight, Sparkles, ExternalLink, Loader, User, LogOut } from "lucide-react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term");
      return;
    }
    
    setIsSearching(true);
    setShowResults(true);
    
    try {
      console.log("🔍 Searching for:", searchQuery);
      
      const response = await fetch(
        `http://localhost:8082/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Search results:", data);
      
      const products = data.shopping_results || [];
      setSearchResults(products);
      
      if (products.length === 0) {
        alert("No results found for: " + searchQuery);
      }
    } catch (error) {
      console.error("❌ Search failed:", error);
      alert("Search failed: " + error.message + "\n\nMake sure backend is running on localhost:8081");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const logout = () => {
    window.location.href = "/";
  };

  const stats = [
    { icon: ShoppingCart, label: "Products Tracked", value: "50,000+", color: "orange" },
    { icon: TrendingDown, label: "Average Savings", value: "45%", color: "lime" },
    { icon: Award, label: "Best Deals Today", value: "2,847", color: "cyan" },
    { icon: Clock, label: "Real-time Updates", value: "24/7", color: "amber" }
  ];

  const platforms = [
    "Amazon", "Flipkart", "Myntra", "Ajio", "Croma", "Vijay Sales", "Reliance Digital", "Snapdeal"
  ];

  const ProductCard = ({ product }) => {
    if (!product) return null;
    
    // Handle SerpAPI response format
    const title = product.title || '';
    const price = product.price || product.extracted_price || '';
    const original_price = product.original_price || '';
    const image = product.image || product.thumbnail || '';
    const link = product.link || product.product_link || product.url || '';
    const rating = product.rating || '';
    const reviews = product.reviews || product.review_count || '';
    
    return (
      <div className="cursor-pointer-custom relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-lime-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
        <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-lime-500/30 transition-all h-full flex flex-col">
          {image && (
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-zinc-800">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200?text=No+Image';
                }}
              />
            </div>
          )}
          
          <h4 className="text-sm font-bold text-white mb-2 line-clamp-2 flex-grow">
            {title}
          </h4>
          
          <div className="space-y-2">
            {price && (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-lime-400">
                  {price}
                </span>
                {original_price && (
                  <span className="text-sm text-zinc-500 line-through">
                    {original_price}
                  </span>
                )}
              </div>
            )}
            
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-zinc-400">{rating}</span>
                {reviews && (
                  <span className="text-xs text-zinc-500">({reviews})</span>
                )}
              </div>
            )}
            
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer-custom inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-lime-500/50 transition-all text-sm w-full justify-center mt-2"
              >
                View Deal
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white cursor-custom">
      <style jsx>{`
        .cursor-custom {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2384cc16" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg>') 12 12, auto;
        }
        .cursor-pointer-custom {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2384cc16" stroke-width="2"><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="%2384cc16"/></svg>') 12 12, pointer;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>

      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 157, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 157, 0.02) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-400 rounded-full blur-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-lime-500/20 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-lime-400 rounded-lg blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-cyan-500 to-lime-400 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-black" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-emerald-400">
              DEALTRACKER
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="cursor-pointer-custom flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:border-lime-500/50 transition-all group">
              <Bell className="w-4 h-4 text-lime-400 group-hover:animate-bounce" />
              <span className="text-sm font-semibold">Alerts</span>
            </button>
            
            <button className="cursor-pointer-custom flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:border-lime-500/50 transition-all group">
              <User className="w-4 h-4 text-lime-400" />
              <span className="text-sm font-semibold">Profile</span>
            </button>

            <button 
              onClick={logout}
              className="cursor-pointer-custom flex items-center gap-2 px-4 py-2 bg-red-900/20 border border-red-500/30 rounded-lg hover:bg-red-900/40 hover:border-red-500/50 transition-all group"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-red-400">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-lime-500/10 border border-lime-500/30 rounded-full">
              <Sparkles className="w-4 h-4 text-lime-400 animate-pulse" />
              <span className="text-sm font-bold text-lime-400 uppercase tracking-wider">Smart Deal Finding AI</span>
            </div>
          </div>

          <h2 className="text-7xl font-black mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-emerald-400 animate-gradient">
              FIND THE BEST DEALS
            </span>
            <br />
            <span className="text-white">ACROSS THE INTERNET</span>
          </h2>

          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Stop wasting time browsing 20+ shopping sites. Our intelligent crawler compares prices, tracks discounts, and shows you the <span className="text-lime-400 font-bold">absolute best deals</span> in real-time.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-lime-400 to-emerald-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative flex items-center bg-zinc-900 border-2 border-zinc-800 rounded-2xl overflow-hidden group-hover:border-lime-500/50 transition-all">
                <Search className="w-6 h-6 text-zinc-500 ml-6" />
                <input
                  type="text"
                  placeholder="Search for products, brands, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="cursor-text flex-1 px-6 py-5 bg-transparent text-white placeholder-zinc-500 focus:outline-none text-lg"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="cursor-pointer-custom m-2 px-8 py-3 bg-gradient-to-r from-cyan-500 via-lime-400 to-emerald-500 text-black font-black rounded-xl hover:shadow-lg hover:shadow-lime-500/50 transition-all uppercase tracking-wider flex items-center gap-2 group disabled:opacity-50"
                >
                  {isSearching ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      Find Deals
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Supported Platforms */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <span className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">Tracking Deals From:</span>
            {platforms.map((platform, index) => (
              <span
                key={index}
                className="cursor-pointer-custom px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-bold text-zinc-400 hover:text-lime-400 hover:border-lime-500/30 transition-all"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-black text-white">
                Search Results for "<span className="text-lime-400">{searchQuery}</span>"
              </h3>
              <button
                onClick={() => setShowResults(false)}
                className="cursor-pointer-custom text-zinc-400 hover:text-lime-400 transition-colors"
              >
                Clear Results
              </button>
            </div>
            
            {isSearching ? (
              <div className="text-center py-12">
                <Loader className="w-12 h-12 text-lime-400 animate-spin mx-auto mb-4" />
                <p className="text-zinc-400">Searching for best deals...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.slice(0, 12).map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                <p className="text-zinc-400">No results found. Try a different search term.</p>
              </div>
            )}
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="cursor-pointer-custom relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-lime-500/30 transition-all">
                  <Icon className="w-8 h-8 text-lime-400 mb-3" />
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-500 font-semibold uppercase tracking-wide">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trending Deals Message */}
        {!showResults && (
          <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <h3 className="text-2xl font-black text-lime-400 mb-2">Start Searching for Deals</h3>
            <p className="text-zinc-400">Use the search bar above to find the best deals across all platforms!</p>
          </div>
        )}
      </div>
    </div>
  );
}