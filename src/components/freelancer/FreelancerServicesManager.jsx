import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import {
  Sparkles,
  Plus,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Star,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  X,
  Check,
  Building,
  DollarSign
} from 'lucide-react';

export const FreelancerServicesManager = () => {
  const {
    servicesCatalog,
    serviceOrders,
    freelancerUser,
    addService,
    updateService,
    deleteService,
    toggleServiceVisibility,
    serviceCategories,
    addToast
  } = useWasla();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);

  // Form Fields (All 9 required fields)
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('programming');
  const [description, setDescription] = useState('');
  const [deliverablesIncludedText, setDeliverablesIncludedText] = useState('');
  const [deliverablesExcludedText, setDeliverablesExcludedText] = useState('');
  const [priceType, setPriceType] = useState('fixed');
  const [priceYER, setPriceYER] = useState('150000');
  const [priceUSD, setPriceUSD] = useState('280');
  const [deliveryDays, setDeliveryDays] = useState('5');
  const [bufferDays, setBufferDays] = useState('2');
  const [revisionsAllowed, setRevisionsAllowed] = useState('3');
  const [buyerRequirements, setBuyerRequirements] = useState('');
  const [tagsText, setTagsText] = useState('');

  // Filter freelancer's gigs (by freelancerId or default Arwa)
  const myServices = servicesCatalog.filter(
    (s) => s.freelancerId === freelancerUser.id || s.provider?.name === freelancerUser.name
  );

  const totalSales = myServices.reduce((sum, s) => sum + (s.salesCount || 0), 0);
  const activeGigsCount = myServices.filter((s) => s.isVisible).length;

  const handleOpenAdd = () => {
    setEditingServiceId(null);
    setTitle('');
    setCategoryId('programming');
    setDescription('');
    setDeliverablesIncludedText('بناء المشروع متوافقاً مع الجوال\nلوحة تحكم إدارية سريعة\nضمان دعم فني لمدة 30 يوماً');
    setDeliverablesExcludedText('تكاليف السيرفرات السحابية بعد الشهر الأول\nتصوير المنتجات ميدانياً');
    setPriceType('fixed');
    setPriceYER('150000');
    setPriceUSD('280');
    setDeliveryDays('5');
    setBufferDays('2');
    setRevisionsAllowed('3');
    setBuyerRequirements('يرجى تزويدي بنموذج التصميم وألوان الهوية وتفاصيل المحتوى.');
    setTagsText('React, Next.js, واجهات, المكلا');
    setShowAddModal(true);
  };

  const handleOpenEdit = (service) => {
    setEditingServiceId(service.id);
    setTitle(service.title);
    setCategoryId(service.categoryId || 'programming');
    setDescription(service.description || '');
    setDeliverablesIncludedText((service.deliverablesIncluded || []).join('\n'));
    setDeliverablesExcludedText((service.deliverablesExcluded || []).join('\n'));
    setPriceType(service.priceType || 'fixed');
    setPriceYER(String(service.priceYER || 150000));
    setPriceUSD(String(service.priceUSD || 280));
    setDeliveryDays(String(service.deliveryDays || 5));
    setBufferDays(String(service.bufferDays || 2));
    setRevisionsAllowed(String(service.revisionsAllowed || 3));
    setBuyerRequirements(service.buyerRequirements || '');
    setTagsText((service.tags || []).join(', '));
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryObj = serviceCategories.find((c) => c.id === categoryId);
    const categoryName = categoryObj ? categoryObj.name : 'برمجة وتطوير';

    const deliverablesIncluded = deliverablesIncludedText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const deliverablesExcluded = deliverablesExcludedText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const serviceData = {
      title: title.trim(),
      categoryId,
      categoryName,
      description: description.trim(),
      deliverablesIncluded,
      deliverablesExcluded,
      priceType,
      priceYER: Number(priceYER) || 150000,
      priceUSD: Number(priceUSD) || 280,
      deliveryDays: Number(deliveryDays) || 5,
      bufferDays: Number(bufferDays) || 2,
      revisionsAllowed: Number(revisionsAllowed) || 3,
      buyerRequirements: buyerRequirements.trim(),
      tags
    };

    if (editingServiceId) {
      updateService(editingServiceId, serviceData);
    } else {
      addService(serviceData);
    }

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      {/* 1. Header Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B192C]">
              إدارة خدماتي المصغرة (Khamsat Gigs)
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            أنشئ وادر خدماتك المصغرة وحدد المخرجات المشمولة والاستثناءات والأسعار وهامش الطوارئ المعتمد لمدينة المكلا وحضرموت.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة خدمة مصغرة جديدة</span>
        </button>
      </div>

      {/* 2. Metric Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">إجمالي الخدمات المنشورة</span>
            <span className="text-2xl font-black text-[#0B192C]">{myServices.length} خدمات</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">الخدمات النشطة بالسوق</span>
            <span className="text-2xl font-black text-emerald-700">{activeGigsCount} معروضة</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold block mb-1">إجمالي المبيعات المكتملة</span>
            <span className="text-2xl font-black text-[#0B192C]">{totalSales} طلب</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {myServices.map((service) => {
          const serviceOrdersCount = serviceOrders.filter((o) => o.serviceId === service.id).length;

          return (
            <div
              key={service.id}
              className={`bg-white rounded-2xl border overflow-hidden transition-all flex flex-col justify-between shadow-xs ${
                service.isVisible ? 'border-slate-200' : 'border-slate-300 opacity-75 bg-slate-50'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-xs ${
                        service.isVisible
                          ? 'bg-emerald-500/90 text-white border-emerald-400'
                          : 'bg-slate-700/90 text-slate-200 border-slate-600'
                      }`}
                    >
                      {service.isVisible ? 'معروضة بالسوق' : 'مخفية مؤقتاً'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{service.categoryName}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{service.rating || 5.0}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#0B192C] line-clamp-2 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block">مدة التسليم</span>
                      <span className="font-bold text-slate-800">{service.deliveryDays} أيام</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block">هامش الطوارئ</span>
                      <span className="font-bold text-teal-700">+{service.bufferDays} يوم</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-slate-100 font-mono">
                    <span className="text-xs text-slate-400">السعر:</span>
                    <div className="text-left">
                      <span className="text-base font-black text-teal-800">
                        {service.priceYER?.toLocaleString()} ر.ي
                      </span>
                      <span className="text-[10px] text-slate-400 block">(${service.priceUSD})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleServiceVisibility(service.id)}
                  title={service.isVisible ? 'إخفاء الخدمة من السوق' : 'إظهار الخدمة في السوق'}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition-colors flex items-center gap-1.5 text-xs font-bold"
                >
                  {service.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-emerald-600" />}
                  <span>{service.isVisible ? 'إخفاء' : 'إظهار'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(service)}
                    className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-teal-50 hover:text-teal-700 text-slate-600 transition-colors"
                    title="تعديل الخدمة"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteService(service.id)}
                    className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-600 transition-colors"
                    title="حذف الخدمة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Add / Edit Modal (9 Required Fields) */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
          dir="rtl"
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 bg-[#0B192C] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h2 className="text-base font-black">
                  {editingServiceId ? 'تعديل بيانات الخدمة المصغرة' : 'نشر خدمة مصغرة جديدة (9 حقول إلزامية)'}
                </h2>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              {/* Field 1: Title */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  1. عنوان الخدمة المصغرة (واضح ومحدد بدقة):
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثلاً: تطوير متجر إلكتروني متكامل بـ Next.js و Supabase لمحلات المكلا..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-bold focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Field 2: Category */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  2. التصنيف الأكاديمي والمهني:
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-bold focus:outline-none focus:border-teal-500"
                >
                  {serviceCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 3: Description */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  3. الوصف التفصيلي للخدمة:
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اشرح بدقة ما تقدمه وما يميز عملك، والتقنيات المستخدمة..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Field 4: Deliverables Included */}
              <div>
                <label className="font-bold text-teal-900 block mb-1">
                  4. المخرجات المشمولة في السعر (اكتب كل بند في سطر مستقل):
                </label>
                <textarea
                  rows={3}
                  required
                  value={deliverablesIncludedText}
                  onChange={(e) => setDeliverablesIncludedText(e.target.value)}
                  placeholder="بناء كود الواجهات كاملاً&#10;ربط قواعد البيانات السحابية&#10;دعم فني وصيانة لمدة شهر"
                  className="w-full p-2.5 bg-teal-50/50 border border-teal-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Field 5: Deliverables Excluded */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  5. ما لا تشمله الخدمة (الاستثناءات لتفادي النزاعات):
                </label>
                <textarea
                  rows={2}
                  value={deliverablesExcludedText}
                  onChange={(e) => setDeliverablesExcludedText(e.target.value)}
                  placeholder="تكلفة استضافة السيرفر بعد الشهر الأول&#10;شراء الخطوط المدفوعة"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Field 6: Price & Price Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">6.1 نوع السعر:</label>
                  <select
                    value={priceType}
                    onChange={(e) => setPriceType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-bold"
                  >
                    <option value="fixed">سعر محدد ثابت</option>
                    <option value="starting_at">يبدأ من</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">6.2 السعر بالريال اليمني (ر.ي):</label>
                  <input
                    type="number"
                    required
                    min="10000"
                    step="5000"
                    value={priceYER}
                    onChange={(e) => {
                      const yer = Number(e.target.value) || 0;
                      setPriceYER(String(yer));
                      setPriceUSD(String(Math.round(yer / 530)));
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-teal-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">6.3 السعر بالدولار ($):</label>
                  <input
                    type="number"
                    value={priceUSD}
                    onChange={(e) => setPriceUSD(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-600"
                  />
                </div>
              </div>

              {/* Field 7: Delivery Days & Buffer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    7.1 مدة التسليم الأساسية (أيام):
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="60"
                    value={deliveryDays}
                    onChange={(e) => setDeliveryDays(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-teal-900 block mb-1">
                    7.2 هامش طوارئ المكلا (+أيام أمان):
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="10"
                    value={bufferDays}
                    onChange={(e) => setBufferDays(e.target.value)}
                    className="w-full p-2.5 bg-teal-50 border border-teal-200 rounded-xl text-xs font-bold text-teal-900"
                  />
                </div>
              </div>

              {/* Field 8: Revisions Allowed */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  8. عدد التعديلات المسموحة مجاناً:
                </label>
                <select
                  value={revisionsAllowed}
                  onChange={(e) => setRevisionsAllowed(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="1">تعديل واحد</option>
                  <option value="2">تعديلان</option>
                  <option value="3">3 تعديلات (المعيار الموصى به)</option>
                  <option value="5">5 تعديلات</option>
                </select>
              </div>

              {/* Field 9: Buyer Requirements */}
              <div>
                <label className="font-bold text-amber-900 block mb-1">
                  9. تعليمات للمشتري (متطلبات البدء بالعمل):
                </label>
                <textarea
                  rows={2}
                  required
                  value={buyerRequirements}
                  onChange={(e) => setBuyerRequirements(e.target.value)}
                  placeholder="ما تحتاجه من العميل للبدء فوراً (مثلاً: الملفات، الشعار، أرقام الحسابات)..."
                  className="w-full p-2.5 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  الكلمات المفتاحية والمهارات (مفصولة بفاصلة):
                </label>
                <input
                  type="text"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="React, Next.js, واجهات, المكلا"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs transition-colors shadow-xs"
                >
                  {editingServiceId ? 'حفظ التعديلات' : 'نشر الخدمة في سوق وصلة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerServicesManager;
