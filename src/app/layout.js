import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import Script from "next/script";
import Head from "next/head";
import Ramp from '@/components/ramp/ramp';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GameWitted",
  description:
    "Welcome to Gamewitted! Dive into immersive gaming and anime content with the latest updates, reviews, and insights. Where pixels meet passion!",
  openGraph: {
    images: [
      {
        url: "https://fama.b-cdn.net/gw/gwlogo.png",
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
  twitter: {
    card: "summary_large_image",
    title: "GameWitted",
    description:
      "Welcome to Gamewitted! Dive into immersive gaming and anime content with the latest updates, reviews, and insights. Where pixels meet passion!",
    images: {
      url: "https://fama.b-cdn.net/gw/gamewittedlogo.jpg",
      alt: "GameWitted ",
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

const PUB_ID = 1025324;
const WEBSITE_ID = 75084;
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:site_name" content="GameWitted" />
        <meta
          property="og:description"
          content="Welcome to Gamewitted! Dive into immersive gaming and anime content with the latest updates, reviews, and insights. Where pixels meet passion!"
        />
        <meta
          name="google-site-verification"
          content="RdxkhXckn9g6Sc2nHYDSF5_Y2fQ3VwWBpEq4ZS_Z2bg"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
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
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/manifest.webmanifest" />
        <link rel="manifest" href="/favicon/browserconfig.xml" />

        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
        window.ramp = window.ramp || {};
        window.ramp.que = window.ramp.que || [];
        window.ramp.passiveMode = true;

        var pwUnits = [
          { selectorId: 'bottomAds', type: 'bottom_rail' },
          { selectorId: 'leftAds', type: 'left_rail' },
          { selectorId: 'rightAds', type: 'right_rail' },
          { type: 'bottom_rail' },
          { type: 'corner_ad_video' }
        ];

        window.ramp.que.push(() => {
          window.ramp.addUnits(pwUnits).then(() => {
            window.ramp.displayUnits();
            console.log("success")
          }).catch((e) => {
                        console.log("error","playwire");
                        console.log("error",e);
          });
        });
      `,
          }}
        ></script> */}
        {/* <script
          type="text/javascript"
          async
          src="https://cdn.intergient.com/1025324/75084/ramp.js"
        ></script> */}
      </head>

      <body className={inter.className}>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
          <GoogleAnalyticsScript />
          <Ramp PUB_ID={PUB_ID} WEBSITE_ID={WEBSITE_ID} />
        </div>
      </body>
    </html>
  );
}
