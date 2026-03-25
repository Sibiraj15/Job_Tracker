import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const JobFormModal = ({ isOpen, onClose, onSuccess, editJob = null }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    role: "",
    status: "Applied",
    notes: "",
    tags: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editJob) {
      setFormData({
        company_name: editJob.company_name || "",
        role: editJob.role || "",
        status: editJob.status || "Applied",
        notes: Array.isArray(editJob.notes) ? editJob.notes.join(", ") : "",
        tags: Array.isArray(editJob.tags) ? editJob.tags.join(", ") : "",
      });
    } else {
      setFormData({
        company_name: "",
        role: "",
        status: "Applied",
        notes: "",
        tags: "",
      });
      setResumeFile(null);
    }
  }, [editJob, isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = new FormData();
    payload.append("company_name", formData.company_name);
    payload.append("role", formData.role);
    payload.append("status", formData.status);

    const notesArray = formData.notes
      ? formData.notes.split(",").map((n) => n.trim()).filter(Boolean)
      : [];

    const tagsArray = formData.tags
      ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    payload.append("notes", JSON.stringify(notesArray));
    payload.append("tags", JSON.stringify(tagsArray));

    if (resumeFile) {
      payload.append("resume", resumeFile);
    }

    if (editJob) {
      await apiClient.put(`/jobs/${editJob._id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await apiClient.post("/jobs", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    onSuccess();
    onClose();
  } catch (error) {
    console.error("Job save failed:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to save job");
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 px-4 transition-all">
  <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-lg p-8 relative overflow-hidden">
    
    {/* Decorative background glow */}
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full"></div>

    {/* Close Button */}
    <button
      onClick={onClose}
      className="absolute top-5 right-5 text-slate-400 hover:text-white hover:bg-slate-800 w-8 h-8 flex items-center justify-center rounded-full transition-colors font-light text-2xl"
    >
      ×
    </button>

    <h2 className="text-2xl font-extrabold text-white mb-6 tracking-tight">
      {editJob ? "Edit Application" : "Add New Application"}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5 relative">
      
      {/* Company Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Company</label>
        <input
          type="text"
          name="company_name"
          placeholder="e.g. Google"
          value={formData.company_name}
          onChange={handleChange}
          required
          className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
        />
      </div>

      {/* Role */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Role</label>
        <input
          type="text"
          name="role"
          placeholder="e.g. Frontend Developer"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="Remote, Full-time"
            value={formData.tags}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Notes</label>
        <textarea
          name="notes"
          placeholder="Mentioned relocation bonus..."
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600 resize-none"
        />
      </div>

      {/* File Upload (Resume) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Attachment</label>
        <div className="relative group">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600/10 file:text-blue-400 hover:file:bg-blue-600/20 cursor-pointer bg-slate-800/30 border border-slate-700 rounded-xl p-2"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </span>
        ) : editJob ? "Update Job Details" : "Create New Job"}
      </button>
    </form>
  </div>
</div>


  );
};

export default JobFormModal;