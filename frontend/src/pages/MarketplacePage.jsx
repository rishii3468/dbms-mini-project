import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const fetchCrops = async () => {
  try {

    const token = localStorage.getItem("accessToken");

    const response = await api.get("/crops", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (error) {
    if(error.response){
      const status = error.response.status;
      
      if(status === 401){
       
        toast.error("Session Expired! Please Login Again");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      } 
      else if(status === 403){
 
        toast.error("Please login to access the marketplace");
        window.location.href = "/login";
      }
    } else if(error.request){
   
      toast.error("Server timeout - please try again");
    } else {
    
      toast.error("An error occurred - please try again");
    }
    
    console.error("Error fetching crops:", error);
    throw error;
}

};

export default function MarketPlace() {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    const getCrops = async () => {
      try {
        const data = await fetchCrops();
        setCrops(data);
      } catch (err) {
        setError("Failed to load crops");
        toast.error("Error fetching crops!");
      } finally {
        setLoading(false);
      }
    };

    getCrops();
  }, []); 

  const filteredCrops = crops.filter((crop) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    const matchesSearch =
      crop.cropName.toLowerCase().includes(lowerSearchTerm) ||
      crop.farmerName.toLowerCase().includes(lowerSearchTerm) ||
      (crop?.city &&
        crop?.city.toLowerCase().includes(lowerSearchTerm)) ||
      (crop?.state &&
        crop?.state.toLowerCase().includes(lowerSearchTerm));

    const matchesCategory =
      selectedCategory === "All Categories" ||
      (crop.category && crop.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 bg-white border-b">
        <Link to="/">
          <button className="flex items-center gap-2 text-green-700 hover:opacity-80">
            <span className="text-2xl">🌱</span>
            <span className="text-2xl font-extrabold">AgriMitra</span>
          </button>
        </Link>

        <div className="flex gap-2 sm:gap-3">
          <Link to="/list-crop">
            <button className="px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl bg-green-600 text-white shadow hover:-translate-y-0.5 hover:shadow-md hover:bg-green-700 active:translate-y-0 transition">
              List Crop
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-6">
        <h2 className="text-3xl sm:text-4xl font-bold">Crop Marketplace</h2>
        <p className="text-gray-600 mt-1">
          Fresh produce directly from verified farmers
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-3 mt-5">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search for crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2.5 rounded-xl"
          >
            <option>All Categories</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Grains</option>
          </select>
        </div>
      </section>

      {/* Crop Cards */}
      <section className="grid gap-6 px-4 sm:px-6 pb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Loading crops...
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-12 text-red-500">
            {error}
          </div>
        ) : filteredCrops.length > 0 ? (
          filteredCrops.map((crop, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition overflow-hidden"
            >
              <img
                src={crop.image ? `http://localhost:5001/images/${crop.image}` : "/default-image.jpg"}
                alt={crop.cropName}
                className="h-44 w-full object-cover"
                loading="lazy"
              />

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg">{crop.cropName}</h3>
                </div>

                <div className="mt-1 text-sm">
                  <span className="font-medium">{crop.farmerName}</span>
                  <span className="ml-2 text-xs text-white bg-green-600 px-2 py-0.5 rounded-full align-middle">
                    Verified
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  {crop.city}, {crop.state}
                </p>
                <p className="text-sm text-gray-600">
                  Harvested: {new Date(crop.harvestedDate).toLocaleDateString()}
                </p>

                <div className="flex items-end justify-between mt-3">
                  <div>
                    <p className="text-sm text-gray-700">Quantity</p>
                    <p className="font-semibold">{crop.quantityKg} Kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">Price</p>
                    <p className="text-green-600 font-extrabold">
                      ₹{crop.pricePerKg}/Kg
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                
                  <Link
                    to="/payment"
                    state={{ crop }}
                    className="bg-green-600 text-white px-4 py-2 rounded inline-block mt-2"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              No crops found matching your search criteria.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}