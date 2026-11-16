import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  Building,
  Calendar,
  DollarSign,
  ShieldAlert,
  Printer,
  X,
  Edit3,
  Check,
  Send,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const ContractModal = ({ contract, isOpen, onClose, onOpenDispute }) => {
  const {
    currentRole,
    clientUser,
    freelancerUser,
    approveContract,
    requestContractRevision
  } = useWasla();

  const [revisionNotes, setRevisionNotes] = useState('');
  const [showRevisionInput, setShowRevisionInput] = useState(false);

  if (!isOpen || !contract) return null;

  const isClient = currentRole === 'client';
  const isFreelancer = currentRole === 'freelancer';

  const hasClientApproved = Boolean(contract.clientApprovedAt);
  const hasFreelancerApproved = Boolean(contract.freelancerApprovedAt);
  const isFullyActive = contract.status === 'active' || (hasClientApproved && hasFreelancerApproved);
  const needsMyApproval = (isClient && !hasClientApproved) || (isFreelancer && !hasFreelancerApproved);

  const handleApprove = () => {
    approveContract(contract.id, currentRole);
    onClose();
  };

  const handleRequestRevision = (e) => {
    e.preventDefault();
    if (!revisionNotes.trim()) return;
    requestContractRevision(contract.id, currentRole, revisionNotes.trim());
    setShowRevisionInput(false);
    setRevisionNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs font-sans overflow-y-auto" dir="rtl">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="p-6 bg-[#0B192C] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <FileText className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base md:text-lg font-black">
                  وثيقة العقد والاتفاق الثنائي
                </h2>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
                  {contract.contractCode || 'CNT-8821'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  إصدار {contract.version || 1}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-normal">
                {contract.projectTitle || 'مشروع منصة وصلة'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="طباعة العقد"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-right text-xs">
          {/* Status Bar */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isFullyActive
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : contract.status === 'disputed'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-sky-50 border-sky-200 text-sky-900'
          }`}>
            <div className="flex items-center gap-3">
              {isFullyActive ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : contract.status === 'disputed' ? (
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              ) : (
                <Clock className="w-6 h-6 text-sky-600 shrink-0" />
              )}
              <div>
                <span className="font-bold block text-sm">
                  {isFullyActive
                    ? 'العقد نافذ وسارٍ رسميًا بين الطرفين'
                    : contract.status === 'disputed'
                    ? 'العقد مجمد مؤقتًا لوجود نزاع قيد التسوية'
                    : 'العقد بانتظار استكمال اعتماد الطرفين'}
                </span>
                <span className="text-[11px] opacity-80">
                  {isFullyActive
                    ? 'تم توقيع الاتفاق ومصادقة الطرفين. أموال الضمان محجوزة تحت مظلة وساطة وصلة.'
                    : 'لا يصبح العقد ملزماً ونافذاً إلا بعد موافقة العميل والمستقل معاً على كامل البنود.'}
                </span>
              </div>
            </div>

            {/* Approval Badges */}
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] border ${
                hasClientApproved
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-500 border-slate-300'
              }`}>
                العميل: {hasClientApproved ? 'معتمد ✓' : 'بانتظار الاعتماد'}
              </span>

              <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] border ${
                hasFreelancerApproved
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-500 border-slate-300'
              }`}>
                المستقل: {hasFreelancerApproved ? 'معتمد ✓' : 'بانتظار الاعتماد'}
              </span>
            </div>
          </div>

          {/* Two Parties Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Party (Client) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-slate-400 font-bold text-[11px]">
                <Building className="w-4 h-4 text-teal-600" />
                <span>الطرف الأول (صاحب المشروع / العميل):</span>
              </div>
              <div className="font-black text-sm text-slate-900 mb-1">
                {contract.clientName || clientUser.name}
              </div>
              <div className="text-slate-600 text-[11px] mb-1">
                {contract.clientEntity || clientUser.company || 'مؤسسة مدار للحلول التقنية - المكلا'}
              </div>
              <div className="text-slate-400 text-[10px] font-mono">
                التواصل: {contract.clientPhone || clientUser.phone || '+967 770 123 456'}
              </div>
            </div>

            {/* Second Party (Freelancer) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-slate-400 font-bold text-[11px]">
                <User className="w-4 h-4 text-sky-600" />
                <span>الطرف الثاني (المستقل الأكاديمي):</span>
              </div>
              <div className="font-black text-sm text-slate-900 mb-1">
                {contract.freelancerName || contract.studentName || freelancerUser.name}
              </div>
              <div className="text-slate-600 text-[11px] mb-1">
                {contract.freelancerUniversity || 'جامعة حضرموت'} • {contract.freelancerFaculty || 'كلية الحاسوب (فلك)'}
              </div>
              <div className="text-slate-400 text-[10px] font-mono">
                التواصل: {contract.freelancerPhone || freelancerUser.contactChannels?.whatsapp || '+967 773 892 104'}
              </div>
            </div>
          </div>

          {/* Scope of Work */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs">
              1. نطاق العمل والتوصيف الفني:
            </h4>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-700 leading-relaxed">
              {contract.scopeOfWork || 'يلتزم الطرف الثاني بتنفيذ وتطوير كامل الوظائف والواجهات المتفق عليها وفق المعايير البرمجية والأكاديمية، وتسليم الشيفرة المصدرية والمستندات التوضيحية.'}
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs">
              2. قائمة المخرجات والمعايير المرحلية (Milestones):
            </h4>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 divide-y divide-slate-200/60">
              {(contract.deliverables || [
                { id: 1, title: 'تسليم المخططات والواجهات الأولية', done: true },
                { id: 2, title: 'تطوير الكود البرمجي وفق المواصفات', done: true },
                { id: 3, title: 'الفحص والتشغيل التجريبي والدليل الفني', done: false }
              ]).map((deliv, idx) => (
                <div key={deliv.id || idx} className="py-2.5 px-2 flex items-center justify-between">
                  <span className="flex items-center gap-2 font-semibold text-slate-800">
                    <span className="w-5 h-5 rounded-md bg-white border border-slate-300 flex items-center justify-center text-[10px] font-mono">
                      {idx + 1}
                    </span>
                    {deliv.title}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    deliv.done
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {deliv.done ? 'تم الإنجاز ✓' : 'قيد العمل'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financials & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block mb-1">المبلغ الإجمالي المتفق عليه</span>
              <div className="text-base font-black text-teal-700">
                {(contract.budgetYER || 150000).toLocaleString()} ر.ي
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                ~${contract.budgetUSD || Math.round((contract.budgetYER || 150000) / 535)} USD
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block mb-1">مدة التنفيذ المعتمدة</span>
              <div className="text-base font-black text-slate-800">
                {contract.durationDays || 14} يوماً
              </div>
              <span className="text-[10px] text-slate-500">
                يبدأ الاحتساب فور اكتمال الاعتماد
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block mb-1">هامش الطوارئ المعتمد</span>
              <div className="text-base font-black text-amber-600">
                +{contract.bufferDays || 3} أيام
              </div>
              <span className="text-[10px] text-amber-700 font-bold">
                حماية من انقطاعات الكهرباء والشبكة
              </span>
            </div>
          </div>

          {/* General Terms & Mediation Policy */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs">
              3. شروط الوساطة وفض النزاعات والملكية الفكرية:
            </h4>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-slate-600 text-[11px] leading-relaxed">
              <p>• <strong>حجز الضمان (Escrow):</strong> تودع قيمة العقد في حساب الوساطة المعتمد عبر شبكات صرافة وبنوك حضرموت (العمقي، الكريمي، بن دول، البسيري) وتظل محجوزة حتى إتمام التسليم النهائي.</p>
              <p>• <strong>الملكية الفكرية:</strong> تنتقل حقوق ملكية المشروع والكود بالكامل إلى الطرف الأول بمجرد تحرير الدفعة المالية واعتماد الاستلام.</p>
              <p>• <strong>فض النزاعات:</strong> في حال تعذر التوصل لاتفاق حول المخرجات، يحق لأي من الطرفين فتح تذكرة نزاع وتجميد الصرف لتدخل إدارة التحكيم وإصدار حكم ملزم بناءً على أدلة المحادثات ومطابقة المخرجات.</p>
            </div>
          </div>

          {/* Contract History / Versions */}
          {contract.history && contract.history.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs">
                سجل الإجراءات والإصدارات:
              </h4>
              <div className="space-y-1.5">
                {contract.history.map((hist, i) => (
                  <div key={i} className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-slate-600">
                    <span className="font-medium">• {hist.action}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{hist.at}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Revision Input Box if active */}
          {showRevisionInput && (
            <form onSubmit={handleRequestRevision} className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <h5 className="font-bold text-amber-900 text-xs">
                تقديم طلب تعديل بنود العقد (إصدار جديد):
              </h5>
              <textarea
                rows={3}
                required
                value={revisionNotes}
                onChange={(e) => setRevisionNotes(e.target.value)}
                placeholder="اكتب ملاحظاتك بوضوح (مثلاً: تعديل جدول التسليم، إضافة متطلب تقني، زيادة هامش الطوارئ)..."
                className="w-full p-3 bg-white border border-amber-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال طلب التعديل</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowRevisionInput(false)}
                  className="bg-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl hover:bg-slate-300 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Dispute trigger button */}
          {onOpenDispute && isFullyActive && (
            <button
              onClick={() => {
                onClose();
                onOpenDispute(contract);
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>فتح تذكرة نزاع</span>
            </button>
          )}

          <div className="flex items-center gap-2 mr-auto">
            {/* Revision request trigger */}
            {!isFullyActive && !showRevisionInput && (
              <button
                onClick={() => setShowRevisionInput(true)}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-4 h-4 text-slate-500" />
                <span>طلب تعديل بنود</span>
              </button>
            )}

            {/* Approval button */}
            {needsMyApproval && (
              <button
                onClick={handleApprove}
                className="px-5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <Check className="w-4 h-4" />
                <span>الموافقة واعتماد العقد رسمياً</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractModal;
