import { useNavigate } from 'react-router-dom';

export function Reports() {
  const navigate = useNavigate();
  
  const reports = [
    {
      id: 'A11Y-2053',
      summary: 'Accessibility audit for homepage',
      created: '1 hour ago',
    },
    {
      id: 'A11Y-2052',
      summary: 'Check search form accessibility',
      created: 'April 24, 2024',
    },
    {
      id: 'A11Y-2051',
      summary: 'Verify color contrast compliance',
      created: 'April 23, 2024',
    },
    {
      id: 'A11Y-2050',
      summary: 'Assess keyboard navigation',
      created: 'April 22, 2024',
    },
    {
      id: 'A11Y-2049',
      summary: 'Image alternative text review',
      created: 'April 18, 2024',
    },
    {
      id: 'A11Y-2048',
      summary: 'Modal dialog accessibility check',
      created: 'April 15, 2024',
    },
  ];

  return (
    <div>
      <h2 className="mb-8">Reports</h2>

      <div className="space-y-4">
        {/* Header Row */}
        <div className="grid grid-cols-[1fr,auto] gap-8 px-4">
          <div className="text-gray-400 uppercase text-xs tracking-wider">Summary</div>
          <div className="text-gray-400 uppercase text-xs tracking-wider">Created</div>
        </div>

        {/* Report Rows */}
        <div className="space-y-2">
          {reports.map((report, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr,auto] gap-8 items-center bg-[#0f0f0f] border border-gray-800 rounded-lg px-4 py-4 hover:bg-gray-900/30 transition-colors"
            >
              <div>{report.summary}</div>
              <div className="flex items-center gap-4 whitespace-nowrap">
                <span className="text-gray-400 min-w-[120px]">{report.created}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/reports/${report.id}`)}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors whitespace-nowrap"
                  >
                    View
                  </button>
                  <button className="px-4 py-1.5 bg-[#1a1a1a] hover:bg-gray-800 rounded transition-colors whitespace-nowrap">
                    Edit
                  </button>
                  <button className="px-4 py-1.5 bg-[#1a1a1a] hover:bg-gray-800 rounded transition-colors whitespace-nowrap">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
