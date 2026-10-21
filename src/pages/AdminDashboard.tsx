import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductCategory, Order, OrderStatus } from '../types';
import { formatIDR } from '../utils/formatters';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  X,
  Search,
  AlertTriangle,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  SHOPPING_BAG_IMAGE, 
  POUCH_IMAGE, 
  ID_HOLDER_IMAGE, 
  LAMPSHADE_IMAGE 
} from '../data/initialData';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProductsToDefault, 
    updateOrderStatus,
    quickLoginAs,
    navigate,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');

  // Product modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Shopping Bags' as ProductCategory,
    price: 25000,
    stock: 50,
    shortDescription: '',
    fullDescription: '',
    materialInfo: '',
    availability: 'Tersedia' as Product['availability'],
    image: SHOPPING_BAG_IMAGE,
    intendedUse: 'Penggunaan harian ramah lingkungan',
    material: 'Polimer Pati Singkong'
  });

  // Delete product confirmation
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Order detail modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Search in admin tables
  const [adminSearch, setAdminSearch] = useState('');

  // If user is not admin, show access warning with 1-click admin login
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[#294735]">Area Khusus Pengelola SUDP</h2>
          <p className="text-xs text-[#777C73] leading-relaxed">
            Halaman ini hanya dapat diakses oleh tim pengelola BioLiving SUDP untuk mengelola katalog produk dan pesanan demonstrasi.
          </p>
        </div>
        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => quickLoginAs('admin')}
            className="w-full py-2.5 px-4 bg-[#476B50] hover:bg-[#294735] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
          >
            Masuk sebagai Admin Demonstrasi SUDP
          </button>
          <button
            onClick={() => navigate('home')}
            className="w-full py-2 px-4 bg-[#F5F1E7] text-[#294735] rounded-xl text-xs font-semibold cursor-pointer"
          >
            Kembali ke Halaman Toko Publik
          </button>
        </div>
      </div>
    );
  }

  // Dashboard Stats Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Menunggu Konfirmasi').length;
  const totalDemoSales = orders.reduce((acc, o) => acc + (o.status !== 'Dibatalkan' ? o.total : 0), 0);

  // Available sample images for easy selection in product modal
  const availableImages = [
    { label: 'Tas Belanja Bioplastik', url: SHOPPING_BAG_IMAGE },
    { label: 'Pouch & Dompet Bioplastik', url: POUCH_IMAGE },
    { label: 'ID Card Holder Bioplastik', url: ID_HOLDER_IMAGE },
    { label: 'Kap Lampu Interior Bioplastik', url: LAMPSHADE_IMAGE }
  ];

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Shopping Bags',
      price: 25000,
      stock: 50,
      shortDescription: '',
      fullDescription: '',
      materialInfo: 'Formulasi pati singkong alami dan gliserol nabati.',
      availability: 'Tersedia',
      image: SHOPPING_BAG_IMAGE,
      intendedUse: 'Belanja dan keperluan harian',
      material: 'Pati Singkong Terplastisasi'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      stock: prod.stock,
      shortDescription: prod.shortDescription,
      fullDescription: prod.fullDescription,
      materialInfo: prod.materialInfo,
      availability: prod.availability,
      image: prod.image,
      intendedUse: prod.specs.intendedUse,
      material: prod.specs.material
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      showToast('Nama produk wajib diisi.', 'error');
      return;
    }

    if (editingProduct) {
      // Update
      const updated: Product = {
        ...editingProduct,
        name: productForm.name.trim(),
        category: productForm.category,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        shortDescription: productForm.shortDescription.trim() || 'Prototipe bioplastik ramah lingkungan.',
        fullDescription: productForm.fullDescription.trim() || 'Deskripsi lengkap prototipe produk bioplastik.',
        materialInfo: productForm.materialInfo.trim() || 'Formulasi ramah lingkungan.',
        availability: productForm.availability,
        image: productForm.image,
        specs: {
          ...editingProduct.specs,
          intendedUse: productForm.intendedUse,
          material: productForm.material
        }
      };
      updateProduct(updated);
    } else {
      // Add
      addProduct({
        name: productForm.name.trim(),
        category: productForm.category,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        shortDescription: productForm.shortDescription.trim() || 'Prototipe bioplastik ramah lingkungan.',
        fullDescription: productForm.fullDescription.trim() || 'Deskripsi prototipe produk bioplastik inovasi SUDP.',
        materialInfo: productForm.materialInfo.trim() || 'Formulasi terbarukan.',
        availability: productForm.availability,
        image: productForm.image,
        specs: {
          intendedUse: productForm.intendedUse,
          material: productForm.material,
          shelfLifeEstimate: '6-12 bulan penyimpanan ruang kering'
        },
        featured: false
      });
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#476B50]/15 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#476B50] uppercase tracking-wider">
            <span>Portal Manajemen Toko</span>
            <span>·</span>
            <span>Sustainable Urban Development Project</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#294735] mt-1">
            Dashboard Tim Pengelola BioLiving
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('shop')}
            className="px-3.5 py-2 text-xs font-semibold text-[#476B50] bg-[#476B50]/10 hover:bg-[#476B50]/20 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Toko Publik</span>
          </button>

          <button
            onClick={() => navigate('home')}
            className="px-3.5 py-2 text-xs font-semibold text-[#30352F] bg-[#F5F1E7] hover:bg-[#ECE6D8] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-[#476B50]/20"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Tabs Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0 ${
            activeTab === 'dashboard'
              ? 'bg-[#294735] text-white shadow-xs'
              : 'text-[#777C73] hover:text-[#294735] hover:bg-[#F5F1E7]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Ringkasan Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0 ${
            activeTab === 'products'
              ? 'bg-[#294735] text-white shadow-xs'
              : 'text-[#777C73] hover:text-[#294735] hover:bg-[#F5F1E7]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Kelola Produk ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0 ${
            activeTab === 'orders'
              ? 'bg-[#294735] text-white shadow-xs'
              : 'text-[#777C73] hover:text-[#294735] hover:bg-[#F5F1E7]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Kelola Pesanan ({orders.length})</span>
          {pendingOrders > 0 && (
            <span className="bg-amber-400 text-amber-950 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {pendingOrders}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="bg-white p-5 rounded-2xl border border-[#476B50]/15 space-y-2 shadow-xs">
              <span className="text-xs text-[#777C73] font-medium block">Total Prototipe Produk</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-[#294735] tabular-nums">{totalProducts}</span>
                <span className="text-xs font-semibold text-[#476B50]">4 Kategori</span>
              </div>
              <p className="text-[11px] text-[#777C73]">Tercatat di katalog publik</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#476B50]/15 space-y-2 shadow-xs">
              <span className="text-xs text-[#777C73] font-medium block">Total Pesanan Tercatat</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-[#294735] tabular-nums">{totalOrders}</span>
                <span className="text-xs font-semibold text-blue-600">Simulasi SUDP</span>
              </div>
              <p className="text-[11px] text-[#777C73]">Dari customer dan tester</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#476B50]/15 space-y-2 shadow-xs">
              <span className="text-xs text-[#777C73] font-medium block">Menunggu Konfirmasi</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-amber-700 tabular-nums">{pendingOrders}</span>
                <span className="text-xs font-semibold text-amber-600">Perlu Respons</span>
              </div>
              <p className="text-[11px] text-[#777C73]">Pesanan baru belum diproses</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#476B50]/15 space-y-2 shadow-xs">
              <span className="text-xs text-[#777C73] font-medium block">Omset Tercatat (Simulasi)</span>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-[#294735] tabular-nums">
                  {formatIDR(totalDemoSales)}
                </span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  Demo
                </span>
              </div>
              <p className="text-[11px] text-[#777C73]">Data demonstrasi transaksi</p>
            </div>

          </div>

          {/* Recent Orders Section */}
          <div className="bg-white rounded-2xl border border-[#476B50]/15 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#294735]">
                  Pesanan Masuk Terbaru
                </h3>
                <p className="text-xs text-[#777C73]">
                  5 transaksi simulasi terakhir yang masuk ke dalam sistem.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-[#476B50] hover:underline cursor-pointer"
              >
                Lihat Semua ({orders.length})
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[#777C73] font-semibold">
                    <th className="py-2.5 px-3">No. Referensi</th>
                    <th className="py-2.5 px-3">Pelanggan</th>
                    <th className="py-2.5 px-3">Kota</th>
                    <th className="py-2.5 px-3">Total</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FCFBF7]">
                      <td className="py-3 px-3 font-mono font-bold text-[#294735]">
                        {ord.orderReference}
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-[#30352F]">{ord.customerName}</p>
                        <p className="text-[#777C73] text-[11px]">{ord.email}</p>
                      </td>
                      <td className="py-3 px-3 text-[#777C73]">{ord.city}</td>
                      <td className="py-3 px-3 font-bold text-[#294735] tabular-nums">
                        {formatIDR(ord.total)}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F5F1E7] text-[#294735] border border-[#476B50]/20">
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-2.5 py-1 text-xs font-medium text-[#476B50] bg-[#476B50]/10 hover:bg-[#476B50]/20 rounded-md cursor-pointer"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions & Seed Reset */}
          <div className="p-4 bg-[#F5F1E7] rounded-2xl border border-[#476B50]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-bold text-[#294735]">Bantuan Pengujian Sidang & Presentasi:</p>
              <p className="text-[#777C73]">
                Ingin mengembalikan data produk ke setelan awal prototipe setelah pengujian?
              </p>
            </div>
            <button
              onClick={resetProductsToDefault}
              className="px-3.5 py-2 text-xs font-semibold text-[#294735] bg-white hover:bg-[#ECE6D8] rounded-xl border border-[#476B50]/30 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#476B50]" />
              <span>Reset Data Katalog ke Default</span>
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#294735]">
                Inventaris Prototipe Produk
              </h2>
              <p className="text-xs text-[#777C73]">
                Tambah, ubah harga, sesuaikan jumlah stok, atau perbarui ketersediaan produk.
              </p>
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="px-4 py-2.5 bg-[#476B50] hover:bg-[#294735] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </button>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-2xl border border-[#476B50]/15 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F5F1E7]/50 border-b border-gray-100 text-[#777C73] font-semibold">
                    <th className="py-3 px-4">Gambar & Nama Produk</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Harga (IDR)</th>
                    <th className="py-3 px-4">Stok</th>
                    <th className="py-3 px-4">Ketersediaan</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FCFBF7] transition-colors">
                      
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-12 object-cover rounded-lg border border-gray-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-bold text-sm text-[#294735]">{prod.name}</p>
                            <p className="text-[#777C73] text-[11px] line-clamp-1 max-w-xs">
                              {prod.shortDescription}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-[#777C73]">
                        {prod.category}
                      </td>

                      <td className="py-3 px-4 font-bold text-[#294735] tabular-nums">
                        {formatIDR(prod.price)}
                      </td>

                      <td className="py-3 px-4 font-semibold text-[#30352F] tabular-nums">
                        {prod.stock} unit
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            prod.stock <= 0
                              ? 'bg-rose-100 text-rose-700'
                              : prod.stock <= 10
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {prod.stock <= 0 ? 'Habis' : prod.availability}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(prod)}
                            className="p-1.5 text-[#476B50] hover:bg-[#F5F1E7] rounded-lg transition-colors cursor-pointer"
                            title="Edit Produk"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(prod)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: ORDER MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div>
            <h2 className="text-xl font-bold text-[#294735]">
              Daftar Pesanan Demonstrasi SUDP
            </h2>
            <p className="text-xs text-[#777C73]">
              Perbarui status pemrosesan pesanan (Menunggu Konfirmasi, Diproses, Dikirim, Selesai, Dibatalkan).
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#476B50]/15 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F5F1E7]/50 border-b border-gray-100 text-[#777C73] font-semibold">
                    <th className="py-3 px-4">No. Referensi</th>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Nama Pelanggan</th>
                    <th className="py-3 px-4">Metode Bayar</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Ubah Status</th>
                    <th className="py-3 px-4 text-right">Rincian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FCFBF7] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#294735]">
                        {ord.orderReference}
                      </td>
                      <td className="py-3 px-4 text-[#777C73] tabular-nums">
                        {ord.createdAt}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-[#30352F]">{ord.customerName}</p>
                        <p className="text-[11px] text-[#777C73]">{ord.phone}</p>
                      </td>
                      <td className="py-3 px-4 text-[#777C73] text-[11px]">
                        {ord.paymentMethod.replace(' (Simulasi)', '')}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#294735] tabular-nums">
                        {formatIDR(ord.total)}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="px-2.5 py-1 text-xs rounded-lg border border-[#476B50]/30 bg-[#FCFBF7] text-[#294735] font-medium cursor-pointer"
                        >
                          <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                          <option value="Diproses">Diproses</option>
                          <option value="Dikirim">Dikirim</option>
                          <option value="Selesai">Selesai</option>
                          <option value="Dibatalkan">Dibatalkan</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1.5 text-xs font-medium text-[#476B50] bg-[#476B50]/10 hover:bg-[#476B50]/20 rounded-lg cursor-pointer"
                        >
                          Lihat Lengkap
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#476B50]/20 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-[#294735]">
                {editingProduct ? 'Ubah Informasi Produk' : 'Tambah Prototipe Produk Baru'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-lg text-[#777C73] hover:text-[#30352F] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-semibold text-[#30352F]">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Contoh: Tas Belanja Bioplastik Singkong"
                  className="w-full px-3 py-2 bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#30352F]">Kategori</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden"
                  >
                    <option value="Shopping Bags">Shopping Bags</option>
                    <option value="Pouches and Handbags">Pouches and Handbags</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Home Decor">Home Decor</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#30352F]">Status Stok</label>
                  <select
                    value={productForm.availability}
                    onChange={(e) => setProductForm({ ...productForm, availability: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden"
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Stok Menipis">Stok Menipis</option>
                    <option value="Habis">Habis</option>
                    <option value="Pre-Order">Pre-Order</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#30352F]">Harga (IDR)</label>
                  <input
                    type="number"
                    min={1000}
                    step={1000}
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden tabular-nums"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#30352F]">Jumlah Stok Unit</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden tabular-nums"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#30352F]">Deskripsi Singkat (Card View)</label>
                <input
                  type="text"
                  required
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu produk..."
                  className="w-full px-3 py-2 bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#30352F]">Deskripsi Lengkap (Halaman Detail)</label>
                <textarea
                  rows={3}
                  value={productForm.fullDescription}
                  onChange={(e) => setProductForm({ ...productForm, fullDescription: e.target.value })}
                  placeholder="Penjelasan riset, keunggulan, dan karakteristik prototipe..."
                  className="w-full px-3 py-2 bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden"
                />
              </div>

              {/* Image Selector */}
              <div className="space-y-1">
                <label className="font-semibold text-[#30352F]">Pilih Foto Prototipe</label>
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {availableImages.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setProductForm({ ...productForm, image: img.url })}
                      className={`relative rounded-lg overflow-hidden border-2 aspect-square cursor-pointer transition-all ${
                        productForm.image === img.url ? 'border-[#476B50] ring-2 ring-[#476B50]/20' : 'border-gray-200'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-[#F5F1E7] text-[#30352F] rounded-xl font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#476B50] hover:bg-[#294735] text-white rounded-xl font-semibold cursor-pointer shadow-xs"
                >
                  Simpan Produk
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE PRODUCT CONFIRMATION */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-rose-200 max-w-sm w-full p-6 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-base text-[#294735]">Hapus Produk?</h3>
              <p className="text-xs text-[#777C73]">
                Apakah Anda yakin ingin menghapus "{productToDelete.name}" dari katalog publik?
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2 text-xs font-medium bg-[#F5F1E7] rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl cursor-pointer shadow-xs"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VIEW ORDER DETAIL (ADMIN) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#476B50]/20 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] text-[#777C73] uppercase tracking-wider block">
                  Detail Pesanan Masuk
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

            {/* Status change directly in modal */}
            <div className="flex items-center justify-between bg-[#F5F1E7]/70 p-3 rounded-xl text-xs">
              <span className="text-[#30352F] font-semibold">Ubah Status Pesanan:</span>
              <select
                value={selectedOrder.status}
                onChange={(e) => {
                  updateOrderStatus(selectedOrder.id, e.target.value as OrderStatus);
                  setSelectedOrder({ ...selectedOrder, status: e.target.value as OrderStatus });
                }}
                className="px-2.5 py-1 text-xs rounded-lg border border-[#476B50]/30 bg-white text-[#294735] font-semibold cursor-pointer"
              >
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                <option value="Diproses">Diproses</option>
                <option value="Dikirim">Dikirim</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>

            {/* Customer info */}
            <div className="p-4 bg-[#FCFBF7] rounded-xl border border-gray-100 text-xs space-y-1.5">
              <p><strong>Nama:</strong> {selectedOrder.customerName}</p>
              <p><strong>Email:</strong> {selectedOrder.email}</p>
              <p><strong>Telepon / WA:</strong> {selectedOrder.phone}</p>
              <p><strong>Alamat:</strong> {selectedOrder.shippingAddress}, {selectedOrder.city} {selectedOrder.postalCode}</p>
              <p><strong>Metode Pengiriman:</strong> {selectedOrder.shippingMethod}</p>
              <p><strong>Metode Pembayaran:</strong> {selectedOrder.paymentMethod}</p>
              {selectedOrder.notes && <p className="italic text-[#476B50]">Catatan: {selectedOrder.notes}</p>}
            </div>

            {/* Items */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#294735] uppercase tracking-wider">
                Item yang Dipesan:
              </h4>
              <div className="space-y-1.5">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-gray-50">
                    <span>{item.name} ({item.quantity}x)</span>
                    <span className="font-bold tabular-nums">{formatIDR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-[#294735]">
              <span>Total Pesanan</span>
              <span className="tabular-nums">{formatIDR(selectedOrder.total)}</span>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 bg-[#476B50] hover:bg-[#294735] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Selesai Meninjau
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
