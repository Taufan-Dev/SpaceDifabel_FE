import { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Users, Award, HandHeart, CheckCircle, ArrowLeft, Shield, X, UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useTTS } from '../context/TTSContext';

export default function JobDetail() {
  const { withTTS } = useTTS();
  const { id } = useParams();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleApply = (e) => {
    e.preventDefault();
    if (!cvFile) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Close modal after showing success for a while
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setCvFile(null);
        setCoverLetter('');
      }, 4000);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Navigasi */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <Link 
            to="/jobs" 
            className="inline-flex items-center text-slate-500 hover:text-primary-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
            {...withTTS("Kembali ke daftar lowongan")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
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
            <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center border-4 border-primary-50 flex-shrink-0 shadow-lg relative group">
              <div className="absolute inset-0 bg-primary-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Briefcase className="w-10 h-10 text-primary-600 relative z-10" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-bold rounded-full border border-blue-200 shadow-sm">
                  {job.type}
                </span>
                <span className="px-3 py-1.5 bg-purple-50 text-purple-700 text-sm font-bold rounded-full border border-purple-200 shadow-sm">
                  Kategori Difabel: {job.target}
                </span>
              </div>

              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-3 leading-tight"
                {...withTTS(`Posisi Pekerjaan: ${job.title}`)}
              >
                {job.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-slate-600 font-medium mb-6" {...withTTS(`Diperusahaan ${job.company}`)}>
                {job.company}
              </h2>

              <div className="flex flex-wrap items-center gap-6 text-slate-600">
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full font-medium" {...withTTS(`Lokasi: ${job.location}`)}>
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full font-medium" {...withTTS(`Gaji: ${job.salary}`)}>
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
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-4" {...withTTS("Deskripsi Pekerjaan")}>Deskripsi Pekerjaan</h3>
              <p className="text-slate-600 leading-relaxed text-lg" {...withTTS(job.description)}>
                {job.description}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 text-rose-600" {...withTTS("Persyaratan Kandidat")}>
                <div className="p-2 bg-rose-50 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-slate-900">Persyaratan Kandidat</span>
              </h3>
              <ul className="space-y-5">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-lg leading-relaxed" {...withTTS(`Syarat ke ${i+1}: ${req}`)}>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 text-emerald-600" {...withTTS("Keuntungan & Benefit")}>
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <HandHeart className="w-6 h-6" />
                </div>
                <span className="text-slate-900">Keuntungan (Benefit)</span>
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((ben, i) => (
                  <li key={i} className="flex gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 items-center shadow-sm">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0 shadow-sm shadow-emerald-200"></span>
                    <span className="text-slate-700 font-medium text-lg leading-snug" {...withTTS(`Benefit: ${ben}`)}>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar CTA */}
          <div className="space-y-6">
            
            <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-2xl shadow-emerald-900/5 sticky top-28 ring-4 ring-emerald-50/50">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Fasilitas Difabel Tersedia</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.accessMods.map((mod, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold border border-slate-200">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mb-8">
                <div className="flex items-center gap-3 text-slate-500 text-sm mb-4">
                  <div className="p-1.5 bg-slate-100 rounded-lg">
                    <Users className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="font-medium text-slate-600">24 orang sedang melamar posisi ini</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">Pastikan CV dan profil kamu sudah lengkap sebelum menekan tombol lamar.</p>
              </div>

              <Button 
                className="w-full text-lg py-6 shadow-xl shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.02] transition-all focus-visible:ring-emerald-600 rounded-2xl font-bold"
                aria-label="Lamar Pekerjaan Ini Sekarang"
                {...withTTS("Lamar Pekerjaan Ini Sekarang")}
                onClick={() => setIsModalOpen(true)}
              >
                Kirim Lamaran Pekerjaan
              </Button>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-blue-100">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium" {...withTTS("Perhatian. Perusahaan yang terdaftar di sini adalah perusahaan mitra yang ramah difabel dan telah kami verifikasi.")}>
                Pekerjaan ini diposting oleh mitra yang sudah kami <strong className="text-blue-800">verifikasi inklusivitasnya</strong>. Proses rekrutmen tidak dipungut biaya apapun.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Modal Lamar Pekerjaan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => !isSubmitting && !isSuccess && setIsModalOpen(false)}
            aria-hidden="true"
          ></div>
          
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden transform transition-all duration-300 scale-100 opacity-100"
            role="dialog"
            aria-modal="true"
          >
            {isSuccess ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4" {...withTTS("Lamaran Berhasil Dikirim")}>Lamaran Terkirim!</h3>
                <p className="text-slate-600 text-lg" {...withTTS("Perusahaan akan meninjau CV Anda dan segera menghubungi melalui email atau nomor telepon yang terdaftar.")}>
                  Perusahaan akan meninjau CV Anda dan segera menghubungi melalui email/telepon.
                </p>
              </div>
            ) : (
              <>
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
                  <h3 className="text-2xl font-bold text-slate-800" {...withTTS("Kirim Lamaran Pekerjaan")}>Kirim Lamaran</h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600"
                    aria-label="Batal dan tutup formulir"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleApply} className="p-8 bg-slate-50">
                  <div className="mb-6">
                    <label className="block text-base font-bold text-slate-700 mb-3" {...withTTS("Unggah CV atau Resume Anda")}>
                      Unggah CV / Resume <span className="text-rose-500">*</span>
                    </label>
                    <div className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer relative overflow-hidden bg-white ${cvFile ? 'border-primary-400 bg-primary-50/30' : 'border-slate-300 hover:border-primary-400 hover:bg-primary-50/10'}`}>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={(e) => setCvFile(e.target.files[0])}
                        required
                        aria-label="Pilih file CV dari komputer Anda"
                        tabIndex={0}
                      />
                      {cvFile ? (
                        <div className="flex flex-col items-center justify-center relative z-0">
                          <div className="w-16 h-16 bg-white shadow-sm rounded-2xl border border-primary-100 flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-primary-600" />
                          </div>
                          <p className="text-base font-bold text-slate-800">{cvFile.name}</p>
                          <p className="text-sm text-primary-600 mt-2 font-semibold">Klik untuk mengganti file</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center relative z-0">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <UploadCloud className="w-8 h-8 text-slate-400" />
                          </div>
                          <p className="text-base font-bold text-slate-700 mb-2" {...withTTS("Klik atau seret file ke sini")}>Klik untuk memilih file CV</p>
                          <p className="text-sm text-slate-500 font-medium">Format PDF atau Word (Maks. 5MB)</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-base font-bold text-slate-700 mb-3" {...withTTS("Surat Pengantar singkat opsional")}>
                      Surat Pengantar (Opsional)
                    </label>
                    <textarea 
                      className="w-full border border-slate-200 rounded-2xl p-5 focus:ring-4 focus:ring-primary-600/20 focus:border-primary-600 outline-none text-slate-700 min-h-[140px] resize-none text-base bg-white shadow-sm transition-all"
                      placeholder="Ceritakan sedikit tentang mengapa Anda cocok untuk posisi ini..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      aria-label="Tulis surat pengantar opsional"
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-5 text-lg font-bold shadow-xl shadow-primary-600/20 disabled:opacity-70 disabled:cursor-not-allowed rounded-2xl"
                    disabled={isSubmitting || !cvFile}
                    aria-label={isSubmitting ? "Sedang mengirim lamaran" : "Kirim Lamaran Sekarang"}
                    {...withTTS("Kirim Lamaran Sekarang")}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </span>
                    ) : (
                      "Kirim Lamaran Sekarang"
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
