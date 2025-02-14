// utils/api.js
const BASE_URL =
    import.meta.env.VITE_API_URL;


// Helper function for handling API responses
const handleResponse = async(response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `API request failed with status ${response.status}`);
    }
    return data;
};

const api = {
    auth: {
        register: async(formData) => {
            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            return handleResponse(response);
        },

        login: async(credentials) => {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            return handleResponse(response);
        },

        verifyEmail: async(token) => {
            // Using GET method with token in URL path, matching backend structure
            const response = await fetch(`${BASE_URL}/api/auth/verify/${token}`, {
                method: 'GET', // Changed from POST to GET
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return handleResponse(response);
        }
    },

    workouts: {
        getAll: async() => {
            const response = await fetch(`${BASE_URL}/api/workouts`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return handleResponse(response);
        },

        create: async(workoutData) => {
            const response = await fetch(`${BASE_URL}/api/workouts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(workoutData)
            });
            return handleResponse(response);
        },

        update: async(id, workoutData) => {
            const response = await fetch(`${BASE_URL}/api/workouts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(workoutData)
            });
            return handleResponse(response);
        },

        delete: async(id) => {
            const response = await fetch(`${BASE_URL}/api/workouts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return handleResponse(response);
        }
    }
};

export default api;