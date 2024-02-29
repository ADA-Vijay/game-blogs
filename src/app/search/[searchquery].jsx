import React from "react";
import { notFound } from "next/navigation";
import ListingPage from "@/components/listing/listing";


async function getData(query) {
  console.log(query)
const ApiUrl = "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/";
try {
    if (query) {
      const response = await fetch(`${ApiUrl}posts?search=${query}&per_page=10&_embed`);
      const initialData = response.json();
      if (initialData.length > 0) {
        console.log("initial data" ,initialData)
        return initialData;
      }
    }
  } catch (err) {
    console.error('Something went wrong while fetching the data', err);
  }
}


export async function generateMetadata({ params }) {

  const post = await getData(params.id)
  return {
    title: post[0].title.rendered,
    // description: post.desc,
  };
}

const searchquery = async ({ params }) => {
    console.log("query",params.searchquery)
  const data = await getData(params.searchquery);
  console.log("data  " ,data)
  return (
    <>
    {/* {data && data.length ? (
      <ListingPage newdata={data} />
    ) : (
      <h2>No data found</h2>
    )} */}
    <><p>search</p></>
  </>
  );
};

export default searchquery;
