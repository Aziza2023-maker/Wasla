import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import {
  PhoneCall,
  Mail,
  Building,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  ExternalLink,
  MessageCircle,
  Phone,
  Layers,
  ArrowLeft,
  Lock,
  Plus,
  Wifi,
  SlidersHorizontal
} from 'lucide-react';

export const DirectContactHub = () => {
  const { freelancerUser, addToast, openModal } = useWasla();

  const handleChannelAction = (channelName) => {
    addToast('تحديث قناة الاتصال', `تم فتح إعدادات التحقق لقناة (${channelName}) ومزامنة الروابط.`);
  };

  return (
    <div className="space-y-6 font-sans text-right" dir="rtl">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-black text-[#0B192C]">
                بيانات التواصل المباشر (بديل الدردشة) والتحقق المالي
              </h1>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                نظام المرونة والسرعة
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-3xl">
              تتيح منصة «وصلة» للطلبة والعملاء التواصل الفوري عبر قنواتهم المفضلة دون حصرهم في واجهات بطيئة أو معقدة مع ضمان كامل المستحقات عبر حسابات الضمان المحلي المعتمدة (العمقي، الكريمي، بن دول، والبسيري).
            </p>
          </div>

          <div className="bg-teal-50 rounded-xl p-3 border border-teal-200 text-center shrink-0">
            <span className="text-[10px] text-teal-700 font-medium block">زمن الاستجابة المباشر</span>
            <span className="text-lg font-black text-teal-900 block tracking-tight">
              &lt; 15 دقيقة
            </span>
            <span className="text-[9px] text-emerald-700 font-bold">معدل تحويل مباشر 98%</span>
          </div>
        </div>
      </div>

      {/* 2. Main Two Columns: Active Channels vs Client View Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right: Active Communication Channels (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-black text-sm text-[#0B192C]">قنوات الاتصال النشطة</h3>
                <span className="text-[11px] text-slate-400 font-normal">
                  قم بضبط وتفعيل الروابط التي ستظهر للعميل فور اعتماد وترسية المشروع
                </span>
              </div>

              <button
                onClick={() => addToast('إضافة قناة اتصال', 'يمكنك إضافة حساب تليجرام أو بريد جامعي بديل.')}
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-3 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة قناة جديدة</span>
              </button>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {/* Card 1: WhatsApp Business */}
              <div className="rounded-xl border border-slate-200/90 p-4 hover:border-teal-400 transition-all bg-slate-50/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0B192C]">واتساب مهني</h4>
                      <span className="text-[10px] text-slate-400 font-normal">WhatsApp Business</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">موثق</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">أساسي</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-2.5 border border-slate-200 text-center font-mono font-bold text-xs text-slate-800 mb-3" dir="ltr">
                  {freelancerUser.contactChannels.whatsapp}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] text-slate-400">متاح بعد إيداع الضمان</span>
                  <button
                    onClick={() => handleChannelAction('واتساب')}
                    className="font-bold text-teal-700 hover:underline flex items-center gap-0.5"
                  >
                    <span>تعديل الرابط</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Card 2: Academic Email */}
              <div className="rounded-xl border border-slate-200/90 p-4 hover:border-teal-400 transition-all bg-slate-50/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0B192C]">بريد جامعي معتمد</h4>
                      <span className="text-[10px] text-slate-400 font-normal">جامعة حضرموت • كلية الحاسوب (فلك)</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-700">معتمد</span>
                </div>

                <div className="bg-white rounded-lg p-2.5 border border-slate-200 text-center font-mono font-bold text-xs text-slate-800 mb-3" dir="ltr">
                  {freelancerUser.contactChannels.academicEmail}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] text-slate-400">مزامنة دورية</span>
                  <button
                    onClick={() => handleChannelAction('البريد الأكاديمي')}
                    className="font-bold text-teal-700 hover:underline flex items-center gap-0.5"
                  >
                    <span>فحص الاتصال</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Card 3: Emergency Phone */}
              <div className="rounded-xl border border-slate-200/90 p-4 hover:border-teal-400 transition-all bg-slate-50/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0B192C]">هاتف الطوارئ المحلي</h4>
                      <span className="text-[10px] text-slate-400 font-normal">يمن موبايل / سبأفون</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">عند انقطاع الشبكة</span>
                </div>

                <div className="bg-white rounded-lg p-2.5 border border-slate-200 text-center font-mono font-bold text-xs text-slate-800 mb-3" dir="ltr">
                  {freelancerUser.contactChannels.emergencyPhone}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] text-slate-400">تغطية VoLTE & 4G</span>
                  <button
                    onClick={() => handleChannelAction('هاتف الطوارئ')}
                    className="font-bold text-teal-700 hover:underline flex items-center gap-0.5"
                  >
                    <span>تغيير الشريحة</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Card 4: Professional Links */}
              <div className="rounded-xl border border-slate-200/90 p-4 hover:border-teal-400 transition-all bg-slate-50/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0B192C]">ملفات برمجية واحترافية</h4>
                      <span className="text-[10px] text-slate-400 font-normal">GitHub & LinkedIn</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">2 منصات</span>
                </div>

                <div className="bg-white rounded-lg p-2 border border-slate-200 text-right space-y-1 text-[11px] font-mono text-slate-700 mb-3" dir="ltr">
                  <div className="flex items-center justify-between">
                    <span>{freelancerUser.contactChannels.github}</span>
                    <span className="text-emerald-600 text-[10px]">متصل</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{freelancerUser.contactChannels.linkedin}</span>
                    <span className="text-emerald-600 text-[10px]">متصل</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] text-slate-400">متاح علناً للمعاينة</span>
                  <button
                    onClick={() => handleChannelAction('ملفات GitHub')}
                    className="font-bold text-teal-700 hover:underline flex items-center gap-0.5"
                  >
                    <span>تحديث الروابط</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Emergency Buffer Protocol Explanation Card */}
            <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-4 flex items-start gap-3">
              <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-xs text-teal-950">
                    بروتوكول الهامش الزمني للأعطال (Buffer Protocol 24+ إلى 48+ ساعة تلقائي)
                  </h4>
                </div>
                <p className="text-xs text-teal-900 font-normal leading-relaxed">
                  عند انقطاع التيار الكهربائي أو شبكة الإنترنت في نطاق الطالب، يُفعل نظام «وصلة» تنبيهاً مباشراً للعميل عبر الرسائل النصية القصيرة (SMS) ويمنح العقد هامشاً زمنياً إضافياً معتمداً دون التأثير على تقييم الطالب الأكاديمي أو غرامات التأخير.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Left: Client View Preview Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-right">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-[#0B192C]">معاينة نافذة تواصل الطالب للعميل</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800">
                كما يراها صاحب المشروع
              </span>
            </div>

            {/* Simulated Client Modal View */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-3">
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  متواجد للعمل الأكاديمي
                </span>
                <span className="font-mono">عقد نشط #842</span>
              </div>

              {/* Avatar & Profile */}
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-teal-500 shadow-xs">
                  <img
                    src={freelancerUser.avatar}
                    alt={freelancerUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-black text-sm text-[#0B192C]">{freelancerUser.name}</h4>
                <span className="text-xs text-teal-800 font-bold block">
                  {freelancerUser.university} • امتياز
                </span>
                <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                  {freelancerUser.title}
                </span>
              </div>

              {/* Quick KPI stats */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs mb-4">
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <span className="text-xs font-black text-emerald-700 block">98%</span>
                  <span className="text-[10px] text-slate-400">معدل الإنجاز في الوقت</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <span className="text-xs font-black text-[#0B192C] block">15</span>
                  <span className="text-[10px] text-slate-400">مشروع مكتمل وناجح</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => addToast('فتح واتساب', 'تم تحويلك إلى نافذة المحادثة المباشرة مع الطالب.')}
                  className="w-full py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>مراسلة فورية عبر واتساب</span>
                </button>

                <button
                  onClick={() => addToast('اتصال طوارئ', 'جاري الاتصال بهاتف الطالب المعتمد للطوارئ.')}
                  className="w-full py-2 rounded-xl bg-[#0B192C] hover:bg-[#0F2137] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>اتصال هاتفي مباشر (طوارئ)</span>
                </button>

                <button
                  onClick={() => openModal('add-portfolio-item')}
                  className="w-full py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-teal-600" />
                  <span>استعراض ملف الأعمال البرمجية</span>
                </button>
              </div>

              {/* Safety Footer */}
              <div className="mt-4 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1 font-medium">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>تواصل خارجي مباشر للكفاءة مع ضمان مالي كامل ومحمي لدى المنصة حتى تسليم المشروع.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Local Bank Account Linking (Kuraimi & Najm) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <h3 className="font-black text-base text-[#0B192C]">
                ربط وتأكيد الحساب البنكي المحلي (الكريمي إكسبرس والنجم للحوالات)
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              تُودع مستحقات المشاريع مباشرة بالريال اليمني أو الدولار في حسابك المعتمد فور مصادقة العميل على إنجاز المهام، مع خيارات الاستلام من أي نقطة صرافة في المحافظات.
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
            حساب التحويل نشط
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Kuraimi Bank */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-teal-700" />
                  <h4 className="font-bold text-xs text-[#0B192C]">بنك الكريمي للتمويل الأصغر</h4>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>

              <span className="text-[10px] text-slate-400 block mb-1">حساب "مميز" / حساب توفير</span>
              <div className="bg-white rounded-lg p-2.5 border border-slate-200 font-mono font-black text-sm text-[#0B192C] mb-2" dir="ltr">
                {freelancerUser.bankAccounts.kuraimi.accountNumber}
              </div>
              <span className="text-[11px] text-slate-600 font-medium block">
                الاسم: {freelancerUser.bankAccounts.kuraimi.accountName}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs mt-3">
              <span className="text-[10px] text-emerald-700 font-bold">الحالة: إيداع تلقائي مفضل</span>
              <button
                onClick={() => addToast('تغيير الحساب', 'يمكنك تحديث رقم حساب الكريمي المميز الخاص بك.')}
                className="text-slate-500 hover:text-slate-800 text-[11px] font-bold"
              >
                تغيير الحساب
              </button>
            </div>
          </div>

          {/* Card 2: Al-Omgy Exchange */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-teal-700" />
                  <h4 className="font-bold text-xs text-[#0B192C]">شركة العمقي للصرافة</h4>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>

              <span className="text-[10px] text-slate-400 block mb-1">حساب معتمد / فرع المكلا</span>
              <div className="bg-white rounded-lg p-2.5 border border-slate-200 font-mono font-black text-sm text-[#0B192C] mb-2" dir="ltr">
                {freelancerUser.bankAccounts.omgy?.accountNumber || '254 019 3301'}
              </div>
              <span className="text-[11px] text-slate-600 font-medium block">
                الفرع المفضل: {freelancerUser.bankAccounts.omgy?.branch || 'المكلا - حي الشرج'}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs mt-3">
              <span className="text-[10px] text-slate-500 font-medium">رسوم التحويل: بحسب تعرفة الصرافة</span>
              <button
                onClick={() => addToast('تعديل الفرع', 'يمكنك تعديل بيانات استلام حوالات العمقي من إعدادات الحساب.')}
                className="text-slate-500 hover:text-slate-800 text-[11px] font-bold"
              >
                تعديل الفرع
              </button>
            </div>
          </div>

          {/* Card 3: Escrow Protection Dark Card */}
          <div className="rounded-xl bg-[#0B192C] text-white p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 text-teal-400">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="font-bold text-xs text-white">وساطة حماية المستحقات</h4>
              </div>
              <p className="text-[11px] text-slate-300 font-normal leading-relaxed mb-4">
                عند قبول أي مشروع، يودع العميل قيمة المرحلة في حساب وساطة «وصلة». لا تبدأ العمل إلا بعد تأكيد حجز المبلغ من المشرف المالي، وتتحرر مستحقاتك فور اعتماد التسليم.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-teal-300 font-bold">المتبقي تحت الضمان: 85,000 ر.ي</span>
              <button
                onClick={() => addToast('سجل التحويلات', 'تم استعراض كافة السندات المالية المودعة لحسابك.')}
                className="text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1"
              >
                <span>سجل التحويلات</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectContactHub;

