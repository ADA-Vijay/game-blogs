import HeroBanner from "@/components/heroBanner/heroBanner";
import Container from "react-bootstrap/Container";
import styles from "@/app/page.module.css";
import ListingPage from "@/components/listing/listing";
import Link from "next/link";
import Image from 'next/image'

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

    if (trendingPosts) {
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

const Home = async () => {
  const { newdata, trendingPosts } = await getData();

  return (
    <>
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
                      prefetch={true}
                      href={`/${card._embedded["wp:term"][0][0].slug}/`}
                    >
                      <div className={styles.promoBoxItem} key={index}>
                        <Image
                          className={styles.promoImg}
                          src={card.jetpack_featured_media_url}
                          alt={card._embedded["wp:term"][0][0].name}
                          loading="lazy"
                          width={500}
                          height={300}
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
