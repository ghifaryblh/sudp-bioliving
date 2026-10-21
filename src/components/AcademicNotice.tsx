import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

export const AcademicNotice: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Pemberitahuan Prototipe Akademik" className="bg-[#476B50]/10 border-b border-[#476B50]/20 text-[#30352F] text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#476B50] shrink-0" />
          <p className="line-clamp-1 sm:line-clamp-none">
            <span className="font-semibold text-[#294735]">Prototipe Akademik SUDP:</span> Platform e-commerce & edukasi ini dikembangkan untuk demonstrasi proyek Sustainable Urban Development. Seluruh harga, transaksi, dan stok bersifat simulasi demonstrasi.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#777C73] hover:text-[#30352F] p-1 rounded-sm shrink-0 transition-colors"
          title="Tutup pemberitahuan"
          aria-label="Tutup pemberitahuan"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
