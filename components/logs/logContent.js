import moment from "moment";
import MetaDetails from "./metaDetails";

export default function LogContent({data}) {
    return (
        <div
            className="inline-flex flex-col items-center justify-start w-full  px-10 pt-10 pb-32 overflow-y-auto">
            {data?.icon ? (
                <div className="w-12 h-12 mx-auto mb-5">
                    <img src={data?.icon}
                         className="mb-4 border border-gray-100 rounded-full shadow-lg dark:border-gray-600"/>
                </div>
            ) : (
                ""
            )}
            <h1 className="text-4xl mb-5 font-black md:text-4xl text-center max-w-[620px] mx-auto">
                {moment(data.date).format('MMMM Do YYYY, h:mm a')}
            </h1>
            <MetaDetails metadata={data.metadata}/>
            <div
                dangerouslySetInnerHTML={{__html: data?.content}}
                className="inline-block mx-auto data-content mt-2"
            />
        </div>
    );
}
