import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Pagination from "@mui/material/Pagination";
import Layout, { siteTitle } from "../components/layout";
import { getHeadlineNews } from "../lib/news";
import { useNewsApi } from "../hooks/useNewsApi";
import homeStyles from "./styles.module.scss";
import Articles from "../components/Articles";

export default function Home({ headlineArticles = [] }) {
  const [searchText, setSearchText] = useState("");
  const [curPage, setCurPage] = useState(1);

  const router = useRouter();
  const { query } = router;
  const { data, isLoading, isError } = useNewsApi({
    searchText: query.searchText,
    page: curPage,
  });

  const onClickSearch = () => {
    setCurPage(1);
    router.push({
      query: { searchText },
    });
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container maxWidth="lg">
        <div className={homeStyles.searchField}>
          <TextField
            id="outlined-search"
            label="Search News"
            size="small"
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onClickSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            autoFocus
            fullWidth
          />
          <Button
            variant="contained"
            onClick={onClickSearch}
            disabled={!searchText}
          >
            Search
          </Button>
        </div>
        {query.searchText ? (
          <>
            <Articles
              articles={data?.articles}
              isError={isError}
              isLoading={isLoading}
            />
            {data?.totalResults > 20 && (
              <Pagination
                count={Math.ceil(data?.totalResults / 20)}
                shape="rounded"
                sx={{ display: "flex", justifyContent: "center" }}
                onChange={(e, selectedPage) => setCurPage(selectedPage)}
                page={curPage}
              />
            )}
          </>
        ) : (
          <Articles articles={headlineArticles} isError={isError} />
        )}
      </Container>
    </Layout>
  );
}
export async function getStaticProps() {
  // `getStaticProps` is executed on the server side.
  const { articles } = await getHeadlineNews();
  return {
    props: {
      headlineArticles: articles,
    },
  };
}
