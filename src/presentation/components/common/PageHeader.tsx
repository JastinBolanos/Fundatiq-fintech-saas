import React, { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';

export interface PageHeaderProps {
  id?: string;
  title: string;
  badge?: string;
  badgeVariant?: 'blue' | 'emerald' | 'amber' | 'cyan';
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  id,
  title,
  badge,
  badgeVariant = 'blue',
  description,
  icon,
  actions,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const badgeColors = {
    blue: isLight
      ? 'bg-blue-100 text-blue-800 border-blue-200'
      : 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    emerald: isLight
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: isLight
      ? 'bg-amber-100 text-amber-800 border-amber-200'
      : 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    cyan: isLight
      ? 'bg-cyan-100 text-cyan-800 border-cyan-200'
      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  };

  return (
    <div
      id={id}
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b ${
        isLight ? 'border-slate-200' : 'border-slate-800/80'
      }`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className={`p-2 rounded-lg border ${
                isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              {icon}
            </div>
          )}
          <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {title}
          </h1>
          {badge && (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${badgeColors[badgeVariant]}`}>
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {description}
          </p>
        )}
      </div>

      {actions && <div className="flex items-center gap-2.5">{actions}</div>}
    </div>
  );
};
