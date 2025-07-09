import {useEffect, useRef, useState, type WheelEvent as ReactWheelEvent} from "react";
import type {Adaptability, Tag} from "../../../features/resume/components/ResumeCard.tsx";

export const SliderTags = ({tags, adaptability}: {tags: Tag[], adaptability: Adaptability}) => {
    const [translateX, setTranslateX] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isOverSlider = useRef(false);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isOverSlider.current) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const handleSliderWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
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

    return (
        <div
            ref={containerRef}
            className={`${adaptability == "xl"? "max-w-[460px]" : "max-w-[300px]"} overflow-hidden`}
            onWheel={handleSliderWheel}
            onMouseEnter={() => isOverSlider.current = true}
            onMouseLeave={() => isOverSlider.current = false}
        >
            <div
                ref={sliderRef}
                className="flex gap-5 transition-transform duration-200"
                style={{ transform: `translateX(-${translateX}px)` }}
            >
                {tags.map(tag => (
                    <span
                        key={tag.id}
                        className="
                                        text-sm
                                        py-1 px-2
                                        bg-white-10
                                        border border-gray-20 rounded-sm
                                        whitespace-nowrap
                                        flex-shrink-0
                                        hover:bg-purple-20 hover:text-white-10
                                        transition duration-300 ease-in-out
                                        "
                    >
                                        {tag.name}
                                    </span>
                ))}
            </div>
        </div>
    );
};