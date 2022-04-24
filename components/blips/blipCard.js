import moment from "moment";
import Link from "next/link";

export default function BlipCard({data}) {
    return (
        <Link href={`/blips/${data.slug}`} key={data.slug}>
            <a className="py-3 p-2 my-1 border-b border-gray-100 rounded-lg cursor-pointer grid items-center bg-gray-100 shadow hover:bg-gray-200/70 dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:border-gray-900">
                <article

                >
                    <h2
                        className={" whitespace-nowrap flex mb-2"}
                    >
                        <span className="text-gray-500">Blip &bull; {moment(data.date).format('h:mm A')}</span>
                    </h2>
                </article>
                <div
                    dangerouslySetInnerHTML={{__html: data?.content}}
                    className="inline-block text-left data-content line-clamp-8 overflow-hidden text-gray-700 dark:text-gray-300"
                />
            </a>
        </Link>

    );
}
