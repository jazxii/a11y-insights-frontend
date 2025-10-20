import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Sidebar = () => (
  <div className="w-64 h-screen bg-[#0e0f12] text-gray-200 flex flex-col justify-between p-4 border-r border-gray-800">
    <div>
      <h1 className="text-xl font-semibold text-white mb-8">A11y <span className="text-blue-400">Insights</span></h1>
      <nav className="flex flex-col gap-3">
        <NavLink to="/" className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-gray-800'}`}>Dashboard</NavLink>
        <NavLink to="/analyze" className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-gray-800'}`}>Upload / Analyze</NavLink>
        <NavLink to="/reports" className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-gray-800'}`}>Reports</NavLink>
        <NavLink to="/settings" className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-gray-800'}`}>Settings</NavLink>
      </nav>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="p-8 text-white">
    <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
    <div className="grid grid-cols-3 gap-6 mb-8">
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <p className="text-gray-400">Total Reports Analyzed</p>
          <h3 className="text-3xl font-bold mt-2">128</h3>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <p className="text-gray-400">Open Issues</p>
          <h3 className="text-3xl font-bold mt-2">24</h3>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <p className="text-gray-400">Last Analysis Run</p>
          <h3 className="text-2xl font-semibold mt-2">Oct 15, 2025</h3>
        </CardContent>
      </Card>
    </div>
    <Card className="bg-gray-900 border-gray-700">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Reports</h3>
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="p-2">Report Title</th>
              <th className="p-2">Date</th>
              <th className="p-2">Platform</th>
              <th className="p-2">Issues Found</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800">
              <td className="p-2">Checkout Flow</td>
              <td className="p-2">Oct 15, 2025</td>
              <td className="p-2">iOS</td>
              <td className="p-2">12</td>
              <td className="p-2 text-red-400">Issues</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="p-2">Sign In Page</td>
              <td className="p-2">Oct 14, 2025</td>
              <td className="p-2">Web</td>
              <td className="p-2">0</td>
              <td className="p-2 text-green-400">Passed</td>
            </tr>
            <tr>
              <td className="p-2">Product Detail</td>
              <td className="p-2">Oct 10, 2025</td>
              <td className="p-2">Android</td>
              <td className="p-2">8</td>
              <td className="p-2 text-yellow-400">Review Needed</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  </div>
);

const Analyze = () => {
  const [mode, setMode] = useState('jira'); // 'jira' or 'userstory'

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-semibold mb-6">Upload / Analyze</h2>
      <Card className="bg-gray-900 border-gray-700 p-6">
        <div className="mb-6 flex gap-4">
          <Button
            onClick={() => setMode('jira')}
            className={`${mode === 'jira' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            Analyze via JIRA Ticket
          </Button>
          <Button
            onClick={() => setMode('userstory')}
            className={`${mode === 'userstory' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            Analyze via User Story
          </Button>
        </div>

        {mode === 'jira' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">JIRA Ticket Link *</label>
              <Input placeholder="Paste JIRA ticket link here" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Summary</label>
              <Input placeholder="Optional" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Description</label>
              <textarea className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white h-24" />
            </div>
          </>
        )}

        {mode === 'userstory' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">JIRA Ticket ID *</label>
              <Input placeholder="e.g., A11Y-2053" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Summary</label>
              <Input placeholder="Enter user story summary" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Description</label>
              <textarea className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white h-24" />
            </div>
            <details className="mb-4">
              <summary className="cursor-pointer text-gray-400 mb-2">Metadata (Optional)</summary>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <Input placeholder="Project" className="bg-gray-800 border-gray-700 text-white" />
                <Input placeholder="Pillar" className="bg-gray-800 border-gray-700 text-white" />
                <Input placeholder="Assignee" className="bg-gray-800 border-gray-700 text-white" />
                <Input placeholder="Team" className="bg-gray-800 border-gray-700 text-white" />
                <Input placeholder="Fix Version" className="bg-gray-800 border-gray-700 text-white" />
              </div>
            </details>
          </>
        )}

        <Button className="bg-blue-600 hover:bg-blue-700 mt-4">Analyze Ticket</Button>
      </Card>
    </div>
  );
};

