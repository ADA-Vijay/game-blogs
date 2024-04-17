const itemsPerPage = 100
export async function GET(req) {
  const url = await getSitemap();
  // const newsSiteMap = await getNewsSitemap()
  return new Response(`<sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
  <loc>https://www.gamewitted.com/category-sitemap.xml</loc>
  </sitemap>
  ${url || ""}
  <sitemap>
  <loc>https://www.gamewitted.com/news-sitemap.xml</loc>
  </sitemap>
  </sitemapindex>`, { headers: { "Content-Type": "text/xml" } })
}


export async function getSitemap() {
  try {
    const response = await fetch("https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?&_embed&per_page=1&page=1", {
      next: { revalidate: 10 }
    }
    );
    if (!response.ok) {
      return ``;
    }
    const postCount = response.headers.get("x-wp-total") ?? 0
    const pageCount = Math.ceil(postCount / itemsPerPage);
    const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);
    return pageNumbers.map((item, index) => {
      return `
    <sitemap>
      <loc>https://www.gamewitted.com/post-sitemap.xml?page=${index + 1}</loc>
    </sitemap>
    `;
    }).join('');
  } catch (error) {
    console.error("Error generating sitemap:", error.message);
    return ``;
  }
}


// export async function getNewsSitemap() {
//   try {
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
//     const formattedYesterday = yesterday.toISOString().split('T')[0] + 'T00:00:00'; 
//     const response = await fetch(`https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?_embed&per_page=1&page=1&after=${formattedYesterday}`, {
//       next: { revalidate: 10 }
//     }
//     );
//     if (!response.ok) {
//       return ``;
//     }
//     const postCount = response.headers.get("x-wp-total") ?? 0
//     const pageCount = Math.ceil(postCount / itemsPerPage);
//     const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);
//     return pageNumbers.map((item, index) => {
//       return `
//     <sitemap>
//       <loc>https://www.gamewitted.com/news-sitemap.xml</loc>
//     </sitemap>
//     `;
//     }).join('');
//   } catch (error) {
//     console.error("Error generating sitemap:", error.message);
//     return ``;
//   }
// }