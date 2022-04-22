import Link from "next/link";
import classnames from "classnames";
import {useRouter} from "next/router";
import moment from "moment";

export default function LogList({allPosts, activeSlug}) {
    const {
        query: {slug},
    } = useRouter();

    return (
        <div
            className={classnames(
                "md:max-w-[360px] w-full h-screen overflow-auto border-r border-gray-100 px-4 pt-6 pb-20 flex-none dark:border-gray-800",
                {"hidden lg:flex flex-col": slug != undefined}
            )}
        >
            <div className="px-4 py-2 mb-2 font-black text-gray-500 border-b border-gray-100  dark:border-gray-800 text-xl">
                Logs
                <p className="text-sm text-gray-400 font-light dark:text-gray-600">
                    Regular status updates and metadata.
                </p>
            </div>
            {allPosts?.map((post) => (
                <Link href={`/logs/${post.slug}`} key={post.slug}>
                    <a>
                        <article
                            className={classnames(
                                "px-4 py-3 my-1 border-b border-gray-100 rounded-lg cursor-pointer group flex items-center dark:hover:bg-black dark:border-gray-900",
                                {"bg-black": activeSlug == post.slug},
                                {"hover:bg-gray-100": activeSlug != post.slug}
                            )}
                        >
                            <h2
                                className={classnames("font-semibold", {
                                    "text-white": activeSlug == post.slug,
                                })}
                            >
                                {moment(post.date).format('MMMM Do YYYY, h:mm a')}
                            </h2>
                            {/* <div>
                <Octicon size="small" icon={getIconByName("mark-github")} />
              </div> */}
                        </article>
                    </a>
                </Link>
            ))}
        </div>
    );
}
