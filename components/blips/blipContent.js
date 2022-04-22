import moment from "moment";

export default function BlipContent({post}) {
    return (
        <div
            className="inline-flex flex-col items-center justify-start w-full h-screen px-10 pt-10 pb-32 overflow-y-auto">
            <h1 className="text-4xl mb-5 font-black md:text-4xl text-center max-w-[620px] mx-auto">
                {moment(post.date).format('MMMM Do YYYY, h:mm a')}
            </h1>
            <div
                dangerouslySetInnerHTML={{__html: post?.content}}
                className="inline-block mx-auto post-content"
            />
        </div>
    );
}
