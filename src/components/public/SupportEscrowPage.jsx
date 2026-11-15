import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import {
  ShieldCheck,
  Lock,
  Clock,
  HelpCircle,
  Building,
  CreditCard,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Headphones,
  Check
} from 'lucide-react';

export const SupportEscrowPage = () => {
  const { addToast, navigateTo } = useWasla();

  const [ticketForm, setTicketForm] = useState({
    name: '',
    phone: '',
    category: 'وساطة مالية وحوالات',
    transactionId: '',
    message: '',
  });

  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.message.trim()) {
      addToast('يرجى كتابة نص الرسالة', 'اكتب تفاصيل استفسارك أو مشكلتك لنتمكن من مساعدتك.', 'warning');
      return;
    }

    const ticketId = 'WSL-' + Math.floor(100000 + Math.random() * 900000);
    setSubmittedTicket(ticketId);
    addToast(
      'تم استلام تذكرتك بنجاح!',
      `رقم التذكرة: #${ticketId}. سيقوم فريق الوساطة والدعم الأكاديمي بالتواصل معك خلال أقل من ساعتين.`,
      'success',
      6000
    );

    setTicketForm({
      name: '',
      phone: '',
      category: 'وساطة مالية وحوالات',
      transactionId: '',
      message: '',
    });
  };

  const steps = [
    {
      step: '01',
      title: 'الاتفاق وحجز الضمان (Escrow)',
      desc: 'يقوم صاحب العمل باختيار المستقل وتحديد المتطلبات، ثم إيداع المبلغ عبر شبكات الصرافة والبنوك المعتمدة بحضرموت (العمقي، الكريمي، بن دول، أو البسيري) ليتم تجميده في الحساب الوسيط المعلق.',
      icon: Lock,
    },
    {
      step: '02',
      title: 'بدء التنفيذ مع هامش الطوارئ',
      desc: 'يبدأ الطالب المستقل بالعمل مع تفعيل ميزة "الهامش الزمني للطوارئ" (+24 إلى +48 ساعة) تحسباً لانقطاع الكهرباء أو شبكة الإنترنت.',
      icon: Clock,
    },
    {
      step: '03',
      title: 'التسليم والمراجعة والتحكيم',
      desc: 'يسلم الطالب المخرجات للمعاينة الكاملة، وفي حال وجود أي تعديلات يتم طلبها عبر المنصة بضمان الشروط التعاقدية.',
      icon: Scale,
    },
    {
      step: '04',
      title: 'التحرير الفوري للأرباح',
      desc: 'بمجرد اعتماد المخرجات، يتحرر المبلغ فورياً إلى حساب المستقل على العمقي، الكريمي، بن دول، أو البسيري دون أي تأخير.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-right" dir="rtl">
      {/* 1. Header */}
      <Navbar variant="light" />

      {/* 2. Hero Section */}
      <section className="bg-[#0B192C] text-white py-14 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>نظام الضمان المالي المحلي والوساطة المعتمدة</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black mb-3 leading-tight">
              حقوقك المالية ومواعيدك الأكاديمية محمية بنسبة 100%
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
              منصة وصلة صُممت خصيصاً للواقع المحلي في المكلا ومحافظة حضرموت لتوفر وساطة مالية مرخصة عبر شبكات الصرافة والبنوك المعتمدة (العمقي، الكريمي، بن دول، والبسيري)، ونظام حماية استثنائي لمواعيد تسليم الطلاب ضد ظروف الطاقة والاتصالات.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Escrow Mechanism Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] mb-2">
            كيف تعمل وساطة وصلة المالية (Escrow Workflow)؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            آلية مبسطة وقانونية تحفظ أموال صاحب العمل وتضمن مجهود الطالب المستقل
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-teal-600/40">{s.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-black text-sm text-[#0B192C] mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">{s.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-teal-800 font-bold">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>خطوة مؤمنة ومشفرة</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Emergency Buffer Policy Section */}
      <section className="bg-emerald-50/70 border-y border-emerald-100 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>ميزة حصرية لطلاب الجامعات في اليمن</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0B192C]">
              بروتوكول الهامش الزمني للطوارئ (Emergency Time Buffer)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              نعلم في منصة وصلة طبيعة التحديات التي يواجهها الطالب اليمني من انقطاعات مفاجئة للتيار الكهربائي أو بطء شبكات الإنترنت والألياف. لذلك، صممنا بروتوكول الهامش الزمني ليمنح الطالب هامشاً مرناً (+24 إلى +48 ساعة) معتمداً تعاقدياً لحماية تقييمه الأكاديمي ومنع أي خصم مالي، مع إشعار العميل آلياً بحالة الاستقرار الميداني.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-white rounded-xl p-3 border border-emerald-200/80 shadow-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs text-slate-700 font-bold">حماية التقييم بنسبة 100%</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-emerald-200/80 shadow-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs text-slate-700 font-bold">إشعار فوري للعميل بشفافية</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-emerald-200 shadow-md space-y-4">
            <h4 className="font-black text-sm text-[#0B192C]">شبكات الصرافة والوساطة المالية المعتمدة بالمكلا</h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-800">شركة العمقي للصرافة</strong>
                  <span className="text-slate-400 text-[11px]">حساب معتمد: 254 019 3301 • فرع الشرج</span>
                </div>
                <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md font-bold text-[10px]">
                  المركز الرئيسي
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-800">بنك الكريمي للتمويل الأصغر الإسلامي</strong>
                  <span className="text-slate-400 text-[11px]">حساب مميز: 220 894 1120</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold text-[10px]">
                  إيداع فوري
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-800">بنك بن دول للتمويل الأصغر الإسلامي</strong>
                  <span className="text-slate-400 text-[11px]">حساب معتمد: 108 392 4410 • فرع الخور</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-bold text-[10px]">
                  فرع المكلا
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-800">شركة البسيري للصرافة</strong>
                  <span className="text-slate-400 text-[11px]">حساب معتمد: 319 802 1150 • حي السلام</span>
                </div>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-bold text-[10px]">
                  حوالة كاش
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Support Form & Ticket Submission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto text-teal-700 mb-3">
              <Headphones className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0B192C]">
              مركز الدعم والوساطة وفض النزاعات
            </h2>
            <p className="text-xs text-slate-500 font-normal mt-1">
              هل لديك استفسار عن حوالة مالية معلقة، أو تحتاج لمساعدة في مشروع قائم؟ اكتب لنا وسنتابع تذكرتك فوراً.
            </p>
          </div>

          {submittedTicket && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>تم تسجيل التذكرة بنجاح برقم: {submittedTicket}. جاري المتابعة من قبل مسؤول الوساطة.</span>
            </div>
          )}

          <form onSubmit={handleTicketSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  value={ticketForm.name}
                  onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                  placeholder="مثال: شهاب صالح أو م. أروى الحمادي"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف أو الواتساب *</label>
                <input
                  type="text"
                  required
                  value={ticketForm.phone}
                  onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                  placeholder="مثال: 773892104"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نوع الاستفسار / القسم *</label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white"
                >
                  <option value="وساطة مالية وحوالات">وساطة مالية وحوالات (العمقي / الكريمي / بن دول / البسيري)</option>
                  <option value="توثيق بطاقة جامعية">توثيق بطاقة جامعية وأكاديمية</option>
                  <option value="فض نزاع مشروع">فض نزاع وتدخل وسيط أكاديمي</option>
                  <option value="تفعيل الهامش الزمني">استفسار عن تفعيل الهامش الزمني للطوارئ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رقم الحوالة أو المشروع (اختياري)</label>
                <input
                  type="text"
                  value={ticketForm.transactionId}
                  onChange={(e) => setTicketForm({ ...ticketForm, transactionId: e.target.value })}
                  placeholder="مثال: #982310 أو مشروع عيادات طبية"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">تفاصيل الرسالة أو المشكلة *</label>
              <textarea
                rows={4}
                required
                value={ticketForm.message}
                onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                placeholder="اشرح المشكلة بالتفصيل لمساعدتك في أسرع وقت..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>إرسال التذكرة إلى مسؤول الوساطة</span>
            </button>
          </form>
        </div>
      </section>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
};

export default SupportEscrowPage;

