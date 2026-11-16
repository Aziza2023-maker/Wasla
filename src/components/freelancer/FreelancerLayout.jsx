import React from 'react';
import { useWasla } from '../../context/WaslaContext';
import FreelancerSidebar from './FreelancerSidebar';
import FreelancerHeader from './FreelancerHeader';
import FreelancerOverview from './FreelancerOverview';
import FreelancerServicesManager from './FreelancerServicesManager';
import JobMarketplace from './JobMarketplace';
import PortfolioManager from './PortfolioManager';
import DirectContactHub from './DirectContactHub';
import FinancialRecordsView from '../common/FinancialRecordsView';
import DisputesHub from '../common/DisputesHub';

export const FreelancerLayout = () => {
  const { activeScreen } = useWasla();

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'freelancer-overview':
        return <FreelancerOverview />;
      case 'freelancer-services':
        return <FreelancerServicesManager />;
      case 'freelancer-jobs':
        return <JobMarketplace />;
      case 'freelancer-portfolio':
        return <PortfolioManager />;
      case 'freelancer-contact':
        return <DirectContactHub />;
      case 'freelancer-financial':
        return <FinancialRecordsView title="الحساب المالي وكشوفات الصرف والوساطة" customRole="freelancer" />;
      case 'freelancer-disputes':
        return <DisputesHub title="مركز النزاعات والتحكيم للمستقل" />;
      default:
        return <FreelancerOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans" dir="rtl">
      {/* Persistent Dark Navy Right Sidebar */}
      <FreelancerSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <FreelancerHeader />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {renderActiveScreen()}
        </main>

        <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-400 text-center">
          <span>منصة وصلة © 2025. منصة العمل الحر لطلاب الجامعات اليمنية (صنعاء • عدن • تعز • حضرموت).</span>
        </footer>
      </div>
    </div>
  );
};

export default FreelancerLayout;

