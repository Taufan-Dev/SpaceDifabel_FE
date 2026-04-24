import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useTTS } from '../../context/TTSContext';

export default function Footer() {
  const { withTTS } = useTTS();

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg">
              <span 
                className="text-2xl font-bold text-slate-900 tracking-tight"
                {...withTTS("Space difabel menuju beranda")}
              >
                Space<span className="text-primary-600">Difabel</span>
              </span>
            </Link>
            <p 
              className="text-slate-600 max-w-sm mb-6 leading-relaxed" 
              {...withTTS("Tempat belajar dan berkarir paling aman, nyaman, dan inklusif untuk semua teman difabel di Indonesia.")}
            >
              Tempat belajar dan berkarir paling aman, nyaman, dan inklusif untuk semua teman difabel di Indonesia.
            </p>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-6 flex items-center" {...withTTS("Menu Jelajahi")}>
              Jelajahi
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Katalog Kursus', path: '/courses' },
                { name: 'Lowongan Kerja', path: '/jobs' },
                { name: 'Artikel Inspiratif', path: '/articles' },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-slate-500 hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded"
                    {...withTTS(`Ke halaman ${link.name}`)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-6 flex items-center" {...withTTS("Menu Bantuan")}>
              Bantuan
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Cara Penggunaan', path: '#' },
                { name: 'Pusat Bantuan', path: '#' },
                { name: 'Hubungi Kami', path: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.path} 
                    className="text-slate-500 hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded"
                    {...withTTS(`Buka halaman ${link.name}`)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm" {...withTTS(`Hak cipta Space Difabel tahun ${new Date().getFullYear()}`)}>
            &copy; {new Date().getFullYear()} SpaceDifabel. Semua hak cipta dilindungi.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1.5" {...withTTS("Dibuat dengan cinta untuk IO FEST 2026")}>
            Dibuat dengan <Heart className="w-4 h-4 text-red-500/70" /> untuk IO FEST 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
