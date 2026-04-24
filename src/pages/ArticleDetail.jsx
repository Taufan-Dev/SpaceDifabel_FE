import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTTS } from '../context/TTSContext';
import { articles } from '../data/articles';

export default function ArticleDetail() {
  const { id } = useParams();
  const { withTTS } = useTTS();
  const articleId = parseInt(id, 10);
  
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[50vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-6" {...withTTS("Artikel tidak ditemukan")}>Artikel tidak ditemukan</h1>
        <Link to="/articles">
          <Button>Kembali ke Daftar Artikel</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Article Hero */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <img src={article.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/60 flex items-end">
          <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
            <Link to="/articles" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg px-2 py-1 -ml-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span {...withTTS("Kembali ke daftar artikel")}>Kembali ke daftar artikel</span>
            </Link>
            
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="bg-primary-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                {article.category}
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
                <span {...withTTS(`Ditulis oleh ${article.author}`)}>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span {...withTTS(`Diterbitkan pada ${article.date}`)}>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span {...withTTS(`Waktu baca sekitar ${article.readTime}`)}>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 md:px-8 -mt-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          {/* Share & Actions */}
          <div className="flex justify-end mb-10 border-b border-slate-100 pb-6">
            <Button variant="outline" className="rounded-full flex items-center gap-2" aria-label="Bagikan artikel ini">
              <Share2 className="w-4 h-4" />
              <span>Bagikan</span>
            </Button>
          </div>
          
          <article className="prose prose-lg prose-slate md:prose-xl max-w-none text-slate-800 leading-relaxed font-sans">
            {article.content.map((paragraph, index) => (
              <p 
                key={index} 
                className="mb-6 last:mb-0"
                {...withTTS(paragraph)}
              >
                {paragraph}
              </p>
            ))}
          </article>
          
          {/* Author Bio */}
          <div className="mt-16 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center text-primary-700 font-bold text-3xl">
              {article.author.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Tentang Penulis</h3>
              <p className="text-slate-600 mb-0" {...withTTS(`${article.author} adalah salah satu kontributor di SpaceDifabel yang gemar membagikan inspirasi.`)}>
                <span className="font-semibold text-slate-800">{article.author}</span> adalah kontributor aktif di SpaceDifabel yang berdedikasi untuk membagikan informasi, panduan, dan kisah inspiratif seputar dunia inklusif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
