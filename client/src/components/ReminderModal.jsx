import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const ReminderModal = ({ isOpen, onClose, selectedJob, onSuccess }) => {
  const [formData, setFormData] = useState({
    reminder_date: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        reminder_date: "",
        message: selectedJob
          ? `Reminder for ${selectedJob.role} at ${selectedJob.company_name}`
          : "",
      });
    }
  }, [isOpen, selectedJob]);

  if (!isOpen || !selectedJob) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reminder_date) {
      alert("Please select reminder date");
      return;
    }

    setLoading(true);

    try {
      await apiClient.post("/reminders", {
        job_id: selectedJob._id,
        reminder_date: formData.reminder_date,
        message: formData.message,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create reminder:", error);
      alert(error.response?.data?.message || "Failed to create reminder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Set Reminder</h2>

        <div className="mb-4 text-sm text-gray-600">
          <p><span className="font-semibold">Role:</span> {selectedJob.role}</p>
          <p><span className="font-semibold">Company:</span> {selectedJob.company_name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Reminder Date & Time</label>
            <input
              type="datetime-local"
              name="reminder_date"
              value={formData.reminder_date}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Enter reminder message..."
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {loading ? "Saving..." : "Save Reminder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderModal;