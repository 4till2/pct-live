import {useRouter} from "next/router";
import Api from "../api/content";
import {albumByTitle} from "../../lib/services/google_photos";
import AlbumList from "../../components/photos/albumList";
import AlbumContent from "../../components/photos/albumContent";
import Seo from "../../components/Seo";

const api = new Api("albums")

export default function Data({allData, slug, data}) {
    const router = useRouter();

    if (!router.isFallback && !slug) {
        return <div>Error</div>;
    }

    return (
        <div className="flex w-full">
            <Seo title={`${data.title} - 4till2`}
                 description={
                     "A photo album by Yosef."
                 }/>
            <AlbumList data={allData} activeSlug={slug}/>
            <AlbumContent data={data}/>
        </div>
    );
}

export async function getServerSideProps({params, query}) {
    const allData = api.getAllData();
    // Get album title from data slug
    const album = allData.filter(a => a.slug == params.slug)[0]
    let photos = (await albumByTitle(album.title)) || {}

    return {
        props: {
            allData,
            slug: params.slug,
            data: {
                title: album.title,
                photos: photos,
                count: photos?.length || null
            },
        },
    };
}
