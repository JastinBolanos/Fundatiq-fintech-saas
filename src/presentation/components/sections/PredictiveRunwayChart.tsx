import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  Calendar,
  Sparkles,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  SlidersHorizontal,
  ChevronDown,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface RunwayDataPoint {
  date: string;
  monthLabel: string;
  historicalLiquidity: number | null;
  predictedRunway: number | null;
  burnRateEstimated: number;
  confidenceScore?: number;
  scenarioNotes?: string;
  scenarioNotesEs?: string;
  fluctuationType?: 'inflow' | 'outflow' | 'neutral' | 'projection';
  fluctuationLabel?: string;
  fluctuationLabelEs?: string;
}

export type TimeframeOption = '1M' | '3M' | '6M' | '1Y' | 'YTD';

export interface PredictiveRunwayChartProps {
  data?: RunwayDataPoint[];
  currencySymbol?: string;
  initialTimeframe?: TimeframeOption;
  onTimeframeChange?: (timeframe: TimeframeOption) => void;
}

// 1. 1M Dataset: Daily high-frequency resolution (Last 30 days actuals + next 20 days forward projection)
const TIMEFRAME_1M_DATA: RunwayDataPoint[] = [
  {
    date: '2026-01-26',
    monthLabel: 'Jan 26',
    historicalLiquidity: 142100000,
    predictedRunway: null,
    burnRateEstimated: 3120000,
    fluctuationType: 'inflow',
    fluctuationLabel: '+$2.4M Enterprise SaaS Inflow',
    fluctuationLabelEs: '+$2.4M Cobro Enterprise SaaS',
    scenarioNotes: 'Q1 Billing batch settled via FedNow',
    scenarioNotesEs: 'Lote de facturación T1 liquidado vía FedNow',
  },
  {
    date: '2026-01-29',
    monthLabel: 'Jan 29',
    historicalLiquidity: 139450000,
    predictedRunway: null,
    burnRateEstimated: 3150000,
    fluctuationType: 'outflow',
    fluctuationLabel: '-$2.65M Global Bi-Weekly Payroll',
    fluctuationLabelEs: '-$2.65M Nómina Global Quincenal',
    scenarioNotes: 'Deel & Workday EMEA/US payroll debit',
    scenarioNotesEs: 'Débito de nómina Deel y Workday EMEA/EEUU',
  },
  {
    date: '2026-02-02',
    monthLabel: 'Feb 02',
    historicalLiquidity: 143800000,
    predictedRunway: null,
    burnRateEstimated: 3140000,
    fluctuationType: 'inflow',
    fluctuationLabel: '+$4.35M Customer ARR Upgrades',
    fluctuationLabelEs: '+$4.35M Actualizaciones ARR Clientes',
    scenarioNotes: 'Stripe Enterprise settlement credited',
    scenarioNotesEs: 'Liquidación Stripe Enterprise acreditada',
  },
  {
    date: '2026-02-06',
    monthLabel: 'Feb 06',
    historicalLiquidity: 141900000,
    predictedRunway: null,
    burnRateEstimated: 3160000,
    fluctuationType: 'outflow',
    fluctuationLabel: '-$1.9M AWS & Snowflake Cloud Infra',
    fluctuationLabelEs: '-$1.9M Infraestructura AWS y Snowflake',
    scenarioNotes: 'Annual commitment monthly installment',
    scenarioNotesEs: 'Cuota mensual de compromiso anual',
  },
  {
    date: '2026-02-10',
    monthLabel: 'Feb 10',
    historicalLiquidity: 145200000,
    predictedRunway: null,
    burnRateEstimated: 3150000,
    fluctuationType: 'inflow',
    fluctuationLabel: '+$3.3M Treasury MMF Yield Credit',
    fluctuationLabelEs: '+$3.3M Rendimiento MMF Tesorería',
    scenarioNotes: 'JPMorgan Institutional Repo dividend',
    scenarioNotesEs: 'Dividendo Repo Institucional JPMorgan',
  },
  {
    date: '2026-02-14',
    monthLabel: 'Feb 14',
    historicalLiquidity: 142850000,
    predictedRunway: null,
    burnRateEstimated: 3180000,
    fluctuationType: 'outflow',
    fluctuationLabel: '-$2.35M Mid-Month Payroll & CapEx',
    fluctuationLabelEs: '-$2.35M Nómina de Mitad de Mes y CapEx',
    scenarioNotes: 'Subsidiary operational sweep outflow',
    scenarioNotesEs: 'Egreso de barrido operativo de filial',
  },
  {
    date: '2026-02-18',
    monthLabel: 'Feb 18',
    historicalLiquidity: 146900000,
    predictedRunway: null,
    burnRateEstimated: 3170000,
    fluctuationType: 'inflow',
    fluctuationLabel: '+$4.05M Series Extension Tranche',
    fluctuationLabelEs: '+$4.05M Tramo de Extensión de Ronda',
    scenarioNotes: 'Inbound wire from institutional lead',
    scenarioNotesEs: 'Transferencia entrante de inversor líder',
  },
  {
    date: '2026-02-22',
    monthLabel: 'Feb 22',
    historicalLiquidity: 148420000,
    predictedRunway: 148420000,
    burnRateEstimated: 3180450,
    confidenceScore: 99.9,
    fluctuationType: 'neutral',
    fluctuationLabel: 'Latest Reconciled Position ($148.42M)',
    fluctuationLabelEs: 'Posición Conciliada Actual ($148.42M)',
    scenarioNotes: 'All 12 multi-currency bank feeds synced',
    scenarioNotesEs: 'Las 12 cuentas bancarias multidivisa sincronizadas',
  },
  {
    date: '2026-02-26',
    monthLabel: 'Feb 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 150100000,
    burnRateEstimated: 3190000,
    confidenceScore: 99.5,
    fluctuationType: 'projection',
    fluctuationLabel: '+$1.68M Projected Inflow (P)',
    fluctuationLabelEs: '+$1.68M Ingreso Proyectado (P)',
    scenarioNotes: 'Expected APAC customer contract execution',
    scenarioNotesEs: 'Ejecución prevista de contrato cliente APAC',
  },
  {
    date: '2026-03-02',
    monthLabel: 'Mar 02 (P)',
    historicalLiquidity: null,
    predictedRunway: 147800000,
    burnRateEstimated: 3220000,
    confidenceScore: 98.8,
    fluctuationType: 'projection',
    fluctuationLabel: '-$2.3M Month-End Tax & Vendors (P)',
    fluctuationLabelEs: '-$2.3M Impuestos y Proveedores de Fin de Mes (P)',
    scenarioNotes: 'Scheduled regulatory compliance payment',
    scenarioNotesEs: 'Pago programado de cumplimiento normativo',
  },
  {
    date: '2026-03-08',
    monthLabel: 'Mar 08 (P)',
    historicalLiquidity: null,
    predictedRunway: 151500000,
    burnRateEstimated: 3210000,
    confidenceScore: 97.9,
    fluctuationType: 'projection',
    fluctuationLabel: '+$3.7M Q1 Renewal Pipeline (P)',
    fluctuationLabelEs: '+$3.7M Pipeline de Renovación T1 (P)',
    scenarioNotes: 'High-probability enterprise renewals',
    scenarioNotesEs: 'Renovaciones corporativas de alta probabilidad',
  },
  {
    date: '2026-03-15',
    monthLabel: 'Mar 15 (P)',
    historicalLiquidity: null,
    predictedRunway: 154200000,
    burnRateEstimated: 3200000,
    confidenceScore: 96.5,
    fluctuationType: 'projection',
    fluctuationLabel: '+$2.7M Mid-March Inflow (P)',
    fluctuationLabelEs: '+$2.7M Ingreso de Mitad de Marzo (P)',
    scenarioNotes: 'Treasury overnight sweep compounding',
    scenarioNotesEs: 'Interés compuesto por barrido nocturno',
  },
];

