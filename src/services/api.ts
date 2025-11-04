// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const analyzeUserStory = async (data: any) => {
  const res = await api.post('/v5/analyze', data);
  return res.data; // includes created_at, updated_at, ticket_id
};

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

export const getReportById = async (ticketId: string, platform = "iOS") => {
  const res = await api.get(`/v5/reports/${ticketId}`, {
    params: { platform },
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  });
  return res.data;
};

export const deleteReportById = async (ticketId: string, platform = "iOS") => {
  const res = await api.delete(`/v5/reports/${ticketId}`, {
    params: { platform },
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  });
  return res.data;
};

export const updateReportById = async (ticketId: string, payload: any, platform = "iOS") => {
  const res = await api.put(`/v5/reports/${ticketId}`, payload, {
    params: { platform },
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  });
  return res.data;
};
