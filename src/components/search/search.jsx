"use client"
import Link from "next/link";
import React from "react";
import styles from "@/components/navbar/navbar.module.css";
import Form from "react-bootstrap/Form";
import { useState,useEffect } from "react";
const search =  () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.extraHeaderWrap}>
      <div className={styles.searchHeaderWrap}>
        <div className={styles.searchInput}>
          <Form.Control
            type="text"
            placeholder=""
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="search"
          />
          <Link
            className={styles.searchLink}
            href={
              searchQuery && searchQuery !== ""
                ? "/search/" + searchQuery
                : ""
            }
            aria-label="search"
          >
            <span className={styles.searchIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default search;
