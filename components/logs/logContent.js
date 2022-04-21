import moment from "moment";

export default function LogContent({post}) {
    return (
        <div
            className="inline-flex flex-col items-center justify-start w-full  px-10 pt-10 pb-32 overflow-y-auto">
            {post?.icon ? (
                <div className="w-12 h-12 mx-auto mb-5">
                    <img src={post?.icon}
                         className="mb-4 border border-gray-100 rounded-full shadow-lg dark:border-gray-600"/>
                </div>
            ) : (
                ""
            )}
            <h1 className="text-4xl mb-5 font-black md:text-4xl text-center max-w-[620px] mx-auto">
                {moment(post.date).format('MMMM Do YYYY, h:mm a')}
            </h1>
            {post?.metadata?.details ? (
                <div className="flex overflow-x-scroll flex flex-row snap-x w-full mb-5 space-x-4 text-md">
                    <div className="grid grid-flow-col grid-rows-1 gap-x-2">
                        {Object.entries(post?.metadata.details).map((met) => (
                            <div
                                key={met[0]}
                                className="grid font-mono p-2 bg-gray-200 rounded-lg dark:bg-gray-600"
                            >
                                <p className="text-lg font-semibold capitalize whitespace-nowrap">{met[0].replace('_', ' ')}</p>
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
                className="inline-block mx-auto post-content"
            />
        </div>
    );
}
