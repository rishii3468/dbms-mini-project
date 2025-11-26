import connectDB from "../config/db";

export const VerifyModel = {
  async createVerification(verification, equipmentId) {
    const { name, serialNumber, age } = verification;
    const [result] = await connectDB.query(
        `INSERT INTO verifications
            (equipmentId, name, serialNumber, age)
            VALUES (?, ?, ?, ?)`,
        [equipmentId, name, serialNumber, age]
    );
    return result.insertId;
  },
};