const Reports = () => {
  const navigate = useNavigate();
  const handleView = (id) => navigate(`/reports/${id}`);

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-semibold mb-6">Reports</h2>
      <table className="w-full text-gray-300">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="p-2 text-left">Summary</th>
            <th className="p-2 text-left">Created</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3,4,5].map((id) => (
            <tr key={id} className="border-b border-gray-800">
              <td className="p-2">Accessibility audit for homepage {id}</td>
              <td className="p-2">1 hour ago</td>
              <td className="p-2 space-x-2">
                <Button onClick={() => handleView(id)} className="bg-blue-600 hover:bg-blue-700">View</Button>
                <Button className="bg-gray-700 hover:bg-gray-800">Edit</Button>
                <Button className="bg-red-700 hover:bg-red-800">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ReportDetails = () => {
  const { id } = useParams();
  return (
    <div className="p-8 text-white">
      <nav className="text-gray-400 text-sm mb-6">
        <Link to="/" className="hover:text-blue-400">Dashboard</Link> /{' '}
        <Link to="/reports" className="hover:text-blue-400">Reports</Link> /{' '}
        <span className="text-gray-300">Checkout Flow (A11Y-{id})</span>
      </nav>

      <h2 className="text-3xl font-semibold mb-6">Accessibility Analysis — Checkout Flow (A11Y-{id})</h2>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6 text-gray-400">
          <p><strong>Platform:</strong> Web</p>
          <p><strong>Date:</strong> Oct 17, 2025</p>
          <p><strong>Status:</strong> Completed</p>
        </div>
        <div className="space-x-2">
          <Button className="bg-gray-700 hover:bg-gray-800">Edit Report</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Add to JIRA Ticket</Button>
          <Button className="bg-gray-700 hover:bg-gray-800">Export as PDF</Button>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <Button className="bg-blue-600 hover:bg-blue-700">Markdown View</Button>
        <Button className="bg-gray-800 hover:bg-gray-700">JSON View</Button>
      </div>

      <Card className="bg-gray-900 border border-gray-700 p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">1. Accessibility Developer Checklist</h3>
        <p className="text-gray-300 mb-4">Provide text alternatives for non-text content</p>

        <div className="bg-gray-800 p-4 rounded-md mb-3">
          <p className="text-gray-400 mb-1"><strong>Intent:</strong> Helps screen reader users understand visual content</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-md mb-3">
          <p className="text-gray-400 mb-1"><strong>Non-Accessible Example:</strong></p>
          <code className="block bg-black text-green-400 p-2 rounded-md">{'<img src="logo.png">'}</code>
        </div>

        <div className="bg-gray-800 p-4 rounded-md mb-4">
          <p className="text-gray-400 mb-1"><strong>Accessible Example:</strong></p>
          <code className="block bg-black text-green-400 p-2 rounded-md">{'<img src="logo.png" alt="Company logo">'}</code>
        </div>

        <p className="text-gray-400 text-sm">WCAG Reference <strong>1.1 – Non-text Content</strong> — iOS: <code>accessibilityLabel</code> | Android: <code>contentDescription</code></p>
      </Card>

      <Card className="bg-gray-900 border border-gray-700 p-6">
        <h3 className="text-xl font-semibold mb-4">Accessibility Acceptance Criteria (for JIRA)</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>All buttons are accessible via keyboard navigation.</li>
          <li>Screen reader announces dynamic state changes.</li>
          <li>Color contrast meets 4.5:1 ratio minimum.</li>
        </ul>
      </Card>
    </div>
  );
};

const App = () => (
  <Router>
    <div className="flex bg-[#0b0c0e] min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
