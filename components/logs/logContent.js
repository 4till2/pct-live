import moment from "moment";
import MetaDetails from "./metaDetails";

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
            <MetaDetails metadata={post.metadata}/>
            <div
                dangerouslySetInnerHTML={{__html: post?.content}}
                className="inline-block mx-auto post-content mt-2"
            />
        </div>
    );
}
