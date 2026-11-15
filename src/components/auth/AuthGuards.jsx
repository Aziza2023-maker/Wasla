import React, { useState, useEffect } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  ArrowRight,
  KeyRound,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  Briefcase
} from 'lucide-react';

export const ClientAuthGuard = ({ children }) => {
  const {
    currentRole,
    setCurrentRole,
    isAuthenticated,
    setIsAuthenticated,
    navigateTo,
    addToast,
    login,
    clientUser
  } = useWasla();

  // 1. Direct pass-through if role is client
  if (currentRole === 'client' || (isAuthenticated && currentRole === 'client')) {
    return children;
  }

  // 2. Fallback check from localStorage session to eliminate any microtask/render race condition
  try {
    const raw = localStorage.getItem('wasla_auth_session');
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.isAuthenticated && data.role === 'client') {
        if (currentRole !== 'client') {
          setCurrentRole('client');
        }
        return children;
      }
    }
  } catch (e) {
    // ignore json parse error
  }

  // 3. User is authenticated under another role (e.g. Freelancer or Admin)
  if (isAuthenticated && currentRole !== 'client') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-right font-sans" dir="rtl">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl text-center space-y-6">
          <div className="flex justify-center">
            <WaslaLogo variant="dark" size="md" subTitle="WASLA.YE" />
          </div>

          <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <UserCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold">
              <span>الحساب النشط حالياً: {currentRole === 'freelancer' ? 'طالب مستقل' : 'مسؤول إداري'}</span>
            </div>
            <h2 className="text-xl font-black text-[#0B192C]">
              التبديل إلى لوحة تحكم العميل
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              لوحة العميل مخصصة لطرح المشاريع وإدارة عقود Escrow مع الطلاب. يمكنك التبديل الفوري بنقرة واحدة أو العودة للوحتك النشطة.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                login('client');
                addToast('تم تفعيل وضع العميل', 'مرحباً شهاب صالح. تم فتح لوحة تحكم العميل بنجاح.');
                navigateTo('client-dashboard', 'client');
              }}
              className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>التبديل الفوري إلى حساب العميل (شهاب صالح)</span>
            </button>

            <button
              onClick={() => navigateTo(currentRole === 'freelancer' ? 'freelancer-overview' : 'admin-panel')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-5 rounded-xl transition-all border border-slate-200"
            >
              العودة إلى لوحة تحكمك ({currentRole === 'freelancer' ? 'المستقل الأكاديمي' : 'الإدارة'})
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
  }

  // 4. User is unauthenticated (guest visitor)
  const handleInstantClientLogin = () => {
    login('client');
    addToast('تم تسجيل الدخول بنجاح!', 'مرحباً شهاب صالح (شركة مدار للحلول التقنية). تم فتح لوحة تحكم العميل.');
    navigateTo('client-dashboard', 'client');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-right font-sans" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <WaslaLogo variant="dark" size="md" subTitle="بوابة أصحاب الأعمال والمشاريع" />
        </div>

        <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
          <Briefcase className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-[#0B192C]">
            تسجيل الدخول مطلوب للوصول للوحة العميل
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            يرجى تسجيل الدخول أو إنشاء حساب صاحب عمل لمتابعة نشر المشاريع وإدارة عقود الوساطة والضمان المالي (Escrow).
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => navigateTo('login')}
            className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>تسجيل الدخول كعميل</span>
          </button>

          <button
            onClick={handleInstantClientLogin}
            className="w-full bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs py-2.5 px-5 rounded-xl transition-all border border-teal-200 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>دخول سريع بحساب تجريبي (شهاب صالح)</span>
          </button>

          <button
            onClick={() => navigateTo('register')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-5 rounded-xl transition-all border border-slate-200"
          >
            إنشاء حساب عميل جديد
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
  const {
    currentRole,
    setCurrentRole,
    isAuthenticated,
    setIsAuthenticated,
    navigateTo,
    addToast,
    login,
    freelancerUser
  } = useWasla();

  // 1. Direct pass-through if role is freelancer
  if (currentRole === 'freelancer' || (isAuthenticated && currentRole === 'freelancer')) {
    return children;
  }

  // 2. Fallback check from localStorage session
  try {
    const raw = localStorage.getItem('wasla_auth_session');
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.isAuthenticated && data.role === 'freelancer') {
        if (currentRole !== 'freelancer') {
          setCurrentRole('freelancer');
        }
        return children;
      }
    }
  } catch (e) {
    // ignore
  }

  // 3. User is authenticated under another role (e.g. Client or Admin)
  if (isAuthenticated && currentRole !== 'freelancer') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-right font-sans" dir="rtl">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl text-center space-y-6">
          <div className="flex justify-center">
            <WaslaLogo variant="dark" size="md" subTitle="WASLA.YE" />
          </div>

          <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <GraduationCap className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <span>الحساب النشط حالياً: {currentRole === 'client' ? 'صاحب عمل' : 'مسؤول إداري'}</span>
            </div>
            <h2 className="text-xl font-black text-[#0B192C]">
              التبديل إلى لوحة الطالب المستقل
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              لوحة المستقل مخصصة للطلاب والخريجين لإدارة العروض وسوق العمل والتحقق الأكاديمي وسحب الأرباح. يمكنك التبديل الفوري بنقرة واحدة.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                login('freelancer');
                addToast('تم تفعيل وضع المستقل', 'مرحباً م. أروى الحمادي. تم فتح لوحة تحكم الطالب المستقل بنجاح.');
                navigateTo('freelancer-overview', 'freelancer');
              }}
              className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>التبديل الفوري إلى حساب الطالب (م. أروى الحمادي)</span>
            </button>

            <button
              onClick={() => navigateTo(currentRole === 'client' ? 'client-dashboard' : 'admin-panel')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-5 rounded-xl transition-all border border-slate-200"
            >
              العودة إلى لوحة تحكمك ({currentRole === 'client' ? 'العميل' : 'الإدارة'})
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
  }

  // 4. User is unauthenticated (guest visitor)
  const handleInstantFreelancerLogin = () => {
    login('freelancer');
    addToast('تم تسجيل الدخول بنجاح!', 'مرحباً م. أروى الحمادي (جامعة حضرموت). تم فتح لوحة تحكم الطالب المستقل.');
    navigateTo('freelancer-overview', 'freelancer');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-right font-sans" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <WaslaLogo variant="dark" size="md" subTitle="بوابة العمل الحر الأكاديمي" />
        </div>

        <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
          <GraduationCap className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-[#0B192C]">
            تسجيل الدخول مطلوب للوصول للوحة المستقل
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            يرجى تسجيل الدخول بحسابك الأكاديمي أو إنشاء حساب طالب للوصول إلى سوق العمل والعروض ورفع مشاريع المعرض المعتمدة.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => navigateTo('login')}
            className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>تسجيل الدخول بالبريد الأكاديمي</span>
          </button>

          <button
            onClick={handleInstantFreelancerLogin}
            className="w-full bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs py-2.5 px-5 rounded-xl transition-all border border-teal-200 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>دخول سريع كطالب مستقل (م. أروى الحمادي)</span>
          </button>

          <button
            onClick={() => navigateTo('register')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-5 rounded-xl transition-all border border-slate-200"
          >
            إنشاء حساب طالب مستقل جديد
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
  const {
    currentRole,
    setCurrentRole,
    isAuthenticated,
    navigateTo,
    addToast,
    login
  } = useWasla();

  const [pinCode, setPinCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Direct pass-through if role is admin
  if (currentRole === 'admin' || (isAuthenticated && currentRole === 'admin')) {
    return children;
  }

  // 2. Fallback check from localStorage session
  try {
    const raw = localStorage.getItem('wasla_auth_session');
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.isAuthenticated && data.role === 'admin') {
        if (currentRole !== 'admin') {
          setCurrentRole('admin');
        }
        return children;
      }
    }
  } catch (e) {
    // ignore
  }

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (pinCode === 'admin2025' || pinCode === '2025' || pinCode === 'admin') {
      login('admin');
      addToast('تمت المصادقة الإدارية بنجاح!', 'مرحباً بالمسؤول المالي والأكاديمي. تم فتح بوابة الرقابة وتدقيق Escrow.');
      setErrorMsg('');
      navigateTo('admin-panel', 'admin');
    } else {
      setErrorMsg('رمز المرور الإداري غير صحيح. جرب "admin2025"');
    }
  };

  const handleMasterPass = () => {
    login('admin');
    addToast('تم فتح بوابة الإدارة المركزية!', 'تم تفعيل صلاحية المسؤول المالي والوساطة Escrow.');
    navigateTo('admin-panel', 'admin');
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>بوابة المشرفين والوساطة المالية</span>
          </div>
          <h2 className="text-xl font-black text-white">
            المصادقة الإدارية المركزية
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            يتطلب الدخول إلى هذا المسار صلاحية المشرف المالي للتحقق من حوالات العمقي والكريمي وبن دول والبسيري وتدقيق البطاقات الجامعية للطلاب بالمكلا وحضرموت.
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
