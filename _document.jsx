import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/icon.webp" />

        <title>Tech Products</title>
        <meta name="title" content="Tech Products" />
        <meta name="description" content="E-comerce" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://tech-product-front-end.vercel.app/"
        />
        <meta property="og:title" content="Tech Products" />
        <meta property="og:description" content="E-comerce" />
        <meta
          property="og:image"
          content="https://metatags.io/images/meta-tags.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://tech-product-front-end.vercel.app/"
        />
        <meta property="twitter:title" content="Tech Products" />
        <meta property="twitter:description" content="E-comerce" />
        <meta
          property="twitter:image"
          content="https://metatags.io/images/meta-tags.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
