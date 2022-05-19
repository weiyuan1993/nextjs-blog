import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Layout, { siteTitle } from "../components/layout";
import { useHeadlineApi } from "../hooks/useNewsApi";
import Articles from "../components/Article/Articles";
import { COUNTRY, CATEGORY_CONFIG } from "../constants";

const DEFAULT_COUNTRY = COUNTRY.tw;
const DEFAULT_CATEFGORY = "general";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const router = useRouter();
  const { query = { category: DEFAULT_CATEFGORY, country: DEFAULT_COUNTRY } } =
    router;
  const {
    data: headlinesData = {},
    isLoading: isHeadlinesLoading,
    isError: isHeadlinesError,
  } = useHeadlineApi(query);

  const onClickSearch = () => {
    router.push({
      pathname: "/news/search",
      query: { searchText },
    });
  };

  const onSelectCategory = (event, newCategory) => {
    router.push({
      query: { ...query, category: newCategory },
    });
  };

  const onSelectCountry = () => {
    const newCountry = country === COUNTRY.tw ? COUNTRY.us : COUNTRY.tw;
    setCountry(newCountry);
    router.push({
      query: { ...query, country: newCountry },
    });
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Paper
        component="div"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton
          sx={{ p: "10px" }}
          aria-label="menu"
          onClick={onSelectCountry}
        >
          <img priority width="30px" src={`/images/${country}.svg`} />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ "aria-label": "search google maps" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onClickSearch()}
          autoFocus
        />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={onClickSearch}
          disabled={!searchText}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Box sx={{ width: "100%" }}>
        <TabContext value={query.category}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={onSelectCategory}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {Object.entries(CATEGORY_CONFIG).map(([cat, setting]) => (
                <Tab key={cat} label={cat} value={cat} />
              ))}
            </TabList>
            <Articles
              articles={headlinesData.articles}
              isError={isHeadlinesError}
              isLoading={isHeadlinesLoading}
            />
          </Box>
        </TabContext>
      </Box>
    </Layout>
  );
}
