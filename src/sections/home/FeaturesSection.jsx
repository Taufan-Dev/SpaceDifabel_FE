import { MonitorPlay, Eye, Users, ThumbsUp } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { useTTS } from '../../context/TTSContext';

const features = [
  {
    title: 'Sangat Mudah Dipakai',
    description: 'Tombol yang besar dan warna yang jelas, bikin kamu tidak akan kebingungan saat belajar.',
    icon: Eye,
  },
  {
    title: 'Belajar Menyenangkan',
    description: 'Ada video, teks, dan suara panduan. Belajar jadi tidak membosankan dan gampang dimengerti.',
    icon: MonitorPlay,
  },
  {
    title: 'Banyak Teman Baru',
    description: 'Kamu tidak sendirian. Kita bisa belajar bareng guru yang baik hati dan teman-teman spesial lainnya.',
    icon: Users,
  },
  {
    title: 'Membantu Cari Kerja',
    description: 'Setelah kamu hebat, kami bantu mengenalkan kamu ke tempat kerja ramah yang siap menerima kamu.',
    icon: ThumbsUp,
  },
];

export default function FeaturesSection() {
  const { withTTS } = useTTS();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4"
            {...withTTS("Dibuat Khusus Sesuai Kebutuhanmu")}
          >
            Dibuat Khusus Sesuai Kebutuhanmu
          </h2>
          <p 
            className="text-lg text-slate-600"
            {...withTTS("Website ini punya banyak kelebihan yang bikin kamu tambah nyaman berlama-lama di sini.")}
          >
            Website ini punya banyak kelebihan yang bikin kamu tambah nyaman belajar di sini.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={idx} 
                className="border-slate-100 hover:border-primary-100 p-6 flex flex-col items-start gap-4 transition-all hover:bg-primary-50"
                tabIndex={0}
                {...withTTS(`${feature.title}. ${feature.description}`)}
              >
                <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mb-2">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
