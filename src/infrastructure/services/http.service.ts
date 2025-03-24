import axios from "axios";

export class HttpService {
  async checkWebsiteStatus(url: string): Promise<boolean> {
    try {
      const response = await axios.get(url, { timeout: 5000 });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}
