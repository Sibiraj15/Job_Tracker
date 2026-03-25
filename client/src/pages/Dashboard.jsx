;import React, { useState } from "react";
import Navbar from "../components/Navbar";
import KanbanBoard from "../components/KanbanBoard";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import JobFormModal from "../components/JobFormModal";
import FilterBar from "../components/FilterBar";
import ReminderModal from "../components/ReminderModal";
import ReminderList from "../components/ReminderList";
import ExportButtons from "../components/ExportButtons";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    tag: "",
  });

  const handleJobChange = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleAddJob = () => {
    setSelectedJob(null);
    setIsModalOpen(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleReminderJob = (job) => {
    setSelectedJob(job);
    setIsReminderOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="flex flex-wrap gap-3">
            <ExportButtons />

            <button
              onClick={handleAddJob}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              + Add Job
            </button>
          </div>
        </div>

        <FilterBar onFilterChange={setFilters} />

        <KanbanBoard
          refreshKey={refreshKey}
          filters={filters}
          onEditJob={handleEditJob}
          onReminderJob={handleReminderJob}
          onJobChange={handleJobChange}
        />

        <AnalyticsDashboard refreshKey={refreshKey} />

        <ReminderList refreshKey={refreshKey} />

        <JobFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleJobChange}
          editJob={selectedJob}
        />

        <ReminderModal
          isOpen={isReminderOpen}
          onClose={() => setIsReminderOpen(false)}
          selectedJob={selectedJob}
          onSuccess={handleJobChange}
        />
      </div>
    <Footer />
    </div>

  );
};

export default Dashboard;


