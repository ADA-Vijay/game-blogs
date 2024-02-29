import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter} from "next/font/google";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "GameWitted",
     description: "Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
     images: [
       {
         url: "https://fama.b-cdn.net/gw/gwlogo.png",
         height: 1200,
         width: 600,
         alt: "Alt",
       },
     ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

            <div className="container">
              <Navbar />
              {children}
              <Footer />
            </div>
      </body>
    </html>
  );
}
