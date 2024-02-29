// import Image from "next/image";
// import styles from "./page.module.css";
// import Hero from "public/hero.png";
// import Button from "@/components/Button/Button";

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.item}>
//         <h1 className={styles.title}>
//           Better design for your digital products.
//         </h1>
//         <p className={styles.desc}>
//           Turning your Idea into Reality. We bring together the teams from the
//           global tech industry.
//         </p>
//         <Button url="/portfolio" text="See Our Works"/>
//       </div>
//       <div className={styles.item}>
//         <Image src={Hero} alt="" className={styles.img} />
//       </div>
//     </div>
//   );
// }


import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import HeroBanner from "@/components/heroBanner/heroBanner";
import Container from "react-bootstrap/Container";
import styles from "@/app/page.module.css";
// import axios from "axios";
// import { NextSeo } from "next-seo";
import ListingPage from "@/components/listing/listing";
import Link from "next/link";

async function getData() {
  const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";

  const trendingId = 606508208;

  try {
 

    const response = await fetch(
      ApiUrl + "posts?per_page=10&order=desc&orderby=date&_embed=1"
    );
    const newdata = await response.json();

    const trending = await fetch(
      `${ApiUrl}posts?tags=${trendingId}&_embed&per_page=3&orderby=date&order=desc`
    );
    const trendingPosts = await trending.json();

    if ( trendingPosts) {
      return { 
         newdata,
        trendingPosts
         };
    }
  } catch (error) {
    console.error("Error While Fetching the Data :", error);
    throw new Error("Failed to fetch data");
  }
}

 const  Home= async()=> {
  const { newdata,trendingPosts } = await getData();

  return (
    <>
      {/* {newdata && newdata.length > 0 ? (
        <NextSeo
          title="Home | AshGamewitted"
          description={newdata[0].yoast_head_json.og_description}
          openGraph={{
            title: "Home | AshGamewitted",
            description: newdata[0].yoast_head_json.og_description,
            images: [
              {
                url: newdata[0].yoast_head_json.og_image[0].url,
                height: 1200,
                width: 600,
              },
            ],
          }}
        />
      ) : (
        <NextSeo
          title="AshGamewitted"
          description="Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms."
          openGraph= {{
            title:"AshGamewitted",
            description:"Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
            images :[
              {
                url:"",
                width: 1200,
                height: 630,
                alt: 'AshGamewitted',
              }
            ]
          }}
        />
      )} */}

      <main className="">
          <HeroBanner></HeroBanner>
         <div className={styles.promoWrap}>
          <Container>
            <div className={styles.promoBody}>
              <div className={styles.promoTitles}>
                <h4>POPULAR CATEGORIES</h4>
                <div className={styles.headingLine}></div>
              </div>
              <div className={styles.promoBox}>
                {trendingPosts && trendingPosts.length > 0
                  ? trendingPosts.map((card, index) => (
                      <Link
                        key={index}
                        href={`/${card._embedded["wp:term"][0][0].slug}/`}
                      >
                        <div className={styles.promoBoxItem} key={index}>
                          <img
                            className={styles.promoImg}
                            src={card.jetpack_featured_media_url}
                            alt="img"
                          />
                          <div className={styles.promoInfo} key={index}>
                            <h4 className={styles.promoName}>
                              {card._embedded["wp:term"][0][0].name}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))
                  : ""}
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className={styles.promoTitles}>
            <h4>Latest</h4>
            <div className={styles.headingLine}></div>
          </div>
        </Container>
        <ListingPage newdata={newdata} /> 
        {/* <Footer></Footer> */}
      </main>
    </>
  );
}

export default Home
