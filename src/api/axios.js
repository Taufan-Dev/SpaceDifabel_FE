import axios from 'axios';

// Konfigurasi baseURL. Akan mengambil dari environment variable VITE_API_URL jika ada.
// Sesuai dokumentasi: https://spacedifable-backend-production.up.railway.app
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://spacedifable-backend-production.up.railway.app',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Response Interceptor untuk mempermudah error handling ke depannya
apiClient.interceptors.response.use(
  (response) => {
    // Dokumentasi API menyatakan format sukses adalah { status: "success", data: { ... } }
    // Jadi kita langsung kembalikan isi dari properti "data" jika tersedia
    if (response.data && response.data.status === 'success' && response.data.data !== undefined) {
      return response.data.data;
    }
    // Fallback jika format berbeda
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
