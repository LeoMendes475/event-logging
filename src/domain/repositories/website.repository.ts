export interface WebsiteRepository {
    saveStatus(url: string, status: boolean): Promise<void>;
  }
  