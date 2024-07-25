'use client'
import React from 'react'
import styles from './sideBar.module.css'
import { useState } from 'react'

function sideBar() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleToggle = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div>
            <div className={styles.hamBurgerButton}>
                <div className={styles.siderBarIcon} onClick={handleToggle}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                {sidebarOpen && (<div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.siderbarContainer}>
                        <div onClick={handleToggle} className={styles.sideBarCloseIcon}>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                    <div className={styles["content-container"]}>
                        <ul>
                            <li>
                                
                            </li>
                        </ul>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default sideBar