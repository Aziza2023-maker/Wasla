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
  Percent,
  Check
} from 'lucide-react';

export const LoginView = () => {
  const { navigateTo, addToast } = useWasla();
  const [email, setEmail] = useState('student@university.edu');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes('student') || email.includes('arwa') || email.includes('edu')) {
      addToast('تم تسجيل الدخول بنجاح!', 'مرحباً م. أروى الحمادي. تم تحميل لوحة تحكم المستقل والأداء الأكاديمي.');
      navigateTo('freelancer-overview');
    } else {
      addToast('تم تسجيل الدخول بنجاح!', 'مرحباً شهاب صالح. تم تحميل لوحة تحكم العميل وإدارة العقود.');
      navigateTo('client-dashboard');
    }
  };

  const handleQuickAcademicLogin = () => {
    setEmail('arwa.alhamadi@su.edu.ye');
    addToast('تم التحقق عبر البريد الأكاديمي!', 'مرحباً م. أروى الحمادي (جامعة صنعاء).');
    navigateTo('freelancer-overview');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans" dir="rtl">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <WaslaLogo variant="dark" size="md" onClick={() => navigateTo('landing')} />

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-500 font-medium">
            <button onClick={() => navigateTo('freelancer-jobs')} className="hover:text-slate-900 transition-colors">
              تصفح المشاريع
            </button>
            <button onClick={() => navigateTo('student-alt')} className="hover:text-slate-900 transition-colors">
              المستقلون المعتمدون
            </button>
            <button onClick={() => navigateTo('admin-panel')} className="hover:text-slate-900 transition-colors">
              ضمان المعاملات المالية
            </button>
            <button onClick={() => navigateTo('landing')} className="hover:text-slate-900 transition-colors">
              شركاء الجامعات
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">هل تبحث عن خدمات مستقلين؟</span>
            <button
              onClick={() => navigateTo('role-selection')}
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
          {/* Left: Form Card (7 cols on lg) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              {/* Header Icon */}
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-teal-600" />
              </div>

              <h2 className="text-2xl font-black text-[#0B192C] mb-2">تسجيل الدخول</h2>
              <p className="text-xs text-slate-400 font-normal mb-8 leading-relaxed">
                أدخل بيانات حسابك للمتابعة والوصول إلى لوحة التحكم
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#0B192C] mb-1.5">
                    البريد الإلكتروني <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all font-medium pl-10"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all font-medium pl-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3.5 text-slate-400 hover:text-slate-600"
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
                  className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>تسجيل الدخول</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Login Options */}
              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-400 bg-white px-3 relative -top-8 font-medium">
                  أو المتابعة السريعة
                </span>

                <div className="grid grid-cols-2 gap-3 -mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      addToast('تسجيل دخول تجريبي', 'تم الدخول بحساب Google');
                      navigateTo('client-dashboard');
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>حساب Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickAcademicLogin}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-teal-200 bg-teal-50/50 text-xs font-semibold text-teal-800 hover:bg-teal-100/50 transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-teal-700" />
                    <span>البريد الأكاديمي</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom link */}
            <div className="mt-8 text-center text-xs text-slate-500">
              <span>ليس لديك حساب على وصلة؟ </span>
              <button
                onClick={() => navigateTo('role-selection')}
                className="text-teal-600 font-bold hover:underline"
              >
                إنشاء حساب جديد مجاناً
              </button>
            </div>
          </div>

          {/* Right: Dark Navy Value Proposition Panel (6 cols on lg) */}
          <div className="lg:col-span-6 bg-[#0B192C] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Subtle radial glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-teal-300 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>المنصة الأولى المعتمدة للعمل الحر في اليمن</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-black leading-snug mb-3">
                وصولك المباشر لكفاءات
                <br />
                <span className="text-teal-400">الشباب اليمني</span>
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed font-normal mb-8">
                سجل دخولك وأدر مشاريعك، صفقاتك، وأرباحك بكل سهولة وأمان ضمن بيئة موثوقة تجمع الطلاب والمبدعين برواد الأعمال وأصحاب الشركات.
              </p>

              {/* 3 Value Cards */}
              <div className="space-y-3 mb-8">
                {/* 1 */}
                <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white mb-0.5">توثيق جامعي أكاديمي</h4>
                    <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                      تحقق رسمي من وثائق الطلاب وهوياتهم لضمان مخرجات احترافية.
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white mb-0.5">ضمان مالي Escrow</h4>
                    <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                      تحويلات محلية مضمونة مع بنك الكريمي، النجم، وجيب (Jeeb).
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white mb-0.5">عمولة طلابية رمزية</h4>
                    <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                      دعم مباشر للشباب الجامعي بأقل رسوم وأسرع استلام للأرباح.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof & Local Payment Badge */}
            <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5 space-x-reverse">
                  <div className="w-7 h-7 rounded-full bg-teal-600 border-2 border-[#0B192C] flex items-center justify-center text-[10px] font-bold">ص</div>
                  <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-[#0B192C] flex items-center justify-center text-[10px] font-bold">ع</div>
                  <div className="w-7 h-7 rounded-full bg-amber-600 border-2 border-[#0B192C] flex items-center justify-center text-[10px] font-bold">ت</div>
                  <div className="w-7 h-7 rounded-full bg-purple-600 border-2 border-[#0B192C] flex items-center justify-center text-[9px] font-bold">+4k</div>
                </div>
                <div>
                  <span className="font-bold text-white block text-[11px]">+4,000 مستقل نشط</span>
                  <span className="text-[10px] text-slate-400 font-normal">من جامعات مختلفة</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-teal-400 text-[11px] font-semibold bg-teal-950/60 px-3 py-1.5 rounded-full border border-teal-800/40">
                <Check className="w-3.5 h-3.5" />
                <span>بوابات دفع محلية معتمدة</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منصة وصلة اليمن © 2025. جميع الحقوق محفوظة لرواد الأعمال والطلاب اليمنيين.</span>
          <div className="flex items-center gap-4 text-xs">
            <span>صنعاء • عدن • تعز • حضرموت</span>
            <span>•</span>
            <button onClick={() => navigateTo('admin-panel')} className="hover:text-slate-600">
              مركز المساعدة والدعم الفني
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginView;

