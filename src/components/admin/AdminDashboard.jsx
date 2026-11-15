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
    currentRole,
    remittances,
    verificationQueue,
    clientContracts,
    releaseEscrow,
    confirmAndLockEscrow,
    rejectRemittance,
    approveStudentVerification,
    openModal,
    addToast,
    navigateTo
  } = useWasla();

  const [activeAccordion, setActiveAccordion] = useState(1);
  const [remittanceFilter, setRemittanceFilter] = useState('all'); // 'all' | 'omgy' | 'kuraimi' | 'bindowla' | 'buseiri'
  const [contractFilter, setContractFilter] = useState('all'); // 'all' | 'pending_release' | 'completed' | 'in_progress'

  const isAdmin = currentRole === 'admin';

  const filteredRemittances = remittances.filter((r) => {
    if (remittanceFilter === 'omgy') return r.providerType === 'omgy';
    if (remittanceFilter === 'kuraimi') return r.providerType === 'kuraimi';
    if (remittanceFilter === 'bindowla') return r.providerType === 'bindowla';
    if (remittanceFilter === 'buseiri') return r.providerType === 'buseiri';
    return true;
  });

  const filteredAdminContracts = (clientContracts || []).filter((c) => {
    if (contractFilter === 'pending_release') return c.canRelease || c.status.includes('للمراجعة');
    if (contractFilter === 'completed') return c.status.includes('مكتمل');
    if (contractFilter === 'in_progress') return c.status.includes('قيد التنفيذ');
    return true;
  });

  const totalEscrowPoolYER = remittances.reduce((acc, r) => acc + (r.amountYER || 0), 0);
  const pendingReleaseCount = (clientContracts || []).filter((c) => c.canRelease || c.status.includes('للمراجعة')).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-right" dir="rtl">
      {/* 1. Header (Matching Mockup) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WaslaLogo
              variant="dark"
              size="md"
              subTitle="WASLA.YE"
              onClick={() => navigateTo('landing')}
            />
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
              <span>الوساطة مفعلة: العمقي، الكريمي، بن دول، البسيري</span>
            </div>

            <button
              onClick={() => navigateTo('freelancers')}
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
                      يقوم العميل بإيداع القيمة المالية للمشروع عبر الحسابات المعتمدة لمنصة وصلة لدى شبكات الصرافة والبنوك المحلية في المكلا وحضرموت (شركة العمقي للصرافة، بنك الكريمي إكسبرس، بنك بن دول للتمويل الأصغر الإسلامي، أو شركة البسيري للصرافة)، حيث يتم رفع رقم الحوالة وصورة السند فوراً، ويقوم المشرف المالي بمطابقة الاسم والمبلغ بنكياً، وحجز المبلغ كضمان معلق (Escrow) لحين إكمال المشروع وتأكيد استلام المخرجات.
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
                منصة «وصلة» لا تكتفي بالربط، بل تضمن كافة التعاملات والتحويلات المالية المتبادلة بين الطرفين، وتوفر بيئة عمل آمنة واحترافية للوساطة مع شبكات الصرافة والبنوك المحلية المعتمدة بالمكلا وحضرموت (العمقي، الكريمي، بن دول، والبسيري) لحماية المستقل والعميل على حد سواء حتى اكتمال المشروع وتسليمه بنجاح.
              </p>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
                <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800">
                  <span className="text-[10px] text-teal-400 block font-bold mb-0.5">السوق المحلي</span>
                  <span className="text-[10px] text-slate-300">المكلا - محافظة حضرموت</span>
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
                  سجل إيداعات الحوالات المحلية المعلقة (العمقي، الكريمي، بن دول، البسيري)
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  بانتظار التأكيد ({remittances.length})
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal">
                مراجعة إيداعات العملاء عبر السندات البنكية وحجز الضمان لحين إكمال المشاريع
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold flex-wrap">
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
                onClick={() => setRemittanceFilter('omgy')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  remittanceFilter === 'omgy'
                    ? 'bg-white text-teal-800 shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                العمقي ({remittances.filter((r) => r.providerType === 'omgy').length})
              </button>
              <button
                onClick={() => setRemittanceFilter('kuraimi')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  remittanceFilter === 'kuraimi'
                    ? 'bg-white text-emerald-800 shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                الكريمي ({remittances.filter((r) => r.providerType === 'kuraimi').length})
              </button>
              <button
                onClick={() => setRemittanceFilter('bindowla')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  remittanceFilter === 'bindowla'
                    ? 'bg-white text-blue-800 shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                بن دول ({remittances.filter((r) => r.providerType === 'bindowla').length})
              </button>
              <button
                onClick={() => setRemittanceFilter('buseiri')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  remittanceFilter === 'buseiri'
                    ? 'bg-white text-amber-800 shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                البسيري ({remittances.filter((r) => r.providerType === 'buseiri').length})
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

        {/* Central Administrative Escrow Release & Contracts Oversight Section (Strict Admin-Only RBAC) */}
        {isAdmin ? (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            {/* Header & Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="font-black text-base text-[#0B192C]">
                    جدول التتبع والرقابة المركزية: فحص المخرجات وتحرير الضمان المالي للمستقلين (Escrow Release)
                  </h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    صلاحية إدارية حصرية
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-normal">
                  صلاحية المشرف المالي الحصرية لمطابقة تسليمات الطلاب وفك حجز الضمان وتحويل المستحقات لحساب المستقل (العمقي / الكريمي / بن دول / البسيري)
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setContractFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    contractFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  جميع العقود ({clientContracts.length})
                </button>
                <button
                  onClick={() => setContractFilter('pending_release')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    contractFilter === 'pending_release'
                      ? 'bg-white text-amber-900 shadow-xs font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  بانتظار تحرير الضمان ({pendingReleaseCount})
                </button>
                <button
                  onClick={() => setContractFilter('in_progress')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    contractFilter === 'in_progress'
                      ? 'bg-white text-blue-900 shadow-xs font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  قيد التنفيذ
                </button>
                <button
                  onClick={() => setContractFilter('completed')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    contractFilter === 'completed'
                      ? 'bg-white text-emerald-900 shadow-xs font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  المحررة والمكتملة
                </button>
              </div>
            </div>

            {/* Admin Contracts Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold text-[11px]">
                    <th className="pb-3 pr-2">رقم العقد</th>
                    <th className="pb-3">الطالب المستقل</th>
                    <th className="pb-3">الكلية والجامعة</th>
                    <th className="pb-3">المشروع / المهمة</th>
                    <th className="pb-3">مبلغ الضمان</th>
                    <th className="pb-3">حالة الإنجاز</th>
                    <th className="pb-3">حالة الضمان في Escrow</th>
                    <th className="pb-3 pl-2 text-center">إجراءات الرقابة وتحرير الضمان</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAdminContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Contract ID */}
                      <td className="py-4 pr-2 font-mono font-bold text-slate-700">
                        #{contract.id}
                      </td>

                      {/* Student */}
                      <td className="py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs shrink-0">
                            {contract.studentInitials}
                          </div>
                          <div>
                            <span className="font-bold text-[#0B192C] block">
                              {contract.studentName}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {contract.bufferTag}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* College & University */}
                      <td className="py-4 text-slate-600">
                        <span className="font-semibold block">{contract.college}</span>
                        <span className="text-[10px] text-slate-400">{contract.university}</span>
                      </td>

                      {/* Role / Project */}
                      <td className="py-4 text-slate-700 max-w-xs font-medium truncate">
                        {contract.studentRole}
                      </td>

                      {/* Budget */}
                      <td className="py-4 font-black text-slate-900">
                        {contract.agreedBudget}
                      </td>

                      {/* Status */}
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            contract.statusType === 'amber'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : contract.statusType === 'blue'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              contract.statusType === 'amber'
                                ? 'bg-amber-500'
                                : contract.statusType === 'blue'
                                ? 'bg-blue-500'
                                : 'bg-emerald-500'
                            }`}
                          />
                          {contract.status}
                        </span>
                      </td>

                      {/* Escrow Status */}
                      <td className="py-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                          {contract.escrowStatus}
                        </span>
                      </td>

                      {/* Administrative Actions */}
                      <td className="py-4 pl-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => addToast('فحص المخرجات', `جاري استعراض ملفات وتسليم الطالب (${contract.studentName}) لمطابقة الشروط والمواصفات.`)}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs transition-colors"
                          >
                            معاينة الكود
                          </button>

                          {contract.canRelease ? (
                            <button
                              onClick={() => releaseEscrow(contract.id)}
                              className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-3.5 py-1.5 rounded-lg font-bold text-xs shadow-xs transition-colors whitespace-nowrap flex items-center gap-1.5"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              <span>تحرير وصرف الضمان</span>
                            </button>
                          ) : contract.status.includes('مكتمل') ? (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>تم الصرف والتحرير</span>
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                              قيد التنفيذ
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Admin Notice */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>إجمالي العقود الخاضعة لرقابة الوساطة: {clientContracts.length} عقود • الضمان المالي محمي بالكامل حتى اعتماد الإدارة.</span>
              </div>
              <span className="text-[11px] font-bold text-teal-800">
                بوابة الرقابة والضمان Escrow v2.4
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center text-rose-800">
            <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
            <h4 className="font-black text-sm mb-1">وصول إداري مقيّد</h4>
            <p className="text-xs text-rose-600">هذه الخاصية تتطلب صلاحيات المسؤول المالي (Admin) فقط ولا تظهر لبقية الأدوار.</p>
          </div>
        )}

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
          <span>المكلا • محافظة حضرموت • شبكات الصرافة والوساطة: العمقي • الكريمي • بن دول • البسيري</span>
          <span>جميع الحقوق محفوظة لمنصة وصلة للعمل الحر والوساطة الطلابية 2026 ©</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;

