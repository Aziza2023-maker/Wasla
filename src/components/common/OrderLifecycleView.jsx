import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building,
  AlertCircle,
  FileText,
  Upload,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Gavel,
  Scale,
  CreditCard,
  Sparkles,
  Send,
  Eye,
  Check,
  X,
  AlertTriangle,
  RotateCcw,
  CheckCircle
} from 'lucide-react';

export const OrderLifecycleView = ({ orderId, onClose = null }) => {
  const {
    serviceOrders,
    currentRole,
    clientUser,
    freelancerUser,
    adminUser,
    platformSettings,
    approveOrderContract,
    submitOrderDeposit,
    verifyOrderDeposit,
    submitOrderDelivery,
    respondToOrderDelivery,
    recordOrderPayout,
    cancelOrder,
    openDispute,
    navigateTo,
    addToast
  } = useWasla();

  const order = serviceOrders.find((o) => o.id === orderId) || serviceOrders[0];

  // Role checks
  const isClient = currentRole === 'client';
  const isFreelancer = currentRole === 'freelancer';
  const isAdmin = currentRole === 'admin';

  // Forms states
  const [depositProvider, setDepositProvider] = useState('شركة العمقي للصرافة');
  const [depositRefNumber, setDepositRefNumber] = useState('#OM-8839210');
  const [depositSenderName, setDepositSenderName] = useState(clientUser?.name || 'شهاب صالح');
  const [depositFileName, setDepositFileName] = useState('سند_إيداع_العمقي_رسمي.pdf');

  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [deliveryLiveUrl, setDeliveryLiveUrl] = useState('');
  const [deliveryFilesText, setDeliveryFilesText] = useState('الكود_المصدري_النهائي.zip\nدليل_الاستخدام_والربط.pdf');

  const [revisionNotes, setRevisionNotes] = useState('');
  const [showRevisionForm, setShowRevisionForm] = useState(false);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('عمل ممتاز واحترافي، تم إنجاز العمل بالكامل وتسليم المخرجات بأعلى جودة.');

  if (!order) {
    return (
      <div className="p-8 text-center text-xs text-slate-400 font-sans" dir="rtl">
        لم يتم العثور على بيانات الطلب المطلوب.
      </div>
    );
  }

  // Stepper milestones
  const steps = [
    { id: 'contract', label: 'العقد الموحد', isCurrent: order.status === 'contract_pending_approval', isDone: !['contract_pending_approval'].includes(order.status) },
    { id: 'deposit', label: 'إيداع الضمان', isCurrent: ['awaiting_deposit', 'awaiting_admin_verification'].includes(order.status), isDone: ['in_progress', 'delivered_pending_review', 'revision_requested', 'approved_pending_payout', 'completed', 'disputed'].includes(order.status) },
    { id: 'progress', label: 'جاري التنفيذ', isCurrent: order.status === 'in_progress', isDone: ['delivered_pending_review', 'revision_requested', 'approved_pending_payout', 'completed'].includes(order.status) },
    { id: 'delivery', label: 'مراجعة المخرجات', isCurrent: ['delivered_pending_review', 'revision_requested'].includes(order.status), isDone: ['approved_pending_payout', 'completed'].includes(order.status) },
    { id: 'payout', label: 'تسجيل الصرف', isCurrent: order.status === 'approved_pending_payout', isDone: order.status === 'completed' },
    { id: 'completed', label: 'مكتمل وموثق', isCurrent: order.status === 'completed', isDone: order.status === 'completed' }
  ];

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      {/* Top Header Card */}
      <div className="bg-[#0B192C] text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {order.orderCode}
            </span>
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
              {order.statusLabel}
            </span>
            {order.status === 'disputed' && (
              <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>تذكرة نزاع نشطة {order.disputeTicketCode}</span>
              </span>
            )}
          </div>
          <h1 className="text-lg sm:text-2xl font-black text-white mb-1">
            {order.orderTitle}
          </h1>
          <p className="text-xs text-slate-400">
            الخدمة الأساسية: {order.serviceTitle}
          </p>
        </div>

        {/* Pricing Summary Box */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 text-left font-mono shrink-0 min-w-56">
          <span className="text-[10px] text-slate-400 block mb-0.5">قيمة العقد والضمان المحلي:</span>
          <div className="text-xl font-black text-teal-400">
            {order.priceYER?.toLocaleString()} ر.ي
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between mt-1 pt-1 border-t border-slate-800">
            <span>عمولة المنصة ({order.platformFeePercent}%):</span>
            <span>{order.platformFeeYER?.toLocaleString()} ر.ي</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-bold flex items-center justify-between">
            <span>صافي المستقل:</span>
            <span>{order.netFreelancerYER?.toLocaleString()} ر.ي</span>
          </div>
        </div>
      </div>

      {/* 2. Visual Stepper for 14-State Lifecycle */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <h3 className="text-xs font-bold text-slate-500 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-600" />
          <span>مراحل دورة حياة الطلب والوساطة المالية:</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          {steps.map((st, idx) => (
            <div
              key={st.id}
              className={`p-3 rounded-2xl border transition-all ${
                st.isCurrent
                  ? 'bg-teal-50 border-teal-500 shadow-xs ring-1 ring-teal-500'
                  : st.isDone
                  ? 'bg-slate-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-200/80 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center mb-1.5">
                {st.isDone ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : st.isCurrent ? (
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-[11px] flex items-center justify-center animate-pulse">
                    {idx + 1}
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 font-bold text-[11px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                )}
              </div>
              <span className={`text-[11px] font-bold block ${st.isCurrent ? 'text-teal-900' : st.isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Split: Interactive Role Action Card & Timeline / Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right: Interactive Role Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* STAGE 1: Contract Approval */}
          {order.status === 'contract_pending_approval' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                <FileText className="w-5 h-5 text-teal-600" />
                <span>الموافقة المتبادلة على العقد الموحد:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                يتطلب بدء الطلب موافقة الطرفين على مخرجات العمل وقيمة العقد وهامش أمان الطوارئ. بعد اكتمال التوقيعين، يتم الانتقال إلى مرحلة إيداع الضمان المالي.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block mb-1">الطرف الأول (العميل):</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    {order.clientApproved ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        تم الاعتماد والتوقيع ✓
                      </span>
                    ) : (
                      <span className="text-amber-700">بانتظار الموافقة...</span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block mb-1">الطرف الثاني (المستقل):</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    {order.freelancerApproved ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        تم الاعتماد والتوقيع ✓
                      </span>
                    ) : (
                      <span className="text-amber-700">بانتظار الموافقة...</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {((isClient && !order.clientApproved) || (isFreelancer && !order.freelancerApproved)) && (
                <button
                  onClick={() => approveOrderContract(order.id, currentRole)}
                  className="w-full py-3 px-4 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>اعتماد بنود العقد الموحد والموافقة على الشروط</span>
                </button>
              )}

              {isClient && order.clientApproved && !order.freelancerApproved && (
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs text-center font-medium">
                  تم تسجيل توقيعك بنجاح، بانتظار توقيع المستقل م. أروى للبدء في إيداع الضمان.
                </div>
              )}
            </div>
          )}

          {/* STAGE 2: Awaiting Deposit */}
          {order.status === 'awaiting_deposit' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                <CreditCard className="w-5 h-5 text-teal-600" />
                <span>إيداع مبلغ الضمان عبر شبكات وبنوك حضرموت:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                تم اعتماد العقد. يرجى إيداع مبلغ الضمان ({order.priceYER?.toLocaleString()} ر.ي) في حساب وساطة وصلة المعتمد لدى (العمقي، الكريمي، بن دول، أو البسيري) ورفع رقم السند ليتم قفل الضمان والبدء فوراً.
              </p>

              {isClient ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitOrderDeposit(order.id, {
                      provider: depositProvider,
                      referenceNumber: depositRefNumber,
                      senderName: depositSenderName,
                      amountYER: order.priceYER,
                      receiptFileName: depositFileName
                    });
                  }}
                  className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-3 text-xs"
                >
                  <h4 className="font-bold text-teal-950">رفع إشعار الحوالة وسند الإيداع:</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        شبكة / بنك الصرافة المعتمد:
                      </label>
                      <select
                        value={depositProvider}
                        onChange={(e) => setDepositProvider(e.target.value)}
                        className="w-full p-2.5 bg-white border border-teal-300 rounded-xl text-xs font-bold"
                      >
                        {platformSettings.supportedEscrowProviders?.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        رقم السند / الحوالة:
                      </label>
                      <input
                        type="text"
                        required
                        value={depositRefNumber}
                        onChange={(e) => setDepositRefNumber(e.target.value)}
                        placeholder="مثلاً: #OM-8839210"
                        className="w-full p-2.5 bg-white border border-teal-300 rounded-xl text-xs font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        اسم المودع (العميل):
                      </label>
                      <input
                        type="text"
                        required
                        value={depositSenderName}
                        onChange={(e) => setDepositSenderName(e.target.value)}
                        className="w-full p-2.5 bg-white border border-teal-300 rounded-xl text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        المبلغ المودع (ر.ي):
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={`${order.priceYER?.toLocaleString()} ر.ي`}
                        className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-700 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>إرسال إشعار وسند الإيداع للإدارة للتحقق</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  بانتظار قيام العميل شهاب صالح بإيداع مبلغ الضمان ورفع رقم السند للتحقق.
                </div>
              )}
            </div>
          )}

          {/* STAGE 3: Awaiting Admin Verification */}
          {order.status === 'awaiting_admin_verification' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>تدقيق الإيداع البنكي وقفل الضمان في حساب الوساطة:</span>
              </div>

              {order.remittanceReceipt && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
                  <span className="text-[11px] text-amber-900 font-bold block">
                    بيانات السند المرفوع من العميل:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
                    <div>مزود الصرافة: <strong>{order.remittanceReceipt.provider}</strong></div>
                    <div>رقم السند: <strong className="font-mono">{order.remittanceReceipt.referenceNumber}</strong></div>
                    <div>اسم المودع: <strong>{order.remittanceReceipt.senderName}</strong></div>
                    <div>المبلغ: <strong className="text-teal-800 font-mono">{order.remittanceReceipt.amountYER?.toLocaleString()} ر.ي</strong></div>
                  </div>
                </div>
              )}

              {isAdmin ? (
                <button
                  onClick={() => verifyOrderDeposit(order.id)}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>تأكيد صحة الإيداع وقفل الضمان في حساب الوساطة (Escrow Locked)</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 text-slate-600 text-xs text-center">
                  الإشعار قيد التدقيق لدى الإدارة المركزية لمنصة وصلة لتأكيد الإيداع وقفل الضمان.
                </div>
              )}
            </div>
          )}

          {/* STAGE 4: In Progress (Execution & Delivery) */}
          {order.status === 'in_progress' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <span>جاري تنفيذ المشروع والعمل على المخرجات:</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  الضمان محجوز بأمان ✓
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-700">
                  <span>مدة التنفيذ المتفق عليها:</span>
                  <span className="font-bold">{order.deliveryDays} أيام</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>هامش طوارئ المكلا:</span>
                  <span className="font-bold text-teal-700">+{order.bufferDays} يوم أمان</span>
                </div>
              </div>

              {isFreelancer ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const files = deliveryFilesText
                      .split('\n')
                      .map((f) => f.trim())
                      .filter(Boolean)
                      .map((name) => ({ name, size: 'ملف مشروع', url: '#' }));

                    submitOrderDelivery(order.id, {
                      notes: deliveryNotes.trim() || 'تم إنهاء كافة المخرجات بنجاح.',
                      liveUrl: deliveryLiveUrl.trim(),
                      files
                    });
                  }}
                  className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-3 text-xs"
                >
                  <h4 className="font-bold text-teal-950">تسليم مخرجات الطلب النهائية:</h4>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      ملاحظات التسليم والتوضيحات للعميل:
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="اشرح ما تم تنفيذه وكيفية فحص المخرجات..."
                      className="w-full p-2.5 bg-white border border-teal-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      رابط المعاينة المباشر (اختياري):
                    </label>
                    <input
                      type="url"
                      value={deliveryLiveUrl}
                      onChange={(e) => setDeliveryLiveUrl(e.target.value)}
                      placeholder="https://preview.wasla.demo"
                      className="w-full p-2.5 bg-white border border-teal-300 rounded-xl text-xs text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      الملفات المرفقة (اكتب اسم كل ملف في سطر):
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryFilesText}
                      onChange={(e) => setDeliveryFilesText(e.target.value)}
                      className="w-full p-2.5 bg-white border border-teal-300 rounded-xl text-xs font-mono text-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>تسليم المخرجات رسمياً للمراجعة والاعتماد</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  المستقل م. أروى الحمادي تعمل حالياً على إنجاز مخرجات الطلب وفق العقد المعتمد.
                </div>
              )}
            </div>
          )}

          {/* STAGE 5: Delivered - Pending Review */}
          {order.status === 'delivered_pending_review' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span>تم تسليم المخرجات - بانتظار مراجعة واعتماد العميل:</span>
                </div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  مهلة المراجعة: 72 ساعة
                </span>
              </div>

              {/* Delivery Data Card */}
              {order.deliveryData && (
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-xs space-y-3">
                  <div>
                    <span className="text-[10px] text-teal-800 block mb-1 font-bold">ملاحظات المستقل:</span>
                    <p className="text-slate-800 leading-relaxed font-normal bg-white p-3 rounded-xl border border-teal-100">
                      {order.deliveryData.notes}
                    </p>
                  </div>

                  {order.deliveryData.liveUrl && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500 font-medium">رابط المعاينة المباشر:</span>
                      <a
                        href={order.deliveryData.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-700 font-bold underline font-mono flex items-center gap-1"
                      >
                        <span>{order.deliveryData.liveUrl}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {order.deliveryData.files && order.deliveryData.files.length > 0 && (
                    <div>
                      <span className="text-[10px] text-teal-800 block mb-1.5 font-bold">الملفات المسلّمة:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {order.deliveryData.files.map((f, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-white border border-teal-200 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                              <span className="truncate font-mono">{f.name}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0">{f.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Client Review & Approval Controls */}
              {isClient ? (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">رصيد التعديلات المتبقية:</span>
                    <span className="font-bold text-teal-800">
                      {Math.max(0, (order.revisionsTotal || 3) - (order.revisionsUsed || 0))} من أصل {order.revisionsTotal || 3} تعديلات متاحة
                    </span>
                  </div>

                  {!showRevisionForm ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() =>
                          respondToOrderDelivery(order.id, {
                            action: 'accept',
                            notes: reviewComment,
                            rating: reviewRating
                          })
                        }
                        className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>قبول واستلام العمل واعتماده بالكامل</span>
                      </button>

                      <button
                        onClick={() => setShowRevisionForm(true)}
                        className="py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4 text-amber-700" />
                        <span>طلب تعديل وملاحظات إضافية</span>
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!revisionNotes.trim()) return;
                        respondToOrderDelivery(order.id, {
                          action: 'revision',
                          notes: revisionNotes.trim()
                        });
                        setShowRevisionForm(false);
                      }}
                      className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 text-xs"
                    >
                      <h4 className="font-bold text-amber-900">ملاحظات التعديل المطلوبة بدقة:</h4>
                      <textarea
                        rows={3}
                        required
                        value={revisionNotes}
                        onChange={(e) => setRevisionNotes(e.target.value)}
                        placeholder="حدد التعديلات المطلوبة بوضوح..."
                        className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-amber-600"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="submit"
                          className="py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
                        >
                          إرسال طلب التعديل للمستقل
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowRevisionForm(false)}
                          className="py-2 px-3 rounded-xl bg-slate-200 text-slate-700 text-xs"
                        >
                          إلغاء
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-center">
                  تم تسليم العمل بنجاح، والعميل شهاب صالح يقوم الآن بمراجعة المخرجات.
                </div>
              )}
            </div>
          )}

          {/* STAGE 6: Revision Requested */}
          {order.status === 'revision_requested' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between text-amber-900 font-bold text-sm">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-amber-600" />
                  <span>طلب تعديل جارٍ من العميل:</span>
                </div>
                <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
                  تعديل {order.revisionsUsed} من {order.revisionsTotal}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                <span className="text-[10px] text-amber-800 block mb-1 font-bold">ملاحظات العميل:</span>
                <p className="text-slate-800 leading-relaxed font-normal bg-white p-3 rounded-xl border border-amber-100">
                  {order.revisionNotes || 'يرجى مراجعة وتعديل النقاط الموضحة في المراسلات.'}
                </p>
              </div>

              {isFreelancer ? (
                <button
                  onClick={() =>
                    submitOrderDelivery(order.id, {
                      notes: 'تم تنفيذ التعديلات المطلوبة وإعادة تسليم العمل.',
                      files: [{ name: 'الملفات_المعدلة_v2.zip', size: '15.8 ميجابايت', url: '#' }]
                    })
                  }
                  className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>إعادة تسليم العمل بعد تنفيذ التعديلات</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 text-slate-600 text-xs text-center">
                  المستقل م. أروى الحمادي تقوم حالياً بتنفيذ التعديلات لإعادة التسليم.
                </div>
              )}
            </div>
          )}

          {/* STAGE 7: Approved - Pending Payout */}
          {order.status === 'approved_pending_payout' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>وافق العميل على الاستلام - بانتظار قيد صرف المستحقات:</span>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full font-bold">
                  اعتماد نهائي
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                تم اعتماد العمل برضا العميل الكامل. تتولى الإدارة الآن قيد صرف المبلغ الصافي إلى حساب المستقل بعد اقتطاع عمولة وساطة المنصة المحددة ({order.platformFeePercent}%).
              </p>

              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-300">
                  <span>إجمالي مبلغ الضمان المقفل:</span>
                  <span>{order.priceYER?.toLocaleString()} ر.ي</span>
                </div>
                <div className="flex items-center justify-between text-teal-400">
                  <span>عمولة المنصة ({order.platformFeePercent}%):</span>
                  <span>- {order.platformFeeYER?.toLocaleString()} ر.ي</span>
                </div>
                <div className="flex items-center justify-between text-emerald-400 text-sm font-bold pt-2 border-t border-slate-800">
                  <span>صافي المستحقات المصروفة للمستقل:</span>
                  <span>{order.netFreelancerYER?.toLocaleString()} ر.ي</span>
                </div>
              </div>

              {isAdmin ? (
                <button
                  onClick={() => recordOrderPayout(order.id)}
                  className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>تسجيل صرف المستحقات الصافية للمستقل وإغلاق المعاملة بنجاح</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 text-slate-600 text-xs text-center">
                  المعاملة بانتظار قيام الإدارة بتسجيل الحوالة في الحساب المالي للمستقل.
                </div>
              )}
            </div>
          )}

          {/* STAGE 8: Completed */}
          {order.status === 'completed' && (
            <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>اكتمل الطلب وصُرفت المستحقات بالكامل بنجاح ✓</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                تم تنفيذ المشروع، واعتماد مخرجاته من قبل العميل، وصرف صافي الأرباح للمستقل، مع توثيق المعاملة بالكامل في سجلات الوساطة المالية.
              </p>

              {order.clientReview && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-950">تقييم العميل {order.clientName}:</span>
                    <span className="text-amber-500 font-bold flex items-center gap-1">
                      ★ {order.rating || 5}/5
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    "{order.clientReview}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Left: Contract Specifications & Audit Timeline (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Parties Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 pb-2 border-b border-slate-100">
              أطراف العقد الموثق:
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <img
                  src={order.clientAvatar}
                  alt={order.clientName}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <span className="text-[10px] text-slate-400 block">صاحب العمل (العميل):</span>
                  <span className="font-bold text-slate-900 block">{order.clientName}</span>
                  <span className="text-[10px] text-slate-500">{order.clientCompany}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <img
                  src={order.freelancerAvatar}
                  alt={order.freelancerName}
                  className="w-10 h-10 rounded-xl object-cover border border-teal-500"
                />
                <div>
                  <span className="text-[10px] text-slate-400 block">المستقل الأكاديمي:</span>
                  <span className="font-bold text-slate-900 block">{order.freelancerName}</span>
                  <span className="text-[10px] text-teal-700">{order.freelancerUniversity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Timeline */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>سجل التدقيق والمراحل الموثقة (Audit Timeline):</span>
            </h4>

            <div className="space-y-2.5">
              {order.timeline?.map((evt, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <div className="flex-1 overflow-hidden">
                    <span className="font-bold text-slate-800 block text-[11px]">{evt.label}</span>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono flex items-center justify-between">
                      <span>بواسطة: {evt.by}</span>
                      <span>{evt.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLifecycleView;
