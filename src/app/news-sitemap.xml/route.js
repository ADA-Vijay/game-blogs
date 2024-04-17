export const revalidate = 30;
const itemsPerPage = 100;
export async function GET() {
  const url = await getURL();
  return new Response(
    `<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd">
  ${url || ""}
  </urlset>`,
    { headers: { "Content-Type": "text/xml" } }
  );
}

export default async function getURL() {
  try {
    const paths = [];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedYesterday =
      yesterday.toISOString().split("T")[0] + "T00:00:00";
    const response = await fetch(
      `https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?_embed&orderby=date&per_page=${itemsPerPage}&order=desc&&after=${formattedYesterday}`,
      {
        next: { revalidate: 10 },
      }
    );
    const posts = await response.json();
    // posts.forEach((post) => {
    //   paths.push({
    //     title: post.yoast_head_json.title,
    //     slug: `/${post._embedded["wp:term"][0][0].slug}/${post.slug}`,
    //     image: post.yoast_head_json.og_image[0].url,
    //     description: post.yoast_head_json.description,
    //     date: post.yoast_head_json.article_published_time,
    //   });
    // });
    posts.forEach((post) => {
            // paths.push(`/${post.slug}`);

      // Get the date from post.yoast_head_json.article_published_time
      const articlePublishedTime = new Date(post.yoast_head_json.article_published_time);
      // Format the date in ISO string format
      const formattedDate = articlePublishedTime.toISOString();
      paths.push({
        title: post.yoast_head_json.title,
        slug: `/${post._embedded["wp:term"][0][0].slug}/${post.slug}`,
        image: post.yoast_head_json.og_image[0].url,
        description: post.yoast_head_json.description,
        date: formattedDate, // Use the formatted date
      });
    });

    return paths
      .map((item) => {
        return `<url>
<loc>https://www.gamewitted.com${item.slug}</loc>
<news:news>
<news:publication>
<news:name>Gamewitted</news:name>
<news:language>en</news:language>
</news:publication>
<news:publication_date>${item.date}</news:publication_date>
<news:title>
<![CDATA[${item.title} ]]>
</news:title>
</news:news>
<image:image>
<image:loc>${item.image}</image:loc>
<image:title>
<![CDATA[${item.title} ]]>
</image:title>
</image:image>
</url> `;
      })
      .join("");
  } catch (error) {
    console.error("Error generating sitemap:", error.message);
    return ``;
  }
}

export async function fetchAllPosts(url, posts = []) {
  try {
    const response = await fetch(url, {
      next: { revalidate: 10 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const newposts = await response.json();
    if (newposts.length === 0) {
      return posts;
    }

    posts = posts.concat(newposts);

    const nextPageUrl = getNextPageUrl(response.headers.get("link"));

    if (nextPageUrl) {
      return fetchAllPosts(nextPageUrl, posts);
    } else {
      return posts;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function getNextPageUrl(linkHeader) {
  if (!linkHeader) {
    return null;
  }

  const links = linkHeader.split(",");
  for (const link of links) {
    const match = link.match(/<([^>]+)>;\s*rel="next"/);
    if (match) {
      return match[1];
    }
  }

  return null;
}
