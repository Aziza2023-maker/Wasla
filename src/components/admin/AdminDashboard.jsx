import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import {
  ShieldCheck,
  Building,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
  Eye,
  Check,
  X,
  UserCheck,
  Award,
  AlertTriangle,
  ArrowLeft,
  GraduationCap,
  Download,
  Search,
  Filter,
  Lock
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    remittances,
    verificationQueue,
    confirmAndLockEscrow,
    rejectRemittance,
    approveStudentVerification,
    openModal,
    addToast,
    navigateTo
  } = useWasla();

  const [activeAccordion, setActiveAccordion] = useState(1);
  const [remittanceFilter, setRemittanceFilter] = useState('all'); // 'all' | 'kuraimi' | 'najm'

  const filteredRemittances = remittances.filter((r) => {
    if (remittanceFilter === 'kuraimi') return r.providerType === 'kuraimi';
    if (remittanceFilter === 'najm') return r.providerType === 'najm';
    return true;
  });

  const totalEscrowPoolYER = remittances.reduce((acc, r) => acc + (r.amountYER || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-right" dir="rtl">
      {/* 1. Header (Matching Mockup) */}
      <header className="bg-white border-b border-slate-200 sticky top-8 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WaslaLogo variant="dark" size="md" onClick={() => navigateTo('landing')} />
            <span className="hidden sm:inline text-xs font-bold px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
              الإدارة المركزية
            </span>
          </div>

          <div className="text-center hidden md:block">
            <span className="text-xs font-black text-[#0B192C] block">
              شاشات الإدارة العامة — المسؤول المالي والأكاديمي (الوساطة والضمان)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>الوساطة مفعلة: الكريمي والنجم</span>
            </div>

            <button
              onClick={() => navigateTo('student-alt')}
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 hidden sm:inline"
            >
              مدخل الطلاب
            </button>

            <button
              onClick={() => addToast('إدارة المنصة', 'لوحة تحكم المسؤول المالي في حالة اتصال مباشر.')}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-colors"
            >
              إدارة المنصة
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 flex-1 w-full">
        {/* Top Section: Escrow Policy Accordion vs "Who Are We" Dark Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Right: Policy Accordion (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <h2 className="text-base font-black text-[#0B192C]">
                    سياسات التحقق والضمان المالي (Escrow)
                  </h2>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  معايير 2024
                </span>
              </div>

              <p className="text-xs text-slate-400 font-normal mb-4">
                اللوائح الإجرائية للتأكد من تسليم المشاريع وضمان مستحقات الطلاب عبر شبكات الصرافة المحلية.
              </p>

              {/* Accordion Items */}
              <div className="space-y-3">
                {/* Item 1 */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 1 ? 0 : 1)}
                    className="w-full p-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-right"
                  >
                    <div className="flex items-center gap-2 text-xs font-black text-[#0B192C]">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">
                        1
                      </span>
                      <span>كيف يتم التحقق من الحوالات المحلية؟</span>
                    </div>
                    {activeAccordion === 1 ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {activeAccordion === 1 && (
                    <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed font-normal border-t border-slate-100">
                      يقوم العميل بإيداع القيمة المالية للمشروع عبر رقم الحساب المعتمد لمنصة وصلة لدى بنك الكريمي للتمويل الأصغر الإسلامي - خدمة الكريمي إكسبرس أو إم فلوس، أو عبر شركة النجم للحوالات، يتم رفع رقم الحوالة وصورة السند فوراً، حيث يقوم المشرف المالي بمطابقة الاسم والمبلغ بنكياً، وحجز المبلغ كضمان معلق ولا يتم تحويله لحساب الطالب إلا بعد تأكيد الاستلام النهائي للمشروع.
                    </div>
                  )}
                </div>

                {/* Item 2 */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 2 ? 0 : 2)}
                    className="w-full p-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-right"
                  >
                    <div className="flex items-center gap-2 text-xs font-black text-[#0B192C]">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                        2
                      </span>
                      <span>ما هو هامش الزمن الاحتياطي؟</span>
                    </div>
                    {activeAccordion === 2 ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {activeAccordion === 2 && (
                    <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed font-normal border-t border-slate-100">
                      هامش زمني تلقائي (24 إلى 48 ساعة) يُمنح للطلاب الأكاديميين لحمايتهم في حال انقطاع التيار الكهربائي أو شبكة الإنترنت، بحيث لا يحق للعميل إلغاء العقد أو خفض تقييم الطالب بسبب هذه الظروف القهرية المثبتة.
                    </div>
                  )}
                </div>

                {/* Item 3 */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === 3 ? 0 : 3)}
                    className="w-full p-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-right"
                  >
                    <div className="flex items-center gap-2 text-xs font-black text-[#0B192C]">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                        3
                      </span>
                      <span>كيف يتم فض النزاعات الأكاديمية؟</span>
                    </div>
                    {activeAccordion === 3 ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {activeAccordion === 3 && (
                    <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed font-normal border-t border-slate-100">
                      في حال وجود خلاف حول مخرجات العمل، يتم إحالة ملف المشروع إلى لجنة تحكيم أكاديمية من الجامعة المختصة لمراجعة الكود والمخرجات، ويكون قرارها ملزماً للإفراج عن الضمان المالي أو إعادته.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
              <button
                onClick={() => addToast('تحميل اللائحة الإجرائية', 'جاري تجهيز دليل الوساطة بصيغة PDF.')}
                className="font-bold text-teal-700 hover:underline flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>تحميل اللائحة الكاملة (PDF) — دليل الوساطة الإجرائية للرقابة المالية</span>
              </button>
            </div>
          </div>

          {/* Left: Dark Navy "Who Are We" Platform Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#0B192C] text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-md">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-teal-300 text-xs font-semibold mb-4 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>نظام موثوق ومحمي • عن المنصة والأمان</span>
              </div>

              <h2 className="text-xl font-black mb-3">
                من نحن؟ منصة "وصلة" للربط والضمان المالي
              </h2>

              <p className="text-xs text-slate-300 font-normal leading-relaxed mb-6">
                منصة «وصلة» لا تكتفي بالربط، بل تضمن كافة التعاملات والتحويلات المالية المتبادلة بين الطرفين، وتوفر بيئة عمل آمنة واحترافية للوساطة مع شبكات الصرافة المحلية (الكريمي والنجم) لحماية الطالب والعميل على حد سواء حتى اكتمال المشروع وتسليمه بنجاح.
              </p>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
                <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800">
                  <span className="text-[10px] text-teal-400 block font-bold mb-0.5">السوق المحلي</span>
                  <span className="text-[10px] text-slate-300">صنعاء - عدن - حضرموت</span>
                </div>
                <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800">
                  <span className="text-[10px] text-teal-400 block font-bold mb-0.5">وساطة مالية</span>
                  <span className="text-[10px] text-slate-300">ضمان الدفع والحقوق</span>
                </div>
                <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800">
                  <span className="text-[10px] text-teal-400 block font-bold mb-0.5">كفاءات طلابية</span>
                  <span className="text-[10px] text-slate-300">جامعات معتمدة</span>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => navigateTo('role-selection')}
                className="py-2 px-1 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors"
              >
                سجل كطالب
              </button>
              <button
                onClick={() => navigateTo('client-dashboard')}
                className="py-2 px-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
              >
                ابدأ مشروعاً
              </button>
              <button
                onClick={() => openModal('instant-withdrawal')}
                className="py-2 px-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 font-bold text-xs transition-colors"
              >
                حول كطالب
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Pending Local Remittances Queue (سجل إيداعات الحوالات المحلية المعلقة) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          {/* Header & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-black text-base text-[#0B192C]">
                  سجل إيداعات الحوالات المحلية المعلقة (صرافة الكريمي والنجم)
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  بانتظار التأكيد ({remittances.length})
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal">
                مراجعة إيداعات العملاء عبر السندات البنكية وحجز الضمان لحين إكمال المشاريع
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setRemittanceFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  remittanceFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                الكل ({remittances.length})
              </button>
              <button
                onClick={() => setRemittanceFilter('kuraimi')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  remittanceFilter === 'kuraimi'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                الكريمي (M Floos)
              </button>
              <button
                onClick={() => setRemittanceFilter('najm')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  remittanceFilter === 'najm'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                النجم للحوالات
              </button>
            </div>
          </div>

          {/* Remittances Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold text-[11px]">
                  <th className="pb-3 pr-2">رقم السند / الحوالة</th>
                  <th className="pb-3">اسم المرسل (العميل)</th>
                  <th className="pb-3">مزود الصرافة</th>
                  <th className="pb-3">المبلغ المودع</th>
                  <th className="pb-3">المشروع المعني</th>
                  <th className="pb-3">المستقل (الطالب)</th>
                  <th className="pb-3">حالة الإيداع</th>
                  <th className="pb-3 pl-2 text-center">إجراءات المراجعة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRemittances.map((rem) => (
                  <tr key={rem.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Code & Time */}
                    <td className="py-4 pr-2">
                      <span className="font-mono font-bold text-[#0B192C] block">{rem.code}</span>
                      <span className="text-[10px] text-slate-400">{rem.timeAgo}</span>
                    </td>

                    {/* Sender Client */}
                    <td className="py-4">
                      <span className="font-bold text-[#0B192C] block">{rem.senderClient}</span>
                      <span className="text-[10px] text-slate-400">{rem.senderEntity}</span>
                    </td>

                    {/* Provider */}
                    <td className="py-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                          rem.providerType === 'kuraimi'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {rem.provider}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-4 font-black text-slate-900">
                      {rem.amountYER.toLocaleString()} ر.ي
                    </td>

                    {/* Target Project */}
                    <td className="py-4 text-slate-700 max-w-xs truncate font-medium">
                      {rem.targetProject}
                    </td>

                    {/* Student */}
                    <td className="py-4">
                      <span className="font-bold text-[#0B192C] block">{rem.studentName}</span>
                      <span className="text-[10px] text-slate-400">{rem.studentUniversity}</span>
                    </td>

                    {/* Status */}
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          rem.statusType === 'amber'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : rem.statusType === 'blue'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : rem.statusType === 'yellow'
                            ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                            : rem.statusType === 'red'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            rem.statusType === 'amber'
                              ? 'bg-amber-500'
                              : rem.statusType === 'blue'
                              ? 'bg-blue-500'
                              : rem.statusType === 'yellow'
                              ? 'bg-yellow-500'
                              : rem.statusType === 'red'
                              ? 'bg-rose-500'
                              : 'bg-emerald-500'
                          }`}
                        />
                        {rem.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-2">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => openModal('receipt-preview', rem)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs"
                          title="معاينة السند البنكي"
                        >
                          معاينة السند
                        </button>

                        <button
                          onClick={() => confirmAndLockEscrow(rem.id)}
                          className="px-3 py-1 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs transition-colors whitespace-nowrap shadow-xs"
                        >
                          تأكيد وقفل الضمان
                        </button>

                        {rem.statusType === 'yellow' && (
                          <button
                            onClick={() => rejectRemittance(rem.id)}
                            className="px-2 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs"
                          >
                            رفض
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Total Summary */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
            <span>عرض 1 إلى {filteredRemittances.length} من أصل {remittances.length} سجلات معلقة</span>
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>إجمالي مبالغ الضمان المحجوزة حالياً في وساطة وصلة: {totalEscrowPoolYER.toLocaleString()} ر.ي يمني</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Student Academic ID Verification Queue (طابور اعتماد بطاقات الطلاب والجامعات) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-5 h-5 text-teal-700" />
                <h3 className="font-black text-base text-[#0B192C]">
                  طابور اعتماد بطاقات الطلاب والجامعات (مدخل الطلاب)
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-normal">
                التأكد من الهوية الأكاديمية والوثائق الجامعية لتمكين شارة "طالب موثق" وبدء استقبال مشاريع الصرافة
              </p>
            </div>

            <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full self-start sm:self-auto">
              طلبات التحقق النشطة: {verificationQueue.length} طلاب
            </span>
          </div>

          {verificationQueue.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              تم اعتماد جميع طلبات التوثيق الأكاديمي الحالية بنجاح!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {verificationQueue.map((student) => (
                <div
                  key={student.id}
                  className="rounded-2xl border border-slate-200/90 p-5 bg-slate-50/40 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Initials, Name, Level */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center shrink-0">
                          {student.initials}
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-[#0B192C]">{student.name}</h4>
                          <span className="text-[11px] text-slate-500 font-semibold block">
                            {student.university} - {student.faculty}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {student.level} • الرقم الأكاديمي: {student.academicId}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                        {student.status}
                      </span>
                    </div>

                    {/* Document Preview Box */}
                    <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between text-xs mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 uppercase">
                          {student.docType}
                        </span>
                        <div>
                          <span className="font-bold text-slate-800 block text-xs">
                            {student.docName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {student.docSize} • {student.docTime}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => openModal('student-doc-preview', student)}
                        className="text-teal-700 font-bold hover:underline text-xs"
                      >
                        استعراض الوثيقة
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => {
                        addToast('طلب إعادة رفع', `تم إرسال إشعار للطالب (${student.name}) لتصوير بطاقة أوضح.`);
                      }}
                      className="py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
                    >
                      طلب إعادة رفع
                    </button>

                    <button
                      onClick={() => approveStudentVerification(student.id)}
                      className="py-2 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>قبول ومنح الشارة</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-400 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>صنعاء • عدن • حضرموت • بوابات الدفع: بنك الكريمي • صرافة النجم</span>
          <span>جميع الحقوق محفوظة لمنصة وصلة للعمل الحر والوساطة الطلابية 2026 ©</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;

