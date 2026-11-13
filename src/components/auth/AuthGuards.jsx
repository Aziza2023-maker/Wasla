import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import { ShieldCheck, Lock, UserCheck, ArrowRight, KeyRound, AlertTriangle } from 'lucide-react';

export const ClientAuthGuard = ({ children }) => {
  const { currentRole, setCurrentRole, navigateTo, addToast } = useWasla();

  if (currentRole === 'client') {
    return children;
  }

  const handleInstantClientLogin = () => {
    setCurrentRole('client');
    addToast('تم تسجيل الدخول بنجاح!', 'مرحباً شهاب صالح (شركة مدار للحلول التقنية). تم فتح لوحة تحكم العميل.');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-right font-sans" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <WaslaLogo variant="dark" size="md" subTitle="WASLA.YE" />
        </div>

        <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
          <UserCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-[#0B192C]">
            لوحة تحكم العميل محمية بنظام الصلاحيات (RBAC)
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            هذه المنطقة مخصصة لأصحاب الأعمال والشركات الراغبين في نشر المشاريع، إيداع مبالغ الضمان المالي (Escrow) عبر الكريمي والنجم، وإدارة العقود مع الطلاب المستقلين.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleInstantClientLogin}
            className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>تسجيل الدخول كعميل (شهاب صالح)</span>
          </button>

          <button
            onClick={() => navigateTo('login')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-5 rounded-xl transition-all border border-slate-200"
          >
            تسجيل الدخول بحساب آخر
          </button>

          <button
            onClick={() => navigateTo('landing')}
            className="text-xs text-slate-400 hover:text-slate-600 block mx-auto pt-1 font-semibold"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

export const FreelancerAuthGuard = ({ children }) => {
  const { currentRole, setCurrentRole, navigateTo, addToast } = useWasla();

  if (currentRole === 'freelancer') {
    return children;
  }

  const handleInstantFreelancerLogin = () => {
    setCurrentRole('freelancer');
    addToast('تم تسجيل الدخول بنجاح!', 'مرحباً م. أروى الحمادي (جامعة صنعاء). تم فتح لوحة تحكم الطالب المستقل.');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-right font-sans" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <WaslaLogo variant="dark" size="md" subTitle="بوابة العمل الحر الأكاديمي" />
        </div>

        <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-[#0B192C]">
            لوحة تحكم المستقل محمية بنظام الصلاحيات (RBAC)
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            هذه المنطقة مخصصة لطلاب وخريجي الجامعات اليمنية لإدارة العروض وسوق العمل، وتفعيل بروتوكول الهامش الزمني للطوارئ، وسحب الأرباح المحررة إلى حساب الكريمي.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleInstantFreelancerLogin}
            className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>تسجيل الدخول كطالب مستقل (م. أروى الحمادي)</span>
          </button>

          <button
            onClick={() => navigateTo('login')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-5 rounded-xl transition-all border border-slate-200"
          >
            تسجيل الدخول بالبريد الأكاديمي
          </button>

          <button
            onClick={() => navigateTo('landing')}
            className="text-xs text-slate-400 hover:text-slate-600 block mx-auto pt-1 font-semibold"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

export const AdminAuthGuard = ({ children }) => {
  const { currentRole, setCurrentRole, navigateTo, addToast } = useWasla();
  const [pinCode, setPinCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (currentRole === 'admin') {
    return children;
  }

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (pinCode === 'admin2025' || pinCode === '2025' || pinCode === 'admin') {
      setCurrentRole('admin');
      addToast('تمت المصادقة الإدارية بنجاح!', 'مرحباً بالمسؤول المالي والأكاديمي. تم فتح بوابة الرقابة وتدقيق Escrow.');
      setErrorMsg('');
    } else {
      setErrorMsg('رمز المرور الإداري غير صحيح. جرب "admin2025"');
    }
  };

  const handleMasterPass = () => {
    setCurrentRole('admin');
    addToast('تم فتح بوابة الإدارة المركزية!', 'تم تفعيل صلاحية المسؤول المالي والوساطة Escrow.');
  };

  return (
    <div className="min-h-screen bg-[#081220] flex flex-col items-center justify-center p-6 text-right font-sans" dir="rtl">
      <div className="max-w-md w-full bg-[#0B192C] text-white rounded-3xl p-8 border border-slate-700 shadow-2xl text-center space-y-6">
        <div className="flex justify-center">
          <WaslaLogo variant="inverted" size="md" subTitle="الإدارة المركزية والوساطة Escrow" />
        </div>

        <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center text-purple-400">
          <KeyRound className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>مسار محمي ومقيد للمسؤولين فقط</span>
          </div>
          <h2 className="text-xl font-black text-white">
            بوابة الإدارة والرقابة المالية المركزية
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            يتطلب الدخول إلى هذا المسار صلاحية المشرف المالي للتحقق من حوالات الكريمي والنجم وتدقيق البطاقات الجامعية للطلاب.
          </p>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAdminAuth} className="space-y-3">
          <input
            type="password"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            placeholder="أدخل رمز المرور الإداري (مثال: admin2025)"
            className="w-full bg-[#15253C] border border-slate-600 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-teal-400 text-center tracking-widest font-mono"
          />

          <button
            type="submit"
            className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>التحقق والدخول إلى البوابة</span>
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 space-y-2">
          <button
            onClick={handleMasterPass}
            className="text-xs text-teal-400 hover:text-teal-300 font-bold block mx-auto"
          >
            ⚡ دخول سريع للمسؤول (وضع المعاينة والإنتاج)
          </button>

          <button
            onClick={() => navigateTo('landing')}
            className="text-xs text-slate-500 hover:text-slate-400 block mx-auto font-semibold"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

