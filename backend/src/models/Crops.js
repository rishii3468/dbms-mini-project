import connectDB from "../config/db.js";

export const createCropTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS crops (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cropName VARCHAR(255) NOT NULL,
      farmerName VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      harvestedDate DATE NOT NULL,
      quantityKg DECIMAL(10,2) NOT NULL,
      pricePerKg DECIMAL(10,2) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  await connectDB.query(query);
  console.log("✅ Crops table ensured in database");
};



export const insertCrop = async (cropData) => {
  const {
    cropName,
    farmerName,
    city,
    state,
    harvestedDate,
    quantityKg,
    pricePerKg,
    contactPhone,
    contactEmail,
    image,
  } = cropData;

  const [result] = await connectDB.query(
    `INSERT INTO crops 
      (cropName, farmerName, city, state, harvestedDate, quantityKg, pricePerKg, phone, email, image)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      cropName,
      farmerName,
      city,
      state,
      harvestedDate,
      quantityKg,
      pricePerKg,
      contactPhone,
      contactEmail,
      image,
    ]
  );

  return result.insertId;
};

export const getAllCrops = async () => {
  const [rows] = await connectDB.query('SELECT * FROM crops ORDER BY createdAt DESC');
  return rows;
};



export const deleteCropById = async (id) => {
  const [result] = await connectDB.query('DELETE FROM crops WHERE id = ?', [id]);
  return result.affectedRows > 0;
};