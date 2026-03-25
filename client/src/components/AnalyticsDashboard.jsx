import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = ({refreshKey}) => {
  const [analytics, setAnalytics] = useState(null);


  useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      const res = await apiClient.get("/analytics");
      setAnalytics(res.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    }
  };

  fetchAnalytics();
}, [refreshKey]);

  if (!analytics) {
    return <div className="text-center py-10">Loading analytics...</div>;
  }

  const statusLabels = Object.keys(analytics.byStatus || {});
  const statusValues = Object.values(analytics.byStatus || {});

  const companyLabels = analytics.byCompany?.map((item) => item._id) || [];
  const companyValues = analytics.byCompany?.map((item) => item.count) || [];

  const timelineLabels = analytics.byTimeline?.map((item) => item._id) || [];
  const timelineValues = analytics.byTimeline?.map((item) => item.count) || [];

  // 🎨 Colors
  const statusColors = [
    "rgba(59, 130, 246, 0.8)",   // Applied - Blue
    "rgba(245, 158, 11, 0.8)",   // Interview - Amber
    "rgba(34, 197, 94, 0.8)",    // Offer - Green
    "rgba(239, 68, 68, 0.8)",    // Rejected - Red
  ];

  const statusBorderColors = [
    "rgba(59, 130, 246, 1)",
    "rgba(245, 158, 11, 1)",
    "rgba(34, 197, 94, 1)",
    "rgba(239, 68, 68, 1)",
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
      {/* Jobs by Status */}
      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-lg font-bold mb-4">Jobs by Status</h2>
        <Doughnut
          data={{
            labels: statusLabels,
            datasets: [
              {
                label: "Jobs",
                data: statusValues,
                backgroundColor: statusColors,
                borderColor: statusBorderColors,
                borderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>

      {/* Applications by Company */}
      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-lg font-bold mb-4">Applications by Company</h2>
        <Bar
          data={{
            labels: companyLabels,
            datasets: [
              {
                label: "Applications",
                data: companyValues,
                backgroundColor: [
                  "rgba(99, 102, 241, 0.8)",
                  "rgba(16, 185, 129, 0.8)",
                  "rgba(244, 114, 182, 0.8)",
                  "rgba(251, 191, 36, 0.8)",
                  "rgba(59, 130, 246, 0.8)",
                  "rgba(239, 68, 68, 0.8)",
                ],
                borderRadius: 8,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>

      {/* Applications Timeline */}
      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-lg font-bold mb-4">Applications Timeline</h2>
        <Line
          data={{
            labels: timelineLabels,
            datasets: [
              {
                label: "Applications",
                data: timelineValues,
                borderColor: "rgba(59, 130, 246, 1)",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "rgba(59, 130, 246, 1)",
                pointBorderColor: "#fff",
                pointRadius: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;