import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  ShieldCheck,
  Clock,
  FileCode,
  Layers,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Zap,
  Info,
  DollarSign,
  Briefcase,
  GraduationCap,
  Award,
  ArrowRight,
  RotateCcw,
  Check,
  Lightbulb
} from 'lucide-react';

// Guide definitions for Clients and Freelancers
const GUIDE_CONFIG = {
  client: {
    id: 'client',
    title: 'دليل الجاهزية الذكي لأصحاب المشاريع',
    subtitle: 'معايير إعداد مشروع أكاديمي متكامل لضمان أفضل عروض التنفيذ وحماية أموالك عبر Escrow',
    roleBadge: 'دليل أصحاب الأعمال',
    roleIcon: Briefcase,
    steps: [
      {
        id: 'scope',
        num: '1',
        title: 'تحديد نطاق العمل والمتطلبات بدقة (Scope)',
        summary: 'صياغة مواصفات واضحة للمشروع تحدد الميزات الأساسية والهدف النهائي دون غموض.',
        points: [
          'حدد التقنيات والأطر البرمجية المفضلة (مثل React, Next.js, Flutter) أو اسمح للطلاب باقتراح الأنسب.',
          'افصل بين الميزات الجوهرية الإلزامية للمرحلة الأولى والميزات التحسينية المستقبلية.',
          'أرفق نماذج بصرية أو روابط لمشاريع مشابهة لتوضيح الفكرة وتفادي أي سوء فهم لاحق.'
        ],
        tag: 'نطاق العمل',
        tip: 'المشاريع ذات الوصف الواضح والمفصل تستقطب عروضاً أدق بنسبة 40% وتختصر وقت المراجعة.'
      },
      {
        id: 'deliverables',
        num: '2',
        title: 'توضيح المخرجات النهائية ومعايير القبول (Deliverables)',
        summary: 'حصر المخرجات الملموسة المتوقعة من الطالب المستقل عند تسليم كل مرحلة.',
        points: [
          'ملفات البرمجة والتطوير: كود مصدري نظيف وموثق يتم تسليمه عبر مستودع GitHub المعتمد بالمنصة.',
          'ملفات التصميم: روابط وتصديرات Figma الأصلية والأصول الرسومية بدقة عالية.',
          'معايير الاعتماد: تقرير إنجاز مبسط يوضح خطوات الفحص والتشغيل لضمان مطابقة العمل.'
        ],
        tag: 'المخرجات والقبول',
        tip: 'تقسيم المشروع إلى معالم (Milestones) يتيح لك مراجعة التقدم خطوة بخطوة قبل تحرير المبالغ.'
      },
      {
        id: 'budget',
        num: '3',
        title: 'تحديد الميزانية وإيداع الضمان المالي (Budget & Escrow)',
        summary: 'تحديد ميزانية عادلة وإيداعها في حساب الضمان المحلي لدى الكريمي أو النجم.',
        points: [
          'حدد الميزانية التقديرية بالريال اليمني أو الدولار بما يكافئ الجهد الأكاديمي المطلوب.',
          'اختر وسيط الصرافة المحلي المناسب (الكريمي إكسبرس، شبكة النجم، أو محفظة ون كاش).',
          'يبقى المبلغ محجوزاً في المنصة بالكامل ولا يُحوّل إلى الطالب إلا بعد موافقتك النهائية على الاستلام.'
        ],
        tag: 'الضمان المالي 100%',
        tip: 'إيداع الضمان المسبق يمنح الطلاب المستقلين ثقة تامة ويحفزهم لتسليم أعمال تفوق التوقعات.'
      }
    ]
  },
  freelancer: {
    id: 'freelancer',
    title: 'دليل الجاهزية الذكي للطلاب المستقلين',
    subtitle: 'معايير تنفيذ وتسليم المشاريع الأكاديمية لحماية تقييمك وسحب أرباحك بأمان',
    roleBadge: 'دليل الطلاب المستقلين',
    roleIcon: GraduationCap,
    steps: [
      {
        id: 'confirm',
        num: '1',
        title: 'تأكيد المتطلبات والجدول الزمني مع العميل',
        summary: 'دراسة وصف المشروع ومناقشة أي استفسارات أو تفاصيل مبهمة قبل الشروع في البرمجة.',
        points: [
          'راجع قائمة المتطلبات بدقة، واطلب توضيحاً لأي بند تقني غير مفصل عبر المحادثة المباشرة.',
          'تأكد من توافق مدة التسليم مع التزاماتك الجامعية وساعات الدراسة والمحاضرات.',
          'شارك العميل خطة تقسيم العمل والخطوات المبدئية لبناء الثقة والوضوح منذ اليوم الأول.'
        ],
        tag: 'تأكيد المتطلبات',
        tip: 'التواصل المسبق والاستفسار المبكر يوفر عليك ساعات من التعديلات وإعادة كتابة الكود.'
      },
      {
        id: 'buffer',
        num: '2',
        title: 'تفعيل بروتوكول الهامش الزمني للطوارئ (+48h Buffer)',
        summary: 'حماية تقييمك من انقطاعات التيار الكهربائي والإنترنت باليمن بتمديد مرن ومضمون.',
        points: [
          'ميزة حصرية لمنصة وصلة: تمديد موثق من +24 إلى +48 ساعة تحسباً لظروف الطاقة والشبكة.',
          'لا يؤثر الهامش الزمني المفعل على معدل نجاحك العام أو تقييمك كطالب معتمد في المنصة.',
          'يُشعر العميل آلياً بأن الجدول الزمني يراعي ظروف بيئة العمل المحلية لضمان تسليم متقن.'
        ],
        tag: 'حماية التقييم الأكاديمي',
        tip: 'المستقلون الذين يفعلون الهامش الزمني يحافظون على نسبة التزام بالتسليم تتجاوز 99%.'
      },
      {
        id: 'submit',
        num: '3',
        title: 'توثيق وتسليم الملفات والأكواد وطلب الأرباح',
        summary: 'رفع المخرجات عبر قنوات المنصة المعتمدة وطلب تحرير مبالغ الضمان المالي لحسابك.',
        points: [
          'ارفع الأكواد عبر مستودع GitHub المخصص للمشروع مع كتابة ملف README يوضح طريقة التشغيل.',
          'أرفق تقريراً أو فيديو توضيحياً سريعاً يثبت عمل الميزات واكتمال المعلم المطلوب.',
          'فور تأكيد العميل للاستلام، يُحرر المبلغ فورياً إلى رصيدك لتتمكن من سحبه عبر الكريمي أو النجم.'
        ],
        tag: 'تسليم المخرجات والربح',
        tip: 'التسليم الموثق والمرفق بتعليمات التشغيل هو أسرع طريق للحصول على تقييم 5 نجوم وتعاقدات مستمرة.'
      }
    ]
  }
};

