import React from 'react';
import { useApp } from '../context/AppContext';
import { formatIDR } from '../utils/formatters';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Truck
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartTotalItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    navigate 
  } = useApp();

  // Free shipping threshold: Rp 100.000
  const freeShippingThreshold = 100000;
  const estimatedShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 15000;
  const grandTotal = cartSubtotal + estimatedShipping;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#F5F1E7] text-[#476B50] flex items-center justify-center mx-auto shadow-xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#294735]">
            Keranjang Belanja Masih Kosong
          </h1>
          <p className="text-sm text-[#777C73] max-w-md mx-auto leading-relaxed">
            Anda belum menambahkan prototipe produk bioplastik ke dalam keranjang. Silakan jelajahi katalog untuk menemukan produk ramah lingkungan.
          </p>
        </div>

        <button
          onClick={() => navigate('shop')}
          className="px-6 py-3 bg-[#476B50] hover:bg-[#294735] text-white font-medium text-sm rounded-xl transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Mulai Belanja Sekarang</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#476B50]/15 pb-6">
        <div>
          <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
            Simulasi E-Commerce SUDP
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#294735] mt-1">
            Keranjang Belanja ({cartTotalItems} item)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Kosongkan Seluruh Keranjang</span>
        </button>
      </div>

      {/* Main Grid: Items List + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Free Shipping Alert Bar */}
          <div className="p-4 bg-[#F5F1E7] rounded-xl border border-[#476B50]/20 flex items-center gap-3 text-xs">
            <Truck className="w-5 h-5 text-[#476B50] shrink-0" />
            <div className="flex-1">
              {amountToFreeShipping > 0 ? (
                <p className="text-[#30352F]">
                  Tambah <span className="font-bold text-[#294735] tabular-nums">{formatIDR(amountToFreeShipping)}</span> lagi untuk mendapatkan <strong>Bebas Ongkir Simulasi</strong>!
                </p>
              ) : (
                <p className="font-semibold text-[#294735]">
                  🎉 Selamat! Pesanan Anda memenuhi syarat Bebas Ongkir Simulasi.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#476B50]/15 divide-y divide-gray-100 shadow-xs overflow-hidden">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                
                {/* Thumbnail */}
                <div 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#F5F1E7] overflow-hidden shrink-0 cursor-pointer border border-[#476B50]/15"
                  onClick={() => navigate('product-detail', { id: product.id })}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] text-[#777C73] uppercase tracking-wider block">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => navigate('product-detail', { id: product.id })}
                    className="font-bold text-base text-[#294735] hover:text-[#476B50] cursor-pointer truncate"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#777C73] tabular-nums">
                    Harga Satuan: {formatIDR(product.price)}
                  </p>
                  <p className="text-[11px] text-[#476B50]">
                    Stok Tersedia: {product.stock} unit
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                  <div className="flex items-center border border-[#476B50]/30 rounded-lg bg-[#FCFBF7] overflow-hidden">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 text-[#30352F] hover:bg-[#F5F1E7] transition-colors cursor-pointer"
                      title="Kurangi"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-[#294735] tabular-nums min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="p-1.5 text-[#30352F] hover:bg-[#F5F1E7] transition-colors disabled:opacity-40 cursor-pointer"
                      title="Tambah"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal per item */}
                  <div className="text-right">
                    <span className="font-bold text-sm text-[#294735] tabular-nums block">
                      {formatIDR(product.price * quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-[11px] text-rose-600 hover:text-rose-700 hover:underline cursor-pointer inline-flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('shop')}
              className="text-xs font-semibold text-[#476B50] hover:text-[#294735] flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Lanjut Pilih Produk Lain</span>
            </button>
          </div>

        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-[#476B50]/15 p-6 shadow-xs space-y-5">
            <h2 className="font-bold text-lg text-[#294735] border-b border-gray-100 pb-3">
              Ringkasan Belanja
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-[#777C73]">
                <span>Total Harga ({cartTotalItems} barang)</span>
                <span className="font-semibold text-[#294735] tabular-nums">
                  {formatIDR(cartSubtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#777C73]">
                <span>Estimasi Ongkos Kirim</span>
                <span className="font-semibold text-[#294735] tabular-nums">
                  {estimatedShipping === 0 ? (
                    <span className="text-emerald-700 font-bold">GRATIS</span>
                  ) : (
                    formatIDR(estimatedShipping)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-base">
                <span className="font-bold text-[#294735]">Total Tagihan</span>
                <span className="font-bold text-xl text-[#294735] tabular-nums">
                  {formatIDR(grandTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('checkout')}
              className="w-full py-3.5 px-4 bg-[#476B50] hover:bg-[#294735] text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Formulir Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 bg-[#F5F1E7]/80 rounded-xl text-[11px] text-[#777C73] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#294735]">
                <ShieldCheck className="w-4 h-4 text-[#476B50]" />
                <span>Simulasi Transaksi SUDP</span>
              </div>
              <p>
                Tidak ada pembayaran uang asli yang diproses. Formulir checkout disimulasikan untuk pengujian alur pengguna dan administrasi toko.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
