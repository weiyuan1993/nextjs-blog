import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Layout, { siteTitle } from "../components/layout";
import { useHeadlineApi } from "../hooks/useNewsApi";
import homeStyles from "./styles.module.scss";
import Articles from "../components/Articles";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TAB_CONFIG_MAP = {
  tw: {
    tab: 'tw',
    index: 0,
    country: 'tw'
  },
  us: {
    tab: 'us',
    index: 1,
    country: 'us'
  },
}


export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [tabConfig, setTabConfig] = useState(TAB_CONFIG_MAP.tw);

  const router = useRouter();

  const { data: headlinesData = {}, isLoading: isHeadlinesLoading, isError: isHeadlinesError } = useHeadlineApi({ country: tabConfig.country })

  const onClickSearch = () => {
    router.push({
      pathname: '/news/search',
      query: { searchText },
    });
  };
  const onChangeTabs = (e, newTab) => {
    setTabConfig(Object.values(TAB_CONFIG_MAP).find(config => config.index === newTab))
  }


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
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabConfig.index} onChange={onChangeTabs} aria-label="basic tabs example">
              <Tab label="🇹🇼 Headlines" {...a11yProps(0)} />
              <Tab label="🇺🇸 Headlines" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabConfig.index} index={TAB_CONFIG_MAP.tw.index}>
            <Articles articles={headlinesData.articles} isError={isHeadlinesError} isLoading={isHeadlinesLoading} />
          </TabPanel>
          <TabPanel value={tabConfig.index} index={TAB_CONFIG_MAP.us.index}>
            <Articles articles={headlinesData.articles} isError={isHeadlinesError} isLoading={isHeadlinesLoading} />
          </TabPanel>
        </Box>
      </Container>
    </Layout>
  );
}

