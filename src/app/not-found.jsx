import React from "react";
import styles from "@/app/404.module.css";
const pagenotfound = ({message}) => {
    return (
        <>
            <div className={`${styles["edgt-content"]}`}>
                <div className={`${styles["edgt-content-inner"]}`}>
                    <div className={`${styles["edgt-container"]} ${styles["edgt-404-page"]}`}>
                        <div className={`${styles["edgt-page-not-found"]}`}>
                            <div className={`${styles["edgt-404-image"]}`}>
                                <img
                                    src="https://eldritch.qodeinteractive.com/wp-content/themes/eldritch/assets/img/404.png"
                                    alt="404"
                                />
                            </div>
                            <h1 className={`${styles["edgt-error-page-title"]}`}>{message} </h1>
                            <div className={`${styles["edgt-404-separator"]}`}>
                                <img
                                    src="https://eldritch.qodeinteractive.com/wp-content/themes/eldritch/assets/img/separator.png"
                                    alt="404 separator"
                                />
                            </div>
                            <h5 className={styles["edgt-error-page-subtitle"]}>
                                The page or content you are looking for no longer exists. Perhaps you can
                                return back to the site's homepage and see if you can find what
                                you are looking for.{" "}
                            </h5>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default pagenotfound;
