import React from 'react';
import { Stepper } from '../components/ui/Stepper';
import { VisionScanner } from '../components/ui/VisionScanner';
import { useTrustTagStore } from '../store/trustTagStore';

export const VerificationProcessingPage: React.FC = () => {
  const {
    currentDraftAgreement,
    currentDraftEvidence,
    currentStep,
    setPage,
    tags
  } = useTrustTagStore();

  const agreement = currentDraftAgreement || tags[0].agreement;
  const evidence = currentDraftEvidence || tags[0].evidence || {
    id: 'ev-demo',
    fileName: 'delivered_room_photo.jpg',
    fileType: 'image',
    url: '/demo/blue-room.svg',
    uploadedAt: 'Just now'
  };

  const handleComplete = () => {
    setPage('verification-result');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 font-sans">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
          AI VERIFICATION PIPELINE
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] mt-1">
          Analyzing evidence against terms.
        </h1>
        <p className="text-xs text-[#6B6B67] mt-0.5">
          Evaluating surface chromaticity, geometry, and service deliverable criteria.
        </p>
      </div>

      <Stepper currentStep={currentStep || 4} />

      <VisionScanner
        agreement={agreement}
        evidence={evidence}
        onComplete={handleComplete}
      />
    </div>
  );
};
