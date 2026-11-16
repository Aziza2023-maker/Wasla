import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import {
  AlertTriangle,
  Scale,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  Upload,
  Send,
  User,
  Building,
  DollarSign,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Paperclip,
  Check,
  X,
  AlertCircle,
  HelpCircle,
  Gavel
} from 'lucide-react';

export const DisputesHub = ({ title = 'مركز النزاعات والتحكيم الأكاديمي', filterContractId = null }) => {
  const {
    currentRole,
    clientUser,
    freelancerUser,
    adminUser,
    disputes,
    openDispute,
    submitDisputeEvidence,
    proposeDisputeSettlement,
    respondToDisputeProposal,
    escalateDisputeToAdmin,
    resolveDisputeByAdmin,
    submitDisputeAppeal,
    resolveDisputeAppeal,
    openModal
  } = useWasla();

  const isClient = currentRole === 'client';
  const isFreelancer = currentRole === 'freelancer';
  const isAdmin = currentRole === 'admin';

  // Filter disputes according to current role or contract
  const userDisputes = disputes.filter((d) => {
    if (filterContractId && d.contractId !== filterContractId) return false;
    if (isAdmin) return true; // admin sees all
    if (isClient) {
      // client sees tickets they opened or linked to them
      return d.clientId === clientUser.id || d.clientName?.includes(clientUser.name);
    }
    if (isFreelancer) {
      // freelancer sees tickets involving them
      return d.freelancerId === freelancerUser.id || d.freelancerName?.includes(freelancerUser.name);
    }
    return false;
  });

  const [activeDisputeId, setActiveDisputeId] = useState(userDisputes[0]?.id || null);
  const activeDispute = userDisputes.find((d) => d.id === activeDisputeId) || userDisputes[0] || null;

  // Local form states
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalClientAmount, setProposalClientAmount] = useState('');
  const [proposalFreelancerAmount, setProposalFreelancerAmount] = useState('');
  const [proposalNotes, setProposalNotes] = useState('');

  const [showEvidenceForm, setShowEvidenceForm] = useState(false);
  const [evidenceTitle, setEvidenceTitle] = useState('');
  const [evidenceDesc, setEvidenceDesc] = useState('');

  const [showEscalateForm, setShowEscalateForm] = useState(false);
  const [escalateReason, setEscalateReason] = useState('');

  // Admin ruling form state
  const [showAdminRulingForm, setShowAdminRulingForm] = useState(false);
  const [adminRefundClient, setAdminRefundClient] = useState('');
  const [adminPayoutFreelancer, setAdminPayoutFreelancer] = useState('');
  const [adminRulingNotes, setAdminRulingNotes] = useState('');

  // Appeal states (طلب إعادة نظر)
  const [showAppealForm, setShowAppealForm] = useState(false);
  const [appealReason, setAppealReason] = useState('');
  const [showAppealReviewForm, setShowAppealReviewForm] = useState(false);
  const [appealDecision, setAppealDecision] = useState('confirmed'); // 'confirmed' | 'amended'
  const [appealAdminNotes, setAppealAdminNotes] = useState('');
  const [amendedRefundClient, setAmendedRefundClient] = useState('');
  const [amendedPayoutFreelancer, setAmendedPayoutFreelancer] = useState('');

  const handleCreateProposal = (e) => {
    e.preventDefault();
    if (!activeDispute) return;

    proposeDisputeSettlement(activeDispute.id, {
      offerAmountClient: Number(proposalClientAmount) || 0,
      offerAmountFreelancer: Number(proposalFreelancerAmount) || 0,
      notes: proposalNotes.trim()
    });

    setShowProposalForm(false);
    setProposalClientAmount('');
    setProposalFreelancerAmount('');
    setProposalNotes('');
  };

  const handleUploadEvidence = (e) => {
    e.preventDefault();
    if (!activeDispute || !evidenceTitle.trim()) return;

    submitDisputeEvidence(activeDispute.id, {
      title: evidenceTitle.trim(),
      description: evidenceDesc.trim(),
      fileType: 'image'
    });

    setShowEvidenceForm(false);
    setEvidenceTitle('');
    setEvidenceDesc('');
  };

  const handleEscalate = (e) => {
    e.preventDefault();
    if (!activeDispute) return;

    escalateDisputeToAdmin(activeDispute.id, escalateReason.trim());
    setShowEscalateForm(false);
    setEscalateReason('');
  };

  const handleAdminRuling = (e) => {
    e.preventDefault();
    if (!activeDispute) return;

    resolveDisputeByAdmin(activeDispute.id, {
      refundClientYER: Number(adminRefundClient) || 0,
      payoutFreelancerYER: Number(adminPayoutFreelancer) || 0,
      adminNotes: adminRulingNotes.trim() || 'قرار تحكيم إداري رسمي صادر عن لجنة الوساطة.'
    });

    setShowAdminRulingForm(false);
    setAdminRefundClient('');
    setAdminPayoutFreelancer('');
    setAdminRulingNotes('');
  };

  const handleAppealSubmit = (e) => {
    e.preventDefault();
    if (!activeDispute || !appealReason.trim()) return;
    submitDisputeAppeal(activeDispute.id, {
      appellantRole: currentRole,
      appellantName: currentRole === 'client' ? clientUser.name : freelancerUser.name,
      appealReason: appealReason.trim()
    });
    setShowAppealForm(false);
    setAppealReason('');
  };

  const handleAppealReviewSubmit = (e) => {
    e.preventDefault();
    if (!activeDispute) return;
    resolveDisputeAppeal(activeDispute.id, {
      decision: appealDecision,
      adminNotes: appealAdminNotes.trim() || (appealDecision === 'amended' ? 'تم تعديل الحكم بعد دراسة الاستئناف.' : 'تم تأكيد سلامة الحكم التحكيمي السابق ورفض طلب إعادة النظر.'),
      amendedRuling: appealDecision === 'amended' ? {
        refundClientYER: Number(amendedRefundClient) || 0,
        payoutFreelancerYER: Number(amendedPayoutFreelancer) || 0,
        adminNotes: appealAdminNotes.trim(),
        decidedAt: 'الآن'
      } : null
    });
    setShowAppealReviewForm(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return { label: 'نزاع مفتوح - بانتظار التفاوض', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'in_discussion':
        return { label: 'تسوية ودية قيد النقاش', color: 'bg-sky-50 text-sky-800 border-sky-200' };
      case 'escalated_to_admin':
        return { label: 'مصعد للتحكيم الإداري الرسمي', color: 'bg-purple-50 text-purple-800 border-purple-200' };
      case 'resolved_by_agreement':
        return { label: 'تم الحل باتفاق متبادل ✓', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'closed_by_admin':
        return { label: 'مغلق بقرار تحكيمي ملزم ✓', color: 'bg-teal-50 text-teal-800 border-teal-200' };
      case 'appeal_pending':
        return { label: 'طلب إعادة نظر قيد المراجعة الإدارية ⚖️', color: 'bg-rose-50 text-rose-800 border-rose-200' };
      default:
        return { label: status, color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-100">
              <Scale className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-[#0B192C]">
              {title}
            </h1>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            نظام متكامل لتسوية النزاعات وحماية أموال الضمان (Escrow). يتيح للطرفين التفاوض الودي وتقديم عروض القسمة وإرفاق الأدلة، مع حق التصعيد للتحكيم الإداري الملزم.
          </p>
        </div>

        {/* Dispute Policy Badge */}
        <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto text-xs font-bold text-slate-700">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>تجميد فوري لأموال الضمان حتى انتهاء النزاع</span>
        </div>
      </div>

      {userDisputes.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            سجلك ناصع! لا توجد أي نزاعات أو خلافات قائمة حالياً
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            كافة عقودك ومشاريعك تسير بصورة طبيعية، وتخضع لنظام الوساطة وهامش الطوارئ المعتمد لضمان حقوق الجميع.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Right Column: Disputes List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-500">
                قائمة تذاكر النزاع ({userDisputes.length})
              </span>
            </div>

            <div className="space-y-2.5">
              {userDisputes.map((disp) => {
                const isSelected = disp.id === activeDispute?.id;
                const badge = getStatusBadge(disp.status);

                return (
                  <button
                    key={disp.id}
                    onClick={() => setActiveDisputeId(disp.id)}
                    className={`w-full p-4 rounded-2xl border text-right transition-all flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-amber-50/60 border-amber-400 shadow-xs ring-1 ring-amber-400'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {disp.disputeCode}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>

                    <div className="text-xs font-black text-slate-800 line-clamp-1">
                      {disp.projectTitle}
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center justify-between w-full">
                      <span>المتنازع عليه:</span>
                      <span className="font-bold text-teal-700">
                        {disp.amountInDisputeYER?.toLocaleString()} ر.ي
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-1.5 flex items-center justify-between w-full">
                      <span>الطرف الآخر: {isClient ? disp.freelancerName : disp.clientName}</span>
                      <span>عقد: {disp.contractCode}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Left Column: Active Dispute Detail View (8 cols) */}
          {activeDispute && (
            <div className="lg:col-span-8 space-y-5">
              {/* Main Ticket Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                {/* Header */}
                <div className="p-5 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                        {activeDispute.disputeCode}
                      </span>
                      <span className="text-xs text-slate-300">
                        مرتبط بالعقد: {activeDispute.contractCode}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-white">
                      {activeDispute.projectTitle}
                    </h2>
                  </div>

                  <div className="text-left font-mono">
                    <span className="text-[10px] text-slate-400 block">المبلغ المعلق قيد النزاع</span>
                    <span className="text-base font-black text-amber-400">
                      {activeDispute.amountInDisputeYER?.toLocaleString()} ر.ي
                    </span>
                  </div>
                </div>

                {/* Parties and Reason */}
                <div className="p-5 border-b border-slate-100 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block mb-0.5">الطرف الأول (العميل):</span>
                      <span className="font-bold text-slate-800">{activeDispute.clientName}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block mb-0.5">الطرف الثاني (المستقل):</span>
                      <span className="font-bold text-slate-800">{activeDispute.freelancerName}</span>
                    </div>
                  </div>

                  <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/70 text-xs">
                    <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>سبب فتح النزاع: {activeDispute.reason}</span>
                    </div>
                    {activeDispute.description && (
                      <p className="text-amber-800 text-[11px] leading-relaxed">
                        {activeDispute.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Proposals Section (التسوية الودية المتبادلة) */}
                <div className="p-5 border-b border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-teal-600" />
                      <h3 className="text-xs font-black text-slate-900">
                        عروض التسوية الودية المتبادلة ({activeDispute.proposals?.length || 0})
                      </h3>
                    </div>

                    {!['resolved_by_agreement', 'closed_by_admin'].includes(activeDispute.status) && (
                      <button
                        onClick={() => setShowProposalForm(!showProposalForm)}
                        className="text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 transition-colors"
                      >
                        {showProposalForm ? 'إلغاء النموذج' : '+ تقديم مقترح تسوية جديد'}
                      </button>
                    )}
                  </div>

                  {/* Proposal Form */}
                  {showProposalForm && (
                    <form onSubmit={handleCreateProposal} className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-3">
                      <h4 className="text-xs font-bold text-teal-900">
                        اقتراح قسمة مالية لإنهاء النزاع بالتراضي:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">
                            مبلغ الاسترداد للعميل (ر.ي):
                          </label>
                          <input
                            type="number"
                            required
                            min="0"
                            max={activeDispute.amountInDisputeYER}
                            value={proposalClientAmount}
                            onChange={(e) => {
                              const val = Number(e.target.value) || 0;
                              setProposalClientAmount(val);
                              setProposalFreelancerAmount(Math.max(0, activeDispute.amountInDisputeYER - val));
                            }}
                            placeholder="مثلاً: 35000"
                            className="w-full p-2.5 bg-white border border-teal-300 rounded-xl text-xs font-bold focus:outline-none focus:border-teal-600"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">
                            مبلغ التحرير للمستقل (ر.ي):
                          </label>
                          <input
                            type="number"
                            required
                            min="0"
                            max={activeDispute.amountInDisputeYER}
                            value={proposalFreelancerAmount}
                            onChange={(e) => {
                              const val = Number(e.target.value) || 0;
                              setProposalFreelancerAmount(val);
                              setProposalClientAmount(Math.max(0, activeDispute.amountInDisputeYER - val));
                            }}
                            placeholder="مثلاً: 85000"
                            className="w-full p-2.5 bg-white border border-teal-300 rounded-xl text-xs font-bold focus:outline-none focus:border-teal-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          توضيح شروط التسوية والمبررات:
                        </label>
                        <textarea
                          rows={2}
                          value={proposalNotes}
                          onChange={(e) => setProposalNotes(e.target.value)}
                          placeholder="مثلاً: قبول الأجزاء المكتملة وخصم تكلفة ما لم يتم تسليمه..."
                          className="w-full p-2.5 bg-white border border-teal-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="submit"
                          className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>إرسال مقترح التسوية</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowProposalForm(false)}
                          className="bg-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl hover:bg-slate-300"
                        >
                          إلغاء
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of Proposals */}
                  {(!activeDispute.proposals || activeDispute.proposals.length === 0) ? (
                    <div className="p-4 bg-slate-50 rounded-xl text-center text-[11px] text-slate-400">
                      لم يتم تقديم مقترحات تسوية ودية بعد. يمكنك تقديم أول مقترح لتسريع الحل.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeDispute.proposals.map((prop) => {
                        const isMyProposal = (isClient && prop.proposedByRole === 'client') || (isFreelancer && prop.proposedByRole === 'freelancer');
                        const isPending = prop.status === 'pending';

                        return (
                          <div
                            key={prop.id}
                            className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                              prop.status === 'accepted'
                                ? 'bg-emerald-50 border-emerald-300'
                                : prop.status === 'rejected'
                                ? 'bg-slate-50 border-slate-200 opacity-60'
                                : 'bg-white border-teal-200 shadow-xs'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800">
                                مقدم المقترح: {prop.proposedByName} ({prop.proposedByRole === 'client' ? 'العميل' : 'المستقل'})
                              </span>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                prop.status === 'accepted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : prop.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-teal-100 text-teal-800'
                              }`}>
                                {prop.status === 'accepted'
                                  ? 'مقبول وتم تطبيقه ✓'
                                  : prop.status === 'rejected'
                                  ? 'مرفوض'
                                  : 'بانتظار الرد'}
                              </span>
                            </div>

                            {/* Divvy amounts */}
                            <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 font-mono">
                              <div>
                                <span className="text-slate-500 block">استرداد للعميل:</span>
                                <span className="font-bold text-purple-700">
                                  {prop.offerAmountClient?.toLocaleString()} ر.ي
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500 block">صرف للمستقل:</span>
                                <span className="font-bold text-teal-700">
                                  {prop.offerAmountFreelancer?.toLocaleString()} ر.ي
                                </span>
                              </div>
                            </div>

                            {prop.notes && (
                              <p className="text-slate-600 text-[11px] leading-relaxed">
                                <strong>ملاحظات:</strong> {prop.notes}
                              </p>
                            )}

                            {/* Acceptance controls for other party */}
                            {isPending && !isMyProposal && (
                              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                                <button
                                  onClick={() => respondToDisputeProposal(activeDispute.id, prop.id, true)}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-1.5 px-3.5 rounded-xl flex items-center gap-1 transition-colors shadow-xs"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>قبول التسوية وإنهاء النزاع</span>
                                </button>

                                <button
                                  onClick={() => {
                                    const reason = prompt('سبب رفض المقترح (اختياري):');
                                    respondToDisputeProposal(activeDispute.id, prop.id, false, reason || '');
                                  }}
                                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs py-1.5 px-3 rounded-xl transition-colors"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>رفض المقترح</span>
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Evidence Section (الأدلة والمستندات) */}
                <div className="p-5 border-b border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-sky-600" />
                      <h3 className="text-xs font-black text-slate-900">
                        الأدلة والمستندات المرفقة ({activeDispute.evidence?.length || 0})
                      </h3>
                    </div>

                    {!['resolved_by_agreement', 'closed_by_admin'].includes(activeDispute.status) && (
                      <button
                        onClick={() => setShowEvidenceForm(!showEvidenceForm)}
                        className="text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 transition-colors"
                      >
                        {showEvidenceForm ? 'إلغاء' : '+ إرفاق دليل جديد'}
                      </button>
                    )}
                  </div>

                  {/* Evidence Form */}
                  {showEvidenceForm && (
                    <form onSubmit={handleUploadEvidence} className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-3">
                      <h4 className="text-xs font-bold text-sky-900">
                        رفع إثبات أو لقطة شاشة تدعم موقفك:
                      </h4>
                      <div>
                        <input
                          type="text"
                          required
                          value={evidenceTitle}
                          onChange={(e) => setEvidenceTitle(e.target.value)}
                          placeholder="عنوان المستند (مثلاً: لقطة شاشة لتسليم الشيفرة المصدرية، محادثة الاتفاق)..."
                          className="w-full p-2.5 bg-white border border-sky-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-600"
                        />
                      </div>
                      <div>
                        <textarea
                          rows={2}
                          value={evidenceDesc}
                          onChange={(e) => setEvidenceDesc(e.target.value)}
                          placeholder="وصف توضيحي للدليل..."
                          className="w-full p-2.5 bg-white border border-sky-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-600"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="submit"
                          className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>إرفاق الدليل</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowEvidenceForm(false)}
                          className="bg-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl hover:bg-slate-300"
                        >
                          إلغاء
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Evidence List */}
                  {(!activeDispute.evidence || activeDispute.evidence.length === 0) ? (
                    <div className="p-4 bg-slate-50 rounded-xl text-center text-[11px] text-slate-400">
                      لا توجد مستندات مرفقة حتى الآن.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeDispute.evidence.map((ev) => (
                        <div key={ev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-sky-100 text-sky-700 shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5 overflow-hidden">
                            <span className="font-bold text-slate-800 block truncate">{ev.title}</span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              مرفوع من: {ev.uploaderName} • {ev.submittedAt}
                            </span>
                            {ev.description && (
                              <p className="text-[11px] text-slate-600 line-clamp-2">{ev.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Audit Timeline */}
                <div className="p-5 border-b border-slate-100 space-y-3">
                  <h3 className="text-xs font-black text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>سجل الإجراءات والمراحل (Audit Timeline):</span>
                  </h3>
                  <div className="space-y-2">
                    {activeDispute.timeline?.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                        <div className="flex-1">
                          <span className="font-medium text-slate-800">{item.event}</span>
                          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                            بواسطة: {item.by} • {item.at}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Final Ruling Details if closed */}
                {activeDispute.status === 'closed_by_admin' && activeDispute.ruling && (
                  <div className="p-5 bg-teal-50/80 border-t border-teal-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                        <Gavel className="w-4 h-4 text-teal-700" />
                        <span>الحكم والقرار التحكيمي الإداري النهائي:</span>
                      </div>
                      <span className="text-[10px] text-teal-700 font-mono">
                        {activeDispute.ruling.decidedAt || 'قرار ملزم'}
                      </span>
                    </div>
                    <p className="text-xs text-teal-800 leading-relaxed font-normal">
                      {activeDispute.ruling.adminNotes}
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono font-bold">
                      <div className="bg-white p-2.5 rounded-xl border border-teal-200">
                        <span className="text-slate-500 block text-[10px]">استرداد للعميل:</span>
                        <span className="text-teal-800">{activeDispute.ruling.refundClientYER?.toLocaleString()} ر.ي</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-teal-200">
                        <span className="text-slate-500 block text-[10px]">تحرير للمستقل:</span>
                        <span className="text-teal-800">{activeDispute.ruling.payoutFreelancerYER?.toLocaleString()} ر.ي</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appeal Card if Appeal exists */}
                {activeDispute.appeal && (
                  <div className="p-5 bg-rose-50/80 border-t border-rose-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>طلب إعادة النظر والاستئناف التحكيمي:</span>
                      </div>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold border border-rose-200">
                        {activeDispute.appealDecision ? 'تم البت في الاستئناف' : 'قيد التدقيق الإداري'}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-rose-200 text-xs">
                      <div className="flex items-center justify-between text-slate-500 text-[10px] mb-1 font-mono">
                        <span>مقدم من: {activeDispute.appeal.appellantName}</span>
                        <span>{activeDispute.appeal.submittedAt}</span>
                      </div>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {activeDispute.appeal.appealReason}
                      </p>
                    </div>

                    {activeDispute.appealDecision && (
                      <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-xs">
                        <span className="text-teal-900 font-bold block mb-1">
                          قرار المشرف الإداري على الاستئناف: {activeDispute.appealDecision.decision === 'amended' ? 'قبول وتعديل القسمة ✓' : 'تثبيت القرار السابق ✓'}
                        </span>
                        <p className="text-teal-800 text-[11px] leading-relaxed">
                          {activeDispute.appealDecision.adminNotes}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Actions (Escalate, Admin Ruling, or Submit Appeal) */}
                <div className="p-5 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
                  {/* Escalate button for client/freelancer */}
                  {!['escalated_to_admin', 'resolved_by_agreement', 'closed_by_admin', 'appeal_pending'].includes(activeDispute.status) && (
                    <div>
                      {!showEscalateForm ? (
                        <button
                          onClick={() => setShowEscalateForm(true)}
                          className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Gavel className="w-4 h-4 text-purple-600" />
                          <span>تصعيد النزاع للتحكيم الإداري الرسمي</span>
                        </button>
                      ) : (
                        <form onSubmit={handleEscalate} className="space-y-2 max-w-md">
                          <input
                            type="text"
                            required
                            value={escalateReason}
                            onChange={(e) => setEscalateReason(e.target.value)}
                            placeholder="سبب التصعيد للإدارة (مثلاً: تعذر التوصل لاتفاق)..."
                            className="w-full p-2 bg-white border border-purple-300 rounded-xl text-xs text-slate-800 focus:outline-none"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs py-1.5 px-3 rounded-lg"
                            >
                              تأكيد التصعيد
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowEscalateForm(false)}
                              className="bg-slate-200 text-slate-700 text-xs py-1.5 px-2.5 rounded-lg"
                            >
                              إلغاء
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}

                  {/* Submit Appeal for Client/Freelancer after Admin Ruling */}
                  {activeDispute.status === 'closed_by_admin' && !activeDispute.appeal && !isAdmin && (
                    <div className="w-full">
                      {!showAppealForm ? (
                        <button
                          onClick={() => setShowAppealForm(true)}
                          className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Scale className="w-4 h-4 text-rose-600" />
                          <span>تقديم طلب إعادة نظر (استئناف تحكيمي على القرار)</span>
                        </button>
                      ) : (
                        <form onSubmit={handleAppealSubmit} className="space-y-3 p-4 bg-white rounded-2xl border border-rose-200">
                          <h4 className="text-xs font-bold text-rose-900">
                            طلب إعادة نظر في القرار التحكيمي الصادر:
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            يحق لأي من الطرفين تقديم استئناف مع ذكر الأسباب الموضوعية أو إرفاق أدلة جديدة للنظر فيها من قبل الإدارة.
                          </p>
                          <textarea
                            rows={3}
                            required
                            value={appealReason}
                            onChange={(e) => setAppealReason(e.target.value)}
                            placeholder="اكتب أسباب طلب إعادة النظر والأدلة الداعمة..."
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2 px-4 rounded-xl transition-colors"
                            >
                              إرسال طلب الاستئناف للإدارة
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowAppealForm(false)}
                              className="bg-slate-200 text-slate-700 text-xs py-2 px-3 rounded-xl"
                            >
                              إلغاء
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}

                  {/* Admin ruling form trigger */}
                  {isAdmin && activeDispute.status === 'escalated_to_admin' && (
                    <div className="w-full">
                      {!showAdminRulingForm ? (
                        <button
                          onClick={() => {
                            setShowAdminRulingForm(true);
                            setAdminRefundClient(Math.round(activeDispute.amountInDisputeYER / 2));
                            setAdminPayoutFreelancer(Math.round(activeDispute.amountInDisputeYER / 2));
                          }}
                          className="w-full bg-[#0B192C] hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                        >
                          <Gavel className="w-4 h-4 text-teal-400" />
                          <span>إصدار الحكم الإداري الملزم وفض النزاع رسمياً</span>
                        </button>
                      ) : (
                        <form onSubmit={handleAdminRuling} className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                          <h4 className="text-xs font-bold text-teal-400">
                            هيئة التحكيم: إصدار الحكم الرقابي النهائي:
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] text-slate-300 block mb-1">استرداد للعميل (ر.ي):</label>
                              <input
                                type="number"
                                required
                                value={adminRefundClient}
                                onChange={(e) => setAdminRefundClient(e.target.value)}
                                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-300 block mb-1">صرف للمستقل (ر.ي):</label>
                              <input
                                type="number"
                                required
                                value={adminPayoutFreelancer}
                                onChange={(e) => setAdminPayoutFreelancer(e.target.value)}
                                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-300 block mb-1">منطوق الحكم ومبررات القرار:</label>
                            <textarea
                              rows={2}
                              required
                              value={adminRulingNotes}
                              onChange={(e) => setAdminRulingNotes(e.target.value)}
                              placeholder="مبررات القرار الإداري بناءً على مطابقة المخرجات والأدلة..."
                              className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2 px-4 rounded-xl"
                            >
                              إصدار الحكم وتطبيق التحويلات
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowAdminRulingForm(false)}
                              className="bg-slate-700 text-slate-300 text-xs py-2 px-3 rounded-xl"
                            >
                              إلغاء
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}

                  {/* Admin Appeal Review Panel */}
                  {isAdmin && activeDispute.status === 'appeal_pending' && (
                    <div className="w-full">
                      {!showAppealReviewForm ? (
                        <button
                          onClick={() => {
                            setShowAppealReviewForm(true);
                            setAppealDecision('confirmed');
                            setAmendedRefundClient(activeDispute.ruling?.refundClientYER || 0);
                            setAmendedPayoutFreelancer(activeDispute.ruling?.payoutFreelancerYER || 0);
                          }}
                          className="w-full bg-[#0B192C] hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                        >
                          <Gavel className="w-4 h-4 text-rose-400" />
                          <span>البت في طلب إعادة النظر (مراجعة الاستئناف)</span>
                        </button>
                      ) : (
                        <form onSubmit={handleAppealReviewSubmit} className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                          <h4 className="text-xs font-bold text-rose-300">
                            مراجعة طلب إعادة النظر والاستئناف التحكيمي:
                          </h4>
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                              <input
                                type="radio"
                                name="appealDecision"
                                value="confirmed"
                                checked={appealDecision === 'confirmed'}
                                onChange={() => setAppealDecision('confirmed')}
                                className="text-teal-600"
                              />
                              <span>تثبيت الحكم السابق ورفض الاستئناف</span>
                            </label>
                            <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                              <input
                                type="radio"
                                name="appealDecision"
                                value="amended"
                                checked={appealDecision === 'amended'}
                                onChange={() => setAppealDecision('amended')}
                                className="text-rose-500"
                              />
                              <span>قبول الاستئناف وتعديل القسمة</span>
                            </label>
                          </div>

                          {appealDecision === 'amended' && (
                            <div className="grid grid-cols-2 gap-3 pt-1">
                              <div>
                                <label className="text-[10px] text-slate-300 block mb-1">الاسترداد المعدل للعميل (ر.ي):</label>
                                <input
                                  type="number"
                                  required
                                  value={amendedRefundClient}
                                  onChange={(e) => setAmendedRefundClient(e.target.value)}
                                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-300 block mb-1">الصرف المعدل للمستقل (ر.ي):</label>
                                <input
                                  type="number"
                                  required
                                  value={amendedPayoutFreelancer}
                                  onChange={(e) => setAmendedPayoutFreelancer(e.target.value)}
                                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                                />
                              </div>
                            </div>
                          )}

                          <div>
                            <label className="text-[10px] text-slate-300 block mb-1">ملاحظات وقرار لجنة التحكيم حول الاستئناف:</label>
                            <textarea
                              rows={2}
                              required
                              value={appealAdminNotes}
                              onChange={(e) => setAppealAdminNotes(e.target.value)}
                              placeholder="بيان أسباب تثبيت أو تعديل القرار التحكيمي..."
                              className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="submit"
                              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2 px-4 rounded-xl"
                            >
                              اعتماد القرار النهائي للاستئناف
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowAppealReviewForm(false)}
                              className="bg-slate-700 text-slate-300 text-xs py-2 px-3 rounded-xl"
                            >
                              إلغاء
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisputesHub;
