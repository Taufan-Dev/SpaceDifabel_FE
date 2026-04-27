import { useState, useEffect } from 'react';
import { Star, Search, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useTTS } from '../context/TTSContext';
import apiClient from '../api/axios';

const disabilities = ['Semua', 'Tunanetra', 'Tunarungu', 'Tunagrahita', 'Tunadaksa', 'Umum'];

export default function Courses() {
  const { withTTS } = useTTS();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  // API States
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (searchQuery) params.search = searchQuery;
        // Menggunakan "target" sebagai nama parameter filter kategori difabel sesuai dokumentasi API
        if (activeCategory !== 'Semua') params.target = activeCategory;

        const response = await apiClient.get('/courses', { params });
        const data = response;
        setCourses(Array.isArray(data) ? data : (data.courses ? data.courses : []));
      } catch (err) {
        setError('Gagal memuat katalog kelas. Coba ulangi beberapa saat lagi.');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchCourses();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, activeCategory]);

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
            placeholder="Cari kursus, topik, dll..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Kolom pencarian kursus"
            {...withTTS("Ketik nama kursus untuk mencari")}
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
            {...withTTS(`Filter kategori disabilitas: ${cat}`)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Status Render Area */}
      <div className="mb-20">
        {loading ? (
          // Skeleton Loading UI
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-xl border border-slate-200 h-[400px] flex flex-col">
                <div className="h-48 bg-slate-200 rounded-t-xl"></div>
                <div className="p-4 flex-1">
                  <div className="h-6 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
                    <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="h-10 w-full bg-slate-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error UI
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-rose-50 rounded-2xl border-2 border-dashed border-rose-200">
            <AlertCircle className="w-16 h-16 text-rose-400 mb-4" />
            <p className="text-rose-700 font-medium text-xl mb-2" {...withTTS(error)}>{error}</p>
            <Button variant="outline" onClick={() => { setActiveCategory('Semua'); setSearchQuery(''); }}>Reset Pencarian</Button>
          </div>
        ) : courses.length > 0 ? (
          // Courses Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((course) => {
              // Safety checks on properties
              const accessModsArray = Array.isArray(course.accessMods) ? course.accessMods : 
                                      (typeof course.accessMods === 'string' ? course.accessMods.split(',') : []);
              
              return (
                <Link 
                  key={course.id} 
                  to={`/courses/${course.id}`} 
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-xl group/link"
                >
                  <Card 
                    className="flex flex-col h-full border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all group cursor-pointer"
                    tabIndex={-1}
                    {...withTTS(`Kelas: ${course.title}. Diajar oleh ${course.instructor || 'Pengajar'}. Target Disabilitas: ${course.target || 'Umum'}.`)}
                  >
                    <div className="h-48 bg-slate-200 rounded-t-xl overflow-hidden relative">
                      <img 
                        src={course.image || course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'} 
                        alt="" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm backdrop-blur-sm">
                          {course.category || 'Pendidikan'}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent flex items-end">
                        <div className="p-4 w-full text-white flex justify-between items-center">
                          <span className="text-sm font-medium">{course.instructor || 'Instruktur'}</span>
                          <div className="flex items-center text-yellow-400" aria-label={`Bintang ${course.rating || 5.0}`}>
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1 text-sm font-bold">{course.rating || '5.0'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader className="flex-1 pb-4">
                      <CardTitle className="text-xl mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">{course.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {accessModsArray.map((mod, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                            {mod}
                          </span>
                        ))}
                        {/* Menambahkan label target jika tidak ada mod */}
                        {accessModsArray.length === 0 && course.target && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                            Fokus: {course.target}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardFooter className="pt-0">
                      <div className="w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg px-4 py-2 transition-colors">
                        Buka Kelas Ini
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          // Empty State
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Search className="w-16 h-16 text-slate-300 mb-4" />
            <p className="text-slate-600 font-medium text-xl mb-2" {...withTTS("Maaf, kelas tidak ditemukan.")}>
              Maaf, kelas tidak ditemukan di server.
            </p>
            <p className="text-slate-500 max-w-sm" {...withTTS("Coba cari dengan kata kunci lain atau pilih kategori disabilitas yang berbeda.")}>
              Coba cari dengan kata kunci lain atau pilih kategori disabilitas yang berbeda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
