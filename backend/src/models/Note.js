import connectDB from "../config/db.js";

export const getAllNotes = async () => {
  const [rows] = await connectDB.query("SELECT * FROM notes ORDER BY createdAt DESC");
  return rows;
};


export const getNoteById = async (id) => {
  const [rows] = await connectDB.query("SELECT * FROM notes WHERE id = ?", [id]);
  return rows[0];
};


export const createNote = async (title, content, author) => {
  const [result] = await connectDB.query(
    "INSERT INTO notes (title, content, author) VALUES (?, ?, ?)",
    [title, content, author]
  );
  const [rows] = await connectDB.query("SELECT * FROM notes WHERE id = ?", [result.insertId]);
  return rows[0];
};


export const updateNote = async (id, title, content) => {
  await connectDB.query(
    "UPDATE notes SET title = ?, content = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
    [title, content, id]
  );
  const [rows] = await connectDB.query("SELECT * FROM notes WHERE id = ?", [id]);
  return rows[0];
};


export const deleteNote = async (id) => {
  const [result] = await connectDB.query("DELETE FROM notes WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
