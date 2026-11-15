import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
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
  Sparkles
} from 'lucide-react';

export const LandingPage = () => {
  const { navigateTo, serviceCategories } = useWasla();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigateTo('services');
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
      {/* 1. Header (Navbar component with Dark Navy style) */}
      <Navbar variant="dark" />

      {/* 2. Hero Section (Dark Navy #0B192C) */}
      <section className="bg-[#0B192C] text-white pt-12 pb-20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          {/* MVP Station Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>محطة الإطلاق الأولى (MVP): المكلا • جامعة حضرموت والمجتمع التجاري المحلي</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            منصة <span className="text-teal-400">"وصلة"</span> - حل عمل حر مضمون
            <br />
            لطلاب وخريجي كليات <span className="text-teal-400">المكلا وجامعة حضرموت</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            نربط كفاءات طلاب جامعة حضرموت وكليات المكلا بأصحاب المحلات والمؤسسات التجارية ورواد الأعمال المحليين، مع وساطة مالية محلية آمنة (العمقي، الكريمي، بن دول، والبسيري) تضمن حقوق المستقل والتاجر.
          </p>

          {/* Localized Feature Highlights Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-[11px] sm:text-xs text-slate-300 mb-8 font-medium">
            <span className="bg-slate-800/80 border border-slate-700/80 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span>🏛️ كليات جامعة حضرموت (فلك، فوه، ومجمع الكليات)</span>
            </span>
            <span className="bg-slate-800/80 border border-slate-700/80 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span>🏪 محلات وأسواق المكلا (الشرج، الديس، الخور)</span>
            </span>
            <span className="bg-slate-800/80 border border-slate-700/80 px-3 py-1 rounded-full flex items-center gap-1.5 text-teal-300">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>وساطة مالية عبر العمقي، الكريمي، بن دول، والبسيري</span>
            </span>
          </div>

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
              placeholder="ابحث عن خدمات أو مستقلين في المكلا وحضرموت - وساطة صرافة معتمدة (العمقي / الكريمي / بن دول / البسيري)"
              className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400 font-medium"
            />
            <button
              type="submit"
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              بحث
            </button>
          </form>

          {/* 4-Step Workflow Bar ("كيف نعمل في المكلا؟") */}
          <div className="mt-16 pt-8 border-t border-slate-800/80">
            <h3 className="text-slate-300 text-sm font-bold mb-8">كيف نعمل في مجتمع المكلا وحضرموت المحلي؟</h3>
            <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
              {/* Step 1 */}
              <button
                type="button"
                onClick={() => navigateTo('client-dashboard')}
                className="flex flex-col items-center group cursor-pointer max-w-[110px] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-2 text-teal-400 group-hover:bg-teal-900/60 transition-colors">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-300 font-bold group-hover:text-teal-400 transition-colors mb-0.5">
                  طرح المشروع
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  متاجر وشركات المكلا
                </span>
              </button>

              <div className="text-slate-600 hidden sm:block">←</div>

              {/* Step 2 */}
              <button
                type="button"
                onClick={() => navigateTo('services')}
                className="flex flex-col items-center group cursor-pointer max-w-[110px] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-2 text-teal-400 group-hover:bg-teal-900/60 transition-colors">
                  <Laptop className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-300 font-bold group-hover:text-teal-400 transition-colors mb-0.5">
                  عروض الكفاءات
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  طلاب جامعة حضرموت
                </span>
              </button>

              <div className="text-slate-600 hidden sm:block">←</div>

              {/* Step 3 */}
              <button
                type="button"
                onClick={() => navigateTo('support')}
                className="flex flex-col items-center group cursor-pointer max-w-[110px] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-2 text-teal-400 group-hover:bg-teal-900/60 transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-300 font-bold group-hover:text-teal-400 transition-colors mb-0.5">
                  دفع محلي آمن
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  العمقي والكريمي وبن دول
                </span>
              </button>

              <div className="text-slate-600 hidden sm:block">←</div>

              {/* Step 4 */}
              <button
                type="button"
                onClick={() => navigateTo('support')}
                className="flex flex-col items-center group cursor-pointer max-w-[110px] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-2 text-teal-400 group-hover:bg-teal-900/60 transition-colors">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-300 font-bold group-hover:text-teal-400 transition-colors mb-0.5">
                  تسليم وتحرير
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  استلام برضا تام
                </span>
              </button>
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
                onClick={() => navigateTo('services')}
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold mb-3">
            <span>معايير الأمان المالي والزمني لمجتمع حضرموت والمكلا</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] mb-8">
            الضمانات والمميزات الحصرية لرواد الأعمال والطلاب
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Time Buffer */}
            <div
              onClick={() => navigateTo('support')}
              className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-center gap-4 text-right cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] border border-emerald-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0B192C] mb-1 group-hover:text-teal-700 transition-colors">
                  المدة الزمنية الإضافية (بروتوكول طوارئ الشبكة)
                </h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  حماية تلقائية لتقييم طلاب جامعة حضرموت في حال انقطاع الطاقة أو خطوط الاتصالات بالمكلا
                </p>
              </div>
            </div>

            {/* Card 2: Local Cash Escrow */}
            <div
              onClick={() => navigateTo('support')}
              className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-center gap-4 text-right cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] border border-emerald-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Wallet className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0B192C] mb-1 group-hover:text-teal-700 transition-colors">
                  وساطة نقدية محلية موثوقة (العمقي، الكريمي، بن دول، والبسيري)
                </h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  حجز أموال المشروع وصرفها عبر شبكات الصرافة الرائدة بحضرموت واليمن بضمان 100%
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Unified Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
