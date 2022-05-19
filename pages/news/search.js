import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import Articles from "../../components/Article/Articles";
import { PAGE_SIZE, MAX_PAGE_SIZE } from "../../constants";
import Layout from "../../components/layout";
import { useNewsApi } from "../../hooks/useNewsApi";

// free account for news API can only retrieve first 5 pages (100 results)
const getPaginationCount = (totalResults) =>
  Math.ceil(totalResults / PAGE_SIZE) >= MAX_PAGE_SIZE
    ? MAX_PAGE_SIZE
    : Math.ceil(totalResults / PAGE_SIZE);

export default function SearchResult() {
  const [curPage, setCurPage] = useState(1);
  const router = useRouter();
  const { query } = router;
  const { data, isLoading, isError } = useNewsApi({
    searchText: query.searchText,
    page: curPage,
  });
  return (
    <Layout>
      <Head>
        <title>Search Results</title>
      </Head>
      <Articles
        articles={data?.articles}
        isError={isError}
        isLoading={isLoading}
      />
      {data?.totalResults > PAGE_SIZE && (
        <Pagination
          count={getPaginationCount(data.totalResults)}
          shape="rounded"
          sx={{ display: "flex", justifyContent: "center" }}
          onChange={(e, selectedPage) => setCurPage(selectedPage)}
          page={curPage}
        />
      )}
    </Layout>
  );
}
