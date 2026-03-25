import React from "react";

const JobCard = ({ job, onEdit, onDelete, onReminder }) => {
  return (
    <div className="border rounded p-4 shadow-sm bg-white mb-3">
      <h2 className="text-lg font-semibold">{job.role}</h2>
      <p className="text-gray-600">{job.company_name}</p>

      <p
        className={`mt-1 font-medium ${
          job.status === "Applied"
            ? "text-blue-500"
            : job.status === "Interview"
            ? "text-yellow-500"
            : job.status === "Offer"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {job.status}
      </p>

      {job.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {job.resume_url && (
        <a
          href={job.resume_url.replace("/upload/", "/upload/fl_attachment/")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 underline mt-2 block"
        >
          View Resume
        </a>
      )}


      <div className="mt-5 pt-4 border-t border-slate-700/50 flex flex-wrap items-center gap-2">
  {/* Edit Button */}
  <button
    onClick={() => onEdit(job)}
    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg transition-all hover:bg-amber-400/20 hover:border-amber-400/40 active:scale-95"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
    Edit
  </button>

  {/* Reminder Button */}
  <button
    onClick={() => onReminder(job)}
    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-lg transition-all hover:bg-purple-400/20 hover:border-purple-400/40 active:scale-95"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    Remind
  </button>

  {/* Delete Button */}
  <button
    onClick={() => onDelete(job._id)}
    className="inline-flex items-center justify-center p-2 text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-lg transition-all hover:bg-rose-500 hover:text-white hover:border-rose-500 active:scale-95"
    title="Delete Job"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  </button>
</div>
    </div>
  );
};

export default JobCard;