import fs from "fs";
import {join} from "path";
import matter from "gray-matter";

function getDirectory(dir) {
    return join(process.cwd(), `data/${dir}`)
}

export default class Api {
    constructor(directory) {
        this.directory = getDirectory(directory);
    }

    getPostSlugs() {
        return fs.readdirSync(this.directory);
    }

    getPostBySlug(slug, fields = []) {
        const realSlug = slug.replace(/\.md$/, "");
        const fullPath = join(this.directory, `${realSlug}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const {data, content} = matter(fileContents);
        const items = {};

        // Ensure only the minimal needed data is exposed
        fields.forEach((field) => {
            if (field === "slug") {
                items[field] = realSlug;
            }
            if (field === "content") {
                items[field] = content;
            }

            if (typeof data[field] !== "undefined") {
                items[field] = data[field];
            }
            items["metadata"] = {...data}
        });

        return items;
    }

    getAllPosts(fields = []) {
        const slugs = this.getPostSlugs();
        const posts = slugs
            ?.map((slug) => this.getPostBySlug(slug, fields))
            // sort posts by date in descending order
            .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
        return posts;
    }
}
