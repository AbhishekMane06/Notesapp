import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

 
const Note = mongoose.model("Note", NoteSchema);
export default Note; 
