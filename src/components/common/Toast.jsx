// Toast.jsx - Interactive Toast Notifications
import React from 'react';
import { useWasla } from '../../context/WaslaContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useWasla();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[9999] flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 text-right animate-in fade-in slide-in-from-bottom-2 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40'
              : toast.type === 'error'
              ? 'bg-rose-950/90 text-rose-100 border-rose-500/40'
              : toast.type === 'warning'
              ? 'bg-amber-950/90 text-amber-100 border-amber-500/40'
              : 'bg-slate-900/90 text-slate-100 border-teal-500/40'
          }`}
          dir="rtl"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-400" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-teal-400" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm leading-tight text-white mb-1">
              {toast.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white transition-colors p-1 -mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;

