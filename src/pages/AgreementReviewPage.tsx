import React, { useState } from 'react';
import { Stepper } from '../components/ui/Stepper';
import { useTrustTagStore } from '../store/trustTagStore';
import { ArrowLeft, ArrowRight, Edit3, Check } from 'lucide-react';

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
    <div className="space-y-6 max-w-4xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] block font-semibold">
          AGREEMENT EXTRACTION // TT-1043
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111318] mt-1">
          Review Extracted Requirements
        </h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Verify and calibrate the tokenized parameters before locking this digital agreement record.
        </p>
      </div>

      <Stepper currentStep={currentStep || 2} />

      {/* Spoken transcript quote */}
      <div className="p-4 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] font-mono text-xs shadow-xs">
        <span className="text-[10px] uppercase text-[#667085] block mb-1 font-semibold">
          INGESTED VERBAL CONVERSATION
        </span>
        <p className="text-sm text-[#111318] italic font-sans">
          “Paint my room white for ₹8,000 by Friday.”
        </p>
      </div>

      {/* Clean Extraction Sheet */}
      <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] overflow-hidden text-xs shadow-xs">
        <div className="p-4 bg-[#F7F8FA] border-b border-[#E4E7EC] flex items-center justify-between font-mono">
          <span className="text-xs font-semibold text-[#111318] uppercase tracking-wider">
            REQUIREMENTS CHECKPOINTS
          </span>
          <span className="text-xs text-[#174EA6] font-bold">
            CONFIDENCE: {agreement.confidenceScore}%
          </span>
        </div>

        <div className="divide-y divide-[#E4E7EC]">
          {agreement.requirements.map((req: any) => {
            const isEditing = editingId === req.id;

            return (
              <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F8FA]/50 transition-colors">
                <div className="w-48 shrink-0">
                  <span className="text-xs font-semibold text-[#111318] block">
                    {req.label}
                  </span>
                  <span className="text-[10px] text-[#98A2B3] font-mono">
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
                        className="bg-[#FFFFFF] border border-[#174EA6] rounded-[4px] px-2.5 py-1 text-xs text-[#111318] font-semibold focus:outline-none"
                      />
                      <button
                        onClick={() => handleSave(req.id)}
                        className="px-2.5 py-1 bg-[#174EA6] text-white text-[11px] font-semibold rounded-[4px] cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-mono font-bold text-[#111318]">
                      {req.agreedValue}
                    </span>
                  )}
                </div>

                <div className="shrink-0">
                  {!isEditing && (
                    <button
                      onClick={() => handleEdit(req.id, req.agreedValue)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold uppercase text-[#667085] hover:text-[#111318] border border-[#E4E7EC] rounded-[4px] hover:bg-[#F2F4F7] cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional notes */}
        <div className="p-4 border-t border-[#E4E7EC] bg-[#F7F8FA] text-xs text-[#667085]">
          <span className="font-semibold text-[#111318]">NOTES: </span>
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
          className="inline-flex items-center gap-1.5 py-2 px-4 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F2F4F7] text-[#111318] border border-[#E4E7EC] text-xs font-semibold cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          onClick={() => confirmDraftAgreementAndProceed()}
          className="inline-flex items-center gap-2 py-2.5 px-6 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-xs"
        >
          <span>Confirm Agreement</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
