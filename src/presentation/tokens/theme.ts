/**
 * Fundatiq Enterprise B2B Design Tokens
 * High-Trust, Sleek Corporate Dark Theme for Treasury & Cash Flow Operations
 */

export const THEME_TOKENS = {
  colors: {
    bg: {
      canvas: '#090D16', // Deepest obsidian slate
      surface: '#0F1626', // Primary surface container
      elevated: '#162035', // Cards and elevated panels
      subtle: '#1C2942', // Hover and interactive states
      active: '#243452', // Active / selected states
    },
    borders: {
      subtle: 'rgba(255, 255, 255, 0.07)',
      default: 'rgba(255, 255, 255, 0.12)',
      strong: 'rgba(255, 255, 255, 0.20)',
      focus: '#3B82F6',
    },
    brand: {
      primary: '#3B82F6', // Fundatiq Signature Electric Blue
      primaryHover: '#2563EB',
      primaryGlow: 'rgba(59, 130, 246, 0.18)',
      secondary: '#06B6D4', // Cyan accent
      dark: '#1D4ED8',
    },
    status: {
      success: '#10B981', // Emerald for positive inflows / yield
      successBg: 'rgba(16, 185, 129, 0.12)',
      successBorder: 'rgba(16, 185, 129, 0.25)',
      
      danger: '#F43F5E', // Crimson for burn rate / negative delta
      dangerBg: 'rgba(244, 63, 94, 0.12)',
      dangerBorder: 'rgba(244, 63, 94, 0.25)',
      
      warning: '#F59E0B', // Amber for liquidity runway warnings
      warningBg: 'rgba(245, 158, 11, 0.12)',
      warningBorder: 'rgba(245, 158, 11, 0.25)',
      
      info: '#38BDF8', // Sky for neutral information & synchronizations
      infoBg: 'rgba(56, 189, 248, 0.12)',
      infoBorder: 'rgba(56, 189, 248, 0.25)',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#64748B',
      disabled: '#475569',
      inverse: '#090D16',
    }
  },
  typography: {
    fontFamily: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
  },
} as const;
