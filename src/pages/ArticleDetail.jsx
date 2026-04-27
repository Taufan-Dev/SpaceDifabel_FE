import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTTS } from '../context/TTSContext';
import apiClient from '../api/axios';

export default function ArticleDetail() {
  const { id } = useParams();
  const { withTTS } = useTTS();
  
  // State API
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/articles/${id}`);
        // Response sudah di-unwrap oleh interceptor
        const data = response;
        setArticle(data.article || data);
      } catch (err) {
        setError('Gagal memuat artikel. Kemungkinan artikel ini sudah dihapus atau server API tidak merespons.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pb-20 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
        <h2 className="text-xl font-medium text-slate-600" {...withTTS("Sedang memuat isi artikel...")}>
          Sedang memuat artikel...
        </h2>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[50vh] flex flex-col justify-center items-center bg-white">
        <AlertCircle className="w-16 h-16 text-rose-400 mb-6" />
        <h1 className="text-3xl font-bold text-slate-800 mb-6" {...withTTS("Artikel tidak ditemukan")}>
          {error || 'Artikel tidak ditemukan'}
        </h1>
        <Link to="/articles">
          <Button>Kembali ke Daftar Artikel</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Article Hero */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <img 
          src={article.image || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop'} 
          alt="" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-900/60 flex items-end">
          <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
            <Link to="/articles" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg px-2 py-1 -ml-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span {...withTTS("Kembali ke daftar artikel")}>Kembali ke daftar artikel</span>
            </Link>
            
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="bg-primary-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                {article.category || 'Pendidikan'}
              </span>
            </div>
            
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-4xl"
              {...withTTS(article.title)}
            >
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base font-medium">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span {...withTTS(`Ditulis oleh ${article.author || 'Admin'}`)}>{article.author || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span {...withTTS(`Diterbitkan pada ${article.date || 'Baru Saja'}`)}>{article.date || 'Baru Saja'}</span>
              </div>
              {article.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span {...withTTS(`Waktu baca sekitar ${article.readTime}`)}>{article.readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 md:px-8 -mt-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          {/* Share & Actions */}
          <div className="flex justify-end mb-10 border-b border-slate-100 pb-6">
            <Button variant="outline" className="rounded-full flex items-center gap-2" aria-label="Bagikan artikel ini">
              <Share2 className="w-4 h-4" />
              <span>Bagikan</span>
            </Button>
          </div>
          
          <article className="prose prose-lg prose-slate md:prose-xl max-w-none text-slate-800 leading-relaxed font-sans">
            {/* Dukungan jika content berupa array dari API atau sekadar single string (HTML/Markdown sederhana) */}
            {Array.isArray(article.content) ? (
              article.content.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="mb-6 last:mb-0"
                  {...withTTS(paragraph)}
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <div 
                className="whitespace-pre-wrap"
                {...withTTS(article.content || article.description || "Isi konten tidak tersedia.")}
              >
                {article.content || article.description || "Isi konten tidak tersedia."}
              </div>
            )}
          </article>
          
          {/* Author Bio */}
          <div className="mt-16 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center text-primary-700 font-bold text-3xl">
              {(article.author || 'A').charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Tentang Penulis</h3>
              <p className="text-slate-600 mb-0" {...withTTS(`${article.author || 'Admin'} adalah salah satu kontributor di SpaceDifabel yang gemar membagikan inspirasi.`)}>
                <span className="font-semibold text-slate-800">{article.author || 'Admin'}</span> adalah kontributor aktif di SpaceDifabel yang berdedikasi untuk membagikan informasi, panduan, dan kisah inspiratif seputar dunia inklusif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
