import { useState } from 'react';
import { Briefcase, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useTTS } from '../context/TTSContext';

const jobs = [
  {
    id: 1,
    title: 'Customer Service Online',
    category: 'Pelayanan',
    target: 'Tunanetra',
    rating: 'Remote',
    instructor: 'PT Maju Bersama',
    accessMods: ['Ramah Screen-Reader', 'Jam Fleksibel'],
  },
  {
    id: 2,
    title: 'Desainer Grafis (Freelance)',
    category: 'Kreatifitas',
    target: 'Tunarungu',
    rating: 'Hybrid',
    instructor: 'Studio Warna',
    accessMods: ['Komunikasi Chat', 'Visual Base'],
  },
  {
    id: 3,
    title: 'Admin Rekap Data Transaksi',
    category: 'Administrasi',
    target: 'Umum',
    rating: 'Kantor',
    instructor: 'CV Makmur',
    accessMods: ['Akses Kursi Roda', 'Lantai 1'],
  },
  {
    id: 4,
    title: 'Penulis Konten Website',
    category: 'Digital',
    target: 'Tunadaksa',
    rating: 'Remote',
    instructor: 'Agensi Digital',
    accessMods: ['Kerja Jarak Jauh', 'Fleksibel'],
  },
  {
    id: 5,
    title: 'Staf Pengarsipan',
    category: 'Hrd',
    target: 'Tunarungu',
    rating: 'Kantor',
    instructor: 'Klinik Sehat',
    accessMods: ['Cahaya Terang', 'Area Tenang'],
  }
];

const disabilities = ['Semua', 'Tunanetra', 'Tunarungu', 'Tunagrahita', 'Tunadaksa', 'Umum'];

export default function Jobs() {
  const { withTTS } = useTTS();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(j => {
    const matchesCategory = activeCategory === 'Semua' || j.target === activeCategory;
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          j.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 min-h-screen">
      <div className="max-w-3xl mb-12">
        <h1 
          className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6"
          {...withTTS("Katalog Lowongan Pekerjaan")}
        >
          Katalog Lowongan Pekerjaan
        </h1>
        <p 
          className="text-lg text-slate-600 mb-8"
          {...withTTS("Cari dan lamar pekerjaan yang paling cocok untuk keahlianmu dari perusahaan yang inklusif.")}
        >
          Cari dan lamar pekerjaan impianmu dari berbagai perusahaan luar biasa yang inklusif dan ramah terhadap teman difabel.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mb-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 rounded-xl border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 sm:text-base outline-none transition-shadow"
            placeholder="Cari lowongan, posisi, atau nama perusahaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Kolom pencarian lowongan kerja"
            {...withTTS("Ketik nama lowongan atau perusahaan untuk mencari")}
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
            {...withTTS(`Filter kategori pekerjaan: ${cat}`)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card 
              key={job.id} 
              className="flex flex-col h-full border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all group"
              tabIndex={0}
              {...withTTS(`Posisi: ${job.title}. Perusahaan: ${job.instructor}. Lokasi kerja: ${job.rating}.`)}
            >
              <div className="h-48 bg-slate-200 rounded-t-xl overflow-hidden relative">
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm backdrop-blur-sm">
                    {job.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end">
                  <div className="p-4 w-full text-white flex justify-between items-center">
                    <span className="text-sm font-medium">{job.instructor}</span>
                    <div className="flex items-center text-primary-300" aria-label={`Sistem Kerja ${job.rating}`}>
                      <Briefcase className="w-4 h-4" />
                      <span className="ml-1 text-sm font-bold">{job.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardHeader className="flex-1 pb-4">
                <CardTitle className="text-xl mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">{job.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {job.accessMods.map((mod, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                      {mod}
                    </span>
                  ))}
                </div>
              </CardHeader>
              
              <CardFooter className="pt-0">
                <Link to={`/jobs/${job.id}`} className="w-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-lg">
                  <Button className="w-full" aria-label={`Lamar posisi ${job.title}`} tabIndex={-1}>
                    Lamar Sekarang
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Search className="w-16 h-16 text-slate-300 mb-4" />
            <p className="text-slate-600 font-medium text-xl mb-2" {...withTTS("Maaf, lowongan tidak ditemukan.")}>
              Maaf, lowongan kerja tidak ditemukan.
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
