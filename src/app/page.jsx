import HeroBanner from "@/components/heroBanner/heroBanner";
import styles from "@/app/page.module.css";
import ListingPage from "@/components/listing/listing";
import Link from "next/link";
import Image from "next/image";

async function getData() {
  const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";
  const trendingId = 606508208;
  try {
    const response = await fetch(
      ApiUrl + "posts?per_page=10&order=desc&orderby=date&_embed=1",
      // {
      //   next: {revalidate:30},
      // }
    );
    const newdata = await response.json();

    const trending = await fetch(
      `${ApiUrl}posts?tags=${trendingId}&_embed&per_page=3&orderby=date&order=desc`
    );
    const trendingPosts = await trending.json();

    if (trendingPosts) {
      return {
        newdata,
        trendingPosts,
      };
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function generateMetadata({ params }) {
  const { newdata, trendingPosts } = await getData(params.query);
  if (newdata && newdata.length > 0) {
    //   return {
    //     title: newdata[0].yoast_head_json.title,
    //      description: newdata[0].yoast_head_json.description,
    //      images: [
    //        {
    //          url: newdata[0].yoast_head_json.og_image[0].url,
    //          height: 1200,
    //          width: 600,
    //          alt: "Alt",
    //        },
    //      ],
    //  };
    return {
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
  }
}

const Home = async () => {
  const { newdata, trendingPosts } = await getData();

  return (
    <>
      <main className="">
        <HeroBanner></HeroBanner>
        <div className={styles.promoWrap}>
          <div className={styles.container}>
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
                            alt="Image"
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
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.promoTitles}>
            <h4>Latest</h4>
            <div className={styles.headingLine}></div>
          </div>
        </div>
        <ListingPage newdata={newdata} />
      </main>
    </>
  );
};

export default Home;
