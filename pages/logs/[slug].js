import {useRouter} from "next/router";
import {LogContent, LogList} from "components";
import Api from "../api/content";
import md2html from "lib/md2html";
import Seo from "../../components/Seo";

const api = new Api("logs")

export default function Data({allData, data}) {
    const router = useRouter();

    if (!router.isFallback && !data?.slug) {
        return <div>Error</div>;
    }

    return (
        <div className="flex w-full">
            <Seo title={`${data.title} - 4till2`}
                 description={
                     data.content.slice(0, 200)?.replace(/<[^>]*>?/gm, "") || ""
                 }/>
            <LogList allData={allData} activeSlug={data?.slug}/>
            <LogContent data={data}/>
        </div>
    );
}

export async function getStaticProps({params}) {
    const allData = api.getAllData();
    const data = api.getDataBySlug(params.slug);
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
    const data = api.getAllData(["slug"]);

    return {
        paths: data.map((data) => {
            return {
                params: {
                    slug: data.slug,
                },
            };
        }),
        fallback: false,
    };
}
