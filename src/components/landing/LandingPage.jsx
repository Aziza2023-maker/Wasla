import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import {
  Search,
  Code2,
  Palette,
  FileText,
  TrendingUp,
  BarChart3,
  GraduationCap,
  BookOpen,
  Target,
  Clock,
  Wallet,
  ShieldCheck,
  CheckCircle,
  Laptop,
  ClipboardList,
  ArrowLeft,
  ChevronLeft,
  Sparkles,
  Building2,
  Users
} from 'lucide-react';

export const LandingPage = () => {
  const { navigateTo, serviceCategories } = useWasla();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigateTo('freelancer-jobs');
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-7 h-7 text-teal-600" />;
      case 'Palette':
        return <Palette className="w-7 h-7 text-amber-500" />;
      case 'FileText':
        return <FileText className="w-7 h-7 text-amber-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-7 h-7 text-amber-500" />;
      case 'BarChart3':
        return <BarChart3 className="w-7 h-7 text-amber-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-7 h-7 text-amber-500" />;
      case 'BookOpen':
        return <BookOpen className="w-7 h-7 text-amber-500" />;
      case 'Target':
        return <Target className="w-7 h-7 text-amber-500" />;
      default:
        return <Sparkles className="w-7 h-7 text-teal-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans" dir="rtl">
      {/* 1. Header (Dark Navy #0B192C) */}
      <header className="bg-[#0B192C] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <WaslaLogo variant="light" size="md" onClick={() => navigateTo('landing')} />

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300 font-medium">
              <button onClick={() => navigateTo('landing')} className="hover:text-white transition-colors">
                المجتمع
              </button>
              <button onClick={() => navigateTo('student-alt')} className="hover:text-white transition-colors">
                المستقلين
              </button>
              <button onClick={() => navigateTo('freelancer-jobs')} className="hover:text-white transition-colors">
                الخدمات
              </button>
              <button onClick={() => navigateTo('admin-panel')} className="hover:text-white transition-colors">
                الدعم والوساطة
              </button>
            </nav>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('login')}
              className="text-sm font-semibold text-slate-200 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => navigateTo('role-selection')}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>سجل كطالب</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Dark Navy #0B192C) */}
      <section className="bg-[#0B192C] text-white pt-14 pb-20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            منصة <span className="text-teal-400">"وصلة"</span> - حل عمل حر مضمون
            <br />
            للطلاب والكليات في اليمن
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            نربطك بأفضل الكفاءات والمبدعين مع وساطة صرافة محلية آمنة ومضمونة للأكاديمي والتاجر.
          </p>

          {/* Integrated Search Bar */}
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto bg-white rounded-xl p-2 shadow-2xl flex items-center gap-2 border border-slate-200 text-slate-800"
          >
            <div className="pr-3 pl-1 text-slate-400">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن خدمات أو مستقلين - وساطة صرافة محلية آمنة (الكريمي/النجم)"
              className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400 font-medium"
            />
            <button
              type="submit"
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              بحث
            </button>
          </form>

          {/* 4-Step Workflow Bar ("كيف نعمل؟") */}
          <div className="mt-16 pt-8 border-t border-slate-800/80">
            <h3 className="text-slate-300 text-sm font-bold mb-8">كيف نعمل؟</h3>
            <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-2 text-slate-300">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-300 font-medium">طلب مشروع</span>
              </div>

              <div className="text-slate-600 hidden sm:block">←</div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-2 text-slate-300">
                  <Laptop className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-300 font-medium">عمل حر</span>
              </div>

              <div className="text-slate-600 hidden sm:block">←</div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-2 text-teal-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-300 font-medium">دفع محلي آمن</span>
              </div>

              <div className="text-slate-600 hidden sm:block">←</div>

              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-2 text-teal-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-300 font-medium">تسليم مضمون</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Service Categories Section (تصنيفات الخدمات والمهارات) */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] mb-3">
              تصنيفات الخدمات والمهارات
            </h2>
            <div className="w-12 h-1 bg-teal-500 mx-auto rounded-full" />
          </div>

          {/* 8 Cards in 4x2 grid matching mockup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {serviceCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigateTo('freelancer-jobs')}
                className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-400 transition-all text-center flex flex-col items-center justify-center cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(cat.icon)}
                </div>
                <h3 className="font-bold text-base text-[#0B192C] mb-1.5 group-hover:text-teal-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Exclusive Guarantees Section (الضمانات والمميزات الحصرية) */}
      <section className="py-12 bg-[#F1F5F9]/60 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] mb-8">
            الضمانات والمميزات الحصرية
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Time Buffer */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 text-right">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] border border-emerald-200 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0B192C] mb-1">
                  المدة الزمنية الإضافية (هامش زمني)
                </h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  حماية إضافية تضمن إنجاز المهام ومراجعتها بدون أي تأخير أكاديمي
                </p>
              </div>
            </div>

            {/* Card 2: Local Cash Escrow */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 text-right">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] border border-emerald-200 flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0B192C] mb-1">
                  وساطة نقدية محلية موثوقة
                </h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  تحويلات مالية آمنة ومضمونة عبر الكريمي والنجم وكافة البنوك المحلية
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer (Dark Navy #0B192C) */}
      <footer className="bg-[#0B192C] text-slate-400 py-6 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span>منصة وصلة - جميع الحقوق محفوظة © 2025</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <button onClick={() => navigateTo('admin-panel')} className="hover:text-white transition-colors">
              وساطة الضمان المالي
            </button>
            <button onClick={() => navigateTo('landing')} className="hover:text-white transition-colors">
              سياسة الخصوصية
            </button>
            <button onClick={() => navigateTo('landing')} className="hover:text-white transition-colors">
              الشروط والأحكام
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

