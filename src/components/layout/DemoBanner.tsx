import React from 'react';
import { useTrustTagStore } from '../../store/trustTagStore';

export const DemoBanner: React.FC = () => {
  const {
    activePage,
    setPage,
    launchHackathonMismatchDemo,
    submitEvidenceAndVerify,
    resetToDraft
  } = useTrustTagStore();

  return (
    <aside aria-label="Demo controls" className="bg-[#151515] text-[#DCDCD6] border-b border-[#2E2E2E] px-4 sm:px-8 py-2 text-xs font-mono sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
          <span className="text-white font-semibold tracking-wider uppercase text-[11px]">
            HACKATHON DEMO CONTROLS
          </span>
        </div>

        {/* Right: Quick Triggers */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => launchHackathonMismatchDemo()}
            className="px-2.5 py-1 rounded-[3px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-medium text-[11px] tracking-wider uppercase transition-colors cursor-pointer"
          >
            ▶ Run Mismatch Demo (White → Blue)
          </button>

          <button
            onClick={() => {
              resetToDraft();
              setPage('evidence-upload');
              submitEvidenceAndVerify('white-room');
            }}
            className="px-2.5 py-1 rounded-[3px] bg-[#262626] hover:bg-[#333333] text-[#DCDCD6] hover:text-white font-medium text-[11px] tracking-wider uppercase transition-colors cursor-pointer"
          >
            Test Verified Flow
          </button>

          <button
            onClick={() => {
              resetToDraft();
              setPage('dashboard');
            }}
            className="px-2 py-1 rounded-[3px] bg-transparent hover:bg-[#262626] text-[#8F8F89] hover:text-white text-[11px] transition-colors cursor-pointer"
          >
            Reset
          </button>

          <div className="flex items-center gap-1 pl-2 border-l border-[#2E2E2E]">
            <span className="text-[10px] text-[#8F8F89] hidden md:inline">VIEW:</span>
            <select
              value={activePage}
              onChange={(e) => setPage(e.target.value as any)}
              aria-label="Select view"
              className="bg-[#222222] text-[#DCDCD6] text-[11px] rounded-[3px] px-2 py-0.5 border border-[#333333] focus:outline-none cursor-pointer"
            >
              <option value="landing">1. Landing Page</option>
              <option value="dashboard">2. Dashboard</option>
              <option value="create-tag">3. Create TrustTag</option>
              <option value="agreement-review">4. Agreement Review</option>
              <option value="evidence-upload">5. Evidence Upload</option>
              <option value="verification-processing">6. Verification Processing</option>
              <option value="verification-result">7. Verification Result (Mismatch)</option>
              <option value="tag-details">8. TrustTag Record</option>
              <option value="history">9. History Ledger</option>
              <option value="settings">10. Settings</option>
              <option value="login">11. Login</option>
              <option value="signup">12. Sign Up</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
};
