import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import api from "../lib/axios";

export default function CommunityNotesPage() {
  const [notes, setNotes] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    author: ""
  });

  // Fetch notes from API
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");
      
      try {
        const response = await api.get("/notes");
        console.log("API Response:", response.data);
        
        // Handle the response data properly
        if (response.data && Array.isArray(response.data)) {
          setNotes(response.data);
        } else if (response.data && response.data.notes) {
          // If your API returns { notes: [...] }
          setNotes(response.data.notes);
        } else {
          setNotes([]);
        }
      } catch (error) {
      
        setError("Failed to load notes. Please try again.");
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  // Create note with API call
  const handleCreateNote = async () => {
    if (newNote.title.trim() && newNote.content.trim() && newNote.author.trim()) {
      setLoading(true);
      setError("");

      try {
        const noteData = {
          ...newNote,
        };

        const response = await api.post("/notes", noteData);
      

        // Add the new note to the state

        const createdNote = {
          id: response.data._id || Date.now(),
          ...noteData,
          createdAt: response.data.createdAt || new Date().toISOString(),
          updatedAt: response.data.updatedAt || new Date().toISOString()
        };

        setNotes([createdNote, ...notes]);
        setNewNote({ title: "", content: "", author: "" });
        setShowCreateForm(false);
      } catch (error) {
        console.error("Failed to create note:", error);
        setError("Failed to create note. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditNote = (note) => {
    setEditingNote({ ...note });
  };

  // Update note with API call
  const handleUpdateNote = async () => {
    if (editingNote.title.trim() && editingNote.content.trim()) {
      setLoading(true);
      setError("");

      try {
        const updateData = {
          title: editingNote.title,
          content: editingNote.content,
          author: editingNote.author
        };

        const response = await api.put(`/notes/${editingNote.id}`, updateData, {
          headers: {
            'Content-Type': 'application/json'
            
          }
        }
        );
        console.log("Note updated:", response.data);

        const updatedNotes = notes.map(note => 
          note.id === editingNote.id 
            ? { 
                ...editingNote, 
                updatedAt: response.data.updatedAt || new Date().toISOString() 
              }
            : note
        );
        
        setNotes(updatedNotes);
        setEditingNote(null);
      } catch (error) {
        console.error("Failed to update note:", error);
        setError("Failed to update note. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Delete note with API call
  const handleDeleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setLoading(true);
      setError("");

      try {
        await api.delete(`/notes/${id}`);
        console.log("Note deleted:", id);
        
        setNotes(notes.filter(note => note.id !== id));
      } catch (error) {
        console.error("Failed to delete note:", error);
        setError("Failed to delete note. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 bg-white border-b shadow-sm">
        <Link to="/">
          <button className="flex items-center gap-2 text-green-700 hover:opacity-80">
            <span className="text-2xl">🌱</span>
            <span className="text-2xl font-extrabold">AgriMitra</span>
          </button>
        </Link>

        <div className="flex gap-2 sm:gap-3">
          <button 
            onClick={() => setShowCreateForm(true)}
            className="px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl bg-green-600 text-white shadow hover:-translate-y-0.5 hover:shadow-md hover:bg-green-700 active:translate-y-0 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Write Note"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800">Community Notes</h2>
        <p className="text-gray-600 mt-1">
          Share knowledge, experiences, and connect with fellow farmers
        </p>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="mt-5">
          <input
            type="text"
            placeholder="Search notes by title, content, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-400 outline-none bg-white shadow-sm"
          />
        </div>
      </section>

      {/* Create Note Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-green-800 mb-4">Share Your Knowledge</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newNote.author}
                onChange={(e) => setNewNote({...newNote, author: e.target.value})}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                disabled={loading}
              />
              
              <input
                type="text"
                placeholder="Note Title"
                value={newNote.title}
                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                disabled={loading}
              />
              
              <textarea
                placeholder="Share your farming experience, tips, or ask questions..."
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                rows="6"
                className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-400 outline-none resize-none"
                disabled={loading}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNote}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition shadow disabled:opacity-50"
                disabled={loading || !newNote.title.trim() || !newNote.content.trim() || !newNote.author.trim()}
              >
                {loading ? "Posting..." : "Post Note"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-green-800 mb-4">Edit Note</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                value={editingNote.title}
                onChange={(e) => setEditingNote({...editingNote, title: e.target.value})}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                disabled={loading}
              />
              
              <textarea
                value={editingNote.content}
                onChange={(e) => setEditingNote({...editingNote, content: e.target.value})}
                rows="6"
                className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-400 outline-none resize-none"
                disabled={loading}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingNote(null)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateNote}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition shadow disabled:opacity-50"
                disabled={loading || !editingNote.title.trim() || !editingNote.content.trim()}
              >
                {loading ? "Updating..." : "Update Note"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <section className="px-4 sm:px-6 pb-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="text-gray-600 mt-2">Loading community notes...</p>
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="space-y-6">
            {filteredNotes.map((note) => (
              <article
                key={note.id}
                className="bg-white rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-green-800 hover:text-green-700 transition">
                      {note.title}
                    </h3>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditNote(note)}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-200 transition disabled:opacity-50"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-xs px-2 py-1 bg-red-100 text-red-600 border border-red-300 rounded-md hover:bg-red-200 transition disabled:opacity-50"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">{note.content}</p>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-green-700">{note.author}</span>
          
                    </div>
                    <div className="text-xs text-gray-500">
                      {note.updatedAt !== note.createdAt ? (
                        <span>Updated {formatDate(note.updatedAt)}</span>
                      ) : (
                        <span>Posted {formatDate(note.createdAt)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No notes found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? "Try adjusting your search terms" : "Be the first to share your farming knowledge!"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow disabled:opacity-50"
                disabled={loading}
              >
                Write First Note
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
