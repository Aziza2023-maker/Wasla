import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import ReadinessGuide from '../common/ReadinessGuide';
import {
  Briefcase,
  Plus,
  ShieldCheck,
  Building,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Check,
  Star,
  FileText,
  Upload,
  ArrowLeft,
  ChevronDown,
  Layers,
  CreditCard,
  Lock,
  Headphones,
  UserCheck,
  PlusCircle,
  Sparkles
} from 'lucide-react';

export const ClientDashboard = () => {
  const {
    clientUser,
    clientContracts,
    navigateTo,
    openModal,
    releaseEscrow,
    addToast
  } = useWasla();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'review' | 'progress' | 'completed'

  const filteredContracts = clientContracts.filter((c) => {
    const matchesSearch =
      c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.studentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.university.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'review' && c.status.includes('للمراجعة')) ||
      (filterStatus === 'progress' && c.status.includes('قيد التنفيذ')) ||
      (filterStatus === 'completed' && c.status.includes('مكتمل'));

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-right" dir="rtl">
      {/* 1. Header (Matching Mockup) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <WaslaLogo
            variant="dark"
            size="md"
            subTitle="WASLA.YE"
            onClick={() => navigateTo('landing')}
          />

          <nav className="hidden lg:flex items-center gap-6 text-xs text-slate-600 font-medium">
            <span className="font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              لوحة العميل
            </span>
            <button onClick={() => navigateTo('freelancers')} className="hover:text-slate-900 transition-colors">
              تصفح المستقلين
            </button>
            <button onClick={() => navigateTo('services')} className="hover:text-slate-900 transition-colors">
              سوق الخدمات
            </button>
            <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>وساطة الضمان الآمن (100% موثق)</span>
            </div>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-900 transition-colors">
              مركز الدعم والنزاعات
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => openModal('readiness-guide', { mode: 'client' })}
              className="hidden md:flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 px-3 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>دليل الجاهزية</span>
            </button>

            <button
              onClick={() => openModal('create-project')}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>نشر مشروع جديد</span>
            </button>

            <button
              onClick={() => navigateTo('services')}
              className="bg-slate-100 hover:bg-slate-200 text-[#0B192C] px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 border border-slate-200"
            >
              <Briefcase className="w-4 h-4" />
              <span>تصفح الخدمات</span>
            </button>

            <div className="flex items-center gap-2.5 border-r border-slate-200 pr-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-teal-500">
                <img
                  src={clientUser.avatar}
                  alt={clientUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-right hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-[#0B192C]">{clientUser.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <span className="text-[10px] text-slate-400 font-normal">{clientUser.title}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 flex-1 w-full">
        {/* Title & Subtitle Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <h1 className="text-xl sm:text-2xl font-black text-[#0B192C]">
                لوحة تحكم العميل وإدارة طلبات الخدمات
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              نظام وساطة حرة آمن لتصفح وطلب الخدمات المصغرة ومتابعة تنفيذها مع طلاب الجامعات اليمنية بضمان Escrow
            </p>
          </div>

          <div className="bg-slate-100 rounded-xl px-3 py-1.5 text-xs text-slate-600 font-semibold self-start sm:self-auto border border-slate-200">
            بوابة وسيطة معتمدة (الكريمي / ون كاش / التحويل البنكي)
          </div>
        </div>

        {/* 3 Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Escrow Locked */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block mb-1">الرصيد المحجوز كضمان</span>
              <div className="text-2xl font-black text-[#0B192C] tracking-tight mb-1">
                ${clientUser.totalEscrowUSD.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                الضمان المحمي في المنصة
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Completed Projects */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block mb-1">المشاريع الإجمالية المنجزة</span>
              <div className="text-2xl font-black text-[#0B192C] tracking-tight mb-1">
                {clientUser.completedProjects}
              </div>
              <span className="text-[11px] text-teal-800 font-bold">
                معدل التسليم الناجح: 98%
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Released Transfers */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block mb-1">المعاملات المالية المحررة</span>
              <div className="text-2xl font-black text-[#0B192C] tracking-tight mb-1">
                {clientUser.releasedTransfersCount} حوالة
              </div>
              <span className="text-[11px] text-amber-700 font-bold">
                إجمالي الصرف المكتمل عبر الكريمي وبنوك اليمن
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 3. Main Split Layout: Active Contracts Table vs Right Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Table Column (9 cols on lg) */}
          <div className="lg:col-span-9 space-y-4">
            {/* Interactive Readiness Guide for Clients */}
            <ReadinessGuide
              mode="client"
              variant="collapsible"
              defaultExpanded={false}
              showRoleSwitcher={true}
            />

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              {/* Header & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-black text-base text-[#0B192C]">
                      الخدمات المصغرة والطلبات الجارية مع المستقلين
                    </h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800">
                      {clientContracts.length} نشطة
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-normal">
                    متابعة دقيقة لكل طالب مستقل، المبالغ المحجوزة في الضمان المالي Escrow ومواعيد التسليم
                  </p>
                </div>

                {/* Search & Filter */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="بحث عن طالب أو مشروع..."
                      className="bg-slate-50 border border-slate-200 rounded-xl py-2 pr-8 pl-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white w-48 sm:w-56"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                  </div>

                  <button
                    onClick={() => {
                      const nextStatus =
                        filterStatus === 'all'
                          ? 'review'
                          : filterStatus === 'review'
                          ? 'progress'
                          : filterStatus === 'progress'
                          ? 'completed'
                          : 'all';
                      setFilterStatus(nextStatus);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-600 transition-colors"
                  >
                    <Filter className="w-3.5 h-3.5 text-teal-600" />
                    <span>تصفية ({filterStatus === 'all' ? 'الكل' : filterStatus})</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold text-[11px]">
                      <th className="pb-3 pr-2">الطالب المستقل</th>
                      <th className="pb-3">الكلية والجامعة</th>
                      <th className="pb-3">المبلغ المتفق</th>
                      <th className="pb-3">حالة الإنجاز</th>
                      <th className="pb-3">الهامش والضمان</th>
                      <th className="pb-3 pl-2 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredContracts.map((contract) => (
                      <tr key={contract.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Student */}
                        <td className="py-4 pr-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs shrink-0">
                              {contract.studentInitials}
                            </div>
                            <div>
                              <span className="font-bold text-[#0B192C] block">
                                {contract.studentName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-normal">
                                {contract.studentRole}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* College & University */}
                        <td className="py-4 text-slate-600">
                          <span className="font-semibold block">{contract.college}</span>
                          <span className="text-[10px] text-slate-400">{contract.university}</span>
                        </td>

                        {/* Agreed Budget */}
                        <td className="py-4 font-black text-slate-800">
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

                        {/* Buffer & Escrow */}
                        <td className="py-4">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                            {contract.escrowStatus}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 pl-2 text-center">
                          {contract.canRelease ? (
                            <button
                              onClick={() => releaseEscrow(contract.id)}
                              className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-3.5 py-1.5 rounded-lg font-bold text-xs shadow-xs transition-colors whitespace-nowrap"
                            >
                              تحرير الضمان
                            </button>
                          ) : contract.canRate ? (
                            <button
                              onClick={() => addToast('تقييم الطالب', 'تم فتح نموذج التقييم ومنح الطالب 5 نجوم.')}
                              className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-lg font-bold text-xs transition-colors whitespace-nowrap"
                            >
                              تقييم الطالب
                            </button>
                          ) : (
                            <button
                              onClick={() => addToast('عرض التقدم', 'جاري جلب تفاصيل المعالم ونماذج العمل المرفوعة.')}
                              className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-lg font-bold text-xs transition-colors whitespace-nowrap"
                            >
                              عرض التقدم
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>عرض {filteredContracts.length} من أصل 6 مشاريع مسجلة في هذا الشهر</span>
                <div className="flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold">
                    السابق
                  </button>
                  <button className="px-2.5 py-1 rounded bg-[#0D9488] text-white font-bold">
                    1
                  </button>
                  <button className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold">
                    2
                  </button>
                  <button className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold">
                    التالي
                  </button>
                </div>
              </div>
            </div>

            {/* Local Payment Verification & Proof Uploader (Matching Mockup 0708f117) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  <h3 className="font-black text-sm text-[#0B192C]">
                    التحقق من المدفوعات والحوالات المحلية
                  </h3>
                </div>
                <span className="text-xs text-teal-700 font-bold">
                  تحويل محلي آمن (الكريمي / النجم)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Kuraimi */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                        ★
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        وسيلة آمنة
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-[#0B192C]">صرافة الكريمي</h4>
                    <span className="text-[10px] text-slate-400">Kuraimi Express</span>
                  </div>
                  <div className="pt-2 border-t border-emerald-100 text-[10px] text-emerald-700 font-bold mt-2">
                    ✓ تم التحقق
                  </div>
                </div>

                {/* 2. Najm */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                        ★
                      </div>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        دعم محلي
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-[#0B192C]">صرافة النجم</h4>
                    <span className="text-[10px] text-slate-400">Authorized Partner</span>
                  </div>
                  <div className="pt-2 border-t border-amber-100 text-[10px] text-amber-700 font-bold mt-2">
                    ✓ معتمدة
                  </div>
                </div>

                {/* 3. Upload Proof Button */}
                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-[#0B192C] mb-1">
                      رفع إثبات التحويل (Upload Proof)
                    </h4>
                    <span className="text-[10px] text-slate-400 block mb-3">
                      رفع إثبات التحويل لكفالة العقد
                    </span>
                  </div>
                  <button
                    onClick={() => openModal('client-upload-proof')}
                    className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-2 rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>استعراض</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Menu Column (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Control Screens Menu */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-slate-400 block mb-3">شاشات تحكم العميل</span>
              <div className="space-y-1">
                <button
                  onClick={() => navigateTo('client-dashboard')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-teal-50 text-teal-800 font-bold text-xs border border-teal-200"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    لوحة التحكم الرئيسية
                  </span>
                </button>

                <button
                  onClick={() => addToast('المشاريع والعقود', 'تم تصفية القائمة لعرض العقود الجارية (6).')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-bold"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    المشاريع والعقود
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">6 جار</span>
                </button>

                <button
                  onClick={() => addToast('المعاملات المالية', 'تم عرض كشف حساب التحويلات البنكية المحررة.')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-bold"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    المعاملات المالية
                  </span>
                </button>

                <button
                  onClick={() => openModal('client-upload-proof')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-slate-400" />
                    المدفوعات والإيداع
                  </span>
                </button>

                <div className="pt-2 border-t border-slate-100 mt-2">
                  <div className="flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-600">
                    <span>الميزة: الضمان المحمي</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      آمن 100%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Escrow Rights Assurance Card */}
            <div className="bg-[#0B192C] text-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-teal-400 mb-2 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>ضمان حقوق الطرفين</span>
              </div>
              <p className="text-[11px] text-slate-300 font-normal leading-relaxed mb-4">
                لا يتم تحرير أي مبلغ إلى الطالب المستقل إلا بعد مراجعة العميل والتأكيد النهائي للمخرجات وتسليم كامل المهام.
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                <button
                  onClick={() => navigateTo('admin-panel')}
                  className="text-teal-400 hover:underline font-bold"
                >
                  شروط الوساطة
                </button>
                <span>وساطة مالية مشفرة</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منصة وصلة © 2025 - جميع الحقوق محفوظة لوساطة العمل الحر لطلاب الجامعات اليمنية.</span>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => navigateTo('admin-panel')} className="hover:text-slate-600">سياسة الضمان المالي</button>
            <button onClick={() => navigateTo('landing')} className="hover:text-slate-600">التحقق من الكليات</button>
            <button onClick={() => navigateTo('admin-panel')} className="hover:text-slate-600">اتصل بالإدارة</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientDashboard;

