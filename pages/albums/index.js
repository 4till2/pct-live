import {NextSeo} from "next-seo";
// import {api} from "pages/api/logs";
import Api from "../api/content";
import AlbumList from "../../components/photos/albumList";

const api = new Api("albums")

export default function Albums({allPosts}) {
    return (
        <>
            <NextSeo
                title="Albums – 4till2"
                description="Albums – 4till2"
                openGraph={{
                    site_name: "Albums – 4till2",
                    title: "Albums – 4till2",
                    description:
                        "Albums – 4till2",
                }}
                twitter={{
                    handle: "@4till2",
                    site: "@4till2",
                    cardType: "summary_large_image",
                }}
            />

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
