import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import {
  Briefcase,
  Wallet,
  CheckSquare,
  Zap,
  Building,
  Clock,
  ShieldCheck,
  Send,
  Paperclip,
  CheckCircle2,
  PhoneCall,
  Mail,
  CreditCard,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  FileText
} from 'lucide-react';

export const JobMarketplace = () => {
  const { projects, freelancerUser, submitProposal, addToast } = useWasla();

  // Selected project for proposal
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 'prj_01');
  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Proposal Form State
  const [bidAmount, setBidAmount] = useState('165000');
  const [durationDays, setDurationDays] = useState('12');
  const [emergencyBufferEnabled, setEmergencyBufferEnabled] = useState(true);
  const [bufferDays, setBufferDays] = useState(4);
  const [coverLetter, setCoverLetter] = useState(
    'تحية طيبة د. بسام، أنا أروى، طالبة سنة رابعة هندسة برمجيات بجامعة صنعاء. قمت مسبقاً ببناء نظام سجلات طبية مصغر يعتمد على Service Workers و IndexedDB، مما يضمن عمل الأطباء بكفاءة تامة أثناء انقطاع التيار والإنترنت ثم مزامنة التغييرات تلقائياً عبر واجهة API موثوقة. سأقوم بتسليم هيكل المشروع خلال الموعد المحدد مع توفير دليل تشغيل كامل.'
  );
  const [attachmentName, setAttachmentName] = useState('clinic_prototype_v1.pdf');

  // Calculations
  const numericBid = Number(bidAmount) || 0;
  const platformFee = numericBid * 0.05;
  const netPayout = numericBid - platformFee;
  const totalDaysWithBuffer = Number(durationDays) + (emergencyBufferEnabled ? bufferDays : 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitProposal(selectedProject.id, {
      bidAmount: numericBid,
      durationDays: Number(durationDays),
      bufferDays: emergencyBufferEnabled ? bufferDays : 0,
      coverLetter,
      attachmentName,
    });
  };

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      {/* 1. Top Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-[#0B192C]">42 مشروعاً</span>
              <span className="text-[10px] text-teal-600 font-bold">14%+ عن الأسبوع</span>
            </div>
            <span className="text-[11px] text-slate-400 block font-normal">مشاريع متاحة اليوم</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-[#0B192C]">4,850,000 ر.ي</span>
            </div>
            <span className="text-[11px] text-slate-400 block font-normal">إجمالي الميزانيات المحجوزة (الكريمي والنجم)</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-[#0B192C]">5 عروض</span>
              <span className="text-[10px] text-slate-500 font-bold">متوسط العروض</span>
            </div>
            <span className="text-[11px] text-slate-400 block font-normal">استجابة سريعة للعملاء</span>
          </div>
        </div>

        {/* Metric 4: Logistics Buffer */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 bg-gradient-to-l from-white to-cyan-50/30">
          <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-[#0B192C]">نظام الأمان اللوجستي</span>
              <span className="w-2 h-2 rounded-full bg-teal-500" />
            </div>
            <span className="text-[10px] text-slate-500 block font-normal leading-tight mt-0.5">
              تفعيل الهامش الزمني للطوارئ لحماية تقييم الطلاب تلقائياً
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column: Open Job Marketplace List (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            {/* Header & Filter Tags */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[#0B192C]">سوق العمل المفتوح</h3>
                <span className="text-xs text-slate-400 font-normal">
                  (المشاريع المطروحة بضمان الإيداع المسبق)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                  عرض {projects.length} مشاريع جديدة
                </span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 text-xs font-medium text-slate-600">
              <span className="bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg cursor-pointer whitespace-nowrap">
                هندسة البرمجيات
              </span>
              <span className="bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg cursor-pointer whitespace-nowrap">
                100,000 - 250,000 ر.ي
              </span>
              <span className="bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg cursor-pointer whitespace-nowrap">
                جهة الضمان المالي ⌄
              </span>
              <span className="bg-teal-50 text-teal-800 border border-teal-200 font-bold px-3 py-1.5 rounded-lg cursor-pointer whitespace-nowrap">
                الأحدث طرحاً ⌄
              </span>
            </div>

            {/* Project List */}
            <div className="space-y-3.5">
              {projects.map((project) => {
                const isSelected = project.id === selectedProjectId;
                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`rounded-2xl p-5 border transition-all cursor-pointer text-right ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/20 shadow-sm ring-1 ring-teal-500/30'
                        : 'border-slate-200/90 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {/* Top Row: Budget & Badges */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{project.escrowBadge}</span>
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700">
                          {project.status}
                        </span>
                      </div>

                      <div className="text-left shrink-0">
                        <span className="text-base font-black text-teal-800">
                          {project.budgetYER.toLocaleString()} ر.ي
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-bold text-sm text-[#0B192C] mb-2 leading-snug">
                      {project.title}
                    </h4>

                    {/* Client Info & Duration */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={project.clientAvatar}
                          alt={project.clientName}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-semibold text-slate-700">{project.clientName}</span>
                        <span className="text-slate-400">• {project.clientEntity}</span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span>{project.proposalsCount} عروض</span>
                        <span>•</span>
                        <span className="text-amber-700 font-semibold">متبقي {project.daysLeft} أيام</span>
                      </div>
                    </div>

                    {/* Description excerpt */}
                    <p className="text-xs text-slate-500 font-normal leading-relaxed mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Buffer & Duration Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 text-teal-700 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{project.bufferLabel}</span>
                      </div>

                      <span className="text-slate-400 font-medium">
                        المدة المطلوبة: {project.requiredDurationDays} يوماً
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            <div className="text-center pt-4">
              <button
                onClick={() => addToast('تم تحميل المزيد', 'تم استعراض كافة المشاريع المطروحة حالياً.')}
                className="text-xs font-bold text-slate-600 hover:text-teal-700 inline-flex items-center gap-1.5 py-2 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <span>تحميل المزيد من المشاريع الأكاديمية</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Left Column: Submit Proposal Form (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs text-right">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-black text-sm text-[#0B192C]">تقديم عرض للمشروع</h3>
                <span className="text-[10px] text-slate-400 font-normal line-clamp-1">
                  مشروع: {selectedProject.title}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                مسودة نشطة
              </span>
            </div>

            {/* Academic Priority Callout */}
            <div className="bg-teal-50/80 border border-teal-200/80 rounded-xl p-3 mb-4 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-teal-900 mb-0.5">
                  أنت تقدم بصفتك: طالب معتمد ({freelancerUser.university})
                </h5>
                <p className="text-[11px] text-teal-800 font-normal leading-relaxed">
                  تحظى عروض الطلاب الموثقين بأولوية عرض بنسبة 35% لدى أصحاب المشاريع.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Bid Amount & Basic Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#0B192C] block mb-1">
                    قيمة العرض (ر.ي)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-800 font-bold outline-none focus:border-teal-500 focus:bg-white"
                      required
                    />
                    <span className="absolute left-2.5 top-2 text-[10px] text-slate-400 font-medium">ر.ي</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#0B192C] block mb-1">
                    مدة التنفيذ الأساسية
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={durationDays}
                      onChange={(e) => setDurationDays(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-800 font-bold outline-none focus:border-teal-500 focus:bg-white"
                      required
                    />
                    <span className="absolute left-2.5 top-2 text-[10px] text-slate-400 font-medium">أيام</span>
                  </div>
                </div>
              </div>

              {/* Net Payout Calculation */}
              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 text-[11px] flex items-center justify-between text-slate-600">
                <span>صافي الاستلام: <strong className="text-emerald-700">{netPayout.toLocaleString()} ر.ي</strong></span>
                <span className="text-slate-400">(بعد عمولة المنصة 5%)</span>
              </div>

              {/* Emergency Time Buffer Switch & Selector */}
              <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span>هامش زمني مقترح للظروف الطارئة</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={emergencyBufferEnabled}
                    onChange={(e) => setEmergencyBufferEnabled(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                </div>

                <p className="text-[10px] text-amber-800 font-normal leading-relaxed">
                  خاصية حصرية لمنصة وصلة: تمنحك أياماً إضافية لحماية تقييمك الأكاديمي في حال حدوث انقطاع عام للكهرباء أو تذبذب شبكة الإنترنت في مدينتك.
                </p>

                {emergencyBufferEnabled && (
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setBufferDays(2)}
                      className={`py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                        bufferDays === 2
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50'
                      }`}
                    >
                      +2 يوم (اعتيادي)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBufferDays(4)}
                      className={`py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                        bufferDays === 4
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50'
                      }`}
                    >
                      +4 أيام (موصى به)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBufferDays(7)}
                      className={`py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                        bufferDays === 7
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50'
                      }`}
                    >
                      +7 أيام (حالات حرجة)
                    </button>
                  </div>
                )}

                <div className="text-[10px] font-semibold text-slate-600 pt-1 border-t border-amber-200/50">
                  إجمالي مدة العقد مع الهامش:{' '}
                  <span className="font-bold text-[#0B192C]">
                    {totalDaysWithBuffer} يوماً ({durationDays} يوماً تنفيذ + {emergencyBufferEnabled ? bufferDays : 0} أيام طوارئ)
                  </span>
                </div>
              </div>

              {/* Methodology / Proposal Details */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-[#0B192C]">
                    تفاصيل العرض ومنهجية التنفيذ
                  </label>
                  <span className="text-[10px] text-slate-400 font-normal">عربي أو إنجليزي</span>
                </div>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white leading-relaxed"
                  required
                />
              </div>

              {/* File Attachment Dropzone */}
              <div>
                <span className="text-[11px] font-bold text-[#0B192C] block mb-1">
                  نماذج أعمال سابقة أو ملفات مساندة
                </span>
                <div className="border border-dashed border-slate-300 rounded-xl p-3 bg-slate-50/60 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-600 mb-1">
                    <Paperclip className="w-4 h-4 text-teal-600" />
                    <span className="font-medium">اسحب ملفات الـ PDF أو الكود هنا، أو اضغط للتصفح</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal block mb-2">
                    الحد الأقصى: 25 ميجابايت (ملائم للسرعات المنخفضة)
                  </span>

                  {attachmentName && (
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700">
                      <FileText className="w-3.5 h-3.5 text-teal-600" />
                      <span>{attachmentName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Escrow Guarantee Pill */}
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>ضمان الدفع: لا تبدأ العمل إلا بعد إشعار حجز المبلغ في منصة وصلة (100% محمي).</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>إرسال العرض المعتمد الآن</span>
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>

            {/* Approved Contact Channels Preview */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 block mb-2">
                قنوات التواصل الإضافية المعتمدة بعد قبول العرض
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                  <span className="font-bold text-slate-700 block">واتساب مباشر</span>
                  <span className="text-slate-400">للطوارئ</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                  <Mail className="w-3.5 h-3.5 text-teal-600 mx-auto mb-1" />
                  <span className="font-bold text-slate-700 block">البريد الأكاديمي</span>
                  <span className="text-slate-400">موثق رسمياً</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                  <Building className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                  <span className="font-bold text-slate-700 block">رقم الكريمي</span>
                  <span className="text-slate-400">استلام فوري</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMarketplace;

