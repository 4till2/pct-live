import {BlipList} from "components";
import {NextSeo} from "next-seo";
import Api from "../api/apiClass";

const api = new Api("data/blips")

export default function Blips({allPosts}) {
    return (
        <>
            <NextSeo
                title="Words - 4till2"
                description="Just some thoughts"
                openGraph={{
                    site_name: "Blips - 4till2",
                    title: "Blips - 4till2",
                    description:
                        "Just some thoughts.",
                }}
                twitter={{
                    handle: "@4till2",
                    site: "@4till2",
                    cardType: "summary_large_image",
                }}
            />

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
