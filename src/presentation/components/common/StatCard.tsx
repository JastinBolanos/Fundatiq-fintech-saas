import React, { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface StatCardProps {
  id?: string;
  label: string;
  value: string | number;
  delta?: {
    value: string | number;
    direction: 'positive' | 'negative' | 'neutral';
    label?: string;
  };
  subtext?: string;
  icon?: ReactNode;
  accentColor?: 'blue' | 'emerald' | 'cyan' | 'amber' | 'purple';
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  id,
  label,
  value,
  delta,
  subtext,
  icon,
  accentColor = 'blue',
  onClick,
  className = '',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const borderHover = {
    blue: 'hover:border-blue-500/40',
    emerald: 'hover:border-emerald-500/40',
    cyan: 'hover:border-cyan-500/40',
    amber: 'hover:border-amber-500/40',
    purple: 'hover:border-purple-500/40',
  };

  const deltaColors = {
    positive: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    negative: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
    neutral: 'text-slate-600 dark:text-slate-400 bg-slate-500/10 border-slate-500/20',
  };

  return (
    <div
      id={id}
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all ${
        isLight
          ? 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
          : `bg-[#0e1628] border-[#1b2a47] ${borderHover[accentColor]}`
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {label}
        </span>
        {icon && <div className="shrink-0">{icon}</div>}
      </div>

      <div className={`text-2xl font-semibold font-mono tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
        {value}
      </div>

      <div className="flex items-center justify-between gap-2 mt-2">
        {delta && (
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded border ${deltaColors[delta.direction]}`}
          >
            {delta.direction === 'positive' && <TrendingUp size={11} />}
            {delta.direction === 'negative' && <TrendingDown size={11} />}
            {delta.direction === 'neutral' && <Minus size={11} />}
            <span>{delta.value}</span>
          </span>
        )}
        {subtext && (
          <span className={`text-[11px] truncate ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
