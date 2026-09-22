import React from 'react';
import { TrustTagLogo } from '../branding/TrustTagLogo';
import { useTrustTagStore, AppPage } from '../../store/trustTagStore';
import { authService } from '../../services/authService';
import { LayoutDashboard, FileText, CheckCircle2, History, Settings, ExternalLink } from 'lucide-react';

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
    icon: React.ComponentType<{ className?: string }>;
    count?: string;
  }> = [
    { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { page: 'history', label: 'Agreements', icon: FileText, count: '12' },
    { page: 'verification-result', label: 'Verification', icon: CheckCircle2 },
    { page: 'activity', label: 'Activity', icon: History },
    { page: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNav = (page: AppPage) => {
    setPage(page);
    if (onMobileClose) onMobileClose();
  };

  return (
    <aside className={`w-64 h-full bg-[#FFFFFF] border-r border-[#E4E7EC] flex flex-col justify-between p-4 ${className}`}>
      {/* Top Brand & Navigation */}
      <div className="space-y-6">
        <div className="px-2 pt-1 pb-1">
          <TrustTagLogo
            size="md"
            onClick={() => handleNav('dashboard')}
          />
        </div>

        <nav className="space-y-1">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#98A2B3] block mb-2">
            Workspace
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.page;

            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.page)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-[6px] transition-colors relative cursor-pointer ${
                  isActive
                    ? 'bg-[#EEF4FF] text-[#174EA6] font-semibold'
                    : 'text-[#667085] hover:text-[#111318] hover:bg-[#F7F8FA]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#174EA6]' : 'text-[#667085]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-[4px] font-mono ${
                    isActive ? 'bg-[#174EA6]/10 text-[#174EA6]' : 'bg-[#F2F4F7] text-[#667085]'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Landing link */}
      <div className="pt-4 border-t border-[#E4E7EC] space-y-2">
        <button
          onClick={() => handleNav('landing')}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-[#667085] hover:text-[#111318] rounded-[6px] hover:bg-[#F7F8FA] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </span>
          <span className="text-[10px] text-[#98A2B3]">↗</span>
        </button>

        <div
          onClick={() => handleNav('settings')}
          className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#667085] hover:text-[#111318] rounded-[6px] cursor-pointer hover:bg-[#F7F8FA]"
        >
          <div className="w-7 h-7 rounded-[6px] bg-[#111318] text-white flex items-center justify-center font-mono text-[11px] font-bold shadow-xs">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 truncate text-left">
            <span className="text-[#111318] font-semibold block leading-tight">{user.name}</span>
            <span className="text-[11px] text-[#98A2B3] truncate block">{user.email}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
