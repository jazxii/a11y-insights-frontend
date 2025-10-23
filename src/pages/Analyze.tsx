import React, { useState } from 'react';
import { Card, Button, Input } from '../components/ui';

interface Props { dark: boolean }

const Analyze: React.FC<Props> = ({ dark }) => {
const [mode, setMode] = useState<'jira' | 'userstory'>('jira');

return (
<div className={`p-8 ${dark ? 'text-white' : 'text-gray-900'} transition-colors`}>
<h2 className="text-2xl font-semibold mb-6">Upload / Analyze</h2>
<Card className={`${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} p-6 transition-colors`}>
<div className="mb-6 flex gap-4">
<Button onClick={() => setMode('jira')} className={`${mode === 'jira' ? 'bg-blue-600' : dark ? 'bg-gray-800' : 'bg-gray-200'} text-white`}>Analyze via JIRA Ticket</Button>
<Button onClick={() => setMode('userstory')} className={`${mode === 'userstory' ? 'bg-blue-600' : dark ? 'bg-gray-800' : 'bg-gray-200'} text-white`}>Analyze via User Story</Button>
</div>

{mode === 'jira' ? (
<>
<label className="block mb-2">JIRA Ticket Link *</label>
<Input placeholder="Paste JIRA ticket link here" className={`${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} mb-4`} />
<label className="block mb-2">Summary</label>
<Input placeholder="Optional" className={`${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} mb-4`} />
<label className="block mb-2">Description</label>
<textarea className={`w-full p-2 rounded-md h-24 ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`} />
</>
) : (
<>
<label className="block mb-2">JIRA Ticket ID *</label>
<Input placeholder="e.g., A11Y-2053" className={`${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} mb-4`} />
<label className="block mb-2">Summary</label>
<Input placeholder="Enter user story summary" className={`${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} mb-4`} />
<label className="block mb-2">Description</label>
<textarea className={`w-full p-2 rounded-md h-24 ${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`} />
<details className="mb-4">
<summary className="cursor-pointer mb-2">Metadata (Optional)</summary>
<div className="grid grid-cols-3 gap-4 mt-3">
{['Project', 'Pillar', 'Assignee', 'Team', 'Fix Version'].map((label, i) => (
<Input key={i} placeholder={label} className={`${dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`} />
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

export default Analyze;