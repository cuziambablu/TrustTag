import React from 'react';
import { TrustTagStatus, RequirementStatus } from '../../types/trustTag';

interface StatusBadgeProps {
  status: TrustTagStatus | RequirementStatus | 'needs_review';
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
      text: 'text-[#166534]',
      border: 'border-[#BBF7D0]',
      dot: 'bg-[#15803D]'
    },
    matched: {
      label: 'MATCHED',
      bg: 'bg-[#F0FDF4]',
      text: 'text-[#166534]',
      border: 'border-[#BBF7D0]',
      dot: 'bg-[#15803D]'
    },
    mismatch: {
      label: 'MISMATCH',
      bg: 'bg-[#FEF2F2]',
      text: 'text-[#991B1B]',
      border: 'border-[#FECACA]',
      dot: 'bg-[#B91C1C]'
    },
    warning: {
      label: 'WARNING',
      bg: 'bg-[#FFFBEB]',
      text: 'text-[#92400E]',
      border: 'border-[#FDE68A]',
      dot: 'bg-[#B45309]'
    },
    needs_review: {
      label: 'PENDING REVIEW',
      bg: 'bg-[#FFFBEB]',
      text: 'text-[#92400E]',
      border: 'border-[#FDE68A]',
      dot: 'bg-[#B45309]'
    },
    review: {
      label: 'PENDING REVIEW',
      bg: 'bg-[#FFFBEB]',
      text: 'text-[#92400E]',
      border: 'border-[#FDE68A]',
      dot: 'bg-[#B45309]'
    },
    active: {
      label: 'ACTIVE',
      bg: 'bg-[#F7F7F4]',
      text: 'text-[#171717]',
      border: 'border-[#DCDCD6]',
      dot: 'bg-[#1D4ED8]'
    },
    pending: {
      label: 'PENDING',
      bg: 'bg-[#F7F7F4]',
      text: 'text-[#6B6B67]',
      border: 'border-[#DCDCD6]',
      dot: 'bg-[#8F8F89]'
    }
  };

  const current = configs[status] || configs.pending;

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1.5',
    md: 'text-[11px] px-2 py-0.5 gap-1.5'
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-[3px] border ${current.bg} ${current.text} ${current.border} ${sizeClasses[size]} tracking-wider uppercase ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} shrink-0`} />
      <span>{current.label}</span>
    </span>
  );
};
