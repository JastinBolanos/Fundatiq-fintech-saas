import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';

export interface Translations {
  // Navigation & Topbar
  nav: {
    coreTreasury: string;
    intelligenceRisk: string;
    dashboard: string;
    cashFlow: string;
    transactions: string;
    bankAccounts: string;
    predictiveRunway: string;
    auditCompliance: string;
    settings: string;
    liveBadge: string;
    activeBadge: string;
    aiProjBadge: string;
    connectedBanksBadge: string;
    syncedJustNow: string;
    syncedAgo: string;
    searchPlaceholder: string;
    newTransfer: string;
    soc2Badge: string;
    viewLandingPage: string;
    activeView: string;
    treasuryOps: string;
    toggleThemeTooltip: string;
    lightModeLabel: string;
    darkModeLabel: string;
    pageTitles: {
      dashboard: string;
      cashFlow: string;
      transactions: string;
      accounts: string;
      forecast: string;
      compliance: string;
      settings: string;
    };
  };

  // Landing Page
  landing: {
    badge: string;
    headlinePart1: string;
    headlineGradient: string;
    headlinePart2: string;
    subheadline: string;
    enterApp: string;
    exploreDemo: string;
    activeCashMonitored: string;
    fedNowSettlement: string;
    liquidityPrecision: string;
    featureTabs: {
      liquidity: string;
      forecast: string;
      multientity: string;
    };
    liveCockpitTitle: string;
    liveCockpitSubtitle: string;
    totalTreasuryPool: string;
    burnRate: string;
    runwayHorizon: string;
    riskStatus: string;
    riskStatusVal: string;
    institutionalPillarsTitle: string;
    institutionalPillarsSubtitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    footerCopyright: string;
    footerSubtitle: string;
  };

  // Dashboard
  dashboard: {
    headerTitle: string;
    headerSubtitle: string;
    liveModeBadge: string;
    simulationModeBadge: string;
    liveReconciliation: string;
    switchSimulation: string;
    exportReport: string;
    kpi1Title: string;
    kpi1Sub: string;
    kpi2Title: string;
    kpi2Sub: string;
    kpi3Title: string;
    kpi3Sub: string;
    kpi4Title: string;
    kpi4Sub: string;
    chartTitle: string;
    chartSubtitle: string;
    viewAllSimulations: string;
    recentTransTitle: string;
    recentTransSubtitle: string;
    viewFullLedger: string;
    quickTransferTitle: string;
    quickTransferSubtitle: string;
    sourceAccount: string;
    destinationAccount: string;
    transferAmount: string;
    clearingRail: string;
    executeTransfer: string;
    instantSweep: string;
  };

  // Cash Flow
  cashFlow: {
    headerTitle: string;
    headerSubtitle: string;
    realTimeFeed: string;
    reconcileStreams: string;
    openRunwaySim: string;
    metric1Title: string;
    metric1Sub: string;
    metric2Title: string;
    metric2Sub: string;
    metric3Title: string;
    metric3Sub: string;
    metric4Title: string;
    metric4Sub: string;
    waterfallTitle: string;
    waterfallSubtitle: string;
    allEntities: string;
    tabAll: string;
    tabInflows: string;
    tabOutflows: string;
    dailyNetVelocity: string;
    inflowsTotal: string;
    outflowsTotal: string;
    multicurrencyTitle: string;
    multicurrencySub: string;
    subsidiaryTitle: string;
    subsidiarySub: string;
    colSubsidiary: string;
    colJurisdiction: string;
    colCurrency: string;
    colInflow: string;
    colOutflow: string;
    colNet: string;
    colStatus: string;
  };

  // Transactions & Ledger
  transactions: {
    headerTitle: string;
    headerSubtitle: string;
    recordsCount: string;
    downloadAuditPack: string;
    searchPlaceholder: string;
    filterAllTypes: string;
    filterInflows: string;
    filterOutflows: string;
    filterAllStatus: string;
    filterSettled: string;
    filterPending: string;
    filterProcessing: string;
    filterAllRails: string;
    kpi1Title: string;
    kpi1Sub: string;
    kpi2Title: string;
    kpi2Sub: string;
    kpi3Title: string;
    kpi3Sub: string;
    tableColDescription: string;
    tableColEntity: string;
    tableColRail: string;
    tableColTimestamp: string;
    tableColAmount: string;
    tableColStatus: string;
    tableColReceipt: string;
    receiptModalTitle: string;
    receiptModalSub: string;
    beneficiary: string;
    originatingAcc: string;
    txHash: string;
    signatureVerification: string;
    verifiedDualSig: string;
    closeReceipt: string;
  };

  // Bank Accounts
  bankAccounts: {
    headerTitle: string;
    headerSubtitle: string;
    activeFeeds: string;
    transferSweepBtn: string;
    kpi1Title: string;
    kpi1Sub: string;
    kpi2Title: string;
    kpi2Sub: string;
    kpi3Title: string;
    kpi3Sub: string;
    searchPlaceholder: string;
    allCurrencies: string;
    allTypes: string;
    availableLiquidity: string;
    yieldAPY: string;
    entityOwner: string;
    routingIban: string;
    clearingRails: string;
    autoSweepOn: string;
    autoSweepOff: string;
    dispatchTransfer: string;
    modalTitle: string;
    modalSubtitle: string;
    sourcePool: string;
    destinationPool: string;
    transferAmountUsd: string;
    railSelected: string;
    treasuryMemo: string;
    multiSigNotice: string;
    cancelBtn: string;
    authorizeBtn: string;
    signingBtn: string;
    execSuccessTitle: string;
    execSuccessMsg: string;
  };

  // Predictive Runway
  predictiveRunway: {
    headerTitle: string;
    headerSubtitle: string;
    monteCarloVersion: string;
    resetBaseline: string;
    kpi1Title: string;
    kpi1Sub: string;
    kpi2Title: string;
    kpi2Sub: string;
    kpi3Title: string;
    kpi3Sub: string;
    kpi4Title: string;
    kpi4Sub: string;
    infiniteRunway: string;
    monthsLabel: string;
    variablesTitle: string;
    activeSimulator: string;
    targetArrGrowth: string;
    conservative: string;
    aggressive: string;
    headcountScaling: string;
    hiringFreeze: string;
    hypergrowth: string;
    rateShift: string;
    rateCut: string;
    rateHike: string;
    macroStressTest: string;
    modeBase: string;
    modeModerate: string;
    modeSevere: string;
    briefingTitle: string;
    briefingSubtitle: string;
    rec1Title: string;
    rec1Desc: string;
    rec2Title: string;
    rec2Desc: string;
  };

