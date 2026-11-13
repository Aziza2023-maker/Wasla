import React from 'react';
import { WaslaProvider, useWasla } from './context/WaslaContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ToastContainer from './components/common/Toast';
import GlobalModals from './components/modals/GlobalModals';

// Auth Guards for Strict RBAC
import {
  ClientAuthGuard,
  FreelancerAuthGuard,
  AdminAuthGuard,
} from './components/auth/AuthGuards';

// Public & Community Screens
import LandingPage from './components/landing/LandingPage';
import ServicesPage from './components/public/ServicesPage';
import FreelancersDirectoryPage from './components/public/FreelancersDirectoryPage';
import SupportEscrowPage from './components/public/SupportEscrowPage';
import CommunityPage from './components/public/CommunityPage';

// Authentication Screens
import RoleSelectionView from './components/auth/RoleSelectionView';
import LoginView from './components/auth/LoginView';
import RegisterView from './components/auth/RegisterView';
import ForgotPasswordView from './components/auth/ForgotPasswordView';

// Protected Role-Based Portals
import FreelancerLayout from './components/freelancer/FreelancerLayout';
import StudentAltView from './components/freelancer/StudentAltView';
import ClientDashboard from './components/client/ClientDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

const AppContent = () => {
  const { activeScreen } = useWasla();

  const renderScreen = () => {
    switch (activeScreen) {
      // 1. Public Pages
      case 'landing':
        return <LandingPage />;
      case 'services':
        return <ServicesPage />;
      case 'freelancers':
        return <FreelancersDirectoryPage />;
      case 'support':
        return <SupportEscrowPage />;
      case 'community':
        return <CommunityPage />;

      // 2. Authentication Flow
      case 'role-selection':
        return <RoleSelectionView />;
      case 'login':
        return <LoginView />;
      case 'register':
        return <RegisterView />;
      case 'forgot-password':
        return <ForgotPasswordView />;

      // 3. Protected Freelancer Portal (Student Role Guarded)
      case 'freelancer-overview':
      case 'freelancer-jobs':
      case 'freelancer-portfolio':
      case 'freelancer-contact':
      case 'freelancer-financial':
        return (
          <FreelancerAuthGuard>
            <FreelancerLayout />
          </FreelancerAuthGuard>
        );
      case 'student-alt':
        return (
          <FreelancerAuthGuard>
            <StudentAltView />
          </FreelancerAuthGuard>
        );

      // 4. Protected Client Portal (Client Role Guarded)
      case 'client-dashboard':
        return (
          <ClientAuthGuard>
            <ClientDashboard />
          </ClientAuthGuard>
        );

      // 5. Protected Central Admin Portal (Admin Escrow Guarded)
      case 'admin-panel':
        return (
          <AdminAuthGuard>
            <AdminDashboard />
          </AdminAuthGuard>
        );

      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans" dir="rtl">
      {/* Active Screen View */}
      <div className="flex-1 flex flex-col">
        {renderScreen()}
      </div>

      {/* Global Interactive Modals (Escrow upload, Instant withdraw, Buffer settings, Verification, etc.) */}
      <GlobalModals />

      {/* Toast Notifications Stack */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <WaslaProvider>
        <AppContent />
      </WaslaProvider>
    </ErrorBoundary>
  );
}
