import {loadFromAlbum} from "../lib/google_photos";
import {getAllPosts as getAllWords} from "./api/words";
import {getAllPosts as getAllLogs} from "./api/logs";
import Photo from "../components/photos/Photo";
import LogCard from "../components/logs/logCard";
import WordCard from "../components/words/wordCard";
import Newsletter from "../components/Newsletter";
import Link from 'next/link'

export default function Home({latest}) {
    return (
        <>
            <article className="w-full px-10 mb-20 overflow-y-auto max-w-[620px] mx-auto">
                <h2 className="mt-12 mb-6 text-8xl font-black ">
                    <span className="text-gray-400">Y*sef</span>
                </h2>
                <div className="post-content text-lg">

                    <p>Real time{' '}
                        <Link href={"/map"}>
                            <a className="text-gray-500 font-medium hover:text-gray-600">waypoints</a>
                        </Link>,{' '}
                        <Link href={"/map"}>
                            <a
                                className="text-gray-500 font-medium hover:text-gray-600">photos</a>
                        </Link>,{' '}
                        <Link href={"/words"}>
                            <a
                                className="text-gray-500 font-medium hover:text-gray-600">notes</a>
                        </Link>, and {' '}
                        <Link href={'/logs'}>
                            <a className="text-gray-500 font-medium hover:text-gray-600">logs</a>
                        </Link> from my 2022{' '}
                        <Link href="https://en.wikipedia.org/wiki/Pacific_Crest_Trail">
                            <a className="text-gray-500 font-medium hover:text-gray-600">Pacific Crest Trail</a>
                        </Link> thru hike.
                    </p>
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
                <div className="mt-8 mb-8 text-gray-500 text-center">
                    ________________________________
                </div>
                <div className="mb-4 mt-10 post-content">
                    <Newsletter/>
                </div>
                <img src="https://c.tenor.com/rUHoKUXUX6oAAAAC/strut-dancing.gif"
                     className="rounded-lg mx-auto p-2 w-48  overflow-hidden"/>
                <div className="flex items-center">
                    <a href='https://yosefserkez.me'
                       className="flex mt-4 mx-auto mb-2 text-gray-400 text-xs font-medium">
                        *yosef serkez*</a>
                </div>
            </article>
        </>
    );
}

export async function getServerSideProps() {
    let photo = await loadFromAlbum(process.env.GOOGLE_ALBUM_ID).then(res => res ? res[res.length - 1] : {}) || {}
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
