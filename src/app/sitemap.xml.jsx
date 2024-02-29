//pages/sitemap.xml.js

function generateSiteMap(posts) {
    const baseUrl = 'https://game-blogs-ni7c.vercel.app'; // Replace with your actual website URL
    const paths = ['/']; // Include your homepage
  
    // Add dynamic routes
    posts.forEach((post) => {
      paths.push(`/${post.slug}`);
    });
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://jsonplaceholder.typicode.com</loc>
     </url>
     <url>
       <loc>https://jsonplaceholder.typicode.com/guide</loc>
     </url>
     ${paths
       .map(({ path }) => {
         return `
       <url>
           <loc>${`${baseUrl}${path}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

async function SiteMap() {
  console.log("sitemap");
  await getData();
}

async function getData() {
    const res = await fetch("https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/categories", {
    });
    
    const rawData = await res.json();
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(rawData);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;