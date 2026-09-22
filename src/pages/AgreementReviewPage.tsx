import React, { useState } from 'react';
import { Stepper } from '../components/ui/Stepper';
import { useTrustTagStore } from '../store/trustTagStore';

export const AgreementReviewPage: React.FC = () => {
  const {
    currentDraftAgreement,
    currentStep,
    setStep,
    setPage,
    confirmDraftAgreementAndProceed,
    updateDraftRequirement
  } = useTrustTagStore();

  const agreement = currentDraftAgreement || {
    task: 'Paint bedroom',
    color: 'White',
    price: '₹8,000',
    deadline: 'Friday, 6:00 PM',
    finish: 'Matte',
    notes: 'Use washable interior emulsion paint.',
    confidenceScore: 94,
    requirements: [
      { id: 'req-1', type: 'task', label: 'Service Task', agreedValue: 'Paint bedroom', status: 'pending', confidence: 98 },
      { id: 'req-2', type: 'color', label: 'Wall Color', agreedValue: 'White', status: 'pending', confidence: 96 },
      { id: 'req-3', type: 'price', label: 'Price / Fee', agreedValue: '₹8,000', status: 'pending', confidence: 99 },
      { id: 'req-4', type: 'deadline', label: 'Completion Deadline', agreedValue: 'Friday, 6:00 PM', status: 'pending', confidence: 91 },
      { id: 'req-5', type: 'finish', label: 'Surface Finish', agreedValue: 'Matte', status: 'pending', confidence: 88 }
    ]
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  const handleEdit = (id: string, currentVal: string) => {
    setEditingId(id);
    setTempValue(currentVal);
  };

  const handleSave = (id: string) => {
    updateDraftRequirement(id, { agreedValue: tempValue });
    setEditingId(null);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
          AGREEMENT EXTRACTION // TT-1043
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] mt-1">
          Review extracted requirements.
        </h1>
        <p className="text-xs text-[#6B6B67] mt-0.5">
          Verify and calibrate the tokenized parameters before locking this digital agreement record.
        </p>
      </div>

      <Stepper currentStep={currentStep || 2} />

      {/* Spoken transcript quote */}
      <div className="p-4 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px] font-mono text-xs">
        <span className="text-[10px] uppercase text-[#6B6B67] block mb-1">
          INGESTED VERBAL CONVERSATION
        </span>
        <p className="text-sm text-[#171717] italic">
          “Paint my room white for ₹8,000 by Friday.”
        </p>
      </div>

      {/* Clean Extraction Sheet (Horizontal Separators, NO floating cards) */}
      <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] overflow-hidden font-mono text-xs">
        <div className="p-4 bg-[#F7F7F4] border-b border-[#DCDCD6] flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#171717] uppercase tracking-wider">
            REQUIREMENTS
          </span>
          <span className="text-[11px] text-[#1D4ED8] font-bold">
            AI CONFIDENCE: {agreement.confidenceScore}%
          </span>
        </div>

        <div className="divide-y divide-[#DCDCD6]">
          {agreement.requirements.map((req: any) => {
            const isEditing = editingId === req.id;

            return (
              <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F7F4]/50">
                <div className="w-48 shrink-0">
                  <span className="text-[10px] text-[#6B6B67] uppercase block font-semibold">
                    {req.label}
                  </span>
                  <span className="text-[10px] text-[#8F8F89]">
                    {req.confidence}% precision
                  </span>
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="bg-[#F7F7F4] border border-[#171717] rounded-[2px] px-2.5 py-1 text-xs text-[#171717] font-semibold focus:outline-none"
                      />
                      <button
                        onClick={() => handleSave(req.id)}
                        className="px-2 py-1 bg-[#171717] text-white text-[10px] uppercase rounded-[2px] cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-[#171717]">
                      {req.agreedValue}
                    </span>
                  )}
                </div>

                <div className="shrink-0">
                  {!isEditing && (
                    <button
                      onClick={() => handleEdit(req.id, req.agreedValue)}
                      className="px-2 py-1 text-[10px] uppercase text-[#6B6B67] hover:text-[#171717] border border-[#DCDCD6] rounded-[2px] hover:bg-[#EBEBE6] cursor-pointer"
                    >
                      EDIT
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional notes */}
        <div className="p-4 border-t border-[#DCDCD6] bg-[#F7F7F4] text-[11px] text-[#6B6B67]">
          <span className="font-semibold text-[#171717]">NOTES: </span>
          {agreement.notes || 'Use washable interior emulsion paint. Ensure baseboards and floors are protected.'}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            setStep(1);
            setPage('create-tag');
          }}
          className="py-2 px-4 rounded-[4px] bg-[#FFFFFF] hover:bg-[#F0F0EB] text-[#171717] border border-[#DCDCD6] font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer"
        >
          ← Back
        </button>

        <button
          onClick={() => confirmDraftAgreementAndProceed()}
          className="py-2.5 px-6 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
        >
          Confirm Agreement →
        </button>
      </div>
    </div>
  );
};
