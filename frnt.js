import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Sidebar
const Sidebar = ({ theme }) => (
  <div className={`w-64 h-screen ${theme === 'dark' ? 'bg-[#0e0f12] text-gray-200 border-gray-800' : 'bg-gray-100 text-gray-900 border-gray-300'} flex flex-col justify-between p-4 border-r`}>
    <div>
      <h1 className="text-xl font-semibold mb-8">A11y <span className="text-blue-500">Insights</span></h1>
      <nav className="flex flex-col gap-3">
        {['/', '/analyze', '/reports', '/settings'].map((path, index) => (
          <NavLink key={index} to={path} className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-blue-700 text-white' : theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
            {path === '/' ? 'Dashboard' : path === '/analyze' ? 'Upload / Analyze' : path === '/reports' ? 'Reports' : 'Settings'}
          </NavLink>
        ))}
      </nav>
    </div>
  </div>
);

// Theme Toggle
const ThemeToggle = ({ theme, toggleTheme }) => (
  <div className={`flex justify-end items-center p-4 ${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
    <Button onClick={toggleTheme} className="bg-blue-600 hover:bg-blue-700 text-white">
      {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </Button>
  </div>
);

// Dashboard
const Dashboard = ({ theme }) => (
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

// Analyze Page
const Analyze = ({ theme }) => {
  const [mode, setMode] = useState('jira');
  return (
    <div className={`p-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <h2 className="text-2xl font-semibold mb-6">Upload / Analyze</h2>
      <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} p-6`}>
        <div className="mb-6 flex gap-4">
          <Button onClick={() => setMode('jira')} className={`${mode === 'jira' ? 'bg-blue-600' : theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} text-white`}>Analyze via JIRA Ticket</Button>
          <Button onClick={() => setMode('userstory')} className={`${mode === 'userstory' ? 'bg-blue-600' : theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} text-white`}>Analyze via User Story</Button>
        </div>

        {mode === 'jira' ? (
          <>
            <label className="block mb-2">JIRA Ticket Link *</label>
            <Input placeholder="Paste JIRA ticket link here" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} mb-4`} />
            <label className="block mb-2">Summary</label>
            <Input placeholder="Optional" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} mb-4`} />
            <label className="block mb-2">Description</label>
            <textarea className={`w-full p-2 rounded-md h-24 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`} />
          </>
        ) : (
          <>
            <label className="block mb-2">JIRA Ticket ID *</label>
            <Input placeholder="e.g., A11Y-2053" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} mb-4`} />
            <label className="block mb-2">Summary</label>
            <Input placeholder="Enter user story summary" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} mb-4`} />
            <label className="block mb-2">Description</label>
            <textarea className={`w-full p-2 rounded-md h-24 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`} />
            <details className="mb-4">
              <summary className="cursor-pointer mb-2">Metadata (Optional)</summary>
              <div className="grid grid-cols-3 gap-4 mt-3">
                {["Project", "Pillar", "Assignee", "Team", "Fix Version"].map((label, i) => (
                  <Input key={i} placeholder={label} className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`} />
                ))}
              </div>
            </details>
          </>
        )}

        <Button className="bg-blue-600 hover:bg-blue-700 mt-4 text-white">Analyze Ticket</Button>
      </Card>
    </div>
  );
};

// Reports Page
const Reports = ({ theme }) => {
  const navigate = useNavigate();
  const handleView = (id) => navigate(`/reports/${id}`);
  return (
    <div className={`p-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <h2 className="text-2xl font-semibold mb-6">Reports</h2>
      <table className={`w-full ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
        <thead>
          <tr className={`${theme === 'dark' ? 'border-b border-gray-700 text-gray-400' : 'border-b border-gray-300 text-gray-600'}`}>
            <th className="p-2 text-left">Summary</th>
            <th className="p-2 text-left">Created</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((id) => (
            <tr key={id} className={`${theme === 'dark' ? 'border-b border-gray-800' : 'border-b border-gray-200'}`}>
              <td className="p-2">Accessibility audit for homepage {id}</td>
              <td className="p-2">1 hour ago</td>
              <td className="p-2 space-x-2">
                <Button onClick={() => handleView(id)} className="bg-blue-600 hover:bg-blue-700 text-white">View</Button>
                <Button className="bg-gray-700 hover:bg-gray-800 text-white">Edit</Button>
                <Button className="bg-red-700 hover:bg-red-800 text-white">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Report Details
const ReportDetails = ({ theme }) => {
  const { id } = useParams();
  return (
    <div className={`p-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <nav className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        <Link to="/" className="hover:text-blue-400">Dashboard</Link> /{' '}
        <Link to="/reports" className="hover:text-blue-400">Reports</Link> /{' '}
        <span>Checkout Flow (A11Y-{id})</span>
      </nav>

      <h2 className="text-3xl font-semibold mb-6">Accessibility Analysis — Checkout Flow (A11Y-{id})</h2>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6">
          <p><strong>Platform:</strong> Web</p>
          <p><strong>Date:</strong> Oct 17, 2025</p>
          <p><strong>Status:</strong> Completed</p>
        </div>
        <div className="space-x-2">
          <Button className="bg-gray-700 hover:bg-gray-800 text-white">Edit Report</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add to JIRA Ticket</Button>
          <Button className="bg-gray-700 hover:bg-gray-800 text-white">Export as PDF</Button>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Markdown View</Button>
        <Button className="bg-gray-800 hover:bg-gray-700 text-white">JSON View</Button>
      </div>

      <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} p-6 mb-8`}>
        <h3 className="text-xl font-semibold mb-4">1. Accessibility Developer Checklist</h3>
        <p className="mb-4">Provide text alternatives for non-text content</p>
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-md mb-3`}>
          <p><strong>Intent:</strong> Helps screen reader users understand visual content</p>
        </div>
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-md mb-3`}>
          <p><strong>Non-Accessible Example:</strong></p>
          <code className="block bg-black text-green-400 p-2 rounded-md">{'<img src="logo.png">'}</code>
        </div>
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-md mb-4`}>
          <p><strong>Accessible Example:</strong></p>
          <code className="block bg-black text-green-400 p-2 rounded-md">{'<img src="logo.png" alt="Company logo">'}</code>
        </div>
        <p className="text-sm">WCAG Reference <strong>1.1 – Non-text Content</strong> — iOS: <code>accessibilityLabel</code> | Android: <code>contentDescription</code></p>
      </Card>

      <Card className={`${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} p-6`}>
        <h3 className="text-xl font-semibold mb-4">Accessibility Acceptance Criteria (for JIRA)</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>All buttons are accessible via keyboard navigation.</li>
          <li>Screen reader announces dynamic state changes.</li>
          <li>Color contrast meets 4.5:1 ratio minimum.</li>
        </ul>
      </Card>
    </div>
  );
};

// App Component
const App = () => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <Router>
      <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#0b0c0e]' : 'bg-gray-100'}`}>
        <Sidebar theme={theme} />
        <main className="flex-1">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Dashboard theme={theme} />} />
            <Route path="/analyze" element={<Analyze theme={theme} />} />
            <Route path="/reports" element={<Reports theme={theme} />} />
            <Route path="/reports/:id" element={<ReportDetails theme={theme} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
