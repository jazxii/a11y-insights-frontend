import React from 'react';
import { Card, CardContent } from '../components/ui';

interface Props { dark: boolean }

const Dashboard: React.FC<Props> = ({ dark }) => (
<div className={`p-8 ${dark ? 'text-white' : 'text-gray-900'} transition-colors`}>
<h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

{/* Stat Cards */}
<div className="grid grid-cols-3 gap-6 mb-8">
{['Total Reports Analyzed', 'Open Issues', 'Last Analysis Run'].map((label, i) => (
<Card key={i} className={`${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} transition-colors`}>
<CardContent className="p-6">
<p className="text-gray-400">{label}</p>
<h3 className="text-3xl font-bold mt-2">{i === 0 ? '128' : i === 1 ? '24' : 'Oct 15, 2025'}</h3>
</CardContent>
</Card>
))}
</div>

{/* Recent Reports Table */}
<Card className={`${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} transition-colors`}>
<CardContent className="p-6">
<h3 className="text-xl font-semibold mb-4">Recent Reports</h3>
<table className={`w-full ${dark ? 'text-gray-300' : 'text-gray-800'}`}>
<thead>
<tr className={`${dark ? 'border-b border-gray-700 text-gray-400' : 'border-b border-gray-300 text-gray-600'}`}>
<th className="p-2 text-left">Report Title</th>
<th className="p-2 text-left">Date</th>
<th className="p-2 text-left">Platform</th>
<th className="p-2 text-left">Issues Found</th>
<th className="p-2 text-left">Status</th>
</tr>
</thead>
<tbody>
<tr className={`${dark ? 'border-b border-gray-800' : 'border-b border-gray-200'}`}>
<td className="p-2">Checkout Flow</td>
<td className="p-2">Oct 15, 2025</td>
<td className="p-2">iOS</td>
<td className="p-2">12</td>
<td className="p-2 text-red-400 font-medium">Issues</td>
</tr>
<tr className={`${dark ? 'border-b border-gray-800' : 'border-b border-gray-200'}`}>
<td className="p-2">Sign In Page</td>
<td className="p-2">Oct 14, 2025</td>
<td className="p-2">Web</td>
<td className="p-2">0</td>
<td className="p-2 text-green-400 font-medium">Passed</td>
</tr>
<tr>
<td className="p-2">Product Detail</td>
<td className="p-2">Oct 10, 2025</td>
<td className="p-2">Android</td>
<td className="p-2">8</td>
<td className="p-2 text-yellow-400 font-medium">Review Needed</td>
</tr>
</tbody>
</table>
</CardContent>
</Card>
</div>
);

export default Dashboard;