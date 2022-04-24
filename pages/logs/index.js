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
    const allData = api.getAllData();

    return {
        props: {allData},
    };
}
