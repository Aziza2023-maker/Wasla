import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  Briefcase,
  KeyRound,
  AlertCircle
} from 'lucide-react';

export const LoginView = () => {
  const {
    navigateTo,
    addToast,
    setCurrentRole,
    login,
    isAuthenticated,
    currentRole
  } = useWasla();

  // Role Login Mode: 'freelancer' | 'client' | 'admin'
  const [loginRole, setLoginRole] = useState('freelancer');

  const [email, setEmail] = useState('arwa.alhamadi@su.edu.ye');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle switching role tabs and auto-fill matching credentials
  const handleRoleTabChange = (role) => {
    setLoginRole(role);
    setErrorMsg('');
    if (role === 'freelancer') {
      setEmail('arwa.alhamadi@su.edu.ye');
      setPassword('password123');
    } else if (role === 'client') {
      setEmail('shehab.saleh@madar.ye');
      setPassword('password123');
    } else if (role === 'admin') {
      setEmail('admin@wasla.ye');
      setPassword('admin2025');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('يرجى إدخال البريد الإلكتروني');
      return;
    }

    if (!password) {
      setErrorMsg('يرجى إدخال كلمة المرور');
      return;
    }

    // Role-based redirect logic with immediate synchronized authentication
    if (loginRole === 'admin' || email.includes('admin')) {
      login('admin');
      addToast(
        'تم تسجيل الدخول كمسؤول نظام',
        'مرحباً بك في بوابة الإدارة والرقابة المالية المركزية للتحقق من حوالات الكريمي والنجم.',
        'success',
        4000
      );
      navigateTo('admin-panel', 'admin');
    } else if (loginRole === 'client' || email.includes('client') || email.includes('shehab') || email.includes('madar')) {
      login('client');
      addToast(
        'تم تسجيل الدخول بنجاح!',
        'مرحباً بك يا شهاب صالح. تم توجيهك إلى لوحة العميل لإدارة طلبات الخدمات وعقود Escrow.',
        'success',
        4000
      );
      navigateTo('client-dashboard', 'client');
    } else {
      login('freelancer');
      addToast(
        'تم تسجيل الدخول بنجاح!',
        'مرحباً م. أروى الحمادي. تم توجيهك إلى لوحة المستقل الأكاديمي وسوق الخدمات.',
        'success',
        4000
      );
      navigateTo('freelancer-overview', 'freelancer');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans" dir="rtl">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <WaslaLogo
            variant="dark"
            size="md"
            subTitle="بوابة العمل الحر الأكاديمي والوساطة المالية"
            onClick={() => navigateTo('landing')}
          />

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-500 font-medium">
            <button onClick={() => navigateTo('services')} className="hover:text-slate-900 transition-colors">
              تصفح الخدمات
            </button>
            <button onClick={() => navigateTo('freelancers')} className="hover:text-slate-900 transition-colors">
              المستقلون المعتمدون
            </button>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-900 transition-colors">
              ضمان المعاملات Escrow
            </button>
            <button onClick={() => navigateTo('community')} className="hover:text-slate-900 transition-colors">
              ملتقى الجامعات
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">ليس لديك حساب بعد؟</span>
            <button
              onClick={() => navigateTo('register')}
              className="text-teal-600 hover:text-teal-700 font-bold text-xs border border-teal-200 bg-teal-50 px-3.5 py-1.5 rounded-lg transition-colors"
            >
              إنشاء حساب جديد
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Screen */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Form Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              {/* Header Icon */}
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mb-5 text-teal-700">
                <Lock className="w-6 h-6" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] mb-1">تسجيل الدخول</h2>
              <p className="text-xs text-slate-400 font-normal mb-6 leading-relaxed">
                حدد دورك وأدخل بيانات حسابك للوصول المباشر إلى لوحة التحكم
              </p>

              {/* Already authenticated banner */}
              {isAuthenticated && currentRole !== 'guest' && (
                <div className="mb-6 p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>أنت مسجل حالياً بحساب <strong>{currentRole === 'client' ? 'عميل' : currentRole === 'freelancer' ? 'طالب مستقل' : 'مسؤول إداري'}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo(currentRole === 'client' ? 'client-dashboard' : currentRole === 'freelancer' ? 'freelancer-overview' : 'admin-panel')}
                    className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-3 py-1.5 rounded-lg font-bold text-xs transition-colors shrink-0 shadow-xs"
                  >
                    الذهاب للوحة التحكم
                  </button>
                </div>
              )}

              {/* ROLE SWITCHER TABS */}
              <div className="mb-6 p-1 bg-slate-100 rounded-2xl flex items-center gap-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => handleRoleTabChange('freelancer')}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    loginRole === 'freelancer'
                      ? 'bg-white text-[#0B192C] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-teal-600" />
                  <span>طالب مستقل</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleTabChange('client')}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    loginRole === 'client'
                      ? 'bg-white text-[#0B192C] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <span>صاحب عمل</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleTabChange('admin')}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    loginRole === 'admin'
                      ? 'bg-white text-purple-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5 text-purple-600" />
                  <span>الإدارة</span>
                </button>
              </div>

              {/* Error Banner */}
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#0B192C] mb-1">
                    البريد الإلكتروني <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all font-medium pl-10"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#0B192C]">
                      كلمة المرور <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => navigateTo('forgot-password')}
                      className="text-[11px] font-semibold text-teal-600 hover:underline"
                    >
                      هل نسيت كلمة المرور؟
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all font-medium pl-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-teal-600 rounded border-slate-300"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-600 font-medium cursor-pointer">
                    تذكر تسجيل دخولي على هذا الجهاز
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <span>
                    {loginRole === 'freelancer'
                      ? 'الدخول إلى لوحة المستقل الأكاديمي'
                      : loginRole === 'client'
                      ? 'الدخول إلى لوحة العميل وإدارة الطلبات'
                      : 'الدخول إلى بوابة الإدارة والوساطة'}
                  </span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Bottom Register Link */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              <span>ليس لديك حساب بعد؟ </span>
              <button
                onClick={() => navigateTo('register')}
                className="text-teal-600 font-bold hover:underline"
              >
                إنشاء حساب جديد
              </button>
            </div>
          </div>

          {/* Right Dark Navy Panel */}
          <div className="lg:col-span-6 bg-[#0B192C] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-teal-300 text-xs font-semibold mb-6">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>وساطة مالية محلية آمنة (Escrow)</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-black leading-snug mb-3">
                بوابتك الرقمية الموثوقة
                <br />
                <span className="text-teal-400">للأعمال الحرة في اليمن</span>
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed font-normal mb-8">
                تحويلات مالية آمنة ومضمونة عبر بنك الكريمي وشبكة النجم، مع التزام تام بحماية حقوق الطلاب الجامعيين وأصحاب الأعمال.
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white block">حسابات وبطاقات جامعية موثقة</span>
                    <span className="text-[10px] text-slate-400">تدقيق إداري دوري لشهادات وبطاقات الطلاب</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white block">حماية الهامش الزمني للطوارئ</span>
                    <span className="text-[10px] text-slate-400">+48 ساعة تسليم آمن دون التأثير على التقييم الأكاديمي</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Demo Credentials Footer */}
            <div className="relative z-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-3 text-center">
              <span className="text-[11px] text-slate-400 font-semibold block mb-2">
                حسابات المعاينة السريعة بنقرة واحدة:
              </span>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleRoleTabChange('freelancer')}
                  className="text-[10px] bg-teal-950 text-teal-300 border border-teal-800/80 px-2.5 py-1 rounded-lg font-bold hover:bg-teal-900 transition-colors"
                >
                  طالب: أروى الحمادي
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleTabChange('client')}
                  className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2.5 py-1 rounded-lg font-bold hover:bg-emerald-900 transition-colors"
                >
                  عميل: شهاب صالح
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleTabChange('admin')}
                  className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800/80 px-2.5 py-1 rounded-lg font-bold hover:bg-purple-900 transition-colors"
                >
                  المدير: مسؤول Escrow
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منصة وصلة © 2026 جميع الحقوق محفوظة</span>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => navigateTo('support')} className="hover:text-slate-600">سياسة الخصوصية</button>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-600">شروط الاستخدام</button>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-600">الدعم الفني والوساطة</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginView;
