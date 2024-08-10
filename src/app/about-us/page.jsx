import React from "react";
import styles from "@/app/privacy-policy/page.module.css";
const page = () => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.description}>
          GameWitted.com is your destination for the latest gaming content,
          esports coverage, and in-depth anime analysis. Founded in 2024, we're
          an independent digital publisher committed to delivering high-quality,
          insightful content to our ever-growing community of passionate gamers
          and anime enthusiasts.
        </span>
        <h1>Our Story</h1>
        <ul>
          <li className={styles.story}>
            GameWitted was born out of a late-night gaming session that changed
            everything. Our founders – five friends who had worked for years at
            different gaming websites – were playing a new indie game that had
            flown under the radar. As we played, we realized this small game had
            more heart and creativity than many big-budget titles we'd covered.
          </li>
          <li className={styles.story}>
            But here was the problem: none of our old websites would let us
            write about it. "Not enough clicks," they said. "Stick to the big
            names."
          </li>
          <li className={styles.story}>
            That night, we made a decision. We'd start our own website – one
            where we could cover all games, big and small, with the depth and
            attention they deserve. We'd create in-depth guides for popular
            titles while also shining a light on hidden gems.
          </li>
          <li className={styles.story}>
            We named it GameWitted, combining our love for games with our goal
            to bring wit and wisdom to gaming journalism. Our mission became
            clear: to create a space where every game gets the spotlight it
            deserves, and where passionate gamers like us can find a home.
          </li>
          <li className={styles.story}>
            What sets us apart? We're not afraid to dive deep, to challenge
            industry norms, or to admit when we're wrong. Our articles aren't
            churned out to meet quotas; they're crafted with care, fueled by
            genuine curiosity and a desire to elevate gaming discourse. Whether
            we're breaking down the intricacies of a new MOBA strategy or
            exploring the cultural impact of a classic JRPG, we bring our full
            selves to every piece.
          </li>
          <li className={styles.story}>
            At GameWitted, we're not just observers – we're active participants
            in the gaming world. Our team includes former pro players, modders,
            speedrunners, and even a few game jam enthusiasts. This hands-on
            experience infuses our content with practical insights you won't
            find elsewhere.
          </li>
        </ul>
      </div>
    </>
  );
};

export default page;
