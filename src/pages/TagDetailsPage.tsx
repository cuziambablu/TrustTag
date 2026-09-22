import React, { useState } from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { StatusBadge } from '../components/common/StatusBadge';
import { ReportModal } from '../components/ui/ReportModal';

export const TagDetailsPage: React.FC = () => {
  const { tags, selectedTagId, setPage } = useTrustTagStore();
  const [isReportOpen, setIsReportOpen] = useState(false);

  const tag = tags.find((t) => t.id === selectedTagId) || tags[0];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 font-sans">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCDCD6] pb-4">
        <button
          onClick={() => setPage('dashboard')}
          className="text-xs font-mono text-[#6B6B67] hover:text-[#171717] cursor-pointer"
        >
          ← Return to Dashboard
        </button>

        <div className="flex items-center gap-2">
          {tag.verification && (
            <button
              onClick={() => setPage('verification-result')}
              className="py-1.5 px-3 rounded-[3px] bg-[#FFFFFF] hover:bg-[#F0F0EB] text-[#171717] border border-[#DCDCD6] font-mono text-xs cursor-pointer"
            >
              View Verification Result →
            </button>
          )}

          <button
            onClick={() => setIsReportOpen(true)}
            className="py-1.5 px-4 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Audit Certificate
          </button>
        </div>
      </div>

      {/* Digital Case File Card */}
      <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-6 sm:p-8 font-mono text-xs shadow-sm">
        {/* Case File Header */}
        <div className="border-b border-[#DCDCD6] pb-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#6B6B67] uppercase tracking-wider">
              DIGITAL CASE FILE
            </span>
            <StatusBadge status={tag.status} size="sm" />
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <h1 className="text-xl font-bold text-[#171717]">
              {tag.id}
            </h1>
            <span className="font-semibold text-sm text-[#171717] uppercase">
              {tag.service}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-4 text-[#6B6B67] text-[11px]">
            <span>PROVIDER: <strong className="text-[#171717]">{tag.provider.name}</strong></span>
            <span>CUSTOMER: <strong className="text-[#171717]">{tag.customer.name}</strong></span>
            <span>CREATED: <strong className="text-[#171717]">{tag.createdAt}</strong></span>
          </div>
        </div>

        {/* Section 1: Agreement Specification */}
        <div className="space-y-3 mb-6">
          <span className="text-[10px] uppercase text-[#6B6B67] block font-semibold">
            AGREEMENT SPECIFICATION
          </span>

          <div className="border border-[#DCDCD6] rounded-[4px] divide-y divide-[#DCDCD6]">
            <div className="p-3 flex justify-between">
              <span className="text-[#6B6B67]">TASK</span>
              <span className="font-semibold text-[#171717]">{tag.agreement.task}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-[#6B6B67]">COLOR</span>
              <span className="font-semibold text-[#171717]">{tag.agreement.color || 'White'}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-[#6B6B67]">PRICE</span>
              <span className="font-semibold text-[#171717]">{tag.agreement.price}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-[#6B6B67]">DEADLINE</span>
              <span className="font-semibold text-[#171717]">{tag.agreement.deadline}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-[#6B6B67]">FINISH</span>
              <span className="font-semibold text-[#171717]">{tag.agreement.finish || 'Matte'}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Evidence */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-[#6B6B67] font-semibold">
              SUBMITTED EVIDENCE
            </span>
            <span className="text-[11px] text-[#6B6B67]">
              {tag.evidence ? '1 IMAGE ATTACHED' : '0 EVIDENCE ATTACHED'}
            </span>
          </div>

          {tag.evidence ? (
            <div className="border border-[#DCDCD6] rounded-[4px] p-4 bg-[#F7F7F4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-12 rounded-[2px] overflow-hidden border border-[#DCDCD6] bg-[#151515] shrink-0">
                  <img
                    src={tag.evidence.url}
                    alt="Evidence thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-semibold text-[#171717] block">
                    {tag.evidence.fileName}
                  </span>
                  <span className="text-[10px] text-[#6B6B67]">
                    Uploaded {tag.evidence.uploadedAt} • Good Quality
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPage('verification-result')}
                className="text-xs text-[#1D4ED8] hover:underline"
              >
                Inspect Image →
              </button>
            </div>
          ) : (
            <div className="p-4 border border-dashed border-[#DCDCD6] text-center text-[#6B6B67]">
              No evidence uploaded yet.
            </div>
          )}
        </div>

        {/* Section 3: Verification */}
        <div className="space-y-3 pt-4 border-t border-[#DCDCD6]">
          <span className="text-[10px] uppercase text-[#6B6B67] block font-semibold">
            VERIFICATION AUDIT
          </span>

          {tag.verification ? (
            <div className="p-4 border border-[#DCDCD6] rounded-[4px] bg-[#F7F7F4] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#171717]">
                  STATUS: {tag.verification.overallStatus.toUpperCase()}
                </span>
                <span className="text-[#1D4ED8] font-bold">
                  {tag.verification.confidence}% CONFIDENCE
                </span>
              </div>
              <p className="text-[#6B6B67] font-sans text-xs leading-relaxed">
                {tag.verification.summary}
              </p>
              <div className="pt-2 text-right">
                <button
                  onClick={() => setPage('verification-result')}
                  className="text-xs font-mono text-[#171717] font-bold hover:underline"
                >
                  Open Full Inspection Matrix →
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 border border-[#DCDCD6] rounded-[4px] bg-[#F7F7F4] text-[#6B6B67]">
              Awaiting completed work proof before triggering AI verification.
            </div>
          )}
        </div>
      </div>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        tag={tag}
      />
    </div>
  );
};
