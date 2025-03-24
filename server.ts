import Koa from "koa";
import bodyParser from "koa-bodyparser";
import websiteRouter from "./src/presentation/controllers/website.controller";

const app = new Koa();

app.use(bodyParser());
app.use(websiteRouter.routes()).use(websiteRouter.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
