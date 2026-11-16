import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  CreditCard,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Printer,
  Download,
  Info,
  Building,
  RefreshCw,
  X
} from 'lucide-react';

export const FinancialRecordsView = ({ title = 'السجلات والمعاملات المالية', customRole = null }) => {
  const {
    currentRole,
    clientUser,
    freelancerUser,
    financialRecords,
    recordFinancialTransaction,
    openModal
  } = useWasla();

  const role = customRole || currentRole;
  const isClient = role === 'client';
  const isFreelancer = role === 'freelancer';

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // all | deposit | release | refund
  const [providerFilter, setProviderFilter] = useState('all'); // all | omgy | kuraimi | bindowla | buseiri
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Filter records based on role and active search
  const filteredRecords = financialRecords.filter((rec) => {
    // If client, prefer records involving client
    if (isClient && rec.clientName && !rec.clientName.includes(clientUser.name) && rec.type !== 'deposit') {
      // allow default demo ones
    }
    // Filter by type
    if (typeFilter !== 'all' && rec.type !== typeFilter) return false;
    // Filter by provider
    if (providerFilter !== 'all') {
      if (providerFilter === 'omgy' && !rec.provider?.includes('العمقي')) return false;
      if (providerFilter === 'kuraimi' && !rec.provider?.includes('الكريمي')) return false;
      if (providerFilter === 'bindowla' && !rec.provider?.includes('بن دول')) return false;
      if (providerFilter === 'buseiri' && !rec.provider?.includes('البسيري')) return false;
    }
    // Search text
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchRef = rec.refCode?.toLowerCase().includes(q);
      const matchTitle = rec.title?.toLowerCase().includes(q);
      const matchProject = rec.projectTitle?.toLowerCase().includes(q);
      const matchClient = rec.clientName?.toLowerCase().includes(q);
      const matchFreelancer = rec.freelancerName?.toLowerCase().includes(q);
      if (!matchRef && !matchTitle && !matchProject && !matchClient && !matchFreelancer) return false;
    }
    return true;
  });

  // Totals calculations
  const totalDeposited = financialRecords
    .filter((r) => r.type === 'deposit')
    .reduce((acc, curr) => acc + (curr.amountYER || 0), 0);

  const totalReleased = financialRecords
    .filter((r) => r.type === 'release')
    .reduce((acc, curr) => acc + (curr.amountYER || 0), 0);

  const totalRefunded = financialRecords
    .filter((r) => r.type === 'refund')
    .reduce((acc, curr) => acc + (curr.amountYER || 0), 0);

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
              <CreditCard className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-[#0B192C]">
              {title}
            </h1>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            كشف حساب مركزي وسجل موثق لحركات الإيداع والضمان المحجوز (Escrow) والتحويلات عبر شبكات صرافة وبنوك حضرموت (العمقي، الكريمي، بن دول، البسيري).
          </p>
        </div>

        {/* Quick action buttons depending on role */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {isClient && (
            <button
              onClick={() => openModal('client-upload-proof')}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>إيداع ضمان جديد (سند تحويل)</span>
            </button>
          )}

          {isFreelancer && (
            <button
              onClick={() => openModal('withdraw-funds')}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>طلب سحب أرباح فورية</span>
            </button>
          )}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Held Escrow */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">إجمالي الضمان المالي المحجوز</span>
            <span className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-[#0B192C] mb-1">
            {isClient
              ? `${(clientUser.totalEscrowYER || 420000).toLocaleString()} ر.ي`
              : `${(freelancerUser.escrowLockedYER || 588000).toLocaleString()} ر.ي`}
          </div>
          <div className="text-[11px] text-sky-700 font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>محفوظ في حساب وساطة Escrow حتى تسليم المخرجات</span>
          </div>
        </div>

        {/* Released Payouts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">التحويلات المحررة المكتملة</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600 mb-1">
            {totalReleased.toLocaleString()} ر.ي
          </div>
          <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>تم صرفها واستلامها عبر الشبكات المعتمدة</span>
          </div>
        </div>

        {/* Platform Fees & Transparency */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">رسوم المنصة والوساطة</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Info className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-[#0B192C] mb-1">
            {isClient ? '0% مجاناً' : '5% تشغيلية'}
          </div>
          <div className="text-[11px] text-amber-700 font-bold">
            {isClient
              ? 'إطلاق ترويجي مجاني للعملاء في حضرموت'
              : 'تغطية خدمات التحقق الأكاديمي والوساطة'}
          </div>
        </div>

        {/* Refunded or Disputed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">المبالغ المستردة بالتسويات</span>
            <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <RefreshCw className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-purple-700 mb-1">
            {totalRefunded.toLocaleString()} ر.ي
          </div>
          <div className="text-[11px] text-purple-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>عبر قرارات التسوية الودية والتحكيم</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          <input
            type="text"
            placeholder="بحث برقم المرجع، المشروع، أو الطرف الآخر..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Type filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                typeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setTypeFilter('deposit')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                typeFilter === 'deposit' ? 'bg-white text-teal-700 shadow-xs' : 'hover:text-teal-700'
              }`}
            >
              إيداع ضمان
            </button>
            <button
              onClick={() => setTypeFilter('release')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                typeFilter === 'release' ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-emerald-700'
              }`}
            >
              تحرير دفعات
            </button>
            <button
              onClick={() => setTypeFilter('refund')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                typeFilter === 'refund' ? 'bg-white text-purple-700 shadow-xs' : 'hover:text-purple-700'
              }`}
            >
              تسويات واسترداد
            </button>
          </div>

          {/* Provider selector */}
          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            aria-label="تصفية بحسب الشبكة المالية أو البنك"
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500"
          >
            <option value="all">كافة شبكات الصرافة</option>
            <option value="omgy">شركة العمقي للصرافة</option>
            <option value="kuraimi">بنك الكريمي</option>
            <option value="bindowla">بنك بن دول الإسلامي</option>
            <option value="buseiri">شركة البسيري للصرافة</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0B192C]">
            قائمة المعاملات والسندات المالية ({filteredRecords.length})
          </h2>
          <span className="text-[11px] text-slate-400 font-normal">
            يتم تحديث الكشوفات دورياً وتوثيقها بأرقام حوالات رسمية
          </span>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-600">لا توجد حركات مالية مطابقة للمعايير المحددة</p>
            <p className="text-[11px] text-slate-400">جرب تعديل خيارات التصفية أو مسح عبارة البحث</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200/70">
                  <th className="py-3 px-4">رقم المرجع / السند</th>
                  <th className="py-3 px-4">نوع المعاملة</th>
                  <th className="py-3 px-4">المشروع / الغرض</th>
                  <th className="py-3 px-4">الطرف الثاني</th>
                  <th className="py-3 px-4">وسيط التحويل</th>
                  <th className="py-3 px-4">المبلغ</th>
                  <th className="py-3 px-4">التاريخ</th>
                  <th className="py-3 px-4">الحالة</th>
                  <th className="py-3 px-4 text-center">المستند</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredRecords.map((rec) => {
                  const isDeposit = rec.type === 'deposit';
                  const isRelease = rec.type === 'release';
                  const isRefund = rec.type === 'refund';

                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Ref Code */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {rec.refCode}
                      </td>

                      {/* Type Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isDeposit
                              ? 'bg-sky-50 text-sky-700 border border-sky-200'
                              : isRelease
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}
                        >
                          {isDeposit && <ArrowDownLeft className="w-3 h-3" />}
                          {isRelease && <ArrowUpRight className="w-3 h-3" />}
                          {isRefund && <RefreshCw className="w-3 h-3" />}
                          <span>{rec.title}</span>
                        </span>
                      </td>

                      {/* Project */}
                      <td className="py-3.5 px-4 text-slate-800 font-semibold max-w-[200px] truncate">
                        {rec.projectTitle}
                      </td>

                      {/* Counterparty */}
                      <td className="py-3.5 px-4 text-slate-600">
                        {isClient ? rec.freelancerName || 'المستقل الأكاديمي' : rec.clientName || 'العميل'}
                      </td>

                      {/* Provider */}
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          <span>{rec.provider}</span>
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-4 font-bold">
                        <div className="text-slate-900">
                          {rec.amountYER?.toLocaleString()} ر.ي
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          ~${rec.amountUSD || Math.round(rec.amountYER / 535)} USD
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        <div>{rec.date}</div>
                        <div className="text-[10px] text-slate-400">{rec.time}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{rec.status === 'completed' ? 'معتمد ومؤكد' : rec.status}</span>
                        </span>
                      </td>

                      {/* Receipt Action */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setSelectedReceipt(rec)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                          title="عرض إيصال المعاملة"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                          <span>الإيصال</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Local Escrow & Banking Notice */}
      <div className="bg-gradient-to-r from-teal-50/70 to-sky-50/70 rounded-2xl p-5 border border-teal-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-[#0B192C]">
              شفافية الوساطة المالية المحلية في المكلا وحضرموت
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              منصة وصلة تعمل كوسيط تقني وإداري لضمان حقوق الطرفين. تودع أموال الضمان وتُسحب عبر الحسابات المعتمدة لدى شبكات الصرافة المحلية الرسمية (بنك الكريمي، شركة العمقي، بنك بن دول، شركة البسيري). تخضع جميع العمليات للتحقق اليدوي والإشراف الرقابي قبل الإفراج.
            </p>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans" dir="rtl">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 bg-[#0B192C] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="text-sm font-bold">سند المعاملة المالية الرسمي</h3>
                  <span className="text-[10px] text-slate-300 font-mono">
                    {selectedReceipt.refCode} • منصة وصلة
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Receipt Body */}
            <div className="p-6 space-y-5 text-right">
              {/* Demo Badge Notice */}
              {selectedReceipt.isMockReceipt && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>
                    <strong>تنبيه توضيحي:</strong> هذا السند صادر ضمن بيئة التشغيل التجريبية (MVP Simulation) ومطابق لنموذج القيود المعتمد في المنصة.
                  </span>
                </div>
              )}

              {/* Receipt Details Grid */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">نوع المعاملة:</span>
                  <span className="font-bold text-slate-800">{selectedReceipt.title}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">المشروع المرتبط:</span>
                  <span className="font-bold text-slate-800">{selectedReceipt.projectTitle}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">العميل (صاحب المشروع):</span>
                  <span className="font-bold text-slate-800">{selectedReceipt.clientName}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">المستقل الأكاديمي:</span>
                  <span className="font-bold text-slate-800">{selectedReceipt.freelancerName}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">جهة التحويل المالي:</span>
                  <span className="font-bold text-slate-800">{selectedReceipt.provider}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">تاريخ ووقت المعاملة:</span>
                  <span className="font-bold text-slate-800 font-mono">{selectedReceipt.date} - {selectedReceipt.time}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-bold text-slate-700">المبلغ الصافي:</span>
                  <div className="text-left font-mono">
                    <span className="text-lg font-black text-teal-700">
                      {selectedReceipt.amountYER?.toLocaleString()} ر.ي
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      (~${selectedReceipt.amountUSD || Math.round(selectedReceipt.amountYER / 535)} USD)
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="text-[11px] text-slate-500 bg-white p-3 rounded-xl border border-slate-200">
                <span className="font-bold block text-slate-700 mb-0.5">ملاحظات الاعتماد الرقابي:</span>
                {selectedReceipt.notes}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="flex-1 bg-[#0B192C] hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة السند</span>
                </button>

                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-5 rounded-xl transition-all"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialRecordsView;
