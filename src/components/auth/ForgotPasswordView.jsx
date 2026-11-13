import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import {
  RotateCcw,
  Mail,
  Send,
  ArrowRight,
  ShieldCheck,
  Scale,
  Headphones,
  Lock,
  HelpCircle,
  Info,
  CheckCircle2
} from 'lucide-react';

export const ForgotPasswordView = () => {
  const { navigateTo, addToast } = useWasla();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast(
      'تم إرسال رابط الاستعادة!',
      `تم إرسال تعليمات إعادة تعيين كلمة المرور إلى ${email || 'بريدك الإلكتروني'}. يرجى التحقق من صندوق الوارد.`,
      'success',
      6000
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans" dir="rtl">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <WaslaLogo
            variant="dark"
            size="md"
            subtitleText="منصة الضمان والوساطة الرقمية الموثوقة"
            onClick={() => navigateTo('landing')}
          />

          <div className="flex items-center gap-6 text-xs text-slate-600 font-medium">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>حسابات ضمان بنكية مرخصة</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-500">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>تشفير بيانات فائق الأمان bit-256</span>
            </div>

            <button
              onClick={() => navigateTo('admin-panel')}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>مركز المساعدة</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Centered Box */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-md text-center">
          {/* Circular Dark Icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#0B192C] text-white flex items-center justify-center mx-auto mb-6 shadow-md">
            <RotateCcw className="w-6 h-6 text-teal-400" />
          </div>

          <h2 className="text-2xl font-black text-[#0B192C] mb-2">استعادة كلمة المرور</h2>
          <p className="text-xs text-slate-400 font-normal mb-6 leading-relaxed">
            أدخل بريدك الإلكتروني المسجل في منصة وصلة، وسنرسل لك رابطاً مشفراً لإعادة ضبط كلمة المرور بأمان.
          </p>

          {/* Light Blue Notice */}
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3.5 text-right flex items-start gap-2.5 mb-6 text-xs text-sky-800">
            <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p className="font-normal text-[11px] leading-relaxed">
              لأمان حسابك، لا تشارك رابط الاستعادة مع أي شخص. موظفو منصة وصلة لن يطلبوا منك كلمة المرور أبداً.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 text-right">
            <div>
              <label className="block text-xs font-bold text-[#0B192C] mb-1.5">
                البريد الإلكتروني المسجل
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all font-medium pl-10"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0B192C] hover:bg-[#0F2137] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>إرسال رابط الاستعادة</span>
              <Send className="w-4 h-4 text-teal-400 rotate-180" />
            </button>
          </form>

          {/* Return to login link */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => navigateTo('login')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى تسجيل الدخول</span>
            </button>
          </div>
        </div>

        {/* Bottom 3 Trust Cards */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <ShieldCheck className="w-5 h-5 text-teal-600 mb-1.5" />
            <h4 className="font-bold text-xs text-[#0B192C] mb-0.5">حماية أموالك</h4>
            <span className="text-[10px] text-slate-400 font-normal">حجز المبلغ حتى الرضا</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <Scale className="w-5 h-5 text-teal-600 mb-1.5" />
            <h4 className="font-bold text-xs text-[#0B192C] mb-0.5">فض النزاعات</h4>
            <span className="text-[10px] text-slate-400 font-normal">تحكيم عادل ومستقل</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <Headphones className="w-5 h-5 text-teal-600 mb-1.5" />
            <h4 className="font-bold text-xs text-[#0B192C] mb-0.5">دعم متواصل</h4>
            <span className="text-[10px] text-slate-400 font-normal">خدمة عملاء على مدار الساعة</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>جميع الأنظمة تعمل بكفاءة وأمان عالي</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>شروط الاستخدام</span>
            <span>•</span>
            <span>سياسة الخصوصية</span>
            <span>•</span>
            <span>اتفاقية الضمان المالي</span>
            <span>•</span>
            <span>تواصل معنا</span>
            <span>•</span>
            <span>جميع الحقوق محفوظة © منصة وصلة 2025</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPasswordView;

