import axios from "axios";
import { WebsiteStatus } from "../../common/enums/website-status.enum";

export class HttpService {
  async checkWebsiteStatus(url: string): Promise<WebsiteStatus> {
    try {
      const response = await axios.get(url, { timeout: 5000 });
      if (response.status >= 200 && response.status < 400) {
        return WebsiteStatus.ONLINE;
      }
      return WebsiteStatus.OFFLINE;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ENOTFOUND') {
          return WebsiteStatus.NOT_FOUND;
        } else if (error.code === 'ECONNREFUSED' || error.code === 'ECONNABORTED') {
          return WebsiteStatus.OFFLINE;
        } else if (error.response) {
          return WebsiteStatus.OFFLINE;
        }
      }
      return WebsiteStatus.INVALID_URL;
    }
  }
}
