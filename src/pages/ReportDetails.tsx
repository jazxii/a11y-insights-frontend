import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from '../components/ui';

interface Props { dark: boolean }

interface ReportData {
id: string;
title: string;
platform: string;
date: string;
status: string;
checklist: string;
wcag: string;
acceptanceCriteria: string[];
}

const ReportDetails: React.FC<Props> = ({ dark }) => {
const { id } = useParams();
const [report, setReport] = useState<ReportData | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchReport = async () => {
setLoading(true);
try {
// Simulate API call — replace with actual Django backend route
const response = await fetch(`/api/reports/${id}`);
const data: ReportData = await response.json();
setReport(data);
} catch (error) {
console.error('Failed to fetch report:', error);
} finally {
setLoading(false);
}
};
fetchReport();
}, [id]);

if (loading) return <div className="p-8 text-center">Loading report...</div>;
if (!report) return <div className="p-8 text-center text-red-400">Report not found.</div>;

return (
<div className={`p-8 ${dark ? 'text-white' : 'text-gray-900'} transition-colors`}>
{/* Breadcrumbs */}
<nav className={`text-sm mb-6 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
<Link to="/" className="hover:text-blue-400">Dashboard</Link> /{' '}
<Link to="/reports" className="hover:text-blue-400">Reports</Link> /{' '}
<span>{report.title} (A11Y-{report.id})</span>
</nav>

<h2 className="text-3xl font-semibold mb-6">Accessibility Analysis — {report.title}</h2>

{/* Header section */}
<div className="flex justify-between items-center mb-6">
<div className="flex gap-6">
<p><strong>Platform:</strong> {report.platform}</p>
<p><strong>Date:</strong> {report.date}</p>
<p><strong>Status:</strong> {report.status}</p>
</div>
<div className="space-x-2">
<Button className="bg-gray-700 hover:bg-gray-800 text-white">Edit Report</Button>
<Button className="bg-blue-600 hover:bg-blue-700 text-white">Add to JIRA Ticket</Button>
<Button onClick={() => window.print()} className="bg-gray-700 hover:bg-gray-800 text-white">Export as PDF</Button>
</div>
</div>

{/* Switch Views */}
<div className="flex gap-3 mb-8">
<Button className="bg-blue-600 hover:bg-blue-700 text-white">Markdown View</Button>
<Button className="bg-gray-800 hover:bg-gray-700 text-white">JSON View</Button>
</div>

{/* Developer Checklist */}
<Card className={`${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} p-6 mb-8`}>
<h3 className="text-xl font-semibold mb-4">1. Accessibility Developer Checklist</h3>
<p className="mb-4">{report.checklist}</p>
<div className={`${dark ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-md mb-3`}>
<p><strong>Intent:</strong> Helps screen reader users understand visual content.</p>
</div>
<div className={`${dark ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-md mb-4`}>
<p><strong>WCAG Reference:</strong> {report.wcag}</p>
</div>
</Card>

{/* Acceptance Criteria */}
<Card className={`${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} p-6`}>
<h3 className="text-xl font-semibold mb-4">Accessibility Acceptance Criteria (for JIRA)</h3>
<ul className="list-disc list-inside space-y-2">
{report.acceptanceCriteria.map((item, index) => (
<li key={index}>{item}</li>
))}
</ul>
</Card>
</div>
);
};

export default ReportDetails;