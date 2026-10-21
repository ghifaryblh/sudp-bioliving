import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatIDR } from '../utils/formatters';
import { Order } from '../types';
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  ShieldAlert, 
  ShoppingBag, 
  Clock, 
  ChevronRight, 
  PackageOpen, 
  ArrowRight,
  X
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { currentUser, orders, logout, navigate } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#294735]">Silakan Masuk Terlebih Dahulu</h2>
        <p className="text-xs text-[#777C73]">
          Anda perlu masuk untuk melihat informasi akun dan riwayat pesanan.
        </p>
        <button
          onClick={() => navigate('login')}
          className="px-5 py-2.5 bg-[#476B50] text-white text-xs font-semibold rounded-xl cursor-pointer"
        >
          Masuk ke Akun
        </button>
      </div>
    );
  }

  // Filter orders relevant to this user (or show all demonstration orders for prototype customer)
  const userOrders = orders.filter((o) => {
    if (currentUser.role === 'admin') return true;
    return o.email === currentUser.email || o.userId === currentUser.id;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Account Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#476B50]/15 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F5F1E7] border border-[#476B50]/20 flex items-center justify-center text-[#476B50] text-2xl font-bold shrink-0">
              {currentUser.fullName.charAt(0)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#294735]">
                  {currentUser.fullName}
                </h1>
                <span className="text-[11px] font-semibold bg-[#476B50]/10 text-[#476B50] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-[#777C73] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{currentUser.email}</span>
              </p>
              <p className="text-[11px] text-[#777C73] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Terdaftar sejak: {currentUser.createdAt}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {currentUser.role === 'admin' && (
              <button
                onClick={() => navigate('admin')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#294735] hover:bg-[#476B50] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Buka Dashboard Admin</span>
              </button>
            )}

            <button
              onClick={logout}
              className="px-4 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar (Logout)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Order History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#294735]">
              Riwayat Pesanan Prototipe
            </h2>
            <p className="text-xs text-[#777C73]">
              Daftar seluruh transaksi yang tercatat dalam sesi peramban Anda.
            </p>
          </div>

          <button
            onClick={() => navigate('shop')}
            className="text-xs font-semibold text-[#476B50] hover:text-[#294735] flex items-center gap-1 cursor-pointer"
          >
            <span>+ Belanja Baru</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {userOrders.length > 0 ? (
          <div className="bg-white rounded-2xl border border-[#476B50]/15 divide-y divide-gray-100 shadow-xs overflow-hidden">
            {userOrders.map((ord) => {
              const statusColors: Record<string, string> = {
                'Menunggu Konfirmasi': 'bg-amber-50 text-amber-800 border-amber-200',
                'Diproses': 'bg-blue-50 text-blue-800 border-blue-200',
                'Dikirim': 'bg-purple-50 text-purple-800 border-purple-200',
                'Selesai': 'bg-emerald-50 text-emerald-800 border-emerald-200',
                'Dibatalkan': 'bg-rose-50 text-rose-800 border-rose-200'
              };

              return (
                <div
                  key={ord.id}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F5F1E7]/20 transition-colors"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-[#294735]">
                        {ord.orderReference}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          statusColors[ord.status] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#777C73] tabular-nums">
                      Tanggal: {ord.createdAt} · {ord.items.length} item barang
                    </p>

                    <div className="text-xs text-[#30352F] line-clamp-1">
                      {ord.items.map((it) => `${it.name} (${it.quantity}x)`).join(', ')}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    <span className="font-bold text-base text-[#294735] tabular-nums">
                      {formatIDR(ord.total)}
                    </span>
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#476B50] bg-[#476B50]/10 hover:bg-[#476B50]/20 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Lihat Rincian</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#476B50]/15 p-12 text-center space-y-3">
            <PackageOpen className="w-10 h-10 text-[#476B50] mx-auto opacity-70" />
            <h3 className="font-bold text-base text-[#294735]">Belum Ada Riwayat Pesanan</h3>
            <p className="text-xs text-[#777C73] max-w-sm mx-auto">
              Anda belum melakukan pemesanan simulasi produk bioplastik.
            </p>
            <button
              onClick={() => navigate('shop')}
              className="px-4 py-2 bg-[#476B50] hover:bg-[#294735] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Mulai Belanja Prototipe
            </button>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#476B50]/20 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] text-[#777C73] uppercase tracking-wider block">
                  Rincian Bukti Pesanan
                </span>
                <h3 className="font-mono font-bold text-lg text-[#294735]">
                  {selectedOrder.orderReference}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-[#777C73] hover:text-[#30352F] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status & Date */}
            <div className="flex items-center justify-between bg-[#F5F1E7]/70 p-3 rounded-xl text-xs">
              <div>
                <span className="text-[#777C73]">Waktu Pemesanan: </span>
                <strong className="text-[#294735]">{selectedOrder.createdAt}</strong>
              </div>
              <span className="font-semibold px-2 py-0.5 rounded-md bg-white border border-[#476B50]/20 text-[#294735]">
                {selectedOrder.status}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#294735] uppercase tracking-wider">
                Barang yang Dipesan:
              </h4>
              <div className="space-y-2">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 bg-[#FCFBF7] rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-semibold text-[#294735]">{item.name}</p>
                        <p className="text-[#777C73]">{item.quantity} x {formatIDR(item.price)}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#294735]">
                      {formatIDR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Details */}
            <div className="pt-2 border-t border-gray-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#777C73]">
                <span>Subtotal Produk</span>
                <span>{formatIDR(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#777C73]">
                <span>Biaya Pengiriman ({selectedOrder.shippingMethod})</span>
                <span>{selectedOrder.shippingCost === 0 ? 'GRATIS' : formatIDR(selectedOrder.shippingCost)}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-[#294735]">
                <span>Total Biaya</span>
                <span>{formatIDR(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Destination & Payment */}
            <div className="p-3 bg-[#FCFBF7] rounded-xl border border-gray-100 text-xs space-y-1.5">
              <p><strong>Penerima:</strong> {selectedOrder.customerName} ({selectedOrder.phone})</p>
              <p><strong>Alamat:</strong> {selectedOrder.shippingAddress}, {selectedOrder.city} {selectedOrder.postalCode}</p>
              <p><strong>Metode Pembayaran:</strong> {selectedOrder.paymentMethod}</p>
              {selectedOrder.notes && <p className="italic text-[#476B50]">Catatan: {selectedOrder.notes}</p>}
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 bg-[#476B50] hover:bg-[#294735] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Tutup Rincian
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
