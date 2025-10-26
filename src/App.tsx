import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';
import Reports from './pages/Reports';
import ReportDetails from './pages/ReportDetails';
import Settings from './pages/Settings';
import DocumentDefect from "./pages/DocumentDefect";
import './index.css';

const App: React.FC = () => {
const [dark, setDark] = useState(true);

return (
 <Router>
<Layout dark={dark} setDark={setDark}>
<Routes>
<Route path="/" element={<Dashboard dark={dark} />} />
<Route path="/analyze" element={<Analyze dark={dark} />} />
<Route path="/reports" element={<Reports dark={dark} />} />
<Route path="/reports/:id" element={<ReportDetails dark={dark} />} />
<Route path="/settings" element={<Settings dark={dark} />} />
<Route path="/document-defect" element={<DocumentDefect dark={dark} />} />
</Routes>
</Layout>
</Router>
); 

// return <div className="p-8 text-red-400">App component is under maintenance.</div>;
};



export default App;