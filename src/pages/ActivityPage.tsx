import React from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { StatusBadge } from '../components/common/StatusBadge';

export const ActivityPage: React.FC = () => {
  const { activities, setPage, selectTag } = useTrustTagStore();

  const handleOpenRecord = (tagId: string) => {
    selectTag(tagId);
    setPage('verification-result');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 font-sans">
      <div className="border-b border-[#DCDCD6] pb-4">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
          SYSTEM ACTIVITY
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#111111] mt-0.5">
          Audit stream & verification logs.
        </h1>
        <p className="text-xs text-[#6B6B67] mt-0.5">
          Real-time record of captured agreements, submitted evidence files, and automated evaluation reports.
        </p>
      </div>

      <div className="border border-[#DCDCD6] bg-[#FFFFFF] rounded-[4px] overflow-hidden">
        <div className="divide-y divide-[#EBEBE6] font-mono text-xs">
          {activities.map((act) => (
            <div
              key={act.id}
              onClick={() => handleOpenRecord(act.trustTagId)}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F7F4] transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-[10px] text-[#8F8F89] w-24 shrink-0 pt-0.5">
                  {act.timestamp}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#111111]">{act.trustTagId}</span>
                    <span className="text-[#6B6B67]">({act.serviceName})</span>
                    <span className="text-[10px] font-semibold text-[#1D4ED8] uppercase">
                      • {act.action}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-[#6B6B67] mt-0.5">
                    {act.detail}
                  </p>
                </div>
              </div>

              <div className="self-end sm:self-center shrink-0">
                <StatusBadge status={act.status as any} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
