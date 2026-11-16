import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import {
  X,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Star,
  Zap,
  Building,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  FileText,
  AlertCircle,
  Layers,
  ChevronRight,
  Send
} from 'lucide-react';

export const ServiceDetailsModal = ({ service, onClose }) => {
  const {
    currentRole,
    clientUser,
    createServiceOrder,
    navigateTo,
    addToast
  } = useWasla();

  const [isOrdering, setIsOrdering] = useState(false);
  const [orderTitle, setOrderTitle] = useState(service?.title || '');
  const [buyerInstructions, setBuyerInstructions] = useState('');
  const [agreedDays, setAgreedDays] = useState(service?.deliveryDays || 5);
  const [acknowledgedRequirements, setAcknowledgedRequirements] = useState(false);

  if (!service) return null;

  const handleStartOrder = (e) => {
    e.preventDefault();

    if (currentRole !== 'client') {
      addToast(
        'تنبيه الحساب',
        'يرجى تسجيل الدخول بحساب عميل لتأكيد طلب الخدمة وإيداع الضمان.',
        'info'
      );
      navigateTo('login');
      onClose();
      return;
    }

    if (!acknowledgedRequirements) {
      addToast(
        'تأكيد متطلبات البدء',
        'يرجى تأكيد الاطلاع على تعليمات ومخرجات الخدمة قبل إتمام الطلب.',
        'warning'
      );
      return;
    }

    const newOrder = createServiceOrder({
      serviceId: service.id,
      orderTitle: orderTitle.trim() || service.title,
      buyerInstructions: buyerInstructions.trim(),
      agreedPriceYER: service.priceYER,
      agreedPriceUSD: service.priceUSD,
      deliveryDays: Number(agreedDays) || service.deliveryDays,
      bufferDays: service.bufferDays || 2
    });

    onClose();
    navigateTo('client-dashboard');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-xs overflow-y-auto font-sans text-right"
      dir="rtl"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-5 bg-[#0B192C] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold text-teal-400 block">
                {service.categoryName || 'خدمة مصغرة معتمدة'}
              </span>
              <h2 className="text-base sm:text-lg font-black text-white line-clamp-1">
                {service.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Grid: Info & Provider */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Right: Service Details (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Image Preview */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 relative aspect-video bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-[#0B192C]/90 backdrop-blur-xs text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  <span>التسليم خلال {service.deliveryDays} أيام</span>
                  <span className="text-teal-300">| هامش طوارئ +{service.bufferDays} يوم</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-black text-slate-900 mb-2">وصف الخدمة:</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {service.description}
                </p>
              </div>

              {/* Included Deliverables */}
              {service.deliverablesIncluded && service.deliverablesIncluded.length > 0 && (
                <div>
                  <h3 className="text-xs font-black text-teal-900 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>ما تشمله هذه الخدمة والمخرجات المسلّمة:</span>
                  </h3>
                  <div className="space-y-1.5">
                    {service.deliverablesIncluded.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-teal-50/50 border border-teal-100 text-xs text-slate-800"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Excluded Deliverables */}
              {service.deliverablesExcluded && service.deliverablesExcluded.length > 0 && (
                <div>
                  <h3 className="text-xs font-black text-slate-700 mb-2 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-slate-400" />
                    <span>ما لا تشمله الخدمة (استثناءات محددة):</span>
                  </h3>
                  <div className="space-y-1.5">
                    {service.deliverablesExcluded.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] text-slate-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buyer Requirements */}
              {service.buyerRequirements && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>تعليمات ومتطلبات البدء من المشتري:</span>
                  </div>
                  <p className="text-amber-800 text-[11px] leading-relaxed">
                    {service.buyerRequirements}
                  </p>
                </div>
              )}
            </div>

            {/* Left: Provider Card & Order Box (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Provider Profile Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={service.provider?.avatar}
                    alt={service.provider?.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500 shadow-xs"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#0B192C]">
                      {service.provider?.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 block">
                      {service.provider?.university}
                    </span>
                    <span className="text-[10px] text-teal-700 font-medium block">
                      {service.provider?.faculty}
                    </span>
                  </div>
                </div>

                {/* Badges */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-center">
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{service.provider?.rating || service.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">التقييم العام</span>
                  </div>

                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="text-xs font-bold text-slate-800 block">
                      {service.salesCount || service.provider?.completedCount} مشاريع
                    </span>
                    <span className="text-[10px] text-slate-400">منجزة بنجاح</span>
                  </div>
                </div>

                {/* Infrastructure indicators */}
                <div className="space-y-1.5 pt-1 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-teal-600" />
                    <span>طاقة شمسية احتياطية: مجهزة ومفعلة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>شبكة إنترنت مزدوجة (ألياف + 4G)</span>
                  </div>
                </div>
              </div>

              {/* Price & Order Action Card */}
              <div className="p-5 rounded-2xl bg-[#0B192C] text-white space-y-4 shadow-lg">
                <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-400">سعر الخدمة الأساسي:</span>
                  <div className="text-left font-mono">
                    <div className="text-2xl font-black text-teal-400">
                      {service.priceYER?.toLocaleString()} ر.ي
                    </div>
                    <span className="text-xs text-slate-400">
                      (ما يعادل ${service.priceUSD} تقريباً)
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>التعديلات المتاحة:</span>
                    <span className="font-bold text-white">
                      {service.revisionsAllowed || 3} تعديلات مشمولة
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>وساطة الضمان المالي:</span>
                    <span className="font-bold text-emerald-400">
                      محجوز لدى شبكات صرافة وبنوك المكلا
                    </span>
                  </div>
                </div>

                {!isOrdering ? (
                  <button
                    onClick={() => setIsOrdering(true)}
                    className="w-full py-3 px-4 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>اطلب هذه الخدمة الآن</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <form onSubmit={handleStartOrder} className="space-y-3 pt-2 border-t border-slate-800">
                    <h4 className="text-xs font-bold text-teal-300">
                      بيانات وتخصيص طلب الخدمة:
                    </h4>

                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">
                        عنوان الطلب / تفاصيل العمل:
                      </label>
                      <input
                        type="text"
                        required
                        value={orderTitle}
                        onChange={(e) => setOrderTitle(e.target.value)}
                        placeholder="مثلاً: تطوير متجر إلكتروني لمؤسستنا..."
                        className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">
                        ملاحظاتك ومتطلباتك الإضافية:
                      </label>
                      <textarea
                        rows={2}
                        value={buyerInstructions}
                        onChange={(e) => setBuyerInstructions(e.target.value)}
                        placeholder="أي تفاصيل ترغب في تقديمها للمستقل لبدء العمل..."
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <label className="flex items-start gap-2 text-[11px] text-slate-300 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={acknowledgedRequirements}
                        onChange={(e) => setAcknowledgedRequirements(e.target.checked)}
                        className="mt-0.5 rounded text-teal-600 focus:ring-0"
                      />
                      <span>
                        أقر باطلاعي على مخرجات الخدمة وموافقتي على إيداع الضمان عبر حساب الوساطة المعتمد.
                      </span>
                    </label>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>تأكيد الطلب وقفل الضمان</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsOrdering(false)}
                        className="py-2.5 px-3 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                      >
                        إلغاء
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;
