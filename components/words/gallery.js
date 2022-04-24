import WordCard from "./wordCard";

export default function WordsGallery({words}) {
    return (
        <>
            <div className="flex w-full flex-row flex-wrap ">
                {
                    words.map(p => {
                        return (
                            <div key={p.slug} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 break-words">
                                <WordCard data={p}/>
                            </div>
                        )
                    })
                }
            </div>
        </>)
}
