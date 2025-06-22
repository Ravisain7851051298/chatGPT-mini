import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chat';

export async function sendMessage(message) {
  try {
    const response = await axios.post(API_URL, { message });
    return response.data.answer;
  } catch (error) {
    console.error('Error sending message to the backend:', error);
    throw error;
  }
}
