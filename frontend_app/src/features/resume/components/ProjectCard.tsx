import {useEffect, useRef, useState, useCallback} from "react";
import { createPortal } from "react-dom";

export const ProjectCard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showButtons, setShowButtons] = useState(false);
    const [slideWidth, setSlideWidth] = useState(0);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const tempPhotos = [
        "./tempSlide.png",
        "./tempSlide2.png",
        "./tempSlide.png",
        "./tempSlide2.png",
        "./tempSlide.png",
        "./tempSlide2.png",
        "./tempSlide.png",
        "./tempSlide2.png",
        "./tempSlide.png",
        "./tempSlide2.png",
    ]

    const visibleCount = 5;
    const maxIndex = Math.max(0, tempPhotos.length - visibleCount);

    const calculateSlideWidth = useCallback(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const newSlideWidth = containerWidth / visibleCount;
            setSlideWidth(newSlideWidth);
            return newSlideWidth;
        }
        return 0;
    }, [visibleCount]);

    const goToSlide = (index: number) => {
        const clampedIndex = Math.max(0, Math.min(index, maxIndex));
        setCurrentIndex(clampedIndex);
    };

    const goToPrevSlide = () => goToSlide(currentIndex - 1);
    const goToNextSlide = () => goToSlide(currentIndex + 1);

    const openModal = (imageSrc: string) => {
        setModalImage(imageSrc);
        document.body.style.overflow = 'hidden'; // Отключаем скролл страницы
    };

    const closeModal = () => {
        setModalImage(null);
        document.body.style.overflow = 'unset'; // Включаем скролл страницы
    };

    // Закрытие модалки по Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && modalImage) {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [modalImage]);

    // Пересчет ширины при изменении размера окна
    useEffect(() => {
        const handleResize = () => {
            calculateSlideWidth();
        };

        // Первоначальный расчет
        calculateSlideWidth();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [calculateSlideWidth]);

    // Применение трансформации при изменении индекса или ширины
    useEffect(() => {
        if (sliderRef.current && slideWidth > 0) {
            sliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
    }, [currentIndex, slideWidth]);

    return (
        <div className="flex flex-col gap-5 bg-white-10 py-2.5 px-5 border border-gray-20 rounded-2xl">
            <div>
                <h4 className="text-xl font-semibold mb-1.25">
                    Разработка программы для снимка экрана
                </h4>
                <p className="text-gray-10">
                    Программа позволяет быстро и удобно создавать скриншоты всего экрана, отдельных окон или выделенных областей. Поддерживаются горячие клавиши, мгновенное редактирование (аннотации, обрезка) и сохранение в различных форматах.
                </p>
            </div>

            {/* Слайдер */}
            <div
                className="relative border border-gray-20 rounded-2xl overflow-hidden"
                ref={containerRef}
                onMouseEnter={() => setShowButtons(true)}
                onMouseLeave={() => setShowButtons(false)}
            >
                {/* Кнопка "Назад" */}
                {showButtons && (
                    <button
                        onClick={goToPrevSlide}
                        disabled={currentIndex === 0}
                        className={`
                            absolute left-0 top-0 bottom-0
                            w-10 h-full flex items-center justify-center
                            bg-gray-10 bg-opacity-70 hover:bg-opacity-100
                            rounded-l-lg z-10
                            cursor-pointer
                            transition-all duration-300 ease-in-out
                            ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"}
                        `}
                        aria-label="Предыдущие изображения"
                    >
                        <svg
                            width="21"
                            height="37"
                            viewBox="0 0 42 74"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M5 37L37 69" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                            <path d="M5 37L37 5" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                        </svg>
                    </button>
                )}

                {/* Лента изображений */}
                <div
                    ref={sliderRef}
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                        width: `${tempPhotos.length * slideWidth}px`,
                        willChange: 'transform'
                    }}
                >
                    {tempPhotos.map((photo, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 h-30 cursor-pointer"
                            style={{ width: `${slideWidth}px` }}
                            onClick={() => openModal(photo)}
                        >
                            <img
                                src={photo}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {/* Кнопка "Вперед" */}
                {showButtons && (
                    <button
                        onClick={goToNextSlide}
                        disabled={currentIndex === maxIndex}
                        className={`
                            absolute right-0 top-0 bottom-0
                            w-10 h-full flex items-center justify-center
                            bg-gray-10 bg-opacity-70 hover:bg-opacity-100
                            rounded-r-lg z-10
                            cursor-pointer
                            transition-all duration-300 ease-in-out
                            ${currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "opacity-100"}
                        `}
                        aria-label="Следующие изображения"
                    >
                        <svg
                            width="21"
                            height="37"
                            viewBox="0 0 42 74"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="rotate-180"
                        >
                            <path d="M5 37L37 69" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                            <path d="M5 37L37 5" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                        </svg>
                    </button>
                )}
            </div>

            <a
                href="https://github.com/PolenoAnatoliy/ScreenShotApp"
                target="_blank"
                rel="noopener noreferrer"
                className="self-end inline-block py-1.5 px-7.5 bg-blue-10 text-white-10 rounded-2xl font-semibold transition duration-300 ease-in-out hover:bg-purple-20 active:bg-blue-10 active:scale-95"
            >
                К проекту
            </a>

            {/* Модалка через портал */}
            {modalImage && createPortal(
                <div
                    className="fixed inset-0 bg-black-30 bg-opacity-80 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative max-w-4xl max-h-4xl w-full h-full p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Кнопка закрытия */}
                        <button
                            onClick={closeModal}
                            className="cursor-pointer absolute top-2 right-2 z-60 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-200"
                            aria-label="Закрыть модалку"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 6L6 18M6 6l12 12"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {/* Изображение */}
                        <img
                            src={modalImage}
                            alt="Увеличенное изображение"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};