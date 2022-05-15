import ArticleCard from "./ArticleCard";
import utilStyles from "../styles/utils.module.css";

export default function Articles({ articles = [], isError, isLoading }) {
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!articles.length) return <div>No Results</div>;
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <ul className={utilStyles.list}>
        {articles.map(
          ({ author, publishedAt, title, description, url, urlToImage }) => (
            <li className={utilStyles.listItem} key={title}>
              <ArticleCard
                author={author}
                publishedAt={publishedAt}
                title={title}
                description={description}
                url={url}
                urlToImage={urlToImage}
              />
            </li>
          )
        )}
      </ul>
    </section>
  );
}
