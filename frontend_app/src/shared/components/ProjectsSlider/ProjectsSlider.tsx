import {useEffect, useRef, useState, type WheelEvent as ReactWheelEvent} from "react";

type ProjectsSliderProps = {
    onEditClick: (id: number) => void;
};

export const ProjectsSlider = ({ onEditClick }: ProjectsSliderProps) => {
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

    const tempArray = new Array(5).fill(0);

    return (
        <div
            className="mt-1.25 border border-gray-10 rounded-2xl flex gap-5 overflow-hidden"
            ref={containerRef}
            onWheel={handleSliderWheel}
            onMouseEnter={() => isOverSlider.current = true}
            onMouseLeave={() => isOverSlider.current = false}
        >
            <div
                ref={sliderRef}
                className="flex gap-5 transition-transform duration-200"
                style={{ transform: `translateX(-${translateX}px)` }}
            >
                {tempArray.map((_, index) => (
                    <div key={index} className="p-5 bg-white-10 w-85 border border-gray-10 rounded-2xl flex flex-col gap-1.25 group hover:shadow-card">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-xl">
                                Разработка программы
                                для снимка экрана
                            </h4>
                            <div className="flex items-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                                <button onClick={() => onEditClick(index)}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_341_1748)">
                                            <path d="M14.4248 8.12041L14.8221 7.72314L13.6303 6.53135L11.4471 4.34814L10.2553 3.15635L9.85799 3.55361L9.06346 4.34814L2.06033 11.3513C1.69471 11.7169 1.42752 12.1704 1.27987 12.6661L0.0353342 16.8989C-0.0525565 17.1942 0.0283029 17.5142 0.249787 17.7321C0.471272 17.9501 0.787678 18.031 1.08299 17.9466L5.31229 16.702C5.80799 16.5544 6.26151 16.2872 6.62713 15.9216L13.6303 8.91846L14.4248 8.12041ZM5.62518 14.0407L5.30526 14.8388C5.16463 14.9478 5.00643 15.0286 4.83768 15.0813L2.08846 15.8899L2.89705 13.1442C2.94627 12.972 3.03065 12.8138 3.13963 12.6767L3.93768 12.3567V13.4817C3.93768 13.7911 4.1908 14.0442 4.50018 14.0442H5.62518V14.0407ZM12.7514 0.656738L12.2451 1.1665L11.4506 1.96103L11.0498 2.3583L12.2416 3.5501L14.4248 5.7333L15.6166 6.9251L16.0139 6.52783L16.8084 5.7333L17.3181 5.22354C18.1971 4.34463 18.1971 2.9208 17.3181 2.04189L15.9365 0.656738C15.0576 -0.222168 13.6338 -0.222168 12.7549 0.656738H12.7514ZM11.0849 6.56299L6.02244 11.6255C5.80448 11.8435 5.44588 11.8435 5.22791 11.6255C5.00994 11.4075 5.00994 11.0489 5.22791 10.831L10.2904 5.76846C10.5084 5.55049 10.867 5.55049 11.0849 5.76846C11.3029 5.98643 11.3029 6.34502 11.0849 6.56299Z" fill="#344BC3"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_341_1748">
                                                <rect width="18" height="18" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <button>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 18L17.9999 2.00013" stroke="#344BC3" stroke-width="3" stroke-linecap="round"/>
                                        <path d="M18 18L2.00013 2.00013" stroke="#344BC3" stroke-width="3" stroke-linecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <p className="text-xs text-justify">
                            Программа позволяет быстро и удобно создавать скриншоты всего экрана, отдельных окон или выделенных областей. Поддерживаются горячие клавиши, мгновенное редактирование...
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
};