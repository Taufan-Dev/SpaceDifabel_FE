import { useState } from 'react';
import { Play, CheckCircle, ArrowLeft, Info, FileText, Download } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useTTS } from '../context/TTSContext';

export default function CoursePlayer() {
  const { withTTS } = useTTS();
  const { id } = useParams();

  // State untuk melacak materi mana yang sedang diputar
  const [activeChapter, setActiveChapter] = useState(0);

  // Silabus yang lebih informatif (Mock Data)
  const syllabus = [
    { title: 'Pengenalan Hardware dan Posisi Duduk', duration: '12:45', status: 'completed' },
    { title: 'Mengenal Letak Tombol Keyboard (Home Row)', duration: '25:10', status: 'active' },
    { title: 'Latihan Mengetik 10 Jari Belum Melihat', duration: '18:20', status: 'locked' },
    { title: 'Menggunakan Screen Reader (NVDA/JAWS)', duration: '30:00', status: 'locked' },
    { title: 'Praktek Membuat Dokumen Sederhana', duration: '22:15', status: 'locked' }
  ];

  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Header Kecil untuk Navigasi */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <Link 
            to={`/courses/${id || 1}`} 
            className="inline-flex items-center text-slate-500 hover:text-primary-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
            {...withTTS("Keluar dari ruang belajar dan kembali ke detail kursus")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Kembali ke Detail Kursus</span>
            <span className="sm:hidden">Kembali</span>
          </Link>
          <div 
            className="text-slate-900 font-bold hidden md:block"
            {...withTTS("Kursus: Belajar Mengetik di Komputer Khusus Tunanetra")}
          >
            Belajar Mengetik di Komputer Khusus Tunanetra
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Video Area */}
          <div className="xl:col-span-2 flex flex-col h-full">
            
            {/* Video Player Placeholder */}
            <div 
              className="w-full aspect-video bg-black rounded-t-2xl shadow-lg relative group cursor-pointer border border-slate-800"
              tabIndex={0}
              {...withTTS(`Sedang memutar video: ${syllabus[activeChapter].title}, durasi ${syllabus[activeChapter].duration}`)}
            >
              {/* Overlay Gradient for polish */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <div className="text-white hidden group-hover:block transition-all">
                  <h2 className="text-xl font-bold mb-2">{syllabus[activeChapter].title}</h2>
                  <div className="flex bg-white/20 h-1.5 rounded-full overflow-hidden w-full max-w-lg cursor-pointer">
                    <div className="w-1/3 bg-primary-500 h-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 flexItems-center justify-center m-auto w-24 h-24 bg-primary-600/90 hover:bg-primary-500 backdrop-blur rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all z-10">
                <Play className="w-10 h-10 ml-2" fill="currentColor" />
              </div>
            </div>

            {/* Video Meta Info */}
            <div className="bg-white p-6 md:p-8 rounded-b-2xl border border-t-0 justify-between items-start border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3" {...withTTS(syllabus[activeChapter].title)}>
                  Materi {activeChapter + 1}: {syllabus[activeChapter].title}
                </h1>
                <p className="text-slate-500" {...withTTS(`Pengajar Bapak Sani. Durasi video ini ${syllabus[activeChapter].duration}`)}>
                  Bersama Bapak Sani • Bagian {activeChapter + 1} dari {syllabus.length}
                </p>
              </div>

              <div className="flex gap-3 mt-2 md:mt-0 w-full md:w-auto">
                <Button 
                  variant="outline" 
                  disabled={activeChapter === 0}
                  onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
                  className="w-full md:w-auto"
                  {...withTTS(activeChapter === 0 ? "Tombol materi sebelumnya tidak aktif" : "Kembali ke materi sebelumnya")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Prev
                </Button>
                <Button 
                  disabled={activeChapter === syllabus.length - 1}
                  onClick={() => setActiveChapter(Math.min(syllabus.length - 1, activeChapter + 1))}
                  className="w-full md:w-auto"
                  {...withTTS(activeChapter === syllabus.length - 1 ? "Ini adalah materi terakhir" : "Lanjut ke materi selanjutnya")}
                >
                  Next Materi
                </Button>
              </div>
            </div>

            {/* Tabs & Additional Data (Deskripsi) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1">
              <div className="flex border-b border-slate-200 bg-slate-50">
                <button className="px-6 py-4 border-b-2 border-primary-600 text-primary-700 font-semibold bg-white" {...withTTS("Tab Deskripsi dan Transkrip Suara")}>
                  <FileText className="inline w-4 h-4 mr-2" /> Deskripsi Video
                </button>
                <button className="px-6 py-4 text-slate-500 hover:text-slate-700 font-medium transition-colors" {...withTTS("Tab Layanan Unduhan Materi Tambahan")}>
                  <Download className="inline w-4 h-4 mr-2" /> Unduhan Lampiran
                </button>
              </div>
              
              <div className="p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4" {...withTTS("Rangkuman dan Panduan Bunyi")}>Rangkuman Materi:</h3>
                <p className="text-slate-600 leading-relaxed mb-6" {...withTTS(`Dalam video ini, pengajar menjelaskan panduan detail mengenai ${syllabus[activeChapter].title}. Pastikan kamu menggunakan headphone agar fitur panduan lokasi suara dapat terdengar optimal antara speaker kanan dan kiri.`)}>
                  Dalam video ini, pengajar menjelaskan panduan detail mengenai <strong>{syllabus[activeChapter].title}</strong>. Pastikan kamu menggunakan <em>headphone/earphone</em> agar fitur panduan lokasi suara dapat terdengar optimal antara speaker kanan dan kiri saat mempraktikkan materi.
                </p>

                <div className="bg-primary-50 border border-primary-100 p-4 rounded-xl flex items-start gap-4">
                  <Info className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-primary-800" {...withTTS("Ingat: Tekan tombol Alt plus A pada keyboard kamu kapan saja untuk mem-pause atau melanjutkan video tanpa harus mencari tombol di layar.")}>
                    <strong>Tips Tunanetra:</strong> Tekan tombol <kbd className="px-2 py-1 bg-white border border-slate-200 rounded text-xs mx-1">Alt + A</kbd>  kapan saja untuk mem-pause atau melanjutkan video tanpa harus mencari elemen di layar.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar: Syllabus / Playlist */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 lg:p-8 flex flex-col h-full sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" {...withTTS("Daftar Materi Belajar")}>Daftar Materi Belajar</h2>
            <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100" {...withTTS(`Proses belajar kamu: ${activeChapter + 1} materi selesai dari total ${syllabus.length}`)}>
              Progress: <span className="text-primary-600 font-bold">{Math.round(((activeChapter) / syllabus.length) * 100)}% Selesai</span>
            </p>

            <div className="space-y-3 relative">
              {/* Tracking Line */}
              <div className="absolute left-[1.15rem] top-6 bottom-6 w-0.5 bg-slate-100 -z-10"></div>
              
              {syllabus.map((item, index) => {
                const isActive = index === activeChapter;
                const isCompleted = index < activeChapter;
                
                return (
                  <button 
                    key={index}
                    onClick={() => setActiveChapter(index)}
                    className={`w-full text-left p-4 rounded-xl flex gap-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
                      ${isActive ? 'bg-primary-50 border border-primary-100 shadow-sm' : 'hover:bg-slate-50 border border-transparent'}
                    `}
                    {...withTTS(isActive ? `Materi yang sedang diputar: Judul ${item.title}` : isCompleted ? `Materi selesai ditonton: ${item.title}` : `Buka materi ke ${index + 1}: ${item.title}`)}
                  >
                    <div className="flex-shrink-0 mt-0.5 z-10 bg-white">
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-emerald-500" fill="white" />
                      ) : isActive ? (
                        <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm ring-4 ring-primary-100">
                          {index + 1}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className={`font-semibold text-sm leading-snug mb-1 
                        ${isActive ? 'text-primary-800' : isCompleted ? 'text-slate-700' : 'text-slate-600'}
                      `}>
                        {item.title}
                      </h4>
                      <p className={`text-xs ${isActive ? 'text-primary-600' : 'text-slate-400'}`}>
                        {item.duration}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
