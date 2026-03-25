import React, { useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    tag: "",
  });

  const handleChange = (e) => {
    const updatedFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      status: "",
      tag: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
   
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 transition-all hover:shadow-md">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    
    {/* Search Input with Icon */}
    <div className="relative group">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        name="search"
        placeholder="Search company or role..."
        value={filters.search}
        onChange={handleChange}
        className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl pl-10 pr-4 py-3 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 font-medium"
      />
    </div>

    {/* Status Select with Custom Style */}
    <div className="relative group">
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer appearance-none font-medium"
      >
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    {/* Tag Input with Icon */}
    <div className="relative group">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      </div>
      <input
        type="text"
        name="tag"
        placeholder="Filter by tag..."
        value={filters.tag}
        onChange={handleChange}
        className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl pl-10 pr-4 py-3 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400 font-medium"
      />
    </div>

    {/* Reset Button - Styled as a clean secondary action */}
    <button
      onClick={handleReset}
      className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl px-4 py-3 font-bold transition-all active:scale-95 border border-transparent hover:border-gray-300"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Reset Filters
    </button>
  </div>
</div>
  );
};

export default FilterBar;