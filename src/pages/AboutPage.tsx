import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  HERO_IMAGE, 
  SHOPPING_BAG_IMAGE, 
  POUCH_IMAGE, 
  ID_HOLDER_IMAGE, 
  LAMPSHADE_IMAGE 
} from '../data/initialData';
import { 
  Compass, 
  Target, 
  CheckCircle2, 
  Users, 
  BookOpen, 
  ShoppingBag, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  const missions = [
    'Mengeksplorasi potensi limbah organik (seperti kulit singkong & residu pati) sebagai sumber bahan baku bioplastik ramah lingkungan.',
    'Mengembangkan dan memperkenalkan prototipe produk bioplastik fungsional guna mensubstitusi kantong plastik sekali pakai.',
    'Meningkatkan kesadaran masyarakat mengenai dampak sampah plastik dan mendorong pola konsumsi bertanggung jawab.',
    'Menyediakan platform digital terpadu yang menghubungkan informasi produk, edukasi ilmiah, dan simulasi adopsi ramah lingkungan.'
  ];

  const teamMembers = [
    {
      name: 'Meidiana Rizky Harimansyah Putri',
      role: 'Pengembangan Formulasi Bioplastik',
      division: '2024061052',
      desc: 'Bereksperimen dengan pencampuran resin pati singkong dan agen pemlastis organik untuk mendapatkan elastisitas optimal.'
    },
    {
      name: 'Benaya Evandra Yuwono Panggabean',
      role: 'Analisis Sirkular & Dampak Lingkungan',
      division: '2024051029',
      desc: 'Menganalisis potensi dekomposisi hayati, pemetaan limbah sentra industri olahan, dan integrasi target SDGs.'
    },
    {
      name: 'Muhammad Ghifary Billah',
      role: 'Pengembangan Web & Edukasi Digital',
      division: '2024081038',
      desc: 'Merancang arsitektur situs web e-commerce prototipe dan modul pembelajaran interaktif yang ramah pengguna.'
    },
    {
      name: 'Syifa Alesia Salsabila',
      role: 'Komunikasi Sains & Keterlibatan Publik',
      division: '2024081034',
      desc: 'Menyusun materi literasi bioplastik dan kampanye pengurangan kantong plastik bagi warga perkotaan.'
    },
    {
      name: 'Fajrian Nur Wibowo',
      role: 'Pengembangan Formulasi Bioplastik',
      division: '2024101023',
      desc: 'Bereksperimen dengan pencampuran resin pati singkong dan agen pemlastis organik untuk mendapatkan elastisitas optimal.'
    }
  ];

  return (
    <div className="space-y-20 py-10">
      
      {/* 1. Header & Kisah Kami */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#476B50] uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Sustainable Urban Development Project (SUDP)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-[#294735] leading-tight text-balance">
              Inovasi Bioplastik dari Residu Organik Lokal
            </h1>

            <div className="space-y-4 text-sm text-[#30352F] leading-relaxed">
              <p>
                <strong>BioLiving</strong> lahir sebagai proyek inisiatif mahasiswa dalam kerangka <em>Sustainable Urban Development Project (SUDP)</em>. Proyek ini dilatarbelakangi oleh dua tantangan simultan di kawasan perkotaan: melimpahnya sampah plastik sekali pakai yang mengotori aliran air, serta terbuangnya residu organik bernilai tinggi dari industri olahan hasil bumi.
              </p>
              <p className="text-[#777C73]">
                Melalui eksplorasi laboratorium dan perancangan desain produk, tim BioLiving meneliti potensi pati singkong dan serat kulit singkong lokal sebagai kandidat bahan polimer hayati terurai. Situs web ini dirancang sebagai platform terpadu untuk mendiseminasikan hasil riset sekaligus menguji interaksi e-commerce fungsional di hadapan penguji dan masyarakat.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('shop')}
                className="px-5 py-2.5 bg-[#476B50] hover:bg-[#294735] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Lihat Prototipe Fisik</span>
              </button>

              <button
                onClick={() => navigate('learn')}
                className="px-5 py-2.5 bg-[#F5F1E7] text-[#294735] hover:bg-[#ECE6D8] text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-[#476B50]/20"
              >
                <span>Baca Modul Pembelajaran</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-[#476B50]/20 shadow-lg aspect-4/3 sm:aspect-square bg-[#F5F1E7]">
              <img
                src={HERO_IMAGE}
                alt="Pengembangan material bioplastik BioLiving"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Visi dan Misi */}
      <section className="bg-[#F5F1E7] border-y border-[#476B50]/15 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Visi */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white text-[#476B50] flex items-center justify-center mx-auto shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider block">
              Visi Proyek BioLiving
            </span>
            <blockquote className="text-xl sm:text-2xl font-bold text-[#294735] leading-snug">
              "Mendorong gaya hidup yang lebih berkelanjutan melalui pengembangan produk bioplastik dan edukasi lingkungan yang mudah diakses."
            </blockquote>
          </div>

          {/* Misi */}
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
                Misi Strategis
              </span>
              <h2 className="text-2xl font-bold text-[#294735] mt-1">
                Empat Pilar Aksi BioLiving
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {missions.map((mission, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-[#476B50]/15 flex items-start gap-3 shadow-xs"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#476B50] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#30352F] leading-relaxed">
                    {mission}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Portofolio Produk Prototipe */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
            Eksplorasi Produk
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#294735]">
            Rangkaian Prototipe Fungsional SUDP
          </h2>
          <p className="text-sm text-[#777C73] max-w-2xl leading-relaxed">
            Menunjukkan bahwa bioplastik tidak hanya terbatas pada kantong belanja, melainkan memiliki fleksibilitas bentuk untuk aksesori fungsional dan elemen dekorasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-2xl border border-[#476B50]/15 overflow-hidden p-4 space-y-3 shadow-xs">
            <img src={SHOPPING_BAG_IMAGE} alt="Tas Belanja" className="aspect-4/3 w-full object-cover rounded-xl" />
            <h3 className="font-bold text-sm text-[#294735]">Tas Belanja Bioplastik</h3>
            <p className="text-xs text-[#777C73]">
              Fokus primer proyek untuk mensubstitusi kantong kresek sekali pakai di sektor ritel perkotaan.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#476B50]/15 overflow-hidden p-4 space-y-3 shadow-xs">
            <img src={POUCH_IMAGE} alt="Pouch" className="aspect-4/3 w-full object-cover rounded-xl" />
            <h3 className="font-bold text-sm text-[#294735]">Pouch & Dompet Fungsional</h3>
            <p className="text-xs text-[#777C73]">
              Eksplorasi tekstur semi-leather dari lembaran komposit pati dengan pelindung lilin nabati.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#476B50]/15 overflow-hidden p-4 space-y-3 shadow-xs">
            <img src={ID_HOLDER_IMAGE} alt="ID Card Holder" className="aspect-4/3 w-full object-cover rounded-xl" />
            <h3 className="font-bold text-sm text-[#294735]">Tempat Kartu Identitas (ID Holder)</h3>
            <p className="text-xs text-[#777C73]">
              Aksesori kantor dan kampus tahan benturan yang dicetak dari resin bio-komposit kaku.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#476B50]/15 overflow-hidden p-4 space-y-3 shadow-xs">
            <img src={LAMPSHADE_IMAGE} alt="Kap Lampu" className="aspect-4/3 w-full object-cover rounded-xl" />
            <h3 className="font-bold text-sm text-[#294735]">Kap Lampu Dekoratif Organik</h3>
            <p className="text-xs text-[#777C73]">
              Eksplorasi estetika interior yang memanfaatkan sifat pembiasan cahaya alami material bioplastik.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Tim Pengembang SUDP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
            Kolaborator
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#294735]">
            Tim Bioliving
          </h2>
          <p className="text-sm text-[#777C73] max-w-xl leading-relaxed">
            Kolaborasi lintas disiplin ilmu yang mencakup sains material, perancangan produk, rekayasa perangkat lunak, dan analisis kebijakan lingkungan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-[#476B50]/15 space-y-3 shadow-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5F1E7] text-[#476B50] flex items-center justify-center font-bold text-lg border border-[#476B50]/20">
                🌱
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#294735]">{member.name}</h3>
                <p className="text-xs font-semibold text-[#476B50]">{member.role}</p>
                <p className="text-[11px] text-[#777C73] mt-0.5">{member.division}</p>
              </div>
              <p className="text-xs text-[#777C73] leading-relaxed border-t border-gray-100 pt-2">
                {member.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Academic Disclaimer Note */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-[#294735] text-[#F5F1E7] p-8 rounded-3xl space-y-3 text-center">
          <h3 className="font-bold text-lg text-[#FCFBF7]">
            Visi & Misi
          </h3>
          <p className="text-xs text-[#A8B99A] leading-relaxed max-w-2xl mx-auto">
            BioLiving memiliki visi untuk mendorong gaya hidup berkelanjutan melalui pengembangan produk bioplastik dan edukasi lingkungan yang mudah diakses, dengan misi memanfaatkan limbah organik sebagai bahan baku bioplastik ramah lingkungan, mengembangkan produk pengganti kantong plastik sekali pakai, meningkatkan kesadaran masyarakat terhadap dampak sampah plastik, serta menyediakan platform digital untuk informasi produk dan edukasi lingkungan.
          </p>
        </div>
      </section>

    </div>
  );
};
