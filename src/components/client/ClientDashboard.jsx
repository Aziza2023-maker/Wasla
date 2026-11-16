import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import ReadinessGuide from '../common/ReadinessGuide';
import FinancialRecordsView from '../common/FinancialRecordsView';
import DisputesHub from '../common/DisputesHub';
import ContractModal from '../common/ContractModal';
import OrderLifecycleView from '../common/OrderLifecycleView';
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
  Sparkles,
  Eye,
  AlertCircle,
  Scale,
  X
} from 'lucide-react';

export const ClientDashboard = () => {
  const {
    clientUser,
    clientContracts,
    serviceOrders,
    navigateTo,
    openModal,
    addToast
  } = useWasla();

  const [activeClientView, setActiveClientView] = useState('overview'); // 'overview' | 'financial' | 'disputes'
  const [activeOrderTab, setActiveOrderTab] = useState('services'); // 'services' | 'contracts'
  const [activeContractModal, setActiveContractModal] = useState(null);
  const [activeOrderForLifecycle, setActiveOrderForLifecycle] = useState(null);
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

  const myServiceOrders = (serviceOrders || []).filter((o) => {
    const matchesUser = o.clientId === clientUser.id || o.clientName?.includes(clientUser.name);
    const matchesSearch =
      o.orderTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.freelancerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.orderCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'review' && ['delivered_pending_review', 'revision_requested'].includes(o.status)) ||
      (filterStatus === 'progress' && ['in_progress', 'awaiting_deposit', 'awaiting_admin_verification', 'contract_pending_approval'].includes(o.status)) ||
      (filterStatus === 'completed' && ['completed', 'approved_pending_payout'].includes(o.status));

    return matchesUser && matchesSearch && matchesStatus;
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
              نظام وساطة حرة آمن لتصفح وطلب الخدمات ومتابعة تنفيذها مع كفاءات كليات ومعاهد المكلا وجامعة حضرموت بضمان Escrow
            </p>
          </div>

          <div className="bg-slate-100 rounded-xl px-3 py-1.5 text-xs text-slate-600 font-semibold self-start sm:self-auto border border-slate-200">
            بوابات وسيطة معتمدة بالمكلا (العمقي / الكريمي / بن دول / البسيري)
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
                إجمالي الصرف المكتمل عبر شبكات صرافة وبنوك حضرموت
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* View Switcher Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveClientView('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeClientView === 'overview'
                ? 'bg-[#0B192C] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4 text-teal-400" />
            <span>لوحة المشاريع والعقود</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
              {clientContracts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveClientView('financial')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeClientView === 'financial'
                ? 'bg-[#0B192C] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <CreditCard className="w-4 h-4 text-sky-400" />
            <span>السجلات والمعاملات المالية</span>
          </button>

          <button
            onClick={() => setActiveClientView('disputes')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeClientView === 'disputes'
                ? 'bg-[#0B192C] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-400" />
            <span>النزاعات والتحكيم الأكاديمي</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-700 border border-amber-300">
              تسوية ثنائية
            </span>
          </button>
        </div>

        {/* Conditional Rendering based on activeClientView */}
        {activeClientView === 'financial' && (
          <div className="space-y-4">
            <FinancialRecordsView title="كشف الحساب والسجلات المالية للعميل" customRole="client" />
          </div>
        )}

        {activeClientView === 'disputes' && (
          <div className="space-y-4">
            <DisputesHub title="مركز تسوية النزاعات والتحكيم للعميل" />
          </div>
        )}

        {activeClientView === 'overview' && (
          <>
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
                      متابعة حالة الطلبات والمشاريع الجارية
                    </h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800">
                      {clientContracts.length} طلبات نشطة
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-normal">
                    عرض مبسط لمتابعة تقدم المهام وحالة الاعتماد الإداري المحمية بالوساطة المالية
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

              {/* Sub-Tabs: Khamsat Microservices Orders vs Custom Contracts */}
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <button
                  onClick={() => setActiveOrderTab('services')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeOrderTab === 'services'
                      ? 'bg-[#0D9488] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>طلبات الخدمات المصغرة (Khamsat Orders)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
                    {myServiceOrders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveOrderTab('contracts')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeOrderTab === 'contracts'
                      ? 'bg-[#0D9488] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>عقود المشاريع المخصصة (Custom Contracts)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
                    {filteredContracts.length}
                  </span>
                </button>
              </div>

              {/* TABLE 1: Khamsat Microservice Orders (14 Lifecycle States) */}
              {activeOrderTab === 'services' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold text-[11px]">
                        <th className="pb-3 pr-2">رمز وعنوان الطلب</th>
                        <th className="pb-3">المستقل الأكاديمي</th>
                        <th className="pb-3">قيمة العقد والضمان</th>
                        <th className="pb-3">حالة الطلب الحالية</th>
                        <th className="pb-3">شبكة الضمان المحلي</th>
                        <th className="pb-3 pl-2 text-center">إجراءات المتابعة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {myServiceOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                          {/* Order Code & Title */}
                          <td className="py-4 pr-2">
                            <span className="font-bold text-[#0B192C] block">
                              {ord.orderTitle}
                            </span>
                            <span className="text-[10px] text-teal-700 font-mono font-bold">
                              {ord.orderCode} • {ord.deliveryDays} أيام (+{ord.bufferDays} هامش)
                            </span>
                          </td>

                          {/* Freelancer */}
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <img
                                src={ord.freelancerAvatar}
                                alt={ord.freelancerName}
                                className="w-7 h-7 rounded-full object-cover border border-teal-500 shrink-0"
                              />
                              <div>
                                <span className="font-semibold text-slate-800 block">
                                  {ord.freelancerName}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {ord.freelancerUniversity}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="py-4 font-mono">
                            <span className="font-black text-slate-800 block">
                              {ord.priceYER?.toLocaleString()} ر.ي
                            </span>
                            <span className="text-[10px] text-slate-400">
                              (${ord.priceUSD})
                            </span>
                          </td>

                          {/* Status Badge */}
                          <td className="py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                ord.status === 'delivered_pending_review'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400'
                                  : ord.status === 'in_progress'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : ord.status === 'awaiting_deposit' || ord.status === 'awaiting_admin_verification'
                                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                                  : ord.status === 'completed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : ord.status === 'disputed'
                                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                                  : 'bg-slate-100 text-slate-800 border-slate-200'
                              }`}
                            >
                              {ord.status === 'in_progress' && (
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                              )}
                              <span>{ord.statusLabel}</span>
                            </span>
                          </td>

                          {/* Escrow Provider */}
                          <td className="py-4">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                              <ShieldCheck className="w-3 h-3 text-teal-600" />
                              <span>{ord.escrowProvider || 'وساطة معتمدة'}</span>
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-4 pl-2 text-center">
                            <button
                              onClick={() => setActiveOrderForLifecycle(ord)}
                              className="border border-teal-300 bg-teal-50 hover:bg-teal-100 text-teal-900 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors whitespace-nowrap flex items-center gap-1.5 mx-auto shadow-2xs"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                              <span>إدارة وتتبع الطلب</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TABLE 2: Custom Project Contracts */}
              {activeOrderTab === 'contracts' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold text-[11px]">
                        <th className="pb-3 pr-2">الطلب / الخدمة</th>
                        <th className="pb-3">الطالب المستقل</th>
                        <th className="pb-3">الكلية والجامعة</th>
                        <th className="pb-3">المبلغ المتفق</th>
                        <th className="pb-3">حالة الطلب</th>
                        <th className="pb-3">الضمان المالي (Escrow)</th>
                        <th className="pb-3 pl-2 text-center">الإجراءات المتاحة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredContracts.map((contract) => (
                        <tr key={contract.id} className="hover:bg-slate-50/60 transition-colors">
                          {/* Order & Role */}
                          <td className="py-4 pr-2">
                            <span className="font-bold text-[#0B192C] block">
                              {contract.studentRole}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              عقد #{contract.id}
                            </span>
                          </td>

                          {/* Student */}
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs shrink-0">
                                {contract.studentInitials}
                              </div>
                              <span className="font-semibold text-slate-800">
                                {contract.studentName}
                              </span>
                            </div>
                          </td>

                          {/* College & University */}
                          <td className="py-4 text-slate-600">
                            <span className="font-medium block">{contract.college}</span>
                            <span className="text-[10px] text-slate-400">{contract.university}</span>
                          </td>

                          {/* Agreed Budget */}
                          <td className="py-4 font-black text-slate-800">
                            {contract.agreedBudget}
                          </td>

                          {/* Simplified Order Status */}
                          <td className="py-4">
                            {contract.status.includes('للمراجعة') ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                <span>في انتظار تأكيد المسؤول</span>
                              </span>
                            ) : contract.status.includes('قيد التنفيذ') ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                <span>قيد التنفيذ ({contract.status.replace('قيد التنفيذ', '').trim() || 'جارٍ العمل'})</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>مكتمل بنجاح</span>
                              </span>
                            )}
                          </td>

                          {/* Escrow Status (Protected/Read-Only) */}
                          <td className="py-4">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                              <ShieldCheck className="w-3 h-3 text-teal-600" />
                              <span>
                                {contract.status.includes('مكتمل')
                                  ? 'تم صرف الضمان للطالب'
                                  : 'محجوز بأمان لدى الإدارة'}
                              </span>
                            </span>
                          </td>

                          {/* Client Actions */}
                          <td className="py-4 pl-2 text-center">
                            <div className="flex items-center justify-center gap-1.5 flex-wrap">
                              <button
                                onClick={() => setActiveContractModal(contract)}
                                className="border border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-800 px-2 py-1 rounded-lg font-bold text-xs transition-colors whitespace-nowrap flex items-center gap-1"
                                title="معاينة وثيقة العقد الثنائي"
                              >
                                <FileText className="w-3.5 h-3.5 text-teal-600" />
                                <span>معاينة العقد</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Safety & Escrow Notice */}
              <div className="mt-4 p-3.5 rounded-xl bg-teal-50/70 border border-teal-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-teal-900">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" />
                  <p className="font-medium text-[11px] leading-relaxed">
                    <strong>ملاحظة أمان الوساطة (Escrow):</strong> تحرير وصرف مبالغ الضمان المالي للمستقلين يتم مركزياً وحصرياً عبر الإدارة المالية لمنصة «وصلة» بعد التأكد من مطابقة مخرجات العمل واستلامك للمشروع كاملاً.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('support')}
                  className="text-teal-800 hover:underline font-bold text-[11px] whitespace-nowrap shrink-0 self-end sm:self-auto"
                >
                  سياسة الضمان
                </button>
              </div>

              {/* Pagination */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-2">
                <span>عرض {filteredContracts.length} من أصل {clientContracts.length} مشاريع مسجلة</span>
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
                  شبكات الصرافة والوساطة المحلية المعتمدة بالمكلا
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {/* 1. Omgy */}
                <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">
                        ★
                      </div>
                      <span className="text-[9px] font-bold text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded">
                        حضرموت
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-[#0B192C]">شركة العمقي للصرافة</h4>
                    <span className="text-[10px] text-slate-500">Al-Omgy Exchange</span>
                  </div>
                  <div className="pt-1.5 border-t border-teal-100 text-[10px] text-teal-700 font-bold mt-2">
                    ✓ معتمد كلياً
                  </div>
                </div>

                {/* 2. Kuraimi */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        ★
                      </div>
                      <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                        بنك معتمد
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-[#0B192C]">بنك الكريمي</h4>
                    <span className="text-[10px] text-slate-500">Kuraimi Express</span>
                  </div>
                  <div className="pt-1.5 border-t border-emerald-100 text-[10px] text-emerald-700 font-bold mt-2">
                    ✓ تم التحقق
                  </div>
                </div>

                {/* 3. Bin Dowla */}
                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                        ★
                      </div>
                      <span className="text-[9px] font-bold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">
                        إسلامي
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-[#0B192C]">بنك بن دول</h4>
                    <span className="text-[10px] text-slate-500">Bin Dowla Bank</span>
                  </div>
                  <div className="pt-1.5 border-t border-blue-100 text-[10px] text-blue-700 font-bold mt-2">
                    ✓ فرع المكلا
                  </div>
                </div>

                {/* 4. Buseiri */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                        ★
                      </div>
                      <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        كاش فوري
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-[#0B192C]">شركة البسيري للصرافة</h4>
                    <span className="text-[10px] text-slate-500">Al-Buseiri Exchange</span>
                  </div>
                  <div className="pt-1.5 border-t border-amber-100 text-[10px] text-amber-700 font-bold mt-2">
                    ✓ معتمد محلياً
                  </div>
                </div>
              </div>

              {/* Upload Proof Banner */}
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs text-[#0B192C] mb-0.5">
                    رفع إثبات التحويل المالي (Upload Remittance Proof)
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    أرفق صورة السند أو إشعار الإيداع الصادر عن العمقي، الكريمي، بن دول، أو البسيري لكفالة عقد المشروع فوراً
                  </span>
                </div>
                <button
                  onClick={() => openModal('client-upload-proof')}
                  className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <Upload className="w-4 h-4" />
                  <span>رفع سند الإيداع</span>
                </button>
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
                  onClick={() => setActiveClientView('overview')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeClientView === 'overview'
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    المشاريع والعقود الجارية
                  </span>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                    {clientContracts.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveClientView('financial')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeClientView === 'financial'
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    المعاملات المالية والوثائق
                  </span>
                </button>

                <button
                  onClick={() => setActiveClientView('disputes')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeClientView === 'disputes'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-600" />
                    النزاعات والتحكيم
                  </span>
                  <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
                    مركز التسوية
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
                  onClick={() => navigateTo('support')}
                  className="text-teal-400 hover:underline font-bold"
                >
                  شروط الوساطة
                </button>
                <span>وساطة مالية مشفرة</span>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </main>

      {/* Bilateral Contract Modal */}
      <ContractModal
        contract={activeContractModal}
        isOpen={Boolean(activeContractModal)}
        onClose={() => setActiveContractModal(null)}
        onOpenDispute={(cnt) => {
          setActiveContractModal(null);
          setActiveClientView('disputes');
        }}
      />

      {/* Interactive Order Lifecycle Modal */}
      {activeOrderForLifecycle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
          dir="rtl"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveOrderForLifecycle(null);
          }}
        >
          <div className="bg-white rounded-3xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col">
            <div className="p-4 bg-[#0B192C] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span className="font-bold text-xs">إدارة ومتابعة دورة حياة الطلب (14 مرحلة)</span>
              </div>
              <button
                onClick={() => setActiveOrderForLifecycle(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <OrderLifecycleView
                orderId={activeOrderForLifecycle.id}
                onClose={() => setActiveOrderForLifecycle(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منصة وصلة © 2025 - جميع الحقوق محفوظة لوساطة العمل الحر لطلاب الجامعات اليمنية.</span>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => navigateTo('support')} className="hover:text-slate-600">سياسة الضمان المالي</button>
            <button onClick={() => navigateTo('landing')} className="hover:text-slate-600">التحقق من الكليات</button>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-600">مركز الدعم والوساطة</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientDashboard;

