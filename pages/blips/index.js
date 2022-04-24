import {BlipList} from "components";
import Api from "../api/content";
import Seo from "../../components/Seo";

const api = new Api("blips")

export default function Blips({allData}) {
    return (
        <>
            <Seo title="Words - 4till2"
                 description="Just some thoughts from along the way."/>
            <BlipList data={allData}/>
        </>
    );
}

export async function getStaticProps() {
    const allData = api.getAllData();

    return {
        props: {allData},
    };
}
