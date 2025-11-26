
import connectDB from "../config/db.js";



export const EquipmentModel = {
  async getAll() {
    const [rows] = await connectDB.query("SELECT * FROM equipments");
    return rows;
  },

  async create(equipment) {
    const {
      name,
      verified,
      description,
      ownerName,
      city,
      state,
      buyPrice,
      rentPricePerDay,
    } = equipment;

    const [result] = await connectDB.query(
      `INSERT INTO equipments 
       (name, verified, description, ownerName, city, state, buyPrice, rentPricePerDay)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, verified || false, description, ownerName, city, state, buyPrice, rentPricePerDay]
    );

    return result.insertId;
  },

  async delete(id) {
    const [result] = await connectDB.query("DELETE FROM equipments WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },

  async update(id, equipment) {
    const {
      name,
      verified,
      description,
      ownerName,
      city,
      state,
      buyPrice,
      rentPricePerDay,
    } = equipment;

    const [result] = await connectDB.query(
      `UPDATE equipments 
       SET name=?, verified=?, description=?, ownerName=?, city=?, state=?, buyPrice=?, rentPricePerDay=? 
       WHERE id=?`,
      [name, verified || false, description, ownerName, city, state, buyPrice, rentPricePerDay, id]
    );
    return result.affectedRows > 0;
  },
};
