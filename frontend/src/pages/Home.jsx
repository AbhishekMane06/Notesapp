import React from "react";
import Header from "../components/Header";

import { useState } from "react";
import NoteModal from "../components/NoteModal";
import axios from "axios";
import { useEffect } from "react";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) setProfile(data.user);
    } catch (error) {
      setProfile(null);
    }
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/note`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter((notes) =>
        notes.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/note/add`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        closeModal();
        toast.success("Note added");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add note");
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        closeModal();
        toast.success("Note updated");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update note");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        toast.success("Note Deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete note");
    }
  };

  return (
    <>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#0b1222] to-[#0a0f1a]">
        {/* decorative blurred shapes */}
        <div className="pointer-events-none absolute -top-24 -left-32 w-96 h-96 bg-gradient-to-tr from-[#6ee7b7]/30 via-[#60a5fa]/20 to-[#c084fc]/10 rounded-full blur-3xl opacity-60 transform rotate-12"></div>
        <div className="pointer-events-none absolute -bottom-32 -right-40 w-[36rem] h-[36rem] bg-gradient-to-bl from-[#f472b6]/10 via-[#60a5fa]/8 to-[#7c3aed]/6 rounded-full blur-3xl opacity-50"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          {/* Profile Section */}
          

          <div className="mb-8">
            <Header setQuery={setQuery} />
          </div>

          <div className="flex justify-end mb-8">
            <button
              onClick={() => {
                setCurrentNote(null);
                setModalOpen(true);
              }}
              className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900 font-semibold rounded-full shadow-2xl hover:scale-[1.02] transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
              aria-label="Add note"
            >
              {/* replaced SVG with a styled plus mark (no paths) */}
              <span className="inline-flex items-center justify-center text-slate-900 font-extrabold">
                +
              </span>
              <span>New Note</span>
            </button>

            {isModalOpen && (
              <NoteModal
                closeModal={closeModal}
                addNote={addNote}
                currentNote={currentNote}
                editNote={editNote}
              />
            )}
          </div>

          <div className="bg-white/6 backdrop-blur-sm border border-white/8 rounded-2xl p-6 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <div
                    key={note._1d || note.id || note._id}
                    className="transform transition hover:translate-y-[-6px] hover:shadow-xl duration-200"
                  >
                    <NoteCard
                      note={note}
                      onEdit={onEdit}
                      deleteNote={deleteNote}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 flex flex-col items-center justify-center">
                  <div className="text-4xl mb-4 text-white/90 font-extrabold">
                    No Notes
                  </div>
                  <p className="text-slate-300 max-w-md text-center">
                    Looks like you don't have any notes yet click{" "}
                    <span className="font-semibold text-emerald-400">
                      New Note
                    </span>{" "}
                    to add your first one.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
