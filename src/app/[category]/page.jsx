import React from "react";
import styles from "@/app/page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import HeroBanner from "@/components/heroBanner/heroBanner";
import { Container } from "react-bootstrap";
// import { NextSeo } from "next-seo";
import ListingPage from "@/components/listing/listing"
async function getData(category) {
    const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";
    const categoryResponse = await fetch(
        `${ApiUrl}categories?slug=${category}`
      );

      const catgoryData = await categoryResponse.json();
      console.log("categories",catgoryData)
      const categoryId = catgoryData[0].id;
  
  
       let initialData = [];
       if (categoryId) {
         const response = await fetch(
           `${ApiUrl}posts?categories=${categoryId}&per_page=10&_embed`
         );
         const responseData = response.json()
         initialData = responseData || [];
       }
       return initialData
  
  }

const Page = async({ params }) => {

    const category = params.category
    const data = await  getData(category)

  return (
    <div>
    {/* {initialData && initialData.length > 0 ? (
      <NextSeo
        title={initialData[0]._embedded["wp:term"][0][0].name}
        description={initialData[0].yoast_head_json.og_description}
        openGraph={{
          title: initialData[0]._embedded["wp:term"][0][0].name,
          description: initialData[0].yoast_head_json.og_description,
          images: initialData[0].yoast_head_json.og_image,
        }}
      />
    ) : (
      <NextSeo
      title="AshGamewitted"
      description="Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms."
      openGraph= {{
        title:"AshGamewitted",
        description:"Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
        images :[
          {
            url:"",
            width: 1200,
            height: 630,
            alt: 'AshGamewitted',
          }
        ]
      }}
    />      )} */}
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
