import React, { useState } from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { ComparisonDiff } from '../components/ui/ComparisonDiff';
import { ReportModal } from '../components/ui/ReportModal';

export const VerificationResultPage: React.FC = () => {
  const {
    tags,
    selectedTagId,
    currentDraftVerification,
    currentDraftEvidence,
    setPage,
    addToast
  } = useTrustTagStore();

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showClarificationModal, setShowClarificationModal] = useState(false);
  const [clarificationNote, setClarificationNote] = useState(
    'Please provide additional lighting photos or confirm if a primer or secondary coat is planned.'
  );

  const activeTag = tags.find((t) => t.id === selectedTagId) || tags[0];

  const verification = currentDraftVerification || activeTag.verification || {
    overallStatus: 'mismatch',
    matchedCount: 3,
    totalRequirements: 4,
    confidence: 94,
    summary: 'Mismatch detected. 1 requirement appears inconsistent with the submitted evidence.',
    observation: 'Delivered wall appears blue/grey rather than contracted white.',
    discrepancyReason: 'Dominant spectral cluster measured in 460-480nm range (Blue), conflicting with agreed White.',
    evaluatedAt: new Date().toISOString(),
    findings: [
      {
        requirementId: 'f1',
        label: 'White wall color',
        agreed: 'White paint',
        detected: 'Delivered wall appears blue/grey.',
        status: 'mismatch',
        confidence: 94,
        reasoning: 'Surface spectral analysis detected deep blue pigments across primary wall elevations.',
        impact: 'Critical finish variance requiring client review or repainting.'
      },
      {
        requirementId: 'f2',
        label: 'Two coats',
        agreed: '2 coats',
        detected: 'Full opaque coverage',
        status: 'matched',
        confidence: 96,
        reasoning: 'Smooth, even application across all planes.'
      },
      {
        requirementId: 'f3',
        label: 'Bedroom covered',
        agreed: 'All 4 walls',
        detected: 'Perimeter covered',
        status: 'matched',
        confidence: 98,
        reasoning: 'Visible corners and elevations match agreed room.'
      },
      {
        requirementId: 'f4',
        label: 'Completion before Friday',
        agreed: 'Friday',
        detected: 'Delivered Friday',
        status: 'matched',
        confidence: 99,
        reasoning: 'Delivery timestamp within agreed window.'
      }
    ]
  };

  const evidence = currentDraftEvidence || activeTag.evidence || {
    id: 'demo-ev',
    fileName: 'bedroom_inspection.jpg',
    fileType: 'image',
    url: '/demo/blue-room.svg',
    uploadedAt: 'Sep 22, 2026 18:30'
  };

  const isVerified = verification.overallStatus === 'verified';
  const isMismatch = verification.overallStatus === 'mismatch';
  const isNeedsReview = verification.overallStatus === 'needs_review';

  const handleSendClarification = () => {
    setShowClarificationModal(false);
    addToast('Clarification Request Dispatched', 'Sent notification to contractor with requested items', 'info');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 font-sans">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCDCD6] pb-4 font-mono text-xs">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#6B6B67] block font-semibold">
            VERIFICATION REPORT // {activeTag.id}
          </span>
          <h1 className="text-xl font-bold tracking-tight text-[#111111] mt-0.5 uppercase">
            {activeTag.service}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage('tag-details')}
            className="py-1.5 px-3 rounded-[3px] bg-[#FFFFFF] hover:bg-[#F0F0EB] text-[#111111] border border-[#DCDCD6] cursor-pointer"
          >
            ← Return to TrustTag
          </button>
          <button
            onClick={() => setIsReportOpen(true)}
            className="py-1.5 px-3 rounded-[3px] bg-[#FFFFFF] hover:bg-[#F0F0EB] text-[#111111] border border-[#DCDCD6] cursor-pointer"
          >
            Share
          </button>
          <button
            onClick={() => setIsReportOpen(true)}
            className="py-1.5 px-4 rounded-[3px] bg-[#111111] hover:bg-[#2E2E2E] text-white font-semibold uppercase tracking-wider cursor-pointer"
          >
            Download Report
          </button>
        </div>
      </div>

      {/* STATE 1: VERIFIED STATE */}
      {isVerified && (
        <div className="p-6 border rounded-[6px] bg-[#F0FDF4] border-[#BBF7D0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-sm font-bold tracking-wider text-[#15803D] uppercase">
                ✓ VERIFIED
              </div>
              <p className="text-base font-semibold text-[#111111] mt-1">
                Delivery appears consistent with the agreed requirements.
              </p>
            </div>

            <div className="font-mono text-xs text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#BBF7D0]">
              <span className="text-[#6B6B67] uppercase block text-[10px]">
                AGREEMENT MATCH
              </span>
              <span className="text-lg font-bold text-[#111111] block">
                {verification.matchedCount} / {verification.totalRequirements} MATCHED
              </span>
              <span className="text-[#15803D] font-bold text-[11px]">
                CONFIDENCE: {verification.confidence}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STATE 2: MISMATCH STATE */}
      {isMismatch && (
        <div className="p-6 border rounded-[6px] bg-[#FEF2F2] border-[#FECACA]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-sm font-bold tracking-wider text-[#B91C1C] uppercase">
                ⚠ MISMATCH DETECTED
              </div>
              <p className="text-base font-semibold text-[#111111] mt-1">
                1 requirement appears inconsistent with the submitted evidence.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowClarificationModal(true)}
                className="py-2 px-3.5 rounded-[4px] bg-[#B91C1C] hover:bg-[#991B1B] text-white font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Request Clarification
              </button>

              <div className="font-mono text-xs text-right shrink-0 pl-3 border-l border-[#FECACA]">
                <span className="text-[#6B6B67] uppercase block text-[10px]">SCORE</span>
                <span className="text-base font-bold text-[#111111] block">
                  {verification.matchedCount} / {verification.totalRequirements}
                </span>
                <span className="text-[#B91C1C] font-bold text-[10px]">
                  {verification.confidence}% CONF
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATE 3: NEEDS REVIEW STATE */}
      {isNeedsReview && (
        <div className="p-6 border rounded-[6px] bg-[#FFFBEB] border-[#FDE68A]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-sm font-bold tracking-wider text-[#B45309] uppercase">
                ⚠ HUMAN REVIEW RECOMMENDED
              </div>
              <p className="text-base font-semibold text-[#111111] mt-1">
                Evidence quality is insufficient to confidently verify the wall color.
              </p>
              <p className="text-xs text-[#6B6B67] mt-1 font-mono">
                Reason: Ceiling plane occluded by glare / photographic resolution below threshold (320p).
              </p>
            </div>

            <button
              onClick={() => setShowClarificationModal(true)}
              className="py-2 px-4 rounded-[4px] bg-[#B45309] hover:bg-[#92400E] text-white font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer self-start sm:self-auto"
            >
              Request Clearer Evidence
            </button>
          </div>
        </div>
      )}

      {/* Split Comparison Workspace: LEFT (Agreement Requirements) vs RIGHT (Uploaded Delivery Evidence) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Agreement Requirements & Detailed Findings (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <ComparisonDiff
            agreedColor={activeTag.agreement.color || 'White'}
            detectedColor={isMismatch ? 'Blue' : isNeedsReview ? 'Occluded' : 'White'}
            findings={verification.findings}
            matchedCount={verification.matchedCount}
            totalRequirements={verification.totalRequirements}
            confidence={verification.confidence}
            overallStatus={verification.overallStatus}
          />

          {/* Mismatch Deep Dive Callout if Mismatch detected */}
          {isMismatch && (
            <div className="border border-[#FECACA] bg-[#FEF2F2]/60 rounded-[4px] p-5 font-mono text-xs space-y-3">
              <span className="text-[10px] text-[#B91C1C] uppercase font-bold block">
                DISCREPANCY SPECIFICATION
              </span>

              <div className="grid grid-cols-2 gap-4 border-b border-[#FECACA] pb-3">
                <div>
                  <span className="text-[#6B6B67] text-[10px] block">CONTRACTED REQUIREMENT</span>
                  <strong className="text-[#111111]">White paint</strong>
                </div>
                <div>
                  <span className="text-[#B91C1C] text-[10px] block">EVIDENCE DETECTED</span>
                  <strong className="text-[#B91C1C]">Delivered wall appears blue/grey.</strong>
                </div>
              </div>

              <div>
                <span className="text-[#6B6B67] text-[10px] block">AI OBSERVATION</span>
                <p className="text-[#111111] font-sans text-xs mt-0.5">
                  Surface spectral analysis detected deep blue pigments across primary wall elevations.
                </p>
              </div>

              <div>
                <span className="text-[#6B6B67] text-[10px] block">CONTRACTUAL IMPACT</span>
                <p className="text-[#111111] font-sans text-xs mt-0.5">
                  Visual aesthetic differs substantially from contract; repaint or adjustment required.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Uploaded Delivery Evidence Image & Metadata (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-[#DCDCD6] rounded-[4px] overflow-hidden bg-[#151515] relative shadow-sm">
            <div className="p-2.5 bg-[#1F1F1F] border-b border-[#2E2E2E] flex items-center justify-between text-[10px] font-mono text-[#DCDCD6]">
              <span>SUBMITTED EVIDENCE PHOTO</span>
              <span>{evidence.fileName}</span>
            </div>

            <div className="relative aspect-[16/11] overflow-hidden bg-[#151515]">
              <img
                src={evidence.url}
                alt="Delivery proof"
                className="w-full h-full object-cover select-none"
              />

              {/* Bounding box marker */}
              {isMismatch ? (
                <div className="absolute top-[18%] left-[16%] w-[68%] h-[58%] border border-[#B91C1C] pointer-events-none p-2 flex flex-col justify-between">
                  <span className="bg-[#111111]/90 text-[#FECACA] font-mono text-[9px] px-1.5 py-0.5 border border-[#B91C1C] self-start uppercase">
                    DETECTED: BLUE #2563EB
                  </span>
                </div>
              ) : isNeedsReview ? (
                <div className="absolute top-[8%] left-[8%] w-[84%] h-[40%] border border-dashed border-[#B45309] pointer-events-none p-2 flex flex-col justify-between">
                  <span className="bg-[#111111]/90 text-[#FDE68A] font-mono text-[9px] px-1.5 py-0.5 border border-[#B45309] self-start uppercase">
                    ⚠ OCCLUDED CEILING
                  </span>
                </div>
              ) : (
                <div className="absolute top-[18%] left-[16%] w-[68%] h-[58%] border border-[#15803D] pointer-events-none p-2 flex flex-col justify-between">
                  <span className="bg-[#111111]/90 text-[#BBF7D0] font-mono text-[9px] px-1.5 py-0.5 border border-[#15803D] self-start uppercase">
                    ✓ SPECIFICATION MATCHED
                  </span>
                </div>
              )}
            </div>

            <div className="p-2.5 bg-[#1F1F1F] border-t border-[#2E2E2E] text-[10px] font-mono text-[#8F8F89] flex items-center justify-between">
              <span>PHOTO TIMESTAMP: {evidence.uploadedAt}</span>
              <span className={isNeedsReview ? 'text-[#F59E0B]' : 'text-[#DCDCD6]'}>
                QUALITY: {evidence.metadata?.quality || 'Good'}
              </span>
            </div>
          </div>

          {/* Legal disclaimer */}
          <div className="border border-[#DCDCD6] bg-[#FFFFFF] rounded-[4px] p-4 text-[10px] font-mono text-[#6B6B67] leading-relaxed">
            <span className="text-[#111111] font-bold uppercase block mb-1">
              RECORD DISCLAIMER
            </span>
            AI-generated assessment based on submitted pixels and contract text. Review evidence before taking formal dispute or financial action.
          </div>
        </div>
      </div>

      {/* Clarification Request Modal */}
      {showClarificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
          <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] max-w-md w-full p-6 space-y-4 font-mono text-xs">
            <div className="border-b border-[#DCDCD6] pb-2 flex justify-between items-center">
              <span className="font-bold text-[#111111] uppercase">
                REQUEST CONTRACTOR CLARIFICATION
              </span>
              <button
                onClick={() => setShowClarificationModal(false)}
                className="text-[#6B6B67] hover:text-[#111111]"
              >
                [X]
              </button>
            </div>

            <p className="text-xs font-sans text-[#6B6B67]">
              Send an inquiry to <strong>{activeTag.provider.name}</strong> referencing TrustTag case <strong>{activeTag.id}</strong>.
            </p>

            <textarea
              rows={4}
              value={clarificationNote}
              onChange={(e) => setClarificationNote(e.target.value)}
              className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[4px] p-3 text-[#111111] font-sans text-xs focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowClarificationModal(false)}
                className="py-1.5 px-3 border border-[#DCDCD6] rounded-[3px] text-[#6B6B67]"
              >
                Cancel
              </button>
              <button
                onClick={handleSendClarification}
                className="py-1.5 px-4 bg-[#111111] hover:bg-[#2E2E2E] text-white rounded-[3px] font-semibold uppercase"
              >
                Dispatch Clarification Request
              </button>
            </div>
          </div>
        </div>
      )}

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        tag={activeTag}
      />
    </div>
  );
};