export const ReadinessGuide = ({
  mode = 'client', // 'client' | 'freelancer'
  variant = 'card', // 'card' | 'collapsible' | 'compact'
  defaultExpanded = true,
  showRoleSwitcher = false,
  className = ''
}) => {
  const [activeRole, setActiveRole] = useState(mode);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [activeStepDetail, setActiveStepDetail] = useState(null);

  // Completed items state per role
  const [completedSteps, setCompletedSteps] = useState({
    client: { scope: false, deliverables: false, budget: false },
    freelancer: { confirm: false, buffer: false, submit: false }
  });

  const currentConfig = GUIDE_CONFIG[activeRole] || GUIDE_CONFIG.client;
  const currentRoleCompleted = completedSteps[activeRole] || {};
  const completedCount = Object.values(currentRoleCompleted).filter(Boolean).length;
  const isAllCompleted = completedCount === 3;
  const progressPercent = Math.round((completedCount / 3) * 100);

  const toggleStep = (stepId, e) => {
    e?.stopPropagation();
    setCompletedSteps((prev) => ({
      ...prev,
      [activeRole]: {
        ...prev[activeRole],
        [stepId]: !prev[activeRole]?.[stepId]
      }
    }));
  };

  const toggleStepDetail = (stepId) => {
    setActiveStepDetail((prev) => (prev === stepId ? null : stepId));
  };

  const resetRoleSteps = (e) => {
    e?.stopPropagation();
    setCompletedSteps((prev) => ({
      ...prev,
      [activeRole]: {
        ...(activeRole === 'client'
          ? { scope: false, deliverables: false, budget: false }
          : { confirm: false, buffer: false, submit: false })
      }
    }));
  };

  const markAllComplete = (e) => {
    e?.stopPropagation();
    setCompletedSteps((prev) => ({
      ...prev,
      [activeRole]: {
        ...(activeRole === 'client'
          ? { scope: true, deliverables: true, budget: true }
          : { confirm: true, buffer: true, submit: true })
      }
    }));
  };

  const RoleIcon = currentConfig.roleIcon;

  return (
    <div
      className={`rounded-2xl border transition-all font-sans text-right ${
        isAllCompleted
          ? 'border-emerald-300 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40 shadow-xs'
          : 'border-slate-200/90 bg-white shadow-xs'
      } ${className}`}
      dir="rtl"
    >
      {/* 1. Header Bar */}
      <div
        className={`p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none ${
          isExpanded ? 'border-b border-slate-100' : ''
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
              isAllCompleted
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                : 'bg-teal-50 text-teal-700 border-teal-200'
            }`}
          >
            {isAllCompleted ? (
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <Sparkles className="w-5 h-5 text-teal-600" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-black text-[#0B192C]">
                {currentConfig.title}
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                  isAllCompleted
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-teal-50 text-teal-800 border-teal-200'
                }`}
              >
                <RoleIcon className="w-3 h-3 text-teal-600" />
                <span>{currentConfig.roleBadge}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal line-clamp-1 mt-0.5">
              {currentConfig.subtitle}
            </p>
          </div>
        </div>

        {/* Progress Pill & Expand Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex flex-col items-end">
            <span
              className={`text-xs font-black ${
                isAllCompleted ? 'text-emerald-700' : 'text-slate-700'
              }`}
            >
              {completedCount} من 3 خطوات مكتملة
            </span>
            <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden border border-slate-200">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isAllCompleted ? 'bg-emerald-500' : 'bg-[#0D9488]'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="تبديل عرض الدليل"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* 2. Collapsible Content Body */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-5 animate-in fade-in duration-150">
          {/* Optional Role Switcher Tabs */}
          {showRoleSwitcher && (
            <div className="p-1 bg-slate-100 rounded-xl flex items-center gap-1 border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setActiveRole('client')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeRole === 'client'
                    ? 'bg-white text-[#0B192C] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                <span>دليل العميل (طرح المشاريع)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveRole('freelancer')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeRole === 'freelancer'
                    ? 'bg-white text-[#0B192C] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                <span>دليل المستقل (تنفيذ وتسليم المهام)</span>
              </button>
            </div>
          )}

          {/* Progress Banner & Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[11px] ${
                  isAllCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-teal-100 text-teal-800'
                }`}
              >
                {completedCount}/3
              </div>
              <span className="font-bold text-[#0B192C]">
                {isAllCompleted
                  ? 'جاهزية تامة 100%! تم التحقق من كافة الخطوات بنجاح'
                  : `مستوى الجاهزية الحالي: ${progressPercent}%`}
              </span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {!isAllCompleted ? (
                <button
                  type="button"
                  onClick={markAllComplete}
                  className="text-teal-700 hover:text-teal-800 font-bold text-[11px] hover:underline"
                >
                  تحديد الكل كمكتمل
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetRoleSteps}
                  className="text-slate-400 hover:text-slate-600 text-[11px] flex items-center gap-1 hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إعادة الضبط</span>
                </button>
              )}
            </div>
          </div>

          {/* 3 Steps Checklist */}
          <div className="space-y-3">
            {currentConfig.steps.map((step) => {
              const isChecked = Boolean(currentRoleCompleted[step.id]);
              const isDetailOpen = activeStepDetail === step.id;

              return (
                <div
                  key={step.id}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    isChecked
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-slate-200 hover:border-teal-300 bg-white'
                  }`}
                >
                  {/* Step Row */}
                  <div className="p-3.5 sm:p-4 flex items-start gap-3">
                    {/* Checkbox Trigger */}
                    <button
                      type="button"
                      onClick={(e) => toggleStep(step.id, e)}
                      className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-600 text-white shadow-xs'
                          : 'bg-white border-slate-300 hover:border-teal-500 text-transparent'
                      }`}
                      aria-label={`تحديد الخطوة ${step.num}`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    {/* Step Title & Summary */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                        <span
                          className={`text-xs font-black transition-colors ${
                            isChecked
                              ? 'line-through text-slate-400'
                              : 'text-[#0B192C]'
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {step.tag}
                        </span>
                      </div>

                      <p
                        className={`text-xs leading-relaxed ${
                          isChecked ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {step.summary}
                      </p>

                      {/* Expandable Details Button */}
                      <button
                        type="button"
                        onClick={() => toggleStepDetail(step.id)}
                        className="mt-2 text-[11px] font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 hover:underline"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-teal-600" />
                        <span>
                          {isDetailOpen
                            ? 'إخفاء الإرشادات التفصيلية'
                            : 'عرض تفاصيل ومعايير الإنجاز'}
                        </span>
                        {isDetailOpen ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      {/* Expanded Checklist Bullet Points & Tip */}
                      {isDetailOpen && (
                        <div className="mt-3 pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-600 animate-in fade-in duration-100">
                          <ul className="space-y-1.5 list-disc list-inside text-slate-600 font-medium">
                            {step.points.map((pt, idx) => (
                              <li key={idx} className="leading-relaxed">
                                {pt}
                              </li>
                            ))}
                          </ul>

                          <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-[11px] flex items-center gap-2">
                            <span className="shrink-0 text-base">💡</span>
                            <span className="font-semibold">{step.tip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Celebratory Note When Finished */}
          {isAllCompleted && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-black block">جاهزية مكتملة بنسبة 100%!</span>
                  <span className="text-[11px] text-emerald-800 font-normal">
                    {activeRole === 'client'
                      ? 'مشروعك مستوفٍ لمعايير الجودة الأكاديمية والوساطة المالية المحمية.'
                      : 'أنت جاهز لتنفيذ المشروع وحماية تقييمك وضمان استلام أرباحك بسلاسة.'}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                معتمد
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadinessGuide;
