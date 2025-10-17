import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { UploadAnalyze } from './components/UploadAnalyze';
import { Reports } from './components/Reports';
import { ReportDetails } from './components/ReportDetails';
import { Settings } from './components/Settings';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadAnalyze />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}
