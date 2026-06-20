// Central configuration for API endpoints
// DEV → http://localhost:5000   |   PROD (Vercel) → deployed backend
export const API_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api'
  : 'https://cafe-management-one-kappa.vercel.app/api';
