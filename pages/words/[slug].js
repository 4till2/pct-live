import {useRouter} from "next/router";
import md2html from "lib/md2html";
import {WordContent, WordList} from "components";
import Api from "../api/content";
import Seo from "../../components/Seo";

const api = new Api("words")

export default function Data({allData, data}) {
    const router = useRouter();
    if (!router.isFallback && !data?.slug) {
        return <div>Error</div>;
    }

    return (
        <div className="flex w-full">
            <Seo title={`${data.title} - 4till2`} description={data.excerpt || data.content.slice(0, 200) || ""}/>
            <WordList data={allData} activeSlug={data?.slug}/>
            <WordContent data={data}/>
        </div>
    );
}

export async function getStaticProps({params}) {
    const allData = api.getAllData([
        "title",
        "date",
        "slug",
        "author",
        "image",
        "excerpt",
        "content",
        "link",
    ]);

    const data = api.getDataBySlug(params.slug, [
        "title",
        "date",
        "slug",
        "image",
        "content",
        "excerpt",
        "link",
    ]);

    const content = await md2html(data.content || data.excerpt || "");

    return {
        props: {
            allData,
            data: {
                ...data,
                content,
            },
        },
    };
}

export async function getStaticPaths() {
    const allData = api.getAllData([
        "title",
        "date",
        "slug",
        "image",
        "excerpt",
        "content",
    ]);
    const data = api.getAllData(["slug"]);

    return {
        paths: data.map((data) => {
            return {
                params: {
                    allData,
                    slug: data.slug,
                },
            };
        }),
        fallback: false,
    };
}
