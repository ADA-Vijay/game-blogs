import React from "react";
import styles from "@/app/page.module.css";
import { notFound } from "next/navigation";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import ContentSection from "@/components/ContentSection/ContentSection";

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
        ],
      },
    };
  }
}

const Page = async ({ params }) => {
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

  return (
    <div className={styles.latestWrap}>
      <div className={styles.container}>
        {data && data.length > 0 && (
          <>
            <BreadCrumb category={category} subcategory={subcategory} />
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
                          <ContentSection
                            content={data[0].content.rendered}
                            hash={hash}
                          />
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
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
