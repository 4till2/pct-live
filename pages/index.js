import {loadFromAlbum} from "../lib/google_photos";
import {getAllPosts as getAllWords} from "./api/words";
import {getAllPosts as getAllLogs} from "./api/logs";
import Photo from "../components/photos/Photo";
import LogCard from "../components/logs/logCard";
import WordCard from "../components/words/wordCard";
import Newsletter from "../components/Newsletter";

export default function Home({latest}) {
    return (
        <>
            <article className="w-full px-10 mb-20 overflow-y-auto max-w-[620px] mx-auto">
                <h2 className="mt-12 mb-6 text-8xl font-black ">
                    <span className="text-gray-400">Y*sef</span>
                </h2>
                <div className="post-content text-lg">

                    <p>Real time <a className="text-gray-500 font-medium hover:text-gray-600" href={"/map"}>waypoints</a>, <a
                        className="text-gray-500 font-medium hover:text-gray-600" href={"/timeline"}>photos</a>, <a
                        className="text-gray-500 font-medium hover:text-gray-600" href={"/words"}>notes</a>,
                        and <a className="text-gray-500 font-medium hover:text-gray-600" href={"/logs"}>logs</a> from my 2022 <a
                            href="https://en.wikipedia.org/wiki/Pacific_Crest_Trail"
                            className="text-gray-500 font-medium hover:text-gray-600">Pacific Crest Trail</a> thru
                        hike.
                    </p>
                </div>
                <div className="mt-8 mb-8 text-gray-500 text-center">
                    ________________________________
                </div>
                <h2 className="text-xl font-black text-gray-500">Latest</h2>
                <div className="grid lg:grid-cols-3 gap-2">
                    {latest.photo &&
                    <div className="max-w-[100px] lg:max-w-full items-center my-1 rounded overflow-hidden"><Photo
                        src={latest.photo.baseUrl}
                        width={latest.photo.mediaMetadata.width}
                        height={latest.photo.mediaMetadata.height}
                        description={latest.photo.description}
                    /></div>
                    }

                    <div className="">
                        {latest.log && <LogCard post={latest.log}/>}
                    </div>
                    <div className="">
                        {latest.word && <WordCard post={latest.word}/>}
                    </div>

                </div>

                <div className="mb-4 mt-10 post-content">
                    <Newsletter />
                </div>
            </article>
        </>
    );
}

export async function getServerSideProps() {
    let photo = await loadFromAlbum(process.env.GOOGLE_ALBUM_ID).then(res => res[0]) || {}
    let word = getAllWords([
        "title",
        "date",
        "slug",
        "author",
        "excerpt",
        "external",
    ])[0] || {}
    let log = getAllLogs([
        "title",
        "date",
        "slug",
        "author",
        "image",
        "excerpt",
        "content"
    ])[0] || {}
    const latest = {photo: photo, word: word, log: log}
    return {
        props: {latest},
    };
}
