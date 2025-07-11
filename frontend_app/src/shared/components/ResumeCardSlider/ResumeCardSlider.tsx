import {useEffect, useRef, useState, type WheelEvent as ReactWheelEvent} from "react";
import {ResumeCard} from "../../../features/resume/components/ResumeCard.tsx";

type ProjectsSliderProps = {
    onEditClick: (id: number) => void;
};

export const ResumeCardSlider = ({onEditClick}: ProjectsSliderProps) => {
    const [translateX, setTranslateX] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isOverProfileSlider = useRef(false);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isOverProfileSlider.current) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const handleSliderWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
        // Проверяем, находится ли курсор над вложенным слайдером тегов
        const target = e.target as HTMLElement;
        const isInsideTagSlider = target.closest('[data-slider-type="tags"]');

        // Если событие произошло внутри слайдера тегов, не обрабатываем его
        if (isInsideTagSlider) {
            return;
        }

        e.preventDefault();

        if (!sliderRef.current || !containerRef.current) return;

        const containerWidth = containerRef.current.offsetWidth;
        const sliderWidth = sliderRef.current.scrollWidth;
        const maxTranslate = sliderWidth - containerWidth;

        if (maxTranslate <= 0) return;

        let newTranslate = translateX + e.deltaY;

        if (newTranslate < 0) newTranslate = 0;
        if (newTranslate > maxTranslate) newTranslate = maxTranslate;

        setTranslateX(newTranslate);
    };

    const handleMouseEnter = () => {
        isOverProfileSlider.current = true;
    };

    const handleMouseLeave = () => {
        isOverProfileSlider.current = false;
    };

    const tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div
            className="flex gap-5 mt-1.25 overflow-hidden border border-gray-20 rounded-2xl"
            ref={containerRef}
            onWheel={handleSliderWheel}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={sliderRef}
                className="flex gap-5 transition-transform duration-200"
                style={{ transform: `translateX(-${translateX}px)` }}
            >
                {tempArray.map((_, index) => (
                    <ResumeCard imageUrl="./tempCardPhoto.png" projectCount={5} tags={["React", "TypeScript"]} description="Frontend-разработчик с опытом работы 2 года" salary={100000} userName="Иван Иванов" id={index} key={index} onEditClick={onEditClick} adaptability="sm"/>
                ))}
            </div>
        </div>
    );
};