import { StatsCard } from './StatsCard';

export function Dashboard() {
  const reports = [
    {
      title: 'Checkout Flow',
      date: 'Oct 15, 2025',
      platform: 'iOS',
      issuesFound: 12,
      status: 'issues' as const,
    },
    {
      title: 'Sign In Page',
      date: 'Oct 14, 2025',
      platform: 'Web',
      issuesFound: 0,
      status: 'passed' as const,
    },
    {
      title: 'Product Detail',
      date: 'Oct 10, 2025',
      platform: 'Android',
      issuesFound: 8,
      status: 'review' as const,
    },
  ];

  return (
    <div>
      <h2 className="mb-6">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatsCard
          label="Total Reports Analyzed"
          value="128"
        />
        <StatsCard
          label="Open Issues"
          value="24"
        />
        <StatsCard
          label="Last Analysis Run"
          value="Oct 15, 2025"
        />
      </div>

      {/* Recent Reports Table */}
      <div>
        <h3 className="mb-4">Recent Reports</h3>
        
        <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-3 text-gray-400">Report Title</th>
                <th className="text-left px-6 py-3 text-gray-400">Date</th>
                <th className="text-left px-6 py-3 text-gray-400">Platform</th>
                <th className="text-left px-6 py-3 text-gray-400">Issues Found</th>
                <th className="text-left px-6 py-3 text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800 last:border-b-0 hover:bg-gray-900/50 transition-colors"
                >
                  <td className="px-6 py-4">{report.title}</td>
                  <td className="px-6 py-4 text-gray-400">{report.date}</td>
                  <td className="px-6 py-4 text-gray-400">{report.platform}</td>
                  <td className="px-6 py-4 text-gray-400">{report.issuesFound}</td>
                  <td className="px-6 py-4">
                    {report.status === 'issues' && (
                      <span className="flex items-center gap-2 text-red-500">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        Issues
                      </span>
                    )}
                    {report.status === 'passed' && (
                      <span className="flex items-center gap-2 text-green-500">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Passed
                      </span>
                    )}
                    {report.status === 'review' && (
                      <span className="flex items-center gap-2 text-orange-500">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                        Review Needed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
