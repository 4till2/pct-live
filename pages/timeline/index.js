import {albumsByTitles} from "../../lib/services/google_photos";
import {groupByDate, groupPhotosByDate} from "../../lib/group_by_date";
import moment from "moment";
import LogCard from "../../components/logs/logCard";
import classnames from "classnames";
import PhotoGallery from "../../components/photos/gallery";
import WordsGallery from "../../components/words/gallery";
import Api from "../api/content";
import BlipsGallery from "../../components/blips/gallery";
import {site_config} from "../../config";
import Seo from "../../components/Seo";

export default function Timeline({timeline}) {
    return (
        <div
            className={classnames(
                "w-full overflow-auto  px-4 pt-6 pb-20 flex-none "
            )}
        >
            <Seo title="Timeline – 4till2"
                 description="A timeline of content during my journeys."/>

            <span
                className="text-6xl font-extrabold  flex border-b-2 border-gray-700 border-dashed mb-4 pb-2 text-gray-300 dark:text-gray-300">
                Timeline
            </span>
            {timeline.map(day => {
                return (
                    <div key={day.date}
                         className="my-2 py-2 border-b border-dashed border-gray-200 dark:border-gray-800">
                        <h1 className="text-3xl font-bold text-gray-400 dark:text-gray-600 mb-2">{moment(day.date).format('MMMM Do YYYY')}</h1>
                        <div className="w-full">
                            {
                                day?.logs?.map(src => {
                                    return <div key={src.slug} className="p-2"><LogCard data={src}/></div>
                                })
                            }
                        </div>
                        <div className="w-full">
                            {day.words && <WordsGallery words={day.words}/>}
                        </div>
                        <div className="w-full">
                            {day.blips && <BlipsGallery blips={day.blips}/>}
                        </div>
                        <div className="w-full">
                            {day.photos && <PhotoGallery photos={day.photos}/>}
                        </div>
                    </div>
                )
            })
            }

        </div>
    );
}

export async function getServerSideProps() {
    const wordsApi = new Api("words")
    const logsApi = new Api("logs")
    const blipsApi = new Api("blips")

    let albums = await albumsByTitles(site_config.timeline_albums).then(res => groupPhotosByDate(res)) || {}
    let blips = groupByDate(blipsApi.getAllData()) || {}
    let words = groupByDate(wordsApi.getAllData()) || {}
    let logs = groupByDate(logsApi.getAllData()) || {}
    let keys = [...Object.keys(albums), ...Object.keys(blips), ...Object?.keys(words), ...Object?.keys(logs)].filter((v, i, a) => a.indexOf(v) === i).sort().reverse()
    const timeline = keys.map(key => {
        return {
            date: key,
            blips: blips[key] || null,
            photos: albums[key] || null,
            words: words[key] || null,
            logs: logs[key] || null
        }
    })
    return {
        props: {timeline},
    };
}