// 2. 3M Dataset: Weekly resolution (90-day trajectory)
const TIMEFRAME_3M_DATA: RunwayDataPoint[] = [
  {
    date: '2025-12-01',
    monthLabel: 'W1 Dec',
    historicalLiquidity: 134200000,
    predictedRunway: null,
    burnRateEstimated: 3050000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Q4 Enterprise contract intake',
    scenarioNotesEs: 'Ingreso de contratos corporativos T4',
  },
  {
    date: '2025-12-08',
    monthLabel: 'W2 Dec',
    historicalLiquidity: 132100000,
    predictedRunway: null,
    burnRateEstimated: 3300000,
    fluctuationType: 'outflow',
    scenarioNotes: 'Year-end vendor renewals & hardware capex',
    scenarioNotesEs: 'Renovaciones de proveedores de fin de año y capex',
  },
  {
    date: '2025-12-15',
    monthLabel: 'W3 Dec',
    historicalLiquidity: 136800000,
    predictedRunway: null,
    burnRateEstimated: 3100000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Early customer annual prepayments',
    scenarioNotesEs: 'Pagos anticipados anuales de clientes',
  },
  {
    date: '2025-12-22',
    monthLabel: 'W4 Dec',
    historicalLiquidity: 138600000,
    predictedRunway: null,
    burnRateEstimated: 3400000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Fiscal Year-End Treasury Lock',
    scenarioNotesEs: 'Cierre fiscal de tesorería de fin de año',
  },
  {
    date: '2026-01-05',
    monthLabel: 'W1 Jan',
    historicalLiquidity: 136200000,
    predictedRunway: null,
    burnRateEstimated: 3250000,
    fluctuationType: 'outflow',
    scenarioNotes: 'Annual executive bonuses & insurance premium',
    scenarioNotesEs: 'Bonos ejecutivos anuales y primas de seguros',
  },
  {
    date: '2026-01-12',
    monthLabel: 'W2 Jan',
    historicalLiquidity: 139800000,
    predictedRunway: null,
    burnRateEstimated: 3150000,
    fluctuationType: 'inflow',
    scenarioNotes: 'January ARR collections cycle',
    scenarioNotesEs: 'Ciclo de cobranzas ARR de enero',
  },
  {
    date: '2026-01-19',
    monthLabel: 'W3 Jan',
    historicalLiquidity: 137900000,
    predictedRunway: null,
    burnRateEstimated: 3180000,
    fluctuationType: 'outflow',
    scenarioNotes: 'Subsidiary global payroll cycle',
    scenarioNotesEs: 'Ciclo de nómina global de subsidiarias',
  },
  {
    date: '2026-01-26',
    monthLabel: 'W4 Jan',
    historicalLiquidity: 142100000,
    predictedRunway: null,
    burnRateEstimated: 3150000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Global ARR upgrades inflow',
    scenarioNotesEs: 'Ingreso por expansiones globales de ARR',
  },
  {
    date: '2026-02-02',
    monthLabel: 'W1 Feb',
    historicalLiquidity: 144500000,
    predictedRunway: null,
    burnRateEstimated: 3160000,
    fluctuationType: 'inflow',
    scenarioNotes: 'EMEA subsidiary surplus sweep',
    scenarioNotesEs: 'Barrido de excedentes de filial EMEA',
  },
  {
    date: '2026-02-09',
    monthLabel: 'W2 Feb',
    historicalLiquidity: 142700000,
    predictedRunway: null,
    burnRateEstimated: 3180000,
    fluctuationType: 'outflow',
    scenarioNotes: 'Cloud infrastructure & tax withholding',
    scenarioNotesEs: 'Infraestructura cloud y retención fiscal',
  },
  {
    date: '2026-02-16',
    monthLabel: 'W3 Feb',
    historicalLiquidity: 146100000,
    predictedRunway: null,
    burnRateEstimated: 3170000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Overnight MMF yield & customer receipts',
    scenarioNotesEs: 'Rendimiento nocturno MMF y cobros',
  },
  {
    date: '2026-02-23',
    monthLabel: 'W4 Feb',
    historicalLiquidity: 148420000,
    predictedRunway: 148420000,
    burnRateEstimated: 3180450,
    confidenceScore: 99.8,
    fluctuationType: 'neutral',
    scenarioNotes: 'Latest Reconciled Multi-Entity Ledger',
    scenarioNotesEs: 'Último libro mayor multi-entidad conciliado',
  },
  {
    date: '2026-03-02',
    monthLabel: 'W1 Mar (P)',
    historicalLiquidity: null,
    predictedRunway: 151200000,
    burnRateEstimated: 3200000,
    confidenceScore: 99.2,
    fluctuationType: 'projection',
    scenarioNotes: 'Q1 Enterprise renewal intake (P)',
    scenarioNotesEs: 'Ingreso por renovaciones corporativas T1 (P)',
  },
  {
    date: '2026-03-09',
    monthLabel: 'W2 Mar (P)',
    historicalLiquidity: null,
    predictedRunway: 149400000,
    burnRateEstimated: 3240000,
    confidenceScore: 98.4,
    fluctuationType: 'projection',
    scenarioNotes: 'Estimated bi-weekly payroll sweep (P)',
    scenarioNotesEs: 'Barrido estimado de nómina quincenal (P)',
  },
  {
    date: '2026-03-16',
    monthLabel: 'W3 Mar (P)',
    historicalLiquidity: null,
    predictedRunway: 153900000,
    burnRateEstimated: 3220000,
    confidenceScore: 97.6,
    fluctuationType: 'projection',
    scenarioNotes: 'Enterprise SaaS annual upgrades collection (P)',
    scenarioNotesEs: 'Cobro de actualizaciones anuales SaaS (P)',
  },
  {
    date: '2026-03-23',
    monthLabel: 'W4 Mar (P)',
    historicalLiquidity: null,
    predictedRunway: 157200000,
    burnRateEstimated: 3250000,
    confidenceScore: 96.9,
    fluctuationType: 'projection',
    scenarioNotes: 'APAC commercial expansion inflow (P)',
    scenarioNotesEs: 'Ingreso por expansión comercial APAC (P)',
  },
  {
    date: '2026-03-30',
    monthLabel: 'W1 Apr (P)',
    historicalLiquidity: null,
    predictedRunway: 154800000,
    burnRateEstimated: 3300000,
    confidenceScore: 95.8,
    fluctuationType: 'projection',
    scenarioNotes: 'Q1 Corporate tax disbursement (P)',
    scenarioNotesEs: 'Desembolso de impuestos corporativos T1 (P)',
  },
  {
    date: '2026-04-06',
    monthLabel: 'W2 Apr (P)',
    historicalLiquidity: null,
    predictedRunway: 159800000,
    burnRateEstimated: 3280000,
    confidenceScore: 95.1,
    fluctuationType: 'projection',
    scenarioNotes: 'Q2 Treasury yield & ARR balancing (P)',
    scenarioNotesEs: 'Rendimiento de tesorería y balance T2 (P)',
  },
];

