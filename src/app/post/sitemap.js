export default async function sitemap() {
    try {
    
        const paths = ['/'];
        const posts = await fetchAllPosts("https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/posts?&_embed"
           );
        

           posts.forEach((post) => {
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


export async function fetchAllPosts(url, posts = []) {
    try {
        const response = await fetch(url,
            {
                cache: 'no-store'
              }
            );
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const newposts = await response.json();
        if (newposts.length === 0) {
            return posts;
        }
        
        posts = posts.concat(newposts);

        const nextPageUrl = getNextPageUrl(response.headers.get('link'));
        
        if (nextPageUrl) {
            return fetchAllPosts(nextPageUrl, posts);
        } else {
            return posts;
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


