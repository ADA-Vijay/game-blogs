import React from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";
import style from "./relatedPosts.module.css";

const relatedPosts = ({ category,data }) => {
  const formatDate = (isoDate) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <>
      <div className={style["container"]}>
        <div className={style["container-wrap"]}>
          <div className={style.contentWrap}>
          <h1 className={style["relatedpost-title"]}>Related Post</h1>
          <div className={style["post-card-wrap"]}>
            {data &&
              data.length > 0 &&
              data.slice(0, 4).map((e,i) => (
                <Link href={`/${category}/${e.slug}`} key={i}>
                  <div className={style["post-card-item"]}>
                    <div className={style["post-img-div"]}>
                      <img src={e.jetpack_featured_media_url}></img>
                    </div>
                    <div>
                      {/* <p className={style["green-p"]}>MMA</p> */}
                      <p className={style["desc-p"]}>
                        {e.yoast_head_json.title}
                      </p>
                      <p className={style["name-p"]}>
                        {e.yoast_head_json.author}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default relatedPosts;
