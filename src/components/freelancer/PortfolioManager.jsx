import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import {
  Layers,
  Plus,
  Eye,
  CheckCircle2,
  Star,
  Clock,
  ShieldCheck,
  Zap,
  Wifi,
  Sun,
  Share2,
  Search,
  LayoutGrid,
  FileCode,
  ExternalLink,
  ChevronLeft,
  Sparkles,
  Download
} from 'lucide-react';

export const PortfolioManager = () => {
  const { portfolioProjects, freelancerUser, openModal, addToast } = useWasla();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = portfolioProjects.filter((prj) => {
    const matchesCat =
      selectedCategory === 'all' ||
      (selectedCategory === 'web' && prj.category === 'تطوير الويب') ||
      (selectedCategory === 'mobile' && prj.category === 'تطبيقات الموبايل') ||
      (selectedCategory === 'ai' && prj.category === 'الذكاء الاصطناعي وبحوث التخرج') ||
      (selectedCategory === 'uiux' && prj.category === 'تصميم واجهات UI/UX');

    const matchesSearch =
      prj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      {/* 1. Top Header Banner with Stats & Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Right: Portfolio Info & Stats Banner (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#0B192C]">
                  معرض الأعمال والمشاريع البرمجية المنجزة
                </h1>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 flex-wrap">
                  <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    معتمد للعام الأكاديمي 2024-2025
                  </span>
                  <span>•</span>
                  <span>{freelancerUser.university} - {freelancerUser.faculty}</span>
                </div>
              </div>

              <button
                onClick={() => openModal('add-portfolio-item')}
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة مشروع جديد</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6">
              استعرض مشاريعك البرمجية والنماذج الأولية الموثقة أكاديمياً، والتي يمكن للعملاء المحليين والإقليميين معاينتها وطلب التعاقد الفوري عبر ضمان وساطة الكريمي والنجم.
            </p>
          </div>

          {/* 4 Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">مشاهدات المعرض</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <span className="font-black text-sm text-[#0B192C]">1,482</span>
                <span className="text-[9px] text-emerald-600 font-bold">80%+</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">مشاريع معتمدة</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <span className="font-black text-sm text-[#0B192C]">8 من أصل 9</span>
                <ShieldCheck className="w-3 h-3 text-teal-600" />
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">متوسط تقييم الأعمال</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <span className="font-black text-sm text-amber-600">4.9 ★</span>
                <span className="text-[9px] text-slate-400">(34 عميل)</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">هامش إنجاز طوارئ</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <span className="font-black text-sm text-emerald-700">99.1%</span>
                <span className="text-[9px] text-slate-400">التزام</span>
              </div>
            </div>
          </div>
        </div>

        {/* Left: Infrastructure & Student Power Readiness Card (4 cols) */}
        <div className="lg:col-span-4 bg-[#0B192C] text-white rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-teal-400">
                  <img
                    src={freelancerUser.avatar}
                    alt={freelancerUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">{freelancerUser.name}</h3>
                  <span className="text-[10px] text-slate-300 font-normal">
                    {freelancerUser.shortTitle}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                جاهز للعمل
              </span>
            </div>

            {/* Power & Network Readiness */}
            <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs">
              <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px]">جاهزية الطاقة الاحتياطية (سولار)</span>
                </div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded">
                  100% مؤكدة
                </span>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Wifi className="w-4 h-4 text-teal-400" />
                  <span className="text-[11px]">خط إنترنت ألياف ضوئية + 4G بديل</span>
                </div>
                <span className="text-[10px] font-bold text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded">
                  نشط الآن
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              addToast('تم نسخ الرابط العام للمعرض', 'يمكنك الآن مشاركته مع أصحاب الشركات والعملاء المحليين.');
            }}
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-slate-700"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة رابط المعرض العام</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#0D9488] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            جميع المشاريع ({portfolioProjects.length})
          </button>
          <button
            onClick={() => setSelectedCategory('web')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'web'
                ? 'bg-[#0D9488] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            تطوير الويب (2)
          </button>
          <button
            onClick={() => setSelectedCategory('mobile')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'mobile'
                ? 'bg-[#0D9488] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            تطبيقات الموبايل (1)
          </button>
          <button
            onClick={() => setSelectedCategory('ai')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'ai'
                ? 'bg-[#0D9488] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            الذكاء الاصطناعي وبحوث التخرج (3)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المشروع أو التقنية..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
        </div>
      </div>

      {/* 3. Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-md hover:border-teal-400 transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Image Preview with Header Badge */}
              <div className="h-44 bg-slate-100 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0B192C]/90 text-white backdrop-blur-xs border border-white/10">
                    {project.headerBadge}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-xs">
                  <span className="text-[11px] font-bold bg-teal-600/90 px-2 py-0.5 rounded">
                    {project.categoryTag}
                  </span>
                  <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    ★ {project.rating}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="font-bold text-sm text-[#0B192C] mb-2 leading-snug line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 font-normal leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Academic Verification Note */}
                <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-200/60 flex items-center gap-2 text-[11px] text-teal-900 font-medium mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="line-clamp-1">{project.academicVerificationNote}</span>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400 font-normal">
                {project.completionBadge || project.downloads}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToast('معاينة حية للمشروع', 'جاري تشغيل المعاينة المباشرة للنظام التجريبي.')}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                  title="معاينة تفصيلية"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Project Big Card in Grid */}
        <div
          onClick={() => openModal('add-portfolio-item')}
          className="rounded-2xl border-2 border-dashed border-slate-300 hover:border-teal-500 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-teal-50/30 group min-h-[360px]"
        >
          <div className="w-14 h-14 rounded-full bg-slate-100 group-hover:bg-teal-100 flex items-center justify-center mb-4 transition-colors text-slate-400 group-hover:text-teal-600 shadow-xs">
            <Plus className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-sm text-[#0B192C] mb-1.5">
            إضافة مشروع جديد للمعرض
          </h3>
          <p className="text-xs text-slate-400 font-normal leading-relaxed max-w-xs mb-4">
            ارفع كود المشروع، صور المعاينة، ملخص التوثيق الأكاديمي، وروابط العرض الحي لزيادة فرص توظيفك.
          </p>
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            يدعم GitHub, Figma, وملفات ZIP
          </span>
        </div>
      </div>

      {/* 4. Bottom IP & Academic Protection Banner */}
      <div className="bg-[#ECFDF5] border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-700 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-emerald-950 mb-0.5">
              ضمان وحماية الملكية الفكرية الأكاديمية
            </h4>
            <p className="text-xs text-emerald-800 font-normal leading-relaxed">
              جميع المشروعات البرمجية المعروضة مسجلة رقمياً ومحمية بموجب معايير منصة وصلة الأكاديمية وشهادة مطابقة الكود.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>بوابة تحويل الكريمي / النجم مفعلة</span>
          </div>

          <button
            onClick={() => {
              addToast('تحديث الشهادات الأكاديمية', 'تمت مطابقة الشهادات الرقمية مع سجلات كلية الحاسوب.');
            }}
            className="px-4 py-2 bg-[#0B192C] hover:bg-[#0F2137] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            تحديث شهادات المشاريع
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;

