import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";

async function getData() {
  const res = await fetch("https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/categories", {
    // cache: "no-store",
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

  // Separate parents and children
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

  // Assign children to their respective parents
  organizedList.forEach(parent => {
    const children = parentMap[parent.id] || [];
    parent.children = children;
  });

  return organizedList;
}

const Navbar =  async () => {
  const data = await getData();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        lamamia
      </Link>
      <div className={styles.links}>
        {data.map((link) => (
          <div>
            <Link key={link.id} href={`/${link.slug}`} className={styles.link} prefetch={true}>
            {link.name}
          </Link>    
          {link.children.map((link)=> (
          <div>
            <Link key={link.id} href={`/${link.slug}`} className={styles.link} prefetch={true}>
            {link.name}
          </Link>    
          </div>
        ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;