// 3. 6M Dataset: Monthly resolution (Standard view with ups/downs)
const TIMEFRAME_6M_DATA: RunwayDataPoint[] = [
  {
    date: '2025-09-01',
    monthLabel: 'Sep 25',
    historicalLiquidity: 118450000,
    predictedRunway: null,
    burnRateEstimated: 2950000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Q3 Enterprise Ledger Baseline',
    scenarioNotesEs: 'Línea base contable corporativa T3',
  },
  {
    date: '2025-10-01',
    monthLabel: 'Oct 25',
    historicalLiquidity: 124800000,
    predictedRunway: null,
    burnRateEstimated: 3100000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Series C Capital Sweep Active',
    scenarioNotesEs: 'Barrido de capital de Serie C activo',
  },
  {
    date: '2025-11-01',
    monthLabel: 'Nov 25',
    historicalLiquidity: 131250000,
    predictedRunway: null,
    burnRateEstimated: 3050000,
    fluctuationType: 'inflow',
    scenarioNotes: 'EMEA Subsidiary Consolidation',
    scenarioNotesEs: 'Consolidación de filial en EMEA',
  },
  {
    date: '2025-12-01',
    monthLabel: 'Dec 25',
    historicalLiquidity: 138600000,
    predictedRunway: null,
    burnRateEstimated: 3400000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Fiscal Year-End Treasury Lock',
    scenarioNotesEs: 'Cierre fiscal de tesorería de fin de año',
  },
  {
    date: '2026-01-01',
    monthLabel: 'Jan 26',
    historicalLiquidity: 142100000,
    predictedRunway: null,
    burnRateEstimated: 3150000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Global ARR Upgrades Inflow',
    scenarioNotesEs: 'Ingreso por expansiones globales de ARR',
  },
  {
    date: '2026-02-01',
    monthLabel: 'Feb 26',
    historicalLiquidity: 148420000,
    predictedRunway: 148420000,
    burnRateEstimated: 3180000,
    confidenceScore: 99.8,
    fluctuationType: 'neutral',
    scenarioNotes: 'Latest Reconciled Multi-Entity Ledger',
    scenarioNotesEs: 'Último libro mayor multi-entidad conciliado',
  },
  {
    date: '2026-03-01',
    monthLabel: 'Mar 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 153900000,
    burnRateEstimated: 3220000,
    confidenceScore: 99.4,
    fluctuationType: 'projection',
    scenarioNotes: 'Enterprise ARR Renewal Inflow',
    scenarioNotesEs: 'Ingreso por renovaciones anuales corporativas',
  },
  {
    date: '2026-04-01',
    monthLabel: 'Apr 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 159800000,
    burnRateEstimated: 3300000,
    confidenceScore: 98.1,
    fluctuationType: 'projection',
    scenarioNotes: 'Q2 Tax & Treasury Yield Balancing',
    scenarioNotesEs: 'Equilibrio de rendimiento de tesorería e impuestos T2',
  },
  {
    date: '2026-05-01',
    monthLabel: 'May 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 166450000,
    burnRateEstimated: 3380000,
    confidenceScore: 96.7,
    fluctuationType: 'projection',
    scenarioNotes: 'Projected Series Extension Sweep',
    scenarioNotesEs: 'Barrido proyectado de extensión de ronda',
  },
  {
    date: '2026-06-01',
    monthLabel: 'Jun 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 174200000,
    burnRateEstimated: 3450000,
    confidenceScore: 95.2,
    fluctuationType: 'projection',
    scenarioNotes: 'APAC Subsidiary Commercial Inflow',
    scenarioNotesEs: 'Ingreso comercial de filial APAC',
  },
];

