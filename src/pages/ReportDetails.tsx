import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Button, Input, Textarea } from "../components/ui";
import { getReportById, updateReportById, deleteReportById } from "../services/api";
import { toast } from "react-toastify";

interface Props { dark: boolean }

interface ChecklistItem {
  item: string;
  intent: string;
  non_accessible_example: string;
  accessible_example: string;
  implementation_tips: { web?: string };
  wcag_reference: { id: string; name: string; url: string };
}

interface Report {
  ticket_id: string;
  summary: string;
  platform: string;
  created_at: string;
  updated_at: string;
  json_report: {
    developer_checklist: ChecklistItem[];
    acceptance_criteria: string[];
  };
}

const ReportDetails: React.FC<Props> = ({ dark }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  // Checklist modal
  const [editItem, setEditItem] = useState<ChecklistItem | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Acceptance criteria modal
  const [criteriaModalOpen, setCriteriaModalOpen] = useState(false);
  const [criteriaValue, setCriteriaValue] = useState("");
  const [editCriteriaIndex, setEditCriteriaIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const data = await getReportById(id!);
      setReport(data);
    } catch (error) {
      console.error("Failed to fetch report:", error);
      toast.error("Failed to load report details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete report ${id}? This action cannot be undone.`)) return;
    try {
      await deleteReportById(id!);
      toast.success(`🗑️ Report ${id} deleted successfully.`);
      navigate("/reports");
    } catch (error) {
      toast.error("Failed to delete report.");
    }
  };

  /** ----------- Developer Checklist Editing ----------- */
  const openEditModal = (item: ChecklistItem, index: number) => {
    setEditItem(item);
    setEditIndex(index);
  };

  const handleEditChange = (field: keyof ChecklistItem, value: any) => {
    if (!editItem) return;
    setEditItem((prev) => ({ ...prev!, [field]: value }));
  };

  const handleSaveChecklistEdit = async () => {
  if (!report || editIndex === null || !editItem) return;
  try {
    setIsSaving(true);

    const updatedChecklist = [...report.json_report.developer_checklist];
    updatedChecklist[editIndex] = editItem;

    const payload = {
      json_report: {
        ...report.json_report,
        developer_checklist: updatedChecklist,
      },
    };

    await updateReportById(report.ticket_id, payload);
    toast.success("✅ Checklist item updated successfully!");
    setEditItem(null);
    setEditIndex(null);
    await fetchReport();
  } catch (error) {
    console.error("Error updating checklist:", error);
    toast.error("Failed to update checklist item.");
  } finally {
    setIsSaving(false);
  }
};


  /** ----------- Acceptance Criteria Editing ----------- */
  const openCriteriaModal = (value = "", index: number | null = null) => {
    setCriteriaValue(value);
    setEditCriteriaIndex(index);
    setCriteriaModalOpen(true);
  };

  const handleSaveCriteria = async () => {
  if (!report) return;
  try {
    setIsSaving(true);

    let updatedCriteria = [...report.json_report.acceptance_criteria];
    if (editCriteriaIndex !== null) {
      updatedCriteria[editCriteriaIndex] = criteriaValue;
    } else {
      updatedCriteria.push(criteriaValue);
    }

    const payload = {
      json_report: {
        ...report.json_report,
        acceptance_criteria: updatedCriteria,
      },
    };

    await updateReportById(report.ticket_id, payload);
    toast.success("✅ Acceptance criteria updated successfully!");
    setCriteriaModalOpen(false);
    setCriteriaValue("");
    setEditCriteriaIndex(null);
    await fetchReport();
  } catch (error) {
    console.error("Error updating criteria:", error);
    toast.error("Failed to update acceptance criteria.");
  } finally {
    setIsSaving(false);
  }
};


  const handleDeleteCriteria = async (index: number) => {
    if (!report) return;
    const confirm = window.confirm("Delete this acceptance criterion?");
    if (!confirm) return;

    const updatedCriteria = report.json_report.acceptance_criteria.filter((_, i) => i !== index);
    const payload = {
      ...report,
      json_report: { ...report.json_report, acceptance_criteria: updatedCriteria },
    };

    try {
      await updateReportById(report.ticket_id, payload);
      toast.success("🗑️ Acceptance criterion removed.");
      await fetchReport();
    } catch (error) {
      toast.error("Failed to delete criterion.");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading report...</div>;
  if (!report) return <div className="p-8 text-center text-red-400">Report not found.</div>;

  return (
    <div className={`p-8 ${dark ? "text-white" : "text-gray-900"} transition-colors`}>
      {/* Breadcrumbs */}
      <nav className={`text-sm mb-6 ${dark ? "text-gray-400" : "text-gray-600"}`}>
        <Link to="/" className="hover:text-blue-400">Dashboard</Link> /{" "}
        <Link to="/reports" className="hover:text-blue-400">Reports</Link> /{" "}
        <span>{report.ticket_id}</span>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-semibold mb-1">{report.summary}</h2>
          <p className="text-sm text-gray-400">Ticket ID: {report.ticket_id} • Platform: {report.platform}</p>
          <p className="text-xs text-gray-500">
            Created: {new Date(report.created_at).toLocaleString()} | Updated: {new Date(report.updated_at).toLocaleString()}
          </p>
        </div>
        <div className="space-x-2 shrink-0">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add to JIRA</Button>
          <Button onClick={handleDelete} className="bg-red-700 hover:bg-red-800 text-white">Delete</Button>
        </div>
      </div>

      {/* Accessibility Developer Checklist */}
      <Card className={`${dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"} p-6 mb-8`}>
        <h3 className="text-2xl font-semibold mb-6">Accessibility Developer Checklist</h3>
        {report.json_report.developer_checklist.map((item, index) => (
          <div key={index} className={`p-4 rounded-lg mb-5 ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold">{index + 1}. {item.item}</h4>
              <Button onClick={() => openEditModal(item, index)} className="bg-gray-700 hover:bg-gray-800 text-white text-sm px-3 py-1">
                ✏️ Edit
              </Button>
            </div>
            <p className="text-sm mb-1"><strong>Intent:</strong> {item.intent}</p>
            <p className="font-medium text-red-400 mt-3">🚫 Non-Accessible Example:</p>
            <pre className="bg-black/80 text-gray-200 text-sm p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
              {item.non_accessible_example}
            </pre>
            <p className="font-medium text-green-400 mt-3">✅ Accessible Example:</p>
            <pre className="bg-black/80 text-gray-200 text-sm p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
              {item.accessible_example}
            </pre>
            {item.implementation_tips.web && (
              <p className="mt-3 text-sm">
                <strong>💡 Implementation Tips (Web):</strong> {item.implementation_tips.web}
              </p>
            )}
            <a
              href={item.wcag_reference.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 text-sm underline mt-2 block"
            >
              {item.wcag_reference.id} — {item.wcag_reference.name}
            </a>
          </div>
        ))}
      </Card>

      {/* Accessibility Acceptance Criteria */}
      <Card className={`${dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"} p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Accessibility Acceptance Criteria</h3>
          <Button onClick={() => openCriteriaModal()} className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1">
            ➕ Add Criterion
          </Button>
        </div>
        <ul className="list-disc list-inside space-y-3">
          {report.json_report.acceptance_criteria.map((criterion, idx) => (
            <li key={idx} className="flex items-start justify-between gap-3 bg-gray-800/40 p-3 rounded-md">
              <span>{criterion}</span>
              <div className="space-x-2 shrink-0">
                <Button onClick={() => openCriteriaModal(criterion, idx)} className="bg-gray-700 hover:bg-gray-800 text-white text-sm px-3 py-1">
                  ✏️ Edit
                </Button>
                <Button onClick={() => handleDeleteCriteria(idx)} className="bg-red-700 hover:bg-red-800 text-white text-sm px-3 py-1">
                  🗑️ Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
{/* Modal for Editing Checklist */}
      {editItem && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className={`w-full max-w-3xl rounded-xl shadow-lg ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-6`}>
            <h3 className="text-xl font-semibold mb-4">Edit Checklist Item</h3>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <Input
                value={editItem.item}
                onChange={(e) => handleEditChange("item", e.target.value)}
                placeholder="Checklist item title"
                className="w-full"
              />
              <Textarea
                value={editItem.intent}
                onChange={(e) => handleEditChange("intent", e.target.value)}
                placeholder="Intent"
                className="w-full h-20"
              />
              <Textarea
                value={editItem.non_accessible_example}
                onChange={(e) => handleEditChange("non_accessible_example", e.target.value)}
                placeholder="Non-accessible example code"
                className="w-full h-28 font-mono"
              />
              <Textarea
                value={editItem.accessible_example}
                onChange={(e) => handleEditChange("accessible_example", e.target.value)}
                placeholder="Accessible example code"
                className="w-full h-28 font-mono"
              />
              <Input
                value={editItem.implementation_tips.web || ""}
                onChange={(e) =>
                  handleEditChange("implementation_tips", { web: e.target.value })
                }
                placeholder="Implementation tips (Web)"
                className="w-full"
              />
              <div className="grid grid-cols-3 gap-3">
                <Input
                  value={editItem.wcag_reference.id}
                  onChange={(e) =>
                    handleEditChange("wcag_reference", { ...editItem.wcag_reference, id: e.target.value })
                  }
                  placeholder="WCAG ID"
                />
                <Input
                  value={editItem.wcag_reference.name}
                  onChange={(e) =>
                    handleEditChange("wcag_reference", { ...editItem.wcag_reference, name: e.target.value })
                  }
                  placeholder="WCAG Name"
                />
                <Input
                  value={editItem.wcag_reference.url}
                  onChange={(e) =>
                    handleEditChange("wcag_reference", { ...editItem.wcag_reference, url: e.target.value })
                  }
                  placeholder="WCAG URL"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={() => setEditItem(null)} className="bg-gray-700 hover:bg-gray-800 text-white">
                Cancel
              </Button>
              <Button onClick={handleSaveChecklistEdit} disabled={isSaving} className="bg-green-600 hover:bg-green-700 text-white">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}




      {/* Acceptance Criteria Modal */}
      {criteriaModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className={`w-full max-w-lg rounded-xl shadow-lg ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-6`}>
            <h3 className="text-xl font-semibold mb-4">{editCriteriaIndex !== null ? "Edit" : "Add"} Criterion</h3>
            <textarea
              value={criteriaValue}
              onChange={(e) => setCriteriaValue(e.target.value)}
              placeholder="Enter accessibility acceptance criterion..."
              className="w-full h-24 rounded-md border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={() => setCriteriaModalOpen(false)} className="bg-gray-700 hover:bg-gray-800 text-white">Cancel</Button>
              <Button onClick={handleSaveCriteria} disabled={isSaving} className="bg-green-600 hover:bg-green-700 text-white">
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDetails;
