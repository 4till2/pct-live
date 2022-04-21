import WordCard from "./wordCard";

export default function WordsGallery({words}) {
    return (
        <>
            <div className="flex w-full flex-row flex-wrap">
                {
                    words.map(p => {
                        return (
                            <div className="m-2 w-1/2 md:w-1/4 break-words shrink">
                                <WordCard post={p}/>
                            </div>
                        )
                    })
                }
            </div>
        </>)
}
