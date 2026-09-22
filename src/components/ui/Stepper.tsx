import React from 'react';

interface StepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  onStepClick,
  className = ''
}) => {
  const steps = [
    { number: 1, label: 'Agreement', meta: 'Ingest Terms' },
    { number: 2, label: 'Requirements', meta: 'Structured Specs' },
    { number: 3, label: 'Evidence', meta: 'Deliverable File' },
    { number: 4, label: 'Verification', meta: 'Audit Report' }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-4 gap-2 sm:gap-4 border-b border-[#DCDCD6] pb-4">
        {steps.map((step) => {
          const isDone = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              onClick={() => onStepClick && isDone && onStepClick(step.number)}
              className={`flex flex-col select-none transition-colors ${
                isDone && onStepClick ? 'cursor-pointer' : ''
              }`}
            >
              {/* Thin progress line */}
              <div
                className={`h-[2px] w-full mb-2.5 transition-colors ${
                  isCurrent
                    ? 'bg-[#1D4ED8]'
                    : isDone
                    ? 'bg-[#171717]'
                    : 'bg-[#E5E5E0]'
                }`}
              />

              <div className="flex items-baseline gap-1.5">
                <span
                  className={`font-mono text-[11px] font-semibold tracking-wider ${
                    isCurrent
                      ? 'text-[#1D4ED8]'
                      : isDone
                      ? 'text-[#171717]'
                      : 'text-[#8F8F89]'
                  }`}
                >
                  0{step.number}
                </span>
                <span
                  className={`text-xs font-semibold tracking-tight uppercase ${
                    isCurrent
                      ? 'text-[#171717]'
                      : isDone
                      ? 'text-[#171717]'
                      : 'text-[#6B6B67]'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#8F8F89] hidden sm:block mt-0.5">
                {step.meta}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
