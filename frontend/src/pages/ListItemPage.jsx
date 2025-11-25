import React, { useState } from "react";
import {
  Leaf,
  Phone,
  Mail,
  Calendar,
  Package,
  DollarSign,
  User,
  MapPin,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const ListCropForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cropName: "",
    farmerName: "",
    city: "",
    state: "",
    harvestedDate: "",
    quantity: "",
    pricePerKg: "",
    contactPhone: "",
    contactEmail: "",
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cropName) newErrors.cropName = "Crop Name is required";
    if (!formData.farmerName) newErrors.farmerName = "Farmer Name is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.harvestedDate)
      newErrors.harvestedDate = "Harvest Date is required";
    if (!formData.quantity || isNaN(formData.quantity))
      newErrors.quantity = "Enter valid quantity";
    if (!formData.pricePerKg || isNaN(formData.pricePerKg))
      newErrors.pricePerKg = "Enter valid price";
    if (!formData.contactPhone)
      newErrors.contactPhone = "Phone number required";
    if (!formData.contactEmail) newErrors.contactEmail = "Email required";
    if (!image) newErrors.image = "Please upload an image";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // FormData for file + text fields
    const fd = new FormData();

    fd.append("cropName", formData.cropName);
    fd.append("farmerName", formData.farmerName);
    fd.append("city", formData.city);
    fd.append("state", formData.state);
    fd.append("harvestedDate", formData.harvestedDate);
    fd.append("quantityKg", formData.quantity); // Update field name to match backend
    fd.append("pricePerKg", formData.pricePerKg);
    fd.append("contactPhone", formData.contactPhone);
    fd.append("contactEmail", formData.contactEmail);
    fd.append("image", image);

    try {
      await api.post("/crops/create", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Crop listed successfully!");
      navigate("/marketplace");
    } catch (err) {
      console.error("Create crop error:", err);
      toast.error("Failed to list crop");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12">
        <Link to="/marketplace">
          <p className="text-left hover:text-green-700 cursor-pointer">Back</p>
        </Link>

        <div className="text-center mb-6 md:mb-10">
          <Leaf className="h-12 w-12 text-green-600 mx-auto mb-2" />
          <h1 className="text-3xl sm:text-4xl font-bold text-green-800">
            List Your Crop
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Connect with buyers by listing your produce
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Crop Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Crop Name
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Leaf className="h-5 w-5 text-green-500 mr-2" />
              <input
                type="text"
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
                className="flex-1 outline-none"
                placeholder="e.g., Wheat"
              />
            </div>
            {errors.cropName && (
              <p className="text-red-500 text-xs mt-1">{errors.cropName}</p>
            )}
          </div>

          {/* Farmer Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Farmer Name
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <User className="h-5 w-5 text-green-500 mr-2" />
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleChange}
                className="flex-1 outline-none"
                placeholder="e.g., Ramesh"
              />
            </div>
            {errors.farmerName && (
              <p className="text-red-500 text-xs mt-1">{errors.farmerName}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">City</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <MapPin className="h-5 w-5 text-green-500 mr-2" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="flex-1 outline-none"
                placeholder="e.g., Pune"
              />
            </div>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none"
              placeholder="e.g., Maharashtra"
            />
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>

          {/* Harvest Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Harvested Date
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Calendar className="h-5 w-5 text-green-500 mr-2" />
              <input
                type="date"
                name="harvestedDate"
                value={formData.harvestedDate}
                onChange={handleChange}
                className="flex-1 outline-none"
              />
            </div>
            {errors.harvestedDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.harvestedDate}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Quantity (kg)
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Package className="h-5 w-5 text-green-500 mr-2" />
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="flex-1 outline-none"
                placeholder="100"
              />
            </div>
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price per Kg (₹)
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <input
                type="number"
                name="pricePerKg"
                value={formData.pricePerKg}
                onChange={handleChange}
                className="flex-1 outline-none"
                placeholder="50"
              />
            </div>
            {errors.pricePerKg && (
              <p className="text-red-500 text-xs mt-1">
                {errors.pricePerKg}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contact Phone
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Phone className="h-5 w-5 text-green-500 mr-2" />
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="flex-1 outline-none"
                placeholder="9876543210"
              />
            </div>
            {errors.contactPhone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contactPhone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contact Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Mail className="h-5 w-5 text-green-500 mr-2" />
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="flex-1 outline-none"
                placeholder="farmer@example.com"
              />
            </div>
            {errors.contactEmail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contactEmail}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
          </div>
        </form>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            List Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCropForm;
