import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_CLIENT,
  INITIAL_PROJECTS,
  CLIENT_CONTRACTS,
  INITIAL_REMITTANCES,
  STUDENT_VERIFICATION_QUEUE,
  PORTFOLIO_PROJECTS,
  SERVICE_CATEGORIES,
  UNIVERSITIES_LIST,
  PEER_STUDENTS,
  SERVICES_CATALOG,
  COMMUNITY_TOPICS
} from '../data/initialData';

const WaslaContext = createContext();

export const WaslaProvider = ({ children }) => {
  // Navigation & Role-Based Session State
  const [activeScreen, setActiveScreen] = useState('landing');
  const [currentRole, setCurrentRole] = useState('guest'); // 'guest' | 'freelancer' | 'client' | 'admin'
  const [selectedRoleSignup, setSelectedRoleSignup] = useState('client'); // for onboarding flow
  const [activeFreelancerProfile, setActiveFreelancerProfile] = useState('arwa'); // 'arwa' | 'osama'

  // User Profiles
  const [freelancerUser, setFreelancerUser] = useState(INITIAL_USER);
  const [clientUser, setClientUser] = useState(INITIAL_CLIENT);
  const [adminUser] = useState({
    name: 'المشرف المالي والرقابي',
    entity: 'الإدارة المركزية لمنصة وصلة',
    badge: 'مسؤول وساطة مرخص',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  });

  // Entities State
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [clientContracts, setClientContracts] = useState(CLIENT_CONTRACTS);
  const [remittances, setRemittances] = useState(INITIAL_REMITTANCES);
  const [verificationQueue, setVerificationQueue] = useState(STUDENT_VERIFICATION_QUEUE);
  const [portfolioProjects, setPortfolioProjects] = useState(PORTFOLIO_PROJECTS);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(INITIAL_PROJECTS[0]);
  const [servicesCatalog, setServicesCatalog] = useState(SERVICES_CATALOG);
  const [communityTopics, setCommunityTopics] = useState(COMMUNITY_TOPICS);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Modals state
  const [activeModal, setActiveModal] = useState(null);
  const [modalPayload, setModalPayload] = useState(null);

  // Helper Toast function
  const addToast = (title, message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Route URL Mappings
  const routeToHash = {
    'landing': '#/',
    'services': '#/services',
    'freelancers': '#/freelancers',
    'support': '#/support',
    'community': '#/community',
    'login': '#/auth/login',
    'register': '#/auth/register',
    'role-selection': '#/auth/role-selection',
    'forgot-password': '#/auth/forgot-password',
    'client-dashboard': '#/client/dashboard',
    'freelancer-overview': '#/freelancer/dashboard',
    'freelancer-jobs': '#/freelancer/jobs',
    'freelancer-portfolio': '#/freelancer/portfolio',
    'freelancer-contact': '#/freelancer/contact',
    'freelancer-financial': '#/freelancer/financial',
    'student-alt': '#/freelancer/student-alt',
    'admin-panel': '#/admin/secure-portal',
  };

  const hashToRoute = {
    '#/': 'landing',
    '': 'landing',
    '#/services': 'services',
    '#/freelancers': 'freelancers',
    '#/support': 'support',
    '#/community': 'community',
    '#/auth/login': 'login',
    '#/auth/register': 'register',
    '#/auth/role-selection': 'role-selection',
    '#/auth/forgot-password': 'forgot-password',
    '#/client/dashboard': 'client-dashboard',
    '#/freelancer/dashboard': 'freelancer-overview',
    '#/freelancer/jobs': 'freelancer-jobs',
    '#/freelancer/portfolio': 'freelancer-portfolio',
    '#/freelancer/contact': 'freelancer-contact',
    '#/freelancer/financial': 'freelancer-financial',
    '#/freelancer/student-alt': 'student-alt',
    '#/admin/secure-portal': 'admin-panel',
  };

  // Listen for browser back / forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash || '#/';
      const targetRoute = hashToRoute[currentHash] || 'landing';
      setActiveScreen(targetRoute);
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Strict Role-Based Navigation & Session Guard
  const navigateTo = (screen, role = null) => {
    if (role) {
      setCurrentRole(role);
    }

    setActiveScreen(screen);
    const targetHash = routeToHash[screen] || '#/';
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logout & Session Reset
  const logout = () => {
    setCurrentRole('guest');
    navigateTo('landing');
    addToast(
      'تم تسجيل الخروج بنجاح',
      'تم إغلاق الجلسة بأمان. تتصفح منصة وصلة الآن كزائر.',
      'info',
      3000
    );
  };

  // Switch Active User / Role seamlessly
  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'freelancer') {
      setActiveScreen('freelancer-overview');
      addToast('وضع المستقل', 'تم تفعيل حساب الطالب المستقل (م. أروى الحمادي).');
    } else if (newRole === 'client') {
      setActiveScreen('client-dashboard');
      addToast('وضع العميل', 'تم تفعيل حساب العميل صاحب المشاريع (شهاب صالح).');
    } else if (newRole === 'admin') {
      setActiveScreen('admin-panel');
      addToast('بوابة الإدارة', 'تم تفعيل حساب المشرف المالي والإداري.');
    } else {
      setActiveScreen('landing');
      addToast('تسجيل الخروج', 'أنت تتصفح المنصة كزائر الآن.');
    }
  };

  // Open & Close Modals
  const openModal = (modalName, payload = null) => {
    setActiveModal(modalName);
    setModalPayload(payload);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
  };

  // View Project Details
  const viewProjectDetails = (project) => {
    setSelectedProjectDetails(project);
    openModal('project-details', project);
  };

  // Freelancer: Submit Proposal
  const submitProposal = (projectId, proposalData) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            proposalsCount: (p.proposalsCount || 0) + 1,
            userSubmitted: true,
          };
        }
        return p;
      })
    );

    setFreelancerUser((prev) => ({
      ...prev,
      activeProposals: prev.activeProposals + 1,
    }));

    addToast(
      'تم إرسال العرض بنجاح!',
      `تم تقديم عرضك المالي بقيمة ${proposalData.bidAmount.toLocaleString()} ر.ي مع هامش طوارئ (+${proposalData.bufferDays} أيام). العرض محمي تحت مظلة الضمان الأكاديمي.`,
      'success',
      5000
    );
    closeModal();
  };

  // Freelancer: Student Academic Verification Submission
  const submitAcademicVerification = (verificationData) => {
    const newVerificationRequest = {
      id: `ver_${Date.now()}`,
      name: freelancerUser.name,
      initials: 'أ.ح',
      university: verificationData.university || freelancerUser.university,
      faculty: verificationData.faculty || freelancerUser.faculty,
      level: verificationData.level || 'المستوى الرابع',
      academicId: verificationData.academicId || '2021-CS-1105',
      docName: verificationData.fileName || 'بطاقة_جامعية_معتمدة.pdf',
      docSize: '2.1 ميجابايت',
      docTime: 'الآن',
      docType: 'pdf',
      docPreviewUrl: 'https://images.unsplash.com/photo-1589330694653-dad6ef0140df?auto=format&fit=crop&q=80&w=400',
      status: 'قيد المراجعة',
    };

    setVerificationQueue((prev) => [newVerificationRequest, ...prev]);

    addToast(
      'تم رفع وثيقة التحقق الأكاديمي بنجاح!',
      'طلبك الآن في طابور اعتماد بطاقات الطلاب لدى الإدارة المركزية، وسيتم منحك شارة "طالب موثق" فور التحقق.',
      'success',
      6000
    );
    closeModal();
  };

  // Freelancer: Instant Withdrawal Simulator
  const withdrawFunds = (amount, provider = 'kuraimi') => {
    if (amount > freelancerUser.balanceYER) {
      addToast('خطأ في الرصيد', 'المبلغ المطلوب أكبر من الرصيد المتاح للصرف الفوري.', 'error');
      return false;
    }

    setFreelancerUser((prev) => ({
      ...prev,
      balanceYER: prev.balanceYER - amount,
    }));

    const providerName = provider === 'kuraimi' ? 'بنك الكريمي (حساب 330452***)' : 'شبكة النجم للحوالات';
    addToast(
      'تم تحويل الأرباح بنجاح!',
      `تم إرسال ${amount.toLocaleString()} ر.ي إلى ${providerName}. ستصلك رسالة SMS تأكيدية خلال لحظات.`,
      'success',
      6000
    );
    closeModal();
    return true;
  };

  // Freelancer: Toggle / Update Emergency Buffer
  const updateEmergencyBuffer = (enabled, days = 4) => {
    setFreelancerUser((prev) => ({
      ...prev,
      emergencyBufferStatus: {
        ...prev.emergencyBufferStatus,
        enabled,
        hours: days * 24,
      },
    }));

    addToast(
      enabled ? 'تم تفعيل الهامش الزمني للطوارئ' : 'تم تعطيل الهامش الزمني',
      enabled
        ? `تم إضافة +${days} أيام إضافية لعقودك الجارية لحماية تقييمك الأكاديمي من انقطاعات التيار والشبكة.`
        : 'تم العودة للمواعيد الزمنية الاعتيادية للعقود.',
      'info',
      5000
    );
    closeModal();
  };

  // Client: Publish New Project
  const publishProject = (newProjectData) => {
    const newPrj = {
      id: `prj_${Date.now()}`,
      title: newProjectData.title,
      clientName: clientUser.name,
      clientEntity: clientUser.company,
      clientAvatar: clientUser.avatar,
      budgetYER: Number(newProjectData.budgetYER) || 150000,
      budgetUSD: Math.round((Number(newProjectData.budgetYER) || 150000) / 535),
      escrowProvider: newProjectData.escrowProvider || 'الكريمي إكسبرس',
      escrowBadge: `مضمون بـ ${newProjectData.escrowProvider || 'الكريمي'}`,
      category: newProjectData.category || 'هندسة برمجيات',
      status: 'مفتوح للتقديم',
      proposalsCount: 0,
      daysLeft: Number(newProjectData.durationDays) || 10,
      requiredDurationDays: Number(newProjectData.durationDays) || 10,
      bufferDays: Number(newProjectData.bufferDays) || 3,
      bufferLabel: `هامش الطوارئ المعتمد: +${newProjectData.bufferDays || 3} أيام`,
      description: newProjectData.description,
      technologies: newProjectData.skills ? newProjectData.skills.split(',').map((s) => s.trim()) : ['React', 'Node.js'],
      isFeatured: true,
    };

    setProjects((prev) => [newPrj, ...prev]);

    // Update client stats
    setClientUser((prev) => ({
      ...prev,
      activeProjects: prev.activeProjects + 1,
      totalEscrowYER: prev.totalEscrowYER + newPrj.budgetYER,
      totalEscrowUSD: prev.totalEscrowUSD + newPrj.budgetUSD,
    }));

    // Add to pending client contracts
    const newContract = {
      id: `cnt_${Date.now()}`,
      studentName: 'بانتظار قبول العرض',
      studentInitials: '--',
      studentRole: newPrj.title,
      college: 'الجامعات المعتمدة',
      university: 'اليمن',
      agreedBudget: `${newPrj.budgetYER.toLocaleString()} ر.ي`,
      status: 'مفتوح للمستقلين',
      statusType: 'blue',
      escrowStatus: 'بانتظار إيداع الضمان',
      bufferTag: `+${newPrj.bufferDays} أيام`,
      canRelease: false,
    };
    setClientContracts((prev) => [newContract, ...prev]);

    addToast(
      'تم نشر المشروع بنجاح!',
      `تم طرح المشروع في سوق العمل الأكاديمي، وتم تفعيل خاصية ضمان الوساطة المالية مع ${newPrj.escrowProvider}.`,
      'success',
      5000
    );
    closeModal();
  };

  // Client: Release Escrow (تحرير الضمان المالي للطالب)
  const releaseEscrow = (contractId) => {
    setClientContracts((prev) =>
      prev.map((c) => {
        if (c.id === contractId) {
          return {
            ...c,
            status: 'مكتمل بنجاح',
            statusType: 'green',
            escrowStatus: 'تم التحرير للطالب',
            canRelease: false,
            canRate: true,
          };
        }
        return c;
      })
    );

    setClientUser((prev) => ({
      ...prev,
      releasedTransfersCount: prev.releasedTransfersCount + 1,
    }));

    addToast(
      'تم تحرير الضمان المالي!',
      'تم تحويل المبلغ المحجوز بالكامل إلى رصيد الطالب المستقل بنجاح مع إشعار بنك الكريمي/النجم.',
      'success',
      5000
    );
    closeModal();
  };

  // Client: Upload Payment Remittance Proof
  const uploadRemittanceProof = (remittanceData) => {
    const newRem = {
      id: `rem_${Date.now()}`,
      code: `#KR-${Math.floor(1000000 + Math.random() * 9000000)}`,
      timeAgo: 'الآن',
      senderClient: clientUser.name,
      senderEntity: clientUser.company,
      provider: remittanceData.provider || 'الكريمي إكسبرس',
      providerType: remittanceData.providerType || 'kuraimi',
      amountYER: Number(remittanceData.amountYER) || 250000,
      targetProject: remittanceData.targetProject || 'مشروع جديد قيد الضمان',
      studentName: remittanceData.studentName || 'م. أروى الحمادي',
      studentUniversity: 'جامعة صنعاء',
      status: 'سند مرفوع حديثاً',
      statusType: 'yellow',
      receiptUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
      notes: remittanceData.notes || 'إيداع رسمي عبر التطبيق المحلي.',
    };

    setRemittances((prev) => [newRem, ...prev]);

    addToast(
      'تم رفع إثبات التحويل بنجاح!',
      'تم استلام إشعار الإيداع، ويجري الآن مراجعته وتأكيد قفل الضمان المالي من قبل إدارة وساطة وصلة.',
      'success',
      6000
    );
    closeModal();
  };

  // Admin: Confirm & Lock Escrow (تأكيد وقفل الضمان)
  const confirmAndLockEscrow = (remittanceId) => {
    let target = null;
    setRemittances((prev) =>
      prev.map((r) => {
        if (r.id === remittanceId) {
          target = r;
          return {
            ...r,
            status: 'تم قفل الضمان وتأكيد الإيداع',
            statusType: 'green',
          };
        }
        return r;
      })
    );

    if (target) {
      addToast(
        'تم تأكيد وقفل الضمان المالي!',
        `تم التحقق من الحوالة رقم ${target.code} بقيمة ${target.amountYER.toLocaleString()} ر.ي وإشعار الطالب المستقل بأمان بدء العمل.`,
        'success',
        5000
      );
    }
  };

  // Admin: Reject Remittance
  const rejectRemittance = (remittanceId, reason = 'عدم تطابق بيانات السند مع كشف الحساب البنكي') => {
    setRemittances((prev) =>
      prev.map((r) => {
        if (r.id === remittanceId) {
          return {
            ...r,
            status: `مرفوض: ${reason}`,
            statusType: 'red',
          };
        }
        return r;
      })
    );

    addToast(
      'تم رفض السند المالي',
      `تم إشعار العميل بسبب الرفض (${reason}) وطلب تصحيح أو إعادة رفع سند صالح.`,
      'error',
      5000
    );
  };

  // Admin: Approve Student Academic Verification
  const approveStudentVerification = (verificationId) => {
    let studentName = '';
    setVerificationQueue((prev) =>
      prev.filter((v) => {
        if (v.id === verificationId) {
          studentName = v.name;
          return false;
        }
        return true;
      })
    );

    // If it was Arwa, ensure badge is active
    setFreelancerUser((prev) => ({
      ...prev,
      isVerified: true,
      verifiedBadgeText: 'طالب موثق (معتمد)',
    }));

    addToast(
      'تم اعتماد التوثيق الأكاديمي!',
      `تم منح شارة "طالب موثق" للطالب (${studentName}) وتفعيل أولوية الظهور في سوق العمل بنسبة 35%.`,
      'success',
      5000
    );
  };

  // Freelancer / Portfolio: Add New Project to Showcase
  const addPortfolioProject = (projectData) => {
    const newPort = {
      id: `port_${Date.now()}`,
      title: projectData.title,
      category: projectData.category || 'تطوير الويب',
      categoryTag: projectData.categoryTag || 'مشروع تخرج ممتاز',
      headerBadge: projectData.headerBadge || 'جامعة صنعاء 2024',
      rating: 5.0,
      ratingCount: 1,
      description: projectData.description,
      tags: projectData.tags ? projectData.tags.split(',').map((t) => t.trim()) : ['React', 'Tailwind'],
      academicVerificationNote: 'تم التحقق من الكود الأكاديمي والتوثيق',
      downloads: '1 عمل جديد',
      completionBadge: 'مكتمل بنسبة 100%',
      image: projectData.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400',
    };

    setPortfolioProjects((prev) => [newPort, ...prev]);

    addToast(
      'تمت إضافة المشروع للمعرض بنجاح!',
      'مشروعك البرمجي مسجل الآن ومحمي بموجب شهادة الملكية الفكرية الأكاديمية.',
      'success',
      5000
    );
    closeModal();
  };

  return (
    <WaslaContext.Provider
      value={{
        // Screen & Role
        activeScreen,
        currentRole,
        setCurrentRole,
        selectedRoleSignup,
        setSelectedRoleSignup,
        activeFreelancerProfile,
        setActiveFreelancerProfile,
        navigateTo,
        switchRole,
        logout,

        // Users
        freelancerUser,
        setFreelancerUser,
        clientUser,
        setClientUser,
        adminUser,

        // Entities
        projects,
        clientContracts,
        remittances,
        verificationQueue,
        portfolioProjects,
        selectedProjectDetails,
        serviceCategories: SERVICE_CATEGORIES,
        universitiesList: UNIVERSITIES_LIST,
        peerStudents: PEER_STUDENTS,
        servicesCatalog,
        communityTopics,

        // Actions
        submitProposal,
        submitAcademicVerification,
        withdrawFunds,
        updateEmergencyBuffer,
        publishProject,
        releaseEscrow,
        uploadRemittanceProof,
        confirmAndLockEscrow,
        rejectRemittance,
        approveStudentVerification,
        addPortfolioProject,
        viewProjectDetails,

        // Toasts
        toasts,
        addToast,
        removeToast,

        // Modals
        activeModal,
        modalPayload,
        openModal,
        closeModal,
      }}
    >
      {children}
    </WaslaContext.Provider>
  );
};

export const useWasla = () => {
  const context = useContext(WaslaContext);
  if (!context) {
    throw new Error('useWasla must be used within a WaslaProvider');
  }
  return context;
};

export default WaslaContext;
