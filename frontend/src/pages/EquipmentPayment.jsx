import React from "react";
import { toast } from "react-hot-toast";
import { useLocation, Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

export default function EquipmentPaymentPage() {
    const location = useLocation();
    const { equipment, mode } = location?.state || {}; 
    const navigate = useNavigate();
    if (!equipment) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50">
                <p className="text-lg font-semibold text-red-600">
                    No order found. Please go back to marketplace.
                </p>
            </div>
        );
    }
    const token = localStorage.getItem("accessToken");
    const price =
        mode === "rent" ? equipment.rentPricePerDay : equipment.buyPrice;

    const handleProceed = async () => {
        try {
           
            if (mode === "buy") {
                await api.delete(`/equipments/${equipment.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("Purchase successful!");
            } else if (mode === "rent") {
                 await api.delete(`/equipments/${equipment.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("Rental confirmed!");
            }
            setTimeout(() => {
                navigate("/coming-soon");
            }, 2000);
        } catch (err) {
            console.error("Error processing order:", err);
            toast.error("Error processing your order. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
                <Link to="/equipment">
                    <p className="text-sm text-gray-500 mb-4">Back</p>
                </Link>
                <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
                    Payment Details
                </h2>

                
                <div className="border border-green-200 rounded-lg p-4 mb-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                        Order Summary
                    </h3>
                    <div className="flex items-center gap-4">
                        <img
                            src={equipment.image || "/default-equipment.jpg"}
                            alt={equipment.name}
                            className="w-24 h-24 object-cover rounded-lg shadow"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">{equipment.name}</p>
                            <p className="text-sm text-gray-600">{equipment.description}</p>
                            <p className="text-sm text-gray-600">
                                Owner: {equipment.ownerName}
                            </p>
                            <p className="text-sm text-gray-600">
                                Location: {equipment.location?.city}, {equipment.location?.state}
                            </p>
                        </div>
                    </div>
                </div>

                
                <div className="border border-green-200 rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">Payment Info</h3>
                    <p className="text-gray-700">
                        {mode === "rent" ? "Rental Price Per Day:" : "Price:"}{" "}
                        <span className="text-green-700 font-bold">₹{price.toLocaleString()}</span>
                    </p>
                </div>

                
                <button
                    onClick={handleProceed}
                    className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 font-semibold shadow-md"
                    id="proceed-button"
                >
                    {mode === "rent" ? "Proceed to Rent" : "Proceed to Buy"}
                </button>
            </div>
        </div>
    );
}
