import React from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from './WaslaLogo';
import { ShieldCheck, Lock, Building, CheckCircle2, Heart } from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useWasla();

  return (
    <footer className="bg-[#0B192C] text-slate-300 border-t border-slate-800 font-sans selection:bg-teal-500" dir="rtl">
      {/* Upper Footer: Branding & Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Platform Description & Local Escrow Statement */}
          <div className="lg:col-span-2 space-y-4">
            <WaslaLogo
              variant="inverted"
              size="md"
              subTitle="بوابة العمل الحر الأكاديمي والوساطة المالية"
              onClick={() => navigateTo('landing')}
            />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              المنصة المتخصصة في ربط طلاب وخريجي الجامعات (محطة الإطلاق الأولى: جامعة حضرموت والمكلا) بأصحاب المتاجر والمشاريع والشركات، مع وساطة مالية محلية مشفرة (Escrow) عبر شبكات الصرافة والبنوك المعتمدة.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="bg-[#15253C] text-teal-300 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>ضمان العمقي والكريمي والنجم</span>
              </span>
              <span className="bg-[#15253C] text-slate-300 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>تشفير معاملات 256-bit</span>
              </span>
            </div>
          </div>

          {/* Col 3: Services & Opportunities */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              سوق العمل الأكاديمي
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  تصفح كافة الخدمات
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('freelancers')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  دليل الطلاب المستقلين
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('community')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ملتقى مشاريع التخرج
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  مهام البرمجة والـ UI/UX
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  البحوث والترجمة الطبية
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Escrow & Emergency Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              الضمان والسياسات
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('support')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  كيف يعمل نظام Escrow؟
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('support')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  بروتوكول الهامش الزمني للطوارئ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('support')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  فض النزاعات والتحكيم
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('support')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  مراكز الصرافة المعتمدة
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin-panel')}
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  بوابة التدقيق الإداري
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Partner Universities */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              الجامعات اليمنية الشريكة
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>جامعة صنعاء</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>جامعة عدن</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>جامعة تعز</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>جامعة حضرموت</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>جامعة العلوم والتكنولوجيا</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Local Payment Badges Bar */}
      <div className="border-t border-slate-800/80 bg-[#081322] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[11px] font-bold">بوابات الوساطة النقدية المعتمدة في اليمن:</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 font-bold text-[11px] border border-slate-700">
              بنك الكريمي للتمويل الأصغر (الكريمي إكسبرس / مميز)
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 font-bold text-[11px] border border-slate-700">
              شبكة النجم للحوالات
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 font-bold text-[11px] border border-slate-700">
              محفظة ون كاش (OneCash)
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 font-bold text-[11px] border border-slate-700">
              التحويل البنكي المباشر
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800/60 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 منصة وصلة (Wasla) — محطة الإطلاق الأولى: المكلا وجامعة حضرموت • لكافة الجامعات اليمنية.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('support')} className="hover:text-slate-300 transition-colors">
              سياسة الخصوصية
            </button>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-300 transition-colors">
              شروط الاستخدام
            </button>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-300 transition-colors">
              اتفاقية الوساطة المالية Escrow
            </button>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-300 transition-colors">
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

