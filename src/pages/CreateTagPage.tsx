import React, { useState } from 'react';
import { useTrustTagStore } from '../store/trustTagStore';
import { Agreement, Requirement } from '../types/trustTag';

export const CreateTagPage: React.FC = () => {
  const { setPage, setDraftAgreement, addToast } = useTrustTagStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Category / What are you hiring for?
  const [category, setCategory] = useState('Home Services');

  // Step 2: Define the agreement
  const [service, setService] = useState('Apartment Painting');
  const [description, setDescription] = useState('Paint bedroom walls white with two coats of washable matte paint.');
  const [price, setPrice] = useState('₹8,000');
  const [deadline, setDeadline] = useState('Friday, 6:00 PM');

  // Step 3: Define measurable requirements
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: 'req-1',
      type: 'color',
      label: 'Wall Paint Color',
      agreedValue: 'White',
      evidenceType: 'photo',
      status: 'pending',
      confidence: 96
    },
    {
      id: 'req-2',
      type: 'task',
      label: 'Coat Application',
      agreedValue: 'Two coats',
      evidenceType: 'photo',
      status: 'pending',
      confidence: 94
    },
    {
      id: 'req-3',
      type: 'task',
      label: 'Coverage Area',
      agreedValue: 'Bedroom perimeter',
      evidenceType: 'photo',
      status: 'pending',
      confidence: 98
    },
    {
      id: 'req-4',
      type: 'deadline',
      label: 'Completion Schedule',
      agreedValue: 'Before Friday 6:00 PM',
      evidenceType: 'photo',
      status: 'pending',
      confidence: 99
    }
  ]);

  const [newReqLabel, setNewReqLabel] = useState('');
  const [newReqValue, setNewReqValue] = useState('');
  const [newReqType, setNewReqType] = useState<'photo' | 'document' | 'video'>('photo');

  const addRequirement = () => {
    if (!newReqLabel || !newReqValue) return;
    const newReq: Requirement = {
      id: `req-${Date.now()}`,
      type: 'custom',
      label: newReqLabel,
      agreedValue: newReqValue,
      evidenceType: newReqType,
      status: 'pending',
      confidence: 90
    };
    setRequirements([...requirements, newReq]);
    setNewReqLabel('');
    setNewReqValue('');
  };

  const removeRequirement = (id: string) => {
    setRequirements(requirements.filter((r) => r.id !== id));
  };

  const categories = [
    { id: 'Home Services', desc: 'Painting, plumbing, electrical, carpentry, repairs' },
    { id: 'Digital Studio', desc: 'Web development, mobile apps, software integration' },
    { id: 'Commercial Trades', desc: 'HVAC installation, machining, equipment service' },
    { id: 'Creative & Design', desc: 'Logo design, brand identity, video editing' }
  ];

  const handleFinalize = () => {
    const agreement: Agreement = {
      task: service,
      category,
      description,
      price,
      deadline,
      color: requirements.find((r) => r.type === 'color')?.agreedValue || 'White',
      finish: 'Matte',
      confidenceScore: 94,
      requirements
    };

    setDraftAgreement(agreement);
    setStep(5);
    addToast('TrustTag Agreement Created', `${service} (${price}) locked successfully`, 'success');
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div className="border-b border-[#DCDCD6] pb-4">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
          AGREEMENT CREATION // 5-STEP WORKFLOW
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#111111] mt-0.5">
          {step === 1 && 'What are you hiring for?'}
          {step === 2 && 'Define the agreement.'}
          {step === 3 && 'Define measurable requirements.'}
          {step === 4 && 'Review agreement.'}
          {step === 5 && 'TrustTag Created.'}
        </h1>
        <p className="text-xs text-[#6B6B67] mt-0.5">
          Step {step} of 5 • Simple, unambiguous criteria both parties agree to.
        </p>
      </div>

      {/* Thin Horizontal Step Progress */}
      <div className="grid grid-cols-5 gap-2 border-b border-[#DCDCD6] pb-3 text-xs font-mono">
        {[
          { num: 1, label: 'Category' },
          { num: 2, label: 'Terms' },
          { num: 3, label: 'Requirements' },
          { num: 4, label: 'Review' },
          { num: 5, label: 'Complete' }
        ].map((s) => (
          <div key={s.num} className="space-y-1">
            <div
              className={`h-[2px] w-full ${
                step === s.num
                  ? 'bg-[#1D4ED8]'
                  : step > s.num
                  ? 'bg-[#111111]'
                  : 'bg-[#DCDCD6]'
              }`}
            />
            <span
              className={`text-[10px] block ${
                step === s.num ? 'font-bold text-[#1D4ED8]' : step > s.num ? 'text-[#111111]' : 'text-[#8F8F89]'
              }`}
            >
              0{s.num} {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: What are you hiring for? */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`p-4 border rounded-[4px] cursor-pointer transition-colors ${
                  category === cat.id
                    ? 'border-[#111111] bg-[#FFFFFF] ring-1 ring-[#111111]'
                    : 'border-[#DCDCD6] bg-[#FFFFFF] hover:border-[#111111]'
                }`}
              >
                <span className="font-bold text-sm text-[#111111] block mb-1">
                  {cat.id}
                </span>
                <span className="text-[11px] font-sans text-[#6B6B67] leading-relaxed">
                  {cat.desc}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="py-2.5 px-6 rounded-[4px] bg-[#111111] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Next: Define Agreement →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Define the agreement */}
      {step === 2 && (
        <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-6 space-y-4 font-mono text-xs">
          <div>
            <label className="text-[10px] uppercase text-[#6B6B67] block mb-1">
              SERVICE TITLE
            </label>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="e.g. Apartment Painting"
              className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase text-[#6B6B67] block mb-1">
              DESCRIPTION & SCOPE
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what was agreed..."
              className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#111111] focus:outline-none focus:border-[#111111] font-sans text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase text-[#6B6B67] block mb-1">
                AGREED PRICE (INR)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₹8,000"
                className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase text-[#6B6B67] block mb-1">
                DEADLINE
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="Friday, 6:00 PM"
                className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px] px-3 py-2 text-[#111111] focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#DCDCD6]">
            <button
              onClick={() => setStep(1)}
              className="py-2 px-4 rounded-[4px] bg-[#F7F7F4] border border-[#DCDCD6] text-[#111111] text-xs font-semibold cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="py-2.5 px-6 rounded-[4px] bg-[#111111] hover:bg-[#2E2E2E] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Next: Define Requirements →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Define measurable requirements */}
      {step === 3 && (
        <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-6 space-y-6 font-mono text-xs">
          <div>
            <span className="text-[10px] uppercase text-[#6B6B67] block font-semibold mb-2">
              MEASURABLE VERIFICATION REQUIREMENTS
            </span>
            <div className="border border-[#DCDCD6] rounded-[4px] divide-y divide-[#DCDCD6]">
              {requirements.map((r) => (
                <div key={r.id} className="p-3 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-[#111111] block">{r.label}</span>
                    <span className="text-[11px] text-[#6B6B67]">
                      Expected: <strong>{r.agreedValue}</strong> • Evidence: {r.evidenceType || 'photo'}
                    </span>
                  </div>
                  <button
                    onClick={() => removeRequirement(r.id)}
                    className="text-[10px] text-[#B91C1C] hover:underline uppercase cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Requirement Sub-form */}
          <div className="p-4 bg-[#F7F7F4] border border-[#DCDCD6] rounded-[4px] space-y-3">
            <span className="text-[10px] uppercase font-bold text-[#111111] block">
              + ADD NEW REQUIREMENT
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[9px] uppercase text-[#6B6B67] block mb-1">Requirement Name</label>
                <input
                  type="text"
                  value={newReqLabel}
                  onChange={(e) => setNewReqLabel(e.target.value)}
                  placeholder="e.g. Clean trim masking"
                  className="w-full bg-[#FFFFFF] border border-[#DCDCD6] rounded-[2px] px-2.5 py-1.5 text-xs text-[#111111]"
                />
              </div>
              <div>
                <label className="text-[9px] uppercase text-[#6B6B67] block mb-1">Expected Value</label>
                <input
                  type="text"
                  value={newReqValue}
                  onChange={(e) => setNewReqValue(e.target.value)}
                  placeholder="e.g. Straight edge lines"
                  className="w-full bg-[#FFFFFF] border border-[#DCDCD6] rounded-[2px] px-2.5 py-1.5 text-xs text-[#111111]"
                />
              </div>
              <div>
                <label className="text-[9px] uppercase text-[#6B6B67] block mb-1">Evidence Type</label>
                <select
                  value={newReqType}
                  onChange={(e) => setNewReqType(e.target.value as any)}
                  className="w-full bg-[#FFFFFF] border border-[#DCDCD6] rounded-[2px] px-2 py-1.5 text-xs text-[#111111]"
                >
                  <option value="photo">Photo</option>
                  <option value="document">Document / PDF</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={addRequirement}
              className="py-1.5 px-3 bg-[#111111] text-white text-[11px] rounded-[3px] font-semibold uppercase cursor-pointer"
            >
              Add Requirement
            </button>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#DCDCD6]">
            <button
              onClick={() => setStep(2)}
              className="py-2 px-4 rounded-[4px] bg-[#F7F7F4] border border-[#DCDCD6] text-[#111111] text-xs font-semibold cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="py-2.5 px-6 rounded-[4px] bg-[#111111] hover:bg-[#2E2E2E] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Next: Review Agreement →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Review agreement */}
      {step === 4 && (
        <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-6 space-y-6 font-mono text-xs">
          <div className="border-b border-[#DCDCD6] pb-3">
            <span className="text-[10px] text-[#6B6B67] uppercase block font-semibold">
              AGREEMENT SUMMARY FOR CONFIRMATION
            </span>
            <h2 className="text-base font-bold text-[#111111] mt-0.5">
              {service} ({category})
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px]">
              <span className="text-[10px] text-[#6B6B67] block">PRICE</span>
              <span className="text-sm font-bold text-[#111111]">{price}</span>
            </div>
            <div className="p-3 bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px]">
              <span className="text-[10px] text-[#6B6B67] block">DEADLINE</span>
              <span className="text-sm font-bold text-[#111111]">{deadline}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-[#6B6B67] uppercase block font-semibold mb-2">
              REQUIREMENTS TO BE VERIFIED ({requirements.length})
            </span>
            <div className="border border-[#DCDCD6] rounded-[4px] divide-y divide-[#DCDCD6]">
              {requirements.map((r, i) => (
                <div key={r.id} className="p-2.5 flex justify-between">
                  <span className="font-semibold text-[#111111]">{i + 1}. {r.label}</span>
                  <span className="text-[#6B6B67]">Expected: <strong>{r.agreedValue}</strong></span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#DCDCD6]">
            <button
              onClick={() => setStep(3)}
              className="py-2 px-4 rounded-[4px] bg-[#F7F7F4] border border-[#DCDCD6] text-[#111111] text-xs font-semibold cursor-pointer"
            >
              ← Edit Requirements
            </button>
            <button
              onClick={handleFinalize}
              className="py-2.5 px-6 rounded-[4px] bg-[#111111] hover:bg-[#2E2E2E] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Lock Agreement & Create TrustTag →
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Create TrustTag Complete */}
      {step === 5 && (
        <div className="bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-8 text-center space-y-4 font-mono">
          <div className="w-10 h-10 rounded-[4px] bg-[#15803D] text-white flex items-center justify-center font-bold text-lg mx-auto">
            ✓
          </div>
          <div>
            <span className="text-[10px] text-[#15803D] font-bold uppercase tracking-wider block">
              TRUSTTAG ACTIVE
            </span>
            <h2 className="text-xl font-bold text-[#111111] mt-1 font-sans">
              Agreement successfully locked.
            </h2>
            <p className="text-xs text-[#6B6B67] mt-1 max-w-sm mx-auto font-sans">
              Both parties now have an immutable reference record. When work concludes, upload evidence to verify delivery.
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-3 text-xs font-mono">
            <button
              onClick={() => setPage('dashboard')}
              className="py-2 px-4 rounded-[4px] bg-[#F7F7F4] hover:bg-[#EBEBE6] border border-[#DCDCD6] text-[#111111] cursor-pointer"
            >
              Return to Dashboard
            </button>
            <button
              onClick={() => setPage('evidence-upload')}
              className="py-2 px-5 rounded-[4px] bg-[#111111] hover:bg-[#2E2E2E] text-white uppercase font-semibold cursor-pointer"
            >
              Upload Evidence Now →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
