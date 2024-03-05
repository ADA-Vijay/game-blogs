import React from "react";
import styles from "@/app/page.module.css";
import { notFound } from "next/navigation";
import HeroBanner from "@/components/heroBanner/heroBanner";
import { Container } from "react-bootstrap";
import ListingPage from "@/components/listing/listing";
import BreadCrumb from "@/components/breadCrumb/breadCrumb"
async function getData(category) {
  const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";
  const categoryResponse = await fetch(`${ApiUrl}categories?slug=${category}`);

  const catgoryData = await categoryResponse.json();
  if (!catgoryData || catgoryData.length === 0) {
    return null;
  }
  const categoryId = catgoryData[0].id;
  let initialData = [];
  const url = `${ApiUrl}posts?categories=${categoryId}`
  if (categoryId) {
    const response = await fetch(
      `${ApiUrl}posts?categories=${categoryId}&per_page=10&_embed`,
      {
        next: { revalidate: 30 },
      }
    );
    const initialData = await response.json();
    return {
      data: initialData && initialData.length > 0 ? initialData : null,
      url: url
    };  }
}

export async function generateMetadata({ params }) {
  const { data,url } = await getData(params.category);
  if (data && data.length > 0) {
    return {
      title: data[0].yoast_head_json.title,
      description: data[0].yoast_head_json.description,
      openGraph: {
        images: [
          {
            url: data[0].yoast_head_json.og_image[0].url,
            height: 1200,
            width: 600,
            alt: "Alt",
          },
        ],
      },
    };
  }
  // else{
  //   return {
  //     title: "GameWitted",
  //      description: "Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
  //      images: [
  //        {
  //          url: "https://fama.b-cdn.net/gw/gwlogo.png",
  //          height: 1200,
  //          width: 600,
  //          alt: "Alt",
  //        },
  //      ],
  //  };
  // }
}

const Page = async ({ params }) => {
  const category = params.category;
  const { data,url } = await getData(params.category);
  if (!data) {
    return notFound();
  }
  return (
    <div>
      <div className={styles.latestWrap}>
        <Container>
          {/* <HeroBanner></HeroBanner> */}
        </Container>
      </div>
      <BreadCrumb category={category} subcategory={""}></BreadCrumb>
      <ListingPage newdata={data} apiUrl={url}/>
    </div>
  );
};

export default Page;




