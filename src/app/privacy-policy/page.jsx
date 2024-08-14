import React from "react";
import styles from "@/app/privacy-policy/page.module.css";
const page = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Privacy and Policy </h1>
        <span>
          At GameWitted, we value the privacy of our readers and are committed
          to protecting your personal information. This privacy policy outlines
          how we collect, use, and safeguard the data you provide when visiting
          our website.
        </span>
        <div className={styles.rules}>
          <h3>1.Information We Collect</h3>
          <span className={styles.rulesList}>
            a. Usage Data: We may collect non-personal information about your
            browsing habits, including your IP address, browser type,
            referring/exit pages, and operating system.
          </span>

          <span className={styles.rulesList}>
            b. Cookies: We use cookies to enhance your browsing experience,
            analyze trends, and collect information about visitor behavior on
            our site.
          </span>
        </div>
        <div className={styles.rules}>
          <h3>2.How We Use Your Information </h3>
          <span className={styles.rulesList}>
            a.We may use your usage data to analyze trends, administer the site,
            and gather demographic information for aggregate use.
          </span>
          <span className={styles.rulesList}>
            b. We may use cookies to remember your preferences, tailor content
            to your interests, and improve the overall user experience.
          </span>
        </div>

        <div className={styles.rules}>
          <h3>3. Third-Party Services </h3>
          <span className={styles.rulesList}>
            a. We may use third-party services to collect and analyze website
            traffic data. These services may use cookies and collect IP
            addresses to provide their services.
          </span>
          <span className={styles.rulesList}>
            b. We may display advertisements from third-party ad networks, which
            may use cookies to serve ads based on your prior visits to our site
            and other websites.
          </span>
          <span className={styles.rulesList}>
            c. We are not responsible for the privacy practices or content of
            third-party services or advertisers.
          </span>
        </div>
        <div className={styles.rules}>
          <h3>4. Data Security </h3>
          <span className={styles.rulesList}>
            a. We implement reasonable security measures to protect your
            personal information from unauthorized access, alteration, or
            disclosure.
          </span>
          <span className={styles.rulesList}>
            b. However, no method of transmission over the internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </span>
        </div>
        <div className={styles.rules}>
          <h3>5.Changes to This Privacy Policy </h3>
          <span className={styles.rulesList}>
            a. We reserve the right to update or change this privacy policy at
            any time, and any changes will be posted on this page.
          </span>

          <span className={styles.rulesList}>
            b. We encourage you to review this policy periodically to stay
            informed about how we protect your information.
          </span>
        </div>
        <div className={styles.rules}>
          <h3>
            6. Contact Us If you have any questions or concerns about this
            privacy policy or our data practices, please contact us at
            officialgamewitted@gmail.com.
          </h3>
        </div>
        <span className={styles.rulesList}>
          <h4 className={styles.rulesList}>
            We encourage you to review this policy periodically to stay informed
            about how we protect your information.
          </h4>
        </span>
        <p>
          All or partial advertising on this Website or App is managed by
          Playwire LLC. If Playwire publisher advertising services are used,
          Playwire LLC may collect and use certain aggregated and anonymized
          data for advertising purposes. To learn more about the types of data
          collected, how data is used and your choices as a user, please visit{" "}
          <a href="https://www.playwire.com/privacy-policy">
            https://www.playwire.com/privacy-policy
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default page;
