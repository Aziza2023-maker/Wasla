import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_CLIENT,
  INITIAL_PROJECTS,
  CLIENT_CONTRACTS,
  INITIAL_DISPUTES,
  INITIAL_FINANCIAL_RECORDS,
  INITIAL_ACCOUNTS,
  INITIAL_REMITTANCES,
  STUDENT_VERIFICATION_QUEUE,
  PORTFOLIO_PROJECTS,
  SERVICE_CATEGORIES,
  UNIVERSITIES_LIST,
  PEER_STUDENTS,
  SERVICES_CATALOG,
  COMMUNITY_TOPICS
} from '../data/initialData';

// Helper utilities for clean, robust session persistence
const loadStoredSession = () => {
  try {
    const raw = localStorage.getItem('wasla_auth_session');
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.isAuthenticated && ['freelancer', 'client', 'admin'].includes(data.role)) {
        return data;
      }
    }
  } catch (e) {
    console.warn('Could not read session from localStorage', e);
  }
  return null;
};

const persistAuthSession = (isAuthenticated, role, userData = null) => {
  try {
    if (isAuthenticated && role && role !== 'guest') {
      localStorage.setItem(
        'wasla_auth_session',
        JSON.stringify({
          isAuthenticated: true,
          role,
          userData,
          timestamp: Date.now()
        })
      );
    } else {
      localStorage.removeItem('wasla_auth_session');
    }
  } catch (e) {
    console.warn('Could not persist session to localStorage', e);
  }
};

const loadStoredItem = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn(`Could not read ${key} from localStorage`, e);
  }
  return fallback;
};

const persistItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Could not persist ${key} to localStorage`, e);
  }
};

const WaslaContext = createContext();

export const WaslaProvider = ({ children }) => {
  // Navigation & Role-Based Session State initialized with safe persistence
  const initialSession = loadStoredSession();

  const [activeScreen, setActiveScreen] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initialSession?.isAuthenticated));
  const [currentRole, setCurrentRoleState] = useState(initialSession?.role || 'guest'); // 'guest' | 'freelancer' | 'client' | 'admin'
  const [selectedRoleSignup, setSelectedRoleSignup] = useState('client'); // for onboarding flow
  const [activeFreelancerProfile, setActiveFreelancerProfile] = useState('arwa'); // 'arwa' | 'osama'

  // User Profiles (restoring any customized profile from session if available)
  const [freelancerUser, setFreelancerUser] = useState(() => {
    if (initialSession?.role === 'freelancer' && initialSession?.userData) {
      return { ...INITIAL_USER, ...initialSession.userData };
    }
    return INITIAL_USER;
  });

  const [clientUser, setClientUser] = useState(() => {
    if (initialSession?.role === 'client' && initialSession?.userData) {
      return { ...INITIAL_CLIENT, ...initialSession.userData };
    }
    return INITIAL_CLIENT;
  });
  const [adminUser] = useState({
    name: 'المشرف المالي والرقابي',
    entity: 'الإدارة المركزية لمنصة وصلة',
    badge: 'مسؤول وساطة مرخص',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  });

  // Persistent Stores: Accounts, Contracts, Disputes, Financial Records
  const [accounts, setAccounts] = useState(() => loadStoredItem('wasla_accounts_db', INITIAL_ACCOUNTS));
  const [clientContracts, setClientContracts] = useState(() => loadStoredItem('wasla_contracts_db', CLIENT_CONTRACTS));
  const [disputes, setDisputes] = useState(() => loadStoredItem('wasla_disputes_db', INITIAL_DISPUTES));
  const [financialRecords, setFinancialRecords] = useState(() => loadStoredItem('wasla_financial_db', INITIAL_FINANCIAL_RECORDS));

  // Sync to localStorage whenever stores update
  useEffect(() => {
    persistItem('wasla_accounts_db', accounts);
  }, [accounts]);

  useEffect(() => {
    persistItem('wasla_contracts_db', clientContracts);
  }, [clientContracts]);

  useEffect(() => {
    persistItem('wasla_disputes_db', disputes);
  }, [disputes]);

  useEffect(() => {
    persistItem('wasla_financial_db', financialRecords);
  }, [financialRecords]);

  // Entities State
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
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
    'freelancer-disputes': '#/freelancer/disputes',
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
    '#/freelancer/disputes': 'freelancer-disputes',
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

  // Set Current Role with immediate session synchronization
  const setCurrentRole = (role) => {
    setCurrentRoleState(role);
    const isAuth = role !== 'guest';
    setIsAuthenticated(isAuth);
    persistAuthSession(isAuth, role);
  };

  // Login handler: guarantees immediate state update & persistence
  const login = (role, userData = null) => {
    setIsAuthenticated(true);
    setCurrentRoleState(role);
    if (userData) {
      if (role === 'client') {
        setClientUser((prev) => ({ ...prev, ...userData }));
      } else if (role === 'freelancer') {
        setFreelancerUser((prev) => ({ ...prev, ...userData }));
      }
    }
    persistAuthSession(
      true,
      role,
      userData || (role === 'client' ? clientUser : role === 'freelancer' ? freelancerUser : adminUser)
    );
  };

  // Dedicated Fixed Role Authentication
  const authenticateUser = (email, password, requestedRole = null) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const found = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
    if (!found) {
      return {
        success: false,
        error: 'لم يتم العثور على حساب مسجل بهذا البريد الإلكتروني. يرجى التحقق من صحة البريد أو إنشاء حساب جديد.'
      };
    }
    if (found.password !== password) {
      return {
        success: false,
        error: 'كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.'
      };
    }
    if (requestedRole && found.role !== requestedRole) {
      const roleNames = {
        freelancer: 'طالب مستقل',
        client: 'صاحب عمل (عميل)',
        admin: 'مسؤول إدارة ووساطة'
      };
      return {
        success: false,
        error: `هذا الحساب مسجل كـ "${roleNames[found.role] || found.role}"، ولا يمكن تسجيل الدخول به كـ "${roleNames[requestedRole] || requestedRole}". يرجى اختيار التبويب المطابق لدورك.`
      };
    }

    login(found.role, found);
    return {
      success: true,
      role: found.role,
      user: found
    };
  };

  // Dedicated Fixed Role Registration
  const registerAccount = (accountData) => {
    const cleanEmail = (accountData.email || '').trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'البريد الإلكتروني مطلوب.' };
    }
    const exists = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, error: 'البريد الإلكتروني مسجل مسبقاً في المنصة. يرجى تسجيل الدخول.' };
    }

    const newAcc = {
      id: `usr_${Date.now()}`,
      email: cleanEmail,
      password: accountData.password || 'password123',
      role: accountData.role || 'client',
      name: accountData.name || 'مستخدم جديد',
      phone: accountData.phone || '+967 770 000 000',
      company: accountData.company || '',
      university: accountData.university || 'جامعة حضرموت',
      faculty: accountData.faculty || '',
      skills: accountData.skills || '',
      bio: accountData.bio || '',
      createdAt: new Date().toISOString()
    };

    setAccounts((prev) => [newAcc, ...prev]);
    login(newAcc.role, newAcc);
    return { success: true, role: newAcc.role, user: newAcc };
  };

  // Register handler: guarantees immediate state update & persistence
  const register = (role, userData = null) => {
    setIsAuthenticated(true);
    setCurrentRoleState(role);
    if (userData) {
      if (role === 'client') {
        setClientUser((prev) => ({ ...prev, ...userData }));
      } else if (role === 'freelancer') {
        setFreelancerUser((prev) => ({ ...prev, ...userData }));
      }
    }
    persistAuthSession(
      true,
      role,
      userData || (role === 'client' ? clientUser : role === 'freelancer' ? freelancerUser : adminUser)
    );
  };

  // Strict Role-Based Navigation & Session Guard
  const navigateTo = (screen, role = null) => {
    if (role) {
      setCurrentRoleState(role);
      const isAuth = role !== 'guest';
      setIsAuthenticated(isAuth);
      persistAuthSession(isAuth, role);
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
    setIsAuthenticated(false);
    setCurrentRoleState('guest');
    persistAuthSession(false, 'guest');
    navigateTo('landing', 'guest');
    addToast(
      'تم تسجيل الخروج بنجاح',
      'تم إغلاق الجلسة بأمان. تتصفح منصة وصلة الآن كزائر.',
      'info',
      3000
    );
  };

  // Switch Active User / Role seamlessly (Developer Inspection of Demo Accounts)
  const switchRole = (newRole) => {
    if (newRole === 'freelancer') {
      const acc = accounts.find((a) => a.role === 'freelancer') || INITIAL_ACCOUNTS[0];
      login('freelancer', acc);
      navigateTo('freelancer-overview', 'freelancer');
      addToast('وضع المستقل الأكاديمي', 'تم التبديل إلى حساب الطالب المستقل (م. أروى الحمادي).');
    } else if (newRole === 'client') {
      const acc = accounts.find((a) => a.role === 'client') || INITIAL_ACCOUNTS[1];
      login('client', acc);
      navigateTo('client-dashboard', 'client');
      addToast('وضع صاحب العمل', 'تم التبديل إلى حساب العميل (شهاب صالح).');
    } else if (newRole === 'admin') {
      const acc = accounts.find((a) => a.role === 'admin') || INITIAL_ACCOUNTS[2];
      login('admin', acc);
      navigateTo('admin-panel', 'admin');
      addToast('بوابة الإدارة والوساطة', 'تم التبديل إلى حساب المشرف المالي والإداري.');
    } else {
      logout();
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

    let providerName = 'شركة العمقي للصرافة (حساب 254019***)';
    if (provider === 'kuraimi') providerName = 'بنك الكريمي (حساب 220894***)';
    else if (provider === 'bindowla') providerName = 'بنك بن دول للتمويل الأصغر الإسلامي (حساب 108392***)';
    else if (provider === 'buseiri') providerName = 'شركة البسيري للصرافة (فرع المكلا)';
    else if (provider === 'omgy') providerName = 'شركة العمقي للصرافة (فرع الشرج)';

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
    let releasedTarget = null;
    setClientContracts((prev) =>
      prev.map((c) => {
        if (c.id === contractId) {
          releasedTarget = c;
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

    if (releasedTarget) {
      recordFinancialTransaction({
        type: 'release',
        title: 'تحرير مستحقات الضمان المالي للطالب',
        projectTitle: releasedTarget.projectTitle || releasedTarget.studentRole,
        clientName: clientUser.name,
        freelancerName: releasedTarget.freelancerName || releasedTarget.studentName,
        amountYER: releasedTarget.budgetYER || 140000,
        provider: 'شركة العمقي للصرافة',
        status: 'completed',
        description: 'تم تحرير كامل مبالغ الضمان المحجوزة بعد تأكيد استلام المخرجات.'
      });
    }

    addToast(
      'تم تحرير الضمان المالي!',
      'تم تحويل المبلغ المحجوز بالكامل إلى رصيد المستقل بنجاح مع إشعار الوسيط المالي المعتمد (العمقي/الكريمي/بن دول/البسيري).',
      'success',
      5000
    );
    closeModal();
  };

  // Client: Upload Payment Remittance Proof
  const uploadRemittanceProof = (remittanceData) => {
    const prefix = remittanceData.providerType === 'kuraimi' ? 'KR' : remittanceData.providerType === 'bindowla' ? 'BD' : remittanceData.providerType === 'buseiri' ? 'BS' : 'OM';
    const newRem = {
      id: `rem_${Date.now()}`,
      code: `#${prefix}-${Math.floor(1000000 + Math.random() * 9000000)}`,
      timeAgo: 'الآن',
      senderClient: clientUser.name,
      senderEntity: clientUser.company,
      provider: remittanceData.provider || 'شركة العمقي للصرافة',
      providerType: remittanceData.providerType || 'omgy',
      amountYER: Number(remittanceData.amountYER) || 250000,
      targetProject: remittanceData.targetProject || 'مشروع جديد قيد الضمان',
      studentName: remittanceData.studentName || 'م. أروى الحمادي',
      studentUniversity: 'جامعة حضرموت',
      status: 'سند مرفوع حديثاً',
      statusType: 'yellow',
      receiptUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
      notes: remittanceData.notes || 'إيداع رسمي عبر التطبيق المحلي المعتمد.',
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
      recordFinancialTransaction({
        type: 'deposit',
        title: 'إيداع ضمان مالي وقفل Escrow',
        projectTitle: target.targetProject,
        clientName: target.senderClient,
        freelancerName: target.studentName,
        provider: target.provider,
        amountYER: target.amountYER,
        status: 'completed',
        description: `تم التحقق من حوالة ${target.provider} وقفل الضمان رسمياً بواسطة الإدارة.`
      });

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
      headerBadge: projectData.headerBadge || 'جامعة حضرموت 2025',
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

  // Financial Ledger Entry Recorder
  const recordFinancialTransaction = (tx) => {
    const newTx = {
      id: `fin_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      refCode: tx.refCode || `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('ar-YE'),
      time: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' }),
      type: tx.type || 'deposit', // 'deposit', 'release', 'refund', 'fee'
      title: tx.title || (tx.type === 'deposit' ? 'إيداع ضمان مالي' : tx.type === 'release' ? 'تحرير مستحقات' : tx.type === 'refund' ? 'استرداد مالي' : 'رسوم منصة'),
      projectTitle: tx.projectTitle || 'مشروع منصة وصلة',
      clientName: tx.clientName || clientUser.name,
      freelancerName: tx.freelancerName || freelancerUser.name,
      provider: tx.provider || 'شركة العمقي للصرافة',
      amountYER: Number(tx.amountYER) || 0,
      amountUSD: Math.round((Number(tx.amountYER) || 0) / 535),
      feeYER: tx.feeYER || 0,
      status: tx.status || 'completed',
      receiptNumber: `REC-${Math.floor(10000 + Math.random() * 90000)}`,
      isMockReceipt: true,
      notes: tx.description || 'معاملة مالية مسجلة ومحفوظة محلياً'
    };

    setFinancialRecords((prev) => [newTx, ...prev]);
    return newTx;
  };

  // Bilateral Contract: Create Draft Agreement
  const createContract = (contractData) => {
    const code = `CNT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newContract = {
      id: `cnt_${Date.now()}`,
      contractCode: code,
      projectId: contractData.projectId || `prj_${Date.now()}`,
      projectTitle: contractData.projectTitle || 'مشروع جديد',
      clientId: clientUser.id || 'usr_shehab_01',
      clientName: clientUser.name || 'شهاب صالح',
      clientEntity: clientUser.company || 'مؤسسة مدار للحلول التقنية',
      clientPhone: clientUser.phone || '+967 770 123 456',
      freelancerId: contractData.freelancerId || freelancerUser.id || 'usr_arwa_01',
      freelancerName: contractData.freelancerName || freelancerUser.name || 'م. أروى الحمادي',
      freelancerUniversity: contractData.freelancerUniversity || freelancerUser.university || 'جامعة حضرموت',
      freelancerFaculty: contractData.freelancerFaculty || freelancerUser.faculty || 'كلية الحاسوب وتكنولوجيا المعلومات',
      freelancerPhone: freelancerUser.contactChannels?.whatsapp || '+967 773 892 104',
      budgetYER: Number(contractData.budgetYER) || 150000,
      budgetUSD: Math.round((Number(contractData.budgetYER) || 150000) / 535),
      deliverables: contractData.deliverables || [
        { id: 1, title: 'تسليم المخططات والواجهات الأولية', done: false },
        { id: 2, title: 'تطوير الكود البرمجي وفق المتطلبات', done: false },
        { id: 3, title: 'الفحص والتشغيل التجريبي والدليل الفني', done: false }
      ],
      scopeOfWork: contractData.scopeOfWork || 'تنفيذ المخرجات المتفق عليها كاملة، والالتزام بأعلى معايير الجودة والأمان.',
      terms: contractData.terms || 'يتم حجز المبالغ عبر وساطة وصلة، ولا يتم تحرير الدفعة إلا بعد مراجعة وقبول العميل النهائي.',
      bufferDays: Number(contractData.bufferDays) || 3,
      durationDays: Number(contractData.durationDays) || 14,
      version: 1,
      status: 'pending_freelancer_approval',
      clientApprovedAt: new Date().toISOString(),
      freelancerApprovedAt: null,
      history: [
        {
          action: 'تم إنشاء مسودة العقد وتوقيع الطرف الأول (العميل)',
          by: clientUser.name || 'شهاب صالح',
          at: new Date().toLocaleString('ar-YE')
        }
      ],
      isDemo: false
    };

    setClientContracts((prev) => [newContract, ...prev]);
    addToast('تم إنشاء مسودة العقد بنجاح!', `تم إرسال العقد ${code} إلى المستقل للمراجعة والموافقة المتبادلة.`, 'success');
    closeModal();
    return newContract;
  };

  // Bilateral Contract: Approve
  const approveContract = (contractId, userRole) => {
    let updatedTarget = null;
    setClientContracts((prev) =>
      prev.map((c) => {
        if (c.id === contractId) {
          const isClient = userRole === 'client';
          const newClientApproval = isClient ? new Date().toISOString() : c.clientApprovedAt;
          const newFreelancerApproval = !isClient ? new Date().toISOString() : c.freelancerApprovedAt;
          const bothApproved = Boolean(newClientApproval && newFreelancerApproval);

          const updated = {
            ...c,
            clientApprovedAt: newClientApproval,
            freelancerApprovedAt: newFreelancerApproval,
            status: bothApproved ? 'active' : isClient ? 'pending_freelancer_approval' : 'pending_client_approval',
            history: [
              ...(c.history || []),
              {
                action: isClient ? 'موافقة واعتماد رسمي من العميل' : 'موافقة واعتماد رسمي من المستقل',
                by: isClient ? (c.clientName || 'العميل') : (c.freelancerName || 'المستقل'),
                at: new Date().toLocaleString('ar-YE')
              }
            ]
          };
          updatedTarget = updated;
          return updated;
        }
        return c;
      })
    );

    if (updatedTarget?.status === 'active') {
      addToast('العقد أصبح نافذاً ونشطاً!', 'تمت موافقة الطرفين على بنود العقد. يبدأ احتساب المدة وهامش الطوارئ الآن تحت حماية وساطة وصلة.', 'success');
    } else {
      addToast('تم تسجيل موافقتك على العقد', 'في انتظار استكمال اعتماد الطرف الآخر ليصبح العقد سارياً رسمياً.', 'info');
    }
  };

  // Bilateral Contract: Request Revision
  const requestContractRevision = (contractId, userRole, notes) => {
    setClientContracts((prev) =>
      prev.map((c) => {
        if (c.id === contractId) {
          return {
            ...c,
            status: 'revision_requested',
            version: (c.version || 1) + 1,
            clientApprovedAt: userRole === 'client' ? new Date().toISOString() : null,
            freelancerApprovedAt: userRole === 'freelancer' ? new Date().toISOString() : null,
            history: [
              ...(c.history || []),
              {
                action: `طلب تعديل بنود العقد (إصدار ${ (c.version || 1) + 1 }): "${notes}"`,
                by: userRole === 'client' ? (c.clientName || 'العميل') : (c.freelancerName || 'المستقل'),
                at: new Date().toLocaleString('ar-YE')
              }
            ]
          };
        }
        return c;
      })
    );
    addToast('تم تقديم طلب تعديل العقد', 'تم إشعار الطرف الآخر بملاحظات التعديل لتحديث البنود وإعادة الاعتماد.', 'info');
  };

  // Disputes: Open a new dispute linked to contract & project
  const openDispute = (disputeData) => {
    const code = `DSP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDispute = {
      id: `dsp_${Date.now()}`,
      disputeCode: code,
      contractId: disputeData.contractId || 'cnt_01',
      contractCode: disputeData.contractCode || 'CNT-8821',
      projectId: disputeData.projectId || 'prj_01',
      projectTitle: disputeData.projectTitle || 'مشروع متنازع عليه',
      clientId: clientUser.id || 'usr_shehab_01',
      clientName: clientUser.name || 'شهاب صالح',
      freelancerId: disputeData.freelancerId || freelancerUser.id || 'usr_arwa_01',
      freelancerName: disputeData.freelancerName || freelancerUser.name || 'م. أروى الحمادي',
      openedByRole: currentRole,
      openedByName: currentRole === 'client' ? clientUser.name : freelancerUser.name,
      reason: disputeData.reason || 'خلاف على جودة المخرجات أو جدول التسليم',
      description: disputeData.description || '',
      amountInDisputeYER: Number(disputeData.amountInDisputeYER) || 120000,
      status: 'open', // 'open' | 'in_discussion' | 'escalated_to_admin' | 'resolved_by_agreement' | 'closed_by_admin'
      createdAt: new Date().toISOString(),
      proposals: [],
      evidence: disputeData.evidence ? [disputeData.evidence] : [],
      timeline: [
        {
          event: `فتح النزاع من قبل ${currentRole === 'client' ? 'العميل' : 'المستقل'}: ${disputeData.reason}`,
          by: currentRole === 'client' ? clientUser.name : freelancerUser.name,
          at: new Date().toLocaleString('ar-YE')
        }
      ]
    };

    setDisputes((prev) => [newDispute, ...prev]);

    // Freeze contract status
    setClientContracts((prev) =>
      prev.map((c) => (c.id === disputeData.contractId ? { ...c, status: 'disputed' } : c))
    );

    addToast('تم تسجيل النزاع رسمياً', `تم فتح التذكرة ${code}. تم تجميد أموال الضمان تلقائياً لحين التوصل لحل ودي أو تدخل الإدارة.`, 'warning');
    closeModal();
    return newDispute;
  };

  // Disputes: Submit Evidence
  const submitDisputeEvidence = (disputeId, evidenceData) => {
    const evidenceItem = {
      id: `ev_${Date.now()}`,
      uploaderRole: currentRole,
      uploaderName: currentRole === 'client' ? clientUser.name : freelancerUser.name,
      title: evidenceData.title,
      description: evidenceData.description || '',
      fileType: evidenceData.fileType || 'image',
      url: evidenceData.url || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
      submittedAt: new Date().toLocaleString('ar-YE')
    };

    setDisputes((prev) =>
      prev.map((d) => {
        if (d.id === disputeId) {
          return {
            ...d,
            evidence: [...(d.evidence || []), evidenceItem],
            timeline: [
              ...(d.timeline || []),
              {
                event: `إرفاق مستند/دليل: "${evidenceItem.title}"`,
                by: evidenceItem.uploaderName,
                at: evidenceItem.submittedAt
              }
            ]
          };
        }
        return d;
      })
    );
    addToast('تم إرفاق الدليل بنجاح', 'تمت إضافة المستند إلى ملف النزاع وإتاحته للطرف الآخر والإدارة الرقابية.', 'success');
  };

  // Disputes: Propose Settlement
  const proposeDisputeSettlement = (disputeId, proposalData) => {
    const proposal = {
      id: `prop_${Date.now()}`,
      proposedByRole: currentRole,
      proposedByName: currentRole === 'client' ? clientUser.name : freelancerUser.name,
      offerAmountClient: Number(proposalData.offerAmountClient) || 0,
      offerAmountFreelancer: Number(proposalData.offerAmountFreelancer) || 0,
      notes: proposalData.notes || '',
      status: 'pending',
      createdAt: new Date().toLocaleString('ar-YE')
    };

    setDisputes((prev) =>
      prev.map((d) => {
        if (d.id === disputeId) {
          return {
            ...d,
            status: 'in_discussion',
            proposals: [...(d.proposals || []), proposal],
            timeline: [
              ...(d.timeline || []),
              {
                event: `تقديم مقترح تسوية ودية: إعادة ${proposal.offerAmountClient.toLocaleString()} ر.ي للعميل وصرف ${proposal.offerAmountFreelancer.toLocaleString()} ر.ي للمستقل`,
                by: proposal.proposedByName,
                at: proposal.createdAt
              }
            ]
          };
        }
        return d;
      })
    );
    addToast('تم إرسال مقترح التسوية', 'بانتظار رد الطرف الآخر (قبول أو رفض أو تقديم مقترح بديل).', 'info');
  };

  // Disputes: Respond to Proposal
  const respondToDisputeProposal = (disputeId, proposalId, accepted, reason = '') => {
    let resolvedProposal = null;
    let targetDispute = null;

    setDisputes((prev) =>
      prev.map((d) => {
        if (d.id === disputeId) {
          targetDispute = d;
          const updatedProposals = (d.proposals || []).map((p) => {
            if (p.id === proposalId) {
              const res = { ...p, status: accepted ? 'accepted' : 'rejected', responseNotes: reason };
              if (accepted) resolvedProposal = res;
              return res;
            }
            return p;
          });

          const newStatus = accepted ? 'resolved_by_agreement' : d.status;

          return {
            ...d,
            status: newStatus,
            proposals: updatedProposals,
            timeline: [
              ...(d.timeline || []),
              {
                event: accepted
                  ? `قبول مقترح التسوية الودية وإغلاق النزاع بالتراضي`
                  : `رفض مقترح التسوية: "${reason || 'عدم الاتفاق على القسمة المالية'}"`,
                by: currentRole === 'client' ? clientUser.name : freelancerUser.name,
                at: new Date().toLocaleString('ar-YE')
              }
            ]
          };
        }
        return d;
      })
    );

    if (accepted && resolvedProposal) {
      if (resolvedProposal.offerAmountClient > 0) {
        recordFinancialTransaction({
          type: 'refund',
          title: 'استرداد ناتج عن تسوية نزاع ودية',
          projectTitle: targetDispute?.projectTitle || 'مشروع متنازع عليه',
          clientName: clientUser.name,
          freelancerName: freelancerUser.name,
          amountYER: resolvedProposal.offerAmountClient,
          status: 'completed',
          description: `استرداد مالي للعميل بموجب اتفاق تسوية ودية.`
        });
      }
      if (resolvedProposal.offerAmountFreelancer > 0) {
        recordFinancialTransaction({
          type: 'release',
          title: 'تحرير مستحقات ناتجة عن تسوية نزاع ودية',
          projectTitle: targetDispute?.projectTitle || 'مشروع متنازع عليه',
          clientName: clientUser.name,
          freelancerName: freelancerUser.name,
          amountYER: resolvedProposal.offerAmountFreelancer,
          status: 'completed',
          description: `تحرير دفعة للمستقل بموجب اتفاق تسوية ودية.`
        });
      }

      addToast('تم التوصل لتسوية ودية!', 'تم إغلاق النزاع بالتراضي وسيتم تطبيق القسمة المالية المتفق عليها فورياً.', 'success');
    } else {
      addToast('تم رفض المقترح', 'يمكنك تقديم مقترح تسوية بديل أو تصعيد النزاع للتحكيم الإداري.', 'info');
    }
  };

  // Disputes: Escalate to Admin Arbitration
  const escalateDisputeToAdmin = (disputeId, notes = '') => {
    setDisputes((prev) =>
      prev.map((d) => {
        if (d.id === disputeId) {
          return {
            ...d,
            status: 'escalated_to_admin',
            escalatedAt: new Date().toISOString(),
            escalationNotes: notes,
            timeline: [
              ...(d.timeline || []),
              {
                event: `تصعيد النزاع رسميًا لإدارة التحكيم والوساطة لمنصة وصلة: "${notes || 'تعذر الوصول لحل ودي متبادل'}"`,
                by: currentRole === 'client' ? clientUser.name : freelancerUser.name,
                at: new Date().toLocaleString('ar-YE')
              }
            ]
          };
        }
        return d;
      })
    );
    addToast('تم تصعيد النزاع للإدارة المركزية', 'أصبح النزاع الآن في جدول تحكيم الإدارة. ستقوم اللجنة بمراجعة المعطيات وإصدار حكم ملزم.', 'warning');
  };

  // Disputes: Resolve by Admin (Arbitration Ruling)
  const resolveDisputeByAdmin = (disputeId, rulingData) => {
    const ruling = {
      adminNotes: rulingData.adminNotes || 'حكم تحكيمي نهائي ملزم صادر عن لجنة وساطة وصلة بالمكلا.',
      refundClientYER: Number(rulingData.refundClientYER) || 0,
      payoutFreelancerYER: Number(rulingData.payoutFreelancerYER) || 0,
      closedAt: new Date().toISOString()
    };

    let targetDispute = null;

    setDisputes((prev) =>
      prev.map((d) => {
        if (d.id === disputeId) {
          targetDispute = d;
          return {
            ...d,
            status: 'closed_by_admin',
            ruling,
            timeline: [
              ...(d.timeline || []),
              {
                event: `صدور قرار التحكيم الإداري النهائي: إعادة للعميل (${ruling.refundClientYER.toLocaleString()} ر.ي) وصرف للمستقل (${ruling.payoutFreelancerYER.toLocaleString()} ر.ي)`,
                by: 'الإدارة والوساطة المركزية (المشرف المالي والرقابي)',
                at: new Date().toLocaleString('ar-YE')
              }
            ]
          };
        }
        return d;
      })
    );

    // Record financial transactions
    if (ruling.refundClientYER > 0) {
      recordFinancialTransaction({
        type: 'refund',
        title: 'استرداد مالي بموجب قرار تحكيم إداري نهائي',
        projectTitle: targetDispute?.projectTitle || 'مشروع متنازع عليه',
        amountYER: ruling.refundClientYER,
        status: 'completed',
        description: `استرداد رسمي للعميل بموجب قرار لجنة التحكيم الإداري.`
      });
    }
    if (ruling.payoutFreelancerYER > 0) {
      recordFinancialTransaction({
        type: 'release',
        title: 'صرف مستحقات بموجب قرار تحكيم إداري نهائي',
        projectTitle: targetDispute?.projectTitle || 'مشروع متنازع عليه',
        amountYER: ruling.payoutFreelancerYER,
        status: 'completed',
        description: `تحرير رسمي لمستحقات المستقل بموجب قرار لجنة التحكيم الإداري.`
      });
    }

    addToast('تم إصدار القرار التحكيمي وإغلاق النزاع', 'تم تنفيذ القسمة المالية وإشعار الطرفين بقرار الإدارة الملزم.', 'success');
  };

  return (
    <WaslaContext.Provider
      value={{
        // Authentication & Session
        isAuthenticated,
        setIsAuthenticated,
        login,
        register,
        authenticateUser,
        registerAccount,

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

        // Persistent Data Stores
        accounts,
        disputes,
        financialRecords,

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

        // Bilateral Contract Actions
        createContract,
        approveContract,
        requestContractRevision,

        // Dispute Actions
        openDispute,
        submitDisputeEvidence,
        proposeDisputeSettlement,
        respondToDisputeProposal,
        escalateDisputeToAdmin,
        resolveDisputeByAdmin,

        // Financial Ledger Actions
        recordFinancialTransaction,

        // Other Actions
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
