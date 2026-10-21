import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatIDR } from '../utils/formatters';
import { PaymentMethod } from '../types';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartTotalItems, 
    currentUser, 
    createOrder, 
    navigate,
    showToast 
  } = useApp();

  // Form State
  const [customerName, setCustomerName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('081234567890');
  const [shippingAddress, setShippingAddress] = useState('Jl. Ir. H. Juanda No. 120');
  const [city, setCity] = useState('Bandung');
  const [postalCode, setPostalCode] = useState('40132');
  const [notes, setNotes] = useState('');
  
  // Shipping Method
  const isFreeShippingEligible = cartSubtotal >= 100000;
  const [shippingMethod, setShippingMethod] = useState<'reguler' | 'express'>('reguler');
  
  const shippingCost = shippingMethod === 'reguler'
    ? (isFreeShippingEligible ? 0 : 15000)
    : 25000;

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Transfer Bank Manual (Simulasi)');

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#294735]">Keranjang belanja kosong</h2>
        <p className="text-xs text-[#777C73]">
          Silakan tambahkan produk terlebih dahulu sebelum melakukan checkout.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="px-4 py-2 bg-[#476B50] text-white rounded-lg text-xs font-semibold"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const grandTotal = cartSubtotal + shippingCost;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.customerName = 'Nama penerima wajib diisi';
    if (!email.trim()) {
      errs.email = 'Alamat email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Format email tidak valid';
    }
    if (!phone.trim()) {
      errs.phone = 'Nomor telepon/WhatsApp wajib diisi';
    } else if (phone.trim().length < 8) {
      errs.phone = 'Nomor telepon minimal 8 digit';
    }
    if (!shippingAddress.trim()) errs.shippingAddress = 'Alamat pengiriman lengkap wajib diisi';
    if (!city.trim()) errs.city = 'Kota tujuan wajib diisi';
    if (!postalCode.trim()) errs.postalCode = 'Kode pos wajib diisi';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Mohon lengkapi semua data formulir pengiriman yang diperlukan.', 'error');
      return;
    }

    setIsSubmitting(true);

    const shippingLabel = shippingMethod === 'reguler'
      ? (isFreeShippingEligible ? 'Reguler Eco-Courier (Gratis Promo SUDP)' : 'Reguler Eco-Courier (2-3 Hari)')
      : 'Express Urban 1 Hari';

    const order = createOrder({
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      shippingAddress: shippingAddress.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      notes: notes.trim(),
      shippingMethod: shippingLabel,
      shippingCost,
      paymentMethod
    });

    if (order) {
      navigate('order-confirmation', { orderRef: order.orderReference });
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('cart')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#476B50] hover:text-[#294735] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Keranjang Belanja</span>
        </button>
      </div>

      <div className="border-b border-[#476B50]/15 pb-4">
        <span className="text-xs font-semibold text-[#476B50] uppercase tracking-wider">
          Simulasi Pemesanan Prototipe SUDP
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#294735] mt-1">
          Formulir Pengiriman & Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Customer Details */}
          <div className="bg-white p-6 rounded-2xl border border-[#476B50]/15 space-y-4 shadow-xs">
            <h2 className="font-bold text-base text-[#294735] border-b border-gray-100 pb-2">
              1. Informasi Penerima & Kontak
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#30352F]">
                  Nama Lengkap Penerima <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Budi Pratama"
                  className={`w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border focus:outline-hidden ${
                    errors.customerName ? 'border-rose-400' : 'border-[#476B50]/20'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-[11px] text-rose-500">{errors.customerName}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#30352F]">
                  Nomor Telepon / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className={`w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border focus:outline-hidden ${
                    errors.phone ? 'border-rose-400' : 'border-[#476B50]/20'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-500">{errors.phone}</p>
                )}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#30352F]">
                  Alamat Email (untuk konfirmasi pesanan) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Contoh: budi@gmail.com"
                  className={`w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border focus:outline-hidden ${
                    errors.email ? 'border-rose-400' : 'border-[#476B50]/20'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-500">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div className="bg-white p-6 rounded-2xl border border-[#476B50]/15 space-y-4 shadow-xs">
            <h2 className="font-bold text-base text-[#294735] border-b border-gray-100 pb-2">
              2. Alamat Tujuan Pengiriman
            </h2>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#30352F]">
                  Alamat Lengkap (Jalan, No. Rumah, RT/RW, Patokan) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Contoh: Jl. Ir. H. Juanda No. 120, Dago"
                  className={`w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border focus:outline-hidden ${
                    errors.shippingAddress ? 'border-rose-400' : 'border-[#476B50]/20'
                  }`}
                />
                {errors.shippingAddress && (
                  <p className="text-[11px] text-rose-500">{errors.shippingAddress}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#30352F]">
                    Kota / Kabupaten <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Contoh: Bandung"
                    className={`w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border focus:outline-hidden ${
                      errors.city ? 'border-rose-400' : 'border-[#476B50]/20'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-[11px] text-rose-500">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#30352F]">
                    Kode Pos <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Contoh: 40132"
                    className={`w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border focus:outline-hidden ${
                      errors.postalCode ? 'border-rose-400' : 'border-[#476B50]/20'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-[11px] text-rose-500">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#30352F]">
                  Catatan Tambahan untuk Kurir (Opsional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Mohon kemas dengan packaging kertas daur ulang"
                  className="w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Shipping Method */}
          <div className="bg-white p-6 rounded-2xl border border-[#476B50]/15 space-y-4 shadow-xs">
            <h2 className="font-bold text-base text-[#294735] border-b border-gray-100 pb-2 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#476B50]" />
              <span>3. Metode Pengiriman Simulasi</span>
            </h2>

            <div className="space-y-2">
              {/* Option A: Reguler */}
              <label
                onClick={() => setShippingMethod('reguler')}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  shippingMethod === 'reguler'
                    ? 'border-[#476B50] bg-[#476B50]/5'
                    : 'border-gray-200 hover:bg-[#F5F1E7]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'reguler'}
                    onChange={() => setShippingMethod('reguler')}
                    className="accent-[#476B50]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#294735]">
                      Reguler Eco-Courier (2-3 Hari)
                    </p>
                    <p className="text-[11px] text-[#777C73]">
                      Pengiriman darat emisi rendah dengan kemasan kardus daur ulang
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#294735] tabular-nums">
                  {isFreeShippingEligible ? (
                    <span className="text-emerald-700 font-bold">GRATIS</span>
                  ) : (
                    'Rp 15.000'
                  )}
                </span>
              </label>

              {/* Option B: Express */}
              <label
                onClick={() => setShippingMethod('express')}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  shippingMethod === 'express'
                    ? 'border-[#476B50] bg-[#476B50]/5'
                    : 'border-gray-200 hover:bg-[#F5F1E7]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="accent-[#476B50]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#294735]">
                      Express Urban 1 Hari
                    </p>
                    <p className="text-[11px] text-[#777C73]">
                      Pengantaran cepat prioritas kurir listrik perkotaan
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#294735] tabular-nums">
                  Rp 25.000
                </span>
              </label>
            </div>
          </div>

          {/* Section 4: Payment Simulation */}
          <div className="bg-white p-6 rounded-2xl border border-[#476B50]/15 space-y-4 shadow-xs">
            <h2 className="font-bold text-base text-[#294735] border-b border-gray-100 pb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#476B50]" />
              <span>4. Metode Pembayaran Demonstrasi</span>
            </h2>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Simulasi Prototipe Akademik:</strong> Tidak memproses uang asli dan tidak meminta nomor kartu debit/kredit atau PIN rahasia. Pilih salah satu opsi simulasi untuk menyelesaikan alur pemesanan.
              </p>
            </div>

            <div className="space-y-2">
              <label
                onClick={() => setPaymentMethod('Transfer Bank Manual (Simulasi)')}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === 'Transfer Bank Manual (Simulasi)'
                    ? 'border-[#476B50] bg-[#476B50]/5'
                    : 'border-gray-200 hover:bg-[#F5F1E7]/50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Transfer Bank Manual (Simulasi)'}
                  onChange={() => setPaymentMethod('Transfer Bank Manual (Simulasi)')}
                  className="accent-[#476B50]"
                />
                <div>
                  <p className="text-xs font-bold text-[#294735]">
                    Transfer Bank Manual (Simulasi Rekening BioLiving)
                  </p>
                  <p className="text-[11px] text-[#777C73]">
                    Virtual Account demo / rekening demo tanpa verifikasi perbankan riil
                  </p>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('Cash on Delivery (Simulasi)')}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === 'Cash on Delivery (Simulasi)'
                    ? 'border-[#476B50] bg-[#476B50]/5'
                    : 'border-gray-200 hover:bg-[#F5F1E7]/50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Cash on Delivery (Simulasi)'}
                  onChange={() => setPaymentMethod('Cash on Delivery (Simulasi)')}
                  className="accent-[#476B50]"
                />
                <div>
                  <p className="text-xs font-bold text-[#294735]">
                    Cash on Delivery (Simulasi Bayar di Tempat)
                  </p>
                  <p className="text-[11px] text-[#777C73]">
                    Simulasi pembayaran tunai saat paket prototipe diterima
                  </p>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Order Review & Submit Button */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-[#476B50]/15 p-6 shadow-xs space-y-5 sticky top-24">
            <h2 className="font-bold text-base text-[#294735] border-b border-gray-100 pb-3">
              Ringkasan Pesanan ({cartTotalItems} item)
            </h2>

            {/* Itemized List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 text-xs">
                  <div className="w-12 h-12 rounded-lg bg-[#F5F1E7] overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#294735] truncate">{product.name}</p>
                    <p className="text-[#777C73] tabular-nums">
                      {quantity} x {formatIDR(product.price)}
                    </p>
                  </div>
                  <span className="font-bold text-[#294735] tabular-nums">
                    {formatIDR(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#777C73]">
                <span>Subtotal Produk</span>
                <span className="font-semibold text-[#294735] tabular-nums">
                  {formatIDR(cartSubtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#777C73]">
                <span>Biaya Pengiriman</span>
                <span className="font-semibold text-[#294735] tabular-nums">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700 font-bold">GRATIS</span>
                  ) : (
                    formatIDR(shippingCost)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
                <span className="font-bold text-[#294735]">Total Tagihan</span>
                <span className="font-bold text-lg text-[#294735] tabular-nums">
                  {formatIDR(grandTotal)}
                </span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#476B50] hover:bg-[#294735] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Memproses Pesanan...' : 'Kirim Pesanan Prototipe'}</span>
            </button>

            <div className="p-3 bg-[#F5F1E7]/70 rounded-xl text-[11px] text-[#777C73] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#294735]">
                <ShieldCheck className="w-4 h-4 text-[#476B50]" />
                <span>Garansi Alur Demonstrasi SUDP</span>
              </div>
              <p>
                Setelah klik tombol di atas, pesanan akan diberi kode referensi unik dan tersimpan otomatis di Riwayat Akun serta Dashboard Admin Toko.
              </p>
            </div>

          </div>
        </div>

      </form>

    </div>
  );
};
