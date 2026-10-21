import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpRight, Mail, MapPin, Globe } from 'lucide-react';
import { LOGO_IMAGE } from '../data/initialData';

export const Footer: React.FC = () => {
  const { navigate, quickLoginAs } = useApp();

  return (
    <footer className="bg-[#294735] text-[#F5F1E7] pt-16 pb-12 border-t border-[#476B50]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#476B50]/40">
          
          {/* Brand & Project Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img src={LOGO_IMAGE} alt="Logo BioLiving" className="w-8 h-8 rounded-lg object-contain" />
              
              <span className="text-2xl font-bold tracking-tight text-[#FCFBF7]">
                BioLiving
              </span>
            </div>
            <p className="text-sm text-[#A8B99A] leading-relaxed max-w-sm">
              Inisiatif pemanfaatan limbah organik menjadi bioplastik terurai hayati dan platform edukasi konsumsi bertanggung jawab, dikembangkan dalam kerangka Sustainable Urban Development Project (SUDP).
            </p>
            <div className="pt-2 text-xs text-[#F5F1E7]/70 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A8B99A]" />
              <span>Bioliving Team</span>
            </div>
          </div>

          {/* Navigasi Utama */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A8B99A]">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-sm text-[#F5F1E7]/80">
              <li>
                <button
                  onClick={() => navigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Katalog Produk
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('learn')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pusat Edukasi Bioplastik
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tentang Proyek SUDP
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kontak Tim BioLiving
                </button>
              </li>
            </ul>
          </div>

          {/* Kategori Inovasi */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A8B99A]">
              Kategori Produk
            </h4>
            <ul className="space-y-2 text-sm text-[#F5F1E7]/80">
              <li>
                <button
                  onClick={() => navigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tas Belanja Bioplastik (Pati Singkong)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pouch & Clutch Fungsional
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ID Card Holder & Aksesori Kantor
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kap Lampu Interior Berkelanjutan
                </button>
              </li>
            </ul>
          </div>

          {/* Kontak & SUDP Lab */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A8B99A]">
              informasi
            </h4>
            <div className="space-y-2 text-sm text-[#F5F1E7]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A8B99A] shrink-0 mt-0.5" />
                <span>Universitas Pembangunan Jaya, Tangerang Selatan  Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A8B99A] shrink-0" />
                <span>Bioliving@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#A8B99A] shrink-0" />
                <span>bioliving.upj.id</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => quickLoginAs('admin')}
                className="text-xs text-[#A8B99A] hover:text-white flex items-center gap-1 underline underline-offset-4 cursor-pointer"
              >
                <span>Masuk Portal Pengelola / Admin</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Baris Bawah: Hak Cipta & Catatan Akademik */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8B99A]">
          <p>
            &copy; {new Date().getFullYear()} BioLiving SUDP Team
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#F5F1E7]/70">Simulasi Pembelajaran & Riset Urban Development</span>
            <span>·</span>
            <span>Bioliving</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
