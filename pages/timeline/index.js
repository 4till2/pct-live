import {NextSeo} from "next-seo";
import {getAllPosts as getAllWords} from "pages/api/words";
import {getAllPosts as getAllLogs} from "pages/api/logs";
import {loadFromAlbum} from "../../lib/google_photos";
import {groupByDate, groupPhotosByDate} from "../../lib/group_by_date";
import moment from "moment";
import LogCard from "../../components/logs/logCard";
import classnames from "classnames";
import PhotoGallery from "../../components/photos/gallery";
import WordsGallery from "../../components/words/gallery";

export default function Timeline({timeline}) {
    return (
        <div
            className={classnames(
                "w-full overflow-auto  px-4 pt-6 pb-20 flex-none "
            )}
        >
            <div className="text-4xl font-extrabold mx-auto border-b-2 mb-1.5 text-gray-600 dark:text-gray-300">
                Timeline
            </div>
            <NextSeo
                title="Photos – 4till2"
                description="Photos – 4till2"
                openGraph={{
                    site_name: "Photos – 4till2",
                    title: "Photos – 4till2",
                    description:
                        "Photos – 4till2",
                }}
                twitter={{
                    handle: "@4till2",
                    site: "@4till2",
                    cardType: "summary_large_image",
                }}
            />
            {timeline.map(day => {
                return (
                    <div className="my-2 py-2 border-b border-gray-200 dark:border-gray-800">
                        <h1 className="text-3xl font-bold text-gray-400 dark:text-gray-600 mb-4">{moment(day.date).format('MMMM Do YYYY')}</h1>
                        <div className="w-full">
                            {
                                day?.logs?.map(src => {
                                    return <LogCard post={src}/>
                                })
                            }
                        </div>
                        <div className="w-full">
                            {day.words && <WordsGallery words={day.words}/>}

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
    let albums = await loadFromAlbum(process.env.GOOGLE_ALBUM_ID).then(res => groupPhotosByDate(res))
    let words = groupByDate(getAllWords([
        "title",
        "date",
        "slug",
        "author",
        "excerpt",
        "external",
    ]))
    let logs = groupByDate(getAllLogs([
        "title",
        "date",
        "slug",
        "author",
        "image",
        "excerpt",
        "content"
    ]))
    let keys = [...Object.keys(albums), ...Object.keys(words), ...Object.keys(logs)].sort().reverse()
    const timeline = keys.map(key => {
        return {date: key, photos: albums[key] || null, words: words[key] || null, logs: logs[key] || null}
    })
    return {
        props: {timeline},
    };
}
