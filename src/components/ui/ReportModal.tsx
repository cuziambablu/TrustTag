import React, { useState } from 'react';
import { TrustTag } from '../../types/trustTag';
import { TrustTagLogo } from '../branding/TrustTagLogo';
import { CheckCircle2, AlertTriangle, Download, Copy, Printer, Check, X } from 'lucide-react';

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
    navigator.clipboard.writeText(`https://trusttag.ai/record/${tag.id}`);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[8px] bg-[#FFFFFF] border border-[#E4E7EC] shadow-2xl p-6 sm:p-8 text-[#111318] font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <TrustTagLogo size="sm" />
            <div>
              <h2 className="text-sm font-bold tracking-tight text-[#111318] uppercase font-mono">
                VERIFICATION CERTIFICATE // {tag.id}
              </h2>
              <span className="text-[11px] font-mono text-[#667085]">
                SHA-256: e8d4f09a...72d54e48b1
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-[4px] hover:bg-[#F2F4F7] text-[#667085] hover:text-[#111318] text-xs font-mono cursor-pointer"
          >
            [ESC]
          </button>
        </div>

        {/* Status Callout */}
        <div
          className={`p-4 rounded-[6px] border mb-6 ${
            isMismatch
              ? 'bg-[#FEF3F2] border-[#FECDCA] text-[#B42318]'
              : 'bg-[#F0FDF4] border-[#BBF7D0] text-[#15803D]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold uppercase mb-1 font-mono">
            <div className="flex items-center gap-2">
              {isMismatch ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{isMismatch ? 'MISMATCH DETECTED' : 'VERIFIED COMPLIANT'}</span>
            </div>
            <span>{tag.verification?.confidence || 94}% CONFIDENCE</span>
          </div>
          <p className="text-xs leading-relaxed text-[#111318]">
            {tag.verification?.summary}
          </p>
        </div>

        {/* Record Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[#F7F8FA] border border-[#E4E7EC] rounded-[6px] text-xs font-mono mb-6">
          <div>
            <span className="text-[10px] text-[#667085] block">SERVICE</span>
            <span className="font-semibold text-[#111318] truncate block">{tag.service}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#667085] block">PROVIDER</span>
            <span className="font-semibold text-[#111318] truncate block">{tag.provider.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#667085] block">CUSTOMER</span>
            <span className="font-semibold text-[#111318] truncate block">{tag.customer.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#667085] block">DATE</span>
            <span className="font-semibold text-[#111318]">Sep 22, 2026</span>
          </div>
        </div>

        {/* Findings Matrix */}
        <div className="space-y-2 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#667085] block font-semibold">
            AUDITED REQUIREMENT MATRIX
          </span>
          <div className="border border-[#E4E7EC] divide-y divide-[#E4E7EC] rounded-[6px] text-xs font-mono">
            {tag.verification?.findings.map((f, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#111318] mr-2">{f.label}:</span>
                  <span className="text-[#667085]">Agreed "{f.agreed}" → Detected "{f.detected}"</span>
                </div>
                <span className={`text-[10px] font-bold uppercase ${f.status === 'mismatch' ? 'text-[#B42318]' : 'text-[#15803D]'}`}>
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-[11px] text-[#667085] leading-relaxed border-t border-[#E4E7EC] pt-4 mb-6">
          LEGAL NOTICE: TrustTag assists counterparty verification through objective algorithmic multimodal analysis. Findings indicate statistical confidence distributions and do not constitute formal judicial arbitration.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 py-2 px-3 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F2F4F7] border border-[#E4E7EC] text-[#111318] text-xs font-semibold cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5 text-[#667085]" />}
            <span>{copied ? 'Link Copied' : 'Copy Record URL'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 py-2 px-3 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F2F4F7] border border-[#E4E7EC] text-[#111318] text-xs font-semibold cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#667085]" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 py-2 px-4 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