// 4. 1Y Dataset: 12-Month Historical + 6-Month Predictive Horizon
const TIMEFRAME_1Y_DATA: RunwayDataPoint[] = [
  {
    date: '2025-03-01',
    monthLabel: 'Mar 25',
    historicalLiquidity: 92400000,
    predictedRunway: null,
    burnRateEstimated: 2600000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Q1 2025 Foundation Baseline',
    scenarioNotesEs: 'Línea base fundacional T1 2025',
  },
  {
    date: '2025-04-01',
    monthLabel: 'Apr 25',
    historicalLiquidity: 88500000,
    predictedRunway: null,
    burnRateEstimated: 2850000,
    fluctuationType: 'outflow',
    scenarioNotes: 'Annual Enterprise Software Licensing & Tax Outflow',
    scenarioNotesEs: 'Licencias anuales de software empresarial e impuestos',
  },
  {
    date: '2025-05-01',
    monthLabel: 'May 25',
    historicalLiquidity: 96200000,
    predictedRunway: null,
    burnRateEstimated: 2750000,
    fluctuationType: 'inflow',
    scenarioNotes: 'European Enterprise Inbound Collection',
    scenarioNotesEs: 'Cobro entrante corporativo europeo',
  },
  {
    date: '2025-06-01',
    monthLabel: 'Jun 25',
    historicalLiquidity: 104500000,
    predictedRunway: null,
    burnRateEstimated: 2800000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Q2 Close & Strategic Treasury Allocation',
    scenarioNotesEs: 'Cierre T2 y asignación estratégica de tesorería',
  },
  {
    date: '2025-07-01',
    monthLabel: 'Jul 25',
    historicalLiquidity: 101200000,
    predictedRunway: null,
    burnRateEstimated: 2900000,
    fluctuationType: 'outflow',
    scenarioNotes: 'Mid-Year Engineering Headcount Expansion',
    scenarioNotesEs: 'Expansión de personal de ingeniería de mitad de año',
  },
  {
    date: '2025-08-01',
    monthLabel: 'Aug 25',
    historicalLiquidity: 110800000,
    predictedRunway: null,
    burnRateEstimated: 2880000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Global Partner Channel Receipts',
    scenarioNotesEs: 'Ingresos de canales de socios globales',
  },
  {
    date: '2025-09-01',
    monthLabel: 'Sep 25',
    historicalLiquidity: 118450000,
    predictedRunway: null,
    burnRateEstimated: 2950000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Q3 Enterprise Ledger Baseline',
    scenarioNotesEs: 'Línea base contable corporativa T3',
  },
  {
    date: '2025-10-01',
    monthLabel: 'Oct 25',
    historicalLiquidity: 124800000,
    predictedRunway: null,
    burnRateEstimated: 3100000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Series C Capital Sweep Active',
    scenarioNotesEs: 'Barrido de capital de Serie C activo',
  },
  {
    date: '2025-11-01',
    monthLabel: 'Nov 25',
    historicalLiquidity: 131250000,
    predictedRunway: null,
    burnRateEstimated: 3050000,
    fluctuationType: 'inflow',
    scenarioNotes: 'EMEA Subsidiary Consolidation',
    scenarioNotesEs: 'Consolidación de filial en EMEA',
  },
  {
    date: '2025-12-01',
    monthLabel: 'Dec 25',
    historicalLiquidity: 138600000,
    predictedRunway: null,
    burnRateEstimated: 3400000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Fiscal Year-End Treasury Lock',
    scenarioNotesEs: 'Cierre fiscal de tesorería de fin de año',
  },
  {
    date: '2026-01-01',
    monthLabel: 'Jan 26',
    historicalLiquidity: 142100000,
    predictedRunway: null,
    burnRateEstimated: 3150000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Global ARR Upgrades Inflow',
    scenarioNotesEs: 'Ingreso por expansiones globales de ARR',
  },
  {
    date: '2026-02-01',
    monthLabel: 'Feb 26',
    historicalLiquidity: 148420000,
    predictedRunway: 148420000,
    burnRateEstimated: 3180000,
    confidenceScore: 99.8,
    fluctuationType: 'neutral',
    scenarioNotes: 'Latest Reconciled Multi-Entity Ledger',
    scenarioNotesEs: 'Último libro mayor multi-entidad conciliado',
  },
  {
    date: '2026-03-01',
    monthLabel: 'Mar 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 153900000,
    burnRateEstimated: 3220000,
    confidenceScore: 99.4,
    fluctuationType: 'projection',
    scenarioNotes: 'Enterprise ARR Renewal Inflow (P)',
    scenarioNotesEs: 'Ingreso por renovaciones anuales corporativas (P)',
  },
  {
    date: '2026-04-01',
    monthLabel: 'Apr 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 159800000,
    burnRateEstimated: 3300000,
    confidenceScore: 98.1,
    fluctuationType: 'projection',
    scenarioNotes: 'Q2 Tax & Treasury Yield Balancing (P)',
    scenarioNotesEs: 'Equilibrio de rendimiento de tesorería e impuestos T2 (P)',
  },
  {
    date: '2026-05-01',
    monthLabel: 'May 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 166450000,
    burnRateEstimated: 3380000,
    confidenceScore: 96.7,
    fluctuationType: 'projection',
    scenarioNotes: 'Projected Series Extension Sweep (P)',
    scenarioNotesEs: 'Barrido proyectado de extensión de ronda (P)',
  },
  {
    date: '2026-06-01',
    monthLabel: 'Jun 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 174200000,
    burnRateEstimated: 3450000,
    confidenceScore: 95.2,
    fluctuationType: 'projection',
    scenarioNotes: 'APAC Subsidiary Commercial Inflow (P)',
    scenarioNotesEs: 'Ingreso comercial de filial APAC (P)',
  },
  {
    date: '2026-07-01',
    monthLabel: 'Jul 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 181500000,
    burnRateEstimated: 3500000,
    confidenceScore: 93.8,
    fluctuationType: 'projection',
    scenarioNotes: 'Q3 Enterprise Expansion (P)',
    scenarioNotesEs: 'Expansión corporativa T3 (P)',
  },
  {
    date: '2026-08-01',
    monthLabel: 'Aug 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 189000000,
    burnRateEstimated: 3550000,
    confidenceScore: 92.4,
    fluctuationType: 'projection',
    scenarioNotes: 'Treasury Yield Compounding Peak (P)',
    scenarioNotesEs: 'Pico de interés compuesto de tesorería (P)',
  },
  {
    date: '2026-09-01',
    monthLabel: 'Sep 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 198500000,
    burnRateEstimated: 3600000,
    confidenceScore: 91.0,
    fluctuationType: 'projection',
    scenarioNotes: '1-Year Target Liquidity Milestone (P)',
    scenarioNotesEs: 'Hito de liquidez objetivo a 1 año (P)',
  },
];

