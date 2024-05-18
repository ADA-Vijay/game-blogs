"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";

const Listing = ({ newdata, apiUrl }) => {
  const [data, setData] = useState(newdata);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [hitApi, setHitApi] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    setData(newdata);
    setPage(1);
    setLoading(false);
    setHasMoreData(true);
  }, [newdata]);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        hasMoreData
      ) {
        await loadMoreData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMoreData]);

  const loadMoreData = async () => {
    if (loading || !hasMoreData) return;
    setLoading(true);
    try {
      if (hitApi && apiUrl) {
        const url = `${apiUrl}&per_page=10&page=${page + 1}&_embed`;
        const response = await fetch(url);
        if (!response.ok) {
          setHitApi(false);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const newData = await response.json();
        if (newData.length > 0) {
          setData((prevData) => [...prevData, ...newData]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMoreData(false);
        }
      }
    } catch (error) {
      setHitApi(false);
      console.error("Error while fetching more data", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoDate) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", options);
  };

  const handleImageError = (e, index, card) => {
    console.log("Error while loading image");
    if (!imageErrors[index]) {
      setImageErrors((prevErrors) => ({ ...prevErrors, [index]: true }));
      console.error(`Error loading image for card with title "${card.title.rendered}" at URL: ${e.target.src}`);
      e.target.src = "/path/to/placeholder/image.jpg"; // Replace with your placeholder image URL
    }
  };

  return (
    <div className={styles.latestWrap}>
      <div className={styles.container}>
        <div className={styles.latestBody}>
          <div className={styles.latestContent}>
            <div className={styles.titleName}></div>
            <div className={styles.latestBox}>
              {data && data.length > 0 ? (
                data.map((card, index) => (
                  <div className={styles.latestBoxItem} key={index}>
                    <img
                      className={styles.latestImg}
                      src={card._embedded["wp:featuredmedia"][0].source_url}
                      alt={card.jetpack_featured_media_url}
                      onError={(e) => handleImageError(e, index, card)}
                    />
                    <div className={styles.latestInfo}>
                      <Link href={`/${card._embedded["wp:term"][0][0].slug}`}>
                        <h6>{card._embedded["wp:term"][0][0].name}</h6>
                      </Link>
                      <Link
                        href={`/${card._embedded["wp:term"][0][0].slug}/${card.slug}`}
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: card.title.rendered,
                          }}
                        ></p>
                      </Link>
                      <h5 className="description">
                        <span>{formatDate(card.date)}</span> | {card._embedded.author[0].name}
                      </h5>
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
