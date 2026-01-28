import axios from 'axios';
import { store } from '../store';
import { setSessionId, clearSessionId } from '../store';

// Create an instance of axios with a base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => status >= 200 && status < 300,
});

// ==================== USER SERVICE ====================
export const userService = {
  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
};

// ==================== SESSION SERVICE ====================
export const sessionService = {
  createSession: async (userId) => {
    try {
      const response = await apiClient.post('/sessions', { user_id: userId });
      const { sessionId } = response.data;
      store.dispatch(setSessionId(sessionId));
      return response.data;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  },

  deleteSession: async (sessionId) => {
    try {
      const response = await apiClient.delete(`/sessions/${sessionId}`);
      store.dispatch(clearSessionId());
      return response.data;
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  },

  getAllSessions: async () => {
    try {
      // Sessions route doesn't have getAllSessions, we'll fetch from users and aggregate
      const users = await userService.getAllUsers();
      return users;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  },
};

// ==================== SUBSCRIPTION SERVICE ====================
export const subscriptionService = {
  getAllSubscriptions: async () => {
    try {
      const response = await apiClient.get('/subscriptions');
      return response.data;
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },

  getSubscriptionById: async (subscriptionId) => {
    try {
      const response = await apiClient.get(`/subscriptions/${subscriptionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      throw error;
    }
  },

  createSubscription: async (subscriptionData) => {
    try {
      const response = await apiClient.post('/subscriptions', subscriptionData);
      return response.data;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  },

  updateSubscription: async (subscriptionId, subscriptionData) => {
    try {
      const response = await apiClient.put(`/subscriptions/${subscriptionId}`, subscriptionData);
      return response.data;
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  },

  deleteSubscription: async (subscriptionId) => {
    try {
      const response = await apiClient.delete(`/subscriptions/${subscriptionId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting subscription:', error);
      throw error;
    }
  },
};

// ==================== SUBSCRIPTION PAYMENT SERVICE ====================
export const subscriptionPaymentService = {
  getAllPayments: async () => {
    try {
      const response = await apiClient.get('/subscription-payments');
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  },

  getPaymentById: async (paymentId) => {
    try {
      const response = await apiClient.get(`/subscription-payments/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  },

  createPayment: async (paymentData) => {
    try {
      const response = await apiClient.post('/subscription-payments', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },
};

// ==================== ANALYSIS SERVICE ====================
export const analysisService = {
  getMonthlyRecurringRevenue: async () => {
    try {
      const response = await apiClient.get('/analysis/monthly-recurring-revenue');
      return response.data;
    } catch (error) {
      console.error('Error fetching MRR:', error);
      throw error;
    }
  },

  getOneTimePaymentRevenue: async () => {
    try {
      const response = await apiClient.get('/analysis/one-time-payment-revenue');
      return response.data;
    } catch (error) {
      console.error('Error fetching one-time revenue:', error);
      throw error;
    }
  },

  getRefunds: async () => {
    try {
      const response = await apiClient.get('/analysis/refunds');
      return response.data;
    } catch (error) {
      console.error('Error fetching refunds:', error);
      throw error;
    }
  },

  getFunnel: async () => {
    try {
      const response = await apiClient.get('/analysis/funnel');
      return response.data;
    } catch (error) {
      console.error('Error fetching funnel:', error);
      throw error;
    }
  },
};

// Add interceptors for handling auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const sessionId = store.getState().session.sessionId;
    if (sessionId) {
      config.headers['x-session-id'] = sessionId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearSessionId());
    }
    return Promise.reject(error);
  }
);

export default apiClient;