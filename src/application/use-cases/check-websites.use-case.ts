import { HttpService } from "../../infrastructure/services/http.service";
import { WebsiteRepository } from "../../domain/repositories/website.repository";

export class CheckWebsitesUseCase {
  constructor(
    private readonly httpService: HttpService,
    private readonly websiteRepository: WebsiteRepository
  ) {}

  async execute(urls: string[]): Promise<{ url: string; status: boolean }[]> {
    const results = await Promise.all(
      urls.map(async (url) => {
        const status = await this.httpService.checkWebsiteStatus(url);
        await this.websiteRepository.saveStatus(url, status); // Salva no banco, se necessário
        return { url, status };
      })
    );

    return results;
  }
}
