"use client";
import React from "react";
import styles from "./sideBar.module.css";
import { useState } from "react";
import Link from "next/link";
function sideBar({ data }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };
    console.log(data)

    return (
        <div>
            <div className={styles.hamBurgerButton}>
                <div className={styles.siderBarIcon} onClick={handleToggle}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                {sidebarOpen && (
                    <div
                        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""
                            }`}
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
                                                <Link href={e.slug}>{e.name}</Link>
                                                <div className={`${styles.acordianIcon} ${isOpen ? styles.rotate : styles.rotateNormal}`}>
                                                    <i class="fa-solid plus fa-plus"></i>
                                                </div>
                                            </div>
                                            <div className={`${styles.liData} ${isOpen ? styles.open : ''}`}>
                                                <ul>
                                                    {
                                                        e.children && e.children.length > 0 && e.children.map((e) => (
                                                            <li key={e.id}>
                                                                {e.name}
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
                )}
            </div>
        </div>
    );
}

export default sideBar;
