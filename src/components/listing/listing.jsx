"use client";
import React from "react";
import styles from "@/app/page.module.css";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
const lisitng = ({ newdata, apiUrl }) => {
  const [data, setData] = useState(newdata);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [hitApi, setHitApi] = useState(true);
  useEffect(() => {
    setData(newdata);
    setPage(1);
    setLoading(false);
    setHasMoreData(true);
  }, [newdata]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading
      ) {
        if (hasMoreData) {
          loadMoreData();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, loading, hasMoreData]);

  const loadMoreData = async () => {
    if (loading || !hasMoreData) return;

    setLoading(true);

    try {
      if (hitApi) {
        const url = `${apiUrl}&per_page=10&page=${page + 1}&_embed`;
        console.log("url ", url);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newData = await response.json(); // Convert response to JSON
        console.log("new data", newData);

        if (newData.length > 0) {
          setData((prevData) => [...prevData, ...newData]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMoreData(false);
        }
      }else{
        
      }
    } catch (error) {
      setHitApi(false);
      console.error("Error while fetching more data", error);
    } finally {
      setHitApi(false);
      setLoading(false);
    }
  };

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
              {data && data.length > 0 ? (
                data.map((card, index) => (
                  <div className={styles.latestBoxItem} key={index}>
                    <img
                      className={styles.latestImg}
                      src={card.jetpack_featured_media_url}
                      alt="img"
                    />
                    <div className={styles.latestInfo} key={index}>
                      <Link
                        href={`/${card._embedded["wp:term"][0][0].slug}`}
                        prefetch={true}
                      >
                        <h6>{card._embedded["wp:term"][0][0].name}</h6>
                      </Link>
                      <Link
                        href={
                          "/" +
                          card._embedded["wp:term"][0][0].slug +
                          "/" +
                          card.slug
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

                      <h5 className="description">
                        <span>
                          {formatDate(card.date)}
                          {/* {formatTime(card.date)} */}
                        </span>{" "}
                        | {card._embedded.author[0].name}
                      </h5>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default lisitng;
