import Api from "../api/content";
import AlbumList from "../../components/photos/albumList";
import Seo from "../../components/Seo";

const api = new Api("albums")

export default function Albums({allPosts}) {
    return (
        <>
            <Seo title="Photos - 4till2"
                 description="Photo albums from the journey."/>

            <AlbumList data={allPosts}/>
        </>
    );
}

export async function getStaticProps() {

    const allPosts = api.getAllPosts([
        "title",
        "slug"
    ]);
    console.log(allPosts)
    return {
        props: {allPosts},
    };
}
