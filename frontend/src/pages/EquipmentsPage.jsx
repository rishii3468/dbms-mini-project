import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";

export default function EquipmentPage() {
  const [equipments, setEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await api.get("/equipments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEquipments(response.data);
      } catch (error) {
        console.error("Error fetching equipments:", error);
      }
    };
    fetchEquipments();
  }, []);

  const filteredEquipments = equipments.filter((eq) => {
    const lower = searchTerm.toLowerCase();
    return (
      eq.name.toLowerCase().includes(lower) ||
      eq.ownerName.toLowerCase().includes(lower) ||
      (eq.location?.city && eq.location?.city.toLowerCase().includes(lower)) ||
      (eq.location?.state && eq.location?.state.toLowerCase().includes(lower))
    );
  });

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Top bar */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 bg-green-100 border-b border-green-200 shadow-sm">
        <Link to="/">
          <button className="flex items-center gap-2 text-green-700 hover:opacity-80">
            <span className="text-2xl">🌱</span>
            <span className="text-2xl font-extrabold">AgriMitra</span>
          </button>
        </Link>

        <div className="flex gap-2 sm:gap-3">
          <Link to="/list-equipment">
            <button className="px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl bg-green-600 text-white shadow hover:-translate-y-0.5 hover:shadow-md hover:bg-green-700 active:translate-y-0 transition">
              List Equipment
            </button>
          </Link>
       
        </div>
      </nav>

      
      <section className="px-4 sm:px-6 py-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800">Equipment Marketplace</h2>
        <p className="text-gray-600 mt-1">
          Buy or Rent farming equipment directly from trusted farmers. Explore verified tools and machines to make your farming more efficient.
        </p>

        
        <div className="mt-5">
          <input
            type="text"
            placeholder="Search for equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-400 outline-none bg-white shadow-sm"
          />
        </div>
      </section>

      
      <section className="px-4 sm:px-6 pb-12 flex flex-col gap-4">
        {filteredEquipments.length > 0 ? (
          filteredEquipments.map((eq, idx) => (
            <article
              key={idx}
              className="bg-white rounded-xl border border-green-100 shadow hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4"
            >
              
              <img
                src={eq.image || "/default-equipment.jpg"}
                alt={eq.name}
                className="w-full sm:w-40 h-32 object-cover rounded-lg shadow-sm"
                loading="lazy"
              />

              
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-lg text-green-800">{eq.name}</h3>
                  {eq.verified ? (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 border border-green-300 rounded-md">
                      Verified
                    </span>
                  ) : (
                    <Link to="/verified-farmer" state={{ equipmentId: eq.id }}>
                      <button className="text-xs px-2 py-1 bg-red-100 text-red-600 border border-red-300 rounded-md hover:bg-red-200 transition">
                        Verify Now
                      </button>
                    </Link>

                  )}
                </div>


                <p className="text-sm text-gray-600 mt-1">{eq.description}</p>
                <p className="text-sm mt-1 text-gray-700">
                  <span className="font-medium">{eq.ownerName}</span> • {eq.location?.city}, {eq.location?.state}
                </p>
                <div className="mt-2 font-bold text-green-700">
                  ₹{eq.buyPrice.toLocaleString()} (Buy) | ₹{eq.rentPricePerDay.toLocaleString()}/day (Rent)
                </div>
              </div>

              
              <div className="flex gap-2 w-full sm:w-auto">
                <Link
                  to="/equipment-payment"
                  state={{ equipment: eq, mode: "buy" }} 
                >
                  <button className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-center shadow">
                    Buy Now
                  </button>
                </Link>

                <Link
                  to="/equipment-payment"
                  state={{ equipment: eq, mode: "rent" }}
                >
                  <button className="flex-1 sm:flex-none border border-green-600 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition text-center">
                    Rent Now
                  </button>
                </Link>

              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No equipment found.
          </div>
        )}
      </section>
    </div>
  );
}

