// src/pages/Analyze.tsx
import React, { useState } from "react";
import { Card, Button, Input } from "../components/ui";
import { analyzeUserStory } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  dark: boolean;
}

const Analyze: React.FC<Props> = ({ dark }) => {
  const [mode, setMode] = useState<"jira" | "userstory">("jira");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ticketLink: "",
    ticketId: "",
    summary: "",
    description: "",
    metadata: {
      Project: "",
      Pillar: "",
      Assignee: "",
      Team: "",
      "Fix Version": "",
    },
  });

  const handleChange = (key: string, value: string) => {
    if (["Project", "Pillar", "Assignee", "Team", "Fix Version"].includes(key)) {
      setFormData((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleAnalyze = async () => {
    if (!formData.description.trim()) {
      toast.error("Please provide a description before analyzing.");
      return;
    }

    try {
      setLoading(true);

      const payload =
        mode === "jira"
          ? {
              mode,
              jira_link: formData.ticketLink,
              summary: formData.summary,
              description: formData.description,
            }
          : {
              mode,
              ticket_id: formData.ticketId,
              summary: formData.summary,
              description: formData.description,
              metadata: formData.metadata,
            };

      const result = await analyzeUserStory(payload);
      console.log("✅ Full analyze result:", result);

      // ✅ Toast with a View Report button
      const ViewButton = () => (
        <div className="flex justify-between items-center gap-2">
          <span>
            {result.updated
              ? `🔁 Report for ${result.ticket_id} updated successfully!`
              : `✅ Report for ${result.ticket_id} created successfully!`}
          </span>
          <button
            onClick={() => navigate(`/reports/${result.ticket_id}`)}
            className="ml-3 px-3 py-1 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            View Report
          </button>
        </div>
      );

      toast(<ViewButton />, {
        position: "top-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
      });
    } catch (err: any) {
      console.error("❌ Analyze failed:", err);
      toast.error(err?.detail || "Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-8 ${dark ? "text-white" : "text-gray-900"} transition-colors`}>
      <ToastContainer position="top-center" autoClose={4000} />
      <h2 className="text-2xl font-semibold mb-6">Upload / Analyze</h2>

      <Card
        className={`${
          dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"
        } p-6 transition-colors`}
      >
        {/* Mode Buttons */}
        <div className="mb-6 flex gap-4">
          <Button
            onClick={() => setMode("jira")}
            className={`${
              mode === "jira" ? "bg-blue-600" : dark ? "bg-gray-800" : "bg-gray-200"
            } text-white`}
          >
            Analyze via JIRA Ticket
          </Button>
          <Button
            onClick={() => setMode("userstory")}
            className={`${
              mode === "userstory" ? "bg-blue-600" : dark ? "bg-gray-800" : "bg-gray-200"
            } text-white`}
          >
            Analyze via User Story
          </Button>
        </div>

        {/* Input Form */}
        {mode === "jira" ? (
          <>
            <label className="block mb-2">JIRA Ticket Link *</label>
            <Input
              placeholder="Paste JIRA ticket link here"
              value={formData.ticketLink}
              onChange={(e) => handleChange("ticketLink", e.target.value)}
              className={`${
                dark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              } mb-4`}
            />

            <label className="block mb-2">Summary</label>
            <Input
              placeholder="Optional"
              value={formData.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              className={`${
                dark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              } mb-4`}
            />

            <label className="block mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={`w-full p-2 rounded-md h-24 border ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
            />
          </>
        ) : (
          <>
            <label className="block mb-2">JIRA Ticket ID *</label>
            <Input
              placeholder="e.g., A11Y-2053"
              value={formData.ticketId}
              onChange={(e) => handleChange("ticketId", e.target.value)}
              className={`${
                dark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              } mb-4`}
            />

            <label className="block mb-2">Summary</label>
            <Input
              placeholder="Enter user story summary"
              value={formData.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              className={`${
                dark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              } mb-4`}
            />

            <label className="block mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={`w-full p-2 rounded-md h-24 border ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
            />

            <details className="mb-4">
              <summary className="cursor-pointer mb-2">Metadata (Optional)</summary>
              <div className="grid grid-cols-3 gap-4 mt-3">
                {["Project", "Pillar", "Assignee", "Team", "Fix Version"].map((label, i) => (
                  <Input
                    key={i}
                    placeholder={label}
                    value={formData.metadata[label as keyof typeof formData.metadata]}
                    onChange={(e) => handleChange(label, e.target.value)}
                    className={`${
                      dark
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-900"
                    }`}
                  />
                ))}
              </div>
            </details>
          </>
        )}

        <Button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 mt-4 text-white w-full flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating...
            </>
          ) : (
            "Analyze Ticket"
          )}
        </Button>
      </Card>
    </div>
  );
};

export default Analyze;
