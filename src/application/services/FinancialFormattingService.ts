/**
 * Domain & Application Service: FinancialFormattingService
 * Provides standardized financial formatting for currency, percentages, and timestamps.
 */
export class FinancialFormattingService {
  /**
   * Formats a number into USD currency representation.
   */
  static formatCurrency(
    amount: number,
    currency: string = 'USD',
    maximumFractionDigits: number = 2
  ): string {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      SGD: 'S$',
      CHF: 'CHF ',
    };

    const prefix = symbols[currency] || `${currency} `;
    return `${prefix}${amount.toLocaleString('en-US', {
      minimumFractionDigits: maximumFractionDigits > 0 ? 2 : 0,
      maximumFractionDigits,
    })}`;
  }

  /**
   * Formats a compact currency representation (e.g. $148.4M)
   */
  static formatCompactCurrency(amount: number, currency: string = 'USD'): string {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    if (Math.abs(amount) >= 1_000_000_000) {
      return `${symbol}${(amount / 1_000_000_000).toFixed(1)}B`;
    }
    if (Math.abs(amount) >= 1_000_000) {
      return `${symbol}${(amount / 1_000_000).toFixed(1)}M`;
    }
    if (Math.abs(amount) >= 1_000) {
      return `${symbol}${(amount / 1_000).toFixed(1)}k`;
    }
    return `${symbol}${amount.toFixed(0)}`;
  }

  /**
   * Formats percentage with sign
   */
  static formatPercentage(value: number, withSign: boolean = true): string {
    const sign = withSign && value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  }

  /**
   * Formats an ISO date into readable corporate audit format
   */
  static formatDate(isoString: string, locale: string = 'en-US'): string {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return isoString;
    }
  }
}
