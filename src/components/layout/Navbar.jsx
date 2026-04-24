import { Link } from 'react-router-dom';
import { useTTS } from '../../context/TTSContext';
import { Ear, EarOff } from 'lucide-react';

export default function Navbar() {
  const { withTTS, isTTSEnabled, enableTTS, disableTTS, forceSpeak } = useTTS();

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
          className="flex items-center gap-2" 
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
          <Link to="/" className="hover:text-primary-600 transition-colors py-2" {...withTTS("Menu Beranda")}>Beranda</Link>
          <Link to="/courses" className="hover:text-primary-600 transition-colors py-2" {...withTTS("Menu Kursus")}>Kursus</Link>
          <Link to="/jobs" className="hover:text-primary-600 transition-colors py-2" {...withTTS("Menu Pekerjaan")}>Pekerjaan</Link>
          <Link to="/articles" className="hover:text-primary-600 transition-colors py-2" {...withTTS("Menu Artikel")}>Artikel</Link>
        </nav>

        {/* Action Buttons & TTS Toggle */}
        <div className="flex items-center gap-4">
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
          
          <Link 
            to="/login" 
            className="hidden sm:block text-slate-600 hover:text-slate-900 font-medium px-4 py-2 hover:bg-slate-50 rounded-md transition-colors"
            {...withTTS("Masuk ke akun Anda")}
          >
            Masuk
          </Link>
          <Link 
            to="/register" 
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 bg-primary-600 text-white hover:bg-primary-700 shadow-sm h-11 px-4 py-2"
            {...withTTS("Daftar akun baru")}
          >
            Daftar
          </Link>
        </div>
      </div>
    </header>
  );
}
