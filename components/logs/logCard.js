import moment from "moment";
import Link from "next/link";
import MetaDetails from "./metaDetails";

export default function LogCard({post}) {
    return (
        <Link href={`/logs/${post.slug}`} key={post.slug}>
            <a className="py-3 p-2 m-2 border-b border-gray-100 rounded-lg cursor-pointer grid items-center bg-gray-100 shadow hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-900">
                <article

                >
                    <h2
                        className={" whitespace-nowrap flex mb-2"}
                    >
                        <span className="text-gray-500">Log entry &bull; {moment(post.date).format('h:mm A')}</span>
                    </h2>
                </article>
                <MetaDetails metadata={post.metadata}/>
                <div
                    dangerouslySetInnerHTML={{__html: post?.content}}
                    className="inline-block post-content text-clip overflow-hidden mt-2 line-clamp-3"
                />
            </a>
        </Link>

    );
}
