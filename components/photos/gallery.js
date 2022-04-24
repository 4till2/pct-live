import Photo from "./Photo";

export default function PhotosGallery({photos}) {
    return (
        <>
            <div className="flex w-full flex-row flex-wrap">
                {
                    photos.map(p => {
                        if (!p) return
                        return (
                            <div key={p.baseUrl}
                                 className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 break-words text-gray-500 dark:text-gray-500">
                                <Photo src={p?.baseUrl}
                                       width={p.mediaMetadata.width}
                                       height={p.mediaMetadata.height}
                                       description={p.description}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </>)
}
