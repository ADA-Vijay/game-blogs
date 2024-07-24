import React from "react";
import styles from "@/app/page.module.css";
import { notFound } from "next/navigation";
import HeroBanner from "@/components/heroBanner/heroBanner";
import { Container } from "react-bootstrap";
import ListingPage from "@/components/listing/listing";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import Head from "next/head";
async function getData(category) {
  try {
    const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";

    const categoryResponse = await fetch(
      `${ApiUrl}categories?slug=${category}`
    );

    if (!categoryResponse.ok) {
      console.error("Failed to fetch category data:", categoryResponse.status);
      return {
        data:  null,
        url: "",
      };
    }

    const catgoryData = await categoryResponse.json();
    if (!catgoryData || catgoryData.length === 0) {
      console.warn("No category data found for slug:", category);
      return {
        data:  null,
        url: "",
      };
    }

    const categoryId = catgoryData[0].id;
    const url = `${ApiUrl}posts?categories=${categoryId}`;

    const response = await fetch(
      `${ApiUrl}posts?categories=${categoryId}&per_page=10&_embed`,
      {
        next: { revalidate: 180 },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch posts data:", response.status);
      return {
        data:  null,
        url: "",
      };
    }

    const initialData = await response.json();
    return {
      data: initialData.length > 0 ? initialData : null,
      url: url,
    };
  } catch (error) {
    console.error("Error while fetching the data:", error);
    return {
      data:  null,
      url: "",
    };
  }
}

export async function generateMetadata({ params }) {
  const category = params.category;
  if (category) {
    return {
      title: category,
      description:
        "Welcome to Gamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
      openGraph: {
        images: [
          {
            url: "https://fama.b-cdn.net/gw/gamewittedlogo.jpg",
            height: 1200,
            width: 600,
            alt: "Alt",
          },
        ],
        icons: {
          icon: ["/favicon/favicon.ico"],
          shortcut: ["/favicon/favicon.ico"],
        },
      },
      twitter: {
        card: "summary_large_image",
        title:  category,
        description: "Welcome to Gamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms",
        images: ["https://fama.b-cdn.net/gw/gamewittedlogo.jpg"],
      },
    };
  }
}

const Page = async ({ params }) => {
  const category = params.category;
  const response = await getData(category);
  if (!response) {
    console.error("No response received from getData");
    return notFound();
  }

  const { data, url } = response;

  if (!data) {
    console.warn("No data found for category:", category);
    return notFound();
  }

  return (
    <>
      <div className={styles.latestWrap}>
        <Container>{/* <HeroBanner></HeroBanner> */}</Container>
      </div>
      {/* <BreadCrumb category={category} subcategory={""}></BreadCrumb> */}
      <ListingPage newdata={data} apiUrl={url} />
    </>
  );
};

export default Page;
