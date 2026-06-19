// Central configuration for API endpoints
export const API_URL = import.meta.env.DEV 
  ? 'http://localhost:5000/api' 
  : 'https://cafe-management-6dhi.vercel.app/api';
