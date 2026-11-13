import React from 'react';
import { WaslaProvider, useWasla } from './context/WaslaContext';
import RoleSwitcherBanner from './components/common/RoleSwitcherBanner';
import ToastContainer from './components/common/Toast';
import GlobalModals from './components/modals/GlobalModals';

// Screens
import LandingPage from './components/landing/LandingPage';
import RoleSelectionView from './components/auth/RoleSelectionView';
import LoginView from './components/auth/LoginView';
import RegisterView from './components/auth/RegisterView';
import ForgotPasswordView from './components/auth/ForgotPasswordView';
import FreelancerLayout from './components/freelancer/FreelancerLayout';
import StudentAltView from './components/freelancer/StudentAltView';
import ClientDashboard from './components/client/ClientDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

const AppContent = () => {
  const { activeScreen } = useWasla();

  const renderScreen = () => {
    switch (activeScreen) {
      case 'landing':
        return <LandingPage />;
      case 'role-selection':
        return <RoleSelectionView />;
      case 'login':
        return <LoginView />;
      case 'register':
        return <RegisterView />;
      case 'forgot-password':
        return <ForgotPasswordView />;
      case 'freelancer-overview':
      case 'freelancer-jobs':
      case 'freelancer-portfolio':
      case 'freelancer-contact':
      case 'freelancer-financial':
        return <FreelancerLayout />;
      case 'student-alt':
        return <StudentAltView />;
      case 'client-dashboard':
        return <ClientDashboard />;
      case 'admin-panel':
        return <AdminDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans" dir="rtl">
      {/* 1. Quick Navigation Switcher Bar for testing all screens */}
      <RoleSwitcherBanner />

      {/* 2. Active Screen View */}
      <div className="flex-1 flex flex-col">
        {renderScreen()}
      </div>

      {/* 3. Global Interactive Modals */}
      <GlobalModals />

      {/* 4. Toast Notifications Stack */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <WaslaProvider>
      <AppContent />
    </WaslaProvider>
  );
}
