import React from 'react';
import { useTrustTagStore } from '../../store/trustTagStore';

export const DemoBanner: React.FC = () => {
  const {
    activePage,
    setPage,
    launchDemoScenario,
    resetToDraft
  } = useTrustTagStore();

  return (
    <aside aria-label="Demo controls" className="bg-[#111111] text-[#DCDCD6] border-b border-[#262626] px-4 sm:px-8 py-2 text-xs font-mono sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
          <span className="text-white font-semibold tracking-wider uppercase text-[11px]">
            HACKATHON DEMO
          </span>
          <span className="text-[#8F8F89] hidden md:inline text-[11px]">
            / 3 Prepared Scenarios
          </span>
        </div>

        {/* Right: 3 Scenario Quick Triggers */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => launchDemoScenario('perfect_match')}
            className="px-2.5 py-1 rounded-[3px] bg-[#15803D] hover:bg-[#166534] text-white font-medium text-[11px] tracking-wider uppercase transition-colors cursor-pointer"
            title="Scenario 1: AC Installation (4/4 Verified)"
          >
            1. Perfect Match
          </button>

          <button
            onClick={() => launchDemoScenario('mismatch_detected')}
            className="px-2.5 py-1 rounded-[3px] bg-[#B91C1C] hover:bg-[#991B1B] text-white font-medium text-[11px] tracking-wider uppercase transition-colors cursor-pointer"
            title="Scenario 2: Bedroom Painting (White vs Blue Mismatch)"
          >
            2. Mismatch Detected
          </button>

          <button
            onClick={() => launchDemoScenario('insufficient_evidence')}
            className="px-2.5 py-1 rounded-[3px] bg-[#B45309] hover:bg-[#92400E] text-white font-medium text-[11px] tracking-wider uppercase transition-colors cursor-pointer"
            title="Scenario 3: Living Room Painting (Needs Review / Missing Ceiling Evidence)"
          >
            3. Insufficient Evidence
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

          {/* Quick View Switcher */}
          <div className="flex items-center gap-1 pl-2 border-l border-[#2E2E2E]">
            <span className="text-[10px] text-[#8F8F89] hidden lg:inline">PAGE:</span>
            <select
              value={activePage}
              onChange={(e) => setPage(e.target.value as any)}
              aria-label="Select view"
              className="bg-[#1C1C1C] text-[#DCDCD6] text-[11px] rounded-[3px] px-2 py-0.5 border border-[#333333] focus:outline-none cursor-pointer"
            >
              <option value="landing">Home (Landing)</option>
              <option value="dashboard">Dashboard</option>
              <option value="create-tag">Create Agreement</option>
              <option value="agreement-review">Agreement Review</option>
              <option value="evidence-upload">Evidence Upload</option>
              <option value="verification-processing">Verification Processing</option>
              <option value="verification-result">Verification Report</option>
              <option value="tag-details">TrustTag Case File</option>
              <option value="history">Agreements Ledger</option>
              <option value="activity">Activity Log</option>
              <option value="settings">Settings</option>
              <option value="login">Login</option>
              <option value="signup">Sign Up</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
};