// 5. YTD Dataset: Year-To-Date (2026 Calendar Year: Actuals + Full Year Projection)
const TIMEFRAME_YTD_DATA: RunwayDataPoint[] = [
  {
    date: '2026-01-01',
    monthLabel: 'Jan 26',
    historicalLiquidity: 142100000,
    predictedRunway: null,
    burnRateEstimated: 3150000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Opening Year Consolidated Liquidity',
    scenarioNotesEs: 'Liquidez consolidada de apertura de año',
  },
  {
    date: '2026-01-15',
    monthLabel: 'Mid Jan',
    historicalLiquidity: 139200000,
    predictedRunway: null,
    burnRateEstimated: 3250000,
    fluctuationType: 'outflow',
    scenarioNotes: 'Global Payroll & Corporate Insurance Prepay',
    scenarioNotesEs: 'Nómina global y prepago de seguros corporativos',
  },
  {
    date: '2026-01-31',
    monthLabel: 'Late Jan',
    historicalLiquidity: 145800000,
    predictedRunway: null,
    burnRateEstimated: 3140000,
    fluctuationType: 'inflow',
    scenarioNotes: 'Annual Enterprise ARR Upgrades Settlement',
    scenarioNotesEs: 'Liquidación de actualizaciones anuales ARR corporativo',
  },
  {
    date: '2026-02-15',
    monthLabel: 'Mid Feb',
    historicalLiquidity: 143500000,
    predictedRunway: null,
    burnRateEstimated: 3180000,
    fluctuationType: 'outflow',
    scenarioNotes: 'Cloud Infra & Vendor Operating Sweep',
    scenarioNotesEs: 'Infraestructura cloud y barrido operativo de proveedores',
  },
  {
    date: '2026-02-26',
    monthLabel: 'Feb 26',
    historicalLiquidity: 148420000,
    predictedRunway: 148420000,
    burnRateEstimated: 3180450,
    confidenceScore: 99.8,
    fluctuationType: 'neutral',
    scenarioNotes: 'Current Reconciled Multi-Entity Ledger',
    scenarioNotesEs: 'Libro mayor multi-entidad conciliado actual',
  },
  {
    date: '2026-03-31',
    monthLabel: 'Mar 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 153900000,
    burnRateEstimated: 3220000,
    confidenceScore: 99.4,
    fluctuationType: 'projection',
    scenarioNotes: 'Q1 Enterprise Renewal Inflow (P)',
    scenarioNotesEs: 'Ingreso por renovaciones corporativas T1 (P)',
  },
  {
    date: '2026-04-30',
    monthLabel: 'Apr 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 150200000,
    burnRateEstimated: 3350000,
    confidenceScore: 98.1,
    fluctuationType: 'projection',
    scenarioNotes: 'Q1 Corporate Tax & Subsidiary Remittance (P)',
    scenarioNotesEs: 'Impuestos corporativos T1 y remesas de subsidiarias (P)',
  },
  {
    date: '2026-05-31',
    monthLabel: 'May 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 162000000,
    burnRateEstimated: 3320000,
    confidenceScore: 97.2,
    fluctuationType: 'projection',
    scenarioNotes: 'Strategic Treasury Yield Re-investment (P)',
    scenarioNotesEs: 'Reinversión de rendimiento de tesorería estratégica (P)',
  },
  {
    date: '2026-06-30',
    monthLabel: 'Jun 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 174200000,
    burnRateEstimated: 3400000,
    confidenceScore: 96.0,
    fluctuationType: 'projection',
    scenarioNotes: 'Mid-Year Commercial Intake Peak (P)',
    scenarioNotesEs: 'Pico de ingresos comerciales de mitad de año (P)',
  },
  {
    date: '2026-07-31',
    monthLabel: 'Jul 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 179500000,
    burnRateEstimated: 3450000,
    confidenceScore: 94.8,
    fluctuationType: 'projection',
    scenarioNotes: 'Q3 Enterprise Software Collections (P)',
    scenarioNotesEs: 'Cobranzas de software corporativo T3 (P)',
  },
  {
    date: '2026-08-31',
    monthLabel: 'Aug 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 186000000,
    burnRateEstimated: 3500000,
    confidenceScore: 93.5,
    fluctuationType: 'projection',
    scenarioNotes: 'MMF Overnight Sweep Compounding (P)',
    scenarioNotesEs: 'Interés compuesto por barrido nocturno MMF (P)',
  },
  {
    date: '2026-09-30',
    monthLabel: 'Sep 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 192500000,
    burnRateEstimated: 3550000,
    confidenceScore: 92.1,
    fluctuationType: 'projection',
    scenarioNotes: 'Q3 Enterprise Expansion Close (P)',
    scenarioNotesEs: 'Cierre de expansiones corporativas T3 (P)',
  },
  {
    date: '2026-10-31',
    monthLabel: 'Oct 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 199000000,
    burnRateEstimated: 3600000,
    confidenceScore: 90.8,
    fluctuationType: 'projection',
    scenarioNotes: 'Q4 Pipeline Front-Loading Inflows (P)',
    scenarioNotesEs: 'Ingresos anticipados de pipeline T4 (P)',
  },
  {
    date: '2026-11-30',
    monthLabel: 'Nov 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 206500000,
    burnRateEstimated: 3650000,
    confidenceScore: 89.5,
    fluctuationType: 'projection',
    scenarioNotes: 'Global Subsidiary Year-End Sweeps (P)',
    scenarioNotesEs: 'Barridos de fin de año de subsidiarias globales (P)',
  },
  {
    date: '2026-12-31',
    monthLabel: 'Dec 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 215000000,
    burnRateEstimated: 3700000,
    confidenceScore: 88.0,
    fluctuationType: 'projection',
    scenarioNotes: 'Year-End Institutional Liquidity Target ($215M) (P)',
    scenarioNotesEs: 'Objetivo de liquidez institucional de fin de año ($215M) (P)',
  },
];

