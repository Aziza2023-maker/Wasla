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
  Award,
  PlusCircle,
  Lock,
  User
} from 'lucide-react';

export const RoleSwitcherBanner = () => {
  const {
    activeScreen,
    currentRole,
    navigateTo,
    switchRole,
    openModal
  } = useWasla();

  const [isExpanded, setIsExpanded] = useState(false);

  const screens = [
    { id: 'landing', label: 'الرئيسية', icon: Compass, category: 'عام', role: 'guest' },
    { id: 'role-selection', label: 'اختيار الدور', icon: UserCheck, category: 'المصادقة', role: 'guest' },
    { id: 'login', label: 'تسجيل الدخول', icon: User, category: 'المصادقة', role: 'guest' },
    { id: 'register', label: 'إنشاء حساب', icon: UserCheck, category: 'المصادقة', role: 'guest' },
    { id: 'forgot-password', label: 'استعادة المرور', icon: Lock, category: 'المصادقة', role: 'guest' },
    { id: 'freelancer-overview', label: 'لوحة المستقل (أروى)', icon: LayoutDashboard, category: 'المستقل', role: 'freelancer' },
    { id: 'freelancer-jobs', label: 'سوق العمل وتقديم العروض', icon: Briefcase, category: 'المستقل', role: 'freelancer' },
    { id: 'freelancer-portfolio', label: 'معرض الأعمال (Portfolio)', icon: Layers, category: 'المستقل', role: 'freelancer' },
    { id: 'freelancer-contact', label: 'بيانات التواصل والتحقق', icon: PhoneCall, category: 'المستقل', role: 'freelancer' },
    { id: 'student-alt', label: 'لوحة الطالب البديل (أسامة)', icon: GraduationCap, category: 'المستقل', role: 'freelancer' },
    { id: 'client-dashboard', label: 'لوحة تحكم العميل (شهاب)', icon: Briefcase, category: 'العميل', role: 'client' },
    { id: 'admin-panel', label: 'الإدارة المركزية (Escrow)', icon: ShieldCheck, category: 'الإدارة', role: 'admin' },
  ];

  return (
    <aside
      aria-label="شريط الصلاحيات والتنقل السريع لمنصة وصلة"
      className="sticky top-0 z-50 bg-[#0F172A] text-white border-b border-slate-700/80 shadow-md text-xs font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        {/* Left: Active Role Indicator */}
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
          </span>

          <span className="font-bold text-slate-300 hidden sm:inline">
            الصلاحية النشطة:
          </span>

          <span
            className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
              currentRole === 'freelancer'
                ? 'bg-sky-950/80 text-sky-300 border-sky-500/40'
                : currentRole === 'client'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                : currentRole === 'admin'
                ? 'bg-purple-950/80 text-purple-300 border-purple-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            {currentRole === 'freelancer'
              ? 'طالب مستقل (Freelancer)'
              : currentRole === 'client'
              ? 'صاحب عمل (Client)'
              : currentRole === 'admin'
              ? 'الإدارة والوساطة (Admin Escrow)'
              : 'زائر (Guest)'}
          </span>

          <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 hidden md:inline">
            معاينة الحسابات التجريبية (Demo Accounts)
          </span>
        </div>

        {/* Quick Horizontal Role Links */}
        <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-0.5">
          {/* Landing */}
          <button
            onClick={() => navigateTo('landing', 'guest')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all whitespace-nowrap text-xs ${
              activeScreen === 'landing'
                ? 'bg-sky-600 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>الرئيسية</span>
          </button>

          {/* Freelancer Dashboard */}
          <button
            onClick={() => switchRole('freelancer')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all whitespace-nowrap text-xs ${
              activeScreen.startsWith('freelancer') || activeScreen === 'student-alt'
                ? 'bg-sky-600 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
            <span>لوحة المستقل</span>
          </button>

          {/* Client Dashboard */}
          <button
            onClick={() => switchRole('client')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all whitespace-nowrap text-xs ${
              activeScreen.startsWith('client')
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>لوحة العميل</span>
          </button>

          {/* Admin Restricted */}
          <button
            onClick={() => switchRole('admin')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all whitespace-nowrap text-xs ${
              activeScreen === 'admin-panel'
                ? 'bg-purple-600 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>بوابة الإدارة (Escrow)</span>
          </button>
        </div>

        {/* Quick Action Triggers & Toggle Expand */}
        <div className="flex items-center gap-2">
          {/* Quick Academic Verify Trigger */}
          <button
            onClick={() => openModal('academic-verify')}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-900/50 hover:bg-teal-900 text-teal-300 border border-teal-500/40 transition-colors text-[11px] font-bold"
            title="فتح نموذج رفع البطاقة الجامعية"
          >
            <Award className="w-3.5 h-3.5" />
            <span>طلب توثيق أكاديمي</span>
          </button>

          {/* Toggle Expand for all 12 screens */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition-colors font-bold"
          >
            <span>كافة الشاشات (12)</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded drawer for all 12 screens */}
      {isExpanded && (
        <div className="bg-[#070D18] border-t border-slate-800 p-4 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {screens.map((screen) => {
              const Icon = screen.icon;
              const isActive = activeScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => {
                    navigateTo(screen.id, screen.role);
                    setIsExpanded(false);
                  }}
                  className={`flex flex-col items-start p-2.5 rounded-lg border transition-all text-right ${
                    isActive
                      ? 'bg-sky-600/20 border-sky-500 text-sky-300 font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 w-full justify-between mb-1">
                    <Icon className="w-4 h-4 text-sky-400" />
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
