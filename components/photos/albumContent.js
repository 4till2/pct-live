import Photo from "./Photo";

export default function AlbumContent({post}) {
    return (
        <div
            className="inline-flex flex-col items-center justify-start w-full  px-10 pt-10 pb-32 overflow-y-auto">
            <h1 className="text-4xl mb-5 font-black md:text-4xl text-center max-w-[620px] mx-auto">
                {post.title}
                <h3 className="text-gray-500 text-center text-sm font-light">{post.count} Photos</h3>

            </h1>

            <div className="inline-block mx-auto post-content mt-2 w-full">
                <div className="flex w-full flex-row flex-wrap">
                    {
                        post?.photos?.map(p => {
                            return (
                                <div key={p.baseUrl}
                                     className="w-1/2 md:w-1/3 lg:w-1/4  p-2 break-words text-gray-500 dark:text-gray-500">
                                    <Photo src={p.baseUrl}
                                           width={p.mediaMetadata.width}
                                           height={p.mediaMetadata.height}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