  // Compliance
  compliance: {
    headerTitle: string;
    headerSubtitle: string;
    regulatoryPassed: string;
    downloadAuditPkg: string;
    compilingAuditPkg: string;
    kpi1Title: string;
    kpi1Sub: string;
    kpi2Title: string;
    kpi2Sub: string;
    kpi3Title: string;
    kpi3Sub: string;
    multiSigTitle: string;
    multiSigSubtitle: string;
    awaitingSignatures: string;
    fullyExecuted: string;
    beneficiaryLabel: string;
    destinationLabel: string;
    signaturesLabel: string;
    signBtn: string;
    signingBtn: string;
    sealedBadge: string;
    frameworkTitle: string;
    frameworkSubtitle: string;
    colStandard: string;
    colFocus: string;
    colAuditor: string;
    colScore: string;
    colStatus: string;
  };

  // Settings
  settings: {
    headerTitle: string;
    headerSubtitle: string;
    enterpriseTier: string;
    languageSectionTitle: string;
    languageSectionSub: string;
    languageEnglish: string;
    languageEnglishDesc: string;
    languageSpanish: string;
    languageSpanishDesc: string;
    languageActiveBadge: string;
    themeSectionTitle: string;
    themeSectionSub: string;
    themeLight: string;
    themeLightDesc: string;
    themeDark: string;
    themeDarkDesc: string;
    themeActiveBadge: string;
    profileSectionTitle: string;
    profileSectionSub: string;
    officerName: string;
    officerRole: string;
    orgName: string;
    baseCurrency: string;
    governanceSectionTitle: string;
    governanceSectionSub: string;
    dualSignThreshold: string;
    dualSignThresholdNotice: string;
    refreshFrequency: string;
    freq5Min: string;
    freq15Min: string;
    freq60Min: string;
    optAutoSweep: string;
    optFxHedging: string;
    apiSectionTitle: string;
    apiSectionSub: string;
    connectorSwift: string;
    connectorSwiftStatus: string;
    connectorPlaid: string;
    connectorPlaidStatus: string;
    statusConnected: string;
    saveSuccessNotice: string;
    saveBtn: string;
    savingBtn: string;
  };

  // Chart Labels
  charts: {
    timeframe1M: string;
    timeframe3M: string;
    timeframe6M: string;
    timeframe1Y: string;
    timeframeYTD: string;
    historicalLiquidity: string;
    predictedRunway: string;
    burnRate: string;
    confidenceScore: string;
    scenarioNotes: string;
    interactiveForecastTitle: string;
    interactiveForecastSub: string;
    bridgePoint: string;
  };
}

