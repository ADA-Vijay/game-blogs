/** @type {import('next-sitemap').IConfig} */
async function getData() {
    const res = await fetch("https://ashgamewitted.wpcomstaging.com/wp-json/wp/v2/categories", {
    });

    const rawData = await res.json();
    // We generate the XML sitemap with the posts data
    const paths = [];
    rawData.forEach((post) => {
        paths.push(`/${post.slug}`);
    });
    console.log(paths)
    return paths;
}

module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.gamewitted.com/',
    generateRobotsTxt: false,
    // additionalPaths: await getData()
    additionalPaths: ["/anime","/gaming","/fortnite-gaming","/genshin-impact","/guides","/helldivers-2","/news","/wwe-2k24"]

}