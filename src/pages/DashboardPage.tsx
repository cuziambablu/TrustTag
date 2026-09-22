import React from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { StatusBadge } from '../components/common/StatusBadge';

export const DashboardPage: React.FC = () => {
  const { tags, setPage, selectTag, launchDemoScenario } = useTrustTagStore();

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
    <div className="space-y-8 max-w-6xl mx-auto pb-16 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DCDCD6] pb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] font-semibold">
            DASHBOARD // SEPTEMBER 22, 2026
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111] mt-1">
            Good evening.
          </h1>
          <p className="text-sm text-[#6B6B67] mt-0.5">
            Here's what's happening with your agreements.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={() => launchDemoScenario('mismatch_detected')}
            className="py-2 px-3.5 rounded-[4px] bg-[#FFFFFF] hover:bg-[#F0F0EB] text-[#111111] border border-[#DCDCD6] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Try Live Demo
          </button>

          <button
            onClick={() => setPage('create-tag')}
            className="py-2 px-4 rounded-[4px] bg-[#111111] hover:bg-[#2E2E2E] text-white font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            + Create Agreement
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px]">
          <span className="text-[10px] text-[#6B6B67] uppercase block mb-1">
            ACTIVE AGREEMENTS
          </span>
          <span className="text-2xl font-extrabold text-[#111111] block">12</span>
          <span className="text-[10px] text-[#8F8F89] mt-1 block">Live contracts</span>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px]">
          <span className="text-[10px] text-[#6B6B67] uppercase block mb-1">
            AWAITING VERIFICATION
          </span>
          <span className="text-2xl font-extrabold text-[#B45309] block">3</span>
          <span className="text-[10px] text-[#8F8F89] mt-1 block">Pending proof</span>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px]">
          <span className="text-[10px] text-[#6B6B67] uppercase block mb-1">
            VERIFIED
          </span>
          <span className="text-2xl font-extrabold text-[#15803D] block">8</span>
          <span className="text-[10px] text-[#8F8F89] mt-1 block">Compliant delivery</span>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px]">
          <span className="text-[10px] text-[#6B6B67] uppercase block mb-1">
            NEEDS REVIEW
          </span>
          <span className="text-2xl font-extrabold text-[#B91C1C] block">1</span>
          <span className="text-[10px] text-[#8F8F89] mt-1 block">Discrepancy flagged</span>
        </div>
      </div>

      {/* Recent Agreements Section */}
      <div className="space-y-3 font-mono">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            RECENT AGREEMENTS
          </h2>
          <button
            onClick={() => setPage('history')}
            className="text-xs text-[#1D4ED8] hover:underline"
          >
            View All ({tags.length}) →
          </button>
        </div>

        <div className="border border-[#DCDCD6] rounded-[4px] bg-[#FFFFFF] overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#F7F7F4] border-b border-[#DCDCD6] text-[#6B6B67] text-[10px] uppercase">
                <th className="py-2.5 px-4 font-semibold">SERVICE</th>
                <th className="py-2.5 px-4 font-semibold">COUNTERPARTY</th>
                <th className="py-2.5 px-4 font-semibold">PRICE</th>
                <th className="py-2.5 px-4 font-semibold">DEADLINE</th>
                <th className="py-2.5 px-4 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEBE6]">
              {tags.map((tag) => (
                <tr
                  key={tag.id}
                  onClick={() => handleOpenTag(tag.id)}
                  className="hover:bg-[#F7F7F4] transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-sans font-semibold text-[#111111]">
                    <span className="block">{tag.service}</span>
                    <span className="text-[10px] font-mono text-[#8F8F89]">{tag.id}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#6B6B67]">
                    {tag.provider.name}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#111111]">
                    {tag.agreement.price}
                  </td>
                  <td className="py-3.5 px-4 text-[#6B6B67]">
                    {tag.agreement.deadline}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <StatusBadge status={tag.status} size="sm" />
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
