import Head from "next/head";
import Image from "next/image";
import Container from "@mui/material/Container";
import styles from "./layout.module.scss";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Rapid News";
export const siteTitle = "Rapid News";

export default function Layout({ children, home }) {
  return (
    <Container maxWidth="lg">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <div>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/news-128.svg"
                  height={60}
                  width={60}
                  alt={name}
                />
              </a>
            </Link>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </div>
        ) : (
          <div>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/news-128.svg"
                  height={60}
                  width={60}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </div>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </Container>
  );
}
