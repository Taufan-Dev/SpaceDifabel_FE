import { Briefcase, MapPin, DollarSign, Users, Award, HandHeart, CheckCircle, ArrowLeft, Shield } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useTTS } from '../context/TTSContext';

export default function JobDetail() {
  const { withTTS } = useTTS();
  const { id } = useParams();

  // Mock data lamaran tanpa video
  const job = {
    title: 'Customer Service Online (Spesialis Pesanan)',
    company: 'PT Maju Bersama Berkarya',
    location: 'Bisa dari Rumah (Remote)',
    type: 'Full-Time',
    category: 'Pelayanan (Customer Service)',
    target: 'Tunanetra & Tunadaksa',
    salary: 'Rp 4.000.000 - Rp 5.500.000',
    accessMods: ['Ramah Screen-Reader', 'Jam Kerja Fleksibel', 'Aplikasi Khusus Teks'],
    description: 'Kami mencari individu hebat untuk bergabung sebagai Customer Service Spesialis. Pekerjaan utama Anda adalah membalas pesan dari pelanggan, membantu mereka menyelesaikan pesanan, dan mendata keluhan, semuanya melalui aplikasi *chat* di komputer yang sepenuhnya mendukung aksesibilitas layar (Screen-Reader) tanpa memerlukan aktivitas telepon atau komunikasi visual/kamera.',
    requirements: [
      'Pendidikan minimal SMA/Sederajat.',
      'Ramah dan suka membantu menyelesaikan masalah orang lain.',
      'Bisa mengetik dengan lancar menggunakan keyboard (kecepatan dasar).',
      'Memiliki komputer/laptop sendiri di rumah dengan akses internet.',
      'Nyaman bekerja remote dengan sistem laporan harian.'
    ],
    benefits: [
      'Gaji Pokok bulanan tepat waktu.',
      'Tunjangan kuota internet Rp300.000/bulan.',
      'Asuransi kesehatan lengkap.',
      'Waktu kerja yang fleksibel (tidak harus jam 8-5, asalkan 8 jam sehari terpenuhi).'
    ]
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Navigasi */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <Link 
            to="/jobs" 
            className="inline-flex items-center text-slate-500 hover:text-primary-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
            {...withTTS("Kembali ke daftar lowongan")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Lowongan
          </Link>
        </div>
      </div>

      {/* Main Header / Jumbotron */}
      <div className="bg-white border-b border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-primary-50 transform -skew-x-12 translate-x-20 hidden md:block"></div>
        <div className="container mx-auto px-4 md:px-8 py-12 lg:py-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Company Logo Placeholder */}
            <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 flex-shrink-0 shadow-sm">
              <Briefcase className="w-10 h-10 text-primary-500" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-100">
                  {job.type}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-semibold rounded-full border border-purple-100">
                  Kategori Difabel: {job.target}
                </span>
              </div>

              <h1 
                className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3"
                {...withTTS(`Posisi Pekerjaan: ${job.title}`)}
              >
                {job.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-slate-600 font-medium mb-6" {...withTTS(`Diperusahaan ${job.company}`)}>
                {job.company}
              </h2>

              <div className="flex flex-wrap items-center gap-6 text-slate-600">
                <div className="flex items-center gap-2" {...withTTS(`Lokasi: ${job.location}`)}>
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2" {...withTTS(`Gaji: ${job.salary}`)}>
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                  <span>{job.salary}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="container mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-4" {...withTTS("Deskripsi Pekerjaan")}>Deskripsi Pekerjaan</h3>
              <p className="text-slate-600 leading-relaxed text-lg" {...withTTS(job.description)}>
                {job.description}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 text-rose-600" {...withTTS("Persyaratan Kandidat")}>
                <Award className="w-6 h-6" />
                <span className="text-slate-900">Persyaratan Kandidat</span>
              </h3>
              <ul className="space-y-4">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-lg leading-relaxed" {...withTTS(`Syarat ke ${i+1}: ${req}`)}>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 text-emerald-600" {...withTTS("Keuntungan & Benefit")}>
                <HandHeart className="w-6 h-6" />
                <span className="text-slate-900">Keuntungan (Benefit)</span>
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((ben, i) => (
                  <li key={i} className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-slate-700 font-medium" {...withTTS(`Benefit: ${ben}`)}>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar CTA */}
          <div className="space-y-6">
            
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-emerald-100 shadow-xl shadow-emerald-900/5 sticky top-24 ring-4 ring-emerald-50">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Fasilitas Difabel Tersedia</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.accessMods.map((mod, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-sm font-medium border border-slate-200">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mb-8">
                <div className="flex items-center gap-3 text-slate-500 text-sm mb-4">
                  <Users className="w-4 h-4" />
                  <span>24 orang sedang melamar posisi ini</span>
                </div>
                <p className="text-slate-600">Pastikan profil kamu sudah lengkap sebelum menekan tombol lamar.</p>
              </div>

              <Button 
                className="w-full text-lg py-6 shadow-md bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-600"
                aria-label="Lamar Pekerjaan Ini Sekarang"
                {...withTTS("Lamar Pekerjaan Ini Sekarang")}
                onClick={() => alert("Simulasi: Lamaran berhasil dikirim! Perusahaan akan menghubungi kamu segera.")}
              >
                Kirim Lamaran Pekerjaan
              </Button>
            </div>

            <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 flex items-start gap-4">
              <div className="bg-primary-100 p-2 rounded-full">
                <Shield className="w-6 h-6 text-primary-600 hidden" />
                <span className="text-2xl pt-1">🛡️</span>
              </div>
              <p className="text-sm text-primary-800 leading-relaxed" {...withTTS("Perhatian. Perusahaan yang terdaftar di sini adalah perusahaan mitra yang ramah difabel dan telah kami verifikasi.")}>
                Pekerjaan di sini diposting oleh mitra yang sudah kami <strong>verifikasi inklusivitasnya</strong>. Proses rekrutmen tidak dipungut biaya apapun.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
