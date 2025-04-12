import { HttpService } from "../../infrastructure/services/http.service";
import { WebsiteRepository } from "../../domain/repositories/website.repository";
import { WebsiteStatus } from "../../common/enums/website-status.enum";

export class CheckWebsitesUseCase {
  constructor(
    private readonly httpService: HttpService,
    private readonly websiteRepository: WebsiteRepository
  ) {}

  async execute(urls: string[]): Promise<{ url: string; status: WebsiteStatus }[]> {
    const results = await Promise.all(
      urls.map(async (url) => {
        const status = await this.httpService.checkWebsiteStatus(url);
        await this.websiteRepository.saveStatus(url, status);
        return { url, status };
      })
    );

    return results;
  }
}
