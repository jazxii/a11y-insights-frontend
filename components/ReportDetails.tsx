import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function ReportDetails() {
  const { id } = useParams();
  const [activeView, setActiveView] = useState('markdown');

  // Mock data - in a real app, this would be fetched based on the ID
  const report = {
    id: id || 'A11Y-2053',
    title: 'Checkout Flow',
    platform: 'Web',
    date: 'Oct 17, 2025',
    status: 'Completed',
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-400 mb-6">
        <Link to="/dashboard" className="hover:text-gray-200 transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/reports" className="hover:text-gray-200 transition-colors">
          Reports
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span>{report.title}</span>
        <ChevronRight className="w-4 h-4" />
        <span>{report.id}</span>
      </div>

      {/* Page Title */}
      <h1 className="mb-6">
        Accessibility Analysis – {report.title} ({report.id})
      </h1>

      {/* Metadata and Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6 text-gray-300">
          <span>Platform: {report.platform}</span>
          <span>Date: {report.date}</span>
          <span>Status: {report.status}</span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-gray-800 border border-gray-800 rounded transition-colors">
            Edit Report
          </button>
          <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-gray-800 border border-gray-800 rounded transition-colors">
            Add to JIRA Ticket
          </button>
          <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-gray-800 border border-gray-800 rounded transition-colors">
            Export as PDF
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveView('markdown')}
          className={`px-4 py-2 rounded transition-colors ${
            activeView === 'markdown'
              ? 'bg-blue-600 text-white'
              : 'bg-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          Markdown View
        </button>
        <button
          onClick={() => setActiveView('json')}
          className={`px-4 py-2 rounded transition-colors ${
            activeView === 'json'
              ? 'bg-blue-600 text-white'
              : 'bg-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          JSON View
        </button>
      </div>

      {/* Content */}
      {activeView === 'markdown' && (
        <div className="space-y-8">
          {/* Section 1 */}
          <div>
            <h2 className="mb-6">1. A Accessibility Developer Checklist</h2>
            
            <div className="space-y-6">
              {/* Item 1 */}
              <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-6">
                <h3 className="mb-4">1 Provide text alternatives for non-text content</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 mb-2">Intent:</div>
                    <p className="text-gray-300">Helps screen reader users understand visual content</p>
                  </div>

                  <div>
                    <div className="text-gray-400 mb-2">Non Accessible Example</div>
                    <div className="bg-[#1a1a1a] border border-gray-700 rounded p-4">
                      <code className="text-pink-400">
                        {'<img src="logo.png">'}
                      </code>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 mb-2">Accessible Example</div>
                    <div className="bg-[#1a1a1a] border border-gray-700 rounded p-4">
                      <code className="text-pink-400">
                        {'<img src="logo.png" alt="=.Company logo">'}
                      </code>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2">
                      <span className="text-gray-400">WCAG Reference</span>{' '}
                      <span className="text-gray-300">1.1 – Non-text content</span>{' '}
                      <span className="text-gray-500">—</span>{' '}
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                        iOS: <code className="text-blue-400">ascesbUitityLlabel</code>
                      </a>
                      <span className="text-gray-500"> | </span>
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Android: <code className="text-blue-400">contentDescription</code>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 33 */}
              <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-6">
                <h3 className="mb-4">33 Accessibility Acceptance Criteria (for JIRA)</h3>
                
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>All buttons are accessible via keyboard navigation.</li>
                  <li>Screen reader announces dynamic state changes.</li>
                  <li>Screen reader meets 4.5:1 calls</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'json' && (
        <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-6">
          <pre className="text-gray-300 overflow-x-auto">
            <code>{JSON.stringify({
              id: report.id,
              title: report.title,
              platform: report.platform,
              date: report.date,
              status: report.status,
              checklist: [
                {
                  item: 1,
                  title: "Provide text alternatives for non-text content",
                  intent: "Helps screen reader users understand visual content",
                  nonAccessibleExample: '<img src="logo.png">',
                  accessibleExample: '<img src="logo.png" alt="Company logo">',
                  wcagReference: "1.1 – Non-text content"
                }
              ]
            }, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
