import React from 'react';
import { useTrustTagStore } from '../../store/trustTagStore';
import { LayoutDashboard, FileText, CheckCircle2, History, Settings } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activePage, setPage } = useTrustTagStore();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'history', label: 'Agreements', icon: FileText },
    { id: 'verification-result', label: 'Verify', icon: CheckCircle2 },
    { id: 'activity', label: 'Activity', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF] border-t border-[#E4E7EC] shadow-[0_-2px_10px_rgba(0,0,0,0.03)] px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setPage(item.id as any)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-[6px] transition-colors cursor-pointer ${
              isActive
                ? 'text-[#174EA6]'
                : 'text-[#667085] hover:text-[#111318]'
            }`}
          >
            <Icon className={`w-4 h-4 mb-1 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
            <span className={`text-[10px] tracking-tight ${isActive ? 'font-semibold' : 'font-normal'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
