import React from 'react';
import { useTrustTagStore } from '../../store/trustTagStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useTrustTagStore();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const borderStyles = {
          success: 'border-[#15803D] bg-[#FFFFFF] text-[#171717]',
          danger: 'border-[#B91C1C] bg-[#FFFFFF] text-[#171717]',
          warning: 'border-[#B45309] bg-[#FFFFFF] text-[#171717]',
          info: 'border-[#DCDCD6] bg-[#FFFFFF] text-[#171717]'
        };

        const badgeDot = {
          success: 'bg-[#15803D]',
          danger: 'bg-[#B91C1C]',
          warning: 'bg-[#B45309]',
          info: 'bg-[#1D4ED8]'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto border rounded-[4px] p-3 shadow-lg font-mono text-xs flex items-start justify-between gap-3 ${borderStyles[toast.type]} animate-in fade-in slide-in-from-bottom-2 duration-150`}
          >
            <div className="flex items-start gap-2.5">
              <span className={`w-2 h-2 rounded-full ${badgeDot[toast.type]} mt-1 shrink-0`} />
              <div>
                <span className="font-bold block tracking-tight">
                  {toast.title}
                </span>
                {toast.description && (
                  <p className="text-[11px] text-[#6B6B67] mt-0.5 font-sans leading-relaxed">
                    {toast.description}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#6B6B67] hover:text-[#171717] text-[10px] uppercase font-mono cursor-pointer shrink-0"
            >
              [X]
            </button>
          </div>
        );
      })}
    </div>
  );
};
