import moment from "moment";
import Link from "next/link";

export default function LogCard({post}) {
    return (
        <Link href={`/logs/${post.slug}`} key={post.slug}>
            <a className="py-3 p-2 m-2 border-b border-gray-100 rounded-lg cursor-pointer grid items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-900">
                <article

                >
                    <h2
                        className={" whitespace-nowrap flex mb-2"}
                    >
                        <span className="text-gray-500">Log entry &bull; {moment(post.date).format('h:mm A')}</span>
                    </h2>
                </article>

                {post?.metadata?.details ? (
                    <div className="flex overflow-x-scroll flex flex-row snap-x w-full space-x-4 text-md">
                        <div className="grid grid-flow-col grid-rows-1 gap-x-2">
                            {Object.entries(post?.metadata.details).map((met) => (
                                <div
                                    key={met[0]}
                                    className="grid font-mono p-1.5 rounded-md border border-gray-500  "
                                >
                                    <p className="capitalize whitespace-nowrap text-gray-500 text-sm">{met[0].replace('_', ' ')}</p>
                                    <p>{met[1]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <div
                    dangerouslySetInnerHTML={{__html: post?.content}}
                    className="inline-block post-content text-clip overflow-hidden"
                />
            </a>
        </Link>

    );
}