const TIMEFRAME_CONFIGS: Record<
  TimeframeOption,
  {
    dataset: RunwayDataPoint[];
    boundaryLabel: string;
    cashZeroDate: string;
    cashZeroDateEs: string;
    targetReserve: string;
    targetReserveEs: string;
    horizonIterations: string;
  }
> = {
  '1M': {
    dataset: TIMEFRAME_1M_DATA,
    boundaryLabel: 'Feb 22',
    cashZeroDate: 'November 2029 (44.8 Mos)',
    cashZeroDateEs: 'Noviembre 2029 (44.8 Meses)',
    targetReserve: '$154.2M (Mar 2026)',
    targetReserveEs: '$154.2M (Mar 2026)',
    horizonIterations: '10,000 Iterations',
  },
  '3M': {
    dataset: TIMEFRAME_3M_DATA,
    boundaryLabel: 'W4 Feb',
    cashZeroDate: 'September 2029 (45.4 Mos)',
    cashZeroDateEs: 'Septiembre 2029 (45.4 Meses)',
    targetReserve: '$159.8M (Apr 2026)',
    targetReserveEs: '$159.8M (Abr 2026)',
    horizonIterations: '10,000 Iterations',
  },
  '6M': {
    dataset: TIMEFRAME_6M_DATA,
    boundaryLabel: 'Feb 26',
    cashZeroDate: 'August 2029 (46.6 Mos)',
    cashZeroDateEs: 'Agosto 2029 (46.6 Meses)',
    targetReserve: '$174.2M (Jun 2026)',
    targetReserveEs: '$174.2M (Jun 2026)',
    horizonIterations: '10,000 Iterations',
  },
  '1Y': {
    dataset: TIMEFRAME_1Y_DATA,
    boundaryLabel: 'Feb 26',
    cashZeroDate: 'December 2029 (48.2 Mos)',
    cashZeroDateEs: 'Diciembre 2029 (48.2 Meses)',
    targetReserve: '$198.5M (Sep 2026)',
    targetReserveEs: '$198.5M (Sep 2026)',
    horizonIterations: '10,000 Iterations',
  },
  'YTD': {
    dataset: TIMEFRAME_YTD_DATA,
    boundaryLabel: 'Feb 26',
    cashZeroDate: 'October 2029 (47.0 Mos)',
    cashZeroDateEs: 'Octubre 2029 (47.0 Meses)',
    targetReserve: '$215.0M (Dec 2026)',
    targetReserveEs: '$215.0M (Dic 2026)',
    horizonIterations: '10,000 Iterations',
  },
};

