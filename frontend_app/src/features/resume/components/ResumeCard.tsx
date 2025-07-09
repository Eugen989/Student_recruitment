import {useState} from "react";
import {Link} from "react-router-dom";
import {SliderTags} from "../../../shared/components/SliderTags/SliderTags.tsx";
import {sliderTagsData} from "../../../tempData/tempData.client.ts";

export interface Tag {
    id: number;
    name: string;
}

export type Adaptability = "xl" | "lg" | "sm";

export interface ResumeCardProps {
    adaptability: Adaptability
}

export const ResumeCard = ({adaptability}: ResumeCardProps) => {
    const [tags, setTags] = useState<Tag[]>(sliderTagsData);


    return (
        <Link
            to="/resume"
            className={`
                flex flex-col gap-2.5
                ${adaptability == "xl" ? "max-w-[820px]" : adaptability == "lg" ? "max-w-[460px]" : "max-w-[340px]"} w-full
                bg-white-10
                rounded-2xl border border-gray-20
                p-5
                hover:shadow-card
                transition duration-300 ease-in-out`}
        >
            <div className="flex items-center gap-5">
                {adaptability !== "sm" && (
                    <div className="max-w-25 w-full max-h-25 h-full">
                        <img src="./tempCardPhoto.png" alt="Картинка" className="w-full h-full object-cover"/>
                    </div>
                )}
                <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold">Анатолий Полено</h3>
                    <span className="text-xl font-semibold">
                        {adaptability == "xl"? "Желаемая должность:" : ""}
                        <span className="text-gray-10"> Frontend-разработчик</span>
                    </span>
                    <div>
                        <SliderTags adaptability={adaptability} tags={tags}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1.25 max-w-2xl w-full">
                <span className="text-xl font-semibold">
                    от 80000 р./ мес.
                </span>
                <p className="">
                    Имею коммерческий опыт разработки приложений на React + Next.js.
                    Также имею опыт разработки Unit - тестов для мобильный приложений.
                </p>
            </div>
            <div className="flex gap-5">
                <button
                    className="
                    py-1.5
                    bg-blue-10
                    text-white-10
                    font-semibold
                    rounded-2xl
                    hover:bg-purple-20 active:bg-blue-10 active:scale-95
                    transition-all duration-300 ease-in-out
                    max-w-35 w-full">
                    Нанять
                </button>
                <Link
                    to="/chat"
                    className="
                    block text-center
                    font-semibold py-1.5 max-w-35 w-full
                    border border-gray-20
                    bg-white-10
                    rounded-xl
                    hover:bg-purple-20 hover:text-white-10 hover:border-purple-20 active:bg-white-10 active:scale-95
                    transition-all duration-300 ease-in-out"
                >
                    Написать
                </Link>
            </div>
        </Link>
    );
};