// Replace this URL with your ngrok URL when it's running
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Axios instance configuration
export const axiosConfig = {
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
}; 