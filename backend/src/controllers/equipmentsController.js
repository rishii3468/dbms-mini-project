
import { EquipmentModel } from "../models/Equipment.js";

export const getAllEquipments = async (req, res) => {
  try {
    const equipments = await EquipmentModel.getAll();
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching equipments", error: error.message });
  }
};


export const createEquipment = async (req, res) => {
  try {
    const { name, verified, description, ownerName, location, buyPrice, rentPricePerDay } = req.body;

    if (
      !name ||
      !description ||
      !ownerName ||
      !location?.city ||
      !location?.state ||
      !buyPrice ||
      !rentPricePerDay
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const equipmentData = {
      name,
      verified,
      description,
      ownerName,
      city: location.city,
      state: location.state,
      buyPrice,
      rentPricePerDay,
    };

    const newId = await EquipmentModel.create(equipmentData);
    res.status(201).json({ message: "Equipment created successfully", id: newId });
  } catch (error) {
    res.status(500).json({ message: "Server error creating equipment", error: error.message });
  }
};


export const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await EquipmentModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.status(200).json({ message: "Equipment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting equipment", error: error.message });
  }
};


export const updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, verified, description, ownerName, location, buyPrice, rentPricePerDay } = req.body;

    const updatedData = {
      name,
      verified,
      description,
      ownerName,
      city: location?.city,
      state: location?.state,
      buyPrice,
      rentPricePerDay,
    };

    const updated = await EquipmentModel.update(id, updatedData);

    if (!updated) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.status(200).json({ message: "Equipment updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error updating equipment", error: error.message });
  }
};
