import React from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { StatusBadge } from '../components/common/StatusBadge';
import { Clock } from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const { activities, setPage, selectTag } = useTrustTagStore();

  const handleOpenRecord = (tagId: string) => {
    selectTag(tagId);
    setPage('verification-result');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 font-sans">
      <div className="border-b border-[#E4E7EC] pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] block font-semibold">
          SYSTEM AUDIT STREAM
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#111318] mt-1">
          Activity & Verification Logs
        </h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Real-time record of locked agreements, submitted evidence files, and automated evaluation reports.
        </p>
      </div>

      <div className="border border-[#E4E7EC] bg-[#FFFFFF] rounded-[8px] overflow-hidden shadow-xs">
        <div className="divide-y divide-[#E4E7EC] text-xs">
          {activities.map((act) => (
            <div
              key={act.id}
              onClick={() => handleOpenRecord(act.trustTagId)}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F8FA] transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#F7F8FA] border border-[#E4E7EC] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#667085]" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-[#111318]">{act.trustTagId}</span>
                    <span className="text-[#667085] font-medium">{act.serviceName}</span>
                    <span className="text-[11px] font-semibold text-[#174EA6] font-mono">
                      • {act.action}
                    </span>
                  </div>
                  <p className="text-xs text-[#667085] mt-0.5 leading-relaxed">
                    {act.detail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <span className="text-[10px] font-mono text-[#98A2B3]">
                  {act.timestamp}
                </span>
                <StatusBadge status={act.status as any} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
