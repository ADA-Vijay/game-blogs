import React from "react";
import styles from "@/app/page.module.css";
import { notFound } from "next/navigation";
import RelatedPosts from "@/components/relatedPosts/relatedPosts";
import Link from "next/link";
async function getData(subcategory) {
  const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";
  try {
    const response = await fetch(ApiUrl + `posts?slug=${subcategory}&_embed`, {
      next: { revalidate: 180 },
    });
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

const getPostByCategory = async (params) => {
  if (params) {
    const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";

    const categoryResponse = await fetch(
      `${ApiUrl}categories?slug=${params.category}`
    );
    if (categoryResponse) {
      const catgoryData = await categoryResponse.json();
      try {
        const categoryId = catgoryData[0].id;
        const postData = await fetch(
          "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?categories=" +
            categoryId +
            "&_embeded"
        );
        if (postData) {
          const posts = await postData.json();
          return posts;
        }
        console.log(postData);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export async function generateMetadata({ params }) {
  const data = await getData(params.subcategory);

  if (data && data.length > 0) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data[0].yoast_head_json.title,
      image: data[0].yoast_head_json.og_image[0].url,
      datePublished: data[0].date,
      dateModified: data[0].modified,
      author: {
        "@type": "Person",
        name: data[0]._embedded.author[0].name,
      },
      publisher: {
        "@type": "Organization",
        name: "GameWitted",
        logo: {
          "@type": "ImageObject",
          url: "https://fama.b-cdn.net/gw/gwlogo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.gamewitted.com/${params.category}/${params.subcategory}`,
      },
      description: data[0].yoast_head_json.description,
    };
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
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data[0].yoast_head_json.title,
        description: data[0].yoast_head_json.description,
        creator: data[0]._embedded.author[0].name,
        images: {
          url: data[0].yoast_head_json.og_image[0].url,
          width: "1200",
          height: "600",
          alt: data[0].yoast_head_json.title,
          site: "GameWitted",
        },
      },
      // alternates: {
      //   canonical: `https://www.gamewitted.com/${params.category}/${params.subcategory}`,
      // },
      structuredData: JSON.stringify(structuredData),
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

const RichResultsScript = ({ structuredData, breadcrumb }) => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: breadcrumb,
      }}
    />
  </>
);

const page = async ({ params }) => {
  const category = params.category;
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

  const categoryPosts = await getPostByCategory(params);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `https://www.gamewitted.com/${params.category}/${params.subcategory}`,  // unique ID for the article
    headline: data[0].yoast_head_json.title,
    image: data[0].yoast_head_json.og_image[0].url,
    thumbnailUrl: data[0].yoast_head_json.og_image[0].url, // Setting the thumbnail URL to the main image URL (or another image if preferred)
    datePublished: `${data[0].date}Z`,
    dateModified: `${data[0].modified}Z`,
    isAccessibleForFree: "True",
    articleBody: data[0].content.rendered.replace(/<[^>]*>?/gm, ''), // Stripping HTML tags
    author: {
      "@type": "Person",
      name: data[0]._embedded.author[0].name,
      url: `https://www.gamewitted.com/author/${data[0]._embedded.author[0].name.replace(" ", "-")}`
    },
    publisher: {
      "@type": "Organization",
      name: "GameWitted",
      logo: {
        "@type": "ImageObject",
        url: "https://fama.b-cdn.net/gw/gwlogo.png",
      },
    },
    isPartOf: {
      "@type": "WebPage",
      "@id": `https://www.gamewitted.com/${params.category}`,
      url: `https://www.gamewitted.com/${params.category}`,
      name: params.category,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.gamewitted.com/${params.category}/${params.subcategory}`,
    },
    description: data[0].yoast_head_json.description,
    inLanguage: "en-US",
  };
  

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: params.category,
        item: `https://www.gamewitted.com/${params.category}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: params.subcategory,
        item: `https://www.gamewitted.com/${params.category}/${params.subcategory}`,
      },
    ],
  };

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
    <>
      <RichResultsScript
        structuredData={structuredData}
        breadcrumb={JSON.stringify(breadcrumbStructuredData)}
      />
      {data && data.length > 0 && (
        <>
          <div className={styles.latestWrap}>
            <div className={styles.container}>
              {/* <BreadCrumb category={category} subcategory={subcategory} /> */}
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
                              <Link
                                href={`/author/${data[0]._embedded.author[0].name.replace(
                                  " ",
                                  "-"
                                )}`}
                                className="description"
                              >
                                {data[0]._embedded.author[0].name}&nbsp;|&nbsp;
                              </Link>
                              <span>
                                {" "}
                                Published: {formatDate(data[0].date)}
                              </span>
                            </div>
                            <div className={styles.listingDetailMainImg}>
                              <img
                                src={data[0].jetpack_featured_media_url}
                                alt="img"
                              />
                            </div>
                            <div
                              id={hash}
                              className={styles.subListingDetailsItem}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: data[0].content.rendered,
                                }}
                              ></div>
                              {data && data.length > 0 && (
                                <RelatedPosts
                                  category={params.category}
                                  data={categoryPosts}
                                ></RelatedPosts>
                              )}
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
                      <div>
                        <h3 className={styles.authorTitle}>About Author</h3>
                        <div className={styles.authorNameDiv}>
                          <Link
                            href={`/author/${data[0]._embedded.author[0].name.replace(
                              " ",
                              "-"
                            )}`}
                            className={styles.authorName}
                          >
                            {data[0]._embedded.author[0].name}
                          </Link>
                        </div>
                        <div>
                          <span className={styles.authorDescription}>
                            {data[0]._embedded.author[0].description}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div></div>
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
        </>
      )}
    </>
  );
};

export default page;
