import { EvidenceSource, VerificationStatus } from '../types/crm';

export class EvidenceRegistry {
  private static sources: Map<string, EvidenceSource> = new Map();

  /**
   * Register a verified evidence source.
   */
  public static registerSource(source: EvidenceSource): EvidenceSource {
    this.sources.set(source.id, source);
    return source;
  }

  /**
   * Retrieve a specific source by its unique ID.
   */
  public static getSource(id: string): EvidenceSource | undefined {
    return this.sources.get(id);
  }

  /**
   * Get all sources for a specific account.
   */
  public static getSourcesByAccount(account: string): EvidenceSource[] {
    return Array.from(this.sources.values()).filter(
      (s) => s.account.toLowerCase().includes(account.toLowerCase()) || account === 'ALL'
    );
  }

  /**
   * Get all registered sources.
   */
  public static getAllSources(): EvidenceSource[] {
    return Array.from(this.sources.values());
  }

  /**
   * Create standard verified evidence source entry.
   */
  public static create(params: {
    id: string;
    toolName: string;
    recordId: string;
    account: string;
    retrievalTimestamp?: string;
    fieldName?: string;
    rawExcerpt: string;
    verificationStatus: VerificationStatus;
  }): EvidenceSource {
    const entry: EvidenceSource = {
      id: params.id,
      toolName: params.toolName,
      recordId: params.recordId,
      account: params.account,
      retrievalTimestamp: params.retrievalTimestamp || new Date().toISOString(),
      fieldName: params.fieldName,
      rawExcerpt: params.rawExcerpt,
      verificationStatus: params.verificationStatus,
    };
    this.registerSource(entry);
    return entry;
  }
}
