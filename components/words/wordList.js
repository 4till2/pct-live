import Link from "next/link";
import classnames from "classnames";
import { ExternalLinkIcon } from "lib/icons";
import dayjs from "dayjs";

export default function WordList({ data, activeSlug }) {
  return (
    <div
      className={classnames(
        "md:max-w-[360px] w-full h-screen overflow-auto border-r border-gray-100 px-4 pt-6 pb-20 flex-none  dark:border-gray-800 pb-40 md:pb-20",
        { "hidden lg:flex flex-col": activeSlug != undefined }
      )}
    >
      <div className="px-4 py-2 mb-2 font-black text-gray-500 border-b border-gray-100  dark:border-gray-800 text-xl">
        Words
        <p className="text-sm text-gray-400 font-light dark:text-gray-600">
          Meticulously crafted arrangements of um words.
        </p>
      </div>
      {data?.map((data) => {
        if (data.slug === "" || data.slug.includes("DS_Store")) return;
        return (
          <Link href={`/words/${data.slug}`} key={data.slug}>
            <a>
              <article
                className={classnames(
                  "px-4 py-3 my-1 border-b border-gray-100 rounded-lg cursor-pointer group  dark:hover:bg-black dark:border-gray-900",
                  { "bg-black": activeSlug == data.slug },
                  { "hover:bg-gray-100": activeSlug != data.slug }
                )}
              >
                <h2
                  className={classnames("font-semibold leading-snug mb-1", {
                    "text-white": activeSlug == data.slug,
                  })}
                >
                  {data?.link ? (
                    <span className="relative top-[1px] inline-block w-4 h-4 ml-auto mr-2 text-gray-400 dark:text-gray-600">
                      {ExternalLinkIcon}
                    </span>
                  ) : (
                    ""
                  )}
                  {data?.title}
                </h2>
                <p
                  className={classnames(
                    {
                      "text-gray-600 dark:text-gray-500":
                        activeSlug != data.slug,
                    },
                    {
                      "text-gray-400": activeSlug == data.slug,
                    }
                  )}
                >
                  {/* {data?.excerpt?.slice(0, 100)} */}
                  {dayjs(data?.date?.split(" ")[0]).format("MMMM D, YYYY")}
                </p>
              </article>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
