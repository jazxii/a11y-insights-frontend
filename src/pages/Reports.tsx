import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui";
import { getReports, deleteReportById } from "../services/api";
import { toast } from "react-toastify";

interface Props { dark: boolean }

interface Report {
  ticket_id: string;
  summary: string;
  created_at: string;
}

const Reports: React.FC<Props> = ({ dark }) => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);


  const handleDelete = async (ticketId: string) => {
    if (!window.confirm(`Are you sure you want to delete report ${ticketId}?`)) return;
    try {
      await deleteReportById(ticketId);
      toast.success(`Report ${ticketId} deleted successfully.`);
      setReports((prev) => prev.filter((r) => r.ticket_id !== ticketId));
    } catch (error) {
      toast.error("Failed to delete report.");
    }
  };

useEffect(() => {
  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getReports("Web", 0, 100);
      setReports(Array.isArray(data) ? data : []); // fallback safety
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      toast.error("Failed to load reports from server.");
    } finally {
      setLoading(false);
    }
  };
  fetchReports();
}, []);

  if (loading)
    return <div className="p-8 text-center">Loading reports...</div>;

  return (
    <div className={`p-8 ${dark ? "text-white" : "text-gray-900"} transition-colors`}>
      <h2 className="text-2xl font-semibold mb-6">Reports</h2>

      {reports.length === 0 ? (
        <p className="text-center text-gray-400">No reports found. Generate one from Analyze page.</p>
      ) : (
        <table className={`w-full ${dark ? "text-gray-300" : "text-gray-800"}`}>
          <thead>
            <tr className={`${dark ? "border-b border-gray-700 text-gray-400" : "border-b border-gray-300 text-gray-600"}`}>
              <th className="p-2 text-left">Ticket ID</th>
              <th className="p-2 text-left">Summary</th>
              <th className="p-2 text-left">Created</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.ticket_id} className={`${dark ? "border-b border-gray-800" : "border-b border-gray-200"}`}>
                <td className="p-2 font-medium">{report.ticket_id}</td>
                <td className="p-2 w-1/2">{report.summary}</td>
                <td className="p-2">
                  {new Date(report.created_at).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="p-2 space-x-2">
                  <Button onClick={() => navigate(`/reports/${report.ticket_id}`)} className="bg-blue-600 hover:bg-blue-700 text-white">
                    View
                  </Button>
                  <Button className="bg-gray-700 hover:bg-gray-800 text-white">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(report.ticket_id)}
                    className="bg-red-700 hover:bg-red-800 text-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
