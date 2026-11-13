import React from 'react';
import { useWasla } from '../../context/WaslaContext';
import {
  Search,
  Building,
  Bell,
  Mail,
  ArrowDownLeft,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const FreelancerHeader = () => {
  const { freelancerUser, openModal, navigateTo } = useWasla();

  return (
    <header className="bg-white border-b border-slate-200/90 h-20 px-6 flex items-center justify-between sticky top-8 z-20 font-sans" dir="rtl">
      {/* Search Input */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="البحث في المشاريع الأكاديمية، المهارات، أو العملاء..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-10 pl-4 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
        </div>
      </div>

      {/* Left items: Balance, notifications, user profile */}
      <div className="flex items-center gap-4">
        {/* Available Kuraimi Balance Pill */}
        <div
          onClick={() => openModal('instant-withdrawal')}
          className="bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200/80 rounded-xl px-3.5 py-1.5 flex items-center gap-2.5 cursor-pointer transition-colors"
          title="انقر للسحب الفوري للأرباح"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-700">
            <Building className="w-4 h-4" />
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block font-normal leading-tight">
              الرصيد المتاح (الكريمي)
            </span>
            <span className="text-xs font-black text-emerald-800 tracking-tight">
              {freelancerUser.balanceYER.toLocaleString()} ر.ي
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center gap-1.5 border-x border-slate-200 px-3">
          <button
            onClick={() => navigateTo('freelancer-jobs')}
            className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-600 relative transition-colors"
            title="الإشعارات"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-rose-500" />
          </button>

          <button
            onClick={() => navigateTo('freelancer-contact')}
            className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
            title="الرسائل وقنوات التواصل"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>

        {/* User Profile Info */}
        <div
          onClick={() => navigateTo('freelancer-overview')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-1 justify-end">
              <span className="text-xs font-black text-[#0B192C] group-hover:text-teal-600 transition-colors">
                {freelancerUser.name}
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            </div>
            <span className="text-[10px] text-slate-400 block font-normal">
              {freelancerUser.title}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-500 shadow-xs">
            <img
              src={freelancerUser.avatar}
              alt={freelancerUser.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default FreelancerHeader;

