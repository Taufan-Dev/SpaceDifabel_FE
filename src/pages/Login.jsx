import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTTS } from '../context/TTSContext';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/axios';

export default function Login() {
  const { withTTS } = useTTS();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/login', formData);
      // Asumsi interceptor mereturn response.data.data
      const data = response;
      if (data && data.access_token) {
        login(data.access_token, data.user);
        navigate('/'); // Redirect ke beranda
      } else {
        throw new Error('Format token tidak dikenali');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login gagal. Periksa kembali email dan password Anda.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mb-6 shadow-md">
            <span className="text-white font-bold text-4xl leading-none">S</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight" {...withTTS("Selamat Datang Kembali")}>
            Selamat Datang Kembali
          </h1>
          <p className="mt-3 text-slate-600 text-lg" {...withTTS("Silakan masuk ke akun Anda untuk melanjutkan belajar.")}>
            Silakan masuk ke akun Anda
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-start gap-3" role="alert">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="text-sm font-medium" {...withTTS(`Error: ${error}`)}>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-bold text-slate-700 mb-2"
                {...withTTS("Alamat Email")}
              >
                Alamat Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-4 py-3.5 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent sm:text-base transition-shadow bg-white"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-bold text-slate-700 mb-2"
                {...withTTS("Kata Sandi")}
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-4 py-3.5 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent sm:text-base transition-shadow bg-white pr-12"
                  placeholder="Masukkan kata sandi Anda"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary-600 focus:outline-none transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  {...withTTS(showPassword ? "Sembunyikan sandi" : "Tampilkan sandi")}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <Button 
              type="submit" 
              className="w-full text-lg py-6"
              disabled={loading}
              {...withTTS("Tombol Masuk")}
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Memproses...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="w-5 h-5 mr-2" /> Masuk ke Akun
                </span>
              )}
            </Button>
          </div>
        </form>

        <div className="text-center pt-4 border-t border-slate-200">
          <p className="text-slate-600" {...withTTS("Belum punya akun? Daftar di sini.")}>
            Belum punya akun?{' '}
            <Link to="/register" className="font-bold text-primary-600 hover:text-primary-500 underline underline-offset-4">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
