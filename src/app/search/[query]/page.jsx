import React from "react";
import { notFound } from "next/navigation";
import ListingPage from "@/components/listing/listing";

async function getData(query) {
  const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";

  try {
    const url = `${ApiUrl}posts?search=${query}`
    if (query) {
      const response = await fetch(
        `${url}&per_page=10&_embed`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
        {
          next: {revalidate:180},
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const initialData = await response.json();
      return {
        data: initialData && initialData.length > 0 ? initialData : null,
        url: url
      };     }
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}

export async function generateMetadata({ params }) {
  const {data,url} = await getData(params.query);
  if (data && data.length > 0) {
    return {
      title: "GameWitted",
      description: "Welcome to Gamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
      images: [
        {
          url: "https://fama.b-cdn.net/gw/gamewittedlogo.jpg",
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
  const {data,url} = await getData(params.query);
  if (!data) {
    return notFound();
  }
  return <>{data && data.length && <ListingPage newdata={data} apiUrl={url}/>}</>;
};

export default searchquery;
