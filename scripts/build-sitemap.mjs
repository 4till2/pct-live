import {writeFileSync} from "fs";
import prettier from "prettier";
import Api from "../pages/api/content.mjs";

const getBlogPostsData = async () => {
    const wordsApi = new Api("words")
    const logsApi = new Api("logs")
    const albumsApi = new Api("albums")
    let data = [...wordsApi.getAllData(), ...logsApi.getAllData(), ...albumsApi.getAllData()]

    return data
}

async function generateSiteMap() {
    const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");

    const posts = await getBlogPostsData();
    const siteURL = 'https://4till2.com';

    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${siteURL}</loc>
        </url>
        ${posts
        .map((post) => {
            const url = `${siteURL}/${post.path}/${post.slug}`;
            return `
              <url>
                  <loc>${`${url}`}</loc>
              </url>
            `;
        })
        .join("")}
    </urlset>
    `;

    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: "html",
    });

    // eslint-disable-next-line no-sync
    writeFileSync("public/sitemap.xml", formatted);
}

export {generateSiteMap}
