import { useState } from 'react';
import { Star, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useTTS } from '../context/TTSContext';

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
  },
  {
    id: 4,
    title: 'Dasar Microsoft Word',
    category: 'Dasar Komputer',
    target: 'Umum',
    rating: 4.6,
    instructor: 'Ibu Ratna',
    accessMods: ['Langkah Mudah'],
  },
  {
    id: 5,
    title: 'Bahasa Inggris Dasar Tunanetra',
    category: 'Bahasa',
    target: 'Tunanetra',
    rating: 4.9,
    instructor: 'Kak Andi',
    accessMods: ['Panduan Suara', 'Teks Besar'],
  }
];

const disabilities = ['Semua', 'Tunanetra', 'Tunarungu', 'Tunagrahita', 'Tunadaksa', 'Umum'];

export default function Courses() {
  const { withTTS } = useTTS();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(c => {
    const matchesCategory = activeCategory === 'Semua' || c.target === activeCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 min-h-screen">
      <div className="max-w-3xl mb-12">
        <h1 
          className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6"
          {...withTTS("Katalog Semua Kursus")}
        >
          Katalog Semua Kursus
        </h1>
        <p 
          className="text-lg text-slate-600 mb-8"
          {...withTTS("Cari dan pilih kursus yang paling cocok untuk kebutuhan belajarmu di sini.")}
        >
          Cari dan pilih kursus yang paling cocok untuk kebutuhan belajarmu di sini.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mb-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 rounded-xl border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 sm:text-base outline-none transition-shadow"
            placeholder="Cari kursus, nama guru, atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Kolom pencarian kursus"
            {...withTTS("Ketik nama kursus atau guru untuk mencari")}
          />
        </div>
      </div>

      {/* Category Filter Bar */}
      <div 
        className="flex flex-wrap gap-3 mb-10 border-b border-slate-200 pb-8"
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

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Link 
              key={course.id} 
              to={`/courses/${course.id}`} 
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-xl group/link"
            >
              <Card 
                className="flex flex-col h-full border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all group cursor-pointer"
                tabIndex={-1}
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
                  <div className="w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg px-4 py-2 transition-colors">
                    Buka Kelas Ini
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Search className="w-16 h-16 text-slate-300 mb-4" />
            <p className="text-slate-600 font-medium text-xl mb-2" {...withTTS("Maaf, kelas tidak ditemukan.")}>
              Maaf, kelas tidak ditemukan.
            </p>
            <p className="text-slate-500 max-w-sm" {...withTTS("Coba cari dengan kata kunci lain atau pilih kategori yang berbeda.")}>
              Coba cari dengan kata kunci lain atau pilih kategori disabilitas yang berbeda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
