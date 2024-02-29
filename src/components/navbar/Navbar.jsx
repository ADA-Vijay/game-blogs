
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

  return res.json();
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
          <Link key={link.id} href={`/${link.slug}`} className={styles.link} prefetch={true}>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
