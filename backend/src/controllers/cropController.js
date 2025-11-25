import { insertCrop, getAllCrops, deleteCropById } from "../models/Crops.js";

export const getCrops = async (req, res) => {
  try {
    const crops = await getAllCrops();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

export const createCrop = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    console.log("Request body:", req.body);
    console.log("Image:", image);
    const cropData = {
      cropName: req.body.cropName,
      farmerName: req.body.farmerName,
      city: req.body.city,
      state: req.body.state,
      harvestedDate: req.body.harvestedDate,
      quantityKg: req.body.quantityKg, // Directly use quantityKg from frontend
      pricePerKg: req.body.pricePerKg,
      contactPhone: req.body.contactPhone,
      contactEmail: req.body.contactEmail,
      image,
    };
    const id = await insertCrop(cropData);
    res.status(201).json({ message: "Crop added successfully", id });
  } catch (err) {
    console.error("Error creating crop:", err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteCrop = async (req, res) => {
  try {
    const deleted = await deleteCropById(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Crop not found" });
    res.json({ message: "Crop deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
