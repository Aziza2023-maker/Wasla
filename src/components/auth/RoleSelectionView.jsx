import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import {
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Check,
  ShieldCheck,
  Award,
  ArrowRight,
  ArrowLeft,
  Info
} from 'lucide-react';

export const RoleSelectionView = () => {
  const { navigateTo, selectedRoleSignup, setSelectedRoleSignup, addToast } = useWasla();

  const handleContinue = () => {
    if (selectedRoleSignup === 'client') {
      addToast('تم اختيار حساب العميل', 'مرحباً بك! يمكنك الآن نشر المشاريع وإدارة عقود الوساطة المالية.');
      navigateTo('client-dashboard');
    } else {
      addToast('تم اختيار حساب المستقل الأكاديمي', 'مرحباً بك! يمكنك استعراض سوق العمل وبدء توثيق هويتك الجامعية.');
      navigateTo('freelancer-overview');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans" dir="rtl">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <WaslaLogo variant="dark" size="md" onClick={() => navigateTo('landing')} />

          {/* Stepper (1 اختيار الدور - 2 بيانات الحساب - 3 التوثيق الأكاديمي) */}
          <div className="hidden md:flex items-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2 text-teal-700 font-bold">
              <span className="w-6 h-6 rounded-full bg-[#0B192C] text-white flex items-center justify-center text-xs">
                1
              </span>
              <span>اختيار الدور</span>
            </div>
            <div className="w-8 h-px bg-slate-200" />
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center text-xs">
                2
              </span>
              <span>بيانات الحساب</span>
            </div>
            <div className="w-8 h-px bg-slate-200" />
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center text-xs">
                3
              </span>
              <span>التوثيق الأكاديمي</span>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            <span>لديك حساب بالفعل؟ </span>
            <button
              onClick={() => navigateTo('login')}
              className="text-teal-600 font-bold hover:underline"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
        {/* Step Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>الخطوة الأولى للبدء في المنصة</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B192C] text-center mb-3">
          اختر نوع حسابك في منصة وصلة
        </h1>
        <p className="text-sm text-slate-500 text-center max-w-lg mb-10 leading-relaxed font-normal">
          خصص تجربتك بالكامل. ستمكنك المنصة من الوصول للأدوات واللوحات المتوافقة مع احتياجك.
        </p>

        {/* Two Interactive Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
          {/* 1. Client Card */}
          <div
            onClick={() => setSelectedRoleSignup('client')}
            className={`relative rounded-2xl p-6 sm:p-8 bg-white transition-all cursor-pointer border-2 flex flex-col justify-between ${
              selectedRoleSignup === 'client'
                ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                : 'border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            {selectedRoleSignup === 'client' && (
              <div className="absolute top-5 right-5 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>تم الاختيار</span>
              </div>
            )}

            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-emerald-600" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-black text-[#0B192C]">عميل</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  صاحب عمل أو شركة
                </span>
              </div>

              <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6">
                وظف أفضل الكفاءات الجامعية الواعدة والمستقلين المحترفين لتنفيذ مشاريعك بجودة عالية وتكلفة مناسبة.
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-100 mb-8">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>نظام دفع معلق (Escrow) محمي بنسبة 100%</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>نشر عدد غير محدود من المشاريع والمسابقات</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>عقود قانونية وفواتير ضريبية معتمدة</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                selectedRoleSignup === 'client'
                  ? 'bg-[#0D9488] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {selectedRoleSignup === 'client' ? 'محدد حالياً' : 'اختيار حساب عميل'}
            </button>
          </div>

          {/* 2. Freelancer / Student Card */}
          <div
            onClick={() => setSelectedRoleSignup('freelancer')}
            className={`relative rounded-2xl p-6 sm:p-8 bg-white transition-all cursor-pointer border-2 flex flex-col justify-between ${
              selectedRoleSignup === 'freelancer'
                ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                : 'border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            {selectedRoleSignup === 'freelancer' && (
              <div className="absolute top-5 right-5 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>تم الاختيار</span>
              </div>
            )}

            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-black text-[#0B192C]">مستقل</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  طالب أو خريج
                </span>
              </div>

              <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6">
                استثمر خبراتك ومهاراتك الأكاديمية في تقديم خدمات احترافية للعملاء، وكسب عوائد مالية مجزية بإشراف جامعتك.
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-100 mb-8">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>توثيق الهوية الجامعية وساعات التدريب</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>معرض أعمال شخصي مع تقييمات موثوقة</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>سحب مالي فوري وضمان كامل للحقوق</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                selectedRoleSignup === 'freelancer'
                  ? 'bg-[#0D9488] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {selectedRoleSignup === 'freelancer' ? 'محدد حالياً' : 'اختيار حساب مستقل'}
            </button>
          </div>
        </div>

        {/* Bottom Notice Banner */}
        <div className="w-full max-w-4xl bg-slate-100/80 rounded-xl p-3 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600 mb-8 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-400" />
            <span>يمكنك لاحقاً إضافة أدوار إضافية أو التبديل بين الحسابات من خلال لوحة التحكم بنقرة واحدة.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              تشفير بيانات آمن
            </span>
            <span className="flex items-center gap-1 text-blue-700">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              معتمد أكاديمياً
            </span>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="w-full max-w-4xl flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <span>العودة للخطوة السابقة</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-slate-400 block font-normal">الدور المحدد حالياً</span>
              <span className="text-xs font-bold text-[#0B192C]">
                {selectedRoleSignup === 'client' ? 'عميل (صاحب عمل أو شركة)' : 'مستقل (طالب أو خريج)'}
              </span>
            </div>

            <button
              onClick={handleContinue}
              className="bg-[#0B192C] hover:bg-[#0F2137] text-white px-7 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>متابعة التسجيل</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoleSelectionView;

