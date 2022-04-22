import {useRouter} from "next/router";
import {NextSeo} from "next-seo";
import Api from "../api/content";
import {loadFromAlbumByTitle} from "../../lib/google_photos";
import AlbumList from "../../components/photos/albumList";
import AlbumContent from "../../components/photos/albumContent";

const api = new Api("albums")

export default function Post({allPosts, slug, post}) {
    const router = useRouter();

    if (!router.isFallback && !slug) {
        return <div>Error</div>;
    }

    return (
        <div className="flex w-full">
            <NextSeo
                title={`${post.title} - 4till2`}
                description={
                    "A photo album"
                }
                openGraph={{
                    site_name: `${post.title} - 4till2`,
                    title: `${post.title} - 4till2`,
                    description:
                        "A photo album"
                }}
                twitter={{
                    handle: "@4till2",
                    site: "@4till2",
                    cardType: "summary_large_image",
                }}
            />
            <AlbumList data={allPosts} activeSlug={slug}/>
            <AlbumContent post={post}/>
        </div>
    );
}

export async function getServerSideProps({params, query}) {
    const allPosts = api.getAllPosts([
        "title",
        "slug",
    ]);
    const album = allPosts.filter(a => a.slug == params.slug)[0]
    let photos = await loadFromAlbumByTitle(album.title)
    return {
        props: {
            allPosts,
            slug: params.slug,
            post: {
                title: album.title,
                photos: photos,
                count: photos?.length || null
            },
        },
    };
}
