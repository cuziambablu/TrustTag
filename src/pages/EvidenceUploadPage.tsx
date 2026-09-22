import React, { useState } from 'react';
import { Stepper } from '../components/ui/Stepper';
import { useTrustTagStore } from '../store/trustTagStore';

export const EvidenceUploadPage: React.FC = () => {
  const {
    currentStep,
    setStep,
    setPage,
    submitEvidenceAndVerify
  } = useTrustTagStore();

  const [selectedPreset, setSelectedPreset] = useState<'blue-room' | 'white-room' | 'ac-repair'>('blue-room');
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [customUrl, setCustomUrl] = useState<string | null>(null);

  const presets = [
    {
      id: 'blue-room' as const,
      label: 'Delivered Room Photo (Blue Paint)',
      file: 'bedroom_final_01.jpg',
      meta: 'Blue paint detected (triggers Mismatch)',
      src: '/demo/blue-room.svg'
    },
    {
      id: 'white-room' as const,
      label: 'Delivered Room Photo (White Paint)',
      file: 'bedroom_compliant.jpg',
      meta: 'White paint detected (triggers Verified)',
      src: '/demo/white-room.svg'
    },
    {
      id: 'ac-repair' as const,
      label: 'Serviced AC Compressor Photo',
      file: 'ac_compressor_valve.jpg',
      meta: 'Copper valve replaced (triggers Verified)',
      src: '/demo/ac-repair.svg'
    }
  ];

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomFile(file);
      setCustomUrl(URL.createObjectURL(file));
    }
  };

  const activeSrc = customUrl || presets.find((p) => p.id === selectedPreset)?.src || '/demo/blue-room.svg';
  const activeFileName = customFile ? customFile.name : presets.find((p) => p.id === selectedPreset)?.file || 'delivered_evidence.jpg';

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
          EVIDENCE SUBMISSION
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] mt-1">
          Upload evidence of completed work.
        </h1>
        <p className="text-xs text-[#6B6B67] mt-0.5">
          Attach photographic or video proof of delivery for algorithmic verification against contract requirements.
        </p>
      </div>

      <Stepper currentStep={currentStep || 3} />

      {/* Preset Selector for Judges */}
      <div className="p-4 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[4px] font-mono text-xs">
        <span className="text-[10px] text-[#6B6B67] uppercase block mb-3 font-semibold">
          TEST BENCHMARK EVIDENCE:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {presets.map((preset) => {
            const isSelected = selectedPreset === preset.id && !customUrl;

            return (
              <div
                key={preset.id}
                onClick={() => {
                  setSelectedPreset(preset.id);
                  setCustomUrl(null);
                  setCustomFile(null);
                }}
                className={`p-3 border rounded-[4px] cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#F0F0EB] border-[#171717] text-[#171717]'
                    : 'bg-[#FFFFFF] border-[#DCDCD6] text-[#6B6B67] hover:border-[#171717]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] uppercase font-bold mb-1">
                  <span>{preset.id === 'blue-room' ? 'Mismatch Test' : 'Verified Test'}</span>
                  {isSelected && <span className="text-[#1D4ED8]">SELECTED</span>}
                </div>
                <div className="font-sans font-semibold text-xs text-[#171717]">
                  {preset.label}
                </div>
                <div className="text-[10px] text-[#6B6B67] mt-1">
                  {preset.meta}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Evidence Layout: Large Image Preview on Left + Metadata Table on Right */}
      <div className="border border-[#DCDCD6] bg-[#FFFFFF] rounded-[6px] p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Large Image Preview (7 cols) */}
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] w-full rounded-[4px] overflow-hidden border border-[#DCDCD6] bg-[#151515] relative">
              <img
                src={activeSrc}
                alt="Active evidence preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#171717]/90 text-white font-mono text-[10px] px-2 py-0.5 border border-[#2E2E2E]">
                EVIDENCE FILE // {activeFileName}
              </div>
            </div>
          </div>

          {/* Metadata Table & Upload Action (5 cols) */}
          <div className="lg:col-span-5 space-y-6 font-mono text-xs">
            <div>
              <span className="text-[10px] text-[#6B6B67] uppercase block font-semibold mb-2">
                EVIDENCE 01 METADATA
              </span>
              <div className="border border-[#DCDCD6] rounded-[4px] divide-y divide-[#DCDCD6]">
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#6B6B67]">Uploaded:</span>
                  <span className="font-semibold text-[#171717]">Sep 23, 10:32 AM</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#6B6B67]">Type:</span>
                  <span className="font-semibold text-[#171717]">Image (JPEG/SVG)</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#6B6B67]">Resolution:</span>
                  <span className="font-semibold text-[#171717]">1080p Equivalent</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#6B6B67]">Quality:</span>
                  <span className="font-semibold text-[#15803D]">Good</span>
                </div>
              </div>
            </div>

            {/* Custom file attach button */}
            <div>
              <input
                type="file"
                id="file-input"
                accept="image/*,video/*"
                onChange={handleCustomUpload}
                className="hidden"
              />
              <label
                htmlFor="file-input"
                className="block text-center py-2 px-3 border border-[#DCDCD6] rounded-[4px] bg-[#F7F7F4] hover:bg-[#EBEBE6] text-[#171717] font-semibold text-xs cursor-pointer"
              >
                [ + Add Custom Evidence ]
              </label>
              <span className="text-[10px] text-[#6B6B67] block text-center mt-1">
                Accepted: JPG / PNG / MP4
              </span>
            </div>

            {/* Run verification button */}
            <div className="pt-2">
              <button
                onClick={() => submitEvidenceAndVerify(selectedPreset)}
                className="w-full py-3 px-4 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Run Verification →
              </button>
            </div>
          </div>
        </div>

        {/* Back navigation */}
        <div className="border-t border-[#DCDCD6] pt-4 mt-6">
          <button
            onClick={() => {
              setStep(2);
              setPage('agreement-review');
            }}
            className="text-xs font-mono text-[#6B6B67] hover:text-[#171717] cursor-pointer"
          >
            ← Return to Requirements
          </button>
        </div>
      </div>
    </div>
  );
};
