import React from 'react';
import { useTrustTagStore } from '../../store/trustTagStore';
import { authService } from '../../services/authService';
import { Menu, ChevronRight, Sparkles } from 'lucide-react';

interface AppHeaderProps {
  onToggleMobileSidebar: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleMobileSidebar }) => {
  const { activePage, setPage, launchHackathonMismatchDemo } = useTrustTagStore();
  const user = authService.getUser();

  const pageTitles: Record<string, string> = {
    dashboard: 'Dashboard',
    'create-tag': 'Create Agreement',
    'agreement-review': 'Review Requirements',
    'evidence-upload': 'Upload Evidence',
    'verification-processing': 'Processing Telemetry',
    'verification-result': 'Verification Workspace',
    'tag-details': 'Case File',
    history: 'Agreements',
    activity: 'Audit Feed',
    settings: 'Settings & API',
  };

  return (
    <header className="h-14 border-b border-[#E4E7EC] bg-[#FFFFFF] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-[6px] text-[#667085] hover:text-[#111318] hover:bg-[#F2F4F7] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 text-xs text-[#667085]">
          <span
            onClick={() => setPage('dashboard')}
            className="hover:text-[#111318] cursor-pointer font-medium"
          >
            TrustTag
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#98A2B3]" />
          <span className="text-[#111318] font-semibold">
            {pageTitles[activePage] || activePage}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => launchHackathonMismatchDemo()}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#EEF4FF] hover:bg-[#D0E2FF] text-[#174EA6] font-mono text-[11px] font-semibold tracking-wide border border-[#D0E2FF] transition-colors cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-[#174EA6]" />
          <span>Quick Demo: White vs Blue</span>
        </button>

        <div
          onClick={() => setPage('settings')}
          className="flex items-center gap-2 pl-3 border-l border-[#E4E7EC] cursor-pointer"
        >
          <span className="text-xs font-medium text-[#111318] hidden md:inline">
            {user.name}
          </span>
          <div className="w-7 h-7 rounded-[6px] bg-[#111318] text-white flex items-center justify-center font-mono text-[11px] font-bold shadow-xs">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};
