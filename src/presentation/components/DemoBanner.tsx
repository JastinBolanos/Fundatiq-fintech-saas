import React, { useState } from 'react';
import { FlaskConical, X, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export interface DemoBannerProps {
  onDismiss?: () => void;
  className?: string;
  personaName?: string;
  defaultVisible?: boolean;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  onDismiss,
  className = '',
  personaName = 'Eleanor Vance, CFA',
  defaultVisible = true,
}) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  const bannerTextEn =
    `Welcome to the Fundatiq Interactive Sandbox. You are viewing simulated data under the persona of ${personaName}. No real financial data is being processed.`;

  const bannerTextEs =
    `Bienvenido al Sandbox Interactivo de Fundatiq. Estás viendo datos simulados bajo el perfil de ${personaName}. No se están procesando datos financieros reales.`;

  const messageText = language === 'es' ? bannerTextEs : bannerTextEn;

  return (
    <aside
      id="fundatiq-demo-disclaimer-banner"
      role="region"
      aria-label="Sandbox Simulation Notice"
      className={`relative w-full overflow-hidden rounded-xl border p-3.5 sm:px-4 sm:py-3 transition-all duration-300 ${
        isLight
          ? 'bg-gradient-to-r from-amber-50/95 via-amber-100/50 to-amber-50/95 border-amber-300/80 text-slate-800 shadow-sm'
          : 'bg-gradient-to-r from-[#17120a] via-[#1f180d] to-[#17120a] border-amber-500/30 text-slate-100 shadow-lg shadow-amber-950/30'
      } ${className}`}
    >
      {/* Subtle Ambient Amber Glow Accents */}
      <div
        className={`absolute -top-6 -left-6 h-20 w-20 rounded-full blur-xl pointer-events-none ${
          isLight ? 'bg-amber-400/20' : 'bg-amber-500/10'
        }`}
      />
      <div
        className={`absolute -bottom-6 -right-6 h-20 w-20 rounded-full blur-xl pointer-events-none ${
          isLight ? 'bg-amber-400/20' : 'bg-amber-500/10'
        }`}
      />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        {/* Left: Icon, Badge & Main Copy */}
        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
          {/* Flask / Sandbox Icon */}
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border shadow-xs ${
              isLight
                ? 'bg-amber-100 border-amber-300 text-amber-800'
                : 'bg-amber-500/15 border-amber-500/35 text-amber-400 shadow-amber-500/10'
            }`}
          >
            <FlaskConical size={16} className={isLight ? 'text-amber-700' : 'text-amber-400'} />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 min-w-0">
            {/* Status Chip */}
            <div
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono font-bold text-[10px] tracking-wider uppercase border shrink-0 ${
                isLight
                  ? 'bg-amber-200/70 text-amber-950 border-amber-300'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isLight ? 'bg-amber-600' : 'bg-amber-400 animate-pulse'}`} />
              <span>{language === 'es' ? 'ENTORNO: SANDBOX' : 'ENVIRONMENT: SANDBOX'}</span>
            </div>

            {/* Persona Tag */}
            <div
              className={`hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] border shrink-0 ${
                isLight
                  ? 'bg-white text-slate-700 border-slate-200 shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/60'
              }`}
            >
              <UserCheck size={11} className={isLight ? 'text-amber-700' : 'text-amber-400'} />
              <span className="font-semibold">{personaName}</span>
            </div>

            {/* Disclaimer Copy */}
            <p
              className={`font-medium leading-relaxed sm:truncate text-[11px] sm:text-xs ${
                isLight ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              {messageText}
            </p>
          </div>
        </div>

        {/* Right: Actions & Dismiss Button */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <span
            className={`hidden lg:inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
              isLight
                ? 'bg-amber-200/50 text-amber-900 border-amber-300 font-semibold'
                : 'text-amber-400/80 bg-amber-950/40 border-amber-800/40'
            }`}
          >
            {language === 'es' ? 'DEMOSTRACIÓN DE PORTAFOLIO' : 'PORTFOLIO SHOWCASE'}
          </span>

          <button
            id="dismiss-demo-banner-btn"
            onClick={handleDismiss}
            aria-label="Dismiss sandbox disclaimer banner"
            title={language === 'es' ? 'Cerrar aviso' : 'Dismiss notice'}
            className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900 shadow-xs'
                : 'bg-slate-900/60 hover:bg-slate-800 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
