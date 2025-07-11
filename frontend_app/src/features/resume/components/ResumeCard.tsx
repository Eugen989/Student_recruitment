import {Link} from "react-router-dom";
import {SliderTags} from "../../../shared/components/SliderTags/SliderTags.tsx";
import type {MouseEvent} from "react";
import {isTokenValid} from "../../../utils/token.client.ts";
import {useUser} from "../../../shared/hooks/useUser.tsx";

export interface Tag {
    id: number;
    name: string;
}

export type Adaptability = "xl" | "lg" | "sm";

export interface ResumeCardProps {
    adaptability: Adaptability,
    onEditClick?: (id: number) => void,
    id: number,
    userName: string,
    salary: number,
    description: string,
    tags: string[],
    projectCount: number,
    imageUrl?: string | null,
}

export const ResumeCard = ({
                               adaptability,
                               id,
                               userName,
                               salary,
                               description,
                               tags,
                               projectCount,
                               imageUrl
                           }: ResumeCardProps) => {
    const user = useUser();
    const role = user?.role;
    const isToken = isTokenValid();

    const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        //onEditClick(index);
    };

    const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // Обработка удаления
    };

    return (
        <Link
            to={`/resume/${id}`}
            className={`
                flex flex-col gap-3
                ${adaptability === "xl" ? "max-w-[820px]" : adaptability === "lg" ? "max-w-[460px]" : "max-w-[340px]"} 
                w-full
                bg-white-10
                rounded-2xl border border-gray-200
                p-5
                hover:shadow-md
                transition duration-300 ease-in-out
                group
            `}
        >
            <div className="flex items-start gap-4">
                {adaptability !== "sm" && (
                    <div className="shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Аватар"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No photo</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                            {adaptability !== "sm" && (
                                <h3 className="text-xl font-bold truncate">{userName}</h3>
                            )}

                            <div className="mt-1">
                                <SliderTags
                                    adaptability={adaptability}
                                    tags={tags.map((tag, index) => ({ id: index, name: tag }))}
                                />
                            </div>
                        </div>

                        {adaptability === "sm" && (
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={handleEditClick}
                                    className="p-1 hover:bg-gray-100 rounded"
                                    aria-label="Редактировать"
                                >
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_341_1748)">
                                            <path d="M14.4248 8.12041L14.8221 7.72314L13.6303 6.53135L11.4471 4.34814L10.2553 3.15635L9.85799 3.55361L9.06346 4.34814L2.06033 11.3513C1.69471 11.7169 1.42752 12.1704 1.27987 12.6661L0.0353342 16.8989C-0.0525565 17.1942 0.0283029 17.5142 0.249787 17.7321C0.471272 17.9501 0.787678 17.931 1.08299 17.9466L5.31229 16.702C5.80799 16.5544 6.26151 16.2872 6.62713 15.9216L13.6303 8.91846L14.4248 8.12041ZM5.62518 14.0407L5.30526 14.8388C5.16463 14.9478 5.00643 15.0286 4.83768 15.0813L2.08846 15.8899L2.89705 13.1442C2.94627 12.972 3.03065 12.8138 3.13963 12.6767L3.93768 12.3567V13.4817C3.93768 13.7911 4.1908 14.0442 4.50018 14.0442H5.62518V14.0407ZM12.7514 0.656738L12.2451 1.1665L11.4506 1.96103L11.0498 2.3583L12.2416 3.5501L14.4248 5.7333L15.6166 6.9251L16.0139 6.52783L16.8084 5.7333L17.3181 5.22354C18.1971 4.34463 18.1971 2.9208 17.3181 2.04189L15.9365 0.656738C15.0576 -0.222168 13.6338 -0.222168 12.7549 0.656738H12.7514ZM11.0849 6.56299L6.02244 11.6255C5.80448 11.8435 5.44588 11.8435 5.22791 11.6255C5.00994 11.4075 5.00994 11.0489 5.22791 10.831L10.2904 5.76846C10.5084 5.55049 10.867 5.55049 11.0849 5.76846C11.3029 5.98643 11.3029 6.34502 11.0849 6.56299Z" fill="#344BC3"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_341_1748">
                                                <rect width="18" height="18" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <button
                                    onClick={handleDeleteClick}
                                    className="p-1 hover:bg-gray-100 rounded"
                                    aria-label="Удалить"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 18L17.9999 2.00013" stroke="#344BC3" strokeWidth="3" strokeLinecap="round"/>
                                        <path d="M18 18L2.00013 2.00013" stroke="#344BC3" strokeWidth="3" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                        <span className="text-lg font-bold text-black-20">
                            от {salary.toLocaleString('ru-RU')} ₽/мес.
                        </span>
                        <span className="text-sm text-gray-500">
                            Проектов: {projectCount}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <p className="text-gray-700 line-clamp-3">{description}</p>
            </div>

            {adaptability !== "sm" && isToken && role === "employer" && (
                <div className="mt-4 flex gap-3">
                    <button
                        className="
                            px-4 py-2
                            bg-blue-10
                            text-white
                            font-semibold
                            rounded-xl
                            hover:bg-purple-20
                            transition-colors
                            active:bg-blue-10 active:scale-95
                        "
                    >
                        Нанять
                    </button>
                    <Link
                        to="/chat"
                        className="
                            px-4 py-2
                            font-semibold
                            border border-gray-300
                            rounded-xl
                            hover:bg-purple-20
                            hover:text-white-10
                            active:bg-white-10 active:scale-95 active:text-black-20
                            transition-colors
                        "
                        onClick={e => e.stopPropagation()}
                    >
                        Написать
                    </Link>
                </div>
            )}
        </Link>
    );
};