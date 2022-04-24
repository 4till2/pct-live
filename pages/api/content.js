import fs from "fs";
import {join} from "path";
import matter from "gray-matter";

// Since the directories are loaded
// dynamically be sure to load them in vercel.json
// https://vercel.com/docs/runtimes#advanced-usage/technical-details/including-additional-files

function loadDirectory(dir) {
    return join(process.cwd(), `data/${dir}`)
}

export default class Api {
    constructor(directory) {
        this.directory = loadDirectory(directory);
    }

    getDataSlugs() {
        return fs.readdirSync(this.directory);
    }

    getDataBySlug(slug, fields = []) {
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

    getAllData(fields = []) {
        const slugs = this.getDataSlugs();
        const data = slugs
            ?.map((slug) => this.getDataBySlug(slug, fields))
            // sort data by date in descending order
            .sort((data1, data2) => (data1.date > data2.date ? -1 : 1));
        return data;
    }
}