const enTranslations: Translations = {
  nav: {
    coreTreasury: 'CORE TREASURY',
    intelligenceRisk: 'INTELLIGENCE & RISK',
    dashboard: 'Dashboard',
    cashFlow: 'Cash Flow Analysis',
    transactions: 'Transactions & Ledger',
    bankAccounts: 'Bank Accounts',
    predictiveRunway: 'Predictive Runway',
    auditCompliance: 'Audit & Compliance',
    settings: 'Treasury Settings',
    liveBadge: 'Live',
    activeBadge: '12 Active',
    aiProjBadge: 'AI Proj.',
    connectedBanksBadge: '12 Connected',
    syncedJustNow: 'Synced: Just now',
    syncedAgo: 'Synced: 2m ago',
    searchPlaceholder: 'Search accounts, transactions, counterparties, or ledger...',
    newTransfer: 'New Transfer',
    soc2Badge: 'SOC2 Type II',
    viewLandingPage: 'View Public Overview',
    activeView: 'Active View:',
    treasuryOps: 'Treasury Ops',
    toggleThemeTooltip: 'Toggle Light / Dark Mode',
    lightModeLabel: 'Light Mode',
    darkModeLabel: 'Dark Mode',
    pageTitles: {
      dashboard: 'Executive Treasury Dashboard',
      cashFlow: 'Cash Flow & Burn Analytics',
      transactions: 'Multi-Entity Ledger & Transactions',
      accounts: 'Connected Bank Accounts & Liquidity Pools',
      forecast: 'Predictive Cash Runway & Scenario Modeling',
      compliance: 'Treasury Audit & Regulatory Compliance',
      settings: 'Treasury & ERP Integration Settings',
    },
  },
  landing: {
    badge: 'Enterprise Institutional Liquidity Orchestration',
    headlinePart1: 'Autonomous Treasury &',
    headlineGradient: 'Predictive Cash Flow',
    headlinePart2: 'for Global Enterprises',
    subheadline:
      'Consolidate multi-currency corporate bank accounts, eliminate idle cash with automated overnight yield sweeps, and simulate macroeconomic runway with frontier AI models (ChatGPT-5.6 sol, Claude sonnet 4.5 & Perplexity).',
    enterApp: 'Client Portal',
    exploreDemo: 'View Live Demo',
    activeCashMonitored: '$148.42M Monitored',
    fedNowSettlement: 'Zero Latency FedNow',
    liquidityPrecision: '99.8% Forecast Precision',
    featureTabs: {
      liquidity: 'Global Liquidity',
      forecast: 'Predictive Runway',
      multientity: 'Multi-Entity Sweeps',
    },
    liveCockpitTitle: 'Fundatiq Global Treasury Cockpit',
    liveCockpitSubtitle: 'Live Multi-Entity Cash Concentration & Automated Yield Engine',
    totalTreasuryPool: 'Total Treasury Pool',
    burnRate: 'Monthly Burn Rate',
    runwayHorizon: 'Runway Horizon',
    riskStatus: 'Risk & Compliance',
    riskStatusVal: '100% Basel III & SOX 404',
    institutionalPillarsTitle: 'Engineered for High-Growth Enterprises & Group Treasurers',
    institutionalPillarsSubtitle:
      'Built to meet the stringent security, multi-jurisdiction compliance, and sub-second ledger accuracy demanded by modern CFOs.',
    pillar1Title: 'Instant Open Banking Aggregation',
    pillar1Desc:
      'Direct API integrations with Tier-1 institutions like JPMorgan, SVB, Barclays, and UBS for zero-delay multi-currency balance consolidation.',
    pillar2Title: 'Frontier AI Predictive Runway (Claude Sonnet 4.5 & ChatGPT-5.6 sol)',
    pillar2Desc:
      'Stress-test your cash buffer against market shocks, hiring expansions, and churn spikes with real-time Claude sonnet 4.5, ChatGPT-5.6 sol and Perplexity intelligence.',
    pillar3Title: 'Multi-Signature Governance & SOX 404',
    pillar3Desc:
      'Enforce dual cryptographic authorization on all ledger dispatches exceeding institutional thresholds with complete audit immutability.',
    footerCopyright: '© 2026 Fundatiq Global Treasury Technologies Inc. All rights reserved.',
    footerSubtitle: 'Enterprise Financial Infrastructure & Automated Cash Optimization',
  },
  dashboard: {
    headerTitle: 'Executive Treasury Dashboard',
    headerSubtitle: 'Real-time multi-entity liquidity concentration, automated sweeps, and cash velocity.',
    liveModeBadge: 'LIVE PRODUCTION FEED',
    simulationModeBadge: 'SIMULATION MODE',
    liveReconciliation: 'Live Reconciled (Just now)',
    switchSimulation: 'Scenario Modeling Mode',
    exportReport: 'Export Treasury Briefing',
    kpi1Title: 'Total Consolidated Liquidity',
    kpi1Sub: 'Across 6 Global Entities',
    kpi2Title: 'Net Monthly Operating Burn',
    kpi2Sub: 'Operating Outflows / Mo',
    kpi3Title: 'Predictive Cash Runway',
    kpi3Sub: 'Zero-Cash Date: Oct 2029',
    kpi4Title: 'Annualized Treasury Yield (APY)',
    kpi4Sub: '+$768.2k Monthly Yield',
    chartTitle: 'Liquidity Velocity & Projected Runway Horizon',
    chartSubtitle: 'Historical Multi-Entity Ledger Balances & AI Projected Inflows (USD Millions)',
    viewAllSimulations: 'Open Scenario Lab',
    recentTransTitle: 'Recent Dispatches & Settled Transactions',
    recentTransSubtitle: 'Real-time multi-rail clearing ledger (FedNow, SWIFT, SEPA)',
    viewFullLedger: 'View Full Audit Ledger',
    quickTransferTitle: 'Instant Treasury Sweep & Dispatch',
    quickTransferSubtitle: 'Dual authenticated zero-balance ledger movement',
    sourceAccount: 'Source Liquidity Account',
    destinationAccount: 'Destination Pool',
    transferAmount: 'Transfer Amount (USD)',
    clearingRail: 'Clearing Rail',
    executeTransfer: 'Execute Multi-Sig Transfer',
    instantSweep: 'Overnight Auto-Sweep: Enabled',
  },
  cashFlow: {
    headerTitle: 'Cash Flow & Burn Rate Analytics',
    headerSubtitle: 'Granular breakdown of operating inflows, vendor disbursements, and working capital cycles.',
    realTimeFeed: 'REAL-TIME LEDGER FEED',
    reconcileStreams: 'Reconcile All Feeds',
    openRunwaySim: 'Simulate Scenario Impact',
    metric1Title: 'Net Operating Cash Velocity',
    metric1Sub: 'Positive Monthly Cash Delta',
    metric2Title: 'Gross Inflow Volume',
    metric2Sub: 'Enterprise ARR & Collections',
    metric3Title: 'Gross Outflow Volume',
    metric3Sub: 'Payroll, Cloud Infra & CapEx',
    metric4Title: 'Cash Conversion Cycle (CCC)',
    metric4Sub: 'Working Capital Efficiency',
    waterfallTitle: 'Daily Cash Flow Waterfall & Velocity Breakdown',
    waterfallSubtitle: 'Multi-subsidiary operational inflows vs. vendor disbursements for the current period',
    allEntities: 'All Global Subsidiaries',
    tabAll: 'All Cash Flows',
    tabInflows: 'Inflows Only',
    tabOutflows: 'Outflows Only',
    dailyNetVelocity: 'Daily Net Velocity',
    inflowsTotal: 'Total Inflows',
    outflowsTotal: 'Total Outflows',
    multicurrencyTitle: 'Multi-Currency Liquidity Pool Distribution',
    multicurrencySub: 'Real-time foreign exchange balances and active hedging coverage',
    subsidiaryTitle: 'Subsidiary Entity Cash Allocation & Monthly Burn Contribution',
    subsidiarySub: 'Operating metrics categorized across corporate legal entities',
    colSubsidiary: 'Corporate Subsidiary',
    colJurisdiction: 'Jurisdiction',
    colCurrency: 'Base FX',
    colInflow: 'Inflows (30D)',
    colOutflow: 'Outflows (30D)',
    colNet: 'Net Burn / Delta',
    colStatus: 'Health Status',
  },
  transactions: {
    headerTitle: 'Multi-Entity Ledger & Transactions',
    headerSubtitle: 'Immutable cryptographic ledger of corporate receipts, disbursements, and inter-company sweeps.',
    recordsCount: '4,281 AUDITED RECORDS',
    downloadAuditPack: 'Download MT940 / CSV Audit Pack',
    searchPlaceholder: 'Search by counterparty, memo, transaction ID, or entity...',
    filterAllTypes: 'All Types (Inflows & Outflows)',
    filterInflows: 'Inflows Only (Collections)',
    filterOutflows: 'Outflows Only (Disbursements)',
    filterAllStatus: 'All Statuses',
    filterSettled: 'Settled',
    filterPending: 'Pending',
    filterProcessing: 'Processing',
    filterAllRails: 'All Clearing Rails',
    kpi1Title: 'Total Settled Ledger Volume',
    kpi1Sub: 'Across 4,281 Transactions',
    kpi2Title: 'Pending Clearing Value',
    kpi2Sub: 'Awaiting Multi-Sig Finality',
    kpi3Title: 'Average Clearing Velocity',
    kpi3Sub: 'Via FedNow & SEPA Instant',
    tableColDescription: 'Transaction / Memo',
    tableColEntity: 'Entity & Counterparty',
    tableColRail: 'Clearing Rail',
    tableColTimestamp: 'Date & Time',
    tableColAmount: 'Amount (USD)',
    tableColStatus: 'Status',
    tableColReceipt: 'Cryptographic Receipt',
    receiptModalTitle: 'Immutable Transaction Receipt & Audit Certificate',
    receiptModalSub: 'SOX 404 & Basel III verified cryptographic ledger record',
    beneficiary: 'Beneficiary / Counterparty:',
    originatingAcc: 'Originating Account:',
    txHash: 'Ledger Audit Hash (SHA-256):',
    signatureVerification: 'Multi-Sig Verification Status:',
    verifiedDualSig: 'Verified Dual C-Level Sign-off Completed',
    closeReceipt: 'Close Certificate',
  },
  bankAccounts: {
    headerTitle: 'Connected Bank Accounts & Liquidity Pools',
    headerSubtitle: 'Open Banking & SWIFT Alliance direct API integration with automated zero-balance sweeping.',
    activeFeeds: '12 ACTIVE FEEDS',
    transferSweepBtn: 'Transfer & Sweep Funds',
    kpi1Title: 'Total Concentrated Liquidity',
    kpi1Sub: 'Across 8 Tier-1 Global Banks',
    kpi2Title: 'Average Yield Rate (APY)',
    kpi2Sub: 'Generating +$768k Monthly Yield',
    kpi3Title: 'Active Auto-Sweep Rules',
    kpi3Sub: 'Zero-Balance Overnight Sweeps',
    searchPlaceholder: 'Search bank name, IBAN, subsidiary, or account...',
    allCurrencies: 'All Currencies',
    allTypes: 'All Account Types',
    availableLiquidity: 'Available Liquidity',
    yieldAPY: 'Yield (APY)',
    entityOwner: 'Entity Owner:',
    routingIban: 'Routing / IBAN:',
    clearingRails: 'Clearing Rails:',
    autoSweepOn: 'Auto-Sweep: ON',
    autoSweepOff: 'Auto-Sweep: OFF',
    dispatchTransfer: 'Dispatch Transfer',
    modalTitle: 'Treasury Liquidity Dispatch & Sweep',
    modalSubtitle: 'Dual multi-sig authenticated bank ledger transfer',
    sourcePool: 'Source Liquidity Account',
    destinationPool: 'Destination Account / Pool',
    transferAmountUsd: 'Transfer Amount (USD)',
    railSelected: 'FedNow Real-Time Rail',
    treasuryMemo: 'Treasury Purpose & Memo',
    multiSigNotice: 'Dual cryptographic multi-sig authorization enforced for transfers > $500k.',
    cancelBtn: 'Cancel',
    authorizeBtn: 'Authorize & Dispatch',
    signingBtn: 'Signing & Transmitting...',
    execSuccessTitle: 'Execution Completed',
    execSuccessMsg: 'Multi-sig transfer dispatched successfully via FedNow with zero fees!',
  },
  predictiveRunway: {
    headerTitle: 'AI Predictive Cash Runway & Scenario Lab',
    headerSubtitle: 'Simulate macroeconomic shocks, ARR growth trajectories, and OpEx scaling against multi-subsidiary liquidity.',
    monteCarloVersion: 'MONTE CARLO v4.8',
    resetBaseline: 'Reset Baseline',
    kpi1Title: 'Simulated Runway Horizon',
    kpi1Sub: 'Model Confidence:',
    kpi2Title: 'Projected Monthly Inflow',
    kpi2Sub: 'ARR Growth:',
    kpi3Title: 'Simulated OpEx Outflow',
    kpi3Sub: 'Headcount Delta:',
    kpi4Title: 'Zero-Cash Threshold Date',
    kpi4Sub: 'Capital Sufficiency: High Tier',
    infiniteRunway: 'Infinite (Cash Flow Positive)',
    monthsLabel: 'Mos',
    variablesTitle: 'Scenario Variables',
    activeSimulator: 'Active Simulator',
    targetArrGrowth: 'Target ARR Growth Rate',
    conservative: 'Conservative (+5%)',
    aggressive: 'Aggressive (+60%)',
    headcountScaling: 'Headcount & CapEx Scaling',
    hiringFreeze: 'Hiring Freeze (0%)',
    hypergrowth: 'Hypergrowth (+40%)',
    rateShift: 'Benchmark Rate Shift',
    rateCut: '-100 bps Cut',
    rateHike: '+150 bps Hike',
    macroStressTest: 'Macroeconomic Churn Stress Test',
    modeBase: 'Base Case',
    modeModerate: 'Moderate Shock',
    modeSevere: 'Severe Crisis',
    briefingTitle: 'Fundatiq Executive Treasury Intelligence Briefing',
    briefingSubtitle: 'Synthesized from 10,000 Monte Carlo simulations on current multi-currency cash pools.',
    rec1Title: 'Recommendation #1: Overnight Yield Sweep',
    rec1Desc:
      'Allocate $25,000,000.00 from non-interest operating pools to Goldman Sachs Institutional MMF at 5.34% APY to generate an additional $111,250.00 in monthly net yield.',
    rec2Title: 'Recommendation #2: FX Exposure Lock',
    rec2Desc:
      'Execute automated rolling 60-day EUR/USD and GBP/USD forward hedges for EMEA subsidiary cash inflows to protect runway against currency fluctuations.',
  },
  compliance: {
    headerTitle: 'Treasury Audit & Regulatory Governance',
    headerSubtitle: 'Real-time Basel III liquidity coverage tracking, SOX 404 multi-signature dual control, and immutable audit logs.',
    regulatoryPassed: '100% REGULATORY PASSED',
    downloadAuditPkg: 'Download SOX & SOC2 Audit Package',
    compilingAuditPkg: 'Compiling SOC2 Package...',
    kpi1Title: 'Basel III Liquidity Coverage Ratio',
    kpi1Sub: 'Minimum Mandate: 100% (Compliant)',
    kpi2Title: 'Pending Multi-Sig Authorizations',
    kpi2Sub: 'Dual Sign-Off Threshold: >$500k',
    kpi3Title: 'AML & OFAC Sanctions Screening',
    kpi3Sub: 'Sub-second ISO 20022 Verification',
    multiSigTitle: 'Dual Multi-Signature Approval Matrix (SOX 404)',
    multiSigSubtitle: 'Corporate treasury governance policy requires 2 independent C-level cryptographic signatures for transfers > $500,000.',
    awaitingSignatures: 'Awaiting Signature (1 of 2)',
    fullyExecuted: 'Fully Executed',
    beneficiaryLabel: 'Beneficiary:',
    destinationLabel: 'Destination:',
    signaturesLabel: 'Signatures:',
    signBtn: 'Cryptographically Sign & Execute',
    signingBtn: 'Cryptographically Signing...',
    sealedBadge: 'Multi-Sig Sealed',
    frameworkTitle: 'Enterprise Regulatory Framework Verification',
    frameworkSubtitle: 'Audited by Big 4 accounting firms and automated continuous compliance monitors.',
    colStandard: 'Standard / Framework',
    colFocus: 'Audit Focus',
    colAuditor: 'Certifying Auditor',
    colScore: 'Score / Metric',
    colStatus: 'Status',
  },
  settings: {
    headerTitle: 'Treasury Operations & ERP Settings',
    headerSubtitle: 'Configure multi-entity sweeping policies, dual authorization thresholds, and Open Banking API hooks.',
    enterpriseTier: 'ENTERPRISE TIER',
    languageSectionTitle: 'Platform Language & Localization',
    languageSectionSub: 'Select system display language for all views, analytics, and audit reports',
    languageEnglish: 'English (US)',
    languageEnglishDesc: 'Default institutional terminology (USD, FedNow, APY, SOX 404)',
    languageSpanish: 'Español (LatAm / España)',
    languageSpanishDesc: 'Terminología financiera completa y reportes de tesorería en español',
    languageActiveBadge: 'Active Language',
    themeSectionTitle: 'Display Theme & Visual Mode',
    themeSectionSub: 'Toggle between institutional dark theme and high-contrast light mode',
    themeLight: 'Light Mode (Executive Slate)',
    themeLightDesc: 'Clean, high-contrast crisp white & slate layout optimized for daytime boardroom review',
    themeDark: 'Dark Mode (Deep Fintech)',
    themeDarkDesc: 'High-focus deep navy & midnight palette for 24/7 treasury liquidity monitoring',
    themeActiveBadge: 'Active Theme',
    profileSectionTitle: 'Executive Profile & Corporate Governance',
    profileSectionSub: 'Authorized Treasury Officer Details',
    officerName: 'Authorized Officer Name',
    officerRole: 'Corporate Role',
    orgName: 'Organization Legal Name',
    baseCurrency: 'Base Consolidation Currency',
    governanceSectionTitle: 'Dual Control & Multi-Signature Policies',
    governanceSectionSub: 'SOX 404 & Basel Compliance Guardrails',
    dualSignThreshold: 'Dual Sign-Off Trigger Threshold (USD)',
    dualSignThresholdNotice: 'Transfers above this amount require cryptographic sign-off from 2 independent C-level officers.',
    refreshFrequency: 'Open Banking Feed Refresh Frequency',
    freq5Min: 'Every 5 Minutes (High-Frequency)',
    freq15Min: 'Every 15 Minutes (Standard)',
    freq60Min: 'Hourly Reconciliation',
    optAutoSweep: 'Enable Automated Overnight Zero-Balance Liquidity Sweeps to Treasury Yield MMFs',
    optFxHedging: 'Enable Automated Rolling 60-Day Forward Hedging for EUR/GBP Non-USD Inflows',
    apiSectionTitle: 'Banking API Integrations & Webhooks',
    apiSectionSub: 'Direct ERP & SWIFT Network Connectors',
    connectorSwift: 'SWIFT Alliance Lite2 Connector',
    connectorSwiftStatus: 'Status: Active • ISO 20022 Verified',
    connectorPlaid: 'Plaid Enterprise Multi-Bank Gateway',
    connectorPlaidStatus: 'Status: Active • 12 of 12 Accounts Synced',
    statusConnected: 'Connected',
    saveSuccessNotice: 'Treasury Policies & Language Updated & Signed',
    saveBtn: 'Save Treasury Configurations',
    savingBtn: 'Saving Policies...',
  },
  charts: {
    timeframe1M: '1M',
    timeframe3M: '3M',
    timeframe6M: '6M',
    timeframe1Y: '1Y',
    timeframeYTD: 'YTD',
    historicalLiquidity: 'Historical Consolidated Liquidity',
    predictedRunway: 'Predictive Runway Horizon',
    burnRate: 'Monthly Burn Rate (OpEx)',
    confidenceScore: 'Model Confidence',
    scenarioNotes: 'Scenario Notes',
    interactiveForecastTitle: 'AI Predictive Runway & Historical Liquidity Velocity',
    interactiveForecastSub: 'Historical reconciled cash vs. Monte Carlo projected cash balance (USD Millions)',
    bridgePoint: 'Latest Reconciled Multi-Entity Ledger',
  },
};

