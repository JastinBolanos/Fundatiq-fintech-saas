import React, { useState } from 'react';
import { AnimatedLogo } from '../components/AnimatedLogo';
import {
  Lock,
  Shield,
  ShieldCheck,
  Mail,
  KeyRound,
  Building2,
  ArrowRight,
  CheckCircle2,
  X,
  FileCheck,
  Globe2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export interface EnterpriseLoginViewProps {
  onLoginSuccess: () => void;
  onBackToLanding?: () => void;
}

export const EnterpriseLoginView: React.FC<EnterpriseLoginViewProps> = ({
  onLoginSuccess,
  onBackToLanding,
}) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [accessRequestSubmitted, setAccessRequestSubmitted] = useState(false);

  // Access Request form state
  const [corporateOrg, setCorporateOrg] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [leiNumber, setLeiNumber] = useState('');

  const isEs = language === 'es';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage(
        isEs
          ? 'Por favor, ingrese su correo y contraseña corporativos.'
          : 'Please enter your corporate email and password.'
      );
      return;
    }

    setIsLoading(true);
    // Simulating security verification handshake that always rejects access
    setTimeout(() => {
      setIsLoading(false);
      setErrorMessage(
        isEs
          ? 'Correo o contraseña incorrectos.'
          : 'Invalid corporate email or password.'
      );
    }, 750);
  };

  const handleAccessRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corporateOrg || !workEmail) return;
    setAccessRequestSubmitted(true);
  };

  return (
    <div
      id="enterprise-security-gate-view"
      className={`min-h-screen w-full flex flex-col justify-between relative overflow-hidden select-none font-sans transition-colors duration-250 ${
        isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#050811] text-slate-100'
      }`}
    >
      {/* Background Ambience & Cryptographic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,178,80,0.06),rgba(15,23,42,0)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(30,58,138,0.12),transparent_50%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top Header / Brand Gating */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToLanding}
          className="flex items-center gap-3 text-left cursor-pointer group focus:outline-hidden hover:opacity-90 transition-opacity"
          title={isEs ? 'Ir al inicio / Welcome' : 'Go to Welcome / Landing'}
        >
          <AnimatedLogo containerClassName="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white shadow-lg shadow-blue-950/60 border border-blue-400/30 group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold tracking-tight text-white text-base group-hover:text-blue-400 transition-colors">
                FUNDATIQ
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Institutional Multi-Entity Liquidity Gateway
            </p>
          </div>
        </button>

        {onBackToLanding && (
          <button
            id="back-to-landing-btn"
            onClick={onBackToLanding}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Globe2 className="h-3.5 w-3.5 text-slate-400" />
            <span>{isEs ? 'Portal Público' : 'Public Portal'}</span>
          </button>
        )}
      </header>

      {/* Main Security Gate Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card Container: Luminous White/Slate/Gold Palette */}
          <div className="rounded-2xl bg-[#090e1a] border border-slate-800/90 shadow-2xl shadow-black p-8 relative overflow-hidden transition-all duration-300 hover:border-[#d4af37]/40">
            {/* Top Gold Subtle Laser Rim */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-80" />

            {/* Header Lock Icon & Titles */}
            <div className="text-center space-y-2 mb-7">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-[#18233a] to-[#0d1525] border border-[#2b3c5e] text-[#d4af37] shadow-inner shadow-black">
                <Lock className="h-5 w-5 text-[#f5d77f]" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white font-mono">
                {isEs ? 'Portal de Clientes Corporativos' : 'Enterprise Client Portal'}
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-xs mx-auto">
                {isEs
                  ? 'Acceso restringido para tesoreros y directores financieros autorizados.'
                  : 'Restricted authentication gateway for authorized treasury personnel.'}
              </p>
            </div>

            {/* Error Message Notification */}
            {errorMessage && (
              <div
                id="login-error-banner"
                className="mb-5 flex items-center gap-2 p-3 rounded-lg bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs font-mono"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Corporate Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="corporate-email"
                  className="block text-[11px] font-mono font-medium text-slate-300 uppercase tracking-wider"
                >
                  {isEs ? 'Correo Corporativo' : 'Corporate Email'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="corporate-email"
                    name="corporateEmail"
                    type="email"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#050811] border border-slate-700/80 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all font-mono"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="corporate-password"
                  className="block text-[11px] font-mono font-medium text-slate-300 uppercase tracking-wider"
                >
                  {isEs ? 'Contraseña' : 'Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <input
                    id="corporate-password"
                    name="corporatePassword"
                    type="password"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#050811] border border-slate-700/80 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all font-mono"
                  />
                </div>
              </div>

              {/* Sign In Primary CTA */}
              <button
                id="enterprise-signin-btn"
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#f1d279] via-[#d4af37] to-[#b38e22] hover:brightness-110 active:scale-[0.99] shadow-lg shadow-amber-950/40 border border-[#f5d77f]/40 transition-all cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 text-slate-900 font-mono">
                    <div className="h-4 w-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    <span>{isEs ? 'Verificando Criptografía...' : 'Authenticating HSM...'}</span>
                  </div>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4 text-slate-950" />
                    <span>{isEs ? 'Iniciar Sesión Segura' : 'Sign In to Vault'}</span>
                    <ArrowRight className="h-4 w-4 text-slate-950" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* 3. The "Illusion" of Registration / Need Access Section */}
          <div
            id="enterprise-access-request-box"
            className="mt-4 rounded-xl bg-[#090d17]/70 border border-slate-800/70 p-4 text-center space-y-2.5"
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-semibold text-slate-300">
              <Building2 className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>{isEs ? '¿Necesita Acceso?' : 'Need Access?'}</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
              {isEs
                ? 'Las cuentas de Fundatiq se aprovisionan exclusivamente para socios corporativos verificados.'
                : 'Fundatiq accounts are provisioned exclusively for verified corporate partners.'}
            </p>

            <button
              id="request-enterprise-access-btn"
              type="button"
              onClick={() => setIsAccessModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-mono font-medium text-[#f1d279] hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <FileCheck className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>{isEs ? 'Solicitar Validación Corporativa' : 'Request Enterprise Access'}</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer Security Watermark */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-center text-[11px] font-mono text-slate-400 border-t border-slate-900">
        <div>
          <span>Fundatiq Institutional Systems Inc.</span>
        </div>
      </footer>

      {/* Access Provisioning Modal Dialog */}
      {isAccessModalOpen && (
        <div
          id="access-request-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-2xl bg-[#0b101d] border border-slate-700 shadow-2xl p-6 relative">
            <button
              id="close-access-modal-btn"
              onClick={() => {
                setIsAccessModalOpen(false);
                setAccessRequestSubmitted(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {!accessRequestSubmitted ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">
                      {isEs ? 'Solicitud de Validación Corporativa' : 'Enterprise Validation Request'}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Tier-1 Institutional Onboarding Process
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {isEs
                    ? 'Para proteger la integridad de nuestra red de liquidación bancaria, el acceso a la plataforma requiere verificación KYC/KYB y emisión de certificados de hardware corporativo.'
                    : 'To maintain liquidity settlement network integrity, platform access requires institutional KYB validation and corporate hardware certificate provisioning.'}
                </p>

                <form onSubmit={handleAccessRequestSubmit} className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-slate-300">
                      {isEs ? 'Entidad Legal / Razón Social' : 'Legal Corporate Entity'}
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      spellCheck={false}
                      value={corporateOrg}
                      onChange={(e) => setCorporateOrg(e.target.value)}
                      placeholder="e.g. Acme Financial Holdings Inc."
                      className="w-full px-3 py-2 rounded-lg bg-[#050811] border border-slate-700 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#d4af37] font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-slate-300">
                        {isEs ? 'Correo Corporativo Oficial' : 'Official Work Email'}
                      </label>
                      <input
                        type="email"
                        required
                        autoComplete="off"
                        spellCheck={false}
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="treasury@acme.com"
                        className="w-full px-3 py-2 rounded-lg bg-[#050811] border border-slate-700 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#d4af37] font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-slate-300">
                        {isEs ? 'Identificador LEI (Opcional)' : 'LEI Identifier (Optional)'}
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        spellCheck={false}
                        value={leiNumber}
                        onChange={(e) => setLeiNumber(e.target.value)}
                        placeholder="5493006MHB84DD0Z4J12"
                        className="w-full px-3 py-2 rounded-lg bg-[#050811] border border-slate-700 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#d4af37] font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAccessModalOpen(false)}
                      className="px-3 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white"
                    >
                      {isEs ? 'Cancelar' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#d4af37] hover:bg-[#c49f2e] text-slate-950 font-mono font-bold text-xs shadow-md cursor-pointer"
                    >
                      {isEs ? 'Enviar Solicitud a Soporte' : 'Submit Validation Request'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-white font-mono">
                  {isEs ? 'Solicitud Recibida en el Vault' : 'Request Received by Vault Security'}
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  {isEs
                    ? `Hemos registrado la solicitud de ${corporateOrg}. Un oficial de cumplimiento se pondrá en contacto con ${workEmail} en un plazo de entre 24 y 48 horas hábiles.`
                    : `We have logged the request for ${corporateOrg}. A compliance officer will contact ${workEmail} within 24 to 48 business hours.`}
                </p>
                <button
                  onClick={() => {
                    setIsAccessModalOpen(false);
                    setAccessRequestSubmitted(false);
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white cursor-pointer"
                >
                  {isEs ? 'Entendido' : 'Acknowledge'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
