import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/credentials',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
