import React from "react";
import styles from "@/app/page.module.css";
import Container from "react-bootstrap/Container";
import { notFound } from "next/navigation";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
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
    const response = await fetch(ApiUrl + `posts?slug=${subcategory}&_embed`,
    {
      next: {revalidate:180},
    }
    );
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
      openGraph: {
        images: [
          {
            url: data[0].yoast_head_json.og_image[0].url,
            height: 1200,
            width: 600,
            alt: "Alt",
          },
        ],      },
  
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
  const category =params.category
  const subcategory = params.subcategory;
  const data = await getData(subcategory);
  const formatDate = (isoDate) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", options);
  };
  if (!data) {
    return notFound();
  }
  const hash = params.hash;
  let hashOffset = 0;

  const scrollToSection = (sectionName) => {
    const sectionElement = document.getElementById(sectionName);
    if (sectionElement) {
      const rect = sectionElement.getBoundingClientRect();
      hashOffset = rect.top;
      window.scrollTo({
        top: window.scrollY + hashOffset,
        behavior: "smooth",
      });
    }
  };

  // Wait for layout to update and then scroll to the section
  if (hash) {
    setTimeout(() => {
      scrollToSection(hash);
    }, 0);
  }
  return (
    <div className={styles.latestWrap}>
      <div className={styles.container}>
        <BreadCrumb category={category} subcategory={subcategory}/>
        <div className={styles.listingDetailsWrap}>
          <div className={styles.latestBody}>
            <div className={styles.latestContent}>
              <div className={styles.listingDetailsBody}>
                <div className={styles.latestBox}>
                  {data && data.length > 0 ? (
                    <>
                      <h1
                        className={`${styles.listingDetailMainTitle} mb-4`}
                        dangerouslySetInnerHTML={{
                          __html: data[0].title.rendered,
                        }}
                      ></h1>
                      <div className={styles["author-section"]}>
                        <span className="description">
                          {data[0]._embedded.author[0].name}&nbsp;|&nbsp;
                        </span>
                        <span> Published: {formatDate(data[0].date)}</span>
                      </div>
                      <div className={styles.listingDetailMainImg}>
                        <img
                          src={data[0].jetpack_featured_media_url}
                          alt="img"
                        />
                      </div>
                      <div id={hash} className={styles.subListingDetailsItem}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data[0].content.rendered,
                          }}
                        ></div>
                      </div>
                    </>
                  ) : (
                    <div className={styles.heroCardBoxItem}>
                      <h2 className="text-center">
                        No Content found on {subcategory}
                      </h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <div className={styles.trendingTopWrap}>
            <div>
              <img
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR4El1B5cOf9EjkuWgq4J_2RBIjo4jmzznJ8_3aMgezV3h3DJpE"
                alt="img"
              />
            </div>
            <div className={styles.trendingTopHead}>
              <div
                className={styles.trendingTopTitle}
              >
                trending topics
              </div>
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
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
