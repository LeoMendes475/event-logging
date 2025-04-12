import { WebsiteStatus } from "../../common/enums/website-status.enum";

export interface WebsiteRepository {
    saveStatus(url: string, status: WebsiteStatus): Promise<void>;
    // to-do
    // -- Add date if down de website
  }
  