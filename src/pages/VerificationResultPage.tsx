import React, { useState } from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { ReportModal } from '../components/ui/ReportModal';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileCheck,
  Eye,
  Sparkles,
  Download,
  ArrowRight,
  MessageSquare,
  RotateCcw,
  Check,
  X,
  ShieldCheck,
  Lock
} from 'lucide-react';

export const VerificationResultPage: React.FC = () => {
  const {
    tags,
    selectedTagId,
    currentDraftVerification,
    currentDraftEvidence,
    currentDraftAgreement,
    setPage,
    addToast
  } = useTrustTagStore();

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showClarificationModal, setShowClarificationModal] = useState(false);
  const [clarificationNote, setClarificationNote] = useState(
    'Please clarify if a second coat is planned, or confirm if the wall color satisfies the approved swatch.'
  );

  const activeTag = tags.find((t) => t.id === selectedTagId) || tags[0];

  const verification = currentDraftVerification || activeTag.verification || {
    overallStatus: 'mismatch',
    matchedCount: 3,
    totalRequirements: 4,
    confidence: 94,
    summary: 'Mismatch detected. 1 requirement appears inconsistent with the submitted evidence.',
    observation: 'Delivered wall appears blue/grey rather than contracted white.',
    discrepancyReason: 'Surface spectral analysis detected deep blue pigments across primary wall elevations.',
    evaluatedAt: new Date().toISOString(),
    findings: [
      {
        requirementId: 'f1',
        label: 'White wall color',
        agreed: 'Matte white',
        detected: 'Blue/grey (#2563EB)',
        status: 'mismatch',
        confidence: 94,
        reasoning: 'Surface spectral analysis detected deep blue pigments across primary wall elevations.',
        impact: 'Critical finish variance requiring client review or repainting.'
      },
      {
        requirementId: 'f2',
        label: 'Application coats',
        agreed: 'Two coats',
        detected: 'Full opaque coverage',
        status: 'matched',
        confidence: 96,
        reasoning: 'Smooth, even application across all planes.'
      },
      {
        requirementId: 'f3',
        label: 'Scope perimeter',
        agreed: 'Living room perimeter',
        detected: 'Perimeter covered',
        status: 'matched',
        confidence: 98,
        reasoning: 'Visible corners and elevations match agreed room.'
      },
      {
        requirementId: 'f4',
        label: 'Completion time',
        agreed: 'Complete by Friday',
        detected: 'Delivered Friday',
        status: 'matched',
        confidence: 99,
        reasoning: 'Delivery timestamp within agreed window.'
      }
    ]
  };

  const agreement = currentDraftAgreement || activeTag.agreement || {
    task: 'Living Room Painting',
    price: '₹12,500',
    deadline: 'Friday, Sep 25',
    requirements: [
      { id: '1', label: 'Wall color', agreedValue: 'Matte white', status: 'pending', confidence: 94, evidenceType: 'photo' },
      { id: '2', label: 'Application coats', agreedValue: 'Two coats', status: 'pending', confidence: 96, evidenceType: 'photo' },
      { id: '3', label: 'Scope perimeter', agreedValue: 'Living room perimeter', status: 'pending', confidence: 98, evidenceType: 'photo' },
      { id: '4', label: 'Completion time', agreedValue: 'Complete by Friday', status: 'pending', confidence: 99, evidenceType: 'photo' },
    ]
  };

  const evidence = currentDraftEvidence || activeTag.evidence || {
    id: 'demo-ev',
    fileName: 'delivered_room_evidence.jpg',
    fileType: 'image',
    url: '/demo/blue-room.svg',
    uploadedAt: 'Sep 22, 2026 18:30',
    metadata: { quality: 'Good' }
  };

  const isVerified = verification.overallStatus === 'verified';
  const isMismatch = verification.overallStatus === 'mismatch';
  const isNeedsReview = verification.overallStatus === 'needs_review';

  const handleSendClarification = () => {
    setShowClarificationModal(false);
    addToast('Clarification Sent', 'Discrepancy notice dispatched to counterparty.', 'info');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E7EC] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] font-semibold">
              VERIFICATION WORKSPACE
            </span>
            <span className="text-[11px] font-mono text-[#98A2B3]">
              // {activeTag.id || 'TT-1043'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#111318] mt-0.5">
            {agreement.task}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsReportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[#E4E7EC] bg-[#FFFFFF] hover:bg-[#F2F4F7] text-xs font-semibold text-[#111318] cursor-pointer shadow-xs min-h-[36px]"
          >
            <Download className="w-3.5 h-3.5 text-[#667085]" />
            <span>Export Certificate</span>
          </button>

          {isMismatch && (
            <button
              onClick={() => setShowClarificationModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[#B42318] hover:bg-[#912018] text-white text-xs font-semibold shadow-xs cursor-pointer min-h-[36px]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Request Clarification</span>
            </button>
          )}
        </div>
      </div>

      {/* Flagship 3-Column Layout on Desktop; Stacked on Mobile:
          Left (3 cols): Agreement Requirements
          Center (5 cols): Evidence Inspection
          Right (4 cols): AI Verification Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ==========================================
            LEFT COLUMN: AGREEMENT REQUIREMENTS (3.5 cols)
            ========================================== */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-5 shadow-xs space-y-4">
          <div className="border-b border-[#E4E7EC] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#174EA6]" />
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#111318]">
                Agreed Requirements
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#667085] bg-[#F7F8FA] px-1.5 py-0.5 rounded border border-[#E4E7EC]">
              LOCKED
            </span>
          </div>

          <div className="p-3 bg-[#F7F8FA] rounded-[6px] border border-[#E4E7EC] text-xs space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-[#667085]">Price:</span>
              <span className="font-bold text-[#111318]">{agreement.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#667085]">Deadline:</span>
              <span className="font-bold text-[#111318]">{agreement.deadline}</span>
            </div>
          </div>

          {/* List of Requirements */}
          <div className="space-y-2.5">
            {verification.findings.map((finding, idx) => (
              <div
                key={finding.requirementId || idx}
                className="p-3 rounded-[6px] border border-[#E4E7EC] bg-[#FFFFFF] text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#111318] font-mono text-[11px]">
                    {finding.label}
                  </span>
                  {finding.status === 'matched' && (
                    <span className="text-[10px] font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.2 rounded border border-[#BBF7D0]">
                      MATCH
                    </span>
                  )}
                  {finding.status === 'mismatch' && (
                    <span className="text-[10px] font-mono font-bold text-[#B42318] bg-[#FEF3F2] px-1.5 py-0.2 rounded border border-[#FECDCA]">
                      MISMATCH
                    </span>
                  )}
                  {finding.status === 'warning' && (
                    <span className="text-[10px] font-mono font-bold text-[#B45309] bg-[#FFFBEB] px-1.5 py-0.2 rounded border border-[#FDE68A]">
                      REVIEW
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-[#667085] space-y-0.5">
                  <div>
                    Agreed: <strong className="text-[#111318] font-mono">{finding.agreed}</strong>
                  </div>
                  <div>
                    Detected: <span className="font-mono">{finding.detected}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            CENTER COLUMN: EVIDENCE INSPECTION (4.5 cols)
            ========================================== */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-5 shadow-xs space-y-4">
          <div className="border-b border-[#E4E7EC] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#174EA6]" />
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#111318]">
                Delivery Evidence
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#667085]">
              {evidence.fileName}
            </span>
          </div>

          {/* High-res Image View with Scanline */}
          <div className="aspect-[4/3] rounded-[6px] overflow-hidden bg-[#0B1220] relative border border-[#E4E7EC]">
            <img
              src={evidence.url || '/demo/blue-room.svg'}
              alt="Delivered evidence"
              className="w-full h-full object-cover"
            />

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-0.5 bg-[#3B82F6] shadow-[0_0_10px_#3B82F6] animate-scan-subtle" />
            </div>

            {/* In-Frame HUD */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-[3px] bg-[#0B1220]/80 border border-[#1E293B] text-[10px] font-mono text-[#E2E8F0]">
              SPECTRAL SCAN: ACTIVE
            </div>

            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-[3px] bg-[#0B1220]/80 border border-[#1E293B] text-[10px] font-mono text-[#94A3B8] flex items-center justify-between">
              <span>ISO 8601 VERIFIED</span>
              <span>1080p EQUIVALENT</span>
            </div>
          </div>

          <div className="p-3 bg-[#F7F8FA] rounded-[6px] border border-[#E4E7EC] text-xs text-[#667085] space-y-1">
            <span className="font-semibold text-[#111318] block font-mono text-[11px]">
              SOURCE METADATA:
            </span>
            <div className="text-[11px] font-mono space-y-0.5">
              <div>Uploaded: {evidence.uploadedAt}</div>
              <div>Hash: 8f4a...29b1 (SHA-256 Valid)</div>
            </div>
          </div>
        </div>

        {/* ==========================================
            RIGHT COLUMN: AI VERIFICATION PANEL (4 cols)
            ========================================== */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-5 shadow-xs space-y-5">
          <div className="border-b border-[#E4E7EC] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#174EA6]" />
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#111318]">
                AI Verification Panel
              </h2>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#174EA6]">
              {verification.confidence}% CONF
            </span>
          </div>

          {/* Verification Pipeline Progression */}
          <div className="p-3 bg-[#F7F8FA] rounded-[6px] border border-[#E4E7EC] space-y-2 text-xs font-mono">
            <span className="text-[10px] uppercase text-[#667085] block font-semibold">
              PIPELINE PROGRESSION
            </span>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-[#15803D]">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Agreement loaded & tokenized</span>
              </div>
              <div className="flex items-center gap-2 text-[#15803D]">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Evidence processed & segmented</span>
              </div>
              <div className="flex items-center gap-2 text-[#15803D]">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Requirements cross-compared</span>
              </div>
              <div className="flex items-center gap-2 text-[#15803D]">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Verification report generated</span>
              </div>
            </div>
          </div>

          {/* Prominent Tri-State Result Card */}
          {isVerified && (
            <div className="p-4 rounded-[8px] bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
              <div className="flex items-center gap-2 text-[#15803D]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-mono text-sm font-bold tracking-wide">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-[#15803D] leading-relaxed">
                All agreed requirements have been verified against the submitted evidence.
              </p>
            </div>
          )}

          {isMismatch && (
            <div className="p-4 rounded-[8px] bg-[#FEF3F2] border border-[#FECDCA] space-y-2">
              <div className="flex items-center gap-2 text-[#B42318]">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span className="font-mono text-sm font-bold tracking-wide">
                  MISMATCH DETECTED
                </span>
              </div>
              <p className="text-xs text-[#B42318] leading-relaxed">
                {verification.discrepancyReason || 'Delivered wall appears blue/grey instead of contracted white.'}
              </p>
            </div>
          )}

          {isNeedsReview && (
            <div className="p-4 rounded-[8px] bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
              <div className="flex items-center gap-2 text-[#B45309]">
                <HelpCircle className="w-5 h-5 shrink-0" />
                <span className="font-mono text-sm font-bold tracking-wide">
                  NEEDS REVIEW
                </span>
              </div>
              <p className="text-xs text-[#B45309] leading-relaxed">
                Insufficient evidence clarity. Human review recommended due to glare or low resolution.
              </p>
            </div>
          )}

          {/* AI Observation Note */}
          <div className="p-3.5 rounded-[6px] bg-[#FFFFFF] border border-[#E4E7EC] text-xs space-y-1">
            <span className="text-[10px] font-mono text-[#667085] uppercase block font-semibold">
              OBSERVATION
            </span>
            <p className="text-[#111318] leading-relaxed text-[11px]">
              {verification.observation}
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            {isMismatch ? (
              <button
                onClick={() => setShowClarificationModal(true)}
                className="w-full py-2.5 px-4 rounded-[6px] bg-[#B42318] hover:bg-[#912018] text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs text-center"
              >
                Request Clarification from Provider
              </button>
            ) : isNeedsReview ? (
              <button
                onClick={() => setPage('evidence-upload')}
                className="w-full py-2.5 px-4 rounded-[6px] bg-[#B45309] hover:bg-[#92400E] text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs text-center"
              >
                Request Higher Quality Evidence
              </button>
            ) : (
              <button
                onClick={() => setIsReportOpen(true)}
                className="w-full py-2.5 px-4 rounded-[6px] bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs text-center"
              >
                View Full Verification Certificate
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Clarification Request Modal */}
      {showClarificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] max-w-lg w-full p-6 shadow-xl space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#B42318]" />
                <h3 className="text-sm font-bold text-[#111318] font-mono">
                  REQUEST CLARIFICATION
                </h3>
              </div>
              <button
                onClick={() => setShowClarificationModal(false)}
                className="text-[#667085] hover:text-[#111318] text-xs font-mono cursor-pointer"
              >
                [ESC]
              </button>
            </div>

            <p className="text-xs text-[#667085] leading-relaxed">
              Send a structured discrepancy notice to the counterparty referencing the locked clause and observed deviation.
            </p>

            <textarea
              rows={4}
              value={clarificationNote}
              onChange={(e) => setClarificationNote(e.target.value)}
              className="w-full p-3 rounded-[6px] border border-[#E4E7EC] text-xs text-[#111318] focus:outline-none focus:border-[#174EA6]"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowClarificationModal(false)}
                className="px-3.5 py-2 rounded-[6px] border border-[#E4E7EC] text-xs font-medium text-[#667085] hover:text-[#111318]"
              >
                Cancel
              </button>
              <button
                onClick={handleSendClarification}
                className="px-4 py-2 rounded-[6px] bg-[#B42318] hover:bg-[#912018] text-white text-xs font-semibold"
              >
                Send Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formal Certificate Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        tag={activeTag}
      />
    </div>
  );
};
