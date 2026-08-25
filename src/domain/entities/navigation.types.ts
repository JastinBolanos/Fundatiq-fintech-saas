export type NavItemKey =
  | 'dashboard'
  | 'cash-flow'
  | 'transactions'
  | 'accounts'
  | 'forecast'
  | 'compliance'
  | 'settings';

export interface NavItem {
  key: NavItemKey;
  label: string;
  badge?: string;
  badgeType?: 'default' | 'success' | 'warning' | 'info';
  children?: NavItem[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  avatarUrl?: string;
  tier: 'Enterprise' | 'Corporate' | 'Growth';
}

export interface OrganizationContext {
  id: string;
  name: string;
  baseCurrency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'SGD';
  subsidiaryCount: number;
  fiscalYearEnd: string;
  lastSyncedAt: string;
}
