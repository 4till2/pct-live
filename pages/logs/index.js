import {NextSeo} from "next-seo";
// import {api} from "pages/api/logs";
import LogList from "../../components/logs/logList";
import Api from "../api/content";
import Seo from "../../components/Seo";

const api = new Api("logs")

export default function Logs({allData}) {
    return (
        <>
            <Seo title="Logs – 4till2"
                 description="Logs from my journey along the Pacific Crest Trail."/>

            <LogList allData={allData}/>
        </>
    );
}

export async function getStaticProps() {

    const allData = api.getAllData([
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
        props: {allData},
    };
}
