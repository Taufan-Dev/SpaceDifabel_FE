import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTTS } from '../../context/TTSContext';
import { useAuth } from '../../context/AuthContext';
import { Ear, EarOff, User, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { withTTS, isTTSEnabled, enableTTS, disableTTS, forceSpeak } = useTTS();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md font-bold"
        >
          Lewati ke konten utama
        </a>

        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-lg p-1" 
          aria-label="Beranda SpaceDifabel"
          {...withTTS("Kembali ke Beranda")}
        >
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl leading-none">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Space<span className="text-primary-600">Difabel</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link to="/" className="hover:text-primary-600 transition-colors py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded" {...withTTS("Menu Beranda")}>Beranda</Link>
          <Link to="/courses" className="hover:text-primary-600 transition-colors py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded" {...withTTS("Menu Kursus")}>Kursus</Link>
          <Link to="/jobs" className="hover:text-primary-600 transition-colors py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded" {...withTTS("Menu Pekerjaan")}>Pekerjaan</Link>
          <Link to="/articles" className="hover:text-primary-600 transition-colors py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded" {...withTTS("Menu Artikel")}>Artikel</Link>
        </nav>

        {/* Action Buttons & TTS Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={() => isTTSEnabled ? disableTTS() : enableTTS()}
            className="p-2 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 focus:ring-2 focus:ring-primary-600 outline-none transition-colors"
            aria-label={isTTSEnabled ? "Matikan Suara Pembaca Teks" : "Nyalakan Suara Pembaca Teks"}
            title={isTTSEnabled ? "Matikan Suara" : "Nyalakan Suara"}
            onMouseEnter={() => forceSpeak(isTTSEnabled ? "Mode suara menyala. Tekan untuk mematikan suara." : "Apakah suara ingin dinyalakan?")}
            onFocus={() => forceSpeak(isTTSEnabled ? "Mode suara menyala. Tekan untuk mematikan suara." : "Apakah suara ingin dinyalakan?")}
          >
            {isTTSEnabled ? (
              <Ear className="w-5 h-5 text-primary-600" />
            ) : (
              <EarOff className="w-5 h-5" />
            )}
          </button>
          
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
                {...withTTS(`Menu Profil Pengguna: ${user?.name || 'Tamu'}. Tekan untuk membuka menu.`)}
              >
                <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                  {(user?.name || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-sm font-semibold text-slate-700">
                  {user?.name?.split(' ')[0] || 'Profil'}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    {user?.disability_type && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-primary-50 text-primary-700 text-[10px] font-bold rounded">
                        {user.disability_type}
                      </span>
                    )}
                  </div>
                  <button 
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 flex items-center transition-colors"
                    {...withTTS("Lihat profil lengkap saya")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profil Saya
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 flex items-center transition-colors"
                    {...withTTS("Keluar dari akun")}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar Sesi
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link 
                to="/login" 
                className="hidden sm:block text-slate-600 hover:text-slate-900 font-medium px-4 py-2 hover:bg-slate-50 rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                {...withTTS("Masuk ke akun Anda")}
              >
                Masuk
              </Link>
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 bg-primary-600 text-white hover:bg-primary-700 shadow-sm h-10 px-4 py-2 text-sm sm:h-11 sm:text-base"
                {...withTTS("Daftar akun baru")}
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
