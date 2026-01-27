import axios from 'axios';

// Create an instance of axios with a base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service methods for chats
export const chatService = {
  // Fetch all messages
  getMessages: async () => {
    try {
      const response = await apiClient.get('/messages');
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Send a new message
  sendMessage: async (messageData) => {
    try {
      const response = await apiClient.post('/messages', messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Fetch messages for a specific user
  getUserMessages: async (userId) => {
    try {
      const response = await apiClient.get(`/messages/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user messages:', error);
      throw error;
    }
  },

  // Delete a message
  deleteMessage: async (messageId) => {
    try {
      const response = await apiClient.delete(`/messages/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  },

  // Update a message
  updateMessage: async (messageId, messageData) => {
    try {
      const response = await apiClient.put(`/messages/${messageId}`, messageData);
      return response.data;
    } catch (error) {
      console.error('Error updating message:', error);
      throw error;
    }
  },
};

// Add interceptors for handling auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
