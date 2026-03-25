import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import JobCard from "./JobCard";
import apiClient from "../services/apiClient";

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

// Helper for status colors
const statusColors = {
  Applied: "bg-blue-500",
  Interview: "bg-purple-500",
  Offer: "bg-emerald-500",
  Rejected: "bg-rose-500",
};

const KanbanBoard = ({ refreshKey, filters, onEditJob, onReminderJob, onJobChange }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const params = {};
      if (filters?.search) params.search = filters.search;
      if (filters?.status) params.status = filters.status;
      if (filters?.tag) params.tag = filters.tag;

      const res = await apiClient.get("/jobs", { params });
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [refreshKey, filters]);

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/jobs/${jobId}`);
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      onJobChange();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete job");
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;
    if (sourceStatus === destinationStatus) return;

    const updatedJobs = jobs.map((job) =>
      job._id === draggableId ? { ...job, status: destinationStatus } : job
    );
    setJobs(updatedJobs);

    try {
      await apiClient.put(`/jobs/${draggableId}`, {
        status: destinationStatus,
      });
      onJobChange();
    } catch (err) {
      console.error("Failed to update job status:", err);
      fetchJobs();
    }
  };

  const columns = statuses.reduce((acc, status) => {
    acc[status] = jobs.filter((job) => job.status === status);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading your pipeline...</p>
      </div>
    );
  }

  return (
    <div className="w-full pb-8">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Horizontal scroll container for smaller screens */}
        <div className="flex overflow-x-auto pb-4 gap-6 snap-x">
          {statuses.map((status) => (
            <div key={status} className="flex-shrink-0 w-80 snap-start">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusColors[status] || 'bg-gray-400'}`}></span>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-600">
                    {status}
                  </h2>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">
                    {columns[status]?.length || 0}
                  </span>
                </div>
              </div>

              {/* Droppable Area */}
              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`rounded-xl p-3 min-h-[70vh] transition-colors duration-200 border-2 border-dashed ${
                      snapshot.isDraggingOver 
                        ? "bg-blue-50/50 border-blue-200" 
                        : "bg-gray-50/50 border-transparent"
                    }`}
                  >
                    <div className="space-y-4">
                      {columns[status]?.map((job, index) => (
                        <Draggable
                          key={job._id}
                          draggableId={job._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`transform transition-transform ${
                                snapshot.isDragging ? "z-50 rotate-2" : ""
                              }`}
                            >
                              <JobCard
                                job={job}
                                onEdit={onEditJob}
                                onDelete={handleDelete}
                                onReminder={onReminderJob}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-3xl mt-4">
          <p className="text-gray-400">No applications found in this view.</p>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;