import React from "react";
import styles from "@/app/page.module.css";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const lisitng = ({ newdata }) => {

  const formatDate = (isoDate) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className={styles.latestWrap}>
      <div className={styles.container}>
        <div className={styles.latestBody}>
          <div className={styles.latestContent}>
            <div className={styles.titleName}>{}</div>
            <div className={styles.latestBox}>
              {newdata && newdata.length > 0 ? (
                newdata.map((card, index) => (
                  <div
                    className={styles.latestBoxItem}
                    key={index}
                  >
                    <img
                      className={styles.latestImg}
                      src={card.jetpack_featured_media_url}
                      alt="img"
                    />
                    <div className={styles.latestInfo} key={index}>
                      <Link href={`/${card._embedded["wp:term"][0][0].slug}`} prefetch={true}>
                        <h6>{card._embedded["wp:term"][0][0].name}</h6>
                      </Link>
                      <Link
                        href={
                          "/"+card._embedded["wp:term"][0][0].slug + "/" + card.slug
                        }
                        key={index}
                        prefetch={true}
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: card.title.rendered,
                          }}
                        ></p>
                      </Link>

                      <span>
                        {formatDate(card.date)}
                        {/* {formatTime(card.date)} */}
                      </span>
                      <h5 className="description">
                        Author : {card._embedded.author[0].name}
                      </h5>
                   
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p>No data found</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default lisitng;
