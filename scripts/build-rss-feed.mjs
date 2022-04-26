import Api from "../pages/api/content.mjs";
import {Feed} from "feed";
import * as fs from "fs";
import md2html from "../lib/md2html.mjs";

const getData = async () => {
    const wordsApi = new Api("words")
    const logsApi = new Api("logs")
    let data = [...wordsApi.getAllData(), ...logsApi.getAllData()]

    return data
}

const generateRssFeed = async () => {
    const posts = await getData();
    const siteURL = 'https://4till2.com';
    const date = new Date();
    const author = {
        name: "4till2",
        email: "yo@4till2.com",
        link: "https://twitter.com/4till2",
    };

    const feed = new Feed({
        title: "4till2 site",
        description: "",
        id: siteURL,
        link: siteURL,
        image: `${siteURL}/logo.svg`,
        favicon: `${siteURL}/favicon.png`,
        copyright: `All rights reserved ${date.getFullYear()}, 4till2`,
        updated: date,
        generator: "Feed for Node.js",
        feedLinks: {
            rss: `${siteURL}/rss/feed.xml`,
            json: `${siteURL}/rss/feed.json`,
            atom: `${siteURL}/rss/atom.xml`,
        },
        author,
    });

    for (const post of posts) {
        const url = `${siteURL}/${post.path}/${post.slug}`;
        feed.addItem({
            title: post.title || post.slug,
            id: url,
            link: url,
            description: post?.description || post?.excerpt,
            excerpt: post?.excerpt,
            content: await md2html(post.content || post.excerpt || ""),
            author: [author],
            contributor: [author],
            date: new Date(post.date),
        });
    }
    fs.mkdirSync("./public/rss", {recursive: true});
    fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
    fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
    fs.writeFileSync("./public/rss/feed.json", feed.json1());
};

export {generateRssFeed}
