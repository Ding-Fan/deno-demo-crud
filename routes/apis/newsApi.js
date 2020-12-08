import * as newsService from "../../services/newsService.js";

const getNews = async ({ response }) => {
  response.body = await newsService.getNews();
};

const setNews = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  await newsService.setNews(document);
  response.status = 200;
};
const getTheNews = async ({ params, response }) => {
  response.body = await newsService.getTheNews(params.id);
};
const deleteTheNews = async ({ params, response }) => {
  await newsService.deleteTheNews(params.id);
  response.status = 200;
};

export { getNews, setNews, getTheNews, deleteTheNews };
