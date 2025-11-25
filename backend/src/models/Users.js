
import connectDB from "../config/db.js";

export const UserModel = {

  async findByEmailOrUsername(email, username) {
    const [rows] = await connectDB.query(
      "SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1",
      [email, username]
    );
    return rows[0];
  },

  
  async findByEmail(email) {
    const [rows] = await connectDB.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    return rows[0];
  },

 
  async findByRefreshToken(refreshToken) {
    const [rows] = await connectDB.query(
      "SELECT * FROM users WHERE JSON_CONTAINS(refreshTokens, JSON_QUOTE(?)) LIMIT 1",
      [refreshToken]
    );
    return rows[0];
  },


  async create(username, email, password) {
    const [result] = await connectDB.query(
      "INSERT INTO users (username, email, password, refreshTokens) VALUES (?, ?, ?, JSON_ARRAY())",
      [username, email, password]
    );
    return result.insertId;
  },

 
  async addRefreshToken(userId, refreshToken) {
    await connectDB.query(
      "UPDATE users SET refreshTokens = JSON_ARRAY_APPEND(refreshTokens, '$', ?) WHERE id = ?",
      [refreshToken, userId]
    );
  },

 
  async removeRefreshToken(refreshToken) {
    await connectDB.query(
      "UPDATE users SET refreshTokens = JSON_REMOVE(refreshTokens, JSON_UNQUOTE(JSON_SEARCH(refreshTokens, 'one', ?))) WHERE JSON_CONTAINS(refreshTokens, JSON_QUOTE(?))",
      [refreshToken, refreshToken]
    );
  },
};
