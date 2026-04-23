import { useEffect } from 'react';
import { useTTS } from '../../context/TTSContext';
import { Ear, EarOff } from 'lucide-react';

export default function WelcomeModal() {
  const { hasMadeChoice, enableTTS, disableTTS, forceSpeak } = useTTS();

  useEffect(() => {
    // Berusaha membacakan pesan saat layar terbuka (mungkin diblokir browser, tapi layak dicoba)
    if (!hasMadeChoice) {
      setTimeout(() => {
        forceSpeak("Selamat datang. Apakah Anda membutuhkan suara panduan?");
      }, 500);
    }
  }, [hasMadeChoice, forceSpeak]);

  if (hasMadeChoice) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="text-center p-6 border-b border-slate-100">
          <h2 id="modal-title" className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
            Gunakan Asisten Suara?
          </h2>
          <p className="text-slate-600 text-sm">
            Bagi tuna netra atau yang membutuhkan panduan suara otomatis. (Bisa dimatikan/dinyalakan kapan saja dari menu navigasi atas)
          </p>
        </div>
        
        <div className="flex flex-row p-4 gap-4 bg-slate-50 justify-center">
          <button
            onClick={enableTTS}
            onMouseEnter={() => forceSpeak("Tombol Ya. Nyalakan Suara Panduan")}
            onFocus={() => forceSpeak("Tombol Ya. Nyalakan Suara Panduan")}
            className="flex-1 flex flex-col items-center justify-center py-6 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-sm transition-transform hover:scale-105 outline-none focus:ring-4 focus:ring-primary-300"
            aria-label="Ya, nyalakan Suara Panduan"
          >
            <Ear className="w-8 h-8 mb-2" />
            <span className="text-xl font-bold">YA</span>
          </button>

          <button
            onClick={disableTTS}
            className="flex-1 flex flex-col items-center justify-center py-6 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl transition-transform hover:scale-105 outline-none focus:ring-4 focus:ring-slate-400"
            aria-label="Tidak, Matikan Suara Panduan"
          >
            <EarOff className="w-8 h-8 mb-2 opacity-70" />
            <span className="text-xl font-bold">TIDAK</span>
          </button>
        </div>
      </div>
    </div>
  );
}
