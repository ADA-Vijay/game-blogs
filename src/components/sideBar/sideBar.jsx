"use client";
import React from "react";
import styles from "./sideBar.module.css";
import { useState } from "react";
import Link from "next/link";
function sideBar({ data }) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleToggle = () => {
        document.getElementById("sidebar").classList.toggle(styles.open);
    };

    return (
        <div>
            <div className={styles.hamBurgerButton}>
                <div onClick={handleToggle} className={styles.siderBarIcon}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div id="sidebar"
                    className={`${styles.sidebar}`}
                >
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
                                        <div onClick={toggleAccordion} className={styles.acordianDiv}>
                                            <Link href={`/${e.slug}`}>{e.name}</Link>
                                            <div className={`${styles.acordianIcon} ${isOpen ? styles.rotate : styles.rotateNormal}`}>
                                                <i className="fa-solid plus fa-plus"></i>
                                            </div>
                                        </div>
                                        <div className={`${styles.liData} ${isOpen ? styles.open : ''}`}>
                                            <ul>
                                                {
                                                    e.children && e.children.length > 0 && e.children.map((e) => (
                                                        <li key={e.id}>
                                                            <Link onClick={handleToggle} href={`/${e.slug}`} prefetch={true} key={e.id}>
                                                                {e.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
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
