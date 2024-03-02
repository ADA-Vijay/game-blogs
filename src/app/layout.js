import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GameWitted",
  description:
    "Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
  images: [
    {
      url: "https://fama.b-cdn.net/gw/gwlogo.png",
      height: 1200,
      width: 600,
      alt: "Alt",
    },
  ],
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
      <meta
        name="google-site-verification"
        content="RdxkhXckn9g6Sc2nHYDSF5_Y2fQ3VwWBpEq4ZS_Z2bg"
      />

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
