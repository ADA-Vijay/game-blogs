import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import stylePage from "../../app/page.module.css";
import SearchComponent from "@/components/search/search";
import SideBar from '@/components/sideBar/sideBar'
async function getData() {
  const res = await fetch(
    "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/categories?per_page=100",
    {
      next: { revalidate: 180 },
    }
  );

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
  data.forEach((item) => {
    if (item.parent === 0) {
      organizedList.push({
        id: item.id,
        name: item.name,
        slug: item.slug,
        children: [],
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

  organizedList.forEach((parent) => {
    const children = parentMap[parent.id] || [];
    parent.children = children;
  });

  return organizedList;
}

const Navbar = async () => {
  const data = await getData();

  return (
    <div className={styles.headerWrap}>
      <div className={stylePage.container}>
        <div className={styles.navBody}>
          <SideBar data={data}></SideBar>
          <Link href="/" className={styles.logoNone}>
            <img
              className={styles.DesktopLogo}
              src="https://fama.b-cdn.net/gw/gwlogo.png"
              alt="logo"
            />
            <img
              className={styles.mobLogo}
              src="/gwlogo (1).png"
              alt="logo"
              style={{width:"100%",}}
            />
          </Link>
          <div className={styles.navItems}>
            {/* <div className={styles.navLinks}>
              {data.map((link) => (
                <div className={styles.navItem}>
                  <Link
                    key={link.id}
                    href={`/${link.slug}`}
                    className={styles.link}
                    prefetch={true}
                  >
                    {link.name}
                  </Link>
                  <div className={styles.navItemList}>
                    {link.children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/${child.slug}`}
                        className={styles.link}
                        prefetch={true}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div> */}
            <Link href="/" className={styles.logo}>
              <img
                className={styles.DesktopLogo}
                src="https://fama.b-cdn.net/gw/gwlogo.png"
                alt="logo"
              />
              <img
                className={styles.mobLogo}
                src="https://fama.b-cdn.net/gw/Gamewitted.png"
                alt="logo"
              />
            </Link>
            <div className={styles.mobSearchWrap}>
              <div className={styles.mobSearchLink}>
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
              </div>
              <div className={styles.mobSearchContent}>
                <SearchComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
