export const FilterTags = ({tags}: {tags: string[]}) => {
    return (
        <div className="max-w-85 w-full flex flex-wrap gap-2.5">
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className="
                        w-full
                        pr-5
                        border border-gray-20
                        rounded-2xl
                        text-xl
                        flex items-center
                        bg-white-10
                        cursor-pointer
                        hover:font-bold
                        group
                    "
                >
                    <span className="
                    mr-2.5
                    block
                    w-3.75 h-full
                    rounded-l-2xl
                    bg-blue-10
                    group-hover:bg-purple-20
                    transition duration-300 ease-in-out"></span>
                    <span className="py-3 transition duration-300 ease-in-out">{tag}</span>
                </div>
            ))}
        </div>
    )
}