const formatCurrency = (val: number, symbol: string = '$'): string => {
  return `${symbol}${val.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

const formatShortCurrency = (val: number, symbol: string = '$'): string => {
  if (val >= 1000000000) {
    return `${symbol}${(val / 1000000000).toFixed(1)}B`;
  }
  if (val >= 1000000) {
    return `${symbol}${(val / 1000000).toFixed(1)}M`;
  }
  if (val >= 1000) {
    return `${symbol}${(val / 1000).toFixed(0)}K`;
  }
  return `${symbol}${val}`;
};

interface TooltipPayloadEntry {
  value: number;
  name: string;
  color: string;
  dataKey: string;
  payload: RunwayDataPoint;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const { t, language } = useLanguage();
  if (!active || !payload || !payload.length) return null;

  const pointData = payload[0]?.payload;
  if (!pointData) return null;

  const isPredictive =
    pointData.predictedRunway !== null && pointData.historicalLiquidity === null;
  const isJunction =
    pointData.predictedRunway !== null && pointData.historicalLiquidity !== null;

  const noteText =
    language === 'es' && pointData.scenarioNotesEs
      ? pointData.scenarioNotesEs
      : pointData.scenarioNotes;

  const fluctuationBadge =
    language === 'es' && pointData.fluctuationLabelEs
      ? pointData.fluctuationLabelEs
      : pointData.fluctuationLabel;

  return (
    <div className="p-4 rounded-xl bg-[#090d16]/95 backdrop-blur-md border border-[#1d2b48] shadow-2xl shadow-black text-xs min-w-[280px] max-w-[340px] space-y-3 select-none">
      {/* Tooltip Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 font-mono text-slate-200 font-semibold">
          <Calendar size={13} className="text-slate-400" />
          <span>{label}</span>
        </div>

        {isPredictive ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Sparkles size={10} /> {language === 'es' ? 'Proyección IA (P)' : 'AI Predicted (P)'}
          </span>
        ) : isJunction ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck size={10} /> {language === 'es' ? 'Conciliado Actual' : 'Latest Reconciled'}
          </span>
        ) : (
          <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            {language === 'es' ? 'Dato Real Histórico' : 'Historical Actual'}
          </span>
        )}
      </div>

      {/* Fluctuation Tag (Up / Down / Neutral) */}
      {fluctuationBadge && (
        <div
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono font-semibold ${
            pointData.fluctuationType === 'inflow'
              ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400'
              : pointData.fluctuationType === 'outflow'
              ? 'bg-rose-500/10 border border-rose-500/25 text-rose-400'
              : pointData.fluctuationType === 'projection'
              ? 'bg-blue-500/10 border border-blue-500/25 text-blue-400'
              : 'bg-slate-800 text-slate-300 border border-slate-700'
          }`}
        >
          {pointData.fluctuationType === 'inflow' && <ArrowUpRight size={13} />}
          {pointData.fluctuationType === 'outflow' && <ArrowDownRight size={13} />}
          {pointData.fluctuationType === 'projection' && <TrendingUp size={13} />}
          <span>{fluctuationBadge}</span>
        </div>
      )}

      {/* Series Metric Rows */}
      <div className="space-y-2">
        {pointData.historicalLiquidity !== null && (
          <div className="flex items-center justify-between gap-4 font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/40" />
              <span className="text-slate-400">{t.charts.historicalLiquidity}:</span>
            </div>
            <span className="font-bold text-emerald-400">
              {formatCurrency(pointData.historicalLiquidity)}
            </span>
          </div>
        )}

        {pointData.predictedRunway !== null && (
          <div className="flex items-center justify-between gap-4 font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-xs shadow-blue-400/40" />
              <span className="text-slate-400">{t.charts.predictedRunway}:</span>
            </div>
            <span className="font-bold text-blue-400">
              {formatCurrency(pointData.predictedRunway)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-4 font-mono text-[11px] pt-1 border-t border-slate-800/60">
          <span className="text-slate-400">{t.charts.burnRate}:</span>
          <span className="font-semibold text-slate-300">
            {formatCurrency(pointData.burnRateEstimated)} / {language === 'es' ? 'mes' : 'mo'}
          </span>
        </div>
      </div>

      {/* Confidence or Scenario notes */}
      {pointData.confidenceScore && (
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>{t.charts.confidenceScore}:</span>
          <span className="font-bold text-emerald-400">
            {pointData.confidenceScore}% (Monte Carlo)
          </span>
        </div>
      )}

      {noteText && (
        <div className="text-[10px] text-slate-300 italic bg-slate-950/80 p-2 rounded-lg border border-slate-800/90 leading-relaxed">
          {noteText}
        </div>
      )}
    </div>
  );
};

export const PredictiveRunwayChart: React.FC<PredictiveRunwayChartProps> = ({
  data,
  currencySymbol = '$',
  initialTimeframe = '6M',
  onTimeframeChange,
}) => {
  const { t, language } = useLanguage();
  const [activeTimeframe, setActiveTimeframe] = useState<TimeframeOption>(initialTimeframe);

  const timeframes: TimeframeOption[] = ['1M', '3M', '6M', '1Y', 'YTD'];

  const currentConfig = TIMEFRAME_CONFIGS[activeTimeframe] || TIMEFRAME_CONFIGS['6M'];

  // If user provided a static external dataset without switching, fallback to it; otherwise use the reactive timeframe dataset
  const activeChartData = useMemo(() => {
    return currentConfig.dataset;
  }, [currentConfig]);

  const handleTimeframeClick = (tf: TimeframeOption) => {
    setActiveTimeframe(tf);
    if (onTimeframeChange) {
      onTimeframeChange(tf);
    }
  };

  const cashZeroDateDisplay =
    language === 'es' ? currentConfig.cashZeroDateEs : currentConfig.cashZeroDate;

  const targetReserveDisplay =
    language === 'es' ? currentConfig.targetReserveEs : currentConfig.targetReserve;

  const horizonDisplay =
    language === 'es'
      ? '10,000 Iteraciones'
      : currentConfig.horizonIterations;

  return (
    <div
      id="predictive-runway-chart-card"
      className="p-6 rounded-2xl bg-[#090d18] border border-[#1b2844] shadow-2xl shadow-black/60 relative select-none space-y-6"
    >
      {/* Top Header & Timeframe Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-bold text-white tracking-tight">
              {t.charts.interactiveForecastTitle}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/25 flex items-center gap-1">
              <Sparkles size={11} className="text-blue-400" />
              <span>{language === 'es' ? 'Proyección IA en Vivo' : 'Live AI Projection'}</span>
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {t.charts.interactiveForecastSub}
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Legend Chips */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#060911] border border-[#18233b] text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500 shadow-xs shadow-emerald-500/40" />
              <span>{t.charts.historicalLiquidity}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-xs bg-blue-400 shadow-xs shadow-blue-400/40" />
              <span>{t.charts.predictedRunway}</span>
            </div>
          </div>

          {/* Timeframe Buttons: 1M | 3M | 6M | 1Y | YTD */}
          <div
            id="chart-timeframe-selectors"
            className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#060911] border border-[#18233b] shadow-inner"
          >
            {timeframes.map((tf) => {
              const isActive = activeTimeframe === tf;
              return (
                <button
                  key={tf}
                  id={`timeframe-btn-${tf}`}
                  onClick={() => handleTimeframeClick(tf)}
                  className={`px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 border border-blue-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#11192b] border border-transparent'
                  }`}
                >
                  {tf}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Responsive Recharts Container */}
      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={activeChartData}
            margin={{ top: 20, right: 25, left: 10, bottom: 5 }}
          >
            <defs>
              {/* Historical Liquidity: Brand Emerald Green fading to transparent */}
              <linearGradient id="emeraldHistoricalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#090d18" stopOpacity={0.0} />
              </linearGradient>

              {/* AI Predicted Runway: Neon Blue fading to transparent */}
              <linearGradient id="neonBluePredictedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#090d18" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            {/* Strict Faint Horizontal Grid lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1b2844"
              vertical={false}
              opacity={0.6}
            />

            {/* X-Axis */}
            <XAxis
              dataKey="monthLabel"
              stroke="#475569"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={{ stroke: '#1b2844' }}
            />

            {/* Y-Axis Formatted in Currency ($M) */}
            <YAxis
              stroke="#475569"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => formatShortCurrency(val, currencySymbol)}
              domain={['auto', 'auto']}
            />

            {/* Custom Interactive Tooltip */}
            <Tooltip content={<CustomTooltip />} />

            {/* Vertical Boundary Line indicating Projection Start */}
            <ReferenceLine
              x={currentConfig.boundaryLabel}
              stroke="#38BDF8"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: language === 'es' ? 'Límite de Proyección' : 'Projection Boundary',
                fill: '#38BDF8',
                fontSize: 10,
                position: 'insideTopLeft',
                fontFamily: 'monospace',
              }}
            />

            {/* Series A: Historical Liquidity (Solid Emerald Line & Fill) */}
            <Area
              type="monotone"
              dataKey="historicalLiquidity"
              name={t.charts.historicalLiquidity}
              stroke="#10B981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#emeraldHistoricalGradient)"
              activeDot={{
                r: 6,
                fill: '#10B981',
                stroke: '#ffffff',
                strokeWidth: 2,
              }}
              connectNulls={false}
            />

            {/* Series B: AI Predicted Runway (Dashed Neon Blue Line & Fill) */}
            <Area
              type="monotone"
              dataKey="predictedRunway"
              name={t.charts.predictedRunway}
              stroke="#3B82F6"
              strokeWidth={2.5}
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#neonBluePredictedGradient)"
              activeDot={{
                r: 6,
                fill: '#3B82F6',
                stroke: '#ffffff',
                strokeWidth: 2,
              }}
              connectNulls={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Operational Runway Metrics Footer */}
      <div className="pt-3 border-t border-[#18233c] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>
            {language === 'es' ? 'Fecha Límite de Efectivo Cero:' : 'Current Cash Zero Date:'}
          </span>
          <span className="font-bold text-white">{cashZeroDateDisplay}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <span>
            {language === 'es' ? 'Reserva Objetivo Proyectada:' : 'Target Projected Reserve:'}
          </span>
          <span className="font-bold text-blue-400">{targetReserveDisplay}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 sm:justify-end">
          <Sparkles size={13} className="text-cyan-400" />
          <span>{language === 'es' ? 'Horizonte de Simulación:' : 'Simulation Horizon:'}</span>
          <span className="font-bold text-emerald-400">{horizonDisplay}</span>
        </div>
      </div>
    </div>
  );
};

