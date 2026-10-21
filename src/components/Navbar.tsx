import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, User as UserIcon, Menu, X, ShieldAlert, LogOut } from 'lucide-react';
import { LOGO_IMAGE } from '../data/initialData';

export const Navbar: React.FC = () => {
  const { currentRoute, navigate, cartTotalItems, currentUser, logout, quickLoginAs } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', route: 'home' as const },
    { label: 'Katalog Produk', route: 'shop' as const },
    { label: 'Edukasi Bioplastik', route: 'learn' as const },
    { label: 'Tentang Kami', route: 'about' as const },
    { label: 'Kontak Kami', route: 'contact' as const }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FCFBF7]/95 backdrop-blur-md border-b border-[#476B50]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            navigate('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2 text-left group cursor-pointer"
        >
          <img
          src={LOGO_IMAGE}
          alt="Logo BioLiving"
          className="w-8 h-8 rounded-lg object-contain"
          />
          
          <span className="text-2xl font-bold tracking-tight text-[#294735] whitespace-nowrap">
            BioLiving
          </span>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => navigate(item.route)}
                className={`whitespace-nowrap transition-colors py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-[#294735] font-semibold'
                    : 'text-[#777C73] hover:text-[#30352F]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#476B50] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Cart, Auth, Admin, Mobile Toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Admin shortcut button */}
          <button
            onClick={() => {
              if (currentUser?.role === 'admin') {
                navigate('admin');
              } else {
                quickLoginAs('admin');
              }
            }}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              currentRoute === 'admin'
                ? 'bg-[#294735] text-white shadow-xs'
                : 'text-[#476B50] bg-[#476B50]/10 hover:bg-[#476B50]/20'
            }`}
            title="Kelola Produk & Pesanan Toko"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin SUDP</span>
          </button>

          {/* Cart Icon & Count */}
          <button
            onClick={() => navigate('cart')}
            className={`relative p-2 rounded-lg transition-colors cursor-pointer ${
              currentRoute === 'cart'
                ? 'bg-[#476B50] text-[#FCFBF7]'
                : 'text-[#30352F] hover:bg-[#F5F1E7]'
            }`}
            aria-label="Keranjang Belanja"
            title="Lihat Keranjang Belanja"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartTotalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#476B50] text-[#FCFBF7] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FCFBF7] tabular-nums">
                {cartTotalItems > 99 ? '99+' : cartTotalItems}
              </span>
            )}
          </button>

          {/* User Account Menu / Login */}
          <div className="relative">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    currentRoute === 'account'
                      ? 'bg-[#294735] text-white'
                      : 'bg-[#F5F1E7] text-[#30352F] hover:bg-[#ECE6D8]'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#476B50]" />
                  <span className="max-w-[110px] truncate">{currentUser.fullName}</span>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-[#476B50]/15 py-1 z-50 text-xs"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="font-semibold text-[#294735] truncate">{currentUser.fullName}</p>
                      <p className="text-[#777C73] truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] text-[#476B50] font-medium uppercase tracking-wider">
                        Peran: {currentUser.role}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        navigate('account');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[#30352F] hover:bg-[#F5F1E7] flex items-center gap-2 cursor-pointer"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-[#476B50]" />
                      Riwayat Pesanan & Akun
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          navigate('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-[#294735] hover:bg-[#F5F1E7] flex items-center gap-2 font-medium cursor-pointer"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-[#476B50]" />
                        Dashboard Admin Toko
                      </button>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-gray-100 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Keluar (Logout)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('login')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#476B50] hover:bg-[#294735] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
              >
                Masuk / Akun
              </button>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#30352F] hover:bg-[#F5F1E7] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#476B50]/15 bg-[#FCFBF7] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.route}
              onClick={() => {
                navigate(item.route);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                currentRoute === item.route
                  ? 'bg-[#476B50] text-white'
                  : 'text-[#30352F] hover:bg-[#F5F1E7]'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-[#476B50]/15 space-y-2">
            <button
              onClick={() => {
                if (currentUser?.role === 'admin') {
                  navigate('admin');
                } else {
                  quickLoginAs('admin');
                }
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-md text-xs font-medium text-[#294735] bg-[#476B50]/10 flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-[#476B50]" />
              Masuk Dashboard Admin SUDP
            </button>

            {currentUser ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Keluar dari Akun ({currentUser.fullName})
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-md text-xs font-semibold text-white bg-[#476B50]"
              >
                Masuk / Buat Akun Demonstrasi
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
