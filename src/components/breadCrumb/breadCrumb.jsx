"use client";
import React from "react";
import styles from "@/app/page.module.css";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import NotFound from "@/components/notFound/notFound";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
const breadCrumb = ({ category, subcategory }) => {
  const seperator = ">";
  return (
    <div className={styles.latestWrap}>
      <div className={styles.container}>
        <div className={styles.latestBody}>
          <div className={styles.latestContent}>
            <div className={styles.titleName}>{}</div>
            <div className={styles.latestBox}>
              <Breadcrumbs className={styles.breadCrumb}>
                <BreadcrumbItem>{category}</BreadcrumbItem>
                {seperator}
                {subcategory ? <BreadcrumbItem>{subcategory}</BreadcrumbItem> : ""}
              </Breadcrumbs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default breadCrumb;
