import * as newsService from "../../services/newsService.js";

const news = async ({ render }) => {
  render("index.ejs", { items: await newsService.getNews() });
};
const theNews = async ({ params, render }) => {
  const data = await newsService.getTheNews(params.id);
  console.log("🚀 ~ file: newsController.js ~ line 8 ~ theNews ~ data", data);
  render("news-item.ejs", data);
};

export { news, theNews };
