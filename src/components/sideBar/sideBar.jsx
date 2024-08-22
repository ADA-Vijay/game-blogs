"use client";
import React from "react";
import styles from "./sideBar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
function sideBar({ newdata }) {
  const [data, setData] = useState(newdata);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [hitApi, setHitApi] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setData(newdata);
    setPage(1);
    setLoading(false);
    setHasMoreData(true);
  }, [newdata]);

  useEffect(() => {
    const handleScroll = async () => {
      const sidebar = document.getElementById("sidebar");
      if (
        sidebar &&
        sidebar.scrollHeight - sidebar.scrollTop <=
          sidebar.clientHeight + 100 &&
        !loading &&
        hasMoreData
      ) {
        await loadMoreData();
      }
    };

    if (isOpen) {
      document
        .getElementById("sidebar")
        .addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isOpen) {
        document
          .getElementById("sidebar")
          .removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, hasMoreData, isOpen]);

  const loadMoreData = async () => {
    if (loading || !hasMoreData) return;
    setLoading(true);
    try {
      if (hitApi) {
        const url = `https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/categories?per_page=100&page=${
          page + 1
        }&_embed`;
        const response = await fetch(url);
        if (!response.ok) {
          setHitApi(false);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const newData = await response.json();
        if (newData.length > 0) {
          organizeCategories(newData);

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

  function organizeCategories(fetchedData) {
    const updatedData = [...data];
  
    fetchedData.forEach((item) => {
      const parentCategory = updatedData.find(
        (parent) => parent.id === item.parent
      );
  
      if (parentCategory) {
        const childExists = parentCategory.children.some(
          (child) => child.id === item.id
        );
          if (!childExists) {
          parentCategory.children = [
            ...parentCategory.children,
            {
              id: item.id,
              name: item.name,
              slug: item.slug,
            },
          ];
        }
      } else if (item.parent === newdata.id) {
        updatedData.push({
          id: item.id,
          name: item.name,
          slug: item.slug,
          children: [],
        });
      }
    });
  
    setData(updatedData);
  }
  

  const handleToggle = () => {
    document.getElementById("sidebar").classList.toggle(styles.open);
  };
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={styles.hamBurgerButton}>
        <div onClick={handleToggle} className={styles.siderBarIcon}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div id="sidebar" className={`${styles.sidebar}`}>
          <div className={styles.siderbarContainer}>
            <div onClick={handleToggle} className={styles.sideBarCloseIcon}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className={styles["content-container"]}>
            <ul className={styles["data-content-ul"]}>
              {data &&
                data.length > 0 &&
                data.map((e) => (
                  <li className={styles["data-content-li"]} key={e.id}>
                    <div
                      onClick={toggleAccordion}
                      className={styles.acordianDiv}
                    >
                      <Link href={`/${e.slug}`}>{e.name}</Link>
                      <div
                        className={`${styles.acordianIcon} ${
                          isOpen ? styles.rotate : styles.rotateNormal
                        }`}
                      >
                        <i className="fa-solid plus fa-plus"></i>
                      </div>
                    </div>
                    <div
                      className={`${styles.liData} ${
                        isOpen ? styles.open : ""
                      }`}
                    >
                      <ul>
                        {e.children &&
                          e.children.length > 0 &&
                          e.children.map((e) => (
                            <li key={e.id}>
                              <Link
                                onClick={handleToggle}
                                href={`/${e.slug}`}
                                prefetch={true}
                                key={e.id}
                              >
                                {e.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default sideBar;
