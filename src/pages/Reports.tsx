import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';

interface Props { dark: boolean }

const Reports: React.FC<Props> = ({ dark }) => {
const navigate = useNavigate();
const handleView = (id: number) => navigate(`/reports/${id}`);

return (
<div className={`p-8 ${dark ? 'text-white' : 'text-gray-900'} transition-colors`}>
<h2 className="text-2xl font-semibold mb-6">Reports</h2>
<table className={`w-full ${dark ? 'text-gray-300' : 'text-gray-800'}`}>
<thead>
<tr className={`${dark ? 'border-b border-gray-700 text-gray-400' : 'border-b border-gray-300 text-gray-600'}`}>
<th className="p-2 text-left">Summary</th>
<th className="p-2 text-left">Created</th>
<th className="p-2 text-left">Actions</th>
</tr>
</thead>
<tbody>
{[1, 2, 3, 4, 5].map((id) => (
<tr key={id} className={`${dark ? 'border-b border-gray-800' : 'border-b border-gray-200'}`}>
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

export default Reports;