import { VerifyModel } from "../models/Verify";


export const verifyEquipment = async (req, res) => {
  try {
    const equipmentId = req.query.equipmentId;
    if (!equipmentId) {
      return res.status(400).json({ message: "Missing equipmentId in query parameters" });
    }
    const verificationData = {
        name: req.body.name,
        serialNumber: req.body.serialNumber,
        age: req.body.age,
    };
    const id = await VerifyModel.createVerification(verificationData, equipmentId);
    res.status(201).json({ message: "Equipment verified successfully", id });
  } catch (err) {
    res.status(500).json({ message: "Error verifying equipment", error: err.message });
  }
};