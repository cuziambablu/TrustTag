import React, { useState } from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { Agreement, Requirement } from '../types/trustTag';
import {
  Check,
  Plus,
  Trash2,
  Lock,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  Layers,
  Upload,
  CheckCircle2,
  Calendar,
  DollarSign,
  User,
  Shield
} from 'lucide-react';

export const CreateTagPage: React.FC = () => {
  const { setPage, setDraftAgreement, setDraftEvidence, addToast } = useTrustTagStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Agreement Basics
  const [service, setService] = useState('Living Room Painting');
  const [description, setDescription] = useState('Paint entire living room walls in matte white with two opaque coats.');
  const [price, setPrice] = useState('₹12,500');
  const [deadline, setDeadline] = useState('Friday, Sep 25');
  const [counterparty, setCounterparty] = useState('Rahul Verma (Master Painter)');
  const [customerName, setCustomerName] = useState('Irfan (Client)');

  // Step 2: Dynamic Measurable Requirements
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: 'req-1',
      type: 'color',
      label: 'Wall color',
      agreedValue: 'Matte white',
      evidenceType: 'photo',
      status: 'pending',
      confidence: 96
    },
    {
      id: 'req-2',
      type: 'task',
      label: 'Application coats',
      agreedValue: 'Two coats',
      evidenceType: 'photo',
      status: 'pending',
      confidence: 94
    },
    {
      id: 'req-3',
      type: 'task',
      label: 'Scope perimeter',
      agreedValue: 'Living room + ceiling',
      evidenceType: 'photo',
      status: 'pending',
      confidence: 92
    },
    {
      id: 'req-4',
      type: 'deadline',
      label: 'Completion time',
      agreedValue: 'Complete by Friday',
      evidenceType: 'photo',
      status: 'pending',
      confidence: 99
    }
  ]);

  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newEvidenceType, setNewEvidenceType] = useState<'photo' | 'document' | 'video'>('photo');

  const addRequirement = () => {
    if (!newLabel || !newValue) return;
    const newReq: Requirement = {
      id: `req-${Date.now()}`,
      type: 'custom',
      label: newLabel,
      agreedValue: newValue,
      evidenceType: newEvidenceType,
      status: 'pending',
      confidence: 90
    };
    setRequirements([...requirements, newReq]);
    setNewLabel('');
    setNewValue('');
  };

  const removeRequirement = (id: string) => {
    setRequirements(requirements.filter((r) => r.id !== id));
  };

  // Step 3: Evidence Selection
  const [selectedPreset, setSelectedPreset] = useState<'white-room' | 'blue-room' | 'blurry-ceiling'>('white-room');

  // Step 4: Lock
  const handleLockAgreement = () => {
    const agreement: Agreement = {
      task: service,
      category: 'Home Services',
      description,
      price,
      deadline,
      color: requirements.find((r) => r.type === 'color')?.agreedValue || 'Matte white',
      finish: 'Matte',
      confidenceScore: 94,
      requirements
    };

    setDraftAgreement(agreement);

    // Attach preset evidence
    const evidenceObj = {
      id: `ev-${Date.now()}`,
      fileName: selectedPreset === 'white-room' ? 'living_room_white_final.jpg' : 'living_room_paint_delivered.jpg',
      fileType: 'image' as const,
      url: selectedPreset === 'white-room' ? '/demo/white-room.svg' : '/demo/blue-room.svg',
      uploadedAt: 'Just now',
      metadata: { quality: 'Good' as const }
    };
    setDraftEvidence(evidenceObj);

    addToast('Agreement Locked', 'Requirements cryptographically hashed and sealed.', 'success');
    setPage('verification-result');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] font-semibold block">
          NEW CASE SETUP
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111318] mt-1">
          Create a Verifiable Agreement
        </h1>
        <p className="text-sm text-[#667085] mt-1">
          Capture deliverables and atomic measurable checkpoints into an immutable TrustTag record.
        </p>
      </div>

      {/* 4-Step Stepper */}
      <div className="grid grid-cols-4 border-b border-[#E4E7EC] pb-4 font-mono text-xs">
        {[
          { num: 1, title: 'Agreement' },
          { num: 2, title: 'Requirements' },
          { num: 3, title: 'Evidence' },
          { num: 4, title: 'Review & Lock' },
        ].map((s) => (
          <div
            key={s.num}
            onClick={() => {
              if (s.num < step) setStep(s.num as any);
            }}
            className={`flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-2 cursor-pointer ${
              step === s.num
                ? 'text-[#174EA6] font-bold'
                : step > s.num
                ? 'text-[#15803D]'
                : 'text-[#98A2B3]'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === s.num
                ? 'bg-[#174EA6] text-white'
                : step > s.num
                ? 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]'
                : 'bg-[#F2F4F7] text-[#667085]'
            }`}>
              {step > s.num ? '✓' : s.num}
            </span>
            <span className="text-[11px] uppercase tracking-wide truncate">{s.title}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Agreement Details */}
      {step === 1 && (
        <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
          <div className="border-b border-[#E4E7EC] pb-3">
            <h2 className="text-base font-bold text-[#111318]">01 Agreement Parameters</h2>
            <p className="text-xs text-[#667085] mt-0.5">Specify service scope, financial consideration, and counterparty details.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                Service Name
              </label>
              <input
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="e.g. Living Room Painting"
                className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E4E7EC] text-sm text-[#111318] focus:outline-none focus:border-[#174EA6] focus:ring-1 focus:ring-[#174EA6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                Scope Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the agreed deliverables and expectations..."
                className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E4E7EC] text-sm text-[#111318] focus:outline-none focus:border-[#174EA6] focus:ring-1 focus:ring-[#174EA6]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                  Agreed Price / Fee
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="₹12,500"
                    className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E4E7EC] text-sm text-[#111318] font-mono focus:outline-none focus:border-[#174EA6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                  Completion Deadline
                </label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="Friday, Sep 25"
                  className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E4E7EC] text-sm text-[#111318] focus:outline-none focus:border-[#174EA6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F2F4F7]">
              <div>
                <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                  Service Provider
                </label>
                <input
                  type="text"
                  value={counterparty}
                  onChange={(e) => setCounterparty(e.target.value)}
                  placeholder="e.g. Rahul Verma (Provider)"
                  className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E4E7EC] text-sm text-[#111318] focus:outline-none focus:border-[#174EA6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111318] mb-1.5">
                  Customer / Client
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Irfan (Client)"
                  className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E4E7EC] text-sm text-[#111318] focus:outline-none focus:border-[#174EA6]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E4E7EC]">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              <span>Continue to Requirements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Dynamic Measurable Requirements */}
      {step === 2 && (
        <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
          <div className="border-b border-[#E4E7EC] pb-3">
            <h2 className="text-base font-bold text-[#111318]">02 Measurable Requirements</h2>
            <p className="text-xs text-[#667085] mt-0.5">
              Turn expectations into verifiable clauses that TrustTag AI can test against photographic evidence.
            </p>
          </div>

          {/* Current Dynamic List */}
          <div className="space-y-3">
            {requirements.map((req, idx) => (
              <div
                key={req.id}
                className="p-3.5 rounded-[6px] bg-[#F7F8FA] border border-[#E4E7EC] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-[#FFFFFF] border border-[#E4E7EC] flex items-center justify-center font-mono text-[11px] font-bold text-[#667085]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-[#111318] block">{req.label}</span>
                    <span className="text-[11px] text-[#667085]">
                      Expected: <strong className="text-[#111318] font-mono">{req.agreedValue}</strong> • Evidence: {req.evidenceType}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeRequirement(req.id)}
                  className="p-1 text-[#98A2B3] hover:text-[#B42318] transition-colors cursor-pointer"
                  title="Remove requirement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Dynamic Requirement */}
          <div className="p-4 rounded-[6px] border border-dashed border-[#D0D5DD] bg-[#FAFAFA] space-y-3">
            <span className="text-xs font-semibold text-[#111318] block font-mono">
              + ADD NEW REQUIREMENT CHECKPOINT
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div className="sm:col-span-5">
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Requirement (e.g. Wall color)"
                  className="w-full px-3 py-2 rounded-[5px] border border-[#E4E7EC] bg-[#FFFFFF] focus:outline-none focus:border-[#174EA6]"
                />
              </div>
              <div className="sm:col-span-4">
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Expected (e.g. Matte white)"
                  className="w-full px-3 py-2 rounded-[5px] border border-[#E4E7EC] bg-[#FFFFFF] focus:outline-none focus:border-[#174EA6]"
                />
              </div>
              <div className="sm:col-span-3 flex gap-2">
                <select
                  value={newEvidenceType}
                  onChange={(e) => setNewEvidenceType(e.target.value as any)}
                  className="flex-1 px-2 py-2 rounded-[5px] border border-[#E4E7EC] bg-[#FFFFFF] focus:outline-none focus:border-[#174EA6]"
                >
                  <option value="photo">Photo</option>
                  <option value="document">Doc</option>
                  <option value="video">Video</option>
                </select>
                <button
                  onClick={addRequirement}
                  className="px-3 py-2 rounded-[5px] bg-[#111318] hover:bg-[#2E2E2E] text-white font-semibold cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#E4E7EC]">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] border border-[#E4E7EC] bg-[#FFFFFF] hover:bg-[#F2F4F7] text-xs font-semibold text-[#111318] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              <span>Continue to Evidence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Evidence Selection */}
      {step === 3 && (
        <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
          <div className="border-b border-[#E4E7EC] pb-3">
            <h2 className="text-base font-bold text-[#111318]">03 Photographic Delivery Evidence</h2>
            <p className="text-xs text-[#667085] mt-0.5">Attach delivery evidence or select a benchmark verification preset for immediate testing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preset 1: White Room Compliant */}
            <div
              onClick={() => setSelectedPreset('white-room')}
              className={`p-4 rounded-[8px] border-2 cursor-pointer transition-all ${
                selectedPreset === 'white-room'
                  ? 'border-[#174EA6] bg-[#EEF4FF]/30'
                  : 'border-[#E4E7EC] bg-[#FFFFFF] hover:border-[#D0D5DD]'
              }`}
            >
              <div className="aspect-[16/10] rounded-[4px] overflow-hidden bg-[#0B1220] mb-3">
                <img src="/demo/white-room.svg" alt="White room" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111318]">Delivered White Finish</span>
                <span className="text-[10px] font-mono text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.5 rounded border border-[#BBF7D0]">
                  MATCH
                </span>
              </div>
              <p className="text-[11px] text-[#667085] mt-1">
                Even matte white coat across room perimeter.
              </p>
            </div>

            {/* Preset 2: Blue Room Mismatch */}
            <div
              onClick={() => setSelectedPreset('blue-room')}
              className={`p-4 rounded-[8px] border-2 cursor-pointer transition-all ${
                selectedPreset === 'blue-room'
                  ? 'border-[#174EA6] bg-[#EEF4FF]/30'
                  : 'border-[#E4E7EC] bg-[#FFFFFF] hover:border-[#D0D5DD]'
              }`}
            >
              <div className="aspect-[16/10] rounded-[4px] overflow-hidden bg-[#0B1220] mb-3">
                <img src="/demo/blue-room.svg" alt="Blue room" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111318]">Delivered Blue Finish</span>
                <span className="text-[10px] font-mono text-[#B42318] bg-[#FEF3F2] px-1.5 py-0.5 rounded border border-[#FECDCA]">
                  MISMATCH
                </span>
              </div>
              <p className="text-[11px] text-[#667085] mt-1">
                Delivered wall is royal blue (#2563EB) instead of agreed white.
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#E4E7EC]">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] border border-[#E4E7EC] bg-[#FFFFFF] hover:bg-[#F2F4F7] text-xs font-semibold text-[#111318] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              <span>Review & Lock</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Lock */}
      {step === 4 && (
        <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
          <div className="border-b border-[#E4E7EC] pb-3">
            <h2 className="text-base font-bold text-[#111318]">04 Review & Cryptographic Lock</h2>
            <p className="text-xs text-[#667085] mt-0.5">
              Once locked, the baseline parameters become tamper-proof and verifiable by both parties.
            </p>
          </div>

          <div className="p-4 rounded-[6px] bg-[#F7F8FA] border border-[#E4E7EC] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E4E7EC]">
              <span className="text-[#667085] uppercase">Service Task</span>
              <span className="font-bold text-[#111318] font-sans">{service}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E4E7EC]">
              <span className="text-[#667085] uppercase">Consideration</span>
              <span className="font-bold text-[#174EA6]">{price}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E4E7EC]">
              <span className="text-[#667085] uppercase">Deadline</span>
              <span className="font-bold text-[#111318]">{deadline}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E4E7EC]">
              <span className="text-[#667085] uppercase">Provider</span>
              <span className="font-bold text-[#111318] font-sans">{counterparty}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#667085] uppercase">Requirements</span>
              <span className="font-bold text-[#111318]">{requirements.length} atomic clauses</span>
            </div>
          </div>

          {/* Cryptographic Assurance */}
          <div className="p-3 rounded-[6px] bg-[#EEF4FF] border border-[#D0E2FF] flex items-center gap-3 text-xs text-[#174EA6]">
            <Lock className="w-4 h-4 shrink-0" />
            <span>
              SHA-256 seal will be minted upon confirmation. Baseline cannot be secretly altered or backdated.
            </span>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#E4E7EC]">
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] border border-[#E4E7EC] bg-[#FFFFFF] hover:bg-[#F2F4F7] text-xs font-semibold text-[#111318] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleLockAgreement}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white text-xs font-semibold uppercase tracking-wider shadow-sm cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock TrustTag & Verify →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
