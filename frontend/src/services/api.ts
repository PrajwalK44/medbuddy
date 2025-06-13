import axios from 'axios';

const API_URL = 'http://127.0.0.5:8005';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendChatMessage = async (message: string) => {
  try {
    const response = await apiClient.post('/chatbot', {
      text: message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message to chatbot:', error);
    throw error;
  }
};

export default apiClient;