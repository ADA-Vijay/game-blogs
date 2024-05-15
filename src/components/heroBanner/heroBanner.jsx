import React from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";

async function getData() {
  try {
    const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";
    const bannerId = 606508198;
    const bannerResponse = await fetch(
      ApiUrl +
        `posts?tags=${bannerId}&_embed&per_page=4&orderby=date&order=desc`,
      {
        next: { revalidate: 180 },
      }
    );
    const bannerData = await bannerResponse.json();
    return bannerData;
  } catch (error) {
    console.log(error);
  }
}

const HeroBanner = async () => {
  const bannerData = await getData();
  return (
    <div className={styles.heroCardWrap}>
      <div className={styles.container}>
        <div className={styles.heroCardBody}>
          <div className={styles.heroCardBox}>
            {bannerData && bannerData.length > 0 ? (
              bannerData.map((card, index) => (
                <Link
                  key={index}
                  prefetch={true}
                  href={`/${card._embedded["wp:term"][0][0].slug}/${card.slug}`}
                >
                  <div
                    className={styles.heroCardBoxItem}
                    style={{
                      background: `url(${card.jetpack_featured_media_url})`,
                    }}
                  >
                    <div className={styles.heroCardBoxItemInfo}>
                      <h6 className={styles.heroCardBoxItemBags}>
                        {card._embedded["wp:term"][0][0].name}
                      </h6>
                      <h4
                        className={styles.heroCardBoxItemName}
                        dangerouslySetInnerHTML={{
                          __html: card.title.rendered,
                        }}
                      ></h4>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No data found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
