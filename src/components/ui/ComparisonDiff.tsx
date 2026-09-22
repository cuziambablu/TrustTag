import React from 'react';
import { VerificationFinding } from '../../types/trustTag';

interface ComparisonDiffProps {
  agreedColor?: string;
  detectedColor?: string;
  findings: VerificationFinding[];
  matchedCount: number;
  totalRequirements: number;
  confidence: number;
  overallStatus: 'verified' | 'mismatch' | 'needs_review';
  className?: string;
}

export const ComparisonDiff: React.FC<ComparisonDiffProps> = ({
  agreedColor = 'White',
  detectedColor = 'Blue',
  findings,
  matchedCount,
  totalRequirements,
  confidence,
  overallStatus,
  className = ''
}) => {
  const isMismatch = overallStatus === 'mismatch';

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Primary Discrepancy Table */}
      {agreedColor && detectedColor && (
        <div className="border border-[#DCDCD6] bg-[#FFFFFF] rounded-[4px] p-5">
          <div className="flex items-center justify-between border-b border-[#DCDCD6] pb-3 mb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B6B67] font-semibold">
              PRIMARY PARAMETER COMPARISON
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-[2px] font-semibold uppercase ${
                isMismatch
                  ? 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]'
                  : 'bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]'
              }`}
            >
              {isMismatch ? 'DEVIATION DETECTED' : 'CONSISTENT'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-[#F7F7F4] border border-[#DCDCD6] rounded-[3px]">
              <span className="text-[10px] text-[#6B6B67] uppercase block mb-1">
                AGREED COLOR
              </span>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-[2px] border border-[#DCDCD6]"
                  style={{ backgroundColor: agreedColor.toLowerCase() === 'white' ? '#FFFFFF' : '#DCDCD6' }}
                />
                <span className="text-sm font-bold text-[#171717] uppercase">
                  {agreedColor}
                </span>
              </div>
            </div>

            <div
              className={`p-3 border rounded-[3px] ${
                isMismatch
                  ? 'bg-[#FEF2F2] border-[#FECACA]'
                  : 'bg-[#F0FDF4] border-[#BBF7D0]'
              }`}
            >
              <span
                className={`text-[10px] uppercase block mb-1 ${
                  isMismatch ? 'text-[#991B1B]' : 'text-[#166534]'
                }`}
              >
                DETECTED COLOR
              </span>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-[2px] border border-[#93C5FD]"
                  style={{
                    backgroundColor:
                      detectedColor.toLowerCase() === 'blue'
                        ? '#2563EB'
                        : '#FFFFFF'
                  }}
                />
                <span
                  className={`text-sm font-bold uppercase ${
                    isMismatch ? 'text-[#991B1B]' : 'text-[#166534]'
                  }`}
                >
                  {detectedColor}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Requirement Check Matrix */}
      <div className="border border-[#DCDCD6] bg-[#FFFFFF] rounded-[4px] overflow-hidden">
        <div className="p-4 border-b border-[#DCDCD6] bg-[#F7F7F4] flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#171717] font-semibold">
            REQUIREMENT CHECK
          </span>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span>
              MATCHED: <strong>{matchedCount} / {totalRequirements}</strong>
            </span>
            <span className="text-[#6B6B67]">|</span>
            <span>
              CONFIDENCE: <strong className="text-[#171717]">{confidence}%</strong>
            </span>
          </div>
        </div>

        <div className="divide-y divide-[#DCDCD6] text-xs">
          {findings.map((item) => {
            const isItemMismatch = item.status === 'mismatch';

            return (
              <div
                key={item.requirementId}
                className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isItemMismatch ? 'bg-[#FEF2F2]/40' : 'hover:bg-[#F7F7F4]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`font-mono font-bold text-xs shrink-0 mt-0.5 ${
                      isItemMismatch ? 'text-[#B91C1C]' : 'text-[#15803D]'
                    }`}
                  >
                    {isItemMismatch ? '✕' : '✓'}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#171717]">
                        {item.label}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded-[2px] uppercase ${
                          isItemMismatch
                            ? 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]'
                            : 'bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]'
                        }`}
                      >
                        {isItemMismatch ? 'Mismatch' : 'Verified'}
                      </span>
                    </div>

                    <div className="mt-1 font-mono text-[11px] text-[#6B6B67]">
                      <span>Agreed: <strong>{item.agreed}</strong></span>
                      <span className="mx-2">→</span>
                      <span className={isItemMismatch ? 'text-[#B91C1C] font-semibold' : 'text-[#171717]'}>
                        Detected: {item.detected}
                      </span>
                    </div>

                    {item.reasoning && (
                      <p className="mt-1 text-[11px] text-[#6B6B67] leading-relaxed">
                        {item.reasoning}
                      </p>
                    )}
                  </div>
                </div>

                <div className="self-end sm:self-center font-mono text-[10px] text-[#8F8F89] shrink-0">
                  {item.confidence}% CONF
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
