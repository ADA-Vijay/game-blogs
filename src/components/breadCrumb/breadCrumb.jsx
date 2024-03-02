"use client";
import React from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";
const breadCrumb = ({ category, subcategory }) => {
  return (
    <div className={styles.latestWrap}>
      <div className={styles.container}>
        <div className={styles.latestBody}>
          <div className={styles.latestContent}>
            <div className={styles.latestBox}>
              <div className={styles.breadCrumb}>
                <Link href={`/${category}`}>{category}</Link>
                {subcategory ? 
                <h4> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 12 18" className="text-neutral-grey-70"><path d="m.999 15.613 1.768 1.768 8.383-8.384L2.767.613.999 2.381l6.616 6.616-6.616 6.616Z"></path></svg>
                    <span>{subcategory}</span>
                </h4> : 
                ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default breadCrumb;
