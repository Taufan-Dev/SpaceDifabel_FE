import { Play, Star, BookOpen, Clock, Users, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useTTS } from '../context/TTSContext';

export default function CourseDetail() {
  const { withTTS } = useTTS();
  const { id } = useParams();

  // Karena ini mock, kita pakai data statis yang terlihat dinamis
  const course = {
    title: 'Belajar Mengetik di Komputer Khusus Tunanetra',
    instructor: 'Bapak Sani',
    rating: 4.8,
    category: 'Dasar Komputer',
    students: 124,
    duration: '2 Jam 30 Menit',
    accessMods: ['Panduan Suara', 'Keyboard Shortcut'],
    description: 'Kelas ini dirancang khusus untuk teman-teman tunanetra agar dapat menggunakan komputer dengan lancar. Kita akan belajar mulai dari pengenalan letak tombol keyboard, cara mengetik 10 jari, hingga menggunakan aplikasi screen reader dengan mudah.',
    syllabus: [
      'Pengenalan Hardware dan Posisi Duduk',
      'Mengenal Letak Tombol Keyboard (Home Row)',
      'Latihan Mengetik 10 Jari Belum Melihat',
      'Menggunakan Screen Reader (NVDA/JAWS)',
      'Praktek Membuat Dokumen Sederhana'
    ]
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Kecil untuk Navigasi */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <Link 
            to="/courses" 
            className="inline-flex items-center text-slate-500 hover:text-primary-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
            {...withTTS("Kembali ke daftar kursus")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Kursus
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content Area: Video & Description */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Judul & Info Utama (Mulai terbaca dari sini) */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
                {course.category}
              </div>
              <h1 
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4"
                {...withTTS(`Kelas: ${course.title}`)}
              >
                {course.title}
              </h1>
              <p className="text-lg text-slate-600 flex items-center gap-2 mb-6" {...withTTS(`Pengajar adalah ${course.instructor}`)}>
                <span>Diajar oleh <strong>{course.instructor}</strong></span>
              </p>

              {/* Fasilitas Akses */}
              <div className="flex flex-wrap gap-2 mb-8">
                {course.accessMods.map((mod, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Akses: {mod}
                  </span>
                ))}
              </div>
            </div>

            {/* Premium Video Placeholder */}
            <div 
              className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative shadow-xl border border-slate-800 flex items-center justify-center group cursor-pointer"
              tabIndex={0}
              {...withTTS("Tekan di sini untuk memutar video materi pengantar")}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Play Button */}
              <div className="w-20 h-20 bg-primary-600/90 backdrop-blur rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-primary-500 transition-all z-10">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </div>

              {/* Label Bawah Video */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10 text-white">
                <div>
                  <h3 className="font-bold text-lg mb-1">Video Pengantar Materi</h3>
                  <p className="text-slate-300 text-sm">Klik untuk memutar</p>
                </div>
              </div>
            </div>

            {/* Tentang Kelas */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4" {...withTTS("Tentang Kelas Ini")}>Tentang Kelas Ini</h2>
              <p className="text-slate-600 leading-relaxed text-lg" {...withTTS(course.description)}>
                {course.description}
              </p>
            </div>
            
            {/* Silabus */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6" {...withTTS("Apa saja yang dipelajari?")}>Apa saja yang dipelajari?</h2>
              <div className="space-y-4">
                {course.syllabus.map((materi, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <p className="font-medium text-slate-800 mt-1" {...withTTS(`Materi bab ${i + 1}: ${materi}`)}>
                      {materi}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Area: Action Card */}
          <div className="space-y-6">
            
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-lg sticky top-24">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Gratis!</h3>
                <p className="text-slate-500 text-sm" {...withTTS("Kelas ini sepenuhnya gratis untuk semua teman difabel.")}>
                  Biaya disubsidi penuh oleh yayasan mitra.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600" {...withTTS(`Durasi: ${course.duration}`)}>
                  <Clock className="w-5 h-5 text-primary-500" />
                  <span className="font-medium">{course.duration} belajar</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600" {...withTTS(`Rating: ${course.rating}`)}>
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-medium">{course.rating} Bintang Sangat Bagus</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600" {...withTTS(`Jumlah murid: ${course.students} orang`)}>
                  <Users className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">{course.students} orang telah bergabung</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600" {...withTTS(`Total Materi: ${course.syllabus.length} Bab`)}>
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{course.syllabus.length} Bab Materi</span>
                </div>
              </div>

              <Link 
                to={`/learn/${id || 1}`} 
                className="w-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-lg"
              >
                <Button 
                  className="w-full text-lg py-6 shadow-md"
                  aria-label="Mulai ikut kelas ini sekarang"
                  tabIndex={-1}
                  {...withTTS("Mulai Ikut Kelas Ini Sekarang")}
                >
                  Mulai Belajar Sekarang
                </Button>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
