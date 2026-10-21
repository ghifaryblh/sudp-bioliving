import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatIDR } from '../utils/formatters';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Leaf, 
  Layers, 
  ShieldCheck,
  Eye
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { routeParams, products, addToCart, navigate } = useApp();
  const [quantity, setQuantity] = useState(1);

  const productId = routeParams.id;
  const product = products.find((p) => p.id === productId) || products[0];

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#294735]">Produk tidak ditemukan</h2>
        <button
          onClick={() => navigate('shop')}
          className="px-4 py-2 bg-[#476B50] text-white rounded-lg text-sm"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3);

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = (): boolean => {
    const success = addToCart(product, quantity);
    if (success) {
      setQuantity(1);
    }
    return success;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#476B50] hover:text-[#294735] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Produk</span>
        </button>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Product Imagery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-[#476B50]/20 aspect-4/3 sm:aspect-square bg-[#F5F1E7] relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#294735] text-xs font-semibold px-3 py-1 rounded-lg border border-[#476B50]/20">
              {product.category}
            </span>
            <span
              className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-lg ${
                isOutOfStock
                  ? 'bg-rose-100 text-rose-700'
                  : product.stock <= 10
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {isOutOfStock ? 'Stok Habis' : `Status: ${product.availability}`}
            </span>
          </div>

          <div className="p-3 bg-[#F5F1E7]/70 rounded-xl border border-[#476B50]/15 text-[11px] text-[#777C73] leading-relaxed">
            <p>
              <strong className="text-[#294735]">Keaslian Visual:</strong> Foto yang ditampilkan merepresentasikan visualisasi terkurasi dari bentuk material dan desain fisik prototipe bioplastik yang dikembangkan tim SUDP.
            </p>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
              {product.category} · BioLiving SUDP
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#294735] leading-tight">
              {product.name}
            </h1>
            
            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-bold text-[#294735] tabular-nums">
                {formatIDR(product.price)}
              </span>
              <span className="text-xs text-[#777C73]">
                / unit (Simulasi SUDP)
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 border-y border-[#476B50]/15 py-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#777C73]">
              Deskripsi Prototipe
            </h3>
            <p className="text-sm text-[#30352F] leading-relaxed">
              {product.fullDescription}
            </p>
          </div>

          {/* Material & Intended Application Info */}
          <div className="bg-white p-4 rounded-xl border border-[#476B50]/15 space-y-3">
            <h3 className="text-xs font-bold text-[#294735] flex items-center gap-1.5 uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-[#476B50]" />
              <span>Komposisi Material & Aplikasi</span>
            </h3>
            <p className="text-xs text-[#30352F] leading-relaxed">
              {product.materialInfo}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
              <div>
                <span className="text-[#777C73] block text-[11px]">Material Dasar</span>
                <span className="font-semibold text-[#294735]">{product.specs.material}</span>
              </div>
              <div>
                <span className="text-[#777C73] block text-[11px]">Rekomendasi Penggunaan</span>
                <span className="font-semibold text-[#294735]">{product.specs.intendedUse}</span>
              </div>
              {product.specs.dimensions && (
                <div>
                  <span className="text-[#777C73] block text-[11px]">Dimensi Produk</span>
                  <span className="font-semibold text-[#294735]">{product.specs.dimensions}</span>
                </div>
              )}
              {product.specs.shelfLifeEstimate && (
                <div>
                  <span className="text-[#777C73] block text-[11px]">Estimasi Masa Simpan</span>
                  <span className="font-semibold text-[#294735]">{product.specs.shelfLifeEstimate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Purchase Actions (Quantity Stepper + Add to Cart) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#476B50]/30 rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="px-3.5 py-2.5 text-[#30352F] hover:bg-[#F5F1E7] transition-colors disabled:opacity-40 cursor-pointer"
                  aria-label="Kurangi jumlah"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm font-bold text-[#294735] tabular-nums min-w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={quantity >= product.stock || isOutOfStock}
                  className="px-3.5 py-2.5 text-[#30352F] hover:bg-[#F5F1E7] transition-colors disabled:opacity-40 cursor-pointer"
                  aria-label="Tambah jumlah"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-[#777C73]">
                <span>Tersisa </span>
                <span className="font-bold text-[#294735] tabular-nums">{product.stock} unit</span>
                <span> di inventaris demo</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-3.5 px-6 font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                  isOutOfStock
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#476B50] hover:bg-[#294735] text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isOutOfStock ? 'Stok Habis' : 'Tambah ke Keranjang'}</span>
              </button>

              <button
                onClick={() => {
                  if (handleAddToCart()) {
                    navigate('cart');
                  }
                }}
                disabled={isOutOfStock}
                className={`py-3.5 px-6 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#476B50]/30 ${
                  isOutOfStock
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#F5F1E7] hover:bg-[#ECE6D8] text-[#294735]'
                }`}
              >
                <span>Beli & Lanjut Checkout</span>
              </button>
            </div>
          </div>

          {/* Academic Disclaimer Box */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Transparansi Riset SUDP</span>
            </p>
            <p className="text-[11px] leading-relaxed">
              Spesifikasi mekanis, daya tahan, dan laju biodegradasi pada lembar produk ini merupakan estimasi terindikasi awal prototipe. Data uji laboratorium lanjutan masih berlangsung dalam penelitian berkala.
            </p>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#476B50]/15 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#294735]">
              Produk Prototipe Terkait
            </h2>
            <button
              onClick={() => navigate('shop')}
              className="text-xs font-semibold text-[#476B50] hover:underline cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-xl border border-[#476B50]/15 overflow-hidden flex flex-col hover:shadow-sm transition-all group"
              >
                <div
                  className="aspect-4/3 bg-[#F5F1E7] overflow-hidden cursor-pointer"
                  onClick={() => navigate('product-detail', { id: rel.id })}
                >
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#777C73] uppercase tracking-wider block">
                      {rel.category}
                    </span>
                    <h3
                      className="font-bold text-sm text-[#294735] hover:text-[#476B50] cursor-pointer line-clamp-1"
                      onClick={() => navigate('product-detail', { id: rel.id })}
                    >
                      {rel.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="font-bold text-sm text-[#294735] tabular-nums">
                      {formatIDR(rel.price)}
                    </span>
                    <button
                      onClick={() => navigate('product-detail', { id: rel.id })}
                      className="text-xs font-semibold text-[#476B50] hover:text-[#294735] flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
