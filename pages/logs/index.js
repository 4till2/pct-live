import {NextSeo} from "next-seo";
// import {api} from "pages/api/logs";
import LogList from "../../components/logs/logList";
import Api from "../api/content";
import Seo from "../../components/Seo";

const api = new Api("logs")

export default function Logs({allPosts}) {
    return (
        <>
            <Seo title="Logs – 4till2"
                 description="Logs from my journey along the Pacific Crest Trail."/>

            <LogList allPosts={allPosts}/>
        </>
    );
}

export async function getStaticProps() {

    const allPosts = api.getAllPosts([
        "title",
        "date",
        "slug",
        "author",
        "image",
        "excerpt",
        "content",
        "icon",
    ]);

    return {
        props: {allPosts},
    };
}
