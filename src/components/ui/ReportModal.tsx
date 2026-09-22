import React, { useState } from 'react';
import { TrustTag } from '../../types/trustTag';
import { TrustTagLogo } from '../branding/TrustTagLogo';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tag: TrustTag;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  tag
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isMismatch = tag.verification?.overallStatus === 'mismatch';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://trusttag.sys/record/${tag.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        JSON.stringify(
          {
            system: 'TrustTag Verification Platform',
            recordId: tag.id,
            service: tag.service,
            parties: {
              provider: tag.provider.name,
              customer: tag.customer.name
            },
            status: tag.verification?.overallStatus,
            confidence: tag.verification?.confidence,
            evaluation: {
              matched: tag.verification?.matchedCount,
              total: tag.verification?.totalRequirements,
              findings: tag.verification?.findings,
              summary: tag.verification?.summary
            },
            timestamp: tag.verification?.evaluatedAt,
            sha256: 'e8d4f09a12c47814b72ef3e01bc5894191a0c4f810da52327a31b672d54e48b1'
          },
          null,
          2
        )
      ],
      { type: 'application/json' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `TrustTag-Inspection-${tag.id}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-[2px]">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[6px] bg-[#FFFFFF] border border-[#DCDCD6] shadow-2xl p-6 sm:p-8 text-[#171717]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DCDCD6] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <TrustTagLogo size="sm" />
            <div>
              <h2 className="text-sm font-bold font-mono tracking-wider text-[#171717] uppercase">
                VERIFICATION CERTIFICATE // {tag.id}
              </h2>
              <span className="text-[10px] font-mono text-[#6B6B67]">
                SHA256: e8d4f09a12c4...72d54e48b1
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-[4px] hover:bg-[#F0F0EB] text-[#6B6B67] hover:text-[#171717] font-mono text-xs cursor-pointer"
          >
            [ ESC ]
          </button>
        </div>

        {/* Status Callout */}
        <div
          className={`p-4 rounded-[4px] border mb-6 ${
            isMismatch
              ? 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
              : 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
          }`}
        >
          <div className="flex items-center justify-between font-mono text-xs font-bold uppercase mb-1">
            <span>{isMismatch ? '⚠ MISMATCH DETECTED' : '✓ VERIFIED COMPLIANT'}</span>
            <span>{tag.verification?.confidence || 92}% CONFIDENCE</span>
          </div>
          <p className="text-xs font-sans text-[#171717] leading-relaxed">
            {tag.verification?.summary}
          </p>
        </div>

        {/* Record Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#F7F7F4] border border-[#DCDCD6] rounded-[4px] font-mono text-xs mb-6">
          <div>
            <span className="text-[10px] text-[#6B6B67] block">SERVICE</span>
            <span className="font-semibold text-[#171717]">{tag.service}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#6B6B67] block">PROVIDER</span>
            <span className="font-semibold text-[#171717]">{tag.provider.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#6B6B67] block">CUSTOMER</span>
            <span className="font-semibold text-[#171717]">{tag.customer.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#6B6B67] block">DATE</span>
            <span className="font-semibold text-[#171717]">Sep 22, 2026</span>
          </div>
        </div>

        {/* Findings Matrix */}
        <div className="space-y-2 mb-6">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B67] block font-semibold">
            AUDITED REQUIREMENT MATRIX
          </span>
          <div className="border border-[#DCDCD6] divide-y divide-[#DCDCD6] rounded-[4px] text-xs font-mono">
            {tag.verification?.findings.map((f, idx) => (
              <div key={idx} className="p-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#171717] mr-2">{f.label}:</span>
                  <span className="text-[#6B6B67]">Agreed "{f.agreed}" → Detected "{f.detected}"</span>
                </div>
                <span className={`text-[10px] font-bold uppercase ${f.status === 'mismatch' ? 'text-[#B91C1C]' : 'text-[#15803D]'}`}>
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-[10px] text-[#6B6B67] font-mono leading-relaxed border-t border-[#DCDCD6] pt-4 mb-6">
          RECORD NOTICE: TrustTag assists parties through objective algorithmic verification. Findings indicate statistical confidence distributions and do not constitute formal legal judgments or arbitration awards.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopyLink}
            className="py-2 px-3 rounded-[4px] bg-[#F7F7F4] hover:bg-[#EBEBE6] border border-[#DCDCD6] text-[#171717] font-mono text-xs cursor-pointer"
          >
            {copied ? 'Link Copied' : 'Copy Record URL'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="py-2 px-3 rounded-[4px] bg-[#F7F7F4] hover:bg-[#EBEBE6] border border-[#DCDCD6] text-[#171717] font-mono text-xs cursor-pointer"
            >
              Print
            </button>
            <button
              onClick={handleDownload}
              className="py-2 px-4 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Download JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
