import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const markets = ["Delhi", "Mumbai", "Bangalore", "Hyderabad"];
const crops = ["Wheat", "Rice", "Tomato", "Onion"];

export default function CommodityPricesPage() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [todayPrice, setTodayPrice] = useState(null);
  const [compareMarket, setCompareMarket] = useState("");
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000017704f08e67e4414747189afb9ef2d662&format=json&offset=0&limit=4000'
        );
        const result = await response.json();
        setMarketData(result.records);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
  }, []);

  const handleSearch = () => {
    if (selectedCrop && selectedMarket) {
      const filtered = marketData.filter(
        (item) =>
          item.commodity_name?.toLowerCase() === selectedCrop.toLowerCase() &&
          item.market?.toLowerCase() === selectedMarket.toLowerCase()
      );
      setTodayPrice(filtered.length > 0 ? filtered[0].modal_price : "Data not available");
    } else {
      setTodayPrice(null);
    }
  };

  const openGraph = () => {
    window.open('https://agmarknet.gov.in/CommodityWiseGraph/ComGraphBoard.aspx', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-green-100 p-4 shadow-md flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <h1 className="text-2xl font-bold text-green-800">Real Time Market Price</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <Link to="/">
            <button className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Home
            </button>
          </Link>
        </div>
      </nav>

      <div className="p-6 max-w-7xl mx-auto flex-1 flex flex-col gap-8">
        
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="p-2 border rounded w-full hover:border-green-500 transition"
          >
            <option value="">Select Crop</option>
            {crops.map((crop) => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>

          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="p-2 border rounded w-full hover:border-green-500 transition"
          >
            <option value="">Select Market</option>
            {markets.map((market) => (
              <option key={market} value={market}>{market}</option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Search
          </button>
        </div>

        
        {loading ? (
          <div>Loading market data...</div>
        ) : (
          todayPrice && (
            <div className="bg-green-100 p-4 rounded text-center text-lg font-semibold hover:shadow-lg transition">
              Today's Price for {selectedCrop} in {selectedMarket}: ₹{todayPrice}/quintal
            </div>
          )
        )}

        
        <div className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col gap-4">
          <h2 className="text-xl font-bold">Compare Prices Across Markets</h2>
          <select
            value={compareMarket}
            onChange={(e) => setCompareMarket(e.target.value)}
            className="p-2 border rounded hover:border-green-500 transition w-full"
          >
            <option value="">Select Market to Compare</option>
            {markets.map((market) => (
              <option key={market} value={market}>{market}</option>
            ))}
          </select>
          {compareMarket && selectedCrop && (
            <div className="text-center font-semibold hover:text-green-700 transition">
              {compareMarket} Price for {selectedCrop}: ₹{
                marketData.find(
                  (item) =>
                    item.commodity_name?.toLowerCase() === selectedCrop.toLowerCase() &&
                    item.market?.toLowerCase() === compareMarket.toLowerCase()
                )?.modal_price || "Data not available"
              }/quintal
            </div>
          )}
        </div>

        
        <div className="text-center">
          <button
            onClick={openGraph}
            className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            View Historical Graph
          </button>
        </div>
      </div>
    </div>
  );
}