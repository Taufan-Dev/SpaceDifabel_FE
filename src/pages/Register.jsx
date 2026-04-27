import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTTS } from '../context/TTSContext';
import apiClient from '../api/axios';

const disabilityTypes = [
  'Tunanetra',
  'Tunarungu',
  'Tunagrahita',
  'Tunadaksa',
  'Umum / Tidak Ada'
];

export default function Register() {
  const { withTTS } = useTTS();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    disability_type: 'Tunanetra'
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Konversi Umum menjadi kosong atau format tertentu jika perlu
    const payload = {
      ...formData,
      disability_type: formData.disability_type.includes('Umum') ? 'Umum' : formData.disability_type
    };

    try {
      await apiClient.post('/auth/register', payload);
      setSuccess(true);
      
      // Auto redirect ke halaman login setelah 3 detik
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Pendaftaran gagal. Pastikan email belum terdaftar atau server berjalan normal.');
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight" {...withTTS("Buat Akun Baru")}>
            Buat Akun Baru
          </h1>
          <p className="mt-3 text-slate-600 text-lg" {...withTTS("Bergabunglah dengan ribuan murid lainnya di SpaceDifabel.")}>
            Bergabunglah dengan komunitas belajar kami.
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-start gap-3" role="alert">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="text-sm font-medium" {...withTTS(`Error: ${error}`)}>{error}</span>
          </div>
        )}

        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-bold" {...withTTS("Pendaftaran Berhasil!")}>Pendaftaran Berhasil!</h3>
            <p className="text-sm font-medium text-emerald-700" {...withTTS("Mengarahkan Anda ke halaman masuk dalam 3 detik...")}>
              Mengalihkan Anda ke halaman login...
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-bold text-slate-700 mb-2"
                  {...withTTS("Nama Lengkap")}
                >
                  Nama Lengkap
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3.5 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent sm:text-base transition-shadow bg-white"
                  placeholder="Misal: Budi Santoso"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

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
                  htmlFor="disability_type" 
                  className="block text-sm font-bold text-slate-700 mb-2"
                  {...withTTS("Jenis Disabilitas")}
                >
                  Jenis Disabilitas <span className="text-slate-400 font-normal">(Opsional)</span>
                </label>
                <select
                  id="disability_type"
                  name="disability_type"
                  className="block w-full px-4 py-3.5 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent sm:text-base transition-shadow bg-white"
                  value={formData.disability_type}
                  onChange={handleChange}
                  disabled={loading}
                >
                  {disabilityTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-bold text-slate-700 mb-2"
                  {...withTTS("Kata Sandi")}
                >
                  Buat Kata Sandi
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full px-4 py-3.5 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent sm:text-base transition-shadow bg-white pr-12"
                    placeholder="Minimal 6 karakter"
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
                {...withTTS("Tombol Daftar Akun")}
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Memproses...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UserPlus className="w-5 h-5 mr-2" /> Daftar Sekarang
                  </span>
                )}
              </Button>
            </div>
          </form>
        )}

        {!success && (
          <div className="text-center pt-4 border-t border-slate-200">
            <p className="text-slate-600" {...withTTS("Sudah punya akun? Masuk di sini.")}>
              Sudah memiliki akun?{' '}
              <Link to="/login" className="font-bold text-primary-600 hover:text-primary-500 underline underline-offset-4">
                Masuk di sini
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
