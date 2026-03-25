import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const ReminderList = ({ refreshKey }) => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReminders = async () => {
    try {
      const res = await apiClient.get("/reminders");
      setReminders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this reminder?");
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/reminders/${id}`);
      setReminders((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete reminder failed:", error);
      alert("Failed to delete reminder");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Interview Reminders</h2>

      {loading ? (
        <p className="text-gray-500">Loading reminders...</p>
      ) : reminders.length === 0 ? (
        <p className="text-gray-500">No reminders added yet.</p>
      ) : (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder._id}
              className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <div>
                <p className="font-semibold text-lg">
                  {reminder.job_id?.role || "Job Role"} @ {reminder.job_id?.company_name || "Company"}
                </p>
                <p className="text-gray-600 text-sm">
                  {new Date(reminder.reminder_date).toLocaleString()}
                </p>
                <p className="mt-2 text-gray-700">{reminder.message}</p>
              </div>

              <button
                onClick={() => handleDelete(reminder._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReminderList;