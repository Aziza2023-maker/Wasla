import React, { useState, useEffect } from 'react';
import { useWasla } from '../../context/WaslaContext';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import ServiceDetailsModal from '../common/ServiceDetailsModal';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  Zap,
  Building,
  ArrowRight,
  ExternalLink,
  Tag,
  Sparkles
} from 'lucide-react';

export const ServicesPage = () => {
  const {
    servicesCatalog,
    serviceCategories,
    universitiesList,
    navigateTo,
    openModal,
    addToast,
    servicesSearchQuery,
    setServicesSearchQuery
  } = useWasla();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [searchQuery, setSearchQuery] = useState(servicesSearchQuery || '');
  const [currency, setCurrency] = useState('YER'); // 'YER' | 'USD'
  const [selectedServiceForDetails, setSelectedServiceForDetails] = useState(null);

  useEffect(() => {
    if (servicesSearchQuery) {
      setSearchQuery(servicesSearchQuery);
    }
  }, [servicesSearchQuery]);

  const filteredServices = servicesCatalog.filter((item) => {
    if (item.isVisible === false) return false;
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesUniversity =
      selectedUniversity === 'all' || item.provider.university.includes(selectedUniversity);
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesUniversity && matchesSearch;
  });

  const handleOpenDetails = (service) => {
    setSelectedServiceForDetails(service);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-right" dir="rtl">
      {/* 1. Header */}
      <Navbar variant="light" />

      {/* 2. Hero Banner */}
      <section className="bg-[#0B192C] text-white py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>دليل الخدمات الأكاديمية والمهنية المعتمدة</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black mb-3 leading-tight">
              خدمات احترافية يقدمها نخبة طلاب الجامعات اليمنية
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
              تعاقد مع أفضل كفاءات طلاب وخريجي كليات المكلا وحضرموت، مع حماية مالية كاملة عبر وساطة شبكات الصرافة والبنوك المعتمدة (العمقي، الكريمي، بن دول، والبسيري) وهامش زمني للطوارئ لحماية مواعيد التسليم.
            </p>
          </div>

          {/* Integrated Search Bar */}
          <div className="mt-8 max-w-2xl bg-white rounded-2xl p-2 shadow-xl border border-slate-200 flex items-center gap-2">
            <div className="pr-3 pl-1 text-slate-400">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مهارة، تقنية (React, Flutter, Figma...)، أو تخصص..."
              className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-2"
              >
                مسح
              </button>
            )}
            <button
              onClick={() => {}}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              بحث
            </button>
          </div>
        </div>
      </section>

      {/* 3. Main Catalog Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          {/* Top Bar: Categories */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-[#0B192C] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                جميع التصنيفات ({servicesCatalog.length})
              </button>

              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#0D9488] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-slate-400 font-bold">العملة:</span>
              <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
                <button
                  onClick={() => setCurrency('YER')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    currency === 'YER'
                      ? 'bg-white text-[#0B192C] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  ريال يمني (ر.ي)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    currency === 'USD'
                      ? 'bg-white text-[#0B192C] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  دولار ($)
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar: University Filter */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs">
              <Building className="w-4 h-4 text-slate-400" />
              <span className="font-bold text-slate-600">تصفية حسب الجامعة:</span>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium outline-none focus:border-teal-500"
              >
                <option value="all">كافة الجامعات اليمنية</option>
                {universitiesList.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name} ({u.city})
                  </option>
                ))}
              </select>
            </div>

            <span className="text-xs text-slate-400 font-medium">
              عرض <strong className="text-slate-700">{filteredServices.length}</strong> خدمة متاحة
            </span>
          </div>
        </div>

        {/* 4. Services Grid */}
        {filteredServices.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-[#0B192C]">لا توجد نتائج مطابقة لبحثك</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              لم نعثر على خدمات تطابق معايير التصفية الحالية. يمكنك تغيير التصنيف أو مسح كلمات البحث للاطلاع على كافة العروض.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedUniversity('all');
                setSearchQuery('');
              }}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              عرض جميع الخدمات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Service Image Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-[#0B192C]/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      {service.categoryName}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                      <Clock className="w-3 h-3 text-teal-600" />
                      <span>{service.deliveryDays} أيام تسليم (+{service.bufferDays} طوارئ)</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    {/* Provider Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={service.provider.avatar}
                          alt={service.provider.name}
                          className="w-9 h-9 rounded-full object-cover border border-teal-500"
                        />
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-[#0B192C]">
                              {service.provider.name}
                            </span>
                            {service.provider.isVerified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 block font-normal">
                            {service.provider.university}
                          </span>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{service.rating}</span>
                        <span className="text-[10px] text-slate-400">({service.salesCount})</span>
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-sm font-black text-[#0B192C] leading-snug line-clamp-2">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-2">
                      {service.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {service.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Readiness badge */}
                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <Zap className="w-3.5 h-3.5 text-emerald-600" />
                        <span>طاقة شمسية + إنترنت بديل مؤكد</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">
                      {service.priceType === 'starting_at' ? 'يبدأ من' : 'السعر المحدد'}
                    </span>
                    <span className="text-base font-black text-[#0B192C]">
                      {currency === 'YER'
                        ? `${service.priceYER.toLocaleString()} ر.ي`
                        : `$${service.priceUSD}`}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenDetails(service)}
                    className="bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>تفاصيل وطلب الخدمة</span>
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Service Details & Order Modal */}
      {selectedServiceForDetails && (
        <ServiceDetailsModal
          service={selectedServiceForDetails}
          onClose={() => setSelectedServiceForDetails(null)}
        />
      )}

      {/* 5. Footer */}
      <Footer />
    </div>
  );
};

export default ServicesPage;

