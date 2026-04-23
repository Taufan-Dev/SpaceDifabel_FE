import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useTTS } from '../../context/TTSContext';

export default function HeroSection() {
  const { withTTS } = useTTS();

  return (
    <section className="relative overflow-hidden bg-slate-50 pt-20 pb-28 lg:pt-36 lg:pb-40">
      <div className="container mx-auto px-4 md:px-8 flex justify-center">
        <div className="flex flex-col items-center text-center max-w-4xl">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 font-medium text-sm mb-8"
            {...withTTS("Tempat Belajar Nomor 1 untuk Teman Disabilitas")}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tempat Belajar Spesial Untukmu</span>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-tight"
            {...withTTS("Ayo Belajar Keahlian Baru Tanpa Batas!")}
          >
            Ayo Belajar Keahlian Baru Tanpa <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Batas</span>
          </h1>
          
          <p 
            className="text-lg md:text-2xl text-slate-600 mb-12 max-w-2xl"
            {...withTTS("Di sini kamu bisa belajar banyak hal seru dengan mudah. Latih kemampuanmu dan raih pekerjaan impianmu sekarang juga.")}
          >
            Di sini kamu bisa belajar banyak hal seru dengan mudah. Latih kemampuanmu dan raih pekerjaan impianmu sekarang juga.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link 
              to="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 bg-primary-600 text-white hover:bg-primary-700 shadow-sm h-14 px-8 text-lg hover:scale-105"
              {...withTTS("Mulai Belajar Sekarang")}
            >
              Mulai Belajar Sekarang
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-lg hover:bg-slate-100 border-2"
              {...withTTS("Cari Tahu Lebih Lanjut")}
            >
              Cari Tahu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
