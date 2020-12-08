import { Router } from "../deps.js";
import { news, theNews } from "./controllers/newsController.js";
import * as newsApi from "./apis/newsApi.js";

const router = new Router();

router.get("/", news);
router.get("/news/:id", theNews);
router.get("/api/news", await newsApi.getNews);
router.post("/api/news", await newsApi.setNews);
router.get("/api/news/:id", await newsApi.getTheNews);
router.delete("/api/news/:id", await newsApi.deleteTheNews);

export { router };
