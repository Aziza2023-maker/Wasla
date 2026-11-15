import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import ReadinessGuide from '../common/ReadinessGuide';
import {
  X,
  ShieldCheck,
  Building,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Zap,
  PhoneCall,
  Clock,
  FileText,
  Lock,
  Plus,
  Send,
  Eye,
  GraduationCap,
  Calendar,
  Check,
  Award,
  ChevronLeft,
  Sparkles
} from 'lucide-react';

export const GlobalModals = () => {
  const {
    activeModal,
    modalPayload,
    closeModal,
    publishProject,
    withdrawFunds,
    updateEmergencyBuffer,
    uploadRemittanceProof,
    addPortfolioProject,
    submitAcademicVerification,
    freelancerUser,
    clientContracts,
    universitiesList,
    navigateTo
  } = useWasla();

  // Create Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    budgetYER: '180000',
    escrowProvider: 'شركة العمقي للصرافة',
    category: 'برمجة وتطوير',
    durationDays: '15',
    bufferDays: '4',
    description: '',
    skills: 'React, Tailwind CSS, API',
  });

  // Academic Verification Form State
  const [verificationForm, setVerificationForm] = useState({
    university: 'جامعة حضرموت',
    faculty: 'كلية الحاسوب وتكنولوجيا المعلومات (فلك)',
    level: 'المستوى الرابع (دفعة 2025)',
    academicId: '2021-CS-1105',
    fileName: 'بطاقة_جامعية_محدثة.pdf',
  });

  // Withdrawal Modal State
  const [withdrawAmt, setWithdrawAmt] = useState(freelancerUser.balanceYER.toString());
  const [withdrawProvider, setWithdrawProvider] = useState('omgy');

  // Buffer Settings State
  const [bufferDaysInput, setBufferDaysInput] = useState(4);
  const [bufferActive, setBufferActive] = useState(freelancerUser.emergencyBufferStatus.enabled);

  // Upload Remittance Proof State
  const [remittanceProof, setRemittanceProof] = useState({
    provider: 'شركة العمقي للصرافة',
    providerType: 'omgy',
    amountYER: '350000',
    targetProject: clientContracts[0]?.studentRole || 'تطوير تطبيق ويب لإدارة العيادات بالمكلا',
    studentName: 'م. أروى الحمادي',
    notes: 'إيداع رسمي معتمد عبر حساب العمقي للصرافة - فرع المكلا برقم العملية #OM-982310.',
  });

  // Add Portfolio State
  const [portfolioData, setPortfolioData] = useState({
    title: '',
    category: 'تطوير الويب',
    categoryTag: 'مشروع تخرج ممتاز',
    headerBadge: 'جامعة حضرموت 2025',
    description: '',
    tags: 'React, Node.js, Tailwind',
    imageUrl: '',
  });

  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-sans text-right animate-in fade-in duration-200"
      dir="rtl"
    >
      {/* 1. Academic Verification Modal (Student ID & University Badge) */}
      {activeModal === 'academic-verify' && (
        <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={closeModal}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0B192C]">
                طلب التوثيق الأكاديمي المعتمد
              </h3>
              <span className="text-[11px] text-teal-800 font-bold">
                شارة "طالب موثق" وأولوية العروض 35%+
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-normal mb-6 leading-relaxed">
            ارفع بطاقتك الجامعية أو إفادة القيد المعتمدة لمطابقتها مع سجلات الكلية. تمنحك الشارة ثقة فورية لدى أصحاب المشاريع والشركات.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitAcademicVerification(verificationForm);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold text-slate-800 block mb-1">الجامعة أو الكلية التقنية (المكلا وحضرموت)</label>
              <select
                value={verificationForm.university}
                onChange={(e) => setVerificationForm({ ...verificationForm, university: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-bold"
              >
                {universitiesList.map((univ) => (
                  <option key={univ.id} value={univ.name}>
                    {univ.logo} {univ.name} ({univ.city})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">الكلية والتخصص</label>
                <input
                  type="text"
                  value={verificationForm.faculty}
                  onChange={(e) => setVerificationForm({ ...verificationForm, faculty: e.target.value })}
                  placeholder="كلية الحاسوب - هندسة برمجيات"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">الرقم الأكاديمي (القيد)</label>
                <input
                  type="text"
                  value={verificationForm.academicId}
                  onChange={(e) => setVerificationForm({ ...verificationForm, academicId: e.target.value })}
                  placeholder="2021-CS-1105"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-mono font-bold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">صورة البطاقة الجامعية / إفادة القيد</label>
              <div className="border border-dashed border-slate-300 rounded-2xl p-5 bg-slate-50/70 text-center">
                <Upload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <span className="font-bold text-slate-700 block text-xs">
                  اسحب صورة البطاقة أو اضغط للاختيار
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  يدعم صور JPG أو مستندات PDF (واضحة البيانات)
                </span>
                {verificationForm.fileName && (
                  <span className="inline-block mt-2 text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                    ✓ {verificationForm.fileName}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-sky-50 rounded-xl p-3 border border-sky-200 text-[11px] text-sky-900 leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>
                تخضع الوثائق للتدقيق المباشر من مسؤولي وساطة وصلة الأكاديمية لحماية حقوق الطلاب ومنع الحسابات الوهمية.
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-colors flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>إرسال للتحقق الأكاديمي</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. Project Details Modal */}
      {activeModal === 'project-details' && modalPayload && (
        <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={closeModal}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{modalPayload.escrowBadge || 'مضمون بوساطة محلية معتمدة (العمقي/الكريمي/بن دول/البسيري)'}</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              {modalPayload.category}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700">
              {modalPayload.status}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-[#0B192C] mb-2 leading-snug">
            {modalPayload.title}
          </h3>

          {/* Budget & Client banner */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-5 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <img
                src={modalPayload.clientAvatar}
                alt={modalPayload.clientName}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="font-bold text-xs text-[#0B192C] block">
                  {modalPayload.clientName}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {modalPayload.clientEntity}
                </span>
              </div>
            </div>

            <div className="text-left">
              <span className="text-[10px] text-slate-400 block font-normal">الميزانية المرصودة</span>
              <span className="text-lg font-black text-emerald-800">
                {modalPayload.budgetYER.toLocaleString()} ر.ي
              </span>
            </div>
          </div>

          {/* Duration & Emergency Buffer */}
          <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 block mb-0.5">المدة المطلوبة للتسليم</span>
              <span className="font-bold text-slate-800">{modalPayload.requiredDurationDays || 15} يوماً</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <span className="text-[10px] text-amber-700 block mb-0.5">الهامش الزمني المعتمد</span>
              <span className="font-bold">{modalPayload.bufferLabel || '+4 أيام طوارئ'}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <h4 className="font-bold text-xs text-[#0B192C] mb-2">وصف ومخرجات المشروع</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              {modalPayload.description}
            </p>
          </div>

          {/* Technologies */}
          {modalPayload.technologies && (
            <div className="mb-6">
              <h4 className="font-bold text-xs text-[#0B192C] mb-2">التقنيات المطلوبة</h4>
              <div className="flex items-center gap-1.5 flex-wrap">
                {modalPayload.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={closeModal}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
            >
              إغلاق
            </button>

            <button
              onClick={() => {
                closeModal();
                navigateTo('freelancer-jobs');
              }}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <span>تقديم عرض لهذا المشروع</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Create Project Modal (Client) */}
      {activeModal === 'create-project' && (
        <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={closeModal}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <h3 className="text-xl font-black text-[#0B192C]">نشر مشروع أكاديمي جديد</h3>
          </div>
          <p className="text-xs text-slate-500 font-normal mb-4">
            اطرح متطلبات مشروعك، وسيتم حجز ميزانية المشروع في حساب الضمان المحلي (Escrow) المعتمد (العمقي، الكريمي، بن دول، أو البسيري) لحماية الطرفين.
          </p>

          {/* Interactive Readiness Guide Collapsible for Clients */}
          <div className="mb-5">
            <ReadinessGuide
              mode="client"
              variant="collapsible"
              defaultExpanded={false}
              showRoleSwitcher={false}
            />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              publishProject(newProject);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold text-slate-800 block mb-1">عنوان المشروع</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="مثال: تطوير تطبيق جوال لحجز المواعيد الطبية"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">الميزانية التقديرية (ر.ي)</label>
                <input
                  type="number"
                  value={newProject.budgetYER}
                  onChange={(e) => setNewProject({ ...newProject, budgetYER: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-bold"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">وسيط الضمان المالي</label>
                <select
                  value={newProject.escrowProvider}
                  onChange={(e) => setNewProject({ ...newProject, escrowProvider: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
                >
                  <option value="شركة العمقي للصرافة">شركة العمقي للصرافة</option>
                  <option value="بنك الكريمي (الكريمي إكسبرس)">بنك الكريمي (الكريمي إكسبرس)</option>
                  <option value="بنك بن دول للتمويل الأصغر الإسلامي">بنك بن دول للتمويل الأصغر الإسلامي</option>
                  <option value="شركة البسيري للصرافة">شركة البسيري للصرافة</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">مدة التنفيذ المطلوبة (أيام)</label>
                <input
                  type="number"
                  value={newProject.durationDays}
                  onChange={(e) => setNewProject({ ...newProject, durationDays: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">هامش طوارئ معتمد (أيام إضافية)</label>
                <select
                  value={newProject.bufferDays}
                  onChange={(e) => setNewProject({ ...newProject, bufferDays: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
                >
                  <option value="2">+2 يوم (انقطاعات بسيطة)</option>
                  <option value="4">+4 أيام (موصى به باليمن)</option>
                  <option value="7">+7 أيام (مشاريع تخرج كبرى)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">المهارات والتقنيات المطلوبة</label>
              <input
                type="text"
                value={newProject.skills}
                onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
                placeholder="React, Laravel, IndexedDB, Tailwind..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">تفاصيل ومخرجات المشروع</label>
              <textarea
                rows={4}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="اكتب وصفاً دقيقاً للمشروع، وما هي المخرجات المتوقعة من الطالب المستقل..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium leading-relaxed"
                required
              />
            </div>

            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                سيتم تفعيل كفالة الوساطة المالية فور اعتماد أحد عروض الطلاب الموثقين.
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>نشر المشروع في سوق العمل</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Instant Withdrawal Modal */}
      {activeModal === 'instant-withdrawal' && (
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
          <button
            onClick={closeModal}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-700">
            <Building className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-black text-[#0B192C] mb-1">
            السحب الفوري للأرباح الأكاديمية
          </h3>
          <p className="text-xs text-slate-500 font-normal mb-6">
            تحويل مباشر وفوري عبر شبكات الصرافة والبنوك المحلية المعتمدة في المكلا وحضرموت (العمقي، الكريمي، بن دول، والبسيري).
          </p>

          <div className="bg-emerald-50/70 rounded-xl p-3.5 border border-emerald-200 mb-5">
            <span className="text-xs text-slate-500 block mb-0.5">الرصيد المتاح حالياً</span>
            <span className="text-2xl font-black text-emerald-800">
              {freelancerUser.balanceYER.toLocaleString()} ر.ي
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              withdrawFunds(Number(withdrawAmt), withdrawProvider);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold text-slate-800 block mb-1">المبلغ المراد سحبه</label>
              <div className="relative">
                <input
                  type="number"
                  value={withdrawAmt}
                  onChange={(e) => setWithdrawAmt(e.target.value)}
                  max={freelancerUser.balanceYER}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-black text-sm"
                  required
                />
                <span className="absolute left-3 top-3.5 text-slate-400 font-bold">ر.ي</span>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">جهة التحويل / الاستلام المعتمدة بالمكلا</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWithdrawProvider('omgy')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    withdrawProvider === 'omgy'
                      ? 'border-teal-500 bg-teal-50 text-teal-900 font-bold shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Building className="w-4 h-4 mx-auto mb-1 text-teal-700" />
                  <span className="block font-bold">شركة العمقي للصرافة</span>
                  <span className="text-[10px] text-slate-500 font-normal">حساب / حوالة فورية</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWithdrawProvider('kuraimi')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    withdrawProvider === 'kuraimi'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Building className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                  <span className="block font-bold">بنك الكريمي</span>
                  <span className="text-[10px] text-slate-500 font-normal">إكسبرس / مميز / M-Floos</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWithdrawProvider('bindowla')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    withdrawProvider === 'bindowla'
                      ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Building className="w-4 h-4 mx-auto mb-1 text-blue-700" />
                  <span className="block font-bold">بنك بن دول</span>
                  <span className="text-[10px] text-slate-500 font-normal">تمويل أصغر إسلامي</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWithdrawProvider('buseiri')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    withdrawProvider === 'buseiri'
                      ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Building className="w-4 h-4 mx-auto mb-1 text-amber-700" />
                  <span className="block font-bold">شركة البسيري للصرافة</span>
                  <span className="text-[10px] text-slate-500 font-normal">حوالة كاش فورية</span>
                </button>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 leading-relaxed">
              * يتم تأكيد العملية بإرسال كود فوري عبر SMS إلى هاتفك المسجل (+967 773 892 104).
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-colors"
              >
                تأكيد التحويل الآن
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. Emergency Buffer Settings Modal */}
      {activeModal === 'buffer-settings' && (
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
          <button
            onClick={closeModal}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-600">
            <Zap className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-black text-[#0B192C] mb-1">
            ضبط معايير الهامش الزمني المضمون
          </h3>
          <p className="text-xs text-slate-500 font-normal mb-5 leading-relaxed">
            بروتوكول معتمد في كافة محافظات اليمن لحماية الطلاب من انقطاعات التيار والشبكة.
          </p>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">تفعيل البروتوكول التلقائي</span>
              <input
                type="checkbox"
                checked={bufferActive}
                onChange={(e) => setBufferActive(e.target.checked)}
                className="w-5 h-5 accent-teal-600 rounded"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                الهامش التلقائي المضاف عند انقطاع الشبكة
              </label>
              <select
                value={bufferDaysInput}
                onChange={(e) => setBufferDaysInput(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-bold"
              >
                <option value={2}>+2 يوم (48 ساعة إضافية)</option>
                <option value={4}>+4 أيام (96 ساعة إضافية - موصى به)</option>
                <option value={7}>+7 أيام (أسبوع كامل للظروف الحرجة)</option>
              </select>
            </div>

            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-amber-600 inline ml-1" />
              يحصل العميل على إشعار SMS ورسالة توثيق رسمية من منصة وصلة تفيد بتفعيل الهامش تلقائياً دون أي غرامات تأخير عليك.
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold"
              >
                إغلاق
              </button>
              <button
                type="button"
                onClick={() => updateEmergencyBuffer(bufferActive, bufferDaysInput)}
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-colors"
              >
                حفظ الإعدادات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Client Upload Remittance Proof Modal */}
      {activeModal === 'client-upload-proof' && (
        <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={closeModal}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <h3 className="text-xl font-black text-[#0B192C]">
              رفع إثبات التحويل المالي المحلي (Escrow Deposit)
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-normal mb-6 leading-relaxed">
            ارفع سند الإيداع الصادر عن شبكات الصرافة والبنوك المحلية المعتمدة بالمكلا (العمقي، الكريمي، بن دول، أو البسيري) لحجز المبلغ كضمان مؤمن قبل بدء المستقل في العمل.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              uploadRemittanceProof(remittanceProof);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold text-slate-800 block mb-1">المشروع المراد كفالته</label>
              <select
                value={remittanceProof.targetProject}
                onChange={(e) => setRemittanceProof({ ...remittanceProof, targetProject: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
              >
                {clientContracts.map((c) => (
                  <option key={c.id} value={c.studentRole}>
                    {c.studentRole} ({c.studentName})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">شبكة الصرافة / البنك المعتمد</label>
                <select
                  value={remittanceProof.provider}
                  onChange={(e) => {
                    const val = e.target.value;
                    let type = 'omgy';
                    if (val.includes('كريمي')) type = 'kuraimi';
                    else if (val.includes('دول')) type = 'bindowla';
                    else if (val.includes('بسيري')) type = 'buseiri';
                    setRemittanceProof({
                      ...remittanceProof,
                      provider: val,
                      providerType: type,
                    });
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
                >
                  <option value="شركة العمقي للصرافة">شركة العمقي للصرافة</option>
                  <option value="بنك الكريمي (الكريمي إكسبرس / إم فلوس)">بنك الكريمي (الكريمي إكسبرس / إم فلوس)</option>
                  <option value="بنك بن دول للتمويل الأصغر الإسلامي">بنك بن دول للتمويل الأصغر الإسلامي</option>
                  <option value="شركة البسيري للصرافة">شركة البسيري للصرافة</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">المبلغ المودع (ر.ي)</label>
                <input
                  type="number"
                  value={remittanceProof.amountYER}
                  onChange={(e) => setRemittanceProof({ ...remittanceProof, amountYER: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-bold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">صورة إشعار / سند التحويل</label>
              <div className="border border-dashed border-slate-300 rounded-2xl p-5 bg-slate-50/70 text-center">
                <Upload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <span className="font-bold text-slate-700 block text-xs">
                  اضغط لاختيار صورة السند أو السحب والإفلات هنا
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  يدعم صور JPG, PNG أو مستندات PDF (الحد الأقصى 15 ميجابايت)
                </span>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">ملاحظات التحويل أو رقم العملية</label>
              <textarea
                rows={2}
                value={remittanceProof.notes}
                onChange={(e) => setRemittanceProof({ ...remittanceProof, notes: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-colors"
              >
                تأكيد رفع الإثبات
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 7. Receipt Preview Modal (Admin & Client) */}
      {activeModal === 'receipt-preview' && modalPayload && (
        <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl relative">
          <button
            onClick={closeModal}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center pb-4 border-b border-slate-200 mb-4">
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              سند إيداع وساطة مالية معتمد
            </span>
            <h3 className="text-lg font-black text-[#0B192C] mt-2">
              سند تحويل: {modalPayload.code}
            </h3>
            <span className="text-[11px] text-slate-400">{modalPayload.timeAgo}</span>
          </div>

          <div className="space-y-3 text-xs mb-5">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-500">اسم المودع (العميل):</span>
              <span className="font-bold text-[#0B192C]">{modalPayload.senderClient}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-500">مزود التحويل:</span>
              <span className="font-bold text-teal-800">{modalPayload.provider}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-950 font-black">
              <span>المبلغ الإجمالي المحجوز:</span>
              <span>{modalPayload.amountYER.toLocaleString()} ر.ي</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="text-slate-500">المستفيد الأكاديمي:</span>
              <span className="font-bold text-[#0B192C]">{modalPayload.studentName}</span>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-600">
              <span className="font-bold block mb-1">المشروع المعني:</span>
              <span>{modalPayload.targetProject}</span>
            </div>

            {/* Simulated Receipt Image */}
            <div className="h-44 rounded-xl overflow-hidden border border-slate-200 relative">
              <img
                src={modalPayload.receiptUrl}
                alt="سند التحويل"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                مطابق للحساب البنكي الرسمي
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={closeModal}
              className="w-full bg-[#0B192C] text-white py-2.5 rounded-xl font-bold text-xs"
            >
              إغلاق المعاينة
            </button>
          </div>
        </div>
      )}

      {/* 8. Student Document Preview Modal (Admin) */}
      {activeModal === 'student-doc-preview' && modalPayload && (
        <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl relative">
          <button
            onClick={closeModal}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center pb-4 border-b border-slate-200 mb-4">
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              وثيقة الهوية الأكاديمية الرسمية
            </span>
            <h3 className="text-lg font-black text-[#0B192C] mt-2">
              {modalPayload.name}
            </h3>
            <span className="text-[11px] text-slate-400">
              {modalPayload.university} - {modalPayload.faculty}
            </span>
          </div>

          <div className="space-y-3 text-xs mb-5">
            <div className="h-52 rounded-xl overflow-hidden border border-slate-200 relative">
              <img
                src={modalPayload.docPreviewUrl}
                alt="وثيقة الطالب"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-emerald-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                مطابقة للسجل الأكاديمي {modalPayload.academicId}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={closeModal}
              className="w-full bg-[#0D9488] text-white py-2.5 rounded-xl font-bold text-xs"
            >
              إغلاق المعاينة
            </button>
          </div>
        </div>
      )}

      {/* 9. Add Portfolio Item Modal */}
      {activeModal === 'add-portfolio-item' && (
        <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={closeModal}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <h3 className="text-xl font-black text-[#0B192C]">
              إضافة مشروع جديد لمعرض الأعمال الأكاديمي
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-normal mb-6">
            سجل مشاريعك الأكاديمية والمهنية لتظهر للعملاء وأصحاب الشركات مع حماية الملكية الفكرية.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addPortfolioProject(portfolioData);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold text-slate-800 block mb-1">اسم المشروع</label>
              <input
                type="text"
                value={portfolioData.title}
                onChange={(e) => setPortfolioData({ ...portfolioData, title: e.target.value })}
                placeholder="مثال: نظام إدارة الصيدليات والمخازن الطبية الذكية"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">التصنيف</label>
                <select
                  value={portfolioData.category}
                  onChange={(e) => setPortfolioData({ ...portfolioData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
                >
                  <option value="تطوير الويب">تطوير الويب</option>
                  <option value="تطبيقات الموبايل">تطبيقات الموبايل</option>
                  <option value="الذكاء الاصطناعي وبحوث التخرج">الذكاء الاصطناعي وبحوث التخرج</option>
                  <option value="تصميم واجهات UI/UX">تصميم واجهات UI/UX</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">الجامعة / الاعتماد</label>
                <input
                  type="text"
                  value={portfolioData.headerBadge}
                  onChange={(e) => setPortfolioData({ ...portfolioData, headerBadge: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">التقنيات المستخدمة (مفصولة بفواصل)</label>
              <input
                type="text"
                value={portfolioData.tags}
                onChange={(e) => setPortfolioData({ ...portfolioData, tags: e.target.value })}
                placeholder="React, Laravel, IndexedDB, Tailwind..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">ملخص المشروع والحل المنجز</label>
              <textarea
                rows={3}
                value={portfolioData.description}
                onChange={(e) => setPortfolioData({ ...portfolioData, description: e.target.value })}
                placeholder="اشرح كيف يحل المشروع مشكلة حقيقية في السوق المحلي أو التخصص..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 font-medium leading-relaxed"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة لمعرض الأعمال</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 10. Standalone Readiness Guide Modal */}
      {activeModal === 'readiness-guide' && (
        <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={closeModal}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <h3 className="text-xl font-black text-[#0B192C]">دليل الجاهزية الذكي لمنصة وصلة</h3>
          </div>
          <p className="text-xs text-slate-500 font-normal mb-5">
            إرشادات وقوائم تحقق تفاعلية لضمان وضوح النطاق، تفعيل الهامش الزمني للطوارئ (+48h)، وحماية المعاملات المالية عبر الوساطة المحلية.
          </p>

          <ReadinessGuide
            mode={modalPayload?.mode || 'client'}
            defaultExpanded={true}
            showRoleSwitcher={true}
          />

          <div className="flex items-center justify-end pt-5 border-t border-slate-100 mt-5">
            <button
              onClick={closeModal}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              إغلاق الدليل
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalModals;
