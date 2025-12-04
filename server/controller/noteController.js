import Note from "../models/Note.js";

// Create note
export const createNote = async (req, res) => {
  try {
    const { title, body, tags, pinned } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const note = await Note.create({
      user: req.user.id,
      title,
      body: body || "",
      tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
      pinned: !!pinned,
    });
    res.status(201).json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get notes (with search & filter)
export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { q, tag, pinned } = req.query;
    const filter = { user: userId };

    if (q) {
      // simple text search on title and body
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { body: { $regex: q, $options: "i" } },
      ];
    }
    if (tag) filter.tags = tag; // match a tag
    if (pinned !== undefined) filter.pinned = pinned === "true";

    const notes = await Note.find(filter).sort({ pinned: -1, updatedAt: -1 });
    res.json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: "Not found" });
    res.json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const upd = { ...req.body };
    if (upd.tags && !Array.isArray(upd.tags)) upd.tags = [upd.tags];
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      upd,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Not found" });
    res.json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
