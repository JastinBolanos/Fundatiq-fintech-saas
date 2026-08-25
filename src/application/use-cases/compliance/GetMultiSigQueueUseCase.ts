import { IComplianceRepository } from '../../../domain/repositories/IComplianceRepository';
import { MultiSigApprovalRequest } from '../../../domain/entities/compliance.types';

export class GetMultiSigQueueUseCase {
  constructor(private complianceRepository: IComplianceRepository) {}

  async execute(): Promise<MultiSigApprovalRequest[]> {
    return this.complianceRepository.getMultiSigQueue();
  }
}
