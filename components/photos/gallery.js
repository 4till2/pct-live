import Photo from "./Photo";

export default function PhotosGallery({photos}) {
    return (
        <>
            <div className="flex w-full flex-row flex-wrap">
                {
                    photos.map(p => {
                        return (
                            <div key={p.baseUrl} className="mr-2 mt-1 text-center w-1/3 md:w-1/4 lg:w-1/6 text-gray-500 dark:text-gray-500">
                                <Photo src={p.baseUrl}
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
