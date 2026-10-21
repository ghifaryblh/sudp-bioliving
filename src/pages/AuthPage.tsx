import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, UserCheck, Lock, Mail, User as UserIcon, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { login, register, quickLoginAs, navigate } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = login(loginEmail, loginPassword);
    if (res.success) {
      navigate('account');
    } else if (res.error) {
      setLoginError(res.error);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (regPassword !== regConfirmPassword) {
      setRegError('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Kata sandi minimal 6 karakter.');
      return;
    }

    const res = register(regName, regEmail, regPassword);
    if (res.success) {
      navigate('account');
    } else if (res.error) {
      setRegError(res.error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <span className="w-10 h-10 rounded-xl bg-[#476B50] flex items-center justify-center text-[#FCFBF7] font-bold text-xl mx-auto shadow-xs">
          🌱
        </span>
        <h1 className="text-2xl font-bold text-[#294735]">
          {mode === 'login' ? 'Masuk ke BioLiving' : 'Daftar Akun Baru'}
        </h1>
        <p className="text-xs text-[#777C73]">
          Platform riset & e-commerce Sustainable Urban Development Project
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="p-1 bg-[#F5F1E7] rounded-xl flex items-center text-xs font-semibold">
        <button
          onClick={() => {
            setMode('login');
            setLoginError('');
          }}
          className={`flex-1 py-2 text-center rounded-lg transition-colors cursor-pointer ${
            mode === 'login'
              ? 'bg-white text-[#294735] shadow-xs'
              : 'text-[#777C73] hover:text-[#30352F]'
          }`}
        >
          Masuk (Login)
        </button>
        <button
          onClick={() => {
            setMode('register');
            setRegError('');
          }}
          className={`flex-1 py-2 text-center rounded-lg transition-colors cursor-pointer ${
            mode === 'register'
              ? 'bg-white text-[#294735] shadow-xs'
              : 'text-[#777C73] hover:text-[#30352F]'
          }`}
        >
          Daftar (Register)
        </button>
      </div>

      {/* Forms Container */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#476B50]/15 shadow-xs space-y-6">
        
        {mode === 'login' ? (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs">
                {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#30352F] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#476B50]" />
                <span>Alamat Email</span>
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden focus:border-[#476B50]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#30352F] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#476B50]" />
                <span>Kata Sandi</span>
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden focus:border-[#476B50]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#476B50] hover:bg-[#294735] text-white font-semibold text-xs rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Masuk Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {regError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs">
                {regError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#30352F] flex items-center gap-1.5">
                <UserIcon className="w-3.5 h-3.5 text-[#476B50]" />
                <span>Nama Lengkap</span>
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Contoh: Siti Rahmawati"
                className="w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden focus:border-[#476B50]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#30352F] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#476B50]" />
                <span>Alamat Email</span>
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden focus:border-[#476B50]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#30352F] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#476B50]" />
                <span>Kata Sandi</span>
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden focus:border-[#476B50]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#30352F] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#476B50]" />
                <span>Konfirmasi Kata Sandi</span>
              </label>
              <input
                type="password"
                required
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi"
                className="w-full px-3 py-2 text-xs bg-[#FCFBF7] rounded-lg border border-[#476B50]/20 focus:outline-hidden focus:border-[#476B50]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#476B50] hover:bg-[#294735] text-white font-semibold text-xs rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Buat Akun Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Quick Demo Login Preset Buttons */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <div className="text-center">
            <span className="text-[11px] text-[#777C73] uppercase tracking-wider font-semibold">
              Atau Gunakan Akun Demonstrasi Langsung:
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => quickLoginAs('customer')}
              className="p-2.5 text-[11px] font-semibold text-[#294735] bg-[#F5F1E7] hover:bg-[#ECE6D8] rounded-xl border border-[#476B50]/20 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#476B50]" />
              <span>Demo Customer</span>
            </button>

            <button
              type="button"
              onClick={() => quickLoginAs('admin')}
              className="p-2.5 text-[11px] font-semibold text-[#294735] bg-[#476B50]/15 hover:bg-[#476B50]/25 rounded-xl border border-[#476B50]/30 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#476B50]" />
              <span>Demo Admin SUDP</span>
            </button>
          </div>
        </div>

      </div>

      {/* Academic Disclaimer Box */}
      <div className="p-3 bg-[#F5F1E7]/70 rounded-xl border border-[#476B50]/15 text-[11px] text-[#777C73] leading-relaxed text-center">
        Sistem autentikasi ini merupakan simulasi prototipe di penyimpanan peramban (localStorage) untuk demonstrasi alur sidang proyek SUDP dan tidak menyimpan data sensitif.
      </div>

    </div>
  );
};
