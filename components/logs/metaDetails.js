export default function MetaDetails({metadata}) {
    if (!metadata) return
    return (
        <div className="flex overflow-x-scroll flex flex-row snap-x w-full space-x-4 text-md mb-1">
            <div className="grid grid-flow-col grid-rows-1 gap-x-2">
                {Object.entries(metadata.details).map((met) => (
                    <div
                        key={met[0]}
                        className="grid font-light p-1.5  border-b border-t border-gray-300 whitespace-nowrap"
                    >
                        <p className="capitalize font-thin text-gray-500 text-sm">{met[0].replace('_', ' ')}</p>
                        <p className="text-gray-500 dark:text-gray-500">{met[1]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
