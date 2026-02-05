import axios from 'axios';

// Helper to sanitize API URL
const getBaseUrl = () => {
    let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/credentials';

    // If user provided just the domain (e.g. "myapp.vercel.app"), prepend https://
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
    }

    // If user forgot to add "/api/credentials" suffix, add it
    // But don't add it if it's already there
    if (!url.endsWith('/api/credentials')) {
        // Remove trailing slash if present before appending
        url = url.replace(/\/$/, '') + '/api/credentials';
    }

    return url;
};

const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
