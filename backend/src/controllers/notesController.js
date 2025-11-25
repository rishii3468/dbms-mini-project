import { 
  getAllNotes, 
  getNoteById, 
  createNote, 
  updateNote as updateNoteModel, 
  deleteNote 
} from "../models/Note.js";


export const fetchNotes = async (req, res) => {
  try {
    const notes = await getAllNotes();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err.message });
  }
};


export const addNote = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author)
      return res.status(400).json({ message: "All fields are required" });

    const newNote = await createNote(title, content, author);
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Error creating note", error: err.message });
  }
};


export const editNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    if (!title && !content && !author) {
      return res.status(400).json({ message: "At least one field must be provided for update" });
    }

    const updatedNote = await updateNoteModel(id, { title, content, author });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully", note: updatedNote });
  } catch (err) {
    res.status(500).json({ message: "Error updating note", error: err.message });
  }
};


export const removeNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteNote(id);
    if (!deleted) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note", error: err.message });
  }
};
