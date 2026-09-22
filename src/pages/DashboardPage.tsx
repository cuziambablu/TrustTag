import React from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { StatusBadge } from '../components/common/StatusBadge';
import { Plus, Upload, CheckCircle2, ArrowRight, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { tags, activities, setPage, selectTag, launchDemoScenario } = useTrustTagStore();

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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E4E7EC] pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#667085] font-semibold">
            DASHBOARD OVERVIEW
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111318] mt-1">
            Good evening.
          </h1>
          <p className="text-sm text-[#667085] mt-0.5">
            Here's what's happening with your agreements.
          </p>
        </div>

        {/* Quick Actions Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setPage('create-tag')}
            className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer min-h-[40px]"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Create Agreement</span>
          </button>

          <button
            onClick={() => setPage('evidence-upload')}
            className="inline-flex items-center gap-1.5 py-2 px-3 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F2F4F7] text-[#111318] border border-[#E4E7EC] text-xs font-medium transition-colors cursor-pointer min-h-[40px]"
          >
            <Upload className="w-3.5 h-3.5 text-[#667085]" />
            <span>Upload Evidence</span>
          </button>

          <button
            onClick={() => launchDemoScenario('perfect_match')}
            className="inline-flex items-center gap-1.5 py-2 px-3 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F2F4F7] text-[#111318] border border-[#E4E7EC] text-xs font-medium transition-colors cursor-pointer min-h-[40px]"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Start Verification</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] shadow-xs">
          <span className="text-[11px] font-mono uppercase text-[#667085] font-medium block">
            ACTIVE AGREEMENTS
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#111318] block mt-1">4</span>
          <span className="text-[11px] text-[#98A2B3] mt-1 block">Total in flight</span>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] shadow-xs">
          <span className="text-[11px] font-mono uppercase text-[#667085] font-medium block">
            AWAITING EVIDENCE
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#111318] block mt-1">1</span>
          <span className="text-[11px] text-[#98A2B3] mt-1 block">Work ongoing</span>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] shadow-xs">
          <span className="text-[11px] font-mono uppercase text-[#15803D] font-medium block">
            VERIFIED
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#15803D] block mt-1">2</span>
          <span className="text-[11px] text-[#15803D]/80 mt-1 block">100% matched</span>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] shadow-xs">
          <span className="text-[11px] font-mono uppercase text-[#B45309] font-medium block">
            NEEDS REVIEW
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#B45309] block mt-1">1</span>
          <span className="text-[11px] text-[#B45309]/80 mt-1 block">Requires attention</span>
        </div>
      </div>

      {/* Main Grid: Recent Agreements (8 cols) + Activity Feed (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Agreements */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111318] font-mono">
              RECENT AGREEMENTS
            </h2>
            <button
              onClick={() => setPage('history')}
              className="text-xs font-semibold text-[#174EA6] hover:underline cursor-pointer"
            >
              View All ({tags.length}) →
            </button>
          </div>

          <div className="border border-[#E4E7EC] rounded-[8px] bg-[#FFFFFF] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F7F8FA] border-b border-[#E4E7EC] text-[#667085] font-mono uppercase text-[11px]">
                    <th className="py-2.5 px-4 font-semibold">Case ID</th>
                    <th className="py-2.5 px-4 font-semibold">Service</th>
                    <th className="py-2.5 px-4 font-semibold">Amount</th>
                    <th className="py-2.5 px-4 font-semibold">Status</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E7EC]">
                  {tags.slice(0, 4).map((tag) => (
                    <tr
                      key={tag.id}
                      onClick={() => handleOpenTag(tag.id)}
                      className="hover:bg-[#F7F8FA] transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-4 font-mono font-medium text-[#111318]">
                        {tag.id}
                      </td>
                      <td className="py-3 px-4 font-medium text-[#111318]">
                        <div>{tag.service}</div>
                        <div className="text-[10px] text-[#667085] font-mono">{tag.customer.name}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-[#111318]">
                        {tag.agreement.price}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={tag.status} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-[#174EA6] group-hover:translate-x-0.5 inline-block transition-transform">
                          →
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Activity Feed */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111318] font-mono">
              AUDIT FEED
            </h2>
            <button
              onClick={() => setPage('activity')}
              className="text-xs font-semibold text-[#174EA6] hover:underline cursor-pointer"
            >
              Full Log →
            </button>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-4 shadow-xs space-y-4">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs border-b border-[#F2F4F7] pb-3 last:border-0 last:pb-0">
                <div className="w-6 h-6 rounded-full bg-[#F7F8FA] border border-[#E4E7EC] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3 h-3 text-[#667085]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-[#111318] truncate block">
                      {act.action}
                    </span>
                    <span className="text-[10px] font-mono text-[#98A2B3] shrink-0">
                      {act.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#667085] truncate mt-0.5">
                    {act.serviceName}
                  </p>
                  <p className="text-[11px] text-[#98A2B3] mt-0.5 line-clamp-1 font-mono">
                    {act.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
