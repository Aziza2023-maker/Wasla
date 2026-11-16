import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import ReadinessGuide from '../common/ReadinessGuide';
import {
  Sparkles,
  Plus,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  Clock,
  Building,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  FileCode,
  MessageCircle,
  Check,
  SlidersHorizontal,
  Zap,
  Info
} from 'lucide-react';

export const FreelancerOverview = () => {
  const {
    freelancerUser,
    navigateTo,
    withdrawFunds,
    updateEmergencyBuffer,
    openModal,
    addToast
  } = useWasla();

  const [withdrawAmount, setWithdrawAmount] = useState('148500');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'milestone' | 'review'

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amt = Number(withdrawAmount);
    if (!amt || amt <= 0) {
      addToast('قيمة غير صالحة', 'يرجى إدخال مبلغ صحيح للسحب.', 'warning');
      return;
    }
    withdrawFunds(amt, 'kuraimi');
  };

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      {/* 1. Top Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl sm:text-2xl font-black text-[#0B192C]">
              لوحة تحكم المستقل والأداء الأكاديمي
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              محدث لحظياً
            </span>
          </div>
          <p className="text-xs text-slate-500 font-normal">
            مرحباً بك مجدداً م. أروى، نظرة شاملة على العوائد المالية، المشاريع النشطة وحالة ضمانات التحويل.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => openModal('readiness-guide', { mode: 'freelancer' })}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold hover:bg-teal-100 transition-colors shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>دليل الجاهزية الذكي</span>
          </button>

          <button
            onClick={() => openModal('academic-verify')}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold hover:bg-teal-100 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>توثيق البطاقة الجامعية</span>
          </button>

          <button
            onClick={() => navigateTo('freelancer-services')}
            className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>إدارة ونشر الخدمات المصغرة (Gigs)</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Earnings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">إجمالي الأرباح المكتسبة</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-[#0B192C]">
                +${freelancerUser.balanceUSD.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3 h-3" />
                18.4%+ هذا الشهر
              </span>
            </div>

            <span className="text-[10px] text-slate-400 block font-normal">
              يعادل 736,500 ر.ي (بسعر الصرف الحالي)
            </span>
          </div>

          {/* Mini Bar Chart Mockup */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between h-10 gap-1.5">
            <div className="w-full bg-slate-100 rounded-t h-4" />
            <div className="w-full bg-slate-100 rounded-t h-6" />
            <div className="w-full bg-slate-200 rounded-t h-5" />
            <div className="w-full bg-emerald-300 rounded-t h-8" />
            <div className="w-full bg-emerald-500 rounded-t h-10" />
            <div className="w-full bg-emerald-400 rounded-t h-7" />
          </div>

          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between font-medium">
            <span>صافي الحساب المحجوز (Escrow)</span>
            <span className="font-bold text-slate-700">$240.00</span>
          </div>
        </div>

        {/* Card 2: Completed Projects */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">المشاريع المكتملة</span>
              <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-[#0B192C]">
                {freelancerUser.completedProjects}
              </span>
              <span className="text-xs font-bold text-slate-700">مشروع أكاديمي وتجاري</span>
            </div>

            <span className="text-[10px] text-slate-400 block font-normal">
              من أصل 16 مشروع تم تسليمها بنجاح (معدل 93.8%)
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-slate-50 rounded-lg p-1.5">
              <span className="text-[10px] text-slate-400 block">مشاريع برمجية</span>
              <span className="font-black text-[#0B192C]">11 مشاريع</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-1.5">
              <span className="text-[10px] text-slate-400 block">تحليل وبحوث</span>
              <span className="font-black text-[#0B192C]">4 مشاريع</span>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between font-medium">
            <span>متوسط التقييم العام</span>
            <span className="font-bold text-amber-600">★ 4.9 / 5.0 (34 عميل)</span>
          </div>
        </div>

        {/* Card 3: Success Rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">معدل النجاح الإجمالي</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-[#0B192C]">
                {freelancerUser.successRate}%
              </span>
              <span className="text-xs font-bold text-emerald-700">فائق الامتياز</span>
            </div>

            <span className="text-[10px] text-slate-400 block font-normal">
              معيار التقييم المعتمد لمنصة وصلة
            </span>
          </div>

          {/* Circular Progress Gauge Mockup */}
          <div className="mt-3 flex items-center justify-center">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-600"
                  strokeDasharray="98, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-slate-800">98%</span>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between font-medium">
            <span>إعادة التوظيف</span>
            <span className="font-bold text-slate-700">87% من العملاء</span>
          </div>
        </div>

        {/* Card 4: Active Proposals */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">العروض النشطة المفتوحة</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-[#0B192C]">
                {freelancerUser.activeProposals}
              </span>
              <span className="text-xs font-bold text-blue-700">عروض قيد المراجعة</span>
            </div>

            <span className="text-[10px] text-slate-400 block font-normal">
              {freelancerUser.interviewProposals} عروض دخلت مرحلة المقابلة النهائية
            </span>
          </div>

          {/* Mini Line Chart */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center">
            <div className="w-full bg-slate-50 rounded-lg p-2 text-center">
              <span className="text-[10px] text-teal-700 font-bold block">+3 عروض جديدة هذا الأسبوع</span>
              <div className="w-full bg-teal-200 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-teal-600 h-full w-3/4 rounded-full" />
              </div>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between font-medium">
            <span>رصيد التقديم المتبقي</span>
            <span className="font-bold text-slate-700">32 نقطة</span>
          </div>
        </div>
      </div>

      {/* 2.5. Interactive Readiness Guide Section for Freelancers */}
      <ReadinessGuide
        mode="freelancer"
        variant="collapsible"
        defaultExpanded={true}
        showRoleSwitcher={true}
      />

      {/* 3. Main Split Section: Active Projects Tracker vs Side Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right / Center: Active Projects Tracker (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
            {/* Header & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <h3 className="text-base font-black text-[#0B192C]">
                  مشاريع جارية ومتابعة المهام الأكاديمية
                </h3>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500'
                  }`}
                >
                  الكل (2)
                </button>
                <button
                  onClick={() => setActiveTab('milestone')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeTab === 'milestone' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500'
                  }`}
                >
                  قيد المرحلة
                </button>
                <button
                  onClick={() => setActiveTab('review')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeTab === 'review' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500'
                  }`}
                >
                  في المراجعة
                </button>
              </div>
            </div>

            {/* Project 1: Medical Platform */}
            <div className="rounded-xl border border-slate-200/90 p-5 mb-4 hover:border-teal-400 transition-all bg-slate-50/30">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="font-black text-sm text-[#0B192C]">
                      تطوير منصة حجز عيادات طبية (Next.js & Supabase)
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      المرحلة الثانية / 3
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-normal">
                    العميل: مجمع الشفاء الطبي الدولي • المبلغ المحجوز:{' '}
                    <span className="font-bold text-emerald-700">$650.00</span>
                  </p>
                </div>

                <div className="text-left shrink-0">
                  <span className="text-[10px] text-slate-400 block font-normal">الموعد النهائي للتسليم</span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    متبقي 4 أيام (28 أكتوبر)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                  <span className="text-slate-500">تقدم تسليم المعالم (Milestones)</span>
                  <span className="text-teal-700">65% مكتمل</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full w-[65%] rounded-full" />
                </div>
              </div>

              {/* Milestones Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 px-3 bg-white rounded-xl border border-slate-200/80 mb-4 text-xs font-medium">
                <div className="flex items-center gap-2 text-emerald-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
                  </div>
                  <span className="line-through text-slate-400">1. تصميم الواجهات ونماذج البيانات</span>
                </div>
                <div className="flex items-center gap-2 text-teal-800 font-bold">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                  <span>2. ربط بوابات الدفع وقواعد العرض</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  <span>3. الاختبار النهائي والتدشين</span>
                </div>
              </div>

              {/* Emergency Buffer Alert Banner */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between text-xs text-amber-900 mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2 font-medium">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>مشمول بهامش طوارئ: 24+ ساعة إضافية تحسباً لانقطاع الشبكة والكهرباء</span>
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  مفعل تلقائياً
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5">
                <button
                  onClick={() => navigateTo('freelancer-contact')}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة العميل</span>
                </button>
                <button
                  onClick={() => {
                    addToast('تم رفع كود المعلم', 'تم إرسال الكود للعميل بنجاح وبانتظار اعتماد تحرير مرحلة الضمان.');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <FileCode className="w-4 h-4" />
                  <span>تسليم كود المعلم</span>
                </button>
              </div>
            </div>

            {/* Project 2: Predictive Model */}
            <div className="rounded-xl border border-slate-200/90 p-5 hover:border-teal-400 transition-all bg-slate-50/30">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="font-black text-sm text-[#0B192C]">
                      بناء نموذج تنبؤي وتحليل إحصائي لبحث تخرج أكاديمي
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                      مراجعة المسودة
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-normal">
                    الباحث: د. عادل بلبحيث (جامعة حضرموت) • الحوالة:{' '}
                    <span className="font-bold text-emerald-700">120,000 ر.ي</span>
                  </p>
                </div>

                <div className="text-left shrink-0">
                  <span className="text-[10px] text-slate-400 block font-normal">تسليم التقرير النهائي</span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    غداً 8:00 مساءً
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                  <span className="text-slate-500">تقدم تسليم المعالم</span>
                  <span className="text-emerald-700">95% مكتمل</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[95%] rounded-full" />
                </div>
              </div>

              <div className="bg-slate-100 rounded-xl p-3 flex items-center justify-between text-xs text-slate-600 mb-4">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-slate-500" />
                  <span>تم رفع الأكواد عبر مستودع GitHub الخاص بالمنصة</span>
                </div>
                <button
                  onClick={() => {
                    addToast('تم طلب الإفراج المالي!', 'تم إشعار العميل وإدارة الضمان لمطابقة التسليم وتحرير 120,000 ر.ي لحسابك.');
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors"
                >
                  طلب الإفراج المالي
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column: Side Widgets (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Widget 1: Instant Withdrawal Widget */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-right">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-sm text-[#0B192C]">السحب الفوري للأرباح</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                محلي ومباشر
              </span>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500 font-medium">الرصيد الجاهز للصرف</span>
                <span className="text-base font-black text-emerald-800">
                  {freelancerUser.balanceYER.toLocaleString()} ر.ي
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>الرصيد المعلق بالضمان</span>
                <span className="font-bold text-slate-600">588,000 ر.ي</span>
              </div>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-slate-700 block mb-1">
                  وجهة التحويل المصرفي المعتمدة
                </span>
                <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-teal-600" />
                    <div>
                      <span className="font-bold text-[#0B192C] block">الكريمي إم بي</span>
                      <span className="text-[10px] text-slate-400">حوالة برقم الهاتف: 330452***</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    افتراضي
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  المبلغ المراد تحويله (ريال يمني)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-800 font-bold outline-none focus:border-teal-500 focus:bg-white"
                  />
                  <span className="absolute left-3 top-2 text-[10px] text-slate-400 font-bold">
                    ر.ي يمني
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                تأكيد سحب المبلغ إلى الكريمي
              </button>
            </form>

            <span className="text-[10px] text-slate-400 text-center block mt-2 font-normal">
              يتم التنفيذ آلياً خلال 10 دقائق بتأكيد الرسائل النصية المباشرة.
            </span>
          </div>

          {/* Widget 2: Emergency Time Buffer Widget */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-right">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-black text-sm text-[#0B192C]">الهامش الزمني المضمون</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                حصري لوصلة
              </span>
            </div>

            <p className="text-xs text-slate-500 font-normal leading-relaxed mb-4">
              ميزة حماية المستقل بالاتفاق مع العميل على هامش زمني إضافي للطوارئ (+24 إلى +48 ساعة) للتعامل مع ظروف الكهرباء أو الإنترنت بالمكلا وحضرموت دون الإضرار بتقييم الأداء.
            </p>

            <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-200/60 mb-3 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">مؤشر استقرار الاتصال بالمكلا:</span>
                <span className="font-bold text-emerald-700">مستقر (95%)</span>
              </div>
              <p className="text-[11px] text-amber-800 font-normal leading-relaxed">
                عند تفعيل الهامش الزمني المتفق عليه مسبقاً، يُمنح المستقل مهلة إضافية محددة لإتمام التسليم وحماية جودة المخرجات.
              </p>
            </div>

            <button
              onClick={() => openModal('buffer-settings')}
              className="w-full py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-teal-600" />
              <span>ضبط معايير الهامش التلقائي</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Portfolio Showcase Preview */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black text-[#0B192C]">
              نماذج من معرض الأعمال المعتمد (Portfolio)
            </h3>
            <span className="text-xs text-slate-400 font-normal">(12 عمل موثق)</span>
          </div>

          <button
            onClick={() => navigateTo('freelancer-portfolio')}
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
          >
            <span>عرض كافة الأعمال (12)</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* 3 cards + Add project card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="rounded-xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-all group bg-white">
            <div className="h-32 bg-slate-100 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=300"
                alt="مشروع تخرج"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B192C]/80 text-white backdrop-blur-xs">
                مشروع تخرج ممتاز
              </span>
            </div>
            <div className="p-3.5 text-right">
              <h4 className="font-bold text-xs text-[#0B192C] mb-1 line-clamp-1">
                نظام إدارة المعاملات الجامعية الذكية
              </h4>
              <p className="text-[11px] text-slate-400 font-normal line-clamp-2 mb-2 leading-relaxed">
                تطبيق ويب متكامل باستخدام React و FastAPI لتنظيم استعارة الأجهزة.
              </p>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-black text-emerald-700">165 ألف ر.ي</span>
                <span className="text-amber-500 font-bold">★ 5.0</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-all group bg-white">
            <div className="h-32 bg-slate-100 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300"
                alt="متجر حرفي"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-teal-800/80 text-white backdrop-blur-xs">
                تطبيق Flutter
              </span>
            </div>
            <div className="p-3.5 text-right">
              <h4 className="font-bold text-xs text-[#0B192C] mb-1 line-clamp-1">
                متجر حرفي العقيق والمشغولات اليمنية
              </h4>
              <p className="text-[11px] text-slate-400 font-normal line-clamp-2 mb-2 leading-relaxed">
                تطبيق تجارة إلكترونية بدعم الدفع ببطاقات كوالتي وشبكات الحوالات.
              </p>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-black text-emerald-700">$420</span>
                <span className="text-amber-500 font-bold">★ 4.9</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-all group bg-white">
            <div className="h-32 bg-slate-100 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300"
                alt="خوارزمية بن"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-purple-900/80 text-white backdrop-blur-xs">
                ذكاء اصطناعي
              </span>
            </div>
            <div className="p-3.5 text-right">
              <h4 className="font-bold text-xs text-[#0B192C] mb-1 line-clamp-1">
                خوارزمية تصنيف جودة حبوب البن اليمني
              </h4>
              <p className="text-[11px] text-slate-400 font-normal line-clamp-2 mb-2 leading-relaxed">
                نموذج رؤية حاسوبية (Computer Vision) مدرب على صور البن.
              </p>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-black text-emerald-700">$550</span>
                <span className="text-amber-500 font-bold">★ 5.0</span>
              </div>
            </div>
          </div>

          {/* Card 4: Add New Project Action Card */}
          <div
            onClick={() => openModal('add-portfolio-item')}
            className="rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-500 p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-teal-50/20 group"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-teal-100 flex items-center justify-center mb-3 transition-colors text-slate-500 group-hover:text-teal-600">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs text-[#0B192C] mb-1">
              إضافة مشروع جديد للمعرض
            </h4>
            <p className="text-[10px] text-slate-400 font-normal leading-relaxed">
              ارفع مشاريعك الأكاديمية أو البرمجية لزيادة فرص استقطاب العملاء بنسبة 40%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerOverview;

