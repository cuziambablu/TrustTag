import React from 'react';
import { useTrustTagStore } from '../../store/trustTagStore';
import { Play, Check, AlertTriangle, HelpCircle, RotateCcw } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const {
    activePage,
    setPage,
    launchDemoScenario,
    resetToDraft
  } = useTrustTagStore();

  return (
    <aside aria-label="Demo controls" className="bg-[#0B1220] text-[#98A2B3] border-b border-[#1E293B] px-4 sm:px-6 py-2 text-xs font-mono sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#174EA6] animate-pulse" />
          <span className="text-white font-semibold tracking-wider uppercase text-[11px]">
            Interactive Evaluator
          </span>
          <span className="text-[#64748B] hidden md:inline text-[11px]">
            // 3 Live Scenarios
          </span>
        </div>

        {/* Right: 3 Scenario Quick Triggers */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => launchDemoScenario('perfect_match')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#15803D] hover:bg-[#166534] text-white font-medium text-[11px] tracking-wide transition-colors cursor-pointer shadow-xs"
            title="Scenario 1: AC Installation (4/4 Match)"
          >
            <Check className="w-3 h-3 stroke-[2.5]" />
            <span>01 MATCH</span>
          </button>

          <button
            onClick={() => launchDemoScenario('mismatch_detected')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#B42318] hover:bg-[#912018] text-white font-medium text-[11px] tracking-wide transition-colors cursor-pointer shadow-xs"
            title="Scenario 2: Bedroom Painting (White vs Blue Mismatch)"
          >
            <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
            <span>02 MISMATCH</span>
          </button>

          <button
            onClick={() => launchDemoScenario('insufficient_evidence')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#B45309] hover:bg-[#92400E] text-white font-medium text-[11px] tracking-wide transition-colors cursor-pointer shadow-xs"
            title="Scenario 3: Living Room Painting (Needs Review / Missing Ceiling Evidence)"
          >
            <HelpCircle className="w-3 h-3 stroke-[2.5]" />
            <span>03 NEEDS REVIEW</span>
          </button>

          <button
            onClick={() => {
              resetToDraft();
              setPage('dashboard');
            }}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-[4px] bg-transparent hover:bg-[#1E293B] text-[#98A2B3] hover:text-white text-[11px] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Quick View Switcher */}
          <div className="flex items-center gap-1 pl-2 border-l border-[#1E293B]">
            <span className="text-[10px] text-[#64748B] hidden lg:inline">VIEW:</span>
            <select
              value={activePage}
              onChange={(e) => setPage(e.target.value as any)}
              aria-label="Select view"
              className="bg-[#111A2E] text-[#E2E8F0] text-[11px] rounded-[4px] px-2 py-0.5 border border-[#1E293B] focus:outline-none focus:border-[#174EA6] cursor-pointer"
            >
              <option value="landing">Landing Page</option>
              <option value="dashboard">Dashboard</option>
              <option value="create-tag">Create Agreement</option>
              <option value="agreement-review">Review Requirements</option>
              <option value="evidence-upload">Evidence Upload</option>
              <option value="verification-processing">Processing Pipeline</option>
              <option value="verification-result">Verification Workspace</option>
              <option value="tag-details">TrustTag Case File</option>
              <option value="history">Agreements Ledger</option>
              <option value="activity">Activity Feed</option>
              <option value="settings">Settings & API</option>
              <option value="login">Sign In</option>
              <option value="signup">Sign Up</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
};
