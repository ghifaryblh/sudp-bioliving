import React from 'react';
import { useApp } from '../context/AppContext';
import { formatIDR } from '../utils/formatters';
import { 
  CheckCircle, 
  ShoppingBag, 
  Clock, 
  ArrowRight, 
  User, 
  MapPin, 
  CreditCard, 
  FileText 
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { routeParams, orders, navigate } = useApp();
  const orderRef = routeParams.orderRef;

  const order = orders.find((o) => o.orderReference === orderRef) || orders[0];

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#294735]">Pesanan Tidak Ditemukan</h2>
        <button
          onClick={() => navigate('home')}
          className="px-4 py-2 bg-[#476B50] text-white rounded-lg text-xs"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Success Card Header */}
      <div className="bg-white p-8 rounded-3xl border border-[#476B50]/20 shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
            Alur Pemesanan Prototipe Selesai
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#294735]">
            Pesanan Berhasil Dicatat!
          </h1>
          <p className="text-sm text-[#777C73] max-w-md mx-auto leading-relaxed">
            Terima kasih telah berpartisipasi dalam demonstrasi e-commerce berkelanjutan BioLiving SUDP.
          </p>
        </div>

        {/* Reference & Status */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <div className="bg-[#F5F1E7] px-4 py-2 rounded-xl border border-[#476B50]/20 text-xs font-mono">
            <span className="text-[#777C73]">No. Referensi: </span>
            <strong className="text-[#294735]">{order.orderReference}</strong>
          </div>

          <div className="bg-amber-50 text-amber-800 px-3 py-2 rounded-xl border border-amber-200 text-xs font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Status: {order.status}</span>
          </div>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="bg-white rounded-2xl border border-[#476B50]/15 p-6 shadow-xs space-y-6">
        
        {/* Purchased Items */}
        <div className="space-y-3">
          <h2 className="font-bold text-sm text-[#294735] uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#476B50]" />
            <span>Rincian Barang Prototipe</span>
          </h2>

          <div className="divide-y divide-gray-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-[#F5F1E7] overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#294735] truncate">{item.name}</p>
                    <p className="text-[#777C73] tabular-nums">
                      {item.quantity} x {formatIDR(item.price)}
                    </p>
                  </div>
                </div>

                <span className="font-bold text-[#294735] tabular-nums shrink-0">
                  {formatIDR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Summary */}
        <div className="bg-[#FCFBF7] p-4 rounded-xl border border-[#476B50]/15 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[#777C73]">
            <span>Subtotal Produk</span>
            <span className="font-semibold text-[#294735] tabular-nums">
              {formatIDR(order.subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between text-[#777C73]">
            <span>Biaya Pengiriman ({order.shippingMethod})</span>
            <span className="font-semibold text-[#294735] tabular-nums">
              {order.shippingCost === 0 ? 'GRATIS' : formatIDR(order.shippingCost)}
            </span>
          </div>
          <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-sm font-bold text-[#294735]">
            <span>Total Pembayaran (Simulasi)</span>
            <span className="text-base tabular-nums">{formatIDR(order.total)}</span>
          </div>
        </div>

        {/* Customer & Shipping Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#F5F1E7]/50 border border-[#476B50]/15 space-y-2">
            <h3 className="font-bold text-[#294735] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <User className="w-3.5 h-3.5 text-[#476B50]" />
              <span>Penerima & Kontak</span>
            </h3>
            <p className="font-semibold text-[#30352F]">{order.customerName}</p>
            <p className="text-[#777C73]">{order.email}</p>
            <p className="text-[#777C73]">{order.phone}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#F5F1E7]/50 border border-[#476B50]/15 space-y-2">
            <h3 className="font-bold text-[#294735] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-[#476B50]" />
              <span>Alamat Pengiriman</span>
            </h3>
            <p className="text-[#30352F] leading-snug">{order.shippingAddress}</p>
            <p className="text-[#777C73]">{order.city}, {order.postalCode}</p>
            {order.notes && (
              <p className="text-[11px] text-[#476B50] italic">Catatan: "{order.notes}"</p>
            )}
          </div>
        </div>

        {/* Payment info */}
        <div className="p-4 rounded-xl bg-[#F5F1E7]/50 border border-[#476B50]/15 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#476B50]" />
            <div>
              <span className="text-[#777C73] block text-[11px]">Metode Pembayaran Dipilih:</span>
              <strong className="text-[#294735]">{order.paymentMethod}</strong>
            </div>
          </div>
          <span className="text-[11px] text-[#476B50] font-semibold bg-[#476B50]/10 px-2.5 py-1 rounded-md">
            Simulasi SUDP
          </span>
        </div>

      </div>

      {/* Navigation Options */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={() => navigate('account')}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#F5F1E7] hover:bg-[#ECE6D8] text-[#294735] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#476B50]/20"
        >
          <FileText className="w-4 h-4" />
          <span>Lihat di Riwayat Pesanan Akun</span>
        </button>

        <button
          onClick={() => navigate('shop')}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#476B50] hover:bg-[#294735] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Lanjut Belanja Prototipe</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
