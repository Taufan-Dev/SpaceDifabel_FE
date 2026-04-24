import { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useTTS } from '../../context/TTSContext';

const courses = [
  {
    id: 1,
    title: 'Belajar Mengetik di Komputer (Tunanetra)',
    category: 'Dasar Komputer',
    target: 'Tunanetra',
    rating: 4.8,
    instructor: 'Bapak Sani',
    accessMods: ['Panduan Suara', 'Keyboard'],
  },
  {
    id: 2,
    title: 'Belajar Menggambar Cantik di HP (Tunarungu)',
    category: 'Kreatifitas',
    target: 'Tunarungu',
    rating: 4.9,
    instructor: 'Ibu Maya',
    accessMods: ['Bahasa Isyarat', 'Visual'],
  },
  {
    id: 3,
    title: 'Cara Jualan Online Mudah',
    category: 'Pemasaran',
    target: 'Umum',
    rating: 4.7,
    instructor: 'Kak Budi',
    accessMods: ['Tampilan Besar', 'Langkah Mudah'],
  }
];

const disabilities = ['Semua', 'Tunanetra', 'Tunarungu', 'Tunagrahita', 'Tunadaksa', 'Umum'];

export default function CourseListSection() {
  const { withTTS } = useTTS();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredCourses = activeCategory === 'Semua' 
    ? courses 
    : courses.filter(c => c.target === activeCategory);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 
              className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4"
              {...withTTS("Ayo Pilih Kelas Belajarmu")}
            >
              Ayo Pilih Kelas Belajarmu
            </h2>
            <p 
              className="text-lg text-slate-600"
              {...withTTS("Banyak kelas seru yang bisa kamu ikuti. Guru-guru di sini sangat sabar mengajarimu pelan-pelan.")}
            >
              Banyak pelajaran baru yang asyik. Guru-guru di sini sangat baik dan sabar mengajarimu dari nol.
            </p>
          </div>
          <Link 
            to="/courses" 
            className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 w-fit p-2 rounded-md hover:bg-primary-50 focus-visible:ring-2 focus-visible:ring-primary-600 outline-none"
            aria-label="Lihat Semua Kelas yang Ada"
            {...withTTS("Klik di sini untuk melihat semua kelas belajar kita")}
          >
            Lihat Semua Kelas
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Link>
        </div>

        {/* Category Filter Bar */}
        <div 
          className="flex flex-wrap gap-3 mb-10"
          role="tablist"
          aria-label="Pilih kategori disabilitas"
        >
          {disabilities.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 ${
                activeCategory === cat 
                  ? 'bg-primary-600 text-white shadow-md scale-105' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              {...withTTS(`Filter kategori: ${cat}`)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
            <Card 
              key={course.id} 
              className="flex flex-col h-full border-slate-200 hover:border-primary-300 group"
              tabIndex={0}
              {...withTTS(`Kelas: ${course.title}. Diajar oleh ${course.instructor}. Jenis kelas ${course.category}.`)}
            >
              <div className="h-48 bg-slate-200 rounded-t-xl overflow-hidden relative">
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm backdrop-blur-sm">
                    {course.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end">
                  <div className="p-4 w-full text-white flex justify-between items-center">
                    <span className="text-sm font-medium">{course.instructor}</span>
                    <div className="flex items-center text-yellow-400" aria-label={`Bintang ${course.rating}`}>
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm font-bold">{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardHeader className="flex-1 pb-4">
                <CardTitle className="text-xl mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">{course.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {course.accessMods.map((mod, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                      {mod}
                    </span>
                  ))}
                </div>
              </CardHeader>
              
              <CardFooter className="pt-0">
                <Link to={`/courses/${course.id}`} className="w-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-lg">
                  <Button className="w-full" aria-label={`Buka halaman kelas ${course.title}`} tabIndex={-1}>
                    Buka Kelas Ini
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 font-medium text-lg" {...withTTS("Maaf, kelas untuk kategori ini sedang disiapkan. Silakan pilih kategori lain.")}>
                Maaf, kelas untuk kategori ini sedang disiapkan.<br/>Pilih kategori disabilitas lainnya ya!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
