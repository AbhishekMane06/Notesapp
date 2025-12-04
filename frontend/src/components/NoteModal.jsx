import { useEffect, useState } from "react";

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentNote) {
      await editNote(currentNote._id, title, description);
    } else {
      await addNote(title, description);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-6 animate-[fadeIn_0.25s_ease-out]">
        <h2 className="text-2xl font-extrabold text-white mb-6 text-center">
          {currentNote ? "Edit Note" : "Add New Note"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full px-4 py-2.5 mb-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            rows="4"
            className="w-full px-4 py-2.5 mb-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition"
          />
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2.5 w-full mr-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900 font-semibold rounded-xl hover:scale-[1.02] "
            >
              {currentNote ? "Update Note" : "Add Note"}
            </button>

            <button
              type="button"
              className="px-4 py-2.5 w-full ml-3 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
