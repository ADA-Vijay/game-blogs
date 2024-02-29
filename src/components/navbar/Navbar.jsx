import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import stylePage from "../../app/page.module.css";
import SearchComponent from "@/components/search/search"
async function getData() {
  const res = await fetch("https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/categories", {
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  
  const rawData = await res.json();
  const organizedData = organizeCategories(rawData);
  
  return organizedData;
}
function organizeCategories(data) {
  const organizedList = [];
  const parentMap = {};

  data.forEach(item => {
    if (item.parent === 0) {
      organizedList.push({
        id: item.id,
        name: item.name,
        slug: item.slug,
        children: []
      });
    } else {
      if (!parentMap[item.parent]) {
        parentMap[item.parent] = [];
      }
      parentMap[item.parent].push({
        id: item.id,
        name: item.name,
        slug: item.slug,

      });
    }
  });

  organizedList.forEach(parent => {
    const children = parentMap[parent.id] || [];
    parent.children = children;
  });

  return organizedList;
}

const Navbar =  async () => {
  const data = await getData();

  return (
    <div className={styles.headerWrap}>
      <div className={stylePage.container}>
        <div className={styles.navBody}>
        <Link href="/" className={styles.logo}>
          <img src="https://fama.b-cdn.net/gw/gwlogo.png"/>
        </Link>
        <div className={styles.navItems}>
          <div className={styles.navLinks}>
            {data.map((link) => (
              <div className={styles.navItem}>
                <Link key={link.id} href={`/${link.slug}`} className={styles.link} prefetch={true}>
                  {link.name}
                </Link>
                <div className={styles.navItemList}>
                  {link.children.map((child)=> (
                    <Link key={child.id} href={`/${child.slug}`} className={styles.link} prefetch={true}>
                    {child.name}
                  </Link>
                  ))}
                </div>  
              </div>
            ))}
          </div>
          <SearchComponent />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;