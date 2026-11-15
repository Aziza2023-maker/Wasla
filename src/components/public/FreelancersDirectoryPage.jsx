import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import {
  Search,
  Building,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Star,
  Zap,
  PhoneCall,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const FreelancersDirectoryPage = () => {
  const { peerStudents, freelancerUser, universitiesList, navigateTo, addToast } = useWasla();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniv, setSelectedUniv] = useState('all');

  // Combined verified students list
  const allStudents = [
    {
      id: freelancerUser.id,
      name: freelancerUser.name,
      university: freelancerUser.university,
      faculty: freelancerUser.faculty,
      academicLevel: freelancerUser.academicLevel,
      skills: 'تطوير الويب الكامل، React، Next.js، تطبيقات Flutter، قواعد البيانات',
      rating: 4.98,
      completedCount: freelancerUser.completedProjects,
      startingPrice: '148,500 ر.ي ($280)',
      avatar: freelancerUser.avatar,
      isTopRated: true,
      solarBackup: true,
      netBackup: 'ألياف + 4G',
    },
    ...peerStudents.map((p) => ({
      ...p,
      faculty: 'كلية الهندسة والحاسوب',
      academicLevel: 'سنة رابعة - خريج معتمد',
      isTopRated: p.rating >= 4.9,
      solarBackup: true,
      netBackup: '4G بديل',
    })),
  ];

  const filteredStudents = allStudents.filter((student) => {
    const matchesUniv =
      selectedUniv === 'all' || student.university.includes(selectedUniv);
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.university.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesUniv && matchesSearch;
  });

  const handleHireStudent = (student) => {
    addToast(
      'طلب توظيف عبر وساطة وصلة',
      `جاري تجهيز عقد توظيف مباشر مع ${student.name}. سيتم توجيهك إلى لوحة العميل لتحديد المهام وإيداع الضمان المالي.`,
      'success',
      5000
    );
    navigateTo('client-dashboard');
  };

  const handleViewProfile = (student) => {
    if (student.id === freelancerUser.id) {
      navigateTo('freelancer-overview');
    } else {
      navigateTo('student-alt');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-right" dir="rtl">
      {/* 1. Header */}
      <Navbar variant="light" />

      {/* 2. Hero */}
      <section className="bg-[#0B192C] text-white py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>دليل الكفاءات الأكاديمية والطلاب المعتمدين</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black mb-3 leading-tight">
              نخبة طلاب الجامعات اليمنية المستقلين الموثقين رسمياً
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
              كل طالب ومستقل يحمل بطاقة جامعية معتمدة من كليات ومعاهد المكلا وحضرموت، جاهزية طاقة بديلة وشبكة إنترنت مستقرة، وضمان مالي محلي محمي 100% عبر شبكات الصرافة المعتمدة (العمقي، الكريمي، بن دول، والبسيري).
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-2xl bg-white rounded-2xl p-2 shadow-xl border border-slate-200 flex items-center gap-2">
            <div className="pr-3 pl-1 text-slate-400">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الطالب، المهارة (تصميم، برمجة، ترجمة)، أو الجامعة..."
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

      {/* 3. Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
            <Building className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-bold text-slate-700 whitespace-nowrap">الجامعة:</span>
            <select
              value={selectedUniv}
              onChange={(e) => setSelectedUniv(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium outline-none focus:border-teal-500 w-full sm:w-64"
            >
              <option value="all">كافة الجامعات اليمنية</option>
              {universitiesList.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name} ({u.city})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>جميع الطلاب موثقون أكاديمياً</span>
            </span>
            <span>عرض {filteredStudents.length} مستقل</span>
          </div>
        </div>

        {/* Students Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Profile Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500 shadow-xs"
                      />
                      <span className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-black text-sm text-[#0B192C]">
                          {student.name}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="text-xs text-teal-800 font-bold block mt-0.5">
                        {student.university}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {student.academicLevel}
                      </span>
                    </div>
                  </div>

                  {student.isTopRated && (
                    <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-200/80 flex items-center gap-1 shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      <span>ممتاز</span>
                    </span>
                  )}
                </div>

                {/* Rating and Completed Projects stats */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">التقييم</span>
                    <span className="text-xs font-black text-[#0B192C] flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      {student.rating}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">المشاريع</span>
                    <span className="text-xs font-black text-[#0B192C]">
                      {student.completedCount} منجز
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">التسليم</span>
                    <span className="text-xs font-black text-teal-700">98% في الموعد</span>
                  </div>
                </div>

                {/* Skills Text */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">المهارات والتخصص:</span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {student.skills}
                  </p>
                </div>

                {/* Infrastructure readiness */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>طاقة شمسية + خط {student.netBackup}</span>
                  </span>
                  <span className="text-slate-400">جاهز للعمل</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => handleHireStudent(student)}
                  className="flex-1 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>طلب توظيف</span>
                </button>
                <button
                  onClick={() => handleViewProfile(student)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>معرض الأعمال</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
};

export default FreelancersDirectoryPage;

