import React from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { StatusBadge } from '../components/common/StatusBadge';

export const DashboardPage: React.FC = () => {
  const { tags, setPage, selectTag, launchHackathonMismatchDemo } = useTrustTagStore();

  const handleOpenTag = (id: string) => {
    selectTag(id);
    const tag = tags.find((t) => t.id === id);
    if (tag?.status === 'mismatch' || tag?.status === 'verified') {
      setPage('verification-result');
    } else {
      setPage('tag-details');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DCDCD6] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] font-semibold">
              OVERVIEW // SEPTEMBER 22, 2026
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] mt-1">
            Agreement verification activity.
          </h1>
          <p className="text-xs text-[#6B6B67] mt-0.5">
            Active audit pipeline across current service contracts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => launchHackathonMismatchDemo()}
            className="py-2 px-3.5 rounded-[4px] bg-[#FFFFFF] hover:bg-[#F0F0EB] text-[#171717] border border-[#DCDCD6] font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Run Demo (White → Blue)
          </button>

          <button
            onClick={() => setPage('create-tag')}
            className="py-2 px-4 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            + Create TrustTag
          </button>
        </div>
      </div>

      {/* Compact Information Strip (Typography + Dividers, NOT giant cards) */}
      <div className="border border-[#DCDCD6] rounded-[4px] bg-[#FFFFFF] p-4 font-mono">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DCDCD6] text-center">
          <div className="py-2 sm:py-0 px-4">
            <span className="text-3xl font-extrabold text-[#171717] block">12</span>
            <span className="text-[10px] text-[#6B6B67] uppercase tracking-wider block mt-1">
              TOTAL AGREEMENTS
            </span>
          </div>

          <div className="py-2 sm:py-0 px-4">
            <span className="text-3xl font-extrabold text-[#15803D] block">8</span>
            <span className="text-[10px] text-[#6B6B67] uppercase tracking-wider block mt-1">
              VERIFIED COMPLIANT
            </span>
          </div>

          <div className="py-2 sm:py-0 px-4">
            <span className="text-3xl font-extrabold text-[#B91C1C] block">1</span>
            <span className="text-[10px] text-[#6B6B67] uppercase tracking-wider block mt-1">
              MISMATCH DETECTED
            </span>
          </div>

          <div className="py-2 sm:py-0 px-4">
            <span className="text-3xl font-extrabold text-[#B45309] block">3</span>
            <span className="text-[10px] text-[#6B6B67] uppercase tracking-wider block mt-1">
              PENDING EVIDENCE
            </span>
          </div>
        </div>
      </div>

      {/* Discrepancy Notice Strip */}
      <div className="p-3.5 border border-[#FECACA] bg-[#FEF2F2] rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
          <span className="font-bold text-[#991B1B]">
            ATTENTION REQUIRED ON TT-1042:
          </span>
          <span className="text-[#6B6B67]">
            Delivered bedroom photo exhibits Blue paint vs agreed White (92% confidence).
          </span>
        </div>
        <button
          onClick={() => handleOpenTag('TT-1042')}
          className="self-start sm:self-auto px-2.5 py-1 rounded-[2px] bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-semibold text-[11px] tracking-wider uppercase cursor-pointer"
        >
          Inspect Discrepancy →
        </button>
      </div>

      {/* Recent TrustTags Section Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-[#171717]">
            RECENT TRUSTTAGS
          </h2>
          <button
            onClick={() => setPage('history')}
            className="text-xs font-mono text-[#1D4ED8] hover:underline"
          >
            View Complete Ledger ({tags.length}) →
          </button>
        </div>

        <div className="border border-[#DCDCD6] rounded-[4px] bg-[#FFFFFF] overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#F7F7F4] border-b border-[#DCDCD6] text-[#6B6B67] text-[10px] uppercase">
                <th className="py-2.5 px-4 font-semibold">ID</th>
                <th className="py-2.5 px-4 font-semibold">SERVICE</th>
                <th className="py-2.5 px-4 font-semibold">COUNTERPARTY</th>
                <th className="py-2.5 px-4 font-semibold">CREATED</th>
                <th className="py-2.5 px-4 font-semibold">STATUS</th>
                <th className="py-2.5 px-4 font-semibold text-right">CONFIDENCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEBE6]">
              {tags.map((tag) => (
                <tr
                  key={tag.id}
                  onClick={() => handleOpenTag(tag.id)}
                  className="hover:bg-[#F7F7F4] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-bold text-[#171717]">
                    {tag.id}
                  </td>
                  <td className="py-3 px-4 font-sans font-medium text-[#171717]">
                    {tag.service}
                  </td>
                  <td className="py-3 px-4 text-[#6B6B67]">
                    {tag.provider.name}
                  </td>
                  <td className="py-3 px-4 text-[#6B6B67]">
                    {tag.createdAt}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={tag.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-[#171717]">
                    {tag.verification ? `${tag.verification.confidence}%` : `${tag.agreement.confidenceScore}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
