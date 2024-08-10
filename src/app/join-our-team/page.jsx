import React from "react";
import styles from "@/app/privacy-policy/page.module.css";
const page = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>JOIN OUR TEAM </h1>
        <span>
          Are you passionate about gaming, esports, and anime? GameWitted.com is
          expanding our team of dedicated writers and content creators. We're
          looking for enthusiastic individuals who can bring fresh perspectives
          to our coverage of
        </span>
        <div className={styles.rules}>
          <h3>1.Breaking gaming news</h3>
        </div>
        <div className={styles.rules}>
          <h3>2.In-depth game guides </h3>
        </div>

        <div className={styles.rules}>
          <h3>3. Esports match analysis</h3>
        </div>
        <div className={styles.rules}>
          <h3>4. Anime chapter breakdowns</h3>
        </div>
        <div className={styles.rules}>
          <h3>5.Developer interviews</h3>
        </div>
        <span className={styles.rulesList}>
          <h4 className={styles.rulesList}>
            If you have experience in gaming journalism or a knack for creating
            engaging content, we want to hear from you! Join our dynamic team of
            industry veterans and help shape the future of gaming media.
          </h4>
        </span>
        <span className={`${styles.rulesList} ${styles.lastChild}`}>
          <h4 className={styles.rulesList}>
            Apply now and be part of the GameWitted family!
          </h4>
        </span>
      </div>
    </>
  );
};

export default page;
