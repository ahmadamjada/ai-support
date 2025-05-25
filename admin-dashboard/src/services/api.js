import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',  // Change this to your backend URL or use env variables
});

export default api;
// export const fetchOrders = async () => {
//   try {
//     const response = await api.get('/orders');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     throw error;
//   }
// };