import { NEWS_API_KEY, NEWS_API_DOMAIN } from "../constants";

export async function getHeadlineNews(params = { country: "tw" }) {
  try {
    const { country } = params;
    const response = await fetch(
      `${NEWS_API_DOMAIN}/top-headlines?country=${country}&pageSize=50&apiKey=${NEWS_API_KEY}`
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getNews(params) {
  try {
    const { q } = params;
    const response = await fetch(
      `${NEWS_API_DOMAIN}/everything?q=${q}&apiKey=${NEWS_API_KEY}`
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
}
