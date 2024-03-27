export default async function sitemap() {
    try {
       

        const paths = ['/'];

       
        const posts = await fetch("https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?&_embed");
        if (!posts.ok) {
            throw new Error(`Failed to fetch data: ${posts.statusText}`);
        }
        const postsData = await posts.json();

        postsData.forEach((post) => {
            paths.push(`/${post._embedded["wp:term"][0][0].slug}/${post.slug}`);
        });

        return [
            ...paths.map((path) => ({
                url: `https://www.gamewitted.com${path}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1,
            })),
        ];
    } catch (error) {
        console.error("Error generating sitemap:", error.message);
        return [
            {
                url: `https://www.gamewitted.com`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1,
            }
        ];
    }
}




