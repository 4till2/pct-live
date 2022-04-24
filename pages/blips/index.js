import {BlipList} from "components";
import Api from "../api/content";
import Seo from "../../components/Seo";

const api = new Api("blips")

export default function Blips({allPosts}) {
    return (
        <>
            <Seo title="Words - 4till2"
                 description="Just some thoughts from along the way."/>
            <BlipList data={allPosts}/>
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
        "external",
        "content"
    ]);

    return {
        props: {allPosts},
    };
}
