import React, { useState } from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { StatusBadge } from '../components/common/StatusBadge';
import { ReportModal } from '../components/ui/ReportModal';
import { ArrowLeft, Download, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const TagDetailsPage: React.FC = () => {
  const { tags, selectedTagId, setPage } = useTrustTagStore();
  const [isReportOpen, setIsReportOpen] = useState(false);

  const tag = tags.find((t) => t.id === selectedTagId) || tags[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 font-sans">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E7EC] pb-4">
        <button
          onClick={() => setPage('dashboard')}
          className="inline-flex items-center gap-1.5 text-xs text-[#667085] hover:text-[#111318] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </button>

        <div className="flex items-center gap-2.5">
          {tag.verification && (
            <button
              onClick={() => setPage('verification-result')}
              className="py-1.5 px-3 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F2F4F7] text-[#111318] border border-[#E4E7EC] text-xs font-semibold cursor-pointer shadow-xs"
            >
              View Verification Result →
            </button>
          )}

          <button
            onClick={() => setIsReportOpen(true)}
            className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-xs font-semibold cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Audit Certificate</span>
          </button>
        </div>
      </div>

      {/* Digital Case File Card */}
      <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 sm:p-8 text-xs shadow-xs space-y-6">
        {/* Case File Header */}
        <div className="border-b border-[#E4E7EC] pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#667085] font-semibold">
              DIGITAL CASE RECORD
            </span>
            <StatusBadge status={tag.status} size="sm" />
          </div>

          <div className="mt-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h1 className="text-xl font-extrabold text-[#111318] font-mono">
              {tag.id}
            </h1>
            <span className="font-semibold text-sm text-[#111318]">
              {tag.service}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-[#667085] text-[11px] font-mono">
            <span>PROVIDER: <strong className="text-[#111318] font-sans">{tag.provider.name}</strong></span>
            <span>CUSTOMER: <strong className="text-[#111318] font-sans">{tag.customer.name}</strong></span>
            <span>CREATED: <strong className="text-[#111318]">{tag.createdAt}</strong></span>
          </div>
        </div>

        {/* Section 1: Agreement Specification */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase text-[#667085] block font-semibold">
            AGREEMENT SPECIFICATION
          </span>

          <div className="border border-[#E4E7EC] rounded-[6px] divide-y divide-[#E4E7EC] font-mono">
            <div className="p-3 flex justify-between">
              <span className="text-[#667085]">TASK</span>
              <span className="font-semibold text-[#111318] font-sans">{tag.agreement.task}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-[#667085]">PRICE</span>
              <span className="font-semibold text-[#174EA6]">{tag.agreement.price}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-[#667085]">DEADLINE</span>
              <span className="font-semibold text-[#111318]">{tag.agreement.deadline}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-[#667085]">CATEGORY</span>
              <span className="font-semibold text-[#111318]">{tag.category}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Evidence */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#667085] font-semibold">
              SUBMITTED EVIDENCE
            </span>
            <span className="text-[11px] font-mono text-[#667085]">
              {tag.evidence ? '1 EVIDENCE FILE' : '0 EVIDENCE FILES'}
            </span>
          </div>

          {tag.evidence ? (
            <div className="border border-[#E4E7EC] rounded-[6px] p-4 bg-[#F7F8FA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-12 rounded-[4px] overflow-hidden border border-[#E4E7EC] bg-[#0B1220] shrink-0">
                  <img
                    src={tag.evidence.url}
                    alt="Evidence thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-semibold text-[#111318] block font-mono text-xs">
                    {tag.evidence.fileName}
                  </span>
                  <span className="text-[11px] text-[#667085]">
                    Uploaded {tag.evidence.uploadedAt} • Good Quality
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPage('verification-result')}
                className="text-xs text-[#174EA6] font-semibold hover:underline cursor-pointer"
              >
                Inspect Telemetry →
              </button>
            </div>
          ) : (
            <div className="p-6 border border-dashed border-[#D0D5DD] rounded-[6px] text-center text-[#667085]">
              No evidence uploaded yet.
            </div>
          )}
        </div>

        {/* Section 3: Verification */}
        <div className="space-y-3 pt-4 border-t border-[#E4E7EC]">
          <span className="text-xs font-mono uppercase text-[#667085] block font-semibold">
            VERIFICATION AUDIT
          </span>

          {tag.verification ? (
            <div className="p-4 border border-[#E4E7EC] rounded-[6px] bg-[#F7F8FA] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#111318] font-mono">
                  STATUS: {tag.verification.overallStatus.toUpperCase()}
                </span>
                <span className="text-[#174EA6] font-bold font-mono">
                  {tag.verification.confidence}% CONFIDENCE
                </span>
              </div>
              <p className="text-[#667085] text-xs leading-relaxed font-sans">
                {tag.verification.summary}
              </p>
              <div className="pt-2 text-right">
                <button
                  onClick={() => setPage('verification-result')}
                  className="text-xs font-semibold text-[#174EA6] hover:underline cursor-pointer"
                >
                  Open Full Inspection Matrix →
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 border border-[#E4E7EC] rounded-[6px] bg-[#F7F8FA] text-[#667085]">
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
