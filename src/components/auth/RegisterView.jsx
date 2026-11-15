import React, { useState, useEffect } from 'react';
import { useWasla } from '../../context/WaslaContext';
import WaslaLogo from '../common/WaslaLogo';
import {
  User,
  Mail,
  Lock,
  ArrowLeft,
  ShieldCheck,
  Zap,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Building,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  FileText,
  Link,
  Code2,
  Compass,
  Check
} from 'lucide-react';

export const RegisterView = () => {
  const {
    navigateTo,
    addToast,
    universitiesList,
    setFreelancerUser,
    setClientUser,
    openModal,
    selectedRoleSignup,
    setSelectedRoleSignup,
    register,
    isAuthenticated,
    currentRole
  } = useWasla();

  // Role Selection State: dynamically initialized from selectedRoleSignup ('freelancer' or 'client')
  const [accountType, setAccountType] = useState(selectedRoleSignup || 'freelancer');

  useEffect(() => {
    if (selectedRoleSignup) {
      setAccountType(selectedRoleSignup);
    }
  }, [selectedRoleSignup]);

  // Common Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Freelancer / Student Dynamic Fields
  const [university, setUniversity] = useState('جامعة حضرموت');
  const [faculty, setFaculty] = useState('كلية الحاسوب وتكنولوجيا المعلومات (فلك)');
  const [technicalCategory, setTechnicalCategory] = useState('برمجة وتطوير البرمجيات');
  const [skills, setSkills] = useState('');
  const [bio, setBio] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [academicLevel, setAcademicLevel] = useState('السنة الرابعة (دفعة 2025)');

  // Client Dynamic Fields
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [clientType, setClientType] = useState('شركة أو مؤسسة تجارية');
  const [projectDescription, setProjectDescription] = useState('');

  // Validation Errors State
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errs = {};

    // Full name validation
    if (!fullName.trim()) {
      errs.fullName = 'يرجى إدخال الاسم الثلاثي الكامل';
    } else if (fullName.trim().split(' ').length < 2) {
      errs.fullName = 'يرجى كتابة الاسم ثنائياً أو ثلاثياً على الأقل';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'يرجى إدخال البريد الإلكتروني';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'يرجى إدخال عنوان بريد إلكتروني صالح';
    }

    // Password validation
    if (!password) {
      errs.password = 'يرجى إدخال كلمة المرور';
    } else if (password.length < 8) {
      errs.password = 'كلمة المرور يجب ألا تقل عن 8 أحرف وأرقام';
    }

    // Freelancer specific validations
    if (accountType === 'freelancer') {
      if (!faculty.trim()) {
        errs.faculty = 'يرجى تحديد الكلية والتخصص الجامعي';
      }
      if (!skills.trim()) {
        errs.skills = 'يرجى كتابة أهم المهارات والتقنيات التي تتقنها (مثال: React, Figma, Python)';
      }
      if (!bio.trim() || bio.trim().length < 15) {
        errs.bio = 'يرجى كتابة نبذة مهنية مختصرة لا تقل عن 15 حرفاً تعرّف بها عن خبراتك';
      }
    }

    // Client specific validations
    if (accountType === 'client') {
      if (!phone.trim()) {
        errs.phone = 'يرجى إدخال رقم الهاتف أو الواتساب للتنسيق المالي (العمقي/الكريمي/بن دول/البسيري)';
      } else if (!/^[0-9+\s-]{7,15}$/.test(phone.trim())) {
        errs.phone = 'يرجى إدخال رقم هاتف صالح (مثال: 773892104)';
      }
      if (!companyName.trim()) {
        errs.companyName = 'يرجى إدخال اسم الشركة أو المؤسسة أو الاسم التجاري';
      }
    }

    // Terms validation
    if (!agreeTerms) {
      errs.agreeTerms = 'يجب الموافقة على شروط الخدمة وسياسة الوساطة المالية للمتابعة';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast(
        'بيانات غير مكتملة',
        'يرجى مراجعة الحقول المحددة باللون الأحمر وإكمال البيانات المطلوبة بدقة.',
        'warning',
        4000
      );
      return;
    }

    if (accountType === 'client') {
      // Create Client Profile with Dynamic Fields
      const clientData = {
        name: fullName.trim(),
        company: companyName.trim() || 'شركة مستقلة',
        title: `${clientType} • عميل موثق`,
        projectDescription: projectDescription.trim(),
        phone: phone.trim(),
      };

      setClientUser((prev) => ({
        ...prev,
        ...clientData,
      }));

      // Synchronize authenticated global state and persist session
      register('client', clientData);

      addToast(
        'تم إنشاء حساب العميل بنجاح!',
        `مرحباً بك يا ${fullName}. تم حفظ بيانات شركتك وجهزنا لك لوحة العميل لطرح المشاريع وتصفح المستقلين.`,
        'success',
        5000
      );

      // Smart Redirect strictly to Client Dashboard
      navigateTo('client-dashboard', 'client');
    } else {
      // Create Freelancer / Student Profile with Dynamic Fields
      const freelancerData = {
        name: fullName.trim(),
        university: university,
        faculty: faculty.trim(),
        title: `${technicalCategory} • ${university}`,
        shortTitle: technicalCategory,
        academicLevel: academicLevel,
        skillsSummary: skills.trim(),
        bio: bio.trim(),
        portfolioUrl: portfolioLink.trim(),
        isVerified: false, // Pending academic verification
      };

      setFreelancerUser((prev) => ({
        ...prev,
        ...freelancerData,
      }));

      // Synchronize authenticated global state and persist session
      register('freelancer', freelancerData);

      addToast(
        'تم إنشاء حساب المستقل الأكاديمي بنجاح!',
        `مرحباً بك يا ${fullName}. تم تسجيل مهاراتك وسجل تخصصك، والآن يرجى رفع بطاقتك الجامعية لنيل شارة التوثيق.`,
        'success',
        6000
      );

      // Smart Redirect strictly to Freelancer Dashboard & Open Verification Modal
      navigateTo('freelancer-overview', 'freelancer');
      setTimeout(() => {
        openModal('academic-verify');
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans" dir="rtl">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <WaslaLogo
            variant="dark"
            size="md"
            subTitle="منصة الكفاءات والفرص الجامعية"
            onClick={() => navigateTo('landing')}
          />

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-500 font-medium">
            <button onClick={() => navigateTo('services')} className="hover:text-slate-900 transition-colors">
              تصفح الخدمات
            </button>
            <button onClick={() => navigateTo('freelancers')} className="hover:text-slate-900 transition-colors">
              المستقلون المعتمدون
            </button>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-900 transition-colors">
              الضمان والوساطة Escrow
            </button>
            <button onClick={() => navigateTo('community')} className="hover:text-slate-900 transition-colors">
              ملتقى الجامعات
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">لديك حساب مسجل بالفعل؟</span>
            <button
              onClick={() => navigateTo('login')}
              className="text-teal-600 hover:text-teal-700 font-bold text-xs border border-teal-200 bg-teal-50 px-3.5 py-1.5 rounded-lg transition-colors"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Screen */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              {/* Header Badge & Stepper Status */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 text-xs text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  <span>الخطوة 2: استكمال بيانات الحساب</span>
                </div>
                <button
                  onClick={() => navigateTo('role-selection')}
                  className="text-xs text-slate-400 hover:text-teal-600 font-bold flex items-center gap-1"
                >
                  <span>تغيير الدور</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] mb-1">
                إنشاء حساب في منصة وصلة
              </h2>
              <p className="text-xs text-slate-400 font-normal mb-6 leading-relaxed">
                املأ بياناتك بدقة لتخصيص لوحة التحكم والوصول لخدمات الوساطة المالية المحلية وحسابات الضمان.
              </p>

              {/* 1. DYNAMIC ROLE TOGGLE SELECTOR */}
              <div className="mb-6 space-y-2">
                <label className="block text-xs font-black text-[#0B192C]">
                  نوع الحساب المحدد <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option A: Freelancer / Student */}
                  <div
                    onClick={() => {
                      setAccountType('freelancer');
                      setSelectedRoleSignup('freelancer');
                      setErrors({});
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 text-right ${
                      accountType === 'freelancer'
                        ? 'border-teal-500 bg-teal-50/60 shadow-xs ring-2 ring-teal-500/10'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        accountType === 'freelancer'
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-xs text-[#0B192C]">
                          أنا مستقل / طالب
                        </span>
                        {accountType === 'freelancer' && (
                          <span className="w-2 h-2 rounded-full bg-teal-500" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">
                        أقدم خدماتي، وأستفيد من الهامش الزمني للأرباح
                      </span>
                    </div>
                  </div>

                  {/* Option B: Client */}
                  <div
                    onClick={() => {
                      setAccountType('client');
                      setSelectedRoleSignup('client');
                      setErrors({});
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 text-right ${
                      accountType === 'client'
                        ? 'border-emerald-500 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-500/10'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        accountType === 'client'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-xs text-[#0B192C]">
                          أنا عميل (صاحب عمل)
                        </span>
                        {accountType === 'client' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-normal block leading-tight mt-0.5">
                        أطرح مشاريع وأوظف كفاءات بضمان Escrow
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-[#0B192C] mb-1">
                    الاسم الكامل (الثلاثي) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: null });
                      }}
                      placeholder={accountType === 'freelancer' ? 'مثال: أروى منصور أحمد الحمادي' : 'مثال: شهاب صالح قائد'}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all font-medium pl-10 ${
                        errors.fullName
                          ? 'border-rose-400 focus:border-rose-500 bg-rose-50/30'
                          : 'border-slate-200 focus:border-teal-500 focus:bg-white'
                      }`}
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  {errors.fullName && (
                    <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#0B192C]">
                      البريد الإلكتروني <span className="text-rose-500">*</span>
                    </label>
                    {accountType === 'freelancer' && (
                      <span className="text-[10px] text-teal-700 font-semibold">
                        يفضل البريد الأكاديمي (.edu.ye)
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      placeholder={accountType === 'freelancer' ? 'student@su.edu.ye' : 'client@company.ye'}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all font-medium pl-10 ${
                        errors.email
                          ? 'border-rose-400 focus:border-rose-500 bg-rose-50/30'
                          : 'border-slate-200 focus:border-teal-500 focus:bg-white'
                      }`}
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  {errors.email && (
                    <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#0B192C]">
                      كلمة المرور <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-normal">8 أحرف كحد أدنى</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: null });
                      }}
                      placeholder="••••••••"
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all font-medium pl-10 ${
                        errors.password
                          ? 'border-rose-400 focus:border-rose-500 bg-rose-50/30'
                          : 'border-slate-200 focus:border-teal-500 focus:bg-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* ========================================================================= */}
                {/* 2. DYNAMIC REGISTRATION FIELDS (FREELANCER VS CLIENT)                      */}
                {/* ========================================================================= */}

                {accountType === 'freelancer' ? (
                  /* FREELANCER SPECIFIC FIELDS */
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-teal-800 font-bold text-xs">
                      <Code2 className="w-4 h-4 text-teal-600" />
                      <span>بيانات المسار الأكاديمي والمهارات التقنية:</span>
                    </div>

                    {/* University & Technical Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#0B192C] mb-1">
                          الجامعة أو الكلية التقنية (المكلا وحضرموت) <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium outline-none focus:border-teal-500"
                        >
                          {universitiesList.map((u) => (
                            <option key={u.id} value={u.name}>
                              {u.name} ({u.city})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0B192C] mb-1">
                          التصنيف التقني الرئيسي <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={technicalCategory}
                          onChange={(e) => setTechnicalCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium outline-none focus:border-teal-500"
                        >
                          <option value="برمجة وتطوير البرمجيات">برمجة وتطوير البرمجيات (Web/Mobile)</option>
                          <option value="تصميم واجهات وتجربة المستخدم">تصميم واجهات UI/UX وجرافيك</option>
                          <option value="ترجمة وكتابة أبحاث أكاديمية">ترجمة وبحوث طبية وأكاديمية</option>
                          <option value="تحليل بيانات وذكاء اصطناعي">تحليل بيانات ونماذج AI</option>
                          <option value="إدارة شبكات وحلول سحابية">شبكات، أمن معلومات وسيرفرات</option>
                        </select>
                      </div>
                    </div>

                    {/* Faculty and Academic Level */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#0B192C] mb-1">
                          الكلية والتخصص الأكاديمي <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={faculty}
                          onChange={(e) => {
                            setFaculty(e.target.value);
                            if (errors.faculty) setErrors({ ...errors, faculty: null });
                          }}
                          placeholder="مثال: كلية الحاسوب - هندسة برمجيات"
                          className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs text-slate-800 font-medium outline-none ${
                            errors.faculty ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-teal-500'
                          }`}
                        />
                        {errors.faculty && (
                          <span className="text-[11px] font-bold text-rose-500 block mt-1">
                            {errors.faculty}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0B192C] mb-1">
                          المستوى الدراسي
                        </label>
                        <select
                          value={academicLevel}
                          onChange={(e) => setAcademicLevel(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium outline-none focus:border-teal-500"
                        >
                          <option value="السنة الثانية">السنة الثانية</option>
                          <option value="السنة الثالثة">السنة الثالثة</option>
                          <option value="السنة الرابعة (دفعة 2025)">السنة الرابعة (مشروع تخرج / دفعة 2025)</option>
                          <option value="خريج جامعي معتمد">خريج جامعي معتمد (حديث التخرج)</option>
                        </select>
                      </div>
                    </div>

                    {/* Skills Field */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B192C] mb-1">
                        المهارات التقنية واللغات البرمجية <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={skills}
                        onChange={(e) => {
                          setSkills(e.target.value);
                          if (errors.skills) setErrors({ ...errors, skills: null });
                        }}
                        placeholder="مثال: React, Tailwind, Next.js, Node.js, Git, Supabase"
                        className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs text-slate-800 font-medium outline-none ${
                          errors.skills ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-teal-500'
                        }`}
                      />
                      {errors.skills && (
                        <span className="text-[11px] font-bold text-rose-500 block mt-1">
                          {errors.skills}
                        </span>
                      )}
                    </div>

                    {/* Professional Bio Field */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B192C] mb-1">
                        النبذة المهنية وخلاصة الخبرات <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={bio}
                        onChange={(e) => {
                          setBio(e.target.value);
                          if (errors.bio) setErrors({ ...errors, bio: null });
                        }}
                        placeholder="اكتب نبذة موجزة عن خبراتك الأكاديمية وأسلوبك في العمل البرمجي مع العملاء..."
                        className={`w-full bg-slate-50 border rounded-xl p-2.5 text-xs text-slate-800 font-medium outline-none leading-relaxed ${
                          errors.bio ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-teal-500'
                        }`}
                      />
                      {errors.bio && (
                        <span className="text-[11px] font-bold text-rose-500 block mt-1">
                          {errors.bio}
                        </span>
                      )}
                    </div>

                    {/* Portfolio / Work Link */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B192C] mb-1">
                        رابط معرض الأعمال أو GitHub (اختياري)
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          value={portfolioLink}
                          onChange={(e) => setPortfolioLink(e.target.value)}
                          placeholder="https://github.com/username أو رابط موقعك"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium outline-none focus:border-teal-500 pl-8"
                        />
                        <Link className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* CLIENT SPECIFIC FIELDS */
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                      <Briefcase className="w-4 h-4 text-emerald-600" />
                      <span>بيانات الشركة والمشاريع والتنسيق المالي:</span>
                    </div>

                    {/* Company / Organization Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B192C] mb-1">
                        اسم الشركة / المؤسسة / الاسم التجاري <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                            if (errors.companyName) setErrors({ ...errors, companyName: null });
                          }}
                          placeholder="مثال: شركة مدار للحلول التقنية أو متجر الأفق"
                          className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs text-slate-800 font-medium outline-none pl-8 ${
                            errors.companyName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-teal-500'
                          }`}
                        />
                        <Building className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                      </div>
                      {errors.companyName && (
                        <span className="text-[11px] font-bold text-rose-500 block mt-1">
                          {errors.companyName}
                        </span>
                      )}
                    </div>

                    {/* Phone for local remittance coordination */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#0B192C] mb-1">
                          رقم الهاتف / الواتساب للتنسيق <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (errors.phone) setErrors({ ...errors, phone: null });
                            }}
                            placeholder="مثال: 773892104"
                            className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs text-slate-800 outline-none font-medium pl-8 ${
                              errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-teal-500'
                            }`}
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                        {errors.phone && (
                          <span className="text-[11px] font-bold text-rose-500 block mt-1">
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0B192C] mb-1">
                          طبيعة النشاط التجاري
                        </label>
                        <select
                          value={clientType}
                          onChange={(e) => setClientType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium outline-none focus:border-teal-500"
                        >
                          <option value="شركة أو مؤسسة تجارية">شركة أو مؤسسة تجارية</option>
                          <option value="صاحب مشروع ناشئ">صاحب مشروع ناشئ / ريادي</option>
                          <option value="تاجر / متجر محلي">تاجر / متجر محلي</option>
                          <option value="عميل فردي مباشر">عميل فردي مباشر</option>
                        </select>
                      </div>
                    </div>

                    {/* Project Overview / Needs Description */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B192C] mb-1">
                        وصف المشروع أو الخدمات المطلوبة عادة (اختياري)
                      </label>
                      <textarea
                        rows={2}
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="مثال: نبحث عن طلاب ومستقلين لتطوير مواقع وتطبيقات جوال وتصاميم تسويقية بصفة دورية..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* Terms agreement */}
                <div className="pt-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (errors.agreeTerms) setErrors({ ...errors, agreeTerms: null });
                      }}
                      className="w-4 h-4 mt-0.5 accent-teal-600 rounded border-slate-300"
                    />
                    <label htmlFor="terms" className="text-[11px] text-slate-600 font-normal leading-relaxed cursor-pointer">
                      أوافق على <span className="font-bold text-teal-700 underline">شروط الخدمة</span> و{' '}
                      <span className="font-bold text-teal-700 underline">اتفاقية الوساطة المالية Escrow</span> وسياسة حماية الهامش الزمني.
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <span className="text-[11px] font-bold text-rose-500 block mt-1">
                      {errors.agreeTerms}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <span>
                    {accountType === 'freelancer'
                      ? 'إتمام التسجيل والانتقال للوحة المستقل وسوق العمل'
                      : 'إتمام التسجيل والدخول للوحة العميل ونشر المشاريع'}
                  </span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Bottom link */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              <span>لديك حساب مسجل بالفعل؟ </span>
              <button
                onClick={() => navigateTo('login')}
                className="text-teal-600 font-bold hover:underline"
              >
                تسجيل الدخول
              </button>
            </div>
          </div>

          {/* Right Dark Navy Panel */}
          <div className="lg:col-span-5 bg-[#0B192C] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-teal-300 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>مجتمع أكاديمي ومهني موثوق</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-black leading-snug mb-3">
                جسرِك المتين نحو
                <br />
                <span className="text-teal-400">مستقبل مهني واعد</span>
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed font-normal mb-8">
                انضم إلى آلاف الطلاب والمستقلين، وأصحاب المشاريع والجامعات في بيئة تفاعلية آمنة تجمع بين التميز الأكاديمي والوساطة المالية المضمونة محلياً.
              </p>

              {/* 2 Feature Cards */}
              <div className="space-y-3 mb-8">
                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl text-right flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white mb-0.5">توثيق أكاديمي وحسابات مرخصة</h4>
                    <p className="text-[10px] text-slate-400 font-normal leading-relaxed">
                      ربط مباشر مع بطاقات كليات الجامعات اليمنية وحماية متبادلة لحقوق الطرفين.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl text-right flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white mb-0.5">وساطة مالية Escrow وهامش طوارئ</h4>
                    <p className="text-[10px] text-slate-400 font-normal leading-relaxed">
                      حجز المبالغ عبر شبكات الصرافة المعتمدة (العمقي، الكريمي، بن دول، البسيري) وهامش طوارئ لحماية تقييم الطلاب.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="relative z-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600/30 border border-teal-500/50 flex items-center justify-center shrink-0 text-teal-300">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-200 font-medium italic mb-1">
                  "وفرت منصة وصلة لطلابنا فرص عمل تطبيقية موثوقة وأماناً مالياً متكاملاً قبل التخرج."
                </p>
                <span className="text-[10px] text-teal-400 font-bold block">
                  عمادة شؤون الطلاب - التعاون الأكاديمي
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منصة وصلة © 2026 جميع الحقوق محفوظة</span>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => navigateTo('support')} className="hover:text-slate-600">سياسة الخصوصية</button>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-600">شروط الاستخدام</button>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-600">الدعم الفني والوساطة</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterView;
