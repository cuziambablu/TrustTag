import React from 'react';
import { TrustTagLogo } from '../branding/TrustTagLogo';
import { useTrustTagStore, AppPage } from '../../store/trustTagStore';
import { authService } from '../../services/authService';

interface SidebarProps {
  className?: string;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  className = '',
  onMobileClose
}) => {
  const { activePage, setPage } = useTrustTagStore();
  const user = authService.getUser();

  const navItems: Array<{
    page: AppPage;
    label: string;
    count?: string;
  }> = [
    { page: 'dashboard', label: 'Dashboard' },
    { page: 'history', label: 'Agreements', count: '12' },
    { page: 'verification-result', label: 'Verification' },
    { page: 'activity', label: 'Activity' },
    { page: 'settings', label: 'Settings' }
  ];

  const handleNav = (page: AppPage) => {
    setPage(page);
    if (onMobileClose) onMobileClose();
  };

  return (
    <aside className={`w-60 h-full bg-[#FFFFFF] border-r border-[#DCDCD6] flex flex-col justify-between p-4 ${className}`}>
      {/* Top Brand & Navigation */}
      <div className="space-y-6">
        <div className="px-2 pt-1 pb-2">
          <TrustTagLogo
            size="md"
            onClick={() => handleNav('dashboard')}
          />
        </div>

        <nav className="space-y-0.5">
          <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-[#8F8F89] font-semibold block mb-2">
            PLATFORM
          </span>
          {navItems.map((item) => {
            const isActive = activePage === item.page;

            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.page)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-[3px] transition-colors relative cursor-pointer ${
                  isActive
                    ? 'bg-[#F0F0EB] text-[#111111] font-semibold'
                    : 'text-[#6B6B67] hover:text-[#111111] hover:bg-[#F7F7F4]'
                }`}
              >
                {/* Active vertical cobalt accent line */}
                {isActive && (
                  <span className="absolute left-0 top-1 bottom-1 w-[2.5px] bg-[#1D4ED8] rounded-r-[1px]" />
                )}
                <span>{item.label}</span>
                {item.count && (
                  <span className="text-[10px] font-mono text-[#8F8F89]">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className="pt-4 border-t border-[#DCDCD6]">
        <div
          onClick={() => handleNav('settings')}
          className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#6B6B67] hover:text-[#111111] rounded-[3px] cursor-pointer hover:bg-[#F7F7F4]"
        >
          <div className="w-5 h-5 rounded-[2px] bg-[#111111] text-white flex items-center justify-center font-mono text-[10px] font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 truncate text-left">
            <span className="text-[#111111] font-semibold block leading-tight">{user.name}</span>
            <span className="text-[10px] text-[#8F8F89] font-mono block">Operator</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
