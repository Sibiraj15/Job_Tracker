import React from "react";
import apiClient from "../services/apiClient";

const ExportButtons = () => {
  const downloadFile = async (type) => {
    try {
      const response = await apiClient.get(`/export/${type}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type:
          type === "csv"
            ? "text/csv;charset=utf-8;"
            : "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const fileName =
        type === "csv" ? "job-tracker-data.csv" : "job-tracker-data.pdf";

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Failed to export ${type}:`, error);
      alert(`Failed to export ${type.toUpperCase()}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => downloadFile("csv")}
        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition font-medium"
      >
        Export CSV
      </button>

      <button
        onClick={() => downloadFile("pdf")}
        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition font-medium"
      >
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;