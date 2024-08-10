import React from "react";
import styles from "@/app/privacy-policy/page.module.css";
const page = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>PartnerShip </h1>
        <span>
          GameWitted.com welcomes collaboration opportunities with brands and
          organizations that share our passion for gaming, esports, and anime.
          As an independent publisher, we're committed to maintaining the
          integrity of our content while offering valuable exposure to our
          engaged audience.
        </span>
        <div className={styles.rules}>
          <h3>Partnership Opportunities:</h3>
        </div>
        <div className={styles.rules}>
          <ul>
            <li> Strategic ad placements</li>
            <li> Sponsored content (aligned with our editorial standards)</li>
            <li> Joint promotional campaigns</li>
            <li>Product reviews and features</li>
          </ul>
        </div>
        <p>Our Commitment:</p>
        <ul>
        <li className={styles.list}>
          We carefully vet all partnerships to ensure they provide value to our
          readers. GameWitted maintains a strict ethical stance, avoiding
          partnerships related to gambling or any content that could be
          detrimental to our community.
        </li>
        <li className={styles.list}>
          Interested in partnering with GameWitted? Let's create something
          extraordinary together that resonates with our passionate gaming and
          anime community.
        </li>
        <li className={styles.list}>
          Contact us to discuss how we can collaborate to reach and engage our
          dedicated audience.
        </li>
        </ul>
        
      </div>
    </>
  );
};

export default page;
