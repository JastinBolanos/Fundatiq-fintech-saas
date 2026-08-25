import { IComplianceRepository } from '../../../domain/repositories/IComplianceRepository';
import { MultiSigApprovalRequest } from '../../../domain/entities/compliance.types';

export class ApproveMultiSigUseCase {
  constructor(private complianceRepository: IComplianceRepository) {}

  async execute(requestId: string, signerName: string, role: string): Promise<MultiSigApprovalRequest> {
    return this.complianceRepository.approveMultiSigRequest(requestId, signerName, role);
  }
}
