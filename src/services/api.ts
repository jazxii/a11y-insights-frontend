// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// export const analyzeUserStory = async (data: any) => {
//   const res = await api.post('/v5/analyze', data);
//   return res.data; // includes created_at, updated_at, ticket_id
// };

const AUTH_TOKEN = import.meta.env.VITE_API_KEY || '';

export const getReports = async (platform = "iOS", skip = 0, limit = 100) => {
  const res = await api.get("/v5/reports", {
    params: { platform, skip, limit },
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  });

  // Normalize backend structure
  if (res.data?.reports && Array.isArray(res.data.reports)) {
    return res.data.reports; // ✅ always return the array only
  }
  return [];
};

// Generic analyzer for user story or JIRA ticket
export const analyzeUserStory = async (payload: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/v5/analyze`, payload);
    return response.data; // return parsed JSON (not full axios response)
  } catch (error: any) {
    console.error("❌ analyzeUserStory API Error:", error);
    throw error.response?.data || error;
  }
};

// Fetch a report by ticket ID
export const getReportById = async (id: string, platform?: string) => {
  const url = platform
    ? `${API_BASE_URL}/v5/reports/${id}?platform=${platform}`
    : `${API_BASE_URL}/v5/reports/${id}`;
  const res = await axios.get(url);
  return res.data;
};

// Update a report
export const updateReportById = async (id: string, payload: any) => {
  const res = await axios.put(`${API_BASE_URL}/v5/reports/${id}`, payload);
  return res.data;
};

// Delete a report
export const deleteReportById = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/v5/reports/${id}`);
  return res.data;
};