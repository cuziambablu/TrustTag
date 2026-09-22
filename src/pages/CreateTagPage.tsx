import React, { useState } from 'react';
import { Stepper } from '../components/ui/Stepper';
import { AudioWaveform } from '../components/ui/AudioWaveform';
import { useTrustTagStore } from '../store/trustTagStore';
import { agreementService } from '../services/agreementService';

export const CreateTagPage: React.FC = () => {
  const {
    currentStep,
    setStep,
    setDraftAgreement,
    setPage
  } = useTrustTagStore();

  const [inputMode, setInputMode] = useState<'record' | 'upload' | 'manual'>('record');
  const [manualText, setManualText] = useState('Paint my room white for ₹8,000 by Friday.');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stage, setStage] = useState(0);

  const steps = [
    'Ingesting audio transcript stream...',
    'Tokenizing contractual deliverables and constraints...',
    'Structuring measurable terms (color, compensation, delivery)...',
    'Generating formal TrustTag agreement record...'
  ];

  const handleStartAnalysis = async (textToAnalyze?: string) => {
    const text = textToAnalyze || manualText;
    setIsProcessing(true);
    setStage(0);

    const interval = setInterval(() => {
      setStage((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 400);

    const extracted = await agreementService.extractRequirements(
      text,
      inputMode === 'record' ? 'audio' : inputMode === 'upload' ? 'transcript' : 'manual'
    );

    clearInterval(interval);
    setIsProcessing(false);
    setDraftAgreement(extracted);
    setStep(2);
    setPage('agreement-review');
  };

  const handleLoadDemo = () => {
    setManualText('Paint my room white for ₹8,000 by Friday.');
    setInputMode('manual');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#6B6B67] block font-semibold">
          CREATE TRUSTTAG
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] mt-1">
          Capture the agreement.
        </h1>
        <p className="text-xs text-[#6B6B67] mt-0.5">
          Record terms before service commencement to establish verified contractual parameters.
        </p>
      </div>

      {/* Stepper Progress */}
      <Stepper currentStep={currentStep || 1} />

      {/* Processing State */}
      {isProcessing ? (
        <div className="border border-[#DCDCD6] bg-[#FFFFFF] rounded-[6px] p-8 text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1D4ED8] font-bold">
              AI EXTRACTION IN PROGRESS
            </span>
            <h2 className="text-xl font-bold text-[#171717] tracking-tight">
              Structuring agreement into measurable requirements
            </h2>
          </div>

          <div className="max-w-md mx-auto space-y-2 text-left font-mono text-xs pt-2">
            {steps.map((st, idx) => {
              const isDone = stage > idx;
              const isCurrent = stage === idx;

              return (
                <div
                  key={idx}
                  className={`p-3 border rounded-[4px] flex items-center justify-between ${
                    isCurrent
                      ? 'bg-[#F7F7F4] border-[#1D4ED8] text-[#171717]'
                      : isDone
                      ? 'bg-[#FFFFFF] border-[#DCDCD6] text-[#15803D]'
                      : 'bg-transparent border-[#EBEBE6] text-[#8F8F89]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold">{isDone ? '✓' : `0${idx + 1}`}</span>
                    <span>{st}</span>
                  </div>
                  {isCurrent && <span className="text-[10px] text-[#1D4ED8] font-bold">ACTIVE</span>}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Method Selector Tabs */}
          <div className="flex items-center border-b border-[#DCDCD6] text-xs font-mono">
            <button
              onClick={() => setInputMode('record')}
              className={`py-2 px-4 border-b-2 font-semibold transition-colors cursor-pointer ${
                inputMode === 'record'
                  ? 'border-[#171717] text-[#171717]'
                  : 'border-transparent text-[#6B6B67] hover:text-[#171717]'
              }`}
            >
              RECORD AGREEMENT
            </button>
            <button
              onClick={() => setInputMode('upload')}
              className={`py-2 px-4 border-b-2 font-semibold transition-colors cursor-pointer ${
                inputMode === 'upload'
                  ? 'border-[#171717] text-[#171717]'
                  : 'border-transparent text-[#6B6B67] hover:text-[#171717]'
              }`}
            >
              UPLOAD AUDIO
            </button>
            <button
              onClick={() => setInputMode('manual')}
              className={`py-2 px-4 border-b-2 font-semibold transition-colors cursor-pointer ${
                inputMode === 'manual'
                  ? 'border-[#171717] text-[#171717]'
                  : 'border-transparent text-[#6B6B67] hover:text-[#171717]'
              }`}
            >
              PASTE TRANSCRIPT
            </button>
          </div>

          {/* Quick preset trigger */}
          <div className="p-3 bg-[#F0F0EB] border border-[#DCDCD6] rounded-[4px] flex items-center justify-between text-xs font-mono">
            <span className="text-[#6B6B67]">
              Benchmark Preset: “Paint my room white for ₹8,000 by Friday.”
            </span>
            <button
              onClick={handleLoadDemo}
              className="px-2.5 py-1 bg-[#FFFFFF] hover:bg-[#EBEBE6] border border-[#DCDCD6] text-[#171717] font-semibold text-[11px] rounded-[3px] uppercase cursor-pointer"
            >
              Load Preset Text
            </button>
          </div>

          {/* Mode 1: Record Workspace */}
          {inputMode === 'record' && (
            <div className="space-y-3">
              <AudioWaveform
                onRecorded={(transcript) => {
                  setManualText(transcript);
                  handleStartAnalysis(transcript);
                }}
              />
              <p className="text-[11px] text-[#6B6B67] font-mono">
                Click [ Start Recording ] to dictation terms. Audio is processed locally and tokenized into parameters.
              </p>
            </div>
          )}

          {/* Mode 2: Upload Audio */}
          {inputMode === 'upload' && (
            <div className="border border-[#DCDCD6] bg-[#FFFFFF] rounded-[6px] p-8 text-center space-y-4 font-mono">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#171717] uppercase block">
                  Select Audio Recording
                </span>
                <p className="text-xs text-[#6B6B67]">
                  Supports WAV, MP3, M4A, or MP4 container formats.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setUploadedFile('agreement_call_rec_01.m4a');
                    setManualText('Paint my room white for ₹8,000 by Friday.');
                  }}
                  className="py-2 px-4 rounded-[4px] bg-[#F7F7F4] hover:bg-[#EBEBE6] border border-[#DCDCD6] text-[#171717] text-xs font-semibold cursor-pointer"
                >
                  {uploadedFile ? `Attached: ${uploadedFile}` : '[ Browse Audio File ]'}
                </button>
              </div>

              {uploadedFile && (
                <div className="text-xs text-[#15803D] bg-[#F0FDF4] p-2 border border-[#BBF7D0] rounded-[4px]">
                  File verified and loaded. Click Analyze Agreement below to proceed.
                </div>
              )}
            </div>
          )}

          {/* Mode 3: Paste Transcript */}
          {inputMode === 'manual' && (
            <div className="border border-[#DCDCD6] bg-[#FFFFFF] rounded-[6px] p-6 space-y-3 font-mono">
              <label className="text-xs font-semibold text-[#171717] block">
                CONVERSATION TRANSCRIPT
              </label>
              <textarea
                rows={4}
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Paint my bedroom white for ₹8,000 by Friday..."
                className="w-full bg-[#F7F7F4] border border-[#DCDCD6] rounded-[4px] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717] leading-relaxed"
              />
              <p className="text-[11px] text-[#6B6B67]">
                Natural conversational language will be parsed into contract fields automatically.
              </p>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleStartAnalysis()}
              className="py-2.5 px-6 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Analyze Agreement →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
