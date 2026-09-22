import React, { useState } from 'react';
import { Stepper } from '../components/ui/Stepper';
import { useTrustTagStore } from '../store/trustTagStore';
import { Upload, ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export const EvidenceUploadPage: React.FC = () => {
  const {
    currentStep,
    setStep,
    setPage,
    submitEvidenceAndVerify
  } = useTrustTagStore();

  const [selectedPreset, setSelectedPreset] = useState<'blue-room' | 'white-room' | 'ac-repair' | 'blurry-ceiling'>('blue-room');
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [customUrl, setCustomUrl] = useState<string | null>(null);

  const presets = [
    {
      id: 'blue-room' as const,
      label: 'Delivered Room Photo (Blue Paint)',
      file: 'bedroom_final_delivered.jpg',
      meta: 'Blue paint detected (triggers Mismatch)',
      src: '/demo/blue-room.svg'
    },
    {
      id: 'white-room' as const,
      label: 'Delivered Room Photo (White Paint)',
      file: 'bedroom_white_compliant.jpg',
      meta: 'White paint detected (triggers Verified)',
      src: '/demo/white-room.svg'
    },
    {
      id: 'blurry-ceiling' as const,
      label: 'Ceiling Photo (Low-Res & Glare)',
      file: 'ceiling_dim_inspection.jpg',
      meta: 'Occlusion detected (triggers Needs Review)',
      src: '/demo/blurry-ceiling.svg'
    },
    {
      id: 'ac-repair' as const,
      label: 'Serviced AC Compressor Photo',
      file: 'ac_compressor_serviced.jpg',
      meta: 'OEM valve verified (triggers Verified)',
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
        <span className="text-xs font-mono uppercase tracking-widest text-[#174EA6] block font-semibold">
          EVIDENCE SUBMISSION // CASE FILE
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111318] mt-1">
          Upload Evidence of Completed Work
        </h1>
        <p className="text-xs text-[#667085] mt-1">
          Attach delivery photographic or video evidence for computer vision verification against contract requirements.
        </p>
      </div>

      <Stepper currentStep={currentStep || 3} />

      {/* Preset Selector for Evaluators */}
      <div className="p-5 bg-[#FFFFFF] border border-[#E4E7EC] rounded-[8px] text-xs shadow-xs">
        <span className="text-xs font-mono uppercase text-[#667085] block mb-3 font-semibold">
          EVALUATOR TEST PRESETS:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                className={`p-3 border rounded-[6px] cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#EEF4FF] border-[#174EA6] text-[#111318] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#E4E7EC] text-[#667085] hover:border-[#D0D5DD]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase font-bold mb-1">
                  <span>
                    {preset.id === 'blue-room'
                      ? 'Mismatch'
                      : preset.id === 'blurry-ceiling'
                      ? 'Needs Review'
                      : 'Verified'}
                  </span>
                  {isSelected && <span className="text-[#174EA6]">ACTIVE</span>}
                </div>
                <div className="font-semibold text-xs text-[#111318] line-clamp-1">
                  {preset.label}
                </div>
                <div className="text-[10px] text-[#667085] mt-1 line-clamp-1">
                  {preset.meta}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence Inspection & Metadata Pane */}
      <div className="border border-[#E4E7EC] bg-[#FFFFFF] rounded-[8px] p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Large Image Preview (7 cols) */}
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] w-full rounded-[6px] overflow-hidden border border-[#E4E7EC] bg-[#0B1220] relative">
              <img
                src={activeSrc}
                alt="Active evidence preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#0B1220]/80 text-white font-mono text-[10px] px-2 py-0.5 rounded-[3px] border border-[#1E293B]">
                {activeFileName}
              </div>
            </div>
          </div>

          {/* Metadata Table & Upload Action (5 cols) */}
          <div className="lg:col-span-5 space-y-5 text-xs">
            <div>
              <span className="text-xs font-mono text-[#667085] uppercase block font-semibold mb-2">
                EVIDENCE METADATA
              </span>
              <div className="border border-[#E4E7EC] rounded-[6px] divide-y divide-[#E4E7EC] font-mono">
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#667085]">Uploaded:</span>
                  <span className="font-semibold text-[#111318]">Sep 23, 10:32 AM</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#667085]">Type:</span>
                  <span className="font-semibold text-[#111318]">Image (JPEG/SVG)</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#667085]">Resolution:</span>
                  <span className="font-semibold text-[#111318]">
                    {selectedPreset === 'blurry-ceiling' ? '320p (Low)' : '1080p Equivalent'}
                  </span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#667085]">Quality:</span>
                  <span
                    className={`font-semibold ${
                      selectedPreset === 'blurry-ceiling' ? 'text-[#B45309]' : 'text-[#15803D]'
                    }`}
                  >
                    {selectedPreset === 'blurry-ceiling' ? 'Insufficient (Glare)' : 'Good'}
                  </span>
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
                className="flex items-center justify-center gap-2 text-center py-2.5 px-3 border border-[#E4E7EC] rounded-[6px] bg-[#F7F8FA] hover:bg-[#F2F4F7] text-[#111318] font-semibold text-xs cursor-pointer shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5 text-[#667085]" />
                <span>Upload Custom Evidence</span>
              </label>
              <span className="text-[10px] text-[#98A2B3] block text-center mt-1">
                Accepted: JPG / PNG / MP4
              </span>
            </div>

            {/* Run verification button */}
            <div className="pt-2">
              <button
                onClick={() => submitEvidenceAndVerify(selectedPreset)}
                className="w-full py-3 px-4 rounded-[6px] bg-[#174EA6] hover:bg-[#133E85] text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <span>Run Verification Telemetry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Back navigation */}
        <div className="border-t border-[#E4E7EC] pt-4 mt-6">
          <button
            onClick={() => {
              setStep(2);
              setPage('agreement-review');
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[#667085] hover:text-[#111318] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Requirements</span>
          </button>
        </div>
      </div>
    </div>
  );
};