const esTranslations: Translations = {
  nav: {
    coreTreasury: 'TESORERÍA PRINCIPAL',
    intelligenceRisk: 'INTELIGENCIA Y RIESGO',
    dashboard: 'Panel de Control',
    cashFlow: 'Flujo de Caja',
    transactions: 'Transacciones y Libro Mayor',
    bankAccounts: 'Cuentas Bancarias',
    predictiveRunway: 'Pista Financiera (Runway)',
    auditCompliance: 'Auditoría y Cumplimiento',
    settings: 'Configuración de Tesorería',
    liveBadge: 'En Vivo',
    activeBadge: '12 Activas',
    aiProjBadge: 'IA Proy.',
    connectedBanksBadge: '12 Conectados',
    syncedJustNow: 'Sincronizado: Ahora mismo',
    syncedAgo: 'Sincronizado: hace 2m',
    searchPlaceholder: 'Buscar cuentas, transacciones, contrapartes o libro mayor...',
    newTransfer: 'Nueva Transferencia',
    soc2Badge: 'SOC2 Tipo II',
    viewLandingPage: 'Ver Resumen Público',
    activeView: 'Vista Activa:',
    treasuryOps: 'Operaciones de Tesorería',
    toggleThemeTooltip: 'Alternar Modo Claro / Oscuro',
    lightModeLabel: 'Modo Claro',
    darkModeLabel: 'Modo Oscuro',
    pageTitles: {
      dashboard: 'Panel Ejecutivo de Tesorería',
      cashFlow: 'Análisis de Flujo de Caja y Consumo (Burn Rate)',
      transactions: 'Libro Mayor y Transacciones Multi-Entidad',
      accounts: 'Cuentas Bancarias y Fondos de Liquidez Conectados',
      forecast: 'Pista de Caja Predictiva y Modelado de Escenarios',
      compliance: 'Auditoría de Tesorería y Cumplimiento Regulatorio',
      settings: 'Configuración de Tesorería e Integración ERP',
    },
  },
  landing: {
    badge: 'Orquestación de Liquidez Institucional para Empresas',
    headlinePart1: 'Tesorería Autónoma y',
    headlineGradient: 'Flujo de Caja Predictivo',
    headlinePart2: 'para Empresas Globales',
    subheadline:
      'Consolide cuentas bancarias corporativas multidivisa, elimine el efectivo inactivo con barridos nocturnos automáticos de rendimiento y simule la pista financiera ante choques macroeconómicos con modelos de IA de frontera (ChatGPT-5.6 sol, Claude sonnet 4.5 y Perplexity).',
    enterApp: 'Portal de Clientes',
    exploreDemo: 'Ver Demostración en Vivo',
    activeCashMonitored: '$148.42M Monitoreados',
    fedNowSettlement: 'Liquidación FedNow en Tiempo Real',
    liquidityPrecision: '99.8% Precisión en Proyecciones',
    featureTabs: {
      liquidity: 'Liquidez Global',
      forecast: 'Pista Predictiva',
      multientity: 'Barridos Multi-Entidad',
    },
    liveCockpitTitle: 'Plataforma Global de Tesorería Fundatiq',
    liveCockpitSubtitle: 'Concentración de Efectivo Multi-Entidad en Vivo y Motor Automatizado de Rendimiento',
    totalTreasuryPool: 'Fondo Total de Tesorería',
    burnRate: 'Tasa Mensual de Consumo (Burn)',
    runwayHorizon: 'Horizonte de Pista',
    riskStatus: 'Riesgo y Cumplimiento',
    riskStatusVal: '100% Basilea III y SOX 404',
    institutionalPillarsTitle: 'Diseñado para Empresas de Alto Crecimiento y Tesoreros Corporativos',
    institutionalPillarsSubtitle:
      'Construido para cumplir con los más altos estándares de seguridad bancaria, cumplimiento multijurisdiccional y precisión contable instantánea que exigen los directores financieros.',
    pillar1Title: 'Agregación Bancaria Instantánea (Open Banking)',
    pillar1Desc:
      'Integraciones API directas con instituciones de Nivel 1 como JPMorgan, SVB, Barclays y UBS para consolidación de saldos multidivisa sin retrasos.',
    pillar2Title: 'Pista Predictiva con IA de Frontera (Claude Sonnet 4.5 y ChatGPT-5.6 sol)',
    pillar2Desc:
      'Ponga a prueba su reserva de liquidez ante crisis de mercado, expansiones de contratación y picos de cancelación con la inteligencia analítica de Claude sonnet 4.5, ChatGPT-5.6 sol y Perplexity.',
    pillar3Title: 'Gobernanza Multifirma y SOX 404',
    pillar3Desc:
      'Exija doble autorización criptográfica en todos los movimientos contables que superen los umbrales institucionales con total inmutabilidad de auditoría.',
    footerCopyright: '© 2026 Fundatiq Global Treasury Technologies Inc. Todos los derechos reservados.',
    footerSubtitle: 'Infraestructura Financiera Empresarial y Optimización Automatizada de Caja',
  },
  dashboard: {
    headerTitle: 'Panel Ejecutivo de Tesorería',
    headerSubtitle: 'Concentración de liquidez multi-entidad en tiempo real, barridos automáticos y velocidad de caja.',
    liveModeBadge: 'FEED EN VIVO DE PRODUCCIÓN',
    simulationModeBadge: 'MODO DE SIMULACIÓN',
    liveReconciliation: 'Conciliación en vivo (Ahora mismo)',
    switchSimulation: 'Modo Modelado de Escenarios',
    exportReport: 'Exportar Informe Ejecutivo',
    kpi1Title: 'Liquidez Consolidada Total',
    kpi1Sub: 'En 6 Entidades Globales',
    kpi2Title: 'Consumo Operativo Mensual Neto',
    kpi2Sub: 'Salidas Operativas / Mes',
    kpi3Title: 'Pista Financiera Predictiva',
    kpi3Sub: 'Fecha Límite de Caja: Oct 2029',
    kpi4Title: 'Rendimiento Anualizado de Tesorería (APY)',
    kpi4Sub: '+$768.2k Rendimiento Mensual',
    chartTitle: 'Velocidad de Liquidez y Horizonte Proyectado de Pista',
    chartSubtitle: 'Saldos Históricos del Libro Mayor Multi-Entidad e Ingresos Proyectados por IA (Millones USD)',
    viewAllSimulations: 'Abrir Laboratorio de Escenarios',
    recentTransTitle: 'Despachos Recientes y Transacciones Liquidadas',
    recentTransSubtitle: 'Libro mayor de compensación multirriel en tiempo real (FedNow, SWIFT, SEPA)',
    viewFullLedger: 'Ver Libro Mayor Completo de Auditoría',
    quickTransferTitle: 'Barrido y Despacho Instantáneo de Tesorería',
    quickTransferSubtitle: 'Movimiento contable con autenticación dual de balance cero',
    sourceAccount: 'Cuenta de Liquidez de Origen',
    destinationAccount: 'Fondo de Destino',
    transferAmount: 'Monto de Transferencia (USD)',
    clearingRail: 'Riel de Compensación',
    executeTransfer: 'Ejecutar Transferencia Multifirma',
    instantSweep: 'Autobarrido Nocturno: Habilitado',
  },
  cashFlow: {
    headerTitle: 'Análisis de Flujo de Caja y Tasa de Consumo (Burn Rate)',
    headerSubtitle: 'Desglose detallado de ingresos operativos, desembolsos a proveedores y ciclos de capital de trabajo.',
    realTimeFeed: 'FEED DEL LIBRO MAYOR EN TIEMPO REAL',
    reconcileStreams: 'Conciliar Todos los Canales',
    openRunwaySim: 'Simular Impacto en la Pista',
    metric1Title: 'Velocidad Operativa Neta de Caja',
    metric1Sub: 'Delta Mensual Positivo de Caja',
    metric2Title: 'Volumen Bruto de Ingresos',
    metric2Sub: 'ARR Corporativo y Cobranzas',
    metric3Title: 'Volumen Bruto de Egresos',
    metric3Sub: 'Nómina, Infraestructura Cloud y CapEx',
    metric4Title: 'Ciclo de Conversión de Efectivo (CCC)',
    metric4Sub: 'Eficiencia en Capital de Trabajo',
    waterfallTitle: 'Cascada Diaria de Flujo de Caja y Desglose de Velocidad',
    waterfallSubtitle: 'Ingresos operativos vs. desembolsos a proveedores de las subsidiarias para el período actual',
    allEntities: 'Todas las Subsidiarias Globales',
    tabAll: 'Todos los Flujos',
    tabInflows: 'Solo Ingresos',
    tabOutflows: 'Solo Egresos',
    dailyNetVelocity: 'Velocidad Neta Diaria',
    inflowsTotal: 'Total de Ingresos',
    outflowsTotal: 'Total de Egresos',
    multicurrencyTitle: 'Distribución de Fondos de Liquidez Multidivisa',
    multicurrencySub: 'Saldos de cambio de divisas en tiempo real y cobertura activa de derivados (hedging)',
    subsidiaryTitle: 'Asignación de Efectivo por Subsidiaria y Contribución al Consumo Mensual',
    subsidiarySub: 'Métricas operativas desglosadas por entidades legales corporativas',
    colSubsidiary: 'Subsidiaria Corporativa',
    colJurisdiction: 'Jurisdicción',
    colCurrency: 'Divisa Base',
    colInflow: 'Ingresos (30D)',
    colOutflow: 'Egresos (30D)',
    colNet: 'Consumo Neto / Delta',
    colStatus: 'Estado de Salud',
  },
  transactions: {
    headerTitle: 'Libro Mayor y Transacciones Multi-Entidad',
    headerSubtitle: 'Libro mayor criptográfico inmutable de cobros, desembolsos corporativos y barridos entre empresas.',
    recordsCount: '4,281 REGISTROS AUDITADOS',
    downloadAuditPack: 'Descargar Paquete de Auditoría MT940 / CSV',
    searchPlaceholder: 'Buscar por contraparte, concepto, ID de transacción o entidad...',
    filterAllTypes: 'Todos los Tipos (Ingresos y Egresos)',
    filterInflows: 'Solo Ingresos (Cobranzas)',
    filterOutflows: 'Solo Egresos (Desembolsos)',
    filterAllStatus: 'Todos los Estados',
    filterSettled: 'Liquidado',
    filterPending: 'Pendiente',
    filterProcessing: 'En Proceso',
    filterAllRails: 'Todos los Rieles de Compensación',
    kpi1Title: 'Volumen Total Liquidado en Libro Mayor',
    kpi1Sub: 'A través de 4,281 Transacciones',
    kpi2Title: 'Valor Pendiente de Compensación',
    kpi2Sub: 'Esperando Finalidad Multifirma',
    kpi3Title: 'Velocidad Media de Compensación',
    kpi3Sub: 'Vía FedNow y SEPA Instantáneo',
    tableColDescription: 'Transacción / Concepto',
    tableColEntity: 'Entidad y Contraparte',
    tableColRail: 'Riel de Compensación',
    tableColTimestamp: 'Fecha y Hora',
    tableColAmount: 'Monto (USD)',
    tableColStatus: 'Estado',
    tableColReceipt: 'Recibo Criptográfico',
    receiptModalTitle: 'Recibo Inmutable de Transacción y Certificado de Auditoría',
    receiptModalSub: 'Registro criptográfico verificado bajo normativas SOX 404 y Basilea III',
    beneficiary: 'Beneficiario / Contraparte:',
    originatingAcc: 'Cuenta de Origen:',
    txHash: 'Hash de Auditoría del Libro Mayor (SHA-256):',
    signatureVerification: 'Estado de Verificación Multifirma:',
    verifiedDualSig: 'Firma Dual C-Level Verificada y Completada',
    closeReceipt: 'Cerrar Certificado',
  },
  bankAccounts: {
    headerTitle: 'Cuentas Bancarias y Fondos de Liquidez Conectados',
    headerSubtitle: 'Integración API directa Open Banking y SWIFT Alliance con barrido automatizado de saldo cero.',
    activeFeeds: '12 CONEXIONES ACTIVAS',
    transferSweepBtn: 'Transferir y Barrer Fondos',
    kpi1Title: 'Liquidez Concentrada Total',
    kpi1Sub: 'En 8 Bancos Globales de Nivel 1',
    kpi2Title: 'Tasa Media de Rendimiento (APY)',
    kpi2Sub: 'Generando +$768k de Rendimiento Mensual',
    kpi3Title: 'Reglas Activas de Autobarrido',
    kpi3Sub: 'Barridos Nocturnos de Saldo Cero',
    searchPlaceholder: 'Buscar banco, IBAN, subsidiaria o cuenta...',
    allCurrencies: 'Todas las Divisas',
    allTypes: 'Todos los Tipos de Cuenta',
    availableLiquidity: 'Liquidez Disponible',
    yieldAPY: 'Rendimiento (APY)',
    entityOwner: 'Entidad Propietaria:',
    routingIban: 'Ruta / IBAN:',
    clearingRails: 'Rieles de Compensación:',
    autoSweepOn: 'Autobarrido: ACTIVADO',
    autoSweepOff: 'Autobarrido: DESACTIVADO',
    dispatchTransfer: 'Despachar Transferencia',
    modalTitle: 'Despacho y Barrido de Liquidez de Tesorería',
    modalSubtitle: 'Transferencia bancaria autenticada con doble firma criptográfica',
    sourcePool: 'Cuenta de Liquidez de Origen',
    destinationPool: 'Cuenta / Fondo de Destino',
    transferAmountUsd: 'Monto de Transferencia (USD)',
    railSelected: 'Riel en Tiempo Real FedNow',
    treasuryMemo: 'Propósito y Concepto de Tesorería',
    multiSigNotice: 'Autorización multifirma criptográfica dual requerida para transferencias > $500k.',
    cancelBtn: 'Cancelar',
    authorizeBtn: 'Autorizar y Despachar',
    signingBtn: 'Firmando y Transmitiendo...',
    execSuccessTitle: 'Ejecución Completada',
    execSuccessMsg: '¡Transferencia multifirma despachada con éxito vía FedNow sin comisiones!',
  },
  predictiveRunway: {
    headerTitle: 'Pista de Caja Predictiva con IA y Laboratorio de Escenarios',
    headerSubtitle: 'Simule choques macroeconómicos, trayectorias de crecimiento de ARR y escalamiento de OpEx sobre la liquidez global.',
    monteCarloVersion: 'MONTE CARLO v4.8',
    resetBaseline: 'Restablecer Valores Base',
    kpi1Title: 'Horizonte de Pista Simulado',
    kpi1Sub: 'Confianza del Modelo:',
    kpi2Title: 'Ingresos Mensuales Proyectados',
    kpi2Sub: 'Crecimiento de ARR:',
    kpi3Title: 'Consumo OpEx Simulado',
    kpi3Sub: 'Delta de Contrataciones:',
    kpi4Title: 'Fecha Límite de Efectivo Cero',
    kpi4Sub: 'Suficiencia de Capital: Nivel Alto',
    infiniteRunway: 'Infinita (Flujo de Caja Positivo)',
    monthsLabel: 'Meses',
    variablesTitle: 'Variables del Escenario',
    activeSimulator: 'Simulador Activo',
    targetArrGrowth: 'Tasa Objetivo de Crecimiento de ARR',
    conservative: 'Conservador (+5%)',
    aggressive: 'Agresivo (+60%)',
    headcountScaling: 'Escalamiento de Personal y CapEx',
    hiringFreeze: 'Congelación de Contrataciones (0%)',
    hypergrowth: 'Hipercrecimiento (+40%)',
    rateShift: 'Variación de Tasa de Interés de Referencia',
    rateCut: '-100 bps Reducción',
    rateHike: '+150 bps Aumento',
    macroStressTest: 'Prueba de Estrés Macroeconómica de Cancelación (Churn)',
    modeBase: 'Caso Base',
    modeModerate: 'Choque Moderado',
    modeSevere: 'Crisis Severa',
    briefingTitle: 'Informe Ejecutivo de Inteligencia de Tesorería Fundatiq',
    briefingSubtitle: 'Sintetizado a partir de 10,000 simulaciones Monte Carlo sobre los fondos actuales multidivisa.',
    rec1Title: 'Recomendación #1: Barrido Nocturno de Rendimiento',
    rec1Desc:
      'Asigne $25,000,000.00 de cuentas operativas sin intereses al Fondo Institucional de Mercado Monetario (MMF) de Goldman Sachs al 5.34% APY para generar $111,250.00 adicionales en rendimiento neto mensual.',
    rec2Title: 'Recomendación #2: Bloqueo de Exposición Cambiaria (FX)',
    rec2Desc:
      'Ejecute coberturas cambiarias continuas a 60 días en EUR/USD y GBP/USD para los flujos de ingresos de subsidiarias europeas a fin de blindar la pista financiera ante oscilaciones monetarias.',
  },
  compliance: {
    headerTitle: 'Auditoría de Tesorería y Gobernanza Regulatoria',
    headerSubtitle: 'Seguimiento en tiempo real del ratio de cobertura de liquidez de Basilea III, control dual SOX 404 e inmutabilidad de auditoría.',
    regulatoryPassed: '100% REGULATORIO APROBADO',
    downloadAuditPkg: 'Descargar Paquete de Auditoría SOX y SOC2',
    compilingAuditPkg: 'Compilando Paquete SOC2...',
    kpi1Title: 'Ratio de Cobertura de Liquidez Basilea III',
    kpi1Sub: 'Mandato Mínimo: 100% (Cumplido)',
    kpi2Title: 'Autorizaciones Multifirma Pendientes',
    kpi2Sub: 'Umbral de Doble Firma: >$500k',
    kpi3Title: 'Detección de Sanciones AML y OFAC',
    kpi3Sub: 'Verificación ISO 20022 en Subsegundos',
    multiSigTitle: 'Matriz de Aprobación Multifirma Dual (SOX 404)',
    multiSigSubtitle: 'La política de gobernanza corporativa exige 2 firmas criptográficas independientes de nivel C para transferencias > $500,000.',
    awaitingSignatures: 'Esperando Firma (1 de 2)',
    fullyExecuted: 'Totalmente Ejecutado',
    beneficiaryLabel: 'Beneficiario:',
    destinationLabel: 'Destino:',
    signaturesLabel: 'Firmas:',
    signBtn: 'Firmar Criptográficamente y Ejecutar',
    signingBtn: 'Firmando Criptográficamente...',
    sealedBadge: 'Multifirma Sellada',
    frameworkTitle: 'Verificación de Marcos Regulatorios Empresariales',
    frameworkSubtitle: 'Auditado por firmas Big 4 y monitores automatizados de cumplimiento continuo.',
    colStandard: 'Estándar / Marco',
    colFocus: 'Enfoque de Auditoría',
    colAuditor: 'Auditor Certificador',
    colScore: 'Puntaje / Métrica',
    colStatus: 'Estado',
  },
  settings: {
    headerTitle: 'Operaciones de Tesorería y Configuración ERP',
    headerSubtitle: 'Configure políticas de barrido multi-entidad, umbrales de doble autorización y conectores API de Open Banking.',
    enterpriseTier: 'NIVEL EMPRESARIAL',
    languageSectionTitle: 'Idioma y Localización de la Plataforma',
    languageSectionSub: 'Seleccione el idioma del sistema para todas las vistas, análisis e informes de auditoría',
    languageEnglish: 'English (US)',
    languageEnglishDesc: 'Terminología institucional en inglés (USD, FedNow, APY, SOX 404)',
    languageSpanish: 'Español (Latinoamérica / España)',
    languageSpanishDesc: 'Terminología financiera completa y reportes de tesorería en español',
    languageActiveBadge: 'Idioma Activo',
    themeSectionTitle: 'Tema Visual y Modo de Pantalla',
    themeSectionSub: 'Alterne entre el tema oscuro institucional y el modo claro de alto contraste',
    themeLight: 'Modo Claro (Pizarra Ejecutiva)',
    themeLightDesc: 'Diseño nítido en blanco y pizarra de alto contraste optimizado para presentaciones diurnas',
    themeDark: 'Modo Oscuro (Fintech Profundo)',
    themeDarkDesc: 'Paleta nocturna en azul marino profundo para monitoreo continuo de liquidez 24/7',
    themeActiveBadge: 'Tema Activo',
    profileSectionTitle: 'Perfil Ejecutivo y Gobernanza Corporativa',
    profileSectionSub: 'Detalles del Oficial de Tesorería Autorizado',
    officerName: 'Nombre del Oficial Autorizado',
    officerRole: 'Cargo Corporativo',
    orgName: 'Razón Social de la Organización',
    baseCurrency: 'Divisa Base de Consolidación',
    governanceSectionTitle: 'Políticas de Control Dual y Multifirma',
    governanceSectionSub: 'Límites de Seguridad y Cumplimiento SOX 404 y Basilea',
    dualSignThreshold: 'Umbral de Activación de Doble Firma (USD)',
    dualSignThresholdNotice: 'Las transferencias superiores a este monto requieren firma criptográfica de 2 directores ejecutivos independientes.',
    refreshFrequency: 'Frecuencia de Actualización de Feeds Bancarios',
    freq5Min: 'Cada 5 Minutos (Alta Frecuencia)',
    freq15Min: 'Cada 15 Minutos (Estándar)',
    freq60Min: 'Conciliación Horaria',
    optAutoSweep: 'Habilitar Barridos Nocturnos Automáticos de Saldo Cero hacia Fondos MMF de Rendimiento',
    optFxHedging: 'Habilitar Cobertura Cambiaria Continua a 60 Días para Ingresos en EUR/GBP',
    apiSectionTitle: 'Integraciones API Bancarias y Webhooks',
    apiSectionSub: 'Conectores Directos de Red SWIFT y ERP',
    connectorSwift: 'Conector SWIFT Alliance Lite2',
    connectorSwiftStatus: 'Estado: Activo • Verificado ISO 20022',
    connectorPlaid: 'Pasarela Multi-Banco Plaid Enterprise',
    connectorPlaidStatus: 'Estado: Activo • 12 de 12 Cuentas Sincronizadas',
    statusConnected: 'Conectado',
    saveSuccessNotice: 'Políticas de Tesorería e Idioma Actualizados y Firmados',
    saveBtn: 'Guardar Configuraciones de Tesorería',
    savingBtn: 'Guardando Políticas...',
  },
  charts: {
    timeframe1M: '1M',
    timeframe3M: '3M',
    timeframe6M: '6M',
    timeframe1Y: '1A',
    timeframeYTD: 'YTD',
    historicalLiquidity: 'Liquidez Consolidada Histórica',
    predictedRunway: 'Horizonte Predictivo de Pista',
    burnRate: 'Tasa Mensual de Consumo (OpEx)',
    confidenceScore: 'Confianza del Modelo',
    scenarioNotes: 'Notas del Escenario',
    interactiveForecastTitle: 'Pista Predictiva con IA y Velocidad Histórica de Liquidez',
    interactiveForecastSub: 'Efectivo conciliado histórico vs. saldo proyectado Monte Carlo (Millones USD)',
    bridgePoint: 'Último Libro Mayor Multi-Entidad Conciliado',
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('fundatiq_lang');
      if (saved === 'es' || saved === 'en') return saved;
      return 'es'; // default friendly
    } catch {
      return 'es';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('fundatiq_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const translations = language === 'es' ? esTranslations : enTranslations;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'es',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: esTranslations,
    };
  }
  return context;
};
