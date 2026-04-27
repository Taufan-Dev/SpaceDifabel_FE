import { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useTTS } from '../context/TTSContext';
import apiClient from '../api/axios';

const categories = ['Semua', 'Kisah Inspiratif', 'Panduan', 'Pendidikan', 'Tips & Trik'];

export default function Articles() {
  const { withTTS } = useTTS();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  // API States
  const [articlesData, setArticlesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce effect untuk search agar tidak memanggil API tiap kali ngetik
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        // Susun parameter API sesuai permintaan
        const params = {};
        if (searchQuery) params.search = searchQuery;
        if (activeCategory !== 'Semua') params.category = activeCategory;

        // Panggil endpoint GET /articles
        const response = await apiClient.get('/articles', { params });
        
        // Cek struktur response
        const data = response;
        setArticlesData(Array.isArray(data) ? data : (data.articles ? data.articles : []));
      } catch (err) {
        setError('Gagal memuat daftar artikel. Pastikan server API sedang berjalan.');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchArticles();
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceTimer);
  }, [activeCategory, searchQuery]);

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 min-h-screen">
      <div className="max-w-3xl mb-12">
        <h1 
          className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6"
          {...withTTS("Kumpulan Artikel dan Cerita")}
        >
          Kumpulan Artikel & Cerita
        </h1>
        <p 
          className="text-lg text-slate-600 mb-8"
          {...withTTS("Temukan berbagai kisah inspiratif, panduan bermanfaat, dan tips seputar dunia pendidikan inklusif.")}
        >
          Temukan berbagai kisah inspiratif, panduan bermanfaat, dan tips seputar dunia pendidikan inklusif.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mb-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 rounded-xl border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 sm:text-base outline-none transition-shadow"
            placeholder="Cari judul artikel atau isi konten..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Kolom pencarian artikel"
            {...withTTS("Ketik judul artikel atau konten untuk mencari")}
          />
        </div>
      </div>

      {/* Category Filter Bar */}
      <div 
        className="flex flex-wrap gap-3 mb-10 border-b border-slate-200 pb-8"
        role="tablist"
        aria-label="Pilih kategori artikel"
      >
        {categories.map(cat => (
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

      {/* Tampilan State (Loading, Error, Result) */}
      <div className="mb-20">
        {loading ? (
          // Skeleton UI Loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-4 border border-slate-200 h-96 flex flex-col">
                <div className="h-48 bg-slate-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-auto"></div>
                <div className="h-10 bg-slate-200 rounded w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error UI
          <div className="py-20 flex flex-col items-center justify-center text-center bg-rose-50 rounded-2xl border-2 border-dashed border-rose-200">
            <AlertCircle className="w-16 h-16 text-rose-400 mb-4" />
            <p className="text-rose-700 font-medium text-xl mb-2" {...withTTS(error)}>{error}</p>
            <Button variant="outline" onClick={() => setActiveCategory('Semua')}>Coba Ulangi</Button>
          </div>
        ) : articlesData.length > 0 ? (
          // Grid Data Aktual
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesData.map((article) => (
              <Link 
                key={article.id} 
                to={`/articles/${article.id}`} 
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-2xl group/link"
              >
                <Card 
                  className="flex flex-col h-full border-slate-200 hover:border-primary-300 hover:shadow-xl transition-all group overflow-hidden rounded-2xl bg-white cursor-pointer"
                  tabIndex={-1}
                  {...withTTS(`Artikel: ${article.title}. Kategori ${article.category}.`)}
                >
                  <div className="h-56 bg-slate-200 relative overflow-hidden">
                    {/* Placeholder image if not provided */}
                    <img 
                      src={article.image || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop'} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
                        {article.category || 'Pendidikan'}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader className="flex-1 pb-4 pt-6 px-6">
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date || 'Baru Saja'}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
                      {article.title}
                    </CardTitle>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {/* Ambil isi artikel pertama jika format array, atau gunakan langsung jika string */}
                      {Array.isArray(article.content) ? article.content[0] : (article.content || article.description)}
                    </p>
                  </CardHeader>
                  
                  <CardFooter className="pt-0 px-6 pb-6 mt-auto">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                          {(article.author || 'A').charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{article.author || 'Admin'}</span>
                      </div>
                      <div className="text-primary-600 group-hover:text-primary-700 font-medium flex items-center bg-transparent group-hover:bg-primary-50 rounded-full px-4 py-2 transition-colors">
                        Baca <BookOpen className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          // UI Data Kosong
          <div className="py-20 flex flex-col items-center justify-center text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Search className="w-16 h-16 text-slate-300 mb-4" />
            <p className="text-slate-600 font-medium text-xl mb-2" {...withTTS("Maaf, artikel tidak ditemukan.")}>
              Maaf, artikel tidak ditemukan di server.
            </p>
            <p className="text-slate-500 max-w-sm" {...withTTS("Coba cari dengan kata kunci lain atau pilih kategori yang berbeda.")}>
              Coba cari dengan kata kunci lain atau pastikan API Backend memiliki data yang sesuai.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
