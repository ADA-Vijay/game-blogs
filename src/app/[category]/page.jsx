import React from "react";
import styles from "@/app/page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import HeroBanner from "@/components/heroBanner/heroBanner";
import { Container } from "react-bootstrap";
 import { NextSeo } from "next-seo";
import ListingPage from "@/components/listing/listing"
import { Elsie_Swash_Caps } from "next/font/google";
async function getData(category) {
    const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";
    const categoryResponse = await fetch(
        `${ApiUrl}categories?slug=${category}`
      );

      const catgoryData = await categoryResponse.json();
      if (!catgoryData || catgoryData.length === 0) {
        return null;
      }
      const categoryId = catgoryData[0].id;
       let initialData = [];
       if (categoryId) {
         const response = await fetch(
           `${ApiUrl}posts?categories=${categoryId}&per_page=10&_embed`
         );
         const initialData = await response.json()
         return initialData && initialData.length > 0 ? initialData : null;

       }
  
  }


  export async function generateMetadata({ params }) {

  const data = await getData(params.category)
  if(data && data.length > 0){
    return {
      title: data[0].yoast_head_json.title,
       description: data[0].yoast_head_json.description,
       images: [
         {
           url: data[0].yoast_head_json.og_image[0].url,
           height: 1200,
           width: 600,
           alt: "Alt",
         },
       ],
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

const Page = async({ params }) => {

    const category = params.category
    const data = await  getData(category)
 if(!data){
    return notFound()
  }
  return (
    <div>
     <div className={styles.latestWrap}>
      <Container>
          <HeroBanner></HeroBanner>
           </Container>
    </div> 
    <ListingPage newdata={data} />

  </div>
  );
}

export default Page;
