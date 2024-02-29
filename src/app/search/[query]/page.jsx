import React from "react";
import { notFound } from "next/navigation";
import ListingPage from "@/components/listing/listing";


async function getData(query) {
  const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";

  try {
    if (query) {
      const response = await fetch(`${ApiUrl}posts?search=${query}&per_page=10&_embed`);
      const initialData = await response.json();
      return initialData && initialData.length > 0 ? initialData : null;
    }
  } catch (err) {
  }
}

 
export async function generateMetadata({ params }) {

  const data = await getData(params.query)
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

const searchquery = async ({ params }) => {
  const data = await getData(params.query);
  if(!data){
    return notFound()
  }
  return (
    <>
    {data && data.length && (
      <ListingPage newdata={data} />
    ) 
    // : (
    //   <h2>No data found</h2>
    // )
    }
    {/* <><p>search</p></> */}
  </>
  );
};

export default searchquery;
