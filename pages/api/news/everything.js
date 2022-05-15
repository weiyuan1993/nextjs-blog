import { NEWS_API_KEY, NEWS_API_DOMAIN } from "../../../constants";

export default async function handler(req, res) {
  const { q, page } = req.query;
  const api = `${NEWS_API_DOMAIN}/everything?q=${q}&page=${page}&apiKey=${NEWS_API_KEY}`;
  try {
    const response = await fetch(api);
    const result = await response.json();
    res.status(200).json(result);
  } catch (e) {
    console.log("Error in api/news/everything", e);
  }
}
