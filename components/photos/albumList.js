import Link from "next/link";
import classnames from "classnames";

export default function AlbumList({data, activeSlug}) {
    console.log(data)
    return (
        <div
            className={classnames(
                " md:max-w-[360px] w-full h-screen overflow-auto border-r border-gray-100 px-4 pt-6 pb-20 flex-none dark:border-gray-800 pb-40 md:pb-20",
                {"hidden lg:flex flex-col": activeSlug != undefined}
            )}
        >
            <div
                className="px-4 py-2 mb-2 font-black text-gray-500 border-b border-gray-100  dark:border-gray-800 text-xl">
                Albums
                <p className="text-sm text-gray-400 font-light dark:text-gray-600">
                    Collections of photos from adventures past and present.
                </p>
            </div>
            {data?.map((post) => {
                if (post.slug === "" || post.slug.includes("DS_Store")) return;
                return (
                    <Link href={{
                        pathname: `/albums/${post.slug}`,
                    }}>
                        <a>
                            <article
                                className={classnames(
                                    "px-4 py-3 my-1 border-b border-gray-100 rounded-lg cursor-pointer group  dark:hover:bg-black dark:border-gray-900",
                                    {"bg-black": activeSlug == post.slug},
                                    {"hover:bg-gray-100": activeSlug != post.slug}
                                )}
                            >
                                <h2
                                    className={classnames("font-semibold leading-snug mb-1", {
                                        "text-white": activeSlug == post.slug,
                                    })}
                                >
                                    {post?.title}
                                </h2>
                                <p
                                    className={classnames(
                                        {
                                            "text-gray-600 dark:text-gray-500":
                                                activeSlug != post.slug,
                                        },
                                        {
                                            "text-gray-400": activeSlug == post.slug,
                                        }
                                    )}
                                >
                                </p>
                            </article>
                        </a>
                    </Link>
                );
            })}
        </div>
    );
}
