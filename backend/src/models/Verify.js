import connectDB from "../config/db.js";

export const VerifyModel = {
  async createVerification(verification, equipmentId) {
    const { name, serialNumber, age } = verification;
    console.log(equipmentId, name, serialNumber, age);
    const [result] = await connectDB.query(
        `INSERT INTO verifications
            (equipmentId, name, serialNumber, age)
            VALUES (?, ?, ?, ?)`,
        [equipmentId, name, serialNumber, age]
    );
    return result.insertId;
  },
};
