import React, { useState, useEffect } from 'react';
import { Agreement, Evidence } from '../../types/trustTag';

interface VisionScannerProps {
  evidence: Evidence;
  agreement: Agreement;
  onComplete?: () => void;
  className?: string;
}

export const VisionScanner: React.FC<VisionScannerProps> = ({
  evidence,
  agreement,
  onComplete,
  className = ''
}) => {
  const [stageIndex, setStageIndex] = useState(0);

  const stages = [
    { label: 'Surface Segmentation', detail: 'Isolating wall perimeter and boundary plane' },
    { label: 'Spectral Hue Extraction', detail: 'Measuring dominant chromatic frequency (465nm)' },
    { label: 'Requirement Comparison', detail: 'Cross-referencing agreed WHITE vs detected BLUE' },
    { label: 'Synthesizing Report', detail: 'Compiling verification audit log' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStageIndex((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(onComplete, 700);
          }
          return prev;
        }
      });
    }, 750);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`w-full bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] p-6 sm:p-8 ${className}`}>
      <div className="flex items-center justify-between border-b border-[#DCDCD6] pb-4 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B6B67] block">
            EVIDENCE ANALYSIS IN PROGRESS
          </span>
          <h2 className="text-lg font-bold text-[#171717] tracking-tight mt-0.5">
            Cross-checking submitted proof against contractual terms
          </h2>
        </div>
        <div className="text-right font-mono text-xs text-[#1D4ED8]">
          STAGE {stageIndex + 1} OF {stages.length}
        </div>
      </div>

      {/* Split screen: LEFT Agreement / RIGHT Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Agreement Terms Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[#DCDCD6] rounded-[4px] p-4 bg-[#F7F7F4]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B67] block mb-3 font-semibold">
              CONTRACTED REQUIREMENTS
            </span>
            <div className="divide-y divide-[#DCDCD6] text-xs font-mono">
              <div className="py-2 flex justify-between">
                <span className="text-[#6B6B67]">TASK</span>
                <span className="text-[#171717] font-semibold">{agreement.task}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#6B6B67]">COLOR</span>
                <span className="text-[#171717] font-semibold">{agreement.color || 'White'}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#6B6B67]">PRICE</span>
                <span className="text-[#171717] font-semibold">{agreement.price}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#6B6B67]">DEADLINE</span>
                <span className="text-[#171717] font-semibold">{agreement.deadline}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-[#6B6B67]">FINISH</span>
                <span className="text-[#171717] font-semibold">{agreement.finish || 'Matte'}</span>
              </div>
            </div>
          </div>

          {/* Real-time telemetry steps */}
          <div className="border border-[#DCDCD6] rounded-[4px] p-4 bg-[#FFFFFF]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B67] block mb-3 font-semibold">
              INSPECTION TELEMETRY
            </span>
            <div className="space-y-2.5">
              {stages.map((s, idx) => {
                const isPassed = stageIndex > idx;
                const isCurrent = stageIndex === idx;

                return (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-mono">
                    <span
                      className={`w-4 h-4 rounded-[2px] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                        isPassed
                          ? 'bg-[#15803D] text-white'
                          : isCurrent
                          ? 'bg-[#1D4ED8] text-white'
                          : 'bg-[#F0F0EB] text-[#8F8F89]'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </span>
                    <div>
                      <span className={`block font-semibold ${isCurrent ? 'text-[#1D4ED8]' : isPassed ? 'text-[#171717]' : 'text-[#8F8F89]'}`}>
                        {s.label}
                      </span>
                      <span className="text-[11px] text-[#6B6B67]">
                        {s.detail}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Large Actual Uploaded Image with Subtle Scanner (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-[#DCDCD6] rounded-[4px] overflow-hidden bg-[#151515] relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={evidence.url}
                alt="Evidence under inspection"
                className="w-full h-full object-cover select-none"
              />

              {/* Restrained subtle scanning line */}
              <div className="absolute left-0 right-0 h-[1.5px] bg-[#1D4ED8] shadow-[0_0_8px_rgba(29,78,216,0.8)] animate-scan-subtle z-20 pointer-events-none" />

              {/* Technical reticle tag */}
              <div className="absolute top-3 left-3 bg-[#151515]/90 text-white font-mono text-[10px] px-2 py-0.5 rounded-[2px] border border-[#2E2E2E]">
                SRC: {evidence.fileName}
              </div>

              {/* Bounding target area */}
              <div className="absolute top-[18%] left-[16%] w-[68%] h-[58%] border border-dashed border-[#1D4ED8] pointer-events-none p-2 flex items-end justify-end">
                <span className="bg-[#151515]/90 text-[#FFFFFF] font-mono text-[10px] px-1.5 py-0.5 border border-[#2E2E2E]">
                  SPECTRAL EXTRACT: #2563EB
                </span>
              </div>
            </div>

            {/* Analysis readout bar beneath image */}
            <div className="p-3 bg-[#1F1F1F] border-t border-[#2E2E2E] text-white font-mono text-xs flex flex-wrap items-center justify-between gap-2">
              <span>COLOR DETECTED: <strong className="text-[#93C5FD]">BLUE (#2563EB)</strong></span>
              <span>TASK: <strong>PAINTED ROOM</strong></span>
              <span>FINISH: <strong>MATTE</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
