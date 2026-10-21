import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Globe,
  Share2
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Nama lengkap wajib diisi';
    if (!email.trim()) {
      errs.email = 'Alamat email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Format email tidak valid';
    }
    if (!subject.trim()) errs.subject = 'Subjek pesan wajib diisi';
    if (!message.trim()) errs.message = 'Isi pesan wajib diisi';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Mohon lengkapi formulir kontak dengan benar.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Pesan Terkirim!', 'success');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="border-b border-[#476B50]/15 pb-6">
        <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
          Pusat Informasi & Kolaborasi
        </span>
        <h1 className="text-3xl font-bold text-[#294735] mt-1">
          Hubungi Tim Riset BioLiving SUDP
        </h1>
        <p className="text-sm text-[#777C73] max-w-2xl leading-relaxed mt-2">
          Punya pertanyaan seputar riset bioplastik pati singkong, kolaborasi akademik, atau lainnya? Tim mahasiswa peneliti kami siap berdiskusi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#476B50]/15 shadow-xs space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#294735]">
              Formulir Kritik & Saran
            </h2>
            <p className="text-xs text-[#777C73]">
              Kirimkan masukan atau pertanyaan untuk diskusi terkait BioLiving.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-[#F5F1E7]/60 rounded-2xl border border-[#476B50]/20 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#294735]">
                  Pesan Tercatat!
                </h3>
                <p className="text-xs text-[#777C73] max-w-sm mx-auto leading-relaxed">
                  Terima kasih, <strong>{name}</strong>. Pesan dengan subjek "<em>{subject}</em>" telah direkam dalam sesi prototipe ini.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl text-[11px] text-[#777C73] italic">
                *Pemberitahuan: Karena situs ini merupakan prototipe demonstrasi akademik, pesan dicatat secara lokal dan tidak dikirimkan melalui server SMTP email riil.
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-[#476B50] text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Kirim Pesan Baru
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#30352F]">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Muhammad Ghifary Billah"
                    className={`w-full px-3 py-2 bg-[#FCFBF7] rounded-xl border focus:outline-hidden ${
                      errors.name ? 'border-rose-400' : 'border-[#476B50]/20'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-500">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#30352F]">
                    Alamat Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@gmail.com"
                    className={`w-full px-3 py-2 bg-[#FCFBF7] rounded-xl border focus:outline-hidden ${
                      errors.email ? 'border-rose-400' : 'border-[#476B50]/20'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-500">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#30352F]">
                  Subjek Diskusi / Topik <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: Kolaborasi Pengujian Daya Tarik Bioplastik SUDP"
                  className={`w-full px-3 py-2 bg-[#FCFBF7] rounded-xl border focus:outline-hidden ${
                    errors.subject ? 'border-rose-400' : 'border-[#476B50]/20'
                  }`}
                />
                {errors.subject && <p className="text-[11px] text-rose-500">{errors.subject}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#30352F]">
                  Isi Pesan atau Masukan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan pertanyaan, masukan teknis, atau tanggapan prototipe Anda di sini..."
                  className={`w-full px-3 py-2 bg-[#FCFBF7] rounded-xl border focus:outline-hidden ${
                    errors.message ? 'border-rose-400' : 'border-[#476B50]/20'
                  }`}
                />
                {errors.message && <p className="text-[11px] text-rose-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#476B50] hover:bg-[#294735] text-white font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim</span>
              </button>

            </form>
          )}

        </div>

        {/* Right Column: Lab Info, Address & Social Placeholders */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-[#476B50]/15 space-y-5 shadow-xs">
            <h2 className="font-bold text-base text-[#294735] border-b border-gray-100 pb-2">
              Informasi Kontak Bioliving
            </h2>

            <div className="space-y-4 text-xs text-[#30352F]">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#476B50] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#294735]">Lokasi</strong>
                  <p className="text-[#777C73] leading-relaxed">
                    Jl. Boulevard UPJ, Bintaro Jaya, Kec. Ciputat, Kota Tangerang Selatan, Banten 15413. Universitas Pembangunan Jaya Tangerang Selatan, Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#476B50] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#294735]">Korespondensi Proyek</strong>
                  <p className="text-[#777C73]">muhammad.ghifarybillah@upj.ac.id</p>
                  <p className="text-[#777C73]">Benaya.upj.ac.id</p>
                  <p className="text-[#777C73]">fajrian.nur@upj.ac.id</p>
                  <p className="text-[#777C73]">Syifa.alesiasalsabila@upj.ac.id</p>
                  <p className="text-[#777C73]">Meidiana.Rizky@upj.ac.id</p>
                    </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#476B50] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#294735]">Narahubung</strong>
                  <p className="text-[#777C73]">0852-1338-9808  (Whatsapp)</p>
                </div>
              </div>

            </div>
          </div>

          {/* Social Media Placeholders */}
          <div className="bg-[#F5F1E7] p-6 rounded-3xl border border-[#476B50]/20 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#294735] flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#476B50]" />
              <span>Kanal Media & Repositori Riset</span>
            </h3>

            <p className="text-xs text-[#777C73] leading-relaxed">
              Tautan kanal publikasi proyek mahasiswa SUDP untuk sosialisasi bioplastik:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-[#476B50]/15 flex items-center gap-2 text-[#30352F]">
                <span className="font-semibold text-[#476B50]">Instagram:</span>
                <span className="text-[#777C73]">@bioliving.upj</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[#476B50]/15 flex items-center gap-2 text-[#30352F]">
                <span className="font-semibold text-[#476B50]">LinkedIn:</span>
                <span className="text-[#777C73]">BioLiving SUDP</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[#476B50]/15 flex items-center gap-2 text-[#30352F]">
                <span className="font-semibold text-[#476B50]">YouTube:</span>
                <span className="text-[#777C73]">BioLiving UPJ</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[#476B50]/15 flex items-center gap-2 text-[#30352F]">
                <span className="font-semibold text-[#476B50]">GitHub:</span>
                <span className="text-[#777C73]">bioliving-sudp</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
