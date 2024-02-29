import React from "react";
import { notFound } from "next/navigation";
import ListingPage from "@/components/listing/listing";


async function getData(query) {
  const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";

  try {
    if (query) {
      const response = await fetch(`${ApiUrl}posts?search=${query}&per_page=10&_embed`);
      const initialData = await response.json();
      

      return initialData;
    }
  } catch (err) {
  }
}

 
export async function generateMetadata({ params }) {

  const post = await getData(params.query)
  return {
    // title: post[0].title.rendered,
    // description: post.desc,
  };
}

const searchquery = async ({ params }) => {
  const data = await getData(params.query);
  return (
    <>
    {data && data.length ? (
      <ListingPage newdata={data} />
    ) : (
      <h2>No data found</h2>
    )}
    {/* <><p>search</p></> */}
  </>
  );
};

export default searchquery;
