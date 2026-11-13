import React, { createContext, useContext, useState, useReducer } from 'react';
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
  PEER_STUDENTS
} from '../data/initialData';

const WaslaContext = createContext();

export const WaslaProvider = ({ children }) => {
  // Navigation & Role State
  const [activeScreen, setActiveScreen] = useState('landing'); // 'landing' | 'login' | 'register' | 'role-selection' | 'forgot-password' | 'freelancer-overview' | 'freelancer-jobs' | 'freelancer-portfolio' | 'freelancer-contact' | 'freelancer-financial' | 'client-dashboard' | 'admin-panel' | 'student-alt'
  const [currentRole, setCurrentRole] = useState('guest'); // 'guest' | 'freelancer' | 'client' | 'admin'
  const [selectedRoleSignup, setSelectedRoleSignup] = useState('client'); // for role selection screen: 'client' | 'freelancer'

  // User States
  const [freelancerUser, setFreelancerUser] = useState(INITIAL_USER);
  const [clientUser, setClientUser] = useState(INITIAL_CLIENT);

  // Entities State
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [clientContracts, setClientContracts] = useState(CLIENT_CONTRACTS);
  const [remittances, setRemittances] = useState(INITIAL_REMITTANCES);
  const [verificationQueue, setVerificationQueue] = useState(STUDENT_VERIFICATION_QUEUE);
  const [portfolioProjects, setPortfolioProjects] = useState(PORTFOLIO_PROJECTS);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // string id of active modal
  const [modalPayload, setModalPayload] = useState(null); // contextual data for modal

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

  // Screen & Role Switcher
  const navigateTo = (screen, role = null) => {
    setActiveScreen(screen);
    if (role) {
      setCurrentRole(role);
    } else {
      if (screen.startsWith('freelancer') || screen === 'student-alt') {
        setCurrentRole('freelancer');
      } else if (screen.startsWith('client')) {
        setCurrentRole('client');
      } else if (screen === 'admin-panel') {
        setCurrentRole('admin');
      } else if (['landing', 'login', 'register', 'role-selection', 'forgot-password'].includes(screen)) {
        setCurrentRole('guest');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    // Increase released count
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

    addToast(
      'تم اعتماد التوثيق الأكاديمي!',
      `تم منح شارة "توثيق أكاديمي معتمد" للطالب (${studentName}) وتفعيل أولوية الظهور في سوق العمل بنسبة 35%.`,
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
        selectedRoleSignup,
        setSelectedRoleSignup,
        navigateTo,

        // Users
        freelancerUser,
        setFreelancerUser,
        clientUser,
        setClientUser,

        // Entities
        projects,
        clientContracts,
        remittances,
        verificationQueue,
        portfolioProjects,
        serviceCategories: SERVICE_CATEGORIES,
        universitiesList: UNIVERSITIES_LIST,
        peerStudents: PEER_STUDENTS,

        // Actions
        submitProposal,
        withdrawFunds,
        updateEmergencyBuffer,
        publishProject,
        releaseEscrow,
        uploadRemittanceProof,
        confirmAndLockEscrow,
        rejectRemittance,
        approveStudentVerification,
        addPortfolioProject,

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

