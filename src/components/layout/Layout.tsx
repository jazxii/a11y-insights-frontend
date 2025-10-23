import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface LayoutProps {
dark: boolean;
setDark: React.Dispatch<React.SetStateAction<boolean>>;
children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ dark, setDark, children }) => {
return (
<div className={`flex min-h-screen ${dark ? 'bg-[#0b0c0e]' : 'bg-gray-100'} transition-colors`}>
<Sidebar dark={dark} />
<main className="flex-1 transition-colors">
<TopBar dark={dark} setDark={setDark} />
{children}
</main>
</div>
);
};

export default Layout;