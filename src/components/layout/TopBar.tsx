import React from 'react';
import { Search, Sun, Moon, User } from 'lucide-react';
import { Button } from '../ui';

interface TopBarProps {
dark: boolean;
setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopBar: React.FC<TopBarProps> = ({ dark, setDark }) => (
<div className={`flex justify-between items-center p-4 ${dark ? 'border-b border-gray-700 bg-[#0b0c0e]' : 'border-b border-gray-300 bg-white'} transition-colors`}>
<div className={`flex items-center ${dark ? 'bg-[#141519] text-gray-400' : 'bg-gray-100 text-gray-600'} rounded-md px-3 py-2 w-1/3`}>
<Search className="w-4 h-4 mr-2" />
<input type="text" placeholder="Search" className={`w-full bg-transparent outline-none text-sm ${dark ? 'text-gray-200 placeholder-gray-400' : 'text-gray-700 placeholder-gray-500'}`} />
</div>
<div className="flex items-center gap-4">
<Button onClick={() => setDark(!dark)} className={`p-2 rounded-full ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}>
{dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-500" />}
</Button>
<div className={`p-2 rounded-full ${dark ? 'bg-gray-800' : 'bg-gray-200'}`}>
<User className={`w-5 h-5 ${dark ? 'text-gray-300' : 'text-gray-700'}`} />
</div>
</div>
</div>
);

export default TopBar;