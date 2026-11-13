import React from 'react';
import { useWasla } from '../../context/WaslaContext';
import { WaslaChainIcon } from '../common/WaslaLogo';
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  PhoneCall,
  CreditCard,
  Settings,
  ShieldCheck,
  Zap,
  CheckCircle,
  LogOut
} from 'lucide-react';

export const FreelancerSidebar = () => {
  const { activeScreen, navigateTo, freelancerUser } = useWasla();

  const navItems = [
    { id: 'freelancer-overview', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'freelancer-jobs', label: 'سوق العمل', icon: Briefcase },
    { id: 'freelancer-portfolio', label: 'معرض أعمالي', icon: Layers },
    { id: 'freelancer-contact', label: 'بيانات التواصل', icon: PhoneCall },
    { id: 'freelancer-financial', label: 'الحساب المالي', icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-[#0B192C] text-slate-300 flex flex-col justify-between shrink-0 min-h-screen border-l border-slate-800 selection:bg-teal-500 font-sans" dir="rtl">
      <div>
        {/* Top Branding */}
        <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
          <WaslaChainIcon size={34} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-xl tracking-tight">وصلة</span>
              <span className="text-slate-400 font-bold text-sm">| Wasla</span>
            </div>
            <span className="text-[10px] text-slate-400 block font-medium">منصة العمل الحر الأكاديمي</span>
          </div>
        </div>

        {/* Academic Verification Card */}
        <div className="p-4">
          <div className="bg-[#15253C] rounded-xl p-3 border border-slate-700/60 text-right">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span className="text-xs font-bold text-white">توثيق أكاديمي معتمد</span>
            </div>
            <p className="text-[11px] text-teal-300/90 font-medium">
              {freelancerUser.university} • معتمد
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-right ${
                  isActive
                    ? 'bg-[#0D9488] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status & Settings */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        {/* Power & Network Status Pill */}
        <div className="bg-[#081220] rounded-xl p-2.5 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-[11px] text-slate-300 font-medium">استقرار الطاقة والشبكة:</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-800/40">
            مستقر
          </span>
        </div>

        {/* Settings button */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <button
            onClick={() => navigateTo('freelancer-contact')}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>الإعدادات</span>
          </button>

          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors"
            title="تسجيل الخروج"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FreelancerSidebar;

