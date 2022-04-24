import {useRouter} from "next/router";
import Api from "../api/content";
import {albumByTitle} from "../../lib/google_photos";
import AlbumList from "../../components/photos/albumList";
import AlbumContent from "../../components/photos/albumContent";
import Seo from "../../components/Seo";

const api = new Api("albums")

export default function Post({allPosts, slug, post}) {
    const router = useRouter();

    if (!router.isFallback && !slug) {
        return <div>Error</div>;
    }

    return (
        <div className="flex w-full">
            <Seo title={`${post.title} - 4till2`}
                 description={
                     "A photo album by Yosef."
                 }/>
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
    // Get album title from data slug
    const album = allPosts.filter(a => a.slug == params.slug)[0]
    let photos = (await albumByTitle(album.title))?.reverse() || {}
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
