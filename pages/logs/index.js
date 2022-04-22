import {NextSeo} from "next-seo";
// import {api} from "pages/api/logs";
import LogList from "../../components/logs/logList";
import Api from "../api/content";

const api = new Api("logs")

export default function Logs({allPosts}) {
    return (
        <>
            <NextSeo
                title="Logs – 4till2"
                description="Logs – 4till2"
                openGraph={{
                    site_name: "Logs – 4till2",
                    title: "Logs – 4till2",
                    description:
                        "Logs – 4till2",
                }}
                twitter={{
                    handle: "@4till2",
                    site: "@4till2",
                    cardType: "summary_large_image",
                }}
            />

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
