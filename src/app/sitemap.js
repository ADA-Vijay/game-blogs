export default async function sitemap() {
    try {
        const res = await fetch("https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/categories");

        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.statusText}`);
        }

        const rawData = await res.json();
        if (!Array.isArray(rawData)) {
            return [
                {
                    url: `https://www.gamewitted.com`,
                    lastModified: new Date(),
                    changeFrequency: 'daily',
                    priority: 1,
                }
            ];
        }

        const paths = ['/'];

        rawData.forEach((post) => {
            paths.push(`/${post.slug}`);
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
