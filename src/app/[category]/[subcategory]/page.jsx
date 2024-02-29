import React from "react";
import styles from "@/app/page.module.css";
import Container from "react-bootstrap/Container";
// import NotFound from "@/components/notFound/notFound";
// import Notfound from "@/app/not-found"
 import { notFound } from "next/navigation";
const trendingTopData = [
  {
    name: "Palworld Guide: How to Fain Your Base",
    activeDate: "arzan khan 2 months ago",
  },
  {
    name: "Genshin Impact 4.4: All Things You Need to Know",
    activeDate: "arzan khan 2 months ago",
  },
  {
    name: "Destiny 2 Players Are Shocked with the New Character",
    activeDate: "arzan khan 2 months ago",
  },
  {
    name: "Keanu Reeves Cameo in the Newest Cyberpunk Update",
    activeDate: "arzan khan 2 months ago",
  },
];
async function getData(subcategory) {
  const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";
  try {
    const response = await fetch(ApiUrl + `posts?slug=${subcategory}&_embed`);
    const data = await response.json();
    return data && data.length > 0 ? data : null;

  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
}

export async function generateMetadata({ params }) {
  const data = await getData(params.subcategory);
  if (data && data.length > 0) {
    return {
      title: data[0].yoast_head_json.title,
      description: data[0].yoast_head_json.description,
      images: [
        {
          url: data[0].yoast_head_json.og_image[0].url,
          height: 1200,
          width: 600,
          alt: "Alt",
        },
      ],
    };
  }
  // else{
  //   return {
  //     title: "GameWitted",
  //      description: "Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
  //      images: [
  //        {
  //          url: "https://fama.b-cdn.net/gw/gwlogo.png",
  //          height: 1200,
  //          width: 600,
  //          alt: "Alt",
  //        },
  //      ],
  //  };
  // }
}
const page = async ({ params }) => {
  const subcategory = params.subcategory;
  const data = await getData(subcategory);
  const formatDate = (isoDate) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", options);
  };
  if(!data){
    return notFound()
  }
  return (
    <div className={styles.latestWrap}>
      <Container>
        <div className={styles.listingDetailsWrap}>
          <div className={styles.latestBody}>
            <div className={styles.latestContent}>
              <div className={styles.listingDetailsBody}>
                <div className={styles.latestBox}>
                  {data && data.length > 0 && (
                    <>
                      <div
                        className={`${styles.listingDetailMainTitle} mb-4`}
                        dangerouslySetInnerHTML={{
                          __html: data[0].title.rendered,
                        }}
                      ></div>
                      <div className={styles["author-section"]}>
                        <h2 className="description">
                          Author : {data[0]._embedded.author[0].name}
                        </h2>
                        <h2>Published On : {formatDate(data[0].date)}</h2>
                      </div>
                      <div className={styles.listingDetailMainImg}>
                        <img
                          src={data[0].jetpack_featured_media_url}
                          alt="img"
                        />
                      </div>
                      <div
                        id="overview%20of%20the%20hu-taos%20kit"
                        className={styles.subListingDetailsItem}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data[0].content.rendered,
                          }}
                        ></div>
                      </div>
                    </>
                  )
                  //  : (
                  //   <div className={styles.heroCardBoxItem}>
                  //     <Notfound />
                  //   </div>
                  // )
                  }
                </div>
              </div>
            </div>
            <div className={styles.trendingTopWrap}>
              <div>
                <img
                  src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR4El1B5cOf9EjkuWgq4J_2RBIjo4jmzznJ8_3aMgezV3h3DJpE"
                  alt="img"
                />
              </div>
              <div className={styles.trendingTopHead}>
                <div className={styles.trendingTopTitle}>trending topics</div>
                <div className={styles.trendingTopBody}>
                  <ul>
                    {trendingTopData.map((card, index) => (
                      <li key={index}>
                        <h4>{card.name}</h4>
                        <p>{card.activeDate}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
