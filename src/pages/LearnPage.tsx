import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_ARTICLES } from '../data/initialData';
import { EducationArticle } from '../types';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Share2, 
  Leaf, 
  Search,
  Sparkles 
} from 'lucide-react';

export const LearnPage: React.FC = () => {
  const { routeParams, navigate } = useApp();
  const [searchFilter, setSearchFilter] = useState('');

  // Check if viewing a specific article
  const currentSlug = routeParams.slug;
  const activeArticle = currentSlug
    ? INITIAL_ARTICLES.find((a) => a.slug === currentSlug)
    : null;

  if (activeArticle) {
    return <ArticleReader article={activeArticle} />;
  }

  // Articles list filter
  const filteredArticles = INITIAL_ARTICLES.filter((art) => {
    const q = searchFilter.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="border-b border-[#476B50]/15 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-[#476B50] uppercase tracking-wider flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>Pusat Edukasi & Literasi Berkelanjutan</span>
            </div>
            <h1 className="text-3xl font-bold text-[#294735]">
              Sains Bioplastik & Ekonomi Sirkular
            </h1>
            <p className="text-sm text-[#777C73] max-w-2xl leading-relaxed mt-1">
              Pelajari sains di balik polimer pati nabati, tantangan sampah plastik perkotaan, dan langkah nyata mewujudkan konsumsi bertanggung jawab.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#777C73] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Cari topik modul edukasi..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-[#476B50]/20 focus:outline-hidden focus:border-[#476B50]"
            />
          </div>
        </div>
      </div>

      {/* Featured / Hero Article */}
      {filteredArticles.length > 0 && !searchFilter && (
        <div
          onClick={() => navigate('article-detail', { slug: INITIAL_ARTICLES[0].slug })}
          className="bg-white rounded-3xl border border-[#476B50]/15 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="lg:col-span-6 aspect-16/9 lg:aspect-auto h-full bg-[#F5F1E7] overflow-hidden">
            <img
              src={INITIAL_ARTICLES[0].image}
              alt={INITIAL_ARTICLES[0].title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-6 p-6 sm:p-10 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#777C73]">
              <span className="font-semibold text-[#476B50] uppercase tracking-wider">
                {INITIAL_ARTICLES[0].category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{INITIAL_ARTICLES[0].readTime}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#294735] group-hover:text-[#476B50] transition-colors leading-snug">
              {INITIAL_ARTICLES[0].title}
            </h2>

            <p className="text-sm text-[#777C73] leading-relaxed">
              {INITIAL_ARTICLES[0].excerpt}
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#476B50] group-hover:translate-x-1 transition-transform">
                <span>Baca Artikel Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            onClick={() => navigate('article-detail', { slug: art.slug })}
            className="bg-white rounded-2xl border border-[#476B50]/15 overflow-hidden flex flex-col hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="aspect-16/9 bg-[#F5F1E7] overflow-hidden">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#777C73]">
                  <span className="font-semibold text-[#476B50]">{art.category}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="font-bold text-base text-[#294735] group-hover:text-[#476B50] transition-colors line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-[#777C73] line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#476B50]">
                <span>Baca Artikel</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};

interface ArticleReaderProps {
  article: EducationArticle;
}

const ArticleReader: React.FC<ArticleReaderProps> = ({ article }) => {
  const { navigate, showToast } = useApp();

  const relatedArticles = INITIAL_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan artikel disalin ke papan klip!', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('learn')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#476B50] hover:text-[#294735] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Pusat Edukasi</span>
        </button>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#777C73]">
          <span className="font-semibold text-[#476B50] uppercase tracking-wider">
            {article.category}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
            <button
              onClick={handleCopyLink}
              className="p-1.5 hover:bg-[#F5F1E7] rounded-md transition-colors cursor-pointer text-[#476B50]"
              title="Bagikan Tautan"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-[#294735] leading-tight">
          {article.title}
        </h1>

        <p className="text-base text-[#777C73] leading-relaxed italic border-l-2 border-[#476B50] pl-4">
          {article.excerpt}
        </p>
      </div>

      {/* Featured Header Image */}
      <div className="rounded-2xl overflow-hidden aspect-16/9 bg-[#F5F1E7] border border-[#476B50]/20">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content Body */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#476B50]/15 shadow-xs space-y-8">
        
        {/* Intro */}
        <div className="text-sm sm:text-base text-[#30352F] leading-relaxed">
          {article.content.intro}
        </div>

        {/* Structured Sections */}
        <div className="space-y-8">
          {article.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#294735]">
                {section.heading}
              </h2>
              <div className="space-y-3 text-sm text-[#30352F] leading-relaxed">
                {section.body.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Takeaways Box */}
        <div className="bg-[#F5F1E7] p-6 rounded-2xl border border-[#476B50]/20 space-y-3">
          <h3 className="font-bold text-sm text-[#294735] flex items-center gap-2 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-[#476B50]" />
            <span>Poin Intisari Edukasi</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-[#30352F]">
            {article.content.keyTakeaways.map((takeaway, kIdx) => (
              <li key={kIdx} className="flex items-start gap-2">
                <span className="text-[#476B50] font-bold">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* References */}
        <div className="pt-6 border-t border-gray-100 space-y-2 text-xs text-[#777C73]">
          <h4 className="font-semibold text-[#294735] flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#476B50]" />
            <span>Referensi & Dokumen Terkait:</span>
          </h4>
          <ul className="list-disc list-inside space-y-1 text-[11px]">
            {article.content.references.map((ref, rIdx) => (
              <li key={rIdx}>{ref}</li>
            ))}
          </ul>
        </div>

      </div>

      {/* Related Articles */}
      <div className="pt-8 border-t border-[#476B50]/15 space-y-4">
        <h3 className="text-lg font-bold text-[#294735]">
          Artikel Edukasi Terkait
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => navigate('article-detail', { slug: rel.slug })}
              className="p-4 bg-white rounded-xl border border-[#476B50]/15 hover:shadow-xs cursor-pointer transition-all flex items-center gap-3"
            >
              <img
                src={rel.image}
                alt={rel.title}
                className="w-16 h-16 object-cover rounded-lg shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] text-[#476B50] font-semibold block">{rel.category}</span>
                <p className="font-bold text-xs text-[#294735] line-clamp-1">{rel.title}</p>
                <p className="text-[11px] text-[#777C73] line-clamp-1">{rel.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
