import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import {
  User,
  Mail,
  Lock,
  ArrowLeft,
  ShieldCheck,
  Zap,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export const RegisterView = () => {
  const { navigateTo, addToast, selectedRoleSignup } = useWasla();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      addToast('يرجى الموافقة على الشروط', 'يجب الموافقة على شروط الخدمة وسياسة الخصوصية للمتابعة.', 'warning');
      return;
    }

    addToast(
      'تم إنشاء الحساب بنجاح!',
      `مرحباً بك يا ${fullName || 'عزيزنا'}. سيتم توجيهك إلى شاشة التوثيق واختيار لوحة التحكم.`,
      'success',
      4000
    );

    if (selectedRoleSignup === 'client') {
      navigateTo('client-dashboard');
    } else {
      navigateTo('freelancer-overview');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans" dir="rtl">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <WaslaLogo
            variant="dark"
            size="md"
            subTitle="منصة الكفاءات والفرص الجامعية"
            onClick={() => navigateTo('landing')}
          />

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-500 font-medium">
            <button onClick={() => navigateTo('landing')} className="hover:text-slate-900 transition-colors">
              عن المنصة
            </button>
            <button onClick={() => navigateTo('freelancer-jobs')} className="hover:text-slate-900 transition-colors">
              المشاريع المتاحة
            </button>
            <button onClick={() => navigateTo('landing')} className="hover:text-slate-900 transition-colors">
              الجامعات الشريكة
            </button>
            <button onClick={() => navigateTo('admin-panel')} className="hover:text-slate-900 transition-colors">
              مركز المساعدة
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">لديك حساب مسجل بالفعل؟</span>
            <button
              onClick={() => navigateTo('login')}
              className="text-teal-600 hover:text-teal-700 font-bold text-xs border border-teal-200 bg-teal-50 px-3.5 py-1.5 rounded-lg transition-colors"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Screen */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Form Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-teal-700 font-bold mb-3">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span>حساب جديد</span>
              </div>

              <h2 className="text-2xl font-black text-[#0B192C] mb-2">
                إنشاء حساب في منصة وصلة
              </h2>
              <p className="text-xs text-slate-400 font-normal mb-8 leading-relaxed">
                أدخل بياناتك للانضمام فوراً إلى المنصة وتحديد مسارك المهني أو الأكاديمي.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-[#0B192C] mb-1.5">
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: عبدالله محمد الأحمد"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all font-medium pl-10"
                      required
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#0B192C] mb-1.5">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@university.edu"
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
                      كلمة المرور
                    </label>
                    <span className="text-[10px] text-slate-400 font-normal">8 أحرف كحد أدنى</span>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all font-medium pl-10"
                      required
                      minLength={8}
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                {/* Terms agreement */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-teal-600 rounded border-slate-300"
                  />
                  <label htmlFor="terms" className="text-[11px] text-slate-600 font-normal leading-relaxed cursor-pointer">
                    أوافق على <span className="font-semibold text-teal-700 underline">شروط الخدمة</span> و{' '}
                    <span className="font-semibold text-teal-700 underline">سياسة الخصوصية</span> الخاصة بمنصة وصلة.
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#0B192C] hover:bg-[#0F2137] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <span>إنشاء حساب</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Bottom link */}
            <div className="mt-8 text-center text-xs text-slate-500">
              <span>لديك حساب مسجل بالفعل؟ </span>
              <button
                onClick={() => navigateTo('login')}
                className="text-teal-600 font-bold hover:underline"
              >
                تسجيل الدخول
              </button>
            </div>
          </div>

          {/* Right Dark Navy Panel */}
          <div className="lg:col-span-6 bg-[#0B192C] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-teal-300 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>مجتمع أكاديمي ومهني موثوق</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-black leading-snug mb-3">
                جسرِك المتين نحو
                <br />
                <span className="text-teal-400">مستقبل مهني واعد</span>
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed font-normal mb-8">
                انضم إلى آلاف الطلاب والمستقلين، وأصحاب المشاريع والجامعات في بيئة تفاعلية آمنة تجمع بين التميز الأكاديمي وفرص العمل الحقيقية.
              </p>

              {/* 2 Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-right">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-2">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-white mb-1">هويات وتراخيص موثوقة</h4>
                  <p className="text-[10px] text-slate-400 font-normal leading-relaxed">
                    ضمان حقوق الأطراف وربط تلقائي مع الجامعات
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-right">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-2">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-white mb-1">فرص عمل ومشاريع حقيقية</h4>
                  <p className="text-[10px] text-slate-400 font-normal leading-relaxed">
                    تناسب الطلاب والخريجين وأصحاب الأعمال
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="relative z-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600/30 border border-teal-500/50 flex items-center justify-center shrink-0 text-teal-300">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-200 font-medium italic mb-1">
                  "وفرت منصة وصلة لطلابنا فرص عمل تطبيقية موثوقة وأمان مالي متكامل قبل التخرج."
                </p>
                <span className="text-[10px] text-teal-400 font-bold block">
                  عمادة شؤون الطلاب - التعاون الأكاديمي
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منصة وصلة © 2025 جميع الحقوق محفوظة</span>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => navigateTo('landing')} className="hover:text-slate-600">سياسة الخصوصية</button>
            <button onClick={() => navigateTo('landing')} className="hover:text-slate-600">شروط الاستخدام</button>
            <button onClick={() => navigateTo('admin-panel')} className="hover:text-slate-600">الدعم الفني</button>
            <button onClick={() => navigateTo('landing')} className="hover:text-slate-600">الأسئلة الشائعة</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterView;

