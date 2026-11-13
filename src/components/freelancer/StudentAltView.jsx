import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import {
  Sparkles,
  ShieldCheck,
  Plus,
  Share2,
  TrendingUp,
  Wallet,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building,
  PhoneCall,
  Send,
  MessageCircle,
  FileCode,
  Star,
  ChevronLeft,
  GraduationCap,
  SlidersHorizontal,
  Lock
} from 'lucide-react';

export const StudentAltView = () => {
  const { peerStudents, navigateTo, addToast, openModal } = useWasla();
  const [selectedUnivFilter, setSelectedUnivFilter] = useState('all');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-right" dir="rtl">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-8 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <WaslaLogo
            variant="dark"
            size="md"
            subTitle="WASLA.YE"
            onClick={() => navigateTo('landing')}
          />

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-600 font-medium">
            <span className="font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              لوحة المستقل (عرض الطالب الموثق)
            </span>
            <button onClick={() => navigateTo('freelancer-jobs')} className="hover:text-slate-900">
              تصفح المشاريع
            </button>
            <button onClick={() => navigateTo('freelancer-contact')} className="hover:text-slate-900">
              الرسائل والاتصال
            </button>
            <button onClick={() => navigateTo('admin-panel')} className="hover:text-slate-900">
              إجراءات الضمان الأكاديمي
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="bg-[#0B192C] text-white px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-bold">
              <Wallet className="w-4 h-4 text-teal-400" />
              <span>الرصيد الفوري: $1,230.00</span>
            </div>

            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-500">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="أسامة مروان"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 flex-1 w-full">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-teal-500 shadow-sm shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                alt="أسامة مروان الشميري"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-xl font-black text-[#0B192C]">أسامة مروان الشميري</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  طالب موثق (جامعة صنعاء)
                </span>
                <span className="text-xs font-bold text-amber-600">4.9 ★ (26 تقييم حقيقي)</span>
              </div>

              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                كلية الحاسوب وتكنولوجيا المعلومات • هندسة برمجيات • المستوى الرابع • متخصص في حلول وتطوير Full-Stack (Laravel, React, Tailwind)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => openModal('add-portfolio-item')}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة خدمة جديدة</span>
            </button>
            <button
              onClick={() => addToast('مشاركة الملف', 'تم نسخ رابط الملف الأكاديمي للحافظة.')}
              className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4 text-teal-600" />
              <span>مشاركة ملفي الجامعي</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500 block mb-1">إجمالي الأرباح المحققة</span>
            <div className="text-2xl font-black text-[#0B192C] mb-1">$6,377.00</div>
            <span className="text-[10px] text-emerald-700 font-bold block">18.4%+ نمو إيجابي هذا الشهر</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500 block mb-1">الرصيد المتاح للصرف الفوري</span>
            <div className="text-2xl font-black text-emerald-700 mb-1">$1,230.00</div>
            <span className="text-[10px] text-slate-400 font-normal block">جاهز للتحويل عبر الكريمي والنجم فوراً</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500 block mb-1">مشاريع قيد الإنجاز</span>
            <div className="text-2xl font-black text-[#0B192C] mb-1">3 مشاريع نشطة</div>
            <span className="text-[10px] text-amber-600 font-bold block">أحد المشاريع ينتهي خلال 36 ساعة</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-slate-500 block mb-1">المشاريع المكتملة</span>
            <div className="text-2xl font-black text-[#0B192C] mb-1">29 مشروعاً ناجحاً</div>
            <span className="text-[10px] text-emerald-700 font-bold block">نسبة إكمال المهام 100%</span>
          </div>
        </div>

        {/* Exclusive Buffer Protocol Banner */}
        <div className="bg-gradient-to-r from-teal-900 to-[#0B192C] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-800/80 text-teal-300 text-xs font-bold mb-3 border border-teal-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ميزة حصرية لطلاب وصلة</span>
              </div>
              <h3 className="text-lg font-black mb-1">
                المدة الزمنية الإضافية (الهامش الزمني المضمون للطوارئ)
              </h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed max-w-2xl">
                تضمن منصة وصلة حقوق الطالب والعميل معاً. عند حدوث طوارئ مفاجئة كانقطاع التيار الكهربائي أو شبكة الإنترنت، يمكنك تفعيل الهامش الزمني (إضافة 24 إلى 48 ساعة إضافية للمشروع) دون التأثير على تقييمك أو إلغاء العقد من قبل العميل، بفضل ميزة التوثيق الذكي.
              </p>
            </div>

            <button
              onClick={() => openModal('buffer-settings')}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-5 py-3 rounded-xl font-black text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-md"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>إدارة وضبط الهامش الزمني</span>
            </button>
          </div>
        </div>

        {/* Split Section: Projects in Progress vs Local Withdrawal Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Right: In Progress Projects (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="font-black text-base text-[#0B192C] mb-4">
                مشاريعي قيد التنفيذ
              </h3>

              {/* Project 1 */}
              <div className="rounded-xl border border-slate-200 p-5 mb-4 bg-slate-50/40">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800">
                      برمجة وتطوير ويب
                    </span>
                    <h4 className="font-bold text-sm text-[#0B192C] mt-1 mb-1">
                      تطوير تطبيق ويب لإدارة العيادات الطبية بنظام Laravel و Tailwind
                    </h4>
                    <span className="text-xs text-slate-400 font-normal">
                      العميل: د. مروان القدسي (مركز الأمل الاستشاري - صنعاء)
                    </span>
                  </div>

                  <div className="text-left">
                    <span className="text-base font-black text-emerald-800 block">$450.00</span>
                    <span className="text-[10px] text-teal-700 font-semibold">المبلغ محجوز بحساب الضمان</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-2 text-xs text-amber-900 font-medium mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    الهامش الزمني المضمون: متبقي 36 ساعة
                  </span>
                  <span className="text-[10px] text-slate-400">تاريخ التسليم: 18 يوليو 2024</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-500">نسبة الإنجاز الفعلية: 75%</span>
                    <span className="text-teal-700">مرحلة 3 من 4: ربط واجهات الطبيب</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full w-3/4 rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => addToast('دردشة العميل', 'تم فتح نافذة المراسلة مع د. مروان القدسي.')}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    دردشة العميل
                  </button>
                  <button
                    onClick={() => addToast('رفع مسودة العمل', 'تم رفع المسودة البرمجية بنجاح.')}
                    className="px-4 py-1.5 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold shadow-xs"
                  >
                    رفع مسودة العمل
                  </button>
                </div>
              </div>

              {/* Project 2 */}
              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/40">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                      تحليل بيانات وأبحاث تخرج
                    </span>
                    <h4 className="font-bold text-sm text-[#0B192C] mt-1 mb-1">
                      تحليل وتنسيق بيانات استبيان التخرج الأكاديمي باستخدام SPSS و Python
                    </h4>
                    <span className="text-xs text-slate-400 font-normal">
                      العميل: رها الصنعاني (طالبة ماجستير إدارة أعمال)
                    </span>
                  </div>

                  <div className="text-left">
                    <span className="text-base font-black text-emerald-800 block">$180.00</span>
                    <span className="text-[10px] text-teal-700 font-semibold">مضمون بحساب وساطة الويب كاش</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-500">نسبة الإنجاز الفعلية: 90%</span>
                    <span className="text-emerald-700">جاهز للمراجعة والتسليم النهائي</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[90%] rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => addToast('دردشة وتعديلات', 'تم إرسال الاستفسار للعميلة.')}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    دردشة وتعديلات
                  </button>
                  <button
                    onClick={() => addToast('تسليم المشروع النهائي', 'تم تسليم المشروع النهائي وطلب تحرير المبلغ المحجوز.')}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                  >
                    تسليم المشروع النهائي
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Left: Withdrawal & Academic Escrow Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Withdrawal Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <h3 className="font-black text-sm text-[#0B192C] mb-1">سحب الأرباح محلياً</h3>
              <p className="text-[11px] text-slate-400 font-normal mb-4">
                بدون عمولات إضافية مخفية، بالريال أو الدولار
              </p>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4 text-center">
                <span className="text-xs text-slate-500 font-medium block">الرصيد المتاح للسحب</span>
                <span className="text-2xl font-black text-emerald-800 block tracking-tight">
                  $1,230.00
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ما يعادل تقريباً 1,600,000 ريال يمني
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-bold text-slate-700 block">اختر طريقة السحب المفضلة:</span>
                <div className="p-2.5 rounded-xl border-2 border-teal-500 bg-teal-50/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-teal-700" />
                    <div>
                      <span className="font-bold text-[#0B192C] block">بنك الكريمي (حساب مميز / جوال)</span>
                      <span className="text-[10px] text-slate-400">إيداع فوري مباشر خلال 15 دقيقة</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-teal-800">0% رسوم</span>
                </div>

                <div className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-blue-700" />
                    <div>
                      <span className="font-bold text-[#0B192C] block">حوالة النجم / الامتياز الفورية</span>
                      <span className="text-[10px] text-slate-400">استلام نقدي بالبطاقة الشخصية فوراً</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-teal-800">0% رسوم</span>
                </div>
              </div>

              <button
                onClick={() => openModal('instant-withdrawal')}
                className="w-full bg-[#0B192C] hover:bg-[#0F2137] text-white py-3 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>طلب سحب الرصيد الآن</span>
              </button>
            </div>

            {/* Academic Escrow Badge Box */}
            <div className="bg-[#0B192C] text-white rounded-2xl p-5">
              <div className="flex items-center gap-2 text-teal-400 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="font-bold text-xs text-white">الضمان الأكاديمي النشط</h4>
              </div>
              <p className="text-[11px] text-slate-300 font-normal leading-relaxed mb-3">
                مثبت ببيانات بطاقتك الجامعية برقم القيد <strong>2021-CS-1105</strong> مع إثبات الهوية الأكاديمية لجامعة صنعاء لعام 2024.
              </p>
              <div className="text-[10px] text-teal-300 font-semibold bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                حسابك مؤمن أولوية بالظهور في سوق المقترحات بنسبة 35%
              </div>
            </div>
          </div>
        </div>

        {/* 4. Peer Students Showcase Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-black text-base text-[#0B192C] mb-1">
                عروض المستقلين المميزة (زملاء الجامعات)
              </h3>
              <p className="text-xs text-slate-400 font-normal">
                شبكة طلابية محترفة وموثوقة عبر مختلف التخصصات بالجامعات اليمنية
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedUnivFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedUnivFilter === 'all'
                    ? 'bg-[#0D9488] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                جميع الجامعات
              </button>
              <button
                onClick={() => setSelectedUnivFilter('top')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedUnivFilter === 'top'
                    ? 'bg-[#0D9488] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                الأعلى تقييماً
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {peerStudents.map((peer) => (
              <div
                key={peer.id}
                className="rounded-2xl border border-slate-200/90 p-4 text-center hover:shadow-md transition-all flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-teal-500 shadow-xs">
                    <img
                      src={peer.avatar}
                      alt={peer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-[#0B192C] mb-0.5">{peer.name}</h4>
                  <span className="text-[11px] text-teal-800 font-semibold block mb-2">
                    {peer.university}
                  </span>
                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed mb-3 line-clamp-2">
                    {peer.skills}
                  </p>
                  <div className="text-xs font-bold text-amber-500 mb-4">
                    ★ {peer.rating} ({peer.completedCount} تقييم)
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-normal">تبدأ الخدمات من</span>
                    <span className="text-xs font-black text-emerald-800">{peer.startingPrice}</span>
                  </div>
                  <button
                    onClick={() => addToast('تصفح أعمال الزميل', `تم فتح معرض أعمال ${peer.name}.`)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    تصفح الأعمال
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-400 text-center">
        <span>منصة وصلة © 2025. أول منصة عمل حر للطلاب برعاية الجامعات اليمنية.</span>
      </footer>
    </div>
  );
};

export default StudentAltView;

