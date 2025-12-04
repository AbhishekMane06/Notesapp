import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit, deleteNote }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl font-bold text-white mb-2">{note.title}</h2>
      <p className="text-white/80">{note.description}</p>
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="text-emerald-300 hover:text-emerald-400"
          onClick={() => onEdit(note)}
        >
          <FaEdit size={18} />
        </button>
        <button
          className="text-red-400 hover:text-red-500"
          onClick={() => deleteNote(note._id)}
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
