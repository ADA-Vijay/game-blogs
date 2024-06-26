import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import Script from "next/script";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GameWitted",
  description:
    "Welcome to Gamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
  openGraph: {
    images: [
      {
        url: "https://fama.b-cdn.net/gw/gamewittedlogo.jpg",
        height: 1200,
        width: 600,
        alt: "Alt",
      },
    ],
    icons: {
      icon: ["/favicon/favicon.ico"],
      shortcut: ["/favicon/favicon.ico"],
    },
  },
};
const GoogleAnalyticsScript = () => (
  <>
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-BD61L86XQG"
    />
    <Script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BD61L86XQG');
      `}
    </Script>
  </>
);
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="RdxkhXckn9g6Sc2nHYDSF5_Y2fQ3VwWBpEq4ZS_Z2bg"
        />
        <meta name="og:site_name" content="GameWitted" />
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="194x194"
          href="/favicon/favicon-194x194.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/manifest.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="theme-color" content="#ffffff" /> */}

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png?v=3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png?v=3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png?v=3"
        />
        <link rel="manifest" href="favicon/manifest.webmanifest?v=3" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg?v=3"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico?v=3" />
        <meta name="apple-mobile-web-app-title" content="GameWitted" />
        <meta name="application-name" content="GameWitted" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#000000" />
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1110630702008129"
          crossOrigin="anonymous"
        ></script> */}
        {/* <link
          href={"/favImage/apple-touch-icon.png"}
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href={"/favImage/favicon/32x32.png"}
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href={"/favImage/favicon-16x16.png"}
          rel="icon"
          sizes="16x16"
          type="image/png"
        /> */}
      </head>

      <body className={inter.className}>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
          <GoogleAnalyticsScript />
        </div>
      </body>
    </html>
  );
}
