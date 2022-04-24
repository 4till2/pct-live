import BlipCard from "./blipCard";

export default function BlipsGallery({blips}) {
    return (
        <>
            <div className="flex w-full flex-row flex-wrap">
                {
                    blips.map(p => {
                        return (
                            <div key={p.slug} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 break-words">
                                <BlipCard data={p}/>
                            </div>
                        )
                    })
                }
            </div>
        </>)
}
