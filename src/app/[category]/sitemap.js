export default async function sitemap() {
    try {
        const categories = await fetchAllCategories(
            "https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/categories",  
        );

        const paths = ['/'];

        categories.forEach((category) => {
            paths.push(`/${category.slug}`);
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

async function fetchAllCategories(url, categories = []) {
    try {
        const response = await fetch(url,{
            headers: {
                "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120"
            }             
        }
  
            );
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const newCategories = await response.json();
        if (newCategories.length === 0) {
            return categories;
        }
        
        categories = categories.concat(newCategories);

        const nextPageUrl = getNextPageUrl(response.headers.get('link'));
        
        if (nextPageUrl) {
            return fetchAllCategories(nextPageUrl, categories);
        } else {
            return categories;
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

function getNextPageUrl(linkHeader) {
    if (!linkHeader) {
        return null;
    }
    
    const links = linkHeader.split(',');
    for (const link of links) {
        const match = link.match(/<([^>]+)>;\s*rel="next"/);
        if (match) {
            return match[1];
        }
    }
    
    return null;
}
