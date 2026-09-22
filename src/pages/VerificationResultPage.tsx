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
    setPage
  } = useTrustTagStore();

  const [isReportOpen, setIsReportOpen] = useState(false);

  const activeTag = tags.find((t) => t.id === selectedTagId) || tags[0];

  const verification =
    currentDraftVerification ||
    activeTag.verification || {
      overallStatus: 'mismatch',
      matchedCount: 3,
      totalRequirements: 4,
      confidence: 92,
      summary:
        'The submitted image appears to show a blue wall, while the agreement specifies white. The task and finish appear consistent with the agreement.',
      evaluatedAt: new Date().toISOString(),
      findings: [
        {
          requirementId: 'f1',
          label: 'Task Execution',
          agreed: 'Paint room',
          detected: 'Room painting completed',
          status: 'matched',
          confidence: 96,
          reasoning: 'Surface coverage indicates completed application across visible perimeter.'
        },
        {
          requirementId: 'f2',
          label: 'Wall Color',
          agreed: 'White',
          detected: 'Blue (#2563EB)',
          status: 'mismatch',
          confidence: 94,
          reasoning: 'Dominant spectral cluster measured in 460-480nm range (Blue), conflicting with agreed White.'
        },
        {
          requirementId: 'f3',
          label: 'Surface Finish',
          agreed: 'Matte',
          detected: 'Matte',
          status: 'matched',
          confidence: 90,
          reasoning: 'Specular reflectivity matches low-sheen interior emulsion.'
        },
        {
          requirementId: 'f4',
          label: 'Evidence Quality',
          agreed: 'Standard photographic proof',
          detected: 'Good',
          status: 'matched',
          confidence: 97,
          reasoning: 'Authentic EXIF tags, clean ambient lighting, uncompressed.'
        }
      ]
    };

  const evidence =
    currentDraftEvidence ||
    activeTag.evidence || {
      id: 'demo-ev',
      fileName: 'bedroom_inspection.jpg',
      fileType: 'image',
      url: '/demo/blue-room.svg',
      uploadedAt: 'Sep 22, 2026 18:30'
    };

  const isMismatch = verification.overallStatus === 'mismatch';

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCDCD6] pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
            VERIFICATION REPORT // {activeTag.id}
          </span>
          <h1 className="text-xl font-bold font-mono tracking-tight text-[#171717] mt-0.5 uppercase">
            {activeTag.service}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage('tag-details')}
            className="py-1.5 px-3 rounded-[3px] bg-[#FFFFFF] hover:bg-[#F0F0EB] text-[#171717] border border-[#DCDCD6] font-mono text-xs cursor-pointer"
          >
            ← Return to TrustTag
          </button>
          <button
            onClick={() => setIsReportOpen(true)}
            className="py-1.5 px-3 rounded-[3px] bg-[#FFFFFF] hover:bg-[#F0F0EB] text-[#171717] border border-[#DCDCD6] font-mono text-xs cursor-pointer"
          >
            Share
          </button>
          <button
            onClick={() => setIsReportOpen(true)}
            className="py-1.5 px-4 rounded-[3px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Download Report
          </button>
        </div>
      </div>

      {/* Large Status Area (Inspection Report Style) */}
      <div
        className={`p-6 border rounded-[6px] ${
          isMismatch
            ? 'bg-[#FEF2F2] border-[#FECACA]'
            : 'bg-[#F0FDF4] border-[#BBF7D0]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div
              className={`font-mono text-sm font-bold tracking-wider uppercase ${
                isMismatch ? 'text-[#991B1B]' : 'text-[#166534]'
              }`}
            >
              {isMismatch ? '⚠ MISMATCH DETECTED' : '✓ VERIFIED'}
            </div>
            <p className="text-base font-semibold text-[#171717] mt-1">
              {isMismatch
                ? '1 requirement appears inconsistent with the submitted evidence.'
                : 'Evidence appears consistent with the agreed requirements.'}
            </p>
          </div>

          <div className="font-mono text-xs text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#DCDCD6]/60">
            <span className="text-[#6B6B67] uppercase block text-[10px]">
              EVALUATION SCORE
            </span>
            <span className="text-lg font-bold text-[#171717] block">
              {verification.matchedCount} / {verification.totalRequirements} MATCHED
            </span>
            <span className="text-[#1D4ED8] font-bold text-[11px]">
              {verification.confidence}% CONFIDENCE
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Comparison: Evidence on Left (with subtle bounding box) + Diff on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Actual Evidence Image with Subtle Bounding Box (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-[#DCDCD6] rounded-[4px] overflow-hidden bg-[#151515] relative shadow-sm">
            <div className="p-2.5 bg-[#1F1F1F] border-b border-[#2E2E2E] flex items-center justify-between text-[10px] font-mono text-[#DCDCD6]">
              <span>EVIDENCE FILE: {evidence.fileName}</span>
              <span>1080P // NO COMPRESSION</span>
            </div>

            <div className="relative aspect-[16/11] overflow-hidden bg-[#151515]">
              <img
                src={evidence.url}
                alt="Inspection evidence"
                className="w-full h-full object-cover select-none"
              />

              {/* Subtle detected region indicator */}
              {isMismatch ? (
                <div className="absolute top-[18%] left-[16%] w-[68%] h-[58%] border border-[#B91C1C] pointer-events-none p-2 flex flex-col justify-between">
                  <span className="bg-[#171717]/90 text-[#FECACA] font-mono text-[9px] px-1.5 py-0.5 border border-[#B91C1C] self-start uppercase">
                    DETECTED COLOR: BLUE #2563EB
                  </span>
                </div>
              ) : (
                <div className="absolute top-[18%] left-[16%] w-[68%] h-[58%] border border-[#15803D] pointer-events-none p-2 flex flex-col justify-between">
                  <span className="bg-[#171717]/90 text-[#BBF7D0] font-mono text-[9px] px-1.5 py-0.5 border border-[#15803D] self-start uppercase">
                    DETECTED COLOR: WHITE #FFFFFF
                  </span>
                </div>
              )}
            </div>

            <div className="p-2.5 bg-[#1F1F1F] border-t border-[#2E2E2E] text-[10px] font-mono text-[#8F8F89] flex items-center justify-between">
              <span>EXIF: MATCHED TO SERVICE LOCATION</span>
              <span className="text-[#DCDCD6]">QUALITY: GOOD</span>
            </div>
          </div>

          {/* Analysis Note & Legal Disclaimer */}
          <div className="border border-[#DCDCD6] bg-[#FFFFFF] rounded-[4px] p-4 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B67] block font-semibold">
              ANALYSIS
            </span>
            <p className="text-xs text-[#171717] leading-relaxed">
              {verification.summary}
            </p>
            <p className="text-[10px] text-[#8F8F89] font-mono pt-2 border-t border-[#EBEBE6] leading-relaxed">
              AI-generated assessment. Review evidence before taking action. TrustTag establishes probabilistic alignment and does not constitute judicial determination.
            </p>
          </div>
        </div>

        {/* Right: Requirement Check Matrix & Side-by-Side Comparison (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <ComparisonDiff
            agreedColor={activeTag.agreement.color || 'White'}
            detectedColor={isMismatch ? 'Blue' : 'White'}
            findings={verification.findings}
            matchedCount={verification.matchedCount}
            totalRequirements={verification.totalRequirements}
            confidence={verification.confidence}
            overallStatus={verification.overallStatus}
          />

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-[#DCDCD6]">
            <button
              onClick={() => setPage('tag-details')}
              className="py-2 px-4 rounded-[4px] bg-[#F7F7F4] hover:bg-[#EBEBE6] border border-[#DCDCD6] text-[#171717] font-mono text-xs cursor-pointer"
            >
              ← Case File Details
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              className="py-2 px-5 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Export Inspection Certificate
            </button>
          </div>
        </div>
      </div>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        tag={activeTag}
      />
    </div>
  );
};
