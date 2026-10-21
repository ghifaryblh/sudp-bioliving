import React from 'react';
import { useApp } from '../context/AppContext';
import { HERO_IMAGE, INITIAL_ARTICLES } from '../data/initialData';
import { formatIDR } from '../utils/formatters';
import { 
  ArrowRight, 
  ShoppingBag, 
  Recycle, 
  Lightbulb, 
  Leaf, 
  BookOpen, 
  Eye,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate, products, addToCart } = useApp();

  // Featured 4 products from the core categories
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  // 3 educational articles preview
  const previewArticles = INITIAL_ARTICLES.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Hero Section (2-Column Desktop, Stacked Mobile) */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="text-xs font-semibold text-[#476B50] uppercase tracking-wider flex items-center gap-2">
                <span>Sustainable Urban Development Project (SUDP)</span>
                <span>·</span>
                <span>Inovasi Bioplastik</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#294735] leading-[1.15] text-balance">
                Masa Depan Lebih Baik Dimulai dari Pilihan Kecil.
              </h1>

              <p className="text-lg text-[#777C73] leading-relaxed max-w-2xl">
                Temukan BioLiving, inisiatif tempat limbah organik menginspirasi lahirnya produk bioplastik ramah lingkungan dan pilihan harian Anda membantu membangun kota yang lebih bersih.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('shop')}
                  className="px-6 py-3.5 bg-[#476B50] hover:bg-[#294735] text-white font-medium text-sm rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Jelajahi Produk</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('about')}
                  className="px-6 py-3.5 bg-[#F5F1E7] hover:bg-[#ECE6D8] text-[#294735] font-medium text-sm rounded-xl transition-colors cursor-pointer border border-[#476B50]/20"
                >
                  Pelajari Kisah BioLiving
                </button>
              </div>

              {/* Subtle Trust Indicators */}
              <div className="pt-6 border-t border-[#476B50]/15 grid grid-cols-3 gap-4 text-xs text-[#777C73]">
                <div>
                  <p className="font-bold text-base text-[#294735]">100% Organik</p>
                  <p className="text-[11px]">Resin pati nabati lokal</p>
                </div>
                <div>
                  <p className="font-bold text-base text-[#294735]">Biodegradable</p>
                  <p className="text-[11px]">Terurai hayati di tanah</p>
                </div>
                <div>
                  <p className="font-bold text-base text-[#294735]">Riset SUDP</p>
                  <p className="text-[11px]">Website fungsional</p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#476B50]/20 aspect-4/3 lg:aspect-square bg-[#F5F1E7]">
                <img
                  src={HERO_IMAGE}
                  alt="Prototipe tas belanja bioplastik ramah lingkungan BioLiving berbahan dasar limbah singkong"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating caption card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/90 backdrop-blur-md rounded-xl border border-[#476B50]/20 text-xs shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#294735]">Koleksi Bioliving</p>
                      <p className="text-[#777C73] text-[11px]">Berbasis limbah kulit singkong & pati nabati</p>
                    </div>
                    <span className="text-[#476B50] font-medium text-[11px] underline cursor-pointer" onClick={() => navigate('shop')}>
                      Lihat Katalog
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Products (4 Categories Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
              Koleksi Unggulan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#294735] mt-1">
              Prototipe Produk BioLiving
            </h2>
            <p className="text-sm text-[#777C73] mt-1 max-w-xl">
              Eksplorasi empat kategori produk ramah lingkungan dari olahan limbah organik untuk kebutuhan harian, aksesori, hingga dekorasi interior.
            </p>
          </div>

          <button
            onClick={() => navigate('shop')}
            className="self-start md:self-auto text-sm font-semibold text-[#476B50] hover:text-[#294735] flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>Lihat Semua Produk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-[#476B50]/15 overflow-hidden flex flex-col hover:shadow-md transition-all group"
            >
              {/* Product Image */}
              <div
                className="relative aspect-4/3 bg-[#F5F1E7] overflow-hidden cursor-pointer"
                onClick={() => navigate('product-detail', { id: prod.id })}
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#FCFBF7]/90 backdrop-blur-xs text-[#294735] text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#476B50]/20">
                  {prod.category}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3
                    className="font-bold text-base text-[#294735] hover:text-[#476B50] transition-colors cursor-pointer line-clamp-1"
                    onClick={() => navigate('product-detail', { id: prod.id })}
                  >
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#777C73] line-clamp-2 leading-relaxed">
                    {prod.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#777C73] block">Estimasi Demo</span>
                    <span className="text-base font-bold text-[#294735] tabular-nums">
                      {formatIDR(prod.price)}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#476B50] font-medium">
                    Stok: {prod.stock} unit
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => navigate('product-detail', { id: prod.id })}
                    className="w-full py-2 px-2 text-xs font-medium text-[#294735] bg-[#F5F1E7] hover:bg-[#ECE6D8] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Detail</span>
                  </button>

                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="w-full py-2 px-2 text-xs font-semibold text-white bg-[#476B50] hover:bg-[#294735] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>+ Keranjang</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Introduction to BioLiving & Motivation */}
      <section className="bg-[#F5F1E7] border-y border-[#476B50]/15 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
                Latar Belakang & Motivasi Riset
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#294735]">
                Menjawab Tantangan Sampah Plastik Perkotaan Lewat Sumber Daya Organik
              </h2>
              <p className="text-sm text-[#30352F] leading-relaxed">
                Di kawasan perkotaan, sampah plastik sekali pakai menyumbat sistem saluran air dan membutuhkan ratusan tahun untuk terurai. Sementara itu, sentra industri olahan lokal menghasilkan limpahan limbah padat organik—seperti kulit singkong dan ampas pati—yang belum dimanfaatkan secara optimal.
              </p>
              <p className="text-sm text-[#777C73] leading-relaxed">
                BioLiving memadukan pengembangan material alternatif ramah lingkungan dengan platform edukasi digital terbuka. Kami percaya bahwa transisi menuju kota berkelanjutan memerlukan tersedianya alternatif produk nyata sekaligus literasi masyarakat yang mendalam.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('about')}
                  className="px-5 py-2.5 bg-[#294735] hover:bg-[#476B50] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Pelajari Kisah Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#476B50]/20 space-y-4 shadow-xs">
              <h3 className="font-bold text-[#294735] text-sm">
                Fokus Inovasi Proyek SUDP
              </h3>
              <ul className="space-y-3 text-xs text-[#30352F]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#476B50] shrink-0 mt-0.5" />
                  <span>Substitusi kantong plastik sekali pakai menggunakan pati umbi singkong lokal.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#476B50] shrink-0 mt-0.5" />
                  <span>Pemanfaatan residu kulit singkong sebagai penguat serat alami (bio-reinforcement).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#476B50] shrink-0 mt-0.5" />
                  <span>Platform e-commerce & edukasi terpadu untuk sosialisasi gaya hidup minim sampah.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. How BioLiving Works (3 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
            Alur Konsep Sirkular
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#294735]">
            Bagaimana BioLiving Bekerja
          </h2>
          <p className="text-sm text-[#777C73]">
            Tiga tahapan konseptual yang menghubungkan pemanfaatan limbah organik hingga adopsi di masyarakat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#476B50]/15 space-y-3 relative hover:border-[#476B50]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#F5F1E7] text-[#476B50] flex items-center justify-center font-bold text-base">
              <Recycle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#294735]">
              1. Gunakan Kembali Sumber Daya Organik
            </h3>
            <p className="text-xs text-[#777C73] leading-relaxed">
              Mengeksplorasi potensi limbah organik terpilih—khususnya kulit singkong dan ampas pati olahan—sebagai sumber bahan baku alternatif pengganti resin sintetis fosil.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#476B50]/15 space-y-3 relative hover:border-[#476B50]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#F5F1E7] text-[#476B50] flex items-center justify-center font-bold text-base">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#294735]">
              2. Kembangkan Produk Fungsional
            </h3>
            <p className="text-xs text-[#777C73] leading-relaxed">
              Mengembangkan formulasi prototipe bioplastik dan menjajaki aplikasi aplikatifnya: dari kantong belanja elastis hingga kap lampu dan wadah kartu tahan banting.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#476B50]/15 space-y-3 relative hover:border-[#476B50]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#F5F1E7] text-[#476B50] flex items-center justify-center font-bold text-base">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#294735]">
              3. Dorong Pilihan Berkelanjutan
            </h3>
            <p className="text-xs text-[#777C73] leading-relaxed">
              Memperkenalkan opsi material terbarukan beserta modul edukasi interaktif untuk menumbuhkan kesadaran konsumsi yang bijak dan bertanggung jawab di ruang publik.
            </p>
          </div>

        </div>

        <p className="text-center text-xs text-[#777C73] mt-6 italic">
          *Catatan Konseptual: Alur di atas merupakan kerangka konseptual proyek SUDP.
        </p>
      </section>

      {/* 5. Environmental Education Preview (3 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
              Literasi Lingkungan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#294735] mt-1">
              Artikel & Wawasan Bioplastik
            </h2>
            <p className="text-sm text-[#777C73] mt-1 max-w-xl">
              Tingkatkan pemahaman Anda tentang sains material hayati, isu polusi mikroplastik, dan ekonomi sirkular.
            </p>
          </div>

          <button
            onClick={() => navigate('learn')}
            className="self-start md:self-auto text-sm font-semibold text-[#476B50] hover:text-[#294735] flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <BookOpen className="w-4 h-4" />
            <span>Kunjungi Pusat Edukasi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl border border-[#476B50]/15 overflow-hidden flex flex-col hover:shadow-md transition-all cursor-pointer group"
              onClick={() => navigate('article-detail', { slug: art.slug })}
            >
              <div className="aspect-16/9 bg-[#F5F1E7] overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#777C73]">
                    <span className="font-semibold text-[#476B50]">{art.category}</span>
                    <span>·</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-bold text-base text-[#294735] group-hover:text-[#476B50] transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#777C73] line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-2 text-xs font-semibold text-[#476B50] flex items-center gap-1">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Sustainability and SDGs */}
      <section className="bg-[#294735] text-[#F5F1E7] py-16 rounded-3xl max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-3xl mb-10 space-y-2">
          <span className="text-xs font-semibold text-[#A8B99A] uppercase tracking-wider">
            Relevansi Pembangunan Berkelanjutan
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FCFBF7]">
            BioLiving & Sustainable Development Goals (SDGs)
          </h2>
          <p className="text-sm text-[#A8B99A] leading-relaxed">
            Inisiatif ini dirancang dengan menautkan eksplorasi sains material organik pada empat target Tujuan Pembangunan Berkelanjutan PBB secara terukur dan bertanggung jawab.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* SDG 12 */}
          <div className="bg-[#476B50]/30 border border-[#A8B99A]/20 p-5 rounded-xl space-y-2">
            <span className="text-xl font-black text-[#A8B99A]">SDG 12</span>
            <h3 className="font-bold text-sm text-[#FCFBF7]">
              Konsumsi & Produksi Bertanggung Jawab
            </h3>
            <p className="text-xs text-[#F5F1E7]/80 leading-relaxed">
              Mendorong pergeseran dari budaya buang cepat ke pemanfaatan kembali limbah hayati sebagai input produksi barang guna pakai.
            </p>
          </div>

          {/* SDG 13 */}
          <div className="bg-[#476B50]/30 border border-[#A8B99A]/20 p-5 rounded-xl space-y-2">
            <span className="text-xl font-black text-[#A8B99A]">SDG 13</span>
            <h3 className="font-bold text-sm text-[#FCFBF7]">
              Penanganan Perubahan Iklim
            </h3>
            <p className="text-xs text-[#F5F1E7]/80 leading-relaxed">
              Mengeksplorasi bahan baku bio-based yang menyerap karbon selama fase fotosintesis tanaman dan berpotensi jejak karbon lebih rendah.
            </p>
          </div>

          {/* SDG 14 */}
          <div className="bg-[#476B50]/30 border border-[#A8B99A]/20 p-5 rounded-xl space-y-2">
            <span className="text-xl font-black text-[#A8B99A]">SDG 14</span>
            <h3 className="font-bold text-sm text-[#FCFBF7]">
              Ekosistem Lautan
            </h3>
            <p className="text-xs text-[#F5F1E7]/80 leading-relaxed">
              Mengurangi kebocoran kantong plastik konvensional ke sungai dan laut perkotaan yang berisiko menjadi mikroplastik bagi biota perairan.
            </p>
          </div>

          {/* SDG 15 */}
          <div className="bg-[#476B50]/30 border border-[#A8B99A]/20 p-5 rounded-xl space-y-2">
            <span className="text-xl font-black text-[#A8B99A]">SDG 15</span>
            <h3 className="font-bold text-sm text-[#FCFBF7]">
              Ekosistem Daratan
            </h3>
            <p className="text-xs text-[#F5F1E7]/80 leading-relaxed">
              Meminimalisasi akumulasi sampah tak terurai di Tempat Pemrosesan Akhir (TPA) dan memulihkan kesehatan mikrobioma tanah.
            </p>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-[#A8B99A]/20 flex items-center justify-between flex-wrap gap-4 text-xs text-[#A8B99A]">
          <p>
            *Didasarkan pada target kerangka indikator SDGs 2030 tanpa memanipulasi klaim angka dampak sebelum uji coba empiris skala penuh.
          </p>
          <button
            onClick={() => navigate('learn')}
            className="text-white hover:text-[#A8B99A] font-medium flex items-center gap-1 underline underline-offset-4 cursor-pointer"
          >
            <span>Pelajari Kerangka Lengkap di Modul Edukasi</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
            Mulai dari Langkah Nyata
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#294735]">
            Jadilah Bagian dari Gerakan BioLiving
          </h2>
          <p className="text-sm text-[#777C73] max-w-xl mx-auto leading-relaxed">
            Dukung inisiatif penelitian produk bioplastik ramah lingkungan berbasis limbah organik lokal. Perluas wawasan lingkungan Anda hari ini.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate('shop')}
            className="px-6 py-3 bg-[#476B50] hover:bg-[#294735] text-white font-medium text-sm rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Belanja Prototipe Produk
          </button>
          <button
            onClick={() => navigate('learn')}
            className="px-6 py-3 bg-[#F5F1E7] hover:bg-[#ECE6D8] text-[#294735] font-medium text-sm rounded-xl transition-colors border border-[#476B50]/20 cursor-pointer"
          >
            Jelajahi Modul Edukasi
          </button>
        </div>
      </section>

    </div>
  );
};
