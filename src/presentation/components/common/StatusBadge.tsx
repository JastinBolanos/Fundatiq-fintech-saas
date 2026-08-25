import React from 'react';

export interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  className?: string;
  dot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = 'neutral',
  className = '',
  dot = true,
}) => {
  const variantStyles = {
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    error: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    neutral: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
  };

  const dotStyles = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-blue-500',
    neutral: 'bg-slate-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} />}
      <span>{status}</span>
    </span>
  );
};
