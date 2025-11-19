import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import coding from "../../../assets/coding.svg";

const API_BASE = import.meta.env.VITE_API_URL;

const WorkshopForm = ({ isOpen, onClose, onSaved, onUpdated, editingEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title || "");
      setDescription(editingEvent.description || "");
      setPreview(editingEvent.image || "");
      setThumbnailFile(null);
    } else {
      setTitle("");
      setDescription("");
      setPreview("");
      setThumbnailFile(null);
    }
  }, [editingEvent, isOpen]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setThumbnailFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSave = async () => {
    if (!title.trim()) return alert("Please add a title.");
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

      if (editingEvent && editingEvent.id) {
        // PATCH for partial update
        const res = await fetch(`${API_BASE}/api/events/${editingEvent.id}`, {
          method: "PATCH",
          body: formData
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        const image = updated.imageUrl ? `${API_BASE}${updated.imageUrl}` : coding;
        onUpdated({
          id: updated._id,
          title: updated.title,
          description: updated.description,
          image
        });
      } else {
        // Create
        const res = await fetch(`${API_BASE}/api/events`, {
          method: "POST",
          body: formData
        });
        if (!res.ok) throw new Error("Save failed");
        const saved = await res.json();
        const image = saved.imageUrl ? `${API_BASE}${saved.imageUrl}` : coding;
        onSaved({
          id: saved._id,
          title: saved.title,
          description: saved.description,
          image
        });
      }

      setTitle("");
      setDescription("");
      setThumbnailFile(null);
      setPreview("");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Save/update failed. See console.");
    } finally {
      setIsSaving(false);
      // revoke preview url to avoid memory leak
      if (preview && thumbnailFile) URL.revokeObjectURL(preview);
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-80 p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-center text-black text-xl font-bold mb-4">{editingEvent ? "Edit Workshop" : "Workshop Form"}</h2>

          <div className="mb-3">
            <label className="block text-sm mb-1">Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-black outline-none" placeholder="Enter title" />
          </div>

          <div className="mb-3">
            <label className="block text-sm mb-1">Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 h-28 resize-none text-black outline-none" placeholder="Enter description" />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Attach thumbnail (optional):</label>
            <button type="button" onClick={() => fileInputRef.current.click()}
              className="flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-2 text-black hover:bg-gray-100 transition-colors w-full justify-center">
              <FaPlus className="text-purple-600" />
              <span>{thumbnailFile ? "Change Thumbnail" : (preview ? "Change Thumbnail" : "Add Thumbnail")}</span>
            </button>
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
            {preview && <img src={preview} alt="preview" className="mt-2 w-full h-28 object-cover rounded-md" />}
          </div>

          <div className="flex space-x-2">
            <button onClick={handleSave} disabled={isSaving}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md py-2 transition-colors disabled:opacity-60">
              {isSaving ? "Saving..." : (editingEvent ? "Update" : "Save")}
            </button>
            <button onClick={() => { onClose(); }} className="flex-1 bg-gray-300 text-black rounded-md py-2">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};


const EventsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        if (!res.ok) throw new Error("Failed to fetch");
        const events = await res.json();
        const mapped = events.map(ev => ({
          id: ev._id,
          title: ev.title,
          description: ev.description,
          image: ev.imageUrl ? `${API_BASE}${ev.imageUrl}` : coding
        }));
        setEventData(mapped);
      } catch (err) {
        console.error("Load events error:", err);
      }
    };
    load();
  }, []);

  const filteredEvents = eventData.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const addEvent = (newEvent) => setEventData(prev => [newEvent, ...prev]);

  const updateEventLocal = (updatedEvent) => {
    setEventData(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setEventData(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const startEdit = (event) => {
    setEditingEvent(event);
    setIsPopupVisible(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white font-sans">
      <h1 className="text-5xl font-bold mb-6">Events <span className="text-purple-500">Management</span></h1>

      <div className="rounded-3xl p-6 bg-purple-800">
        <div className="flex mb-6 max-w-md">
          <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 rounded-2xl text-black outline-none" />
          <button className="p-3 bg-purple-400 ml-4 rounded-full hover:bg-[#9238c7] transition-colors"
            onClick={() => { setEditingEvent(null); setIsPopupVisible(true); }}>
            <FaPlus />
          </button>
        </div>

        <WorkshopForm isOpen={isPopupVisible}
          onClose={() => { setIsPopupVisible(false); setEditingEvent(null); }}
          onSaved={addEvent}
          onUpdated={updateEventLocal}
          editingEvent={editingEvent}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white text-black rounded-lg shadow-md p-4 pb-16 relative w-auto">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <div className="flex flex-row justify-between">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <div className="flex space-x-3 z-10">
                  <FaEdit onClick={() => startEdit(event)} className="cursor-pointer hover:text-blue-600 text-xl" />
                  <FaTrash onClick={() => deleteEvent(event.id)} className="cursor-pointer hover:text-red-600 text-xl" />
                </div>
              </div>
              <p className="text-sm break-words whitespace-normal">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsManagement;
