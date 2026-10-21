import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#476B50] shrink-0" />
  };

  const bgStyles = {
    success: 'bg-white border-emerald-200 text-[#30352F]',
    error: 'bg-white border-rose-200 text-[#30352F]',
    info: 'bg-white border-[#476B50]/30 text-[#30352F]'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-200 pointer-events-none">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${bgStyles[toast.type]} pointer-events-auto`}
      >
        {icons[toast.type]}
        <div className="flex-1 text-sm font-medium leading-snug">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
