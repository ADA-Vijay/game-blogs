import styles from "@/app/page.module.css";
import Link from "next/link";
// import axios from "axios";





async function getData() {
  const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";
  const bannerId = 606508198;

  const bannerResponse = await fetch(
    ApiUrl + `posts?tags=${bannerId}&_embed&per_page=4&orderby=date&order=desc`
  );
  const bannerData = await bannerResponse.json();

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  return bannerData;
}

const  HeroBanner = async()=> {
  const bannerData = await getData()
  return (
    <div className={styles.heroCardWrap}>
      <div className={styles.heroCardBody}>
        <div className={styles.heroCardBox}>
          {bannerData && bannerData.length > 0 ? (
            bannerData.map((card, index) => (
              <Link
                key={index}
                href={`/${card._embedded["wp:term"][0][0].slug}/${card.slug}`}
              >
                {/* style={`background: url(${card.jetpack_featured_media_url})`} */}
                <div className={styles.heroCardBoxItem} style={{ background: `url(${card.jetpack_featured_media_url})` }}>
                  {/* <img
                    src={card.jetpack_featured_media_url}
                    alt="hero images"
                    className={styles.heroCardBoxItemImg}
                  /> */}
                  <div className={styles.heroCardBoxItemInfo}>
                    <h6 className={styles.heroCardBoxItemBags}>
                      {card._embedded["wp:term"][0][0].name}
                    </h6>
                    <h4 className={styles.heroCardBoxItemName} dangerouslySetInnerHTML={{__html:card.title.rendered}}>
                    </h4>
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
  );
}

export default HeroBanner;

