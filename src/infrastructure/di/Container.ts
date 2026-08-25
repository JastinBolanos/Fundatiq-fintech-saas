import { MockTreasuryRepository } from '../repositories/MockTreasuryRepository';
import { MockCashFlowRepository } from '../repositories/MockCashFlowRepository';
import { MockComplianceRepository } from '../repositories/MockComplianceRepository';
import { MockAnalyticsRepository } from '../repositories/MockAnalyticsRepository';

import {
  GetAccountsUseCase,
  GetSubsidiariesUseCase,
  GetTransactionsUseCase,
  ExecuteTransferUseCase,
  ToggleSweepUseCase,
} from '../../application/use-cases/treasury';

import { GetCashFlowDataUseCase } from '../../application/use-cases/cashflow';

import {
  GetComplianceAuditUseCase,
  GetMultiSigQueueUseCase,
  ApproveMultiSigUseCase,
} from '../../application/use-cases/compliance';

import {
  GetPredictiveRunwayUseCase,
  SimulateScenarioUseCase,
} from '../../application/use-cases/analytics';

export interface DIContainer {
  // Repositories
  treasuryRepo: MockTreasuryRepository;
  cashFlowRepo: MockCashFlowRepository;
  complianceRepo: MockComplianceRepository;
  analyticsRepo: MockAnalyticsRepository;

  // Use cases
  getAccountsUseCase: GetAccountsUseCase;
  getSubsidiariesUseCase: GetSubsidiariesUseCase;
  getTransactionsUseCase: GetTransactionsUseCase;
  executeTransferUseCase: ExecuteTransferUseCase;
  toggleSweepUseCase: ToggleSweepUseCase;

  getCashFlowDataUseCase: GetCashFlowDataUseCase;

  getComplianceAuditUseCase: GetComplianceAuditUseCase;
  getMultiSigQueueUseCase: GetMultiSigQueueUseCase;
  approveMultiSigUseCase: ApproveMultiSigUseCase;

  getPredictiveRunwayUseCase: GetPredictiveRunwayUseCase;
  simulateScenarioUseCase: SimulateScenarioUseCase;
}

export function createDIContainer(): DIContainer {
  const treasuryRepo = new MockTreasuryRepository();
  const cashFlowRepo = new MockCashFlowRepository();
  const complianceRepo = new MockComplianceRepository();
  const analyticsRepo = new MockAnalyticsRepository();

  return {
    treasuryRepo,
    cashFlowRepo,
    complianceRepo,
    analyticsRepo,

    getAccountsUseCase: new GetAccountsUseCase(treasuryRepo),
    getSubsidiariesUseCase: new GetSubsidiariesUseCase(treasuryRepo),
    getTransactionsUseCase: new GetTransactionsUseCase(treasuryRepo),
    executeTransferUseCase: new ExecuteTransferUseCase(treasuryRepo),
    toggleSweepUseCase: new ToggleSweepUseCase(treasuryRepo),

    getCashFlowDataUseCase: new GetCashFlowDataUseCase(cashFlowRepo),

    getComplianceAuditUseCase: new GetComplianceAuditUseCase(complianceRepo),
    getMultiSigQueueUseCase: new GetMultiSigQueueUseCase(complianceRepo),
    approveMultiSigUseCase: new ApproveMultiSigUseCase(complianceRepo),

    getPredictiveRunwayUseCase: new GetPredictiveRunwayUseCase(analyticsRepo),
    simulateScenarioUseCase: new SimulateScenarioUseCase(analyticsRepo),
  };
}

// Global Singleton instance for application runtime
export const appDIContainer = createDIContainer();
