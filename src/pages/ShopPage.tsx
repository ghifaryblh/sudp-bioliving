import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCategory, Product } from '../types';
import { formatIDR } from '../utils/formatters';
import { Search, ShoppingBag, Eye, SlidersHorizontal, ArrowUpDown, PackageOpen } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, addToCart, navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('featured');

  const categories: Array<{ id: string; label: string; cat?: ProductCategory }> = [
    { id: 'All', label: 'Semua Produk' },
    { id: 'Shopping Bags', label: 'Tas Belanja', cat: 'Shopping Bags' },
    { id: 'Pouches and Handbags', label: 'Pouch & Dompet', cat: 'Pouches and Handbags' },
    { id: 'Accessories', label: 'Aksesori & ID Holder', cat: 'Accessories' },
    { id: 'Home Decor', label: 'Dekorasi & Lampu', cat: 'Home Decor' }
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.materialInfo.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Description */}
      <div className="border-b border-[#476B50]/15 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
              Katalog Prototipe SUDP
            </div>
            <h1 className="text-3xl font-bold text-[#294735] mt-1">
              Katalog Produk Bioplastik BioLiving
            </h1>
            <p className="text-sm text-[#777C73] mt-2 max-w-2xl leading-relaxed">
              Jelajahi inovasi produk fungsional berbahan bioplastik berbasis pati singkong dan serat alami. Seluruh produk dirancang untuk meminimalkan jejak polusi plastik di lingkungan perkotaan.
            </p>
          </div>

          <div className="text-xs text-[#777C73] bg-[#F5F1E7] px-3.5 py-2 rounded-lg border border-[#476B50]/15 shrink-0 self-start md:self-auto">
            <span>Menampilkan </span>
            <span className="font-bold text-[#294735] tabular-nums">{filteredProducts.length}</span>
            <span> dari {products.length}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#476B50]/15 shadow-xs space-y-4">
        
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#777C73] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk (contoh: singkong, pouch, kap lampu, ID)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#FCFBF7] rounded-xl border border-[#476B50]/20 focus:outline-hidden focus:border-[#476B50] focus:ring-1 focus:ring-[#476B50] placeholder-[#777C73]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#777C73] hover:text-[#30352F]"
              >
                Reset
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-[#476B50] shrink-0" />
            <span className="text-xs text-[#777C73] hidden md:inline">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs font-medium bg-[#FCFBF7] rounded-xl border border-[#476B50]/20 focus:outline-hidden focus:border-[#476B50] text-[#30352F] cursor-pointer"
            >
              <option value="featured">Paling Direkomendasikan</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
              <option value="name-asc">Nama: A ke Z</option>
              <option value="name-desc">Nama: Z ke A</option>
            </select>
          </div>

        </div>

        {/* Row 2: Category Tabs (Functional buttons as per frontend skill) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-gray-100">
          <span className="text-xs text-[#777C73] font-medium mr-2 shrink-0 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#476B50]" />
            <span>Kategori:</span>
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#476B50] text-white shadow-xs'
                    : 'bg-[#F5F1E7] text-[#30352F] hover:bg-[#ECE6D8]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={() => navigate('product-detail', { id: product.id })}
              onAddToCart={() => addToCart(product, 1)}
            />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="bg-white rounded-2xl border border-[#476B50]/15 p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F5F1E7] text-[#476B50] flex items-center justify-center mx-auto">
            <PackageOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#294735]">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-xs text-[#777C73] leading-relaxed">
              Tidak ada produk yang cocok dengan pencarian "{searchQuery}" pada kategori terpilih.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#476B50] hover:bg-[#294735] rounded-lg transition-colors cursor-pointer"
          >
            Hapus Semua Filter Pencarian
          </button>
        </div>
      )}

      {/* Academic Prototype Footnote */}
      <div className="p-4 bg-[#F5F1E7]/70 rounded-xl border border-[#476B50]/15 text-xs text-[#777C73] flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          <span className="font-semibold text-[#294735]">Catatan Pengujian:</span> Seluruh harga produk dicantumkan dalam Rupiah (IDR) untuk keperluan demonstrasi fungsional e-commerce SUDP.
        </p>
        <span className="shrink-0 text-[11px] text-[#476B50] font-medium">Bioliving Team</span>
      </div>

    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onView: () => void;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView, onAddToCart }) => {
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="bg-white rounded-2xl border border-[#476B50]/15 overflow-hidden flex flex-col hover:shadow-md transition-all group">
      
      {/* Product Image */}
      <div
        onClick={onView}
        className="relative aspect-4/3 bg-[#F5F1E7] overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Category tag */}
        <span className="absolute top-3 left-3 bg-[#FCFBF7]/90 backdrop-blur-xs text-[#294735] text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#476B50]/20">
          {product.category}
        </span>

        {/* Availability tag */}
        <span
          className={`absolute top-3 right-3 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
            isOutOfStock
              ? 'bg-rose-100 text-rose-700'
              : product.stock <= 10
              ? 'bg-amber-100 text-amber-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {isOutOfStock ? 'Habis' : product.availability}
        </span>
      </div>

      {/* Info & Price */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h3
            onClick={onView}
            className="font-bold text-base text-[#294735] hover:text-[#476B50] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#777C73] line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Stock info */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#777C73] block">Harga Prototipe</span>
            <span className="text-lg font-bold text-[#294735] tabular-nums">
              {formatIDR(product.price)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-[#777C73] block">Tersedia</span>
            <span className="text-xs font-semibold text-[#476B50] tabular-nums">
              {product.stock} unit
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onView}
            className="w-full py-2 px-3 text-xs font-medium text-[#294735] bg-[#F5F1E7] hover:bg-[#ECE6D8] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Detail</span>
          </button>

          <button
            onClick={onAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
              isOutOfStock
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#476B50] hover:bg-[#294735]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Habis' : '+ Keranjang'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
