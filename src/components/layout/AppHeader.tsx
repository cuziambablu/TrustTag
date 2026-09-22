import React from 'react';
import { useTrustTagStore } from '../../store/trustTagStore';
import { authService } from '../../services/authService';

interface AppHeaderProps {
  onToggleMobileSidebar: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleMobileSidebar }) => {
  const { activePage, setPage, launchHackathonMismatchDemo } = useTrustTagStore();
  const user = authService.getUser();

  return (
    <header className="h-14 border-b border-[#DCDCD6] bg-[#FFFFFF] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 rounded-[3px] text-[#6B6B67] hover:text-[#171717] hover:bg-[#F0F0EB] text-xs font-mono"
        >
          [ MENU ]
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[#6B6B67]">
          <span
            onClick={() => setPage('dashboard')}
            className="hover:text-[#171717] cursor-pointer"
          >
            TRUSTTAG
          </span>
          <span>/</span>
          <span className="text-[#171717] font-semibold uppercase">
            {activePage.replace('-', ' ')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => launchHackathonMismatchDemo()}
          className="px-2.5 py-1 rounded-[3px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-[11px] font-medium tracking-wider uppercase transition-colors cursor-pointer"
        >
          [ Demo: White vs Blue Mismatch ]
        </button>

        <div
          onClick={() => setPage('settings')}
          className="flex items-center gap-2 pl-3 border-l border-[#DCDCD6] cursor-pointer"
        >
          <span className="text-xs font-mono text-[#171717] font-medium hidden sm:inline">
            {user.name}
          </span>
          <div className="w-5 h-5 rounded-[2px] bg-[#171717] text-white flex items-center justify-center font-mono text-[10px] font-bold">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};
