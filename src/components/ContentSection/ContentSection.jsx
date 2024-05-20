// components/ContentSection.js
"use client"
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.css";

const ContentSection = ({ content,hash }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px 100px 100px 100px" } 
    );

    observer.observe(document.getElementById("lazy-section"));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (hash) {
      const sectionElement = document.getElementById(hash);
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect();
        const hashOffset = rect.top;
        window.scrollTo({
          top: window.scrollY + hashOffset,
          behavior: "smooth",
        });
      }
    }
  }, [hash]);


  return (
    <div
      id="lazy-section"
      className={`${styles.subListingDetailsItem} ${
        isVisible ? styles.fadeIn : styles.hidden
      }`}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default ContentSection;

