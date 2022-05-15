import { NEWS_API_KEY, NEWS_API_DOMAIN, MAX_PAGE_SIZE } from "../constants";

export async function getHeadlineNews(params = { country: "tw" }) {
  let result = { articles: [] }

  try {
    const { country } = params;
    const response = await fetch(
      `${NEWS_API_DOMAIN}/top-headlines?country=${country}&pageSize=${MAX_PAGE_SIZE}&apiKey=${NEWS_API_KEY}`
    )
    if (response.status === 200) {
      result = await response.json();
    }
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
