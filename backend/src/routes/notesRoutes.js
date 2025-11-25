import express from "express";
import {
  fetchNotes,
  addNote,
  removeNote,
  editNote
} from "../controllers/notesController.js";

const router = express.Router();

// ✅ GET all notes
router.get("/", fetchNotes);

// ✅ GET a single note by ID
router.get("/:id", async (req, res) => {
  try {
    const { getNoteById } = await import("../models/Note.js");
    const note = await getNoteById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error fetching note", error: err.message });
  }
});

// ✅ POST create a new note
router.post("/", addNote);

// ✅ DELETE a note by ID
router.delete("/:id", removeNote);

router.put("/:id", editNote);

export default router;
