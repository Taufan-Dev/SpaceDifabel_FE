import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, FileText, CheckCircle, Lock, Loader2, AlertCircle, LogIn } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTTS } from '../context/TTSContext';
import apiClient from '../api/axios';

export default function CoursePlayer() {
  const { id } = useParams();
  const { withTTS } = useTTS();
  
  // API States
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('deskripsi');
  const [activeChapter, setActiveChapter] = useState(0);
  
  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const fetchCourseMaterial = async () => {
      // 1. Cek Token Login
      const token = localStorage.getItem('access_token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // 2. Fetch Data Protected
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/courses/${id}/learn`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Response di-unwrap oleh interceptor
        const data = response;
        setCourseData(data.course || data);
      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setIsAuthenticated(false);
        } else {
          setError('Gagal memuat materi video. Server mungkin sibuk atau materi sedang bermasalah.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseMaterial();
  }, [id]);

  // Jika Belum Login
  if (!isAuthenticated) {
    return (
      <div className="bg-white min-h-screen pb-12 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-slate-50 p-10 rounded-3xl border-2 border-slate-200 max-w-lg">
          <Lock className="w-20 h-20 text-slate-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 mb-4" {...withTTS("Akses Ditolak. Anda harus login.")}>
            Akses Ditolak
          </h1>
          <p className="text-slate-600 mb-8 text-lg" {...withTTS("Maaf, materi ruang belajar ini bersifat rahasia dan dikhususkan untuk murid yang sudah terdaftar. Silakan login terlebih dahulu.")}>
            Maaf, materi ruang belajar ini dikhususkan untuk murid yang sudah terdaftar. Silakan masuk (login) ke akunmu terlebih dahulu.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/courses">
              <Button variant="outline" className="w-full">Lihat Kelas Lainnya</Button>
            </Link>
            <Link to="/login">
              <Button className="w-full" aria-label="Menuju halaman login">
                <LogIn className="w-4 h-4 mr-2" /> Login Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen pb-12 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
        <h2 className="text-xl font-medium text-slate-600" {...withTTS("Sedang menyiapkan ruang belajar...")}>
          Menyiapkan ruang belajar...
        </h2>
      </div>
    );
  }

  if (error || !courseData) {
    return (
      <div className="bg-white min-h-screen pb-12 flex flex-col items-center justify-center text-center px-4">
        <AlertCircle className="w-16 h-16 text-rose-400 mb-6" />
        <h1 className="text-3xl font-bold text-slate-800 mb-6" {...withTTS("Materi tidak ditemukan")}>
          {error || 'Materi tidak ditemukan'}
        </h1>
        <Link to={`/courses/${id}`}>
          <Button>Kembali ke Detail Kelas</Button>
        </Link>
      </div>
    );
  }

  // Safety Data Mapping
  const syllabus = Array.isArray(courseData.syllabus) 
    ? courseData.syllabus 
    : (Array.isArray(courseData.materials) ? courseData.materials : [{ title: 'Materi Pengantar', duration: '10:00' }]);

  const progress = Math.round((activeChapter / syllabus.length) * 100);

  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Header Kecil untuk Navigasi */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <Link 
            to={`/courses/${id}`}
            className="inline-flex items-center text-slate-500 hover:text-primary-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded p-1"
            {...withTTS("Keluar dari ruang belajar")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Keluar Ruang Belajar</span>
            <span className="sm:hidden">Keluar</span>
          </Link>
          <div className="text-sm font-bold text-slate-800" {...withTTS(`Kelas: ${courseData.title}`)}>
            {courseData.title}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-0 lg:px-8 py-0 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 min-h-[80vh]">
          
          {/* KIRI: Video Player & Konten Utama */}
          <div className="w-full lg:w-2/3 flex flex-col">
            {/* Video Layar Tancap */}
            <div 
              className="w-full aspect-video bg-slate-900 lg:rounded-2xl relative overflow-hidden flex flex-col items-center justify-center group outline-none focus-visible:ring-4 focus-visible:ring-primary-500 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
              tabIndex={0}
              aria-label={`Pemutar Video: Bab ${activeChapter + 1}`}
              {...withTTS(`Tekan enter atau spasi untuk memutar video materi bab ${activeChapter + 1}. Judul: ${syllabus[activeChapter]?.title || 'Bab ' + (activeChapter + 1)}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 pointer-events-none"></div>
              
              {/* Ini aslinya tag <video>, tapi karena mockup kita beri Play Icon */}
              <div className="w-24 h-24 rounded-full bg-primary-600/90 backdrop-blur text-white flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-primary-500 transition-all z-20 shadow-2xl">
                <Play className="w-10 h-10 ml-2" fill="currentColor" />
              </div>

              {/* Kontrol Player Bawah */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h2 className="text-2xl font-bold text-white mb-2 line-clamp-1">
                  {syllabus[activeChapter]?.title || `Bab ${activeChapter + 1}`}
                </h2>
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-4">
                  <div className="bg-primary-500 w-0 h-full"></div> {/* Progress bar durasi video 0% */}
                </div>
              </div>
            </div>

            {/* Navigasi Next/Prev Bab */}
            <div className="flex justify-between items-center mt-6 px-4 lg:px-0">
              <Button 
                variant="outline" 
                onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
                disabled={activeChapter === 0}
                {...withTTS(activeChapter === 0 ? "Ini adalah materi pertama" : "Kembali ke materi sebelumnya")}
              >
                Materi Sebelumnya
              </Button>
              <Button 
                onClick={() => setActiveChapter(Math.min(syllabus.length - 1, activeChapter + 1))}
                disabled={activeChapter === syllabus.length - 1}
                {...withTTS(activeChapter === syllabus.length - 1 ? "Ini adalah materi terakhir" : "Lanjut ke materi berikutnya")}
              >
                Materi Berikutnya
              </Button>
            </div>

            {/* Area Tabulasi (Deskripsi / Transkrip) */}
            <div className="mt-8 px-4 lg:px-0">
              <div className="flex border-b border-slate-200 bg-white">
                <button
                  className={`px-6 py-4 font-bold text-lg border-b-4 outline-none focus-visible:bg-slate-50 transition-colors ${activeTab === 'deskripsi' ? 'border-primary-600 text-primary-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  onClick={() => setActiveTab('deskripsi')}
                  {...withTTS("Tab Deskripsi Materi")}
                >
                  Deskripsi
                </button>
                <button
                  className={`px-6 py-4 font-bold text-lg border-b-4 outline-none focus-visible:bg-slate-50 transition-colors ${activeTab === 'lampiran' ? 'border-primary-600 text-primary-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  onClick={() => setActiveTab('lampiran')}
                  {...withTTS("Tab File Lampiran dan Transkrip")}
                >
                  File Lampiran
                </button>
              </div>

              <div className="py-6 min-h-[200px]">
                {activeTab === 'deskripsi' ? (
                  <div className="prose prose-lg prose-slate text-slate-700">
                    <h3 {...withTTS("Penjelasan Materi")}>Penjelasan Materi Ini</h3>
                    <p {...withTTS(syllabus[activeChapter]?.description || `Di dalam video ini kita akan membahas secara lengkap tentang topik ${syllabus[activeChapter]?.title || 'Bab ' + (activeChapter + 1)}.`)}>
                      {syllabus[activeChapter]?.description || `Di dalam video ini kita akan membahas secara lengkap tentang topik ${syllabus[activeChapter]?.title || 'Bab ' + (activeChapter + 1)}. Pastikan kamu menyimak langkah demi langkah yang dijelaskan oleh instruktur.`}
                    </p>
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-amber-800 m-0 font-medium text-sm" {...withTTS("Tips Aksesibilitas: Gunakan tombol Alt ditambah S untuk menghidupkan atau mematikan suara sistem.")}>
                        <strong>💡 Tips Aksesibilitas:</strong> Gunakan tombol <code>Alt + S</code> untuk menghidupkan/mematikan suara panduan. Tekan tombol Tabulasi untuk bernavigasi ke tombol pemutar video.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div 
                      className="flex items-center p-4 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-slate-50 transition-colors cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                      tabIndex={0}
                      {...withTTS("Unduh Transkrip Teks PDF")}
                    >
                      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-4">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 group-hover:text-primary-700">Transkrip_Teks_Lengkap.pdf</h4>
                        <p className="text-sm text-slate-500">Cocok dibaca oleh screen reader (NVDA/JAWS)</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* KANAN: Daftar Materi (Playlist Silabus) */}
          <div className="w-full lg:w-1/3 bg-white border border-slate-200 lg:rounded-2xl flex flex-col h-screen lg:h-auto overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Daftar Materi</h3>
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2" {...withTTS(`Progres belajar kamu ${progress} persen.`)}>
                <span>Progres Belajar</span>
                <span className="font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-2">
                {syllabus.map((materi, index) => {
                  const isActive = activeChapter === index;
                  const isCompleted = index < activeChapter;
                  const titleMateri = typeof materi === 'object' ? (materi.title || `Bab ${index+1}`) : materi;
                  const durationMateri = typeof materi === 'object' ? (materi.duration || '10:00') : '10:00';
                  
                  return (
                    <div 
                      key={index}
                      onClick={() => setActiveChapter(index)}
                      className={`
                        w-full text-left p-4 rounded-xl cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1
                        ${isActive ? 'bg-primary-50 border border-primary-200 shadow-sm' : 'hover:bg-slate-50 border border-transparent'}
                      `}
                      tabIndex={0}
                      {...withTTS(isActive ? `Materi ini sedang diputar: ${titleMateri}` : (isCompleted ? `Materi sudah selesai: ${titleMateri}` : `Materi ke ${index+1}: ${titleMateri}`))}
                    >
                      <div className="flex gap-4">
                        <div className="shrink-0 mt-1">
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-emerald-500" />
                          ) : isActive ? (
                            <div className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center shadow">
                              <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold text-xs">
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className={`font-bold mb-1 ${isActive ? 'text-primary-800' : (isCompleted ? 'text-slate-800' : 'text-slate-600')}`}>
                            {titleMateri}
                          </h4>
                          <div className="flex items-center text-xs font-medium text-slate-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {durationMateri}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
