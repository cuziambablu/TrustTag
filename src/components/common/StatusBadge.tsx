import React from 'react';
import { TrustTagStatus, RequirementStatus } from '../../types/trustTag';

interface StatusBadgeProps {
  status: TrustTagStatus | RequirementStatus | 'needs_review' | 'review';
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = ''
}) => {
  const configs: Record<
    string,
    { label: string; bg: string; text: string; border: string; dot: string }
  > = {
    verified: {
      label: 'VERIFIED',
      bg: 'bg-[#F0FDF4]',
      text: 'text-[#15803D]',
      border: 'border-[#BBF7D0]',
      dot: 'bg-[#15803D]'
    },
    matched: {
      label: 'MATCHED',
      bg: 'bg-[#F0FDF4]',
      text: 'text-[#15803D]',
      border: 'border-[#BBF7D0]',
      dot: 'bg-[#15803D]'
    },
    mismatch: {
      label: 'MISMATCH',
      bg: 'bg-[#FEF3F2]',
      text: 'text-[#B42318]',
      border: 'border-[#FECDCA]',
      dot: 'bg-[#B42318]'
    },
    warning: {
      label: 'NEEDS REVIEW',
      bg: 'bg-[#FFFBEB]',
      text: 'text-[#B45309]',
      border: 'border-[#FDE68A]',
      dot: 'bg-[#B45309]'
    },
    needs_review: {
      label: 'NEEDS REVIEW',
      bg: 'bg-[#FFFBEB]',
      text: 'text-[#B45309]',
      border: 'border-[#FDE68A]',
      dot: 'bg-[#B45309]'
    },
    review: {
      label: 'NEEDS REVIEW',
      bg: 'bg-[#FFFBEB]',
      text: 'text-[#B45309]',
      border: 'border-[#FDE68A]',
      dot: 'bg-[#B45309]'
    },
    active: {
      label: 'ACTIVE',
      bg: 'bg-[#EEF4FF]',
      text: 'text-[#174EA6]',
      border: 'border-[#D0E2FF]',
      dot: 'bg-[#174EA6]'
    },
    pending: {
      label: 'AWAITING EVIDENCE',
      bg: 'bg-[#F7F8FA]',
      text: 'text-[#667085]',
      border: 'border-[#E4E7EC]',
      dot: 'bg-[#98A2B3]'
    }
  };

  const current = configs[status] || configs.pending;

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1.5',
    md: 'text-[11px] px-2 py-0.5 gap-1.5'
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-[4px] border ${current.bg} ${current.text} ${current.border} ${sizeClasses[size]} tracking-wider uppercase ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} shrink-0`} />
      <span>{current.label}</span>
    </span>
  );
};
