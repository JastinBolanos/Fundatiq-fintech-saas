import { IComplianceRepository } from '../../../domain/repositories/IComplianceRepository';
import { ComplianceAuditItem } from '../../../domain/entities/compliance.types';

export class GetComplianceAuditUseCase {
  constructor(private complianceRepository: IComplianceRepository) {}

  async execute(): Promise<ComplianceAuditItem[]> {
    return this.complianceRepository.getAuditItems();
  }
}
