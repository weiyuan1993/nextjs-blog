import ArticleCard from "./ArticleCard";
import utilStyles from "../../styles/utils.module.css";
import styles from "./articles.module.scss";

export default function Articles({ articles = [], isError, isLoading }) {
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!articles.length) return <div>No Results</div>;
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <ul className={styles.list}>
        {articles.map(
          ({ author, publishedAt, title, description, url, urlToImage, source }) => (
            <li className={styles.listItem} key={title}>
              <ArticleCard
                author={author}
                publishedAt={publishedAt}
                title={title}
                description={description}
                url={url}
                urlToImage={urlToImage}
                source={source}
              />
            </li>
          )
        )}
      </ul>
    </section>
  );
}
