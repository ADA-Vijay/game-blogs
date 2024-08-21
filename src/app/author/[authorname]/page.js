import React from "react";
import styles from "@/app/author/[authorname]/page.module.css";
import style from '@/app/page.module.css';
import Listing from "@/components/listing/listing";
async function getAllAuthors(authorName) {
  if (authorName) {
    const usersResponse = await fetch(
      "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/users"
    );
    const users = await usersResponse.json();
    const author = authorName.replace(/-/g, " ");
    const authorDetail = users.find(
      (user) => user.name.toLowerCase() == author.toLowerCase()
    );
    if (authorDetail.id) {
      const postsResponse = await fetch(
        `https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?author=${authorDetail.id}&_embed`
      );
      const posts = await postsResponse.json();
      if (posts && authorDetail) {
        return { posts, authorDetail };
      }
    }
    if (!author) {
      return {
        notFound: true,
      };
    }
  }
}
const page = async ({ params }) => {
  const authorName = params.authorname;
  const { posts, authorDetail } = await getAllAuthors(authorName);
  console.log(authorDetail);
  return (
    <div>
      <div className={style.container}>
      <div className={styles.authorDiv}>
        <div className={styles.authorSection}>
          <div className={styles.authorDivWrap}>
            <div className={styles.authorImageDiv}>
              <img src={authorDetail.avatar_urls["96"]} alt="" />
            </div>
            <div>
              <p className={styles.spanAuthor}>ABOUT THE AUTHOR</p>
              <h1>{authorDetail.name}</h1>
              {/* <div className={styles.authorSocialDiv}>
                <div className={styles.twitterIconDiv}>
                  <i class="fa-brands fa-square-x-twitter"></i>
                </div>
                <div className={styles.twitterIconDiv}>
                  <i class="fa-brands fa-linkedin"></i>
                </div>
              </div> */}
            </div>
          </div>
          <p className={styles.authorDesc}>
            {authorDetail.description}
          </p>
        </div>
      </div>
      </div>

      <Listing newdata={posts}></Listing>
    </div>
  );
};

export default page;
