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
        this.path = directory
    }

    getDataSlugs() {
        return fs.readdirSync(this.directory);
    }

    getDataBySlug(slug, fields = []) {
        const realSlug = slug.replace(/\.md$/, "");
        const fullPath = join(this.directory, `${realSlug}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const {data, content} = matter(fileContents);
        if (!data.publish) return null

        let items = {};

        // If fields are specified only return those, otherwise return all fields.
        if (fields.length) {
            fields.forEach((field) => {
                if (field === "slug") {
                    items[field] = realSlug;
                }
                if (field === "content") {
                    items[field] = content;
                }
                if (field === "path") {
                    items[field] = this.path;
                }
                if (typeof data[field] !== "undefined") {
                    items[field] = data[field];
                }
            });
        } else {
            items = {'slug': realSlug, 'path': this.path, 'content': content, ...data}
        }

        return items;
    }

    getAllData(fields = []) {
        const slugs = this.getDataSlugs();
        const data = slugs
            ?.map((slug) => this.getDataBySlug(slug, fields)).filter(function (val) {
                return val !== null;
            })
            // sort data by date in descending order
            .sort((data1, data2) => (data1.date > data2.date ? -1 : 1));
        return data;
    }
}
