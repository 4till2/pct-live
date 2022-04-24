import Api from "../api/content";
import AlbumList from "../../components/photos/albumList";
import Seo from "../../components/Seo";

const api = new Api("albums")

export default function Albums({allData}) {
    return (
        <>
            <Seo title="Photos - 4till2"
                 description="Photo albums from the journey."/>

            <AlbumList data={allData}/>
        </>
    );
}

export async function getStaticProps() {
    const allData = api.getAllData();

    return {
        props: {allData},
    };
}
