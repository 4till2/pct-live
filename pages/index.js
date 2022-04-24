import {albumsByTitles} from "../lib/google_photos";
import Photo from "../components/photos/Photo";
import LogCard from "../components/logs/logCard";
import WordCard from "../components/words/wordCard";
import Newsletter from "../components/Newsletter";
import Link from 'next/link'
import Api from "./api/content";
import BlipCard from "../components/blips/blipCard";
import {site_config} from "../config";

export default function Home({latest}) {
    return (
        <>
            <article className="w-full px-10 mb-20 overflow-y-auto max-w-[620px] mx-auto">
                <h2 className="mt-12 mb-6 text-8xl font-black ">
                    <span className="text-gray-400">Y*sef</span>
                </h2>
                <div className="data-content text-lg">

                    <p>Real time{' '}
                        <Link href={"/map"}>
                            <a className="text-gray-500 font-medium hover:text-gray-600">waypoints</a>
                        </Link>,{' '}
                        <Link href={"/albums"}>
                            <a className="text-gray-500 font-medium hover:text-gray-600">photos</a>
                        </Link>,{' '}
                        <Link href={"/words"}>
                            <a className="text-gray-500 font-medium hover:text-gray-600">notes</a>
                        </Link>, {' '}
                        <Link href={"/blips"}>
                            <a className="text-gray-500 font-medium hover:text-gray-600">thoughts</a>
                        </Link>, and {' '}
                        <Link href={'/logs'}>
                            <a className="text-gray-500 font-medium hover:text-gray-600">logs</a>
                        </Link> from my 2022{' '}
                        <a target="_blank" href="https://en.wikipedia.org/wiki/Pacific_Crest_Trail"
                           className="text-gray-500 font-medium hover:text-gray-600">Pacific Crest Trail</a>{' '}
                        thru hike.
                    </p>
                </div>

                <h2 className="text-xl tracking-wide font-light text-gray-500 text-center">Most Recent</h2>
                <div className="flex w-full flex-row flex-wrap ">
                    <div className="w-full p-2 break-words">
                        {latest.log && <LogCard data={latest.log}/>}
                    </div>
                    <div className="w-1/2 md:w-1/3  p-2 break-words">
                        {latest.blip && <BlipCard data={latest.blip}/>}
                    </div>
                    <div className="w-1/2 md:w-1/3  p-2 break-words">
                        {latest.word && <WordCard data={latest.word}/>}
                    </div>
                    <div className="w-1/2 md:w-1/3  p-2 break-words">
                        {latest.photo &&
                        <div className=" items-center rounded overflow-hidden"><Photo
                            src={latest.photo.baseUrl}
                            width={latest.photo.mediaMetadata.width}
                            height={latest.photo.mediaMetadata.height}
                            description={latest.photo.description}
                        /></div>
                        }
                    </div>
                    <Link href={"/timeline"}>
                        <a className="text-gray-500 w-full font-medium hover:text-gray-600 text-center font-bold">See
                            All</a>
                    </Link>
                </div>
                <div className="mt-8 mb-8 text-gray-500 text-center">
                    ________________________________
                </div>
                <div className="mb-4 mt-10 data-content">
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
    const wordsApi = new Api("words")
    const logsApi = new Api("logs")
    const blipsApi = new Api("blips")

    let photo = await albumsByTitles(site_config.timeline_albums).then(res => res ? res[res.length - 1] : null) || null
    let word = wordsApi.getAllData([
        "title",
        "date",
        "slug",
        "author",
        "excerpt",
        "external",
    ])[0] || null
    let blip = blipsApi.getAllData([
        "title",
        "date",
        "slug",
        "author",
        "image",
        "excerpt",
        "content"
    ])[0] || null
    let log = logsApi.getAllData([
        "title",
        "date",
        "slug",
        "author",
        "image",
        "excerpt",
        "content"
    ])[0] || null
    const latest = {photo: photo, blip: blip, word: word, log: log}
    return {
        props: {latest},
    };
}
