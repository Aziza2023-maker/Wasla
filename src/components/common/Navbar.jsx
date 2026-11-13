import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from './WaslaLogo';
import {
  Menu,
  X,
  ShieldCheck,
  Plus,
  Wallet,
  LogOut,
  User,
  GraduationCap,
  Briefcase,
  Lock,
  ChevronDown
} from 'lucide-react';

export const Navbar = ({ variant = 'light' }) => {
  const {
    activeScreen,
    currentRole,
    navigateTo,
    freelancerUser,
    clientUser,
    logout,
    openModal,
  } = useWasla();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = variant === 'dark';
  const navBg = isDark ? 'bg-[#0B192C] text-white border-b border-slate-800' : 'bg-white text-slate-800 border-b border-slate-200';
  const linkTextClass = (isActive) => {
    if (isDark) {
      return isActive
        ? 'text-teal-400 font-black'
        : 'text-slate-300 hover:text-white font-medium transition-colors';
    }
    return isActive
      ? 'text-teal-700 font-black'
      : 'text-slate-600 hover:text-slate-900 font-medium transition-colors';
  };

  const navLinks = [
    { id: 'landing', label: 'الرئيسية' },
    { id: 'services', label: 'الخدمات' },
    { id: 'freelancers', label: 'المستقلين المعتمدين' },
    { id: 'community', label: 'المجتمع والجامعات' },
    { id: 'support', label: 'الضمان والوساطة' },
  ];

  return (
    <header className={`${navBg} sticky top-0 z-40 transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Right side: Logo & Primary Navigation Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <WaslaLogo
            variant={isDark ? 'inverted' : 'dark'}
            size="md"
            subTitle={isDark ? null : 'WASLA.YE'}
            onClick={() => navigateTo('landing')}
          />

          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`py-1 text-xs font-semibold ${linkTextClass(activeScreen === link.id)}`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Left side: Role Actions & Session */}
        <div className="hidden sm:flex items-center gap-3">
          {/* 1. GUEST USER */}
          {currentRole === 'guest' && (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigateTo('login')}
                className={`text-xs font-bold px-3 py-2 rounded-xl transition-colors ${
                  isDark
                    ? 'text-slate-200 hover:text-white hover:bg-slate-800'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                تسجيل الدخول
              </button>

              <button
                onClick={() => navigateTo('role-selection')}
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>سجل كطالب / عميل</span>
              </button>

              <button
                onClick={() => navigateTo('admin-panel')}
                className="text-[11px] font-semibold text-slate-400 hover:text-teal-400 p-2 rounded-lg transition-colors flex items-center gap-1"
                title="بوابة الإدارة المركزية (Escrow)"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">الإدارة</span>
              </button>
            </div>
          )}

          {/* 2. FREELANCER (STUDENT) USER */}
          {currentRole === 'freelancer' && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('freelancer-overview')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                  activeScreen.startsWith('freelancer')
                    ? 'bg-teal-50 text-teal-800 border-teal-200'
                    : 'text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                لوحة المستقل
              </button>

              <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-bold">
                <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                <span>{freelancerUser.balanceYER.toLocaleString()} ر.ي</span>
              </div>

              <div className="flex items-center gap-2 border-r border-slate-200 pr-3">
                <img
                  src={freelancerUser.avatar}
                  alt={freelancerUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-teal-500"
                />
                <div className="text-right hidden md:block">
                  <span className="text-xs font-bold text-[#0B192C] block leading-none mb-0.5">
                    {freelancerUser.name}
                  </span>
                  <span className="text-[10px] text-teal-700 font-semibold block leading-none">
                    طالب موثق • {freelancerUser.university}
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg transition-colors"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 3. CLIENT USER */}
          {currentRole === 'client' && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('client-dashboard')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                  activeScreen === 'client-dashboard'
                    ? 'bg-teal-50 text-teal-800 border-teal-200'
                    : 'text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                لوحة العميل
              </button>

              <button
                onClick={() => openModal('create-project')}
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>نشر مشروع</span>
              </button>

              <div className="flex items-center gap-2 border-r border-slate-200 pr-3">
                <img
                  src={clientUser.avatar}
                  alt={clientUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-teal-500"
                />
                <div className="text-right hidden md:block">
                  <span className="text-xs font-bold text-[#0B192C] block leading-none mb-0.5">
                    {clientUser.name}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold block leading-none">
                    حساب عميل موثق
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg transition-colors"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 4. ADMIN USER */}
          {currentRole === 'admin' && (
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>الإدارة والوساطة المركزية</span>
              </div>

              <button
                onClick={() => navigateTo('admin-panel')}
                className="bg-[#0B192C] text-white hover:bg-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors"
              >
                بوابة التدقيق
              </button>

              <button
                onClick={logout}
                className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg transition-colors"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border ${
              isDark
                ? 'border-slate-700 text-white hover:bg-slate-800'
                : 'border-slate-200 text-slate-800 hover:bg-slate-50'
            }`}
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden px-4 pt-3 pb-6 border-t ${isDark ? 'bg-[#0B192C] border-slate-800' : 'bg-white border-slate-100'} space-y-3`}>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  navigateTo(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-right text-xs font-bold transition-colors ${
                  activeScreen === link.id
                    ? isDark ? 'bg-slate-800 text-teal-400' : 'bg-teal-50 text-teal-800'
                    : isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200/40 flex flex-col gap-2">
            {currentRole === 'guest' ? (
              <>
                <button
                  onClick={() => {
                    navigateTo('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  تسجيل الدخول
                </button>
                <button
                  onClick={() => {
                    navigateTo('role-selection');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 rounded-xl bg-[#0D9488] text-white text-xs font-bold"
                >
                  سجل كطالب / عميل
                </button>
                <button
                  onClick={() => {
                    navigateTo('admin-panel');
                    setMobileMenuOpen(false);
                  }}
                  className="text-center py-2 text-xs text-slate-400 font-semibold"
                >
                  بوابة الإدارة المركزية (Escrow)
                </button>
              </>
            ) : (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-600">
                  مسجل الدخول: {currentRole === 'freelancer' ? freelancerUser.name : currentRole === 'client' ? clientUser.name : 'المدير'}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-rose-600 text-xs font-bold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>خروج</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

