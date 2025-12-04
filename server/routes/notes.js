import express from "express";
import mongoose from "mongoose";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();


router.post('/add', middleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = new Note({ title, description, userId: req.user.id });
    await newNote.save();
    return res.status(200).json({ success: true, message: "Note Successfully Created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in Adding the Note" });
  }
});

router.get('/', middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Can't Retrieve Notes" });
  }
});

// Update note
router.put("/:id", middleware, async (req, res) => {
  try {
    // trim whitespace/newline from the param
    const rawId = req.params.id;
    const id = typeof rawId === "string" ? rawId.trim() : rawId;
    console.log("PUT /api/note/:id - params:", { id }, "user:", req.user && req.user.id, "body:", req.body);

    if (!id) {
      return res.status(400).json({ success: false, message: "Missing note id in path" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid note id" });
    }

    const update = { ...req.body };
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      update,
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found or not authorized" });
    }

    return res.status(200).json({ success: true, updateNote: updatedNote });
  } catch (error) {
    console.error("Update note error:", error.stack || error);
    return res.status(500).json({ success: false, message: error.message || "Can't Update Notes" });
  }
});

// Delete note
router.delete("/:id", middleware, async (req, res) => {
  try {
    const rawId = req.params.id;
    const id = typeof rawId === "string" ? rawId.trim() : rawId;
    console.log("DELETE /api/note/:id - params:", { id }, "user:", req.user && req.user.id);

    if (!id) {
      return res.status(400).json({ success: false, message: "Missing note id in path" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid note id" });
    }

    const deletedNote = await Note.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found or not authorized" });
    }

    return res.status(200).json({ success: true, deleteNote: deletedNote });
  } catch (error) {
    console.error("Delete note error:", error.stack || error);
    return res.status(500).json({ success: false, message: error.message || "Can't Delete Notes" });
  }
});


export default router;
