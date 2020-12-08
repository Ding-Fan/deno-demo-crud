import { executeQuery } from "../database/database.js";

const getNews = async () => {
  const res = await executeQuery("SELECT * FROM news");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }

  return "No news available";
};
const getTheNews = async (id) => {
  console.log("🚀 ~ file: newsService.js ~ line 12 ~ getTheNews ~ id", id);
  const res = await executeQuery("SELECT * FROM news WHERE id = $1", id);
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects()[0];
  }

  return "No news available";
};
const deleteTheNews = async (id) => {
  await executeQuery("DELETE FROM news WHERE id = $1", id);
};

const setNews = async ({ title, content }) => {
  await executeQuery(
    "INSERT INTO news (title, content) VALUES ($1, $2);",
    title,
    content
  );
};

export { getNews, getTheNews, setNews, deleteTheNews };
