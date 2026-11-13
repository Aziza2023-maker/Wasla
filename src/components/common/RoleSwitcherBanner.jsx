import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import {
  Compass,
  UserCheck,
  Briefcase,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Layers,
  PhoneCall,
  GraduationCap,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const RoleSwitcherBanner = () => {
  const { activeScreen, navigateTo } = useWasla();
  const [isExpanded, setIsExpanded] = useState(false);

  const screens = [
    { id: 'landing', label: 'الرئيسية', icon: Compass, category: 'عام' },
    { id: 'role-selection', label: 'اختيار الدور', icon: UserCheck, category: 'المصادقة' },
    { id: 'login', label: 'تسجيل الدخول', icon: UserCheck, category: 'المصادقة' },
    { id: 'register', label: 'إنشاء حساب', icon: UserCheck, category: 'المصادقة' },
    { id: 'forgot-password', label: 'استعادة المرور', icon: UserCheck, category: 'المصادقة' },
    { id: 'freelancer-overview', label: 'لوحة المستقل (أروى)', icon: LayoutDashboard, category: 'المستقل' },
    { id: 'freelancer-jobs', label: 'سوق العمل وتقديم العروض', icon: Briefcase, category: 'المستقل' },
    { id: 'freelancer-portfolio', label: 'معرض الأعمال (Portfolio)', icon: Layers, category: 'المستقل' },
    { id: 'freelancer-contact', label: 'بيانات التواصل المباشر', icon: PhoneCall, category: 'المستقل' },
    { id: 'student-alt', label: 'لوحة الطالب (أسامة)', icon: GraduationCap, category: 'المستقل' },
    { id: 'client-dashboard', label: 'لوحة تحكم العميل (شهاب)', icon: Briefcase, category: 'العميل' },
    { id: 'admin-panel', label: 'الإدارة المركزية والوساطة Escrow', icon: ShieldCheck, category: 'الإدارة' },
  ];

  return (
    <aside aria-label="شريط الانتقال السريع بين شاشات المنصة" className="sticky top-0 z-50 bg-[#0B192C] text-white border-b border-slate-700/80 shadow-md text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        {/* Left Status pill */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-300 hidden sm:inline">
            شريط الانتقال السريع للمعاينة:
          </span>
          <span className="bg-teal-900/60 text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-500/30 font-medium">
            {screens.find((s) => s.id === activeScreen)?.label || activeScreen}
          </span>
        </div>

        {/* Quick Links Horizontal */}
        <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-0.5">
          {screens.slice(0, 7).map((screen) => {
            const Icon = screen.icon;
            const isActive = activeScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => navigateTo(screen.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all whitespace-nowrap text-xs ${
                  isActive
                    ? 'bg-teal-600 text-white font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{screen.label}</span>
              </button>
            );
          })}
        </div>

        {/* Toggle Expand for all screens */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 transition-colors"
          >
            <span>كافة الشاشات (12)</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded drawer for all 12 screens */}
      {isExpanded && (
        <div className="bg-[#07111E] border-t border-slate-800 p-4 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {screens.map((screen) => {
              const Icon = screen.icon;
              const isActive = activeScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => {
                    navigateTo(screen.id);
                    setIsExpanded(false);
                  }}
                  className={`flex flex-col items-start p-2.5 rounded-lg border transition-all text-right ${
                    isActive
                      ? 'bg-teal-600/20 border-teal-500 text-teal-300 font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 w-full justify-between mb-1">
                    <Icon className="w-4 h-4 text-teal-400" />
                    <span className="text-[10px] text-slate-400 font-normal">{screen.category}</span>
                  </div>
                  <span className="text-xs">{screen.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};

export default RoleSwitcherBanner;

