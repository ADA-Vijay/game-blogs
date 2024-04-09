const itemsPerPage = 100
export async function GET(req) {

  const page = new URL(req.url).searchParams.get("page")
  const url = (page == null) ? await getSitemap() : await getPost(page);
  return new Response(`<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
  ${url || ""}
  </urlset>`, { headers: { "Content-Type": "text/xml" } })
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

export async function getPost(page) {
  try {
    const response = await fetch(`https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?&_embed&per_page=${itemsPerPage}&page=${page}`, {
      next: { revalidate: 10 }
    }
    );
    if (!response.ok) {
      return [];
    }
    const posts = await response.json();
    const paths = [];
    posts.forEach((post) => {
      paths.push(`/${post._embedded["wp:term"][0][0].slug}/${post.slug}`);
    });
    return paths.map(item => {
      return `
    <url>
      <loc>https://www.gamewitted.com${item}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    `;
    }).join('');
  } catch (error) {
    return [];
  }
}
