
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

    console.log("Received equipment data:", {
      name,
      verified,
      description,
      ownerName,
      location,
      buyPrice,
      rentPricePerDay,
    });

    if (
      !name ||
      !description ||
      !ownerName ||
      !location?.city ||
      !location?.state ||
      buyPrice === undefined ||
      buyPrice === null ||
      rentPricePerDay === undefined ||
      rentPricePerDay === null
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const equipmentData = {
      name,
      verified: verified || false,
      description,
      ownerName,
      city: location.city,
      state: location.state,
      buyPrice: parseFloat(buyPrice),
      rentPricePerDay: parseFloat(rentPricePerDay),
    };

    console.log("Equipment data to insert:", equipmentData);
    const newId = await EquipmentModel.create(equipmentData);
    res.status(201).json({ message: "Equipment created successfully", id: newId });
  } catch (error) {
    console.error("Error creating equipment:", error);
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

    // Fetch existing equipment data
    const existingEquipments = await EquipmentModel.getAll();
    const existingEquipment = existingEquipments.find(eq => eq.id === parseInt(id));

    if (!existingEquipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    // Only update fields that are provided, keep existing values for others
    const updatedData = {
      name: name !== undefined ? name : existingEquipment.name,
      verified: verified !== undefined ? verified : existingEquipment.verified,
      description: description !== undefined ? description : existingEquipment.description,
      ownerName: ownerName !== undefined ? ownerName : existingEquipment.ownerName,
      city: location?.city !== undefined ? location.city : existingEquipment.city,
      state: location?.state !== undefined ? location.state : existingEquipment.state,
      buyPrice: buyPrice !== undefined ? buyPrice : existingEquipment.buyPrice,
      rentPricePerDay: rentPricePerDay !== undefined ? rentPricePerDay : existingEquipment.rentPricePerDay,
    };

    const updated = await EquipmentModel.update(id, updatedData);

    if (!updated) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.status(200).json({ message: "Equipment updated successfully" });
  } catch (error) {
    console.error("Error updating equipment:", error);
    res.status(500).json({ message: "Server error updating equipment", error: error.message });
  }
};
