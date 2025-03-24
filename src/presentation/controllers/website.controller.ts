import Router from "@koa/router";
import { CheckWebsitesUseCase } from "../../application/use-cases/check-websites.use-case";
import { HttpService } from "../../infrastructure/services/http.service";
import { WebsiteRepository } from "../../domain/repositories/website.repository";

const router = new Router();

// Suponha que já tenha um repositório implementado, como um TypeORMRepository
const httpService = new HttpService();
const websiteRepository: WebsiteRepository = {
  async saveStatus(url, status) {
    console.log(`Saving ${url} with status ${status}`);
    // Aqui você pode salvar no banco usando TypeORM ou outro ORM
  },
};

const checkWebsitesUseCase = new CheckWebsitesUseCase(
  httpService,
  websiteRepository
);

router.post("/check-websites", async (ctx) => {
  const { urls } = ctx.request.body;
  if (!Array.isArray(urls)) {
    ctx.status = 400;
    ctx.body = { error: "Invalid input, expected an array of URLs" };
    return;
  }

  const results = await checkWebsitesUseCase.execute(urls);
  ctx.body = { results };
});

export default router;
