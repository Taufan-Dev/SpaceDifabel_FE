import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk memvalidasi token saat pertama dimuat atau token berubah
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Ambil profil user untuk memastikan token masih valid
        const response = await apiClient.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.user || response;
        setUser(data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Sesi Kadaluwarsa atau Token Tidak Valid');
        logout();
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('access_token', newToken);
    setToken(newToken);
    if (userData) setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